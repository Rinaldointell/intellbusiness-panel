import { NextResponse } from "next/server";
import { execSync } from "child_process";
import path from "path";

const ROOT_DIR = path.resolve(process.cwd(), "..");

// Strict allowlist — no network, no write, no env, no credentials
const ALLOWED_COMMANDS: Record<string, string | string[]> = {
  "ls": "dir /b",
  "ls -la": "dir",
  "pwd": "cd",
  "node --version": "node --version",
  "npm --version": "npm --version",
  "git status": "git status",
  "git log --oneline -10": "git log --oneline -10",
  "git branch": "git branch",
  "cat package.json": ["type", "intellbusiness-panel\\package.json"],
  "echo hello": "echo hello",
};

export async function POST(req: Request) {
  try {
    const { command } = await req.json() as { command: string };

    const allowed = ALLOWED_COMMANDS[command];
    if (!allowed) {
      return NextResponse.json({ error: `Comando bloqueado: "${command}"` }, { status: 403 });
    }

    let output: string;
    try {
      const isWin = process.platform === "win32";
      let cmd: string;

      if (typeof allowed === "string") {
        cmd = isWin ? allowed : command;
      } else {
        cmd = isWin ? `${allowed[0]} ${allowed[1]}` : command;
      }

      output = execSync(cmd, {
        cwd: ROOT_DIR,
        timeout: 5000,
        encoding: "utf-8",
        shell: isWin ? "cmd.exe" : "/bin/sh",
      });
    } catch (execErr: unknown) {
      const err = execErr as { stdout?: string; stderr?: string; message?: string };
      output = err.stdout ?? err.stderr ?? err.message ?? "Erro desconhecido";
    }

    return NextResponse.json({ output: output.trim() });
  } catch (err) {
    console.error("API /terminal error:", err);
    return NextResponse.json({ error: "Falha ao executar comando" }, { status: 500 });
  }
}
