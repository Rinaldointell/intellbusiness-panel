"use client";
import { useEffect, useState } from "react";
import { Bell, CheckCheck, Info, AlertTriangle, CheckCircle, XCircle } from "lucide-react";

interface Notif { id: string; timestamp: string; type: "success"|"info"|"warning"|"error"; title: string; message: string; read: boolean; agent: string; }

const CFG = {
  success: { Icon: CheckCircle, color: "var(--positive)",  bg: "var(--positive-soft)"  },
  info:    { Icon: Info,         color: "var(--info)",     bg: "var(--info-soft)"      },
  warning: { Icon: AlertTriangle,color: "var(--warning)",  bg: "var(--warning-soft)"   },
  error:   { Icon: XCircle,      color: "var(--negative)", bg: "var(--negative-soft)"  },
};

export default function NotificationsPage() {
  const [notifs, setNotifs] = useState<Notif[]>([]);

  useEffect(() => { fetch("/api/notifications").then((r) => r.json()).then(setNotifs).catch(() => {}); }, []);

  const markRead = async (id: string) => {
    await fetch("/api/notifications", { method: "PATCH", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ id }) });
    setNotifs((p) => p.map((n) => n.id === id ? { ...n, read: true } : n));
  };

  const markAll = async () => {
    await fetch("/api/notifications", { method: "PATCH", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ id: "all" }) });
    setNotifs((p) => p.map((n) => ({ ...n, read: true })));
  };

  const unread = notifs.filter((n) => !n.read).length;

  return (
    <div style={{ padding: "24px 28px" }}>
      <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: "24px" }}>
        <div>
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <h1 style={{ fontFamily: "var(--font-heading)", fontSize: "28px", fontWeight: 700, letterSpacing: "-1.5px", color: "var(--text-primary)", margin: 0 }}>
              Notificações
            </h1>
            {unread > 0 && (
              <span style={{ backgroundColor: "var(--accent)", color: "white", borderRadius: "10px", fontSize: "11px", fontWeight: 700, padding: "1px 8px", fontFamily: "var(--font-mono)" }}>
                {unread}
              </span>
            )}
          </div>
          <p style={{ color: "var(--text-secondary)", fontSize: "14px", marginTop: "4px" }}>{notifs.length} notificações · {unread} não lidas</p>
        </div>
        {unread > 0 && (
          <button onClick={markAll} style={{
            display: "flex", alignItems: "center", gap: "6px",
            padding: "8px 14px", backgroundColor: "var(--card)", border: "1px solid var(--border)",
            borderRadius: "var(--radius-md)", color: "var(--text-secondary)", fontSize: "12px",
            cursor: "pointer", fontFamily: "var(--font-mono)",
          }}>
            <CheckCheck size={12} /> Marcar todas
          </button>
        )}
      </div>

      <div className="card" style={{ overflow: "hidden" }}>
        {notifs.map((n, i) => {
          const { Icon, color, bg } = CFG[n.type] ?? CFG.info;
          return (
            <div
              key={n.id}
              style={{
                display: "flex", alignItems: "flex-start", gap: "14px",
                padding: "14px 20px",
                borderBottom: i < notifs.length - 1 ? "1px solid var(--border)" : "none",
                opacity: n.read ? 0.55 : 1,
                transition: "all 150ms",
              }}
              onMouseEnter={(el) => (el.currentTarget.style.backgroundColor = "var(--surface-hover)")}
              onMouseLeave={(el) => (el.currentTarget.style.backgroundColor = "transparent")}
            >
              <div style={{ width: "30px", height: "30px", borderRadius: "var(--radius-md)", backgroundColor: bg, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                <Icon size={14} style={{ color }} />
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "3px" }}>
                  <span style={{ fontSize: "13px", fontWeight: 600, color: "var(--text-primary)", fontFamily: "var(--font-heading)" }}>{n.title}</span>
                  {!n.read && <span style={{ width: "6px", height: "6px", borderRadius: "50%", backgroundColor: "var(--accent)", display: "inline-block", flexShrink: 0 }} />}
                </div>
                <p style={{ fontSize: "12px", color: "var(--text-secondary)", margin: 0, marginBottom: "4px" }}>{n.message}</p>
                <span style={{ fontSize: "10px", color: "var(--text-muted)", fontFamily: "var(--font-mono)" }}>
                  {n.agent} · {new Date(n.timestamp).toLocaleString("pt-BR", { day: "2-digit", month: "2-digit", hour: "2-digit", minute: "2-digit" })}
                </span>
              </div>
              {!n.read && (
                <button onClick={() => markRead(n.id)} title="Marcar como lida" style={{
                  padding: "6px", borderRadius: "var(--radius-sm)", backgroundColor: "transparent",
                  border: "none", color: "var(--text-muted)", cursor: "pointer", flexShrink: 0,
                  transition: "color 150ms",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "var(--text-primary)")}
                onMouseLeave={(e) => (e.currentTarget.style.color = "var(--text-muted)")}
                >
                  <CheckCheck size={13} />
                </button>
              )}
            </div>
          );
        })}
        {notifs.length === 0 && (
          <div style={{ textAlign: "center", padding: "64px 0", color: "var(--text-muted)" }}>
            <Bell size={28} style={{ margin: "0 auto 10px", opacity: 0.3, display: "block" }} />
            <p style={{ fontSize: "13px" }}>Nenhuma notificação</p>
          </div>
        )}
      </div>
    </div>
  );
}
