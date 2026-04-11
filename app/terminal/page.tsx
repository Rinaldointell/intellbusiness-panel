"use client";
import { useState, useRef, useEffect } from "react";
import { Terminal as TermIcon, Shield } from "lucide-react";

const ALLOWED = ["ls","ls -la","pwd","node --version","npm --version","git status","git log --oneline -10","git branch","cat package.json","echo hello","help","clear"];

interface Line { type: "input"|"output"|"error"|"system"; text: string; ts?: string; }

function ts() { return new Date().toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit", second: "2-digit" }); }

export default function TerminalPage() {
  const [input, setInput]   = useState("");
  const [lines, setLines]   = useState<Line[]>([
    { type: "system", text: "╔═══════════════════════════════════════╗" },
    { type: "system", text: "║  INTELLBUSINESS · TERMINAL READ-ONLY  ║" },
    { type: "system", text: "╚═══════════════════════════════════════╝" },
    { type: "system", text: "" },
    { type: "system", text: 'Digite "help" para ver comandos disponíveis.' },
  ]);
  const [history, setHistory] = useState<string[]>([]);
  const [histIdx, setHistIdx] = useState(-1);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => { bottomRef.current?.scrollIntoView({ behavior: "smooth" }); }, [lines]);

  const add = (type: Line["type"], text: string) => setLines((p) => [...p, { type, text, ts: ts() }]);

  const run = async (cmd: string) => {
    const t = cmd.trim();
    if (!t) return;
    add("input", `$ ${t}`);
    setHistory((p) => [t, ...p.slice(0, 49)]);
    setHistIdx(-1);

    if (t === "help") { add("system", "Comandos:"); ALLOWED.forEach((c) => add("output", `  ${c}`)); return; }
    if (t === "clear") { setLines([]); return; }
    if (!ALLOWED.includes(t)) { add("error", `Bloqueado: "${t}"`); return; }

    try {
      const r = await fetch("/api/terminal", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ command: t }) });
      const d = await r.json();
      if (d.output) d.output.split("\n").forEach((l: string) => add("output", l));
      if (d.error)  add("error", d.error);
    } catch { add("error", "Falha ao executar."); }
  };

  const onKey = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter")     { run(input); setInput(""); }
    else if (e.key === "ArrowUp")   { const i = Math.min(histIdx+1, history.length-1); setHistIdx(i); setInput(history[i] ?? ""); e.preventDefault(); }
    else if (e.key === "ArrowDown") { const i = Math.max(histIdx-1, -1); setHistIdx(i); setInput(i === -1 ? "" : history[i]); e.preventDefault(); }
  };

  const COLOR: Record<Line["type"], string> = {
    input:  "var(--accent)",
    output: "var(--text-secondary)",
    error:  "var(--negative)",
    system: "var(--text-muted)",
  };

  return (
    <div style={{ padding: "24px 28px" }}>
      <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: "20px" }}>
        <div>
          <h1 style={{ fontFamily: "var(--font-heading)", fontSize: "28px", fontWeight: 700, letterSpacing: "-1.5px", color: "var(--text-primary)", margin: 0 }}>Terminal</h1>
          <p style={{ color: "var(--text-secondary)", fontSize: "14px", marginTop: "4px" }}>Modo somente-leitura — comandos seguros</p>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: "6px", padding: "6px 12px", backgroundColor: "var(--warning-soft)", border: "1px solid var(--warning)", borderRadius: "var(--radius-md)" }}>
          <Shield size={12} style={{ color: "var(--warning)" }} />
          <span style={{ fontSize: "10px", color: "var(--warning)", fontFamily: "var(--font-mono)", fontWeight: 700 }}>READ-ONLY</span>
        </div>
      </div>

      <div className="card" style={{ overflow: "hidden" }}>
        {/* Titlebar */}
        <div style={{ display: "flex", alignItems: "center", gap: "8px", padding: "10px 14px", backgroundColor: "var(--card-elevated)", borderBottom: "1px solid var(--border)" }}>
          <div style={{ display: "flex", gap: "5px" }}>
            <span style={{ width: "10px", height: "10px", borderRadius: "50%", backgroundColor: "#FF5F56", display: "inline-block" }} />
            <span style={{ width: "10px", height: "10px", borderRadius: "50%", backgroundColor: "#FFBD2E", display: "inline-block" }} />
            <span style={{ width: "10px", height: "10px", borderRadius: "50%", backgroundColor: "#27C93F", display: "inline-block" }} />
          </div>
          <span style={{ flex: 1, textAlign: "center", fontSize: "11px", color: "var(--text-muted)", fontFamily: "var(--font-mono)" }}>intellbusiness — terminal</span>
          <TermIcon size={11} style={{ color: "var(--text-muted)" }} />
        </div>

        {/* Output */}
        <div style={{ height: "400px", overflowY: "auto", padding: "14px 16px", backgroundColor: "#080808" }}>
          {lines.map((l, i) => (
            <div key={i} style={{ fontFamily: "var(--font-mono)", fontSize: "12px", lineHeight: "1.7", color: COLOR[l.type] }}>
              {l.ts && l.type === "input" && (
                <span style={{ color: "var(--text-muted)", fontSize: "10px", marginRight: "8px" }}>[{l.ts}]</span>
              )}
              {l.text || "\u00A0"}
            </div>
          ))}
          <div ref={bottomRef} />
        </div>

        {/* Input */}
        <div style={{ display: "flex", alignItems: "center", gap: "8px", padding: "10px 16px", borderTop: "1px solid var(--border)", backgroundColor: "#050505" }}>
          <span style={{ color: "var(--accent)", fontFamily: "var(--font-mono)", fontSize: "14px" }}>$</span>
          <input
            value={input} onChange={(e) => setInput(e.target.value)} onKeyDown={onKey}
            placeholder="Digite um comando..."
            autoFocus autoComplete="off" spellCheck={false}
            style={{ flex: 1, background: "transparent", border: "none", outline: "none", color: "var(--text-primary)", fontFamily: "var(--font-mono)", fontSize: "12px" }}
          />
        </div>
      </div>

      {/* Command chips */}
      <div className="card" style={{ marginTop: "12px", padding: "14px 16px" }}>
        <div style={{ fontSize: "10px", color: "var(--text-muted)", fontFamily: "var(--font-mono)", marginBottom: "10px", textTransform: "uppercase", letterSpacing: "0.5px" }}>Comandos disponíveis</div>
        <div style={{ display: "flex", flexWrap: "wrap", gap: "6px" }}>
          {ALLOWED.map((cmd) => (
            <button key={cmd} onClick={() => setInput(cmd)} style={{
              padding: "4px 10px", backgroundColor: "var(--card-elevated)", border: "1px solid var(--border)",
              borderRadius: "var(--radius-sm)", fontSize: "11px", color: "var(--text-muted)", cursor: "pointer",
              fontFamily: "var(--font-mono)", transition: "all 150ms",
            }}
            onMouseEnter={(e) => { e.currentTarget.style.borderColor = "var(--accent)"; e.currentTarget.style.color = "var(--accent)"; }}
            onMouseLeave={(e) => { e.currentTarget.style.borderColor = "var(--border)";  e.currentTarget.style.color = "var(--text-muted)"; }}
            >
              {cmd}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
