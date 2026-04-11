"use client";
import { useEffect, useState } from "react";
import { Clock, Play, Pause, CheckCircle, XCircle } from "lucide-react";
import SectionHeader from "@/components/Shell/SectionHeader";

interface CronJob { id: string; name: string; schedule: string; description: string; agent: string; squad: string; enabled: boolean; lastRun: string|null; nextRun: string|null; status: string; avgDuration: number; }

function parseCron(s: string) {
  const [min, hour, , , dow] = s.split(" ");
  if (min.startsWith("*/")) return `A cada ${min.slice(2)}min`;
  if (hour === "*") return `Aos ${min}min de cada hora`;
  const days: Record<string, string> = { "1":"Seg","2":"Ter","3":"Qua","4":"Qui","5":"Sex","6":"Sáb","0":"Dom" };
  const dayStr = dow === "*" ? "Diário" : dow.split(",").map((d) => days[d] ?? d).join(", ");
  return `${dayStr} ${hour.padStart(2,"0")}:${min.padStart(2,"0")}`;
}

const DAYS = ["Dom","Seg","Ter","Qua","Qui","Sex","Sáb"];

export default function CronPage() {
  const [jobs, setJobs] = useState<CronJob[]>([]);

  useEffect(() => { fetch("/api/cron").then((r) => r.json()).then(setJobs).catch(() => {}); }, []);

  const toggle = async (id: string, enabled: boolean) => {
    await fetch("/api/cron", { method: "PATCH", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ id, enabled }) });
    setJobs((p) => p.map((j) => j.id === id ? { ...j, enabled, status: enabled ? "success" : "disabled" } : j));
  };

  const active = jobs.filter((j) => j.enabled).length;

  return (
    <div style={{ padding: "24px 28px" }}>
      <div style={{ marginBottom: "24px" }}>
        <h1 style={{ fontFamily: "var(--font-heading)", fontSize: "28px", fontWeight: 700, letterSpacing: "-1.5px", color: "var(--text-primary)", margin: 0 }}>Cron Manager</h1>
        <p style={{ color: "var(--text-secondary)", fontSize: "14px", marginTop: "4px" }}>{jobs.length} jobs · {active} ativos</p>
      </div>

      {/* Weekly timeline */}
      <div className="card" style={{ marginBottom: "16px", overflow: "hidden" }}>
        <SectionHeader title="Timeline Semanal" icon={<Clock size={15} />} />
        <div style={{ padding: "16px 20px", display: "grid", gridTemplateColumns: "repeat(7, 1fr)", gap: "8px" }}>
          {DAYS.map((day, idx) => {
            const dayJobs = jobs.filter((j) => {
              if (!j.enabled) return false;
              const parts = j.schedule.split(" ");
              const dow = parts[4];
              return dow === "*" || dow.split(",").includes(String(idx));
            });
            return (
              <div key={day}>
                <div style={{ fontSize: "10px", color: "var(--text-muted)", fontFamily: "var(--font-mono)", textAlign: "center", marginBottom: "6px" }}>{day}</div>
                <div style={{ minHeight: "60px", backgroundColor: "var(--card-elevated)", borderRadius: "var(--radius-md)", border: "1px solid var(--border)", padding: "4px", display: "flex", flexDirection: "column", gap: "3px" }}>
                  {dayJobs.map((j) => (
                    <div key={j.id} title={j.name} style={{
                      fontSize: "9px", backgroundColor: "var(--accent-soft)", color: "var(--accent)",
                      borderRadius: "3px", padding: "2px 4px", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap",
                      fontFamily: "var(--font-mono)",
                    }}>
                      {j.name.split(" ")[0]}
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Jobs */}
      <div className="card" style={{ overflow: "hidden" }}>
        {jobs.map((job, i) => (
          <div
            key={job.id}
            style={{
              display: "flex", alignItems: "flex-start", gap: "14px",
              padding: "14px 20px",
              borderBottom: i < jobs.length - 1 ? "1px solid var(--border)" : "none",
              opacity: job.enabled ? 1 : 0.5,
              transition: "all 150ms",
            }}
            onMouseEnter={(el) => (el.currentTarget.style.backgroundColor = "var(--surface-hover)")}
            onMouseLeave={(el) => (el.currentTarget.style.backgroundColor = "transparent")}
          >
            <div style={{ marginTop: "2px", flexShrink: 0 }}>
              {job.status === "success" && <CheckCircle size={14} style={{ color: "var(--positive)" }} />}
              {job.status === "error"   && <XCircle    size={14} style={{ color: "var(--negative)" }} />}
              {job.status === "disabled"&& <Pause      size={14} style={{ color: "var(--text-muted)"}} />}
            </div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ display: "flex", alignItems: "center", gap: "8px", flexWrap: "wrap", marginBottom: "4px" }}>
                <span style={{ fontFamily: "var(--font-heading)", fontWeight: 600, fontSize: "13px", color: "var(--text-primary)" }}>{job.name}</span>
                <span style={{ fontSize: "10px", fontFamily: "var(--font-mono)", color: "var(--text-muted)", backgroundColor: "var(--card-elevated)", border: "1px solid var(--border)", borderRadius: "var(--radius-sm)", padding: "1px 6px" }}>
                  {parseCron(job.schedule)}
                </span>
                <span style={{ fontSize: "9px", fontFamily: "var(--font-mono)", color: "var(--text-muted)", opacity: 0.6 }}>{job.schedule}</span>
              </div>
              <p style={{ fontSize: "12px", color: "var(--text-secondary)", margin: "0 0 6px" }}>{job.description}</p>
              <div style={{ fontSize: "10px", color: "var(--text-muted)", fontFamily: "var(--font-mono)", display: "flex", gap: "10px", flexWrap: "wrap" }}>
                <span>{job.agent}</span>
                <span>·</span>
                <span>{job.squad}</span>
                {job.lastRun && <><span>·</span><span>Último: {new Date(job.lastRun).toLocaleString("pt-BR", { day: "2-digit", month: "2-digit", hour: "2-digit", minute: "2-digit" })}</span></>}
                {job.nextRun && <><span>·</span><span style={{ color: "var(--accent)" }}>Próx: {new Date(job.nextRun).toLocaleString("pt-BR", { day: "2-digit", month: "2-digit", hour: "2-digit", minute: "2-digit" })}</span></>}
                <span>·</span><span>~{(job.avgDuration / 1000).toFixed(1)}s</span>
              </div>
            </div>
            <button
              onClick={() => toggle(job.id, !job.enabled)}
              style={{
                display: "flex", alignItems: "center", gap: "5px",
                padding: "6px 10px", borderRadius: "var(--radius-md)", border: "1px solid",
                fontSize: "11px", fontFamily: "var(--font-mono)", cursor: "pointer", flexShrink: 0,
                backgroundColor: job.enabled ? "var(--positive-soft)" : "var(--card-elevated)",
                borderColor:     job.enabled ? "var(--positive)"      : "var(--border)",
                color:           job.enabled ? "var(--positive)"      : "var(--text-muted)",
                transition: "all 150ms",
              }}
            >
              {job.enabled ? <><Play size={10} /> Ativo</> : <><Pause size={10} /> Pausado</>}
            </button>
          </div>
        ))}
        {jobs.length === 0 && (
          <p style={{ padding: "32px 20px", color: "var(--text-muted)", fontSize: "13px", textAlign: "center" }}>Carregando...</p>
        )}
      </div>
    </div>
  );
}
