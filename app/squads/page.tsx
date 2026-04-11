import { getAllSquads } from "@/lib/squads";
import SectionHeader from "@/components/Shell/SectionHeader";
import { Users } from "lucide-react";

export const dynamic = "force-dynamic";

const COLORS: Record<string, string> = {
  "branding-design":    "#F5A800",
  "intellbusiness-hub": "#3B82F6",
  "product-strategy":   "#10B981",
  "sales-content":      "#8B5CF6",
  "whatsapp-agents":    "#EC4899",
};

export default function SquadsPage() {
  const squads = getAllSquads();

  return (
    <div style={{ padding: "24px 28px" }}>
      <div style={{ marginBottom: "24px" }}>
        <h1 style={{ fontFamily: "var(--font-heading)", fontSize: "28px", fontWeight: 700, letterSpacing: "-1.5px", color: "var(--text-primary)", margin: 0 }}>Squads</h1>
        <p style={{ color: "var(--text-secondary)", fontSize: "14px", marginTop: "4px" }}>{squads.length} squads configurados</p>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(340px, 1fr))", gap: "14px" }}>
        {squads.map((squad) => {
          const color = COLORS[squad.slug] ?? "#6B7280";
          const agentCount = squad.config.agents?.length ?? 0;
          const taskCount  = squad.config.tasks?.length  ?? 0;
          const active     = squad.config.agents?.filter((a) => a.status === "active").length ?? 0;

          return (
            <div
              key={squad.slug}
              className="card"
              style={{ overflow: "hidden", borderTop: `3px solid ${color}`, transition: "border-color 150ms" }}
            >
              <SectionHeader
                title={squad.slug}
                icon={<Users size={15} style={{ color }} />}
                action={
                  <div style={{ display: "flex", alignItems: "center", gap: "5px", backgroundColor: "var(--positive-soft)", border: "1px solid var(--positive)", borderRadius: "var(--radius-sm)", padding: "2px 8px" }}>
                    <span style={{ width: "5px", height: "5px", borderRadius: "50%", backgroundColor: "var(--positive)", display: "inline-block" }} />
                    <span style={{ fontSize: "10px", color: "var(--positive)", fontFamily: "var(--font-mono)", fontWeight: 700 }}>ATIVO</span>
                  </div>
                }
              />

              <div style={{ padding: "16px 20px" }}>
                <p style={{ fontSize: "13px", color: "var(--text-secondary)", marginBottom: "16px", lineHeight: 1.5 }}>
                  {squad.config.squad.description}
                </p>

                {/* Stats row */}
                <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "8px", marginBottom: "16px" }}>
                  {[
                    { label: "Agentes", value: agentCount, sub: `${active} ativos` },
                    { label: "Tasks",   value: taskCount,  sub: "mapeadas" },
                    { label: "Versão",  value: squad.config.squad.version, sub: "atual" },
                  ].map((s) => (
                    <div key={s.label} style={{ backgroundColor: "var(--card-elevated)", border: "1px solid var(--border)", borderRadius: "var(--radius-md)", padding: "10px", textAlign: "center" }}>
                      <div style={{ fontFamily: "var(--font-heading)", fontSize: "20px", fontWeight: 700, color, marginBottom: "2px" }}>{s.value}</div>
                      <div style={{ fontSize: "10px", color: "var(--text-muted)", fontFamily: "var(--font-mono)" }}>{s.label}</div>
                      <div style={{ fontSize: "9px", color: "var(--text-muted)", opacity: 0.7 }}>{s.sub}</div>
                    </div>
                  ))}
                </div>

                {/* Agent list */}
                {squad.config.agents && squad.config.agents.length > 0 && (
                  <div>
                    <div style={{ fontSize: "10px", color: "var(--text-muted)", fontFamily: "var(--font-mono)", marginBottom: "8px", textTransform: "uppercase", letterSpacing: "0.5px" }}>Agentes</div>
                    <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
                      {squad.config.agents.map((a) => (
                        <div key={a.id} style={{ display: "flex", alignItems: "center", gap: "8px", padding: "6px 0" }}>
                          <span style={{ width: "6px", height: "6px", borderRadius: "50%", backgroundColor: a.status === "active" ? "var(--positive)" : "var(--text-muted)", display: "inline-block", flexShrink: 0 }} />
                          <span style={{ flex: 1, fontSize: "12px", color: "var(--text-secondary)", fontFamily: "var(--font-mono)", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{a.id}</span>
                          <span style={{ fontSize: "10px", color: "var(--text-muted)", backgroundColor: "var(--card-elevated)", padding: "1px 5px", borderRadius: "var(--radius-sm)", fontFamily: "var(--font-mono)" }}>
                            T{(a as { tier?: number }).tier ?? 1}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                <div style={{ marginTop: "14px", paddingTop: "12px", borderTop: "1px solid var(--border)", fontSize: "10px", color: "var(--text-muted)", fontFamily: "var(--font-mono)" }}>
                  Criado {new Date(squad.config.squad.created_at).toLocaleDateString("pt-BR")}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
