"use client";
import { useEffect, useState } from "react";
import { StatsCard } from "@/components/StatsCard";
import SectionHeader from "@/components/Shell/SectionHeader";
import {
  Activity,
  CheckCircle,
  XCircle,
  Zap,
  Circle,
  Bot,
  Users,
  Calendar,
  Server,
  Terminal,
  Brain,
  Clock,
  Monitor,
  FolderOpen,
} from "lucide-react";
import Link from "next/link";

interface ActivityEntry {
  id: string;
  timestamp: string;
  agent: string;
  squad: string;
  type: string;
  message: string;
  icon: string;
}

interface AgentData {
  id: string;
  squad: string;
  role: string;
  status: string;
  tier: number;
  dna: string | null;
}

interface Squad {
  slug: string;
  config: {
    squad: { name: string; description: string; version: string };
    agents?: { id: string; status: string }[];
    tasks?: object[];
  };
}

const SQUAD_COLORS: Record<string, string> = {
  "branding-design":    "#F5A800",
  "intellbusiness-hub": "#3B82F6",
  "product-strategy":   "#10B981",
  "sales-content":      "#8B5CF6",
  "whatsapp-agents":    "#EC4899",
};

const TYPE_COLORS: Record<string, string> = {
  task_completed: "var(--type-message)",
  file_created:   "var(--type-file)",
  code_push:      "var(--type-command)",
  research:       "var(--type-search)",
  review:         "var(--type-cron)",
  planning:       "var(--type-build)",
  deploy:         "var(--positive)",
  migration:      "var(--info)",
};

