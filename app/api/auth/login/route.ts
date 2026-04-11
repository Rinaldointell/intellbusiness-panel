import { NextResponse } from "next/server";
import crypto from "node:crypto";

export const dynamic = "force-dynamic";

const COOKIE_NAME = "ib_session";
const RATE_LIMIT_MAX = 5;
const RATE_LIMIT_WINDOW_MS = 15 * 60 * 1000; // 15 min

interface RateRecord {
  count: number;
  blockedUntil: number;
}

// In-memory rate limiter (resets on restart — aceitável para painel único)
const rateLimiter = new Map<string, RateRecord>();

function getClientIp(req: Request): string {
  const forwarded = req.headers.get("x-forwarded-for");
  return (forwarded?.split(",")[0] ?? "unknown").trim();
}

function createToken(secret: string): string {
  const tsHex = Date.now().toString(16);
  const nonceHex = crypto.randomBytes(16).toString("hex");
  const payload = `${tsHex}-${nonceHex}`;
  const sig = crypto.createHmac("sha256", secret).update(payload).digest("hex");
  return `${payload}-${sig}`;
}

export async function POST(req: Request) {
  const ip = getClientIp(req);
  const now = Date.now();

  // Limpa entradas expiradas periodicamente
  Array.from(rateLimiter.entries()).forEach(([key, record]) => {
    if (record.blockedUntil > 0 && record.blockedUntil < now - RATE_LIMIT_WINDOW_MS) {
      rateLimiter.delete(key);
    }
  });

  // Verifica bloqueio
  const record = rateLimiter.get(ip);
  if (record?.blockedUntil && record.blockedUntil > now) {
    const remainingMin = Math.ceil((record.blockedUntil - now) / 60000);
    return NextResponse.json(
      { error: `Bloqueado. Tente novamente em ${remainingMin} minuto(s).` },
      { status: 429 }
    );
  }

  let body: { password?: string };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Requisição inválida." }, { status: 400 });
  }

  const adminPassword = process.env.ADMIN_PASSWORD;
  if (!adminPassword) {
    return NextResponse.json(
      { error: "ADMIN_PASSWORD não configurado no servidor." },
      { status: 500 }
    );
  }

  // Comparação segura contra timing attacks
  const input = Buffer.from(body.password ?? "");
  const expected = Buffer.from(adminPassword);
  const isValid =
    input.length === expected.length &&
    crypto.timingSafeEqual(input, expected);

  if (!isValid) {
    const current = rateLimiter.get(ip) ?? { count: 0, blockedUntil: 0 };
    current.count += 1;

    if (current.count >= RATE_LIMIT_MAX) {
      current.blockedUntil = now + RATE_LIMIT_WINDOW_MS;
      rateLimiter.set(ip, current);
      return NextResponse.json(
        { error: "Muitas tentativas. Acesso bloqueado por 15 minutos." },
        { status: 429 }
      );
    }

    rateLimiter.set(ip, current);
    const remaining = RATE_LIMIT_MAX - current.count;
    return NextResponse.json(
      { error: `Senha incorreta. ${remaining} tentativa(s) restante(s).` },
      { status: 401 }
    );
  }

  // Login OK — reseta rate limit e cria sessão
  rateLimiter.delete(ip);
  const token = createToken(adminPassword);

  const response = NextResponse.json({ ok: true });
  response.cookies.set(COOKIE_NAME, token, {
    httpOnly: true,
    sameSite: "strict",
    secure: process.env.NODE_ENV === "production",
    maxAge: 24 * 60 * 60,
    path: "/",
  });

  return response;
}
