"use client";
import dynamic from "next/dynamic";
import { Building2, Info } from "lucide-react";

const OfficeScene = dynamic(
  () => import("@/components/Office3D/Scene").then((m) => m.OfficeScene),
  {
    ssr: false,
    loading: () => (
      <div style={{
        flex: 1,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
        gap: "16px",
        color: "var(--text-muted)",
      }}>
        <Building2 size={40} style={{ opacity: 0.3, animation: "pulse 2s infinite" }} />
        <p style={{ fontSize: "14px", fontFamily: "var(--font-mono)" }}>
          Carregando escritório 3D...
        </p>
      </div>
    ),
  }
);

export default function OfficePage() {
  return (
    <div style={{ height: "100%", display: "flex", flexDirection: "column" }}>
      {/* Header */}
      <div style={{
        padding: "16px 28px",
        borderBottom: "1px solid var(--border)",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        flexShrink: 0,
      }}>
        <div>
          <h1 style={{
            fontFamily: "var(--font-heading)",
            fontSize: "22px",
            fontWeight: 700,
            letterSpacing: "-1px",
            color: "var(--text-primary)",
            margin: 0,
          }}>
            🏢 Escritório 3D
          </h1>
          <p style={{ color: "var(--text-secondary)", fontSize: "13px", marginTop: "3px" }}>
            Visualização em tempo real dos agentes INTELLBUSINESS
          </p>
        </div>

        {/* Legend */}
        <div style={{
          display: "flex",
          gap: "16px",
          fontSize: "11px",
          fontFamily: "var(--font-mono)",
          color: "var(--text-muted)",
        }}>
          {[
            { color: "#4ade80", label: "ativo"   },
            { color: "#F5A800", label: "ocupado" },
            { color: "#6b7280", label: "offline" },
          ].map(({ color, label }) => (
            <div key={label} style={{ display: "flex", alignItems: "center", gap: "5px" }}>
              <span style={{
                width: "8px", height: "8px", borderRadius: "50%",
                backgroundColor: color, display: "inline-block",
              }} />
              {label}
            </div>
          ))}
          <div style={{ display: "flex", alignItems: "center", gap: "5px", color: "var(--text-muted)", marginLeft: "8px" }}>
            <Info size={11} />
            <span>Arrastar · Scroll · Click</span>
          </div>
        </div>
      </div>

      {/* 3D Canvas — ocupa todo o espaço restante */}
      <div style={{ flex: 1, position: "relative", overflow: "hidden" }}>
        <OfficeScene />
      </div>
    </div>
  );
}