export default function DashboardPage() {
  const [activity, setActivity]     = useState<ActivityEntry[]>([]);
  const [agents,   setAgents]       = useState<AgentData[]>([]);
  const [squads,   setSquads]       = useState<Squad[]>([]);

  useEffect(() => {
    Promise.all([
      fetch("/api/activity").then((r) => r.json()),
      fetch("/api/agents").then((r) => r.json()),
      fetch("/api/squads").then((r) => r.json()),
    ]).then(([act, ag, sq]) => {
      setActivity(act);
      setAgents(ag);
      setSquads(sq);
    }).catch(console.error);
  }, []);

  const stats = {
    total:   activity.length,
    today:   activity.filter((a) => new Date(a.timestamp).toDateString() === new Date().toDateString()).length,
    success: activity.filter((a) => ["task_completed", "deploy", "review"].includes(a.type)).length,
    errors:  activity.filter((a) => a.type === "error").length,
  };

  const quickLinks = [
    { href: "/cron",         icon: Calendar,   label: "Cron Jobs",   color: "#a78bfa" },
    { href: "/system",       icon: Server,     label: "Sistema",     color: "var(--positive)" },
    { href: "/terminal",     icon: Terminal,   label: "Terminal",    color: "#60a5fa" },
    { href: "/memory",       icon: Brain,      label: "Memória",     color: "#f59e0b" },
    { href: "/files",        icon: FolderOpen, label: "Arquivos",    color: "#4ade80" },
    { href: "/notifications",icon: Monitor,    label: "Alertas",     color: "var(--accent)" },
  ];

  return (
    <div style={{ padding: "24px 28px" }}>
      {/* Header */}
      <div style={{ marginBottom: "24px" }}>
        <h1 style={{
          fontFamily: "var(--font-heading)",
          fontSize: "28px",
          fontWeight: 700,
          letterSpacing: "-1.5px",
          color: "var(--text-primary)",
          margin: 0,
        }}>
          🤖 Mission Control
        </h1>
        <p style={{ color: "var(--text-secondary)", fontSize: "14px", marginTop: "4px" }}>
          Visão geral dos agentes e atividade em tempo real
        </p>
      </div>

      {/* Stats Grid */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "12px", marginBottom: "20px" }}>
        <StatsCard title="Total Atividades" value={stats.total} icon={<Activity size={18} />} iconColor="var(--info)" />
        <StatsCard title="Hoje"             value={stats.today} icon={<Zap size={18} />}      iconColor="var(--accent)" />
        <StatsCard title="Bem-sucedidos"    value={stats.success} icon={<CheckCircle size={18} />} iconColor="var(--positive)" />
        <StatsCard title="Erros"            value={stats.errors}  icon={<XCircle size={18} />}     iconColor="var(--negative)" />
      </div>

      {/* Multi-Agent System */}
      <div className="card" style={{ marginBottom: "20px", overflow: "hidden" }}>
        <SectionHeader
          title="Multi-Agent System"
          icon={<Users size={16} />}
          linkHref="/agents"
        />
        <div style={{ padding: "16px 20px" }}>
          {agents.length === 0 ? (
            <p style={{ color: "var(--text-muted)", fontSize: "13px" }}>Carregando agentes...</p>
          ) : (
            <div style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(130px, 1fr))",
              gap: "10px",
            }}>
              {agents.map((agent) => {
                const color = SQUAD_COLORS[agent.squad] ?? "#6B7280";
                const online = agent.status === "active";
                return (
                  <div
                    key={`${agent.squad}-${agent.id}`}
                    style={{
                      padding: "12px",
                      borderRadius: "var(--radius-md)",
                      backgroundColor: "var(--card-elevated)",
                      border: `2px solid ${color}`,
                      cursor: "pointer",
                      transition: "transform 150ms ease",
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.03)")}
                    onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
                  >
                    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "8px" }}>
                      <div style={{ fontSize: "20px" }}>
                        {agent.tier === 0 ? "🎯" : agent.tier === 1 ? "⚙️" : "🔧"}
                      </div>
                      <Circle
                        size={8}
                        style={{ fill: online ? "#4ade80" : "#6b7280", color: online ? "#4ade80" : "#6b7280" }}
                      />
                    </div>
                    <div style={{
                      fontSize: "12px",
                      fontWeight: 700,
                      fontFamily: "var(--font-heading)",
                      color: "var(--text-primary)",
                      marginBottom: "4px",
                    }}>
                      {agent.id}
                    </div>
                    <div style={{
                      fontSize: "10px",
                      color: "var(--text-muted)",
                      fontFamily: "var(--font-mono)",
                      display: "flex",
                      alignItems: "center",
                      gap: "4px",
                    }}>
                      <Bot size={9} />
                      {agent.squad.split("-")[0]}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>

      {/* Main Grid — Activity + Quick Links */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 320px", gap: "16px" }}>
        {/* Activity Feed */}
        <div className="card" style={{ overflow: "hidden" }}>
          <SectionHeader title="Atividade Recente" icon={<Activity size={16} />} linkHref="/activity" />
          <div>
            {activity.slice(0, 8).map((item) => {
              const typeColor = TYPE_COLORS[item.type] ?? "var(--text-muted)";
              return (
                <div
                  key={item.id}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "12px",
                    padding: "12px 20px",
                    borderBottom: "1px solid var(--border)",
                    transition: "background 150ms",
                    cursor: "default",
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "var(--card)")}
                  onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "transparent")}
                >
                  <div style={{
                    width: "32px",
                    height: "32px",
                    borderRadius: "var(--radius-md)",
                    backgroundColor: `${typeColor}15`,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "16px",
                    flexShrink: 0,
                  }}>
                    {item.icon}
                  </div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontSize: "13px", color: "var(--text-primary)", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                      {item.message}
                    </div>
                    <div style={{ fontSize: "11px", color: "var(--text-muted)", fontFamily: "var(--font-mono)", marginTop: "2px" }}>
                      {item.agent} · {item.squad} · {new Date(item.timestamp).toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit" })}
                    </div>
                  </div>
                  <div style={{
                    fontSize: "10px",
                    fontFamily: "var(--font-mono)",
                    color: typeColor,
                    backgroundColor: `${typeColor}15`,
                    padding: "2px 6px",
                    borderRadius: "var(--radius-sm)",
                    flexShrink: 0,
                    textTransform: "uppercase",
                    letterSpacing: "0.5px",
                  }}>
                    {item.type.replace("_", " ")}
                  </div>
                </div>
              );
            })}
            {activity.length === 0 && (
              <p style={{ padding: "24px 20px", color: "var(--text-muted)", fontSize: "13px" }}>Carregando...</p>
            )}
          </div>
        </div>

        {/* Right column */}
        <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
          {/* Squads summary */}
          <div className="card" style={{ overflow: "hidden" }}>
            <SectionHeader title="Squads" icon={<Users size={14} />} linkHref="/squads" />
            <div style={{ padding: "12px" }}>
              {squads.map((s) => {
                const color = SQUAD_COLORS[s.slug] ?? "#6B7280";
                const agents = s.config.agents?.length ?? 0;
                return (
                  <Link key={s.slug} href="/squads" style={{ textDecoration: "none" }}>
                    <div style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "10px",
                      padding: "8px 10px",
                      borderRadius: "var(--radius-md)",
                      marginBottom: "2px",
                      cursor: "pointer",
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "var(--card-elevated)")}
                    onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "transparent")}
                    >
                      <span style={{ width: "6px", height: "6px", borderRadius: "50%", backgroundColor: color, flexShrink: 0, display: "inline-block" }} />
                      <span style={{ flex: 1, fontSize: "12px", color: "var(--text-primary)", fontFamily: "var(--font-mono)", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                        {s.slug}
                      </span>
                      <span style={{ fontSize: "11px", color: "var(--text-muted)" }}>{agents}a</span>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>

          {/* Quick Links */}
          <div className="card" style={{ overflow: "hidden" }}>
            <SectionHeader title="Quick Links" icon={<Clock size={14} />} />
            <div style={{ padding: "12px", display: "grid", gridTemplateColumns: "1fr 1fr", gap: "8px" }}>
              {quickLinks.map(({ href, icon: Icon, label, color }) => (
                <Link key={href} href={href} style={{ textDecoration: "none" }}>
                  <div style={{
                    padding: "10px",
                    borderRadius: "var(--radius-md)",
                    backgroundColor: "var(--card-elevated)",
                    border: "1px solid var(--border)",
                    display: "flex",
                    alignItems: "center",
                    gap: "8px",
                    cursor: "pointer",
                    transition: "transform 150ms ease",
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.02)")}
                  onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
                  >
                    <Icon size={14} style={{ color }} />
                    <span style={{ fontSize: "12px", fontWeight: 500, color: "var(--text-primary)" }}>{label}</span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
