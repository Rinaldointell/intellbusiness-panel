import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const COOKIE_NAME = "ib_session";
const SESSION_DURATION_MS = 24 * 60 * 60 * 1000;

function hexToUint8Array(hex: string): Uint8Array {
  if (hex.length % 2 !== 0) return new Uint8Array(0);
  const bytes = new Uint8Array(hex.length / 2);
  for (let i = 0; i < hex.length; i += 2) {
    bytes[i / 2] = parseInt(hex.slice(i, i + 2), 16);
  }
  return bytes;
}

async function verifyToken(token: string): Promise<boolean> {
  try {
    const secret = process.env.ADMIN_PASSWORD;
    if (!secret) return false;

    // format: {tsHex}-{nonceHex}-{sigHex}
    const lastDash = token.lastIndexOf("-");
    if (lastDash === -1) return false;
    const payload = token.slice(0, lastDash);
    const sigHex = token.slice(lastDash + 1);

    const firstDash = payload.indexOf("-");
    if (firstDash === -1) return false;
    const tsHex = payload.slice(0, firstDash);

    const ts = parseInt(tsHex, 16);
    if (isNaN(ts) || Date.now() - ts > SESSION_DURATION_MS) return false;

    const encoder = new TextEncoder();
    const key = await crypto.subtle.importKey(
      "raw",
      encoder.encode(secret),
      { name: "HMAC", hash: "SHA-256" },
      false,
      ["verify"]
    );

    const sigBytes = hexToUint8Array(sigHex);
    if (sigBytes.length === 0) return false;

    return await crypto.subtle.verify("HMAC", key, sigBytes, encoder.encode(payload));
  } catch {
    return false;
  }
}

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Rotas públicas
  if (
    pathname === "/login" ||
    pathname.startsWith("/api/auth/") ||
    pathname.startsWith("/_next/") ||
    pathname === "/favicon.ico"
  ) {
    return NextResponse.next();
  }

  const token = request.cookies.get(COOKIE_NAME)?.value;
  if (!token || !(await verifyToken(token))) {
    const url = request.nextUrl.clone();
    url.pathname = "/login";
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|logo.png).*)"],
};
