import React from "react";

interface Props {
  title: string;
  value: string | number;
  icon: React.ReactNode;
  iconColor?: string;
  trend?: { value: number; isPositive: boolean };
}

export function StatsCard({ title, value, icon, iconColor = "var(--accent)", trend }: Props) {
  return (
    <div style={{
      backgroundColor: "var(--card)",
      border: "1px solid var(--border)",
      borderRadius: "var(--radius-lg)",
      padding: "20px",
    }}>
      <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: "12px" }}>
        <span style={{ fontSize: "12px", color: "var(--text-secondary)", fontWeight: 500 }}>{title}</span>
        <span style={{ color: iconColor }}>{icon}</span>
      </div>
      <div style={{
        fontFamily: "var(--font-heading)",
        fontSize: "28px",
        fontWeight: 700,
        letterSpacing: "-1.5px",
        color: "var(--text-primary)",
        lineHeight: 1,
      }}>
        {value}
      </div>
      {trend && (
        <div style={{
          marginTop: "8px",
          fontSize: "11px",
          color: trend.isPositive ? "var(--positive)" : "var(--negative)",
        }}>
          {trend.isPositive ? "↑" : "↓"} {Math.abs(trend.value)}%
        </div>
      )}
    </div>
  );
}
