"use client";
import { useEffect, useState } from "react";
import { Bot, Search, Circle } from "lucide-react";
import SectionHeader from "@/components/Shell/SectionHeader";

interface Agent {
  id: string;
  squad: string;
  role: string;
  status: string;
  tier: number;
  dna: string | null;
}

const SQUAD_COLORS: Record<string, string> = {
  "branding-design":    "#F5A800",
  "intellbusiness-hub": "#3B82F6",
  "product-strategy":   "#10B981",
  "sales-content":      "#8B5CF6",
  "whatsapp-agents":    "#EC4899",
};

export default function AgentsPage() {
  const [agents,     setAgents]     = useState<Agent[]>([]);
  const [loading,    setLoading]    = useState(true);
  const [search,     setSearch]     = useState("");
  const [filterSquad, setFilter]   = useState("all");

  useEffect(() => {
    fetch("/api/agents").then((r) => r.json()).then((d) => { setAgents(d); setLoading(false); }).catch(() => setLoading(false));
  }, []);

  const squads  = Array.from(new Set(agents.map((a) => a.squad)));
  const filtered = agents.filter((a) => {
    const q = search.toLowerCase();
    return (!q || a.id.includes(q) || a.role.toLowerCase().includes(q))
      && (filterSquad === "all" || a.squad === filterSquad);
  });
  const activeCount = agents.filter((a) => a.status === "active").length;

  return (
    <div style={{ padding: "24px 28px" }}>
      <div style={{ marginBottom: "24px" }}>
        <h1 style={{ fontFamily: "var(--font-heading)", fontSize: "28px", fontWeight: 700, letterSpacing: "-1.5px", color: "var(--text-primary)", margin: 0 }}>
          Agentes
        </h1>
        <p style={{ color: "var(--text-secondary)", fontSize: "14px", marginTop: "4px" }}>
          {agents.length} agentes · {activeCount} ativos
        </p>
      </div>

      {/* Filters */}
      <div style={{ display: "flex", gap: "10px", marginBottom: "20px", flexWrap: "wrap" }}>
        <div style={{
          display: "flex", alignItems: "center", gap: "8px", flex: 1,
          backgroundColor: "var(--card-elevated)", border: "1px solid var(--border)",
          borderRadius: "var(--radius-md)", padding: "8px 12px",
        }}>
          <Search size={14} style={{ color: "var(--text-muted)" }} />
          <input
            placeholder="Buscar agente..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={{
              background: "transparent", border: "none", outline: "none",
              color: "var(--text-primary)", fontSize: "13px", flex: 1,
              fontFamily: "var(--font-body)",
            }}
          />
        </div>
        <select
          value={filterSquad}
          onChange={(e) => setFilter(e.target.value)}
          style={{
            backgroundColor: "var(--card-elevated)", border: "1px solid var(--border)",
            borderRadius: "var(--radius-md)", padding: "8px 12px",
            color: "var(--text-secondary)", fontSize: "13px", outline: "none", cursor: "pointer",
          }}
        >
          <option value="all">Todos os squads</option>
          {squads.map((s) => <option key={s} value={s}>{s}</option>)}
        </select>
      </div>

      {/* Grid */}
      {loading ? (
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))", gap: "12px" }}>
          {[...Array(6)].map((_, i) => (
            <div key={i} style={{ backgroundColor: "var(--card)", border: "1px solid var(--border)", borderRadius: "var(--radius-lg)", height: "130px", opacity: 0.5 }} />
          ))}
        </div>
      ) : (
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))", gap: "12px" }}>
          {filtered.map((agent) => {
            const color = SQUAD_COLORS[agent.squad] ?? "#6B7280";
            const online = agent.status === "active";
            return (
              <div
                key={`${agent.squad}-${agent.id}`}
                style={{
                  backgroundColor: "var(--card)",
                  border: `1px solid var(--border)`,
                  borderTop: `3px solid ${color}`,
                  borderRadius: "var(--radius-lg)",
                  padding: "16px",
                  cursor: "pointer",
                  transition: "all 150ms ease",
                }}
                onMouseEnter={(e) => { e.currentTarget.style.borderColor = color; e.currentTarget.style.backgroundColor = "var(--surface-hover)"; }}
                onMouseLeave={(e) => { e.currentTarget.style.borderColor = "var(--border)"; e.currentTarget.style.borderTopColor = color; e.currentTarget.style.backgroundColor = "var(--card)"; }}
              >
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "10px" }}>
                  <div style={{
                    width: "36px", height: "36px", borderRadius: "var(--radius-md)",
                    backgroundColor: `${color}15`, border: `1px solid ${color}30`,
                    display: "flex", alignItems: "center", justifyContent: "center",
                  }}>
                    <Bot size={16} style={{ color }} />
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: "5px" }}>
                    <Circle size={7} style={{ fill: online ? "#4ade80" : "#6b7280", color: online ? "#4ade80" : "#6b7280" }} />
                    <span style={{ fontSize: "10px", fontFamily: "var(--font-mono)", color: online ? "var(--positive)" : "var(--text-muted)" }}>
                      {online ? "ativo" : "inativo"}
                    </span>
                  </div>
                </div>
                <div style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "13px", color: "var(--text-primary)", marginBottom: "6px" }}>
                  {agent.id}
                </div>
                <div style={{ fontSize: "11px", color: "var(--text-secondary)", lineHeight: 1.5, marginBottom: "10px" }} className="line-clamp-2">
                  {agent.role}
                </div>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", paddingTop: "10px", borderTop: "1px solid var(--border)" }}>
                  <span style={{ fontSize: "10px", color: "var(--text-muted)", fontFamily: "var(--font-mono)" }}>{agent.squad}</span>
                  <span style={{ fontSize: "10px", color: "var(--text-muted)", backgroundColor: "var(--card-elevated)", padding: "1px 6px", borderRadius: "var(--radius-sm)", fontFamily: "var(--font-mono)" }}>
                    T{agent.tier}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {!loading && filtered.length === 0 && (
        <div style={{ textAlign: "center", padding: "64px 0", color: "var(--text-muted)" }}>
          <Bot size={32} style={{ margin: "0 auto 12px", opacity: 0.3 }} />
          <p style={{ fontSize: "13px" }}>Nenhum agente encontrado</p>
        </div>
      )}
    </div>
  );
}
