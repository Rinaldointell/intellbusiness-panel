import { NextResponse } from "next/server";
import fs from "fs";

export const dynamic = "force-dynamic";
import path from "path";

const ROOT_DIR = process.env.FILES_ROOT_DIR ?? path.resolve(process.cwd());

const ALLOWED_DIRS = [
  "squads",
  "data",
  "app",
  "components",
];

const BLOCKED_PATTERNS = [
  "node_modules",
  ".next",
  ".git",
  ".env",
  "*.key",
  "*.secret",
];

function isBlocked(name: string): boolean {
  return BLOCKED_PATTERNS.some((p) =>
    p.startsWith("*") ? name.endsWith(p.slice(1)) : name === p
  );
}

function listDir(dir: string, depth = 0): object[] {
  const results: object[] = [];
  if (depth > 3) return results;
  if (!fs.existsSync(dir)) return results;

  let entries: fs.Dirent[];
  try {
    entries = fs.readdirSync(dir, { withFileTypes: true });
  } catch {
    return results;
  }

  for (const entry of entries) {
    if (isBlocked(entry.name)) continue;
    const fullPath = path.join(dir, entry.name);
    const relPath = path.relative(ROOT_DIR, fullPath).replace(/\\/g, "/");
    const stat = (() => {
      try { return fs.statSync(fullPath); } catch { return null; }
    })();
    if (!stat) continue;

    if (entry.isDirectory()) {
      results.push({
        type: "dir",
        name: entry.name,
        path: relPath,
        modified: stat.mtime.toISOString(),
        children: depth < 2 ? listDir(fullPath, depth + 1) : [],
      });
    } else {
      const ext = path.extname(entry.name).toLowerCase();
      results.push({
        type: "file",
        name: entry.name,
        path: relPath,
        size: stat.size,
        ext,
        modified: stat.mtime.toISOString(),
      });
    }
  }
  return results;
}

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const dirParam = searchParams.get("dir") ?? "";
    const filePath = searchParams.get("file");

    // Read single file content
    if (filePath) {
      const safePath = path.normalize(filePath).replace(/^(\.\.(\/|\\|$))+/, "");
      const fullPath = path.join(ROOT_DIR, safePath);
      if (!fs.existsSync(fullPath) || !fs.statSync(fullPath).isFile()) {
        return NextResponse.json({ error: "File not found" }, { status: 404 });
      }
      const ext = path.extname(fullPath).toLowerCase();
      const textExts = [".md", ".txt", ".ts", ".tsx", ".js", ".jsx", ".json", ".yaml", ".yml", ".css", ".html"];
      if (!textExts.includes(ext)) {
        return NextResponse.json({ error: "Binary file" }, { status: 400 });
      }
      const content = fs.readFileSync(fullPath, "utf-8");
      return NextResponse.json({ path: safePath, content });
    }

    // List directory
    if (dirParam) {
      const safePath = path.normalize(dirParam).replace(/^(\.\.(\/|\\|$))+/, "");
      const fullPath = path.join(ROOT_DIR, safePath);
      const entries = listDir(fullPath, 0);
      return NextResponse.json({ path: safePath, entries });
    }

    // Root listing — only allowed dirs
    const root = ALLOWED_DIRS.map((d) => {
      const fullPath = path.join(ROOT_DIR, d);
      const exists = fs.existsSync(fullPath);
      return {
        type: "dir",
        name: d,
        path: d,
        exists,
        children: exists ? listDir(fullPath, 0) : [],
      };
    });

    return NextResponse.json({ path: "", entries: root });
  } catch (err) {
    console.error("API /files error:", err);
    return NextResponse.json({ error: "Failed to read files" }, { status: 500 });
  }
}
