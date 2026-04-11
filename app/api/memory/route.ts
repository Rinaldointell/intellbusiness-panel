import { NextResponse } from "next/server";
import fs from "fs";

export const dynamic = "force-dynamic";
import path from "path";

const SQUADS_DIR = process.env.SQUADS_DIR ?? path.resolve(process.cwd(), "squads");
const CLAUDE_MEMORY_DIR = process.env.CLAUDE_MEMORY_DIR ?? path.resolve(process.cwd(), "../.claude/projects");
const AIOX_MEMORY_DIR = process.env.AIOX_MEMORY_DIR ?? path.resolve(process.cwd(), "../.aiox-core/data");

function readMarkdownFiles(dir: string, prefix = ""): object[] {
  const results: object[] = [];
  if (!fs.existsSync(dir)) return results;

  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    const relPath = prefix ? `${prefix}/${entry.name}` : entry.name;

    if (entry.isDirectory()) {
      results.push(...readMarkdownFiles(fullPath, relPath));
    } else if (entry.name.endsWith(".md") || entry.name === "MEMORY.md" || entry.name === "SOUL.md") {
      try {
        const stat = fs.statSync(fullPath);
        const content = fs.readFileSync(fullPath, "utf-8");
        results.push({
          path: relPath,
          name: entry.name,
          size: stat.size,
          modified: stat.mtime.toISOString(),
          preview: content.slice(0, 300).trim(),
          wordCount: content.split(/\s+/).length,
        });
      } catch {
        // skip unreadable files
      }
    }
  }
  return results;
}

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const query = searchParams.get("q")?.toLowerCase() ?? "";
    const filePath = searchParams.get("path");

    // Return single file content
    if (filePath) {
      const safePath = path.normalize(filePath).replace(/^(\.\.(\/|\\|$))+/, "");
      const candidates = [
        path.join(SQUADS_DIR, safePath),
        path.join(path.resolve(process.cwd(), ".."), safePath),
      ];
      for (const candidate of candidates) {
        if (fs.existsSync(candidate) && fs.statSync(candidate).isFile()) {
          const content = fs.readFileSync(candidate, "utf-8");
          return NextResponse.json({ path: safePath, content });
        }
      }
      return NextResponse.json({ error: "File not found" }, { status: 404 });
    }

    // List all memory files
    let files = [
      ...readMarkdownFiles(SQUADS_DIR, "squads"),
      ...readMarkdownFiles(AIOX_MEMORY_DIR, ".aiox-core/data"),
      ...readMarkdownFiles(CLAUDE_MEMORY_DIR, ".claude"),
    ] as { path: string; name: string; size: number; modified: string; preview: string; wordCount: number }[];

    if (query) {
      files = files.filter(
        (f) =>
          f.path.toLowerCase().includes(query) ||
          f.preview.toLowerCase().includes(query) ||
          f.name.toLowerCase().includes(query)
      );
    }

    files.sort((a, b) => new Date(b.modified).getTime() - new Date(a.modified).getTime());

    return NextResponse.json(files.slice(0, 100));
  } catch (err) {
    console.error("API /memory error:", err);
    return NextResponse.json({ error: "Failed to read memory" }, { status: 500 });
  }
}
