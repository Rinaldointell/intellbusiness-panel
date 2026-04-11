"use client";
import { useEffect, useState } from "react";
import { Cpu, HardDrive, Wifi, Shield } from "lucide-react";

interface Sys {
  cpuPercent: number;
  memPercent: number;
  usedMem: number;
  totalMem: number;
  uptime: number;
  hostname: string;
  nodeVersion: string;
}

function metricColor(pct: number) {
  if (pct >= 85) return "var(--negative)";
  if (pct >= 60) return "var(--warning)";
  return "var(--positive)";
}

function fmtUptime(s: number) {
  const d = Math.floor(s / 86400);
  const h = Math.floor((s % 86400) / 3600);
  const m = Math.floor((s % 3600) / 60);
  if (d > 0) return `${d}d ${h}h`;
  if (h > 0) return `${h}h ${m}m`;
  return `${m}m`;
}

function Metric({ icon: Icon, label, value, pct }: {
  icon: React.ElementType;
  label: string;
  value: string;
  pct: number;
}) {
  const color = metricColor(pct);
  return (
    <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
      <Icon size={11} style={{ color }} />
      <span style={{ fontFamily: "var(--font-mono)", fontSize: "10px", color: "var(--text-muted)" }}>
        {label}
      </span>
      <div className="gauge-bar" style={{ width: 40 }}>
        <div className="gauge-fill" style={{ width: `${pct}%`, backgroundColor: color }} />
      </div>
      <span style={{ fontFamily: "var(--font-mono)", fontSize: "10px", color: "var(--text-secondary)" }}>
        {value}
      </span>
    </div>
  );
}

export default function StatusBar() {
  const [sys, setSys] = useState<Sys | null>(null);

  useEffect(() => {
    const fetch_ = () => {
      fetch("/api/system").then((r) => r.json()).then(setSys).catch(() => {});
    };
    fetch_();
    const id = setInterval(fetch_, 10000);
    return () => clearInterval(id);
  }, []);

  return (
    <footer style={{
      position: "fixed",
      bottom: 0,
      left: 0,
      right: 0,
      height: "var(--statusbar-height)",
      backgroundColor: "var(--surface)",
      borderTop: "1px solid var(--border)",
      display: "flex",
      alignItems: "center",
      padding: "0 12px",
      gap: "16px",
      zIndex: 50,
    }}>
      {/* Left — System metrics */}
      <div style={{ display: "flex", alignItems: "center", gap: "14px", flex: 1 }}>
        {sys ? (
          <>
            <Metric icon={Cpu} label="CPU" value={`${sys.cpuPercent}%`} pct={sys.cpuPercent} />
            <div style={{ width: "1px", height: "12px", backgroundColor: "var(--border)" }} />
            <Metric
              icon={HardDrive}
              label="RAM"
              value={`${(sys.usedMem / 1024).toFixed(1)}/${(sys.totalMem / 1024).toFixed(0)}GB`}
              pct={sys.memPercent}
            />
            <div style={{ width: "1px", height: "12px", backgroundColor: "var(--border)" }} />
            <span style={{ fontFamily: "var(--font-mono)", fontSize: "10px", color: "var(--text-muted)" }}>
              up {fmtUptime(sys.uptime)}
            </span>
          </>
        ) : (
          <span style={{ fontSize: "10px", color: "var(--text-muted)", fontFamily: "var(--font-mono)" }}>
            carregando métricas...
          </span>
        )}
      </div>

      {/* Right — Status indicators */}
      <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "4px" }}>
          <Wifi size={11} style={{ color: "var(--positive)" }} />
          <span style={{ fontFamily: "var(--font-mono)", fontSize: "10px", color: "var(--text-muted)" }}>online</span>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: "4px" }}>
          <Shield size={11} style={{ color: "var(--positive)" }} />
          <span style={{ fontFamily: "var(--font-mono)", fontSize: "10px", color: "var(--text-muted)" }}>secure</span>
        </div>
        {sys && (
          <span style={{ fontFamily: "var(--font-mono)", fontSize: "10px", color: "var(--text-muted)" }}>
            {sys.hostname} · {sys.nodeVersion}
          </span>
        )}
        <div style={{ display: "flex", alignItems: "center", gap: "4px" }}>
          <span style={{ width: "6px", height: "6px", borderRadius: "50%", backgroundColor: "var(--positive)", display: "inline-block" }} />
          <span style={{ fontFamily: "var(--font-mono)", fontSize: "10px", color: "var(--positive)" }}>operational</span>
        </div>
      </div>
    </footer>
  );
}
