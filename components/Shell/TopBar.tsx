"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { Bell, Search } from "lucide-react";

export default function TopBar() {
  const [time, setTime] = useState("");
  const [unread, setUnread] = useState(0);

  useEffect(() => {
    const tick = () => {
      setTime(new Date().toLocaleTimeString("pt-BR", {
        hour: "2-digit", minute: "2-digit", second: "2-digit"
      }));
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    fetch("/api/notifications")
      .then((r) => r.json())
      .then((data) => setUnread(data.filter((n: { read: boolean }) => !n.read).length))
      .catch(() => {});
  }, []);

  return (
    <header style={{
      position: "fixed",
      top: 0,
      left: 0,
      right: 0,
      height: "var(--topbar-height)",
      backgroundColor: "var(--surface)",
      borderBottom: "1px solid var(--border)",
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      padding: "0 16px",
      zIndex: 50,
    }}>
      {/* Left — Logo */}
      <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
        <img src="/logo.png" height={28} style={{ objectFit: "contain" }} alt="INTELLBUSINESS" />
        <span style={{
          fontSize: "10px",
          fontFamily: "var(--font-mono)",
          color: "var(--text-muted)",
          backgroundColor: "var(--card-elevated)",
          border: "1px solid var(--border)",
          padding: "1px 6px",
          borderRadius: "var(--radius-sm)",
        }}>
          v5.0
        </span>
      </div>

      {/* Right */}
      <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
        {/* Search hint */}
        <Link href="/files" style={{
          display: "flex",
          alignItems: "center",
          gap: "6px",
          padding: "5px 10px",
          backgroundColor: "var(--card-elevated)",
          border: "1px solid var(--border)",
          borderRadius: "var(--radius-md)",
          color: "var(--text-muted)",
          fontSize: "12px",
          fontFamily: "var(--font-mono)",
          textDecoration: "none",
          cursor: "pointer",
        }}>
          <Search size={12} />
          <span>Buscar...</span>
          <span style={{
            fontSize: "10px",
            color: "var(--text-muted)",
            backgroundColor: "var(--surface)",
            padding: "0 4px",
            borderRadius: "3px",
            border: "1px solid var(--border-strong)",
          }}>
            ⌘K
          </span>
        </Link>

        {/* Bell */}
        <Link href="/notifications" style={{ position: "relative", color: "var(--text-secondary)", display: "flex" }}>
          <Bell size={16} />
          {unread > 0 && (
            <span style={{
              position: "absolute",
              top: "-4px",
              right: "-4px",
              width: "14px",
              height: "14px",
              backgroundColor: "var(--accent)",
              borderRadius: "50%",
              fontSize: "8px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontWeight: 700,
              color: "white",
              fontFamily: "var(--font-mono)",
            }}>
              {unread}
            </span>
          )}
        </Link>

        {/* Clock */}
        <span style={{
          fontSize: "11px",
          fontFamily: "var(--font-mono)",
          color: "var(--text-muted)",
        }}>
          {time}
        </span>

        {/* Avatar */}
        <div style={{
          width: "28px",
          height: "28px",
          borderRadius: "50%",
          backgroundColor: "var(--accent-soft)",
          border: "1px solid var(--accent)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: "11px",
          fontWeight: 700,
          color: "var(--accent)",
          fontFamily: "var(--font-heading)",
          cursor: "pointer",
        }}>
          IB
        </div>
      </div>
    </header>
  );
}
