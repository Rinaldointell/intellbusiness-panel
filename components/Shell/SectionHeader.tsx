import React from "react";
import Link from "next/link";

interface Props {
  title: string;
  icon?: React.ReactNode;
  linkHref?: string;
  linkLabel?: string;
  action?: React.ReactNode;
}

export default function SectionHeader({ title, icon, linkHref, linkLabel = "Ver tudo →", action }: Props) {
  return (
    <div style={{
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      padding: "14px 20px",
      borderBottom: "1px solid var(--border)",
    }}>
      <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
        <div className="accent-line" />
        <h2 style={{
          fontFamily: "var(--font-heading)",
          fontSize: "15px",
          fontWeight: 600,
          color: "var(--text-primary)",
          margin: 0,
          display: "flex",
          alignItems: "center",
          gap: "8px",
        }}>
          {icon}{title}
        </h2>
      </div>
      {linkHref ? (
        <Link href={linkHref} style={{
          fontSize: "13px",
          fontWeight: 500,
          color: "var(--accent)",
          textDecoration: "none",
        }}>
          {linkLabel}
        </Link>
      ) : action}
    </div>
  );
}
