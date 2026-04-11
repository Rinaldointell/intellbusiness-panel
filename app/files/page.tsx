"use client";
import { useEffect, useState } from "react";
import { FolderOpen, Folder, FileText, ChevronRight, Code } from "lucide-react";

interface Entry { type: "file"|"dir"; name: string; path: string; size?: number; ext?: string; modified: string; children?: Entry[]; }

const EXT_COLORS: Record<string, string> = {
  ".md": "#F5A800", ".ts": "var(--info)", ".tsx": "var(--info)",
  ".js": "#EAB308", ".json": "var(--positive)", ".yaml": "#8B5CF6", ".yml": "#8B5CF6", ".css": "#EC4899",
};

function fmtSize(b: number) {
  if (b < 1024) return `${b}B`;
  if (b < 1024*1024) return `${(b/1024).toFixed(1)}KB`;
  return `${(b/1024/1024).toFixed(1)}MB`;
}

export default function FilesPage() {
  const [tree,        setTree]        = useState<Entry[]>([]);
  const [currentPath, setCurrentPath] = useState("");
  const [content,     setContent]     = useState<{ path: string; content: string }|null>(null);
  const [loading,     setLoading]     = useState(true);
  const [loadFile,    setLoadFile]    = useState(false);

  const loadDir = (p: string) => {
    setLoading(true); setCurrentPath(p);
    fetch(p ? `/api/files?dir=${encodeURIComponent(p)}` : "/api/files")
      .then((r) => r.json()).then((d) => { setTree(d.entries); setLoading(false); }).catch(() => setLoading(false));
  };

  useEffect(() => { loadDir(""); }, []);

  const openFile = (path: string) => {
    setLoadFile(true);
    fetch(`/api/files?file=${encodeURIComponent(path)}`).then((r) => r.json()).then((d) => { setContent(d); setLoadFile(false); }).catch(() => setLoadFile(false));
  };

  const crumbs = currentPath ? currentPath.split("/") : [];

  return (
    <div style={{ padding: "24px 28px" }}>
      <div style={{ marginBottom: "20px" }}>
        <h1 style={{ fontFamily: "var(--font-heading)", fontSize: "28px", fontWeight: 700, letterSpacing: "-1.5px", color: "var(--text-primary)", margin: 0 }}>Arquivos</h1>
        <p style={{ color: "var(--text-secondary)", fontSize: "14px", marginTop: "4px" }}>Workspace do projeto</p>
      </div>

      {/* Breadcrumbs */}
      <div style={{ display: "flex", alignItems: "center", gap: "4px", fontSize: "12px", fontFamily: "var(--font-mono)", color: "var(--text-muted)", marginBottom: "14px" }}>
        <button onClick={() => loadDir("")} style={{ background: "none", border: "none", color: "var(--text-muted)", cursor: "pointer", padding: 0, fontSize: "12px", fontFamily: "var(--font-mono)" }}
          onMouseEnter={(e) => (e.currentTarget.style.color = "var(--accent)")} onMouseLeave={(e) => (e.currentTarget.style.color = "var(--text-muted)")}>
          root
        </button>
        {crumbs.map((c, i) => (
          <span key={i} style={{ display: "flex", alignItems: "center", gap: "4px" }}>
            <ChevronRight size={10} />
            <button onClick={() => loadDir(crumbs.slice(0, i+1).join("/"))} style={{ background: "none", border: "none", color: "var(--text-muted)", cursor: "pointer", padding: 0, fontSize: "12px", fontFamily: "var(--font-mono)" }}
              onMouseEnter={(e) => (e.currentTarget.style.color = "var(--accent)")} onMouseLeave={(e) => (e.currentTarget.style.color = "var(--text-muted)")}>
              {c}
            </button>
          </span>
        ))}
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "300px 1fr", gap: "12px" }}>
        {/* Tree */}
        <div className="card" style={{ overflow: "hidden" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "6px", padding: "12px 16px", borderBottom: "1px solid var(--border)" }}>
            <FolderOpen size={12} style={{ color: "var(--accent)" }} />
            <span style={{ fontSize: "11px", fontFamily: "var(--font-mono)", color: "var(--text-secondary)", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{currentPath || "/"}</span>
          </div>
          <div style={{ overflowY: "auto", maxHeight: "520px" }}>
            {loading ? (
              <div style={{ padding: "10px", display: "flex", flexDirection: "column", gap: "4px" }}>
                {[...Array(8)].map((_, i) => <div key={i} style={{ height: "32px", backgroundColor: "var(--card-elevated)", borderRadius: "var(--radius-sm)", opacity: 0.5 }} />)}
              </div>
            ) : tree.map((e) => {
              const color = e.ext ? (EXT_COLORS[e.ext] ?? "var(--text-muted)") : "var(--text-muted)";
              return (
                <button
                  key={e.path}
                  onClick={() => e.type === "dir" ? loadDir(e.path) : openFile(e.path)}
                  style={{ width: "100%", textAlign: "left", display: "flex", alignItems: "center", gap: "8px", padding: "8px 14px", borderBottom: "1px solid var(--border)", background: "none", cursor: "pointer", transition: "background 150ms" }}
                  onMouseEnter={(el) => (el.currentTarget.style.backgroundColor = "var(--surface-hover)")}
                  onMouseLeave={(el) => (el.currentTarget.style.backgroundColor = "transparent")}
                >
                  {e.type === "dir" ? <Folder size={13} style={{ color: "var(--accent)", flexShrink: 0 }} /> : <FileText size={13} style={{ color, flexShrink: 0 }} />}
                  <span style={{ fontSize: "12px", color: "var(--text-secondary)", fontFamily: "var(--font-mono)", flex: 1, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{e.name}</span>
                  {e.type === "dir" ? <ChevronRight size={9} style={{ color: "var(--text-muted)", flexShrink: 0 }} /> : e.size !== undefined ? <span style={{ fontSize: "9px", color: "var(--text-muted)", flexShrink: 0, fontFamily: "var(--font-mono)" }}>{fmtSize(e.size)}</span> : null}
                </button>
              );
            })}
          </div>
        </div>

        {/* Viewer */}
        <div className="card" style={{ overflow: "hidden", display: "flex", flexDirection: "column" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "6px", padding: "12px 16px", borderBottom: "1px solid var(--border)" }}>
            <Code size={12} style={{ color: "var(--accent)" }} />
            <span style={{ fontSize: "11px", fontFamily: "var(--font-mono)", color: "var(--text-secondary)", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
              {content?.path ?? "Selecione um arquivo"}
            </span>
          </div>
          <div style={{ flex: 1, padding: "16px", overflowY: "auto", maxHeight: "520px" }}>
            {loadFile ? (
              <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                {[...Array(12)].map((_, i) => <div key={i} style={{ height: "14px", backgroundColor: "var(--card-elevated)", borderRadius: "3px", width: `${50+Math.random()*50}%`, opacity: 0.5 }} />)}
              </div>
            ) : content ? (
              <pre style={{ fontFamily: "var(--font-mono)", fontSize: "12px", color: "var(--text-secondary)", whiteSpace: "pre-wrap", lineHeight: 1.7, margin: 0 }}>{content.content}</pre>
            ) : (
              <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", height: "200px", color: "var(--text-muted)" }}>
                <Code size={24} style={{ opacity: 0.2, marginBottom: "10px" }} />
                <p style={{ fontSize: "13px" }}>Clique em um arquivo para visualizar</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
