"use client";
import { useEffect, useState } from "react";
import { Activity } from "lucide-react";

interface Entry { id: string; timestamp: string; agent: string; squad: string; type: string; message: string; icon: string; }

const TYPE_COLORS: Record<string, string> = {
  task_completed: "var(--type-message)",
  file_created:   "var(--type-file)",
  code_push:      "var(--type-command)",
  research:       "var(--type-search)",
  review:         "var(--type-cron)",
  planning:       "var(--type-build)",
  deploy:         "var(--positive)",
  migration:      "var(--info)",
};

const TYPE_LABELS: Record<string, string> = {
  task_completed: "Task",
  file_created:   "Arquivo",
  code_push:      "Código",
  research:       "Pesquisa",
  review:         "Revisão",
  planning:       "Planning",
  deploy:         "Deploy",
  migration:      "Migration",
  message:        "Mensagem",
  content:        "Conteúdo",
  design:         "Design",
};

export default function ActivityPage() {
  const [items,  setItems]  = useState<Entry[]>([]);
  const [filter, setFilter] = useState("all");

  useEffect(() => { fetch("/api/activity").then((r) => r.json()).then(setItems).catch(() => {}); }, []);

  const types    = Array.from(new Set(items.map((i) => i.type)));
  const filtered = filter === "all" ? items : items.filter((i) => i.type === filter);

  const grouped: Record<string, Entry[]> = {};
  filtered.forEach((e) => {
    const d = new Date(e.timestamp).toLocaleDateString("pt-BR", { weekday: "long", year: "numeric", month: "long", day: "numeric" });
    if (!grouped[d]) grouped[d] = [];
    grouped[d].push(e);
  });

  return (
    <div style={{ padding: "24px 28px" }}>
      <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: "24px", flexWrap: "wrap", gap: "12px" }}>
        <div>
          <h1 style={{ fontFamily: "var(--font-heading)", fontSize: "28px", fontWeight: 700, letterSpacing: "-1.5px", color: "var(--text-primary)", margin: 0 }}>
            Feed de Atividade
          </h1>
          <p style={{ color: "var(--text-secondary)", fontSize: "14px", marginTop: "4px" }}>{items.length} eventos registrados</p>
        </div>
        <select
          value={filter} onChange={(e) => setFilter(e.target.value)}
          style={{ backgroundColor: "var(--card)", border: "1px solid var(--border)", borderRadius: "var(--radius-md)", padding: "8px 12px", color: "var(--text-secondary)", fontSize: "13px", outline: "none", cursor: "pointer" }}
        >
          <option value="all">Todos</option>
          {types.map((t) => <option key={t} value={t}>{TYPE_LABELS[t] ?? t}</option>)}
        </select>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
        {Object.entries(grouped).map(([date, entries]) => (
          <div key={date}>
            <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "10px" }}>
              <span style={{ fontSize: "11px", color: "var(--text-muted)", fontFamily: "var(--font-mono)", textTransform: "uppercase", letterSpacing: "0.5px" }}>{date}</span>
              <div style={{ flex: 1, height: "1px", backgroundColor: "var(--border)" }} />
              <span style={{ fontSize: "10px", color: "var(--text-muted)", fontFamily: "var(--font-mono)" }}>{entries.length}</span>
            </div>
            <div className="card" style={{ overflow: "hidden" }}>
              {entries.map((e, i) => {
                const tc = TYPE_COLORS[e.type] ?? "var(--text-muted)";
                return (
                  <div
                    key={e.id}
                    style={{
                      display: "flex", alignItems: "center", gap: "14px",
                      padding: "12px 20px",
                      borderBottom: i < entries.length - 1 ? "1px solid var(--border)" : "none",
                      transition: "background 150ms",
                    }}
                    onMouseEnter={(el) => (el.currentTarget.style.backgroundColor = "var(--surface-hover)")}
                    onMouseLeave={(el) => (el.currentTarget.style.backgroundColor = "transparent")}
                  >
                    <div style={{
                      width: "34px", height: "34px", borderRadius: "var(--radius-md)",
                      backgroundColor: `${tc}15`, display: "flex", alignItems: "center", justifyContent: "center",
                      fontSize: "16px", flexShrink: 0,
                    }}>
                      {e.icon}
                    </div>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ fontSize: "13px", color: "var(--text-primary)", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                        {e.message}
                      </div>
                      <div style={{ fontSize: "11px", color: "var(--text-muted)", fontFamily: "var(--font-mono)", marginTop: "2px" }}>
                        {e.agent} · {e.squad} · {new Date(e.timestamp).toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit" })}
                      </div>
                    </div>
                    <span style={{
                      fontSize: "10px", fontFamily: "var(--font-mono)", fontWeight: 700,
                      color: tc, backgroundColor: `${tc}15`,
                      padding: "2px 7px", borderRadius: "var(--radius-sm)",
                      textTransform: "uppercase", letterSpacing: "0.5px", flexShrink: 0,
                    }}>
                      {TYPE_LABELS[e.type] ?? e.type}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        ))}
        {filtered.length === 0 && (
          <div style={{ textAlign: "center", padding: "64px 0", color: "var(--text-muted)" }}>
            <Activity size={32} style={{ margin: "0 auto 12px", opacity: 0.3, display: "block" }} />
            <p style={{ fontSize: "13px" }}>Nenhuma atividade encontrada</p>
          </div>
        )}
      </div>
    </div>
  );
}
