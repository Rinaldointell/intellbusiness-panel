"use client";
import { useEffect, useState, useCallback } from "react";
import { Cpu, HardDrive, Monitor, RefreshCw } from "lucide-react";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import SectionHeader from "@/components/Shell/SectionHeader";

interface SysInfo {
  platform: string; arch: string; hostname: string; uptime: number;
  cpuModel: string; cpuCores: number; cpuPercent: number; loadAvg: number[];
  totalMem: number; freeMem: number; usedMem: number; memPercent: number;
  nodeVersion: string; pid: number; timestamp: string;
}

function fmtUptime(s: number) {
  const d = Math.floor(s / 86400), h = Math.floor((s % 86400) / 3600), m = Math.floor((s % 3600) / 60);
  if (d > 0) return `${d}d ${h}h ${m}m`;
  if (h > 0) return `${h}h ${m}m`;
  return `${m}m`;
}

function metricColor(p: number) {
  if (p >= 85) return "var(--negative)";
  if (p >= 60) return "var(--warning)";
  return "var(--positive)";
}

function GaugeCard({ icon: Icon, label, pct, detail }: {
  icon: React.ElementType; label: string; pct: number; detail: React.ReactNode;
}) {
  const color = metricColor(pct);
  return (
    <div className="card" style={{ padding: "20px" }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "16px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <Icon size={16} style={{ color }} />
          <span style={{ fontFamily: "var(--font-heading)", fontSize: "13px", fontWeight: 600, color: "var(--text-primary)" }}>{label}</span>
        </div>
        <span style={{ fontFamily: "var(--font-heading)", fontSize: "26px", fontWeight: 700, color, letterSpacing: "-1px" }}>{pct}%</span>
      </div>
      <div className="gauge-bar" style={{ height: "6px", marginBottom: "16px" }}>
        <div className="gauge-fill" style={{ width: `${pct}%`, backgroundColor: color }} />
      </div>
      <div style={{ fontSize: "12px", color: "var(--text-secondary)", fontFamily: "var(--font-mono)" }}>{detail}</div>
    </div>
  );
}

export default function SystemPage() {
  const [info,    setInfo]    = useState<SysInfo | null>(null);
  const [history, setHistory] = useState<{ t: string; cpu: number; mem: number }[]>([]);

  const fetchData = useCallback(() => {
    fetch("/api/system").then((r) => r.json()).then((d: SysInfo) => {
      setInfo(d);
      const t = new Date(d.timestamp).toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit", second: "2-digit" });
      setHistory((prev) => [...prev.slice(-29), { t, cpu: d.cpuPercent, mem: d.memPercent }]);
    }).catch(() => {});
  }, []);

  useEffect(() => { fetchData(); const id = setInterval(fetchData, 5000); return () => clearInterval(id); }, [fetchData]);

  return (
    <div style={{ padding: "24px 28px" }}>
      <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: "24px" }}>
        <div>
          <h1 style={{ fontFamily: "var(--font-heading)", fontSize: "28px", fontWeight: 700, letterSpacing: "-1.5px", color: "var(--text-primary)", margin: 0 }}>
            Monitor do Sistema
          </h1>
          <p style={{ color: "var(--text-secondary)", fontSize: "14px", marginTop: "4px" }}>Métricas em tempo real · atualiza a cada 5s</p>
        </div>
        <button onClick={fetchData} style={{
          display: "flex", alignItems: "center", gap: "6px",
          padding: "8px 14px", backgroundColor: "var(--card)", border: "1px solid var(--border)",
          borderRadius: "var(--radius-md)", color: "var(--text-secondary)", fontSize: "12px",
          cursor: "pointer", fontFamily: "var(--font-mono)",
        }}>
          <RefreshCw size={12} /> Atualizar
        </button>
      </div>

      {!info ? (
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
          {[...Array(2)].map((_, i) => <div key={i} className="card" style={{ height: "140px", opacity: 0.5 }} />)}
        </div>
      ) : (
        <>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px", marginBottom: "16px" }}>
            <GaugeCard
              icon={Cpu} label="CPU" pct={info.cpuPercent}
              detail={<>{info.cpuModel}<br />{info.cpuCores} núcleos · load {info.loadAvg[0]}</>}
            />
            <GaugeCard
              icon={HardDrive} label="RAM" pct={info.memPercent}
              detail={<>{(info.usedMem / 1024).toFixed(1)} GB usado / {(info.totalMem / 1024).toFixed(1)} GB total</>}
            />
          </div>

          {/* Chart */}
          {history.length > 1 && (
            <div className="card" style={{ marginBottom: "16px", overflow: "hidden" }}>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "14px 20px", borderBottom: "1px solid var(--border)" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                  <div className="accent-line" />
                  <span style={{ fontFamily: "var(--font-heading)", fontSize: "14px", fontWeight: 600, color: "var(--text-primary)" }}>Histórico</span>
                </div>
                <div style={{ display: "flex", gap: "16px", fontSize: "10px", fontFamily: "var(--font-mono)", color: "var(--text-muted)" }}>
                  <span style={{ display: "flex", alignItems: "center", gap: "5px" }}>
                    <span style={{ width: "12px", height: "2px", backgroundColor: "var(--accent)", display: "inline-block" }} /> CPU
                  </span>
                  <span style={{ display: "flex", alignItems: "center", gap: "5px" }}>
                    <span style={{ width: "12px", height: "2px", backgroundColor: "var(--info)", display: "inline-block" }} /> RAM
                  </span>
                </div>
              </div>
              <div style={{ padding: "16px 20px" }}>
                <ResponsiveContainer width="100%" height={130}>
                  <LineChart data={history}>
                    <XAxis dataKey="t" tick={{ fontSize: 9, fill: "var(--text-muted)", fontFamily: "var(--font-mono)" }} axisLine={false} tickLine={false} interval="preserveStartEnd" />
                    <YAxis domain={[0, 100]} tick={{ fontSize: 9, fill: "var(--text-muted)" }} axisLine={false} tickLine={false} width={24} />
                    <Tooltip contentStyle={{ backgroundColor: "var(--card)", border: "1px solid var(--border)", borderRadius: "8px", fontSize: 11, fontFamily: "var(--font-mono)" }} />
                    <Line type="monotone" dataKey="cpu" stroke="var(--accent)" strokeWidth={1.5} dot={false} name="CPU %" />
                    <Line type="monotone" dataKey="mem" stroke="var(--info)"   strokeWidth={1.5} dot={false} name="RAM %" />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>
          )}

          {/* Info grid */}
          <div className="card" style={{ overflow: "hidden" }}>
            <SectionHeader title="Informações" icon={<Monitor size={15} />} />
            <div style={{ padding: "16px 20px", display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "10px" }}>
              {[
                ["Plataforma", `${info.platform} (${info.arch})`],
                ["Hostname",   info.hostname],
                ["Uptime",     fmtUptime(info.uptime)],
                ["Node.js",    info.nodeVersion],
                ["PID",        String(info.pid)],
                ["Atualizado", new Date(info.timestamp).toLocaleTimeString("pt-BR")],
              ].map(([k, v]) => (
                <div key={k} style={{ backgroundColor: "var(--card-elevated)", border: "1px solid var(--border)", borderRadius: "var(--radius-md)", padding: "12px" }}>
                  <div style={{ fontSize: "10px", color: "var(--text-muted)", marginBottom: "4px", fontFamily: "var(--font-mono)" }}>{k}</div>
                  <div style={{ fontSize: "12px", color: "var(--text-secondary)", fontFamily: "var(--font-mono)", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{v}</div>
                </div>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
}
