"use client";
import { useEffect, useState } from "react";
import { Brain, Search, FileText, X } from "lucide-react";

interface MemFile { path: string; name: string; size: number; modified: string; preview: string; wordCount: number; }

export default function MemoryPage() {
  const [files,    setFiles]    = useState<MemFile[]>([]);
  const [loading,  setLoading]  = useState(true);
  const [search,   setSearch]   = useState("");
  const [selected, setSelected] = useState<{ path: string; content: string } | null>(null);
  const [loadingFile, setLoadingFile] = useState(false);

  const fetchFiles = (q = "") => {
    setLoading(true);
    fetch(`/api/memory${q ? `?q=${encodeURIComponent(q)}` : ""}`)
      .then((r) => r.json()).then((d) => { setFiles(d); setLoading(false); }).catch(() => setLoading(false));
  };

  useEffect(() => { fetchFiles(); }, []);

  const openFile = (path: string) => {
    setLoadingFile(true);
    fetch(`/api/memory?path=${encodeURIComponent(path)}`)
      .then((r) => r.json()).then((d) => { setSelected(d); setLoadingFile(false); }).catch(() => setLoadingFile(false));
  };

  return (
    <div style={{ padding: "24px 28px" }}>
      <div style={{ marginBottom: "20px" }}>
        <h1 style={{ fontFamily: "var(--font-heading)", fontSize: "28px", fontWeight: 700, letterSpacing: "-1.5px", color: "var(--text-primary)", margin: 0 }}>Memória</h1>
        <p style={{ color: "var(--text-secondary)", fontSize: "14px", marginTop: "4px" }}>{files.length} arquivos de memória dos agentes</p>
      </div>

      {/* Search */}
      <form onSubmit={(e) => { e.preventDefault(); fetchFiles(search); }} style={{ display: "flex", gap: "8px", marginBottom: "16px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "8px", flex: 1, backgroundColor: "var(--card)", border: "1px solid var(--border)", borderRadius: "var(--radius-md)", padding: "8px 12px" }}>
          <Search size={13} style={{ color: "var(--text-muted)" }} />
          <input
            placeholder="Buscar em memórias..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={{ background: "transparent", border: "none", outline: "none", color: "var(--text-primary)", fontSize: "13px", flex: 1, fontFamily: "var(--font-body)" }}
          />
        </div>
        <button type="submit" style={{ padding: "8px 16px", backgroundColor: "var(--accent)", color: "white", border: "none", borderRadius: "var(--radius-md)", fontSize: "12px", fontWeight: 600, cursor: "pointer", fontFamily: "var(--font-mono)" }}>
          BUSCAR
        </button>
        {search && (
          <button type="button" onClick={() => { setSearch(""); fetchFiles(); }} style={{ padding: "8px 10px", backgroundColor: "var(--card)", border: "1px solid var(--border)", borderRadius: "var(--radius-md)", color: "var(--text-muted)", cursor: "pointer" }}>
            <X size={13} />
          </button>
        )}
      </form>

      <div style={{ display: "grid", gridTemplateColumns: "340px 1fr", gap: "12px" }}>
        {/* File list */}
        <div className="card" style={{ overflow: "hidden" }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "12px 16px", borderBottom: "1px solid var(--border)" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
              <Brain size={12} style={{ color: "var(--accent)" }} />
              <span style={{ fontSize: "12px", fontFamily: "var(--font-heading)", fontWeight: 600, color: "var(--text-primary)" }}>Arquivos</span>
            </div>
            <span style={{ fontSize: "10px", color: "var(--text-muted)", fontFamily: "var(--font-mono)" }}>{files.length}</span>
          </div>
          <div style={{ overflowY: "auto", maxHeight: "520px" }}>
            {loading ? (
              <div style={{ padding: "12px", display: "flex", flexDirection: "column", gap: "6px" }}>
                {[...Array(5)].map((_, i) => <div key={i} style={{ height: "52px", backgroundColor: "var(--card-elevated)", borderRadius: "var(--radius-md)", opacity: 0.5 }} />)}
              </div>
            ) : files.map((f) => (
              <button
                key={f.path}
                onClick={() => openFile(f.path)}
                style={{
                  width: "100%", textAlign: "left", padding: "10px 16px",
                  borderBottom: "1px solid var(--border)", cursor: "pointer", background: "none",
                  borderLeft: selected?.path === f.path ? "2px solid var(--accent)" : "2px solid transparent",
                  backgroundColor: selected?.path === f.path ? "var(--card-elevated)" : "transparent",
                  transition: "all 150ms",
                }}
                onMouseEnter={(el) => { if (selected?.path !== f.path) el.currentTarget.style.backgroundColor = "var(--surface-hover)"; }}
                onMouseLeave={(el) => { if (selected?.path !== f.path) el.currentTarget.style.backgroundColor = "transparent"; }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: "6px", marginBottom: "3px" }}>
                  <FileText size={11} style={{ color: "var(--text-muted)" }} />
                  <span style={{ fontSize: "12px", fontFamily: "var(--font-mono)", color: "var(--text-primary)", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{f.name}</span>
                  <span style={{ marginLeft: "auto", fontSize: "9px", color: "var(--text-muted)", fontFamily: "var(--font-mono)", flexShrink: 0 }}>{f.wordCount}w</span>
                </div>
                <div style={{ fontSize: "10px", color: "var(--text-muted)", fontFamily: "var(--font-mono)", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", marginBottom: "2px" }}>{f.path}</div>
                <div style={{ fontSize: "11px", color: "var(--text-secondary)", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{f.preview}</div>
              </button>
            ))}
          </div>
        </div>

        {/* Viewer */}
        <div className="card" style={{ overflow: "hidden", display: "flex", flexDirection: "column" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "6px", padding: "12px 16px", borderBottom: "1px solid var(--border)" }}>
            <FileText size={12} style={{ color: "var(--accent)" }} />
            <span style={{ fontSize: "11px", fontFamily: "var(--font-mono)", color: "var(--text-secondary)", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
              {selected?.path ?? "Selecione um arquivo"}
            </span>
          </div>
          <div style={{ flex: 1, padding: "16px", overflowY: "auto", maxHeight: "520px" }}>
            {loadingFile ? (
              <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                {[...Array(8)].map((_, i) => <div key={i} style={{ height: "14px", backgroundColor: "var(--card-elevated)", borderRadius: "3px", width: `${60 + Math.random() * 40}%`, opacity: 0.5 }} />)}
              </div>
            ) : selected ? (
              <pre style={{ fontFamily: "var(--font-mono)", fontSize: "12px", color: "var(--text-secondary)", whiteSpace: "pre-wrap", lineHeight: 1.7, margin: 0 }}>{selected.content}</pre>
            ) : (
              <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", height: "100%", color: "var(--text-muted)" }}>
                <FileText size={24} style={{ opacity: 0.2, marginBottom: "10px" }} />
                <p style={{ fontSize: "13px" }}>Clique em um arquivo para visualizar</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
