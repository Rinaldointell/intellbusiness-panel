"use client";
import { useEffect, useState } from "react";
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import { Bot, Users, CheckCircle, Activity, Zap, Clock, TrendingUp } from "lucide-react";
import Link from "next/link";
import type { Squad } from "@/lib/squads";

interface Stats {
  squads: number;
  agents: number;
  activeSquads: number;
  tasks: number;
}

interface ActivityEntry {
  id: string;
  timestamp: string;
  agent: string;
  squad: string;
  type: string;
  message: string;
  icon: string;
}

const SQUAD_COLORS: Record<string, string> = {
  "branding-design": "#F5A800",
  "intellbusiness-hub": "#3B82F6",
  "product-strategy": "#10B981",
  "sales-content": "#8B5CF6",
  "whatsapp-agents": "#EC4899",
};

function generateActivityChart() {
  const hours = [];
  for (let i = 23; i >= 0; i--) {
    const d = new Date();
    d.setHours(d.getHours() - i);
    hours.push({
      time: d.getHours() + "h",
      actions: Math.floor(Math.random() * 12) + (i < 8 ? 3 : 1),
    });
  }
  return hours;
}

export default function DashboardClient({ squads, stats }: { squads: Squad[]; stats: Stats }) {
  const [activity, setActivity] = useState<ActivityEntry[]>([]);
  const [systemInfo, setSystemInfo] = useState<{ cpuPercent: number; memPercent: number; nodeVersion: string } | null>(null);
  const [chartData] = useState(generateActivityChart);

  useEffect(() => {
    fetch("/api/activity").then((r) => r.json()).then(setActivity).catch(() => {});
    fetch("/api/system").then((r) => r.json()).then(setSystemInfo).catch(() => {});
  }, []);

  const metricCards = [
    { label: "Squads Ativos", value: stats.squads, icon: Users, color: "#F5A800", href: "/squads" },
    { label: "Agentes", value: stats.agents, icon: Bot, color: "#3B82F6", href: "/agents" },
    { label: "Tarefas Mapeadas", value: stats.tasks, icon: CheckCircle, color: "#10B981", href: "/squads" },
    { label: "Em Produção", value: stats.activeSquads, icon: Zap, color: "#8B5CF6", href: "/squads" },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <h1 className="font-heading text-2xl text-white tracking-wider">MISSION CONTROL</h1>
          <p className="text-xs text-zinc-500 mt-0.5 font-mono">
            {new Date().toLocaleDateString("pt-BR", { weekday: "long", year: "numeric", month: "long", day: "numeric" })}
          </p>
        </div>
        <div className="flex items-center gap-2 bg-emerald-500/10 border border-emerald-500/20 rounded px-3 py-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
          <span className="text-[11px] text-emerald-400 font-mono">SISTEMA OPERACIONAL</span>
        </div>
      </div>

      {/* Metric cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        {metricCards.map((card) => {
          const Icon = card.icon;
          return (
            <Link key={card.label} href={card.href}>
              <div className="bg-[#0f0f0f] border border-[#1f1f1f] rounded-lg p-4 hover:border-[#F5A800]/40 transition-all group">
                <div className="flex items-center justify-between mb-3">
                  <Icon size={14} style={{ color: card.color }} />
                  <TrendingUp size={10} className="text-zinc-700 group-hover:text-zinc-500 transition-colors" />
                </div>
                <div className="font-heading text-3xl" style={{ color: card.color }}>{card.value}</div>
                <div className="text-[11px] text-zinc-500 mt-1">{card.label}</div>
              </div>
            </Link>
          );
        })}
      </div>

      {/* Activity chart + System */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Activity chart */}
        <div className="lg:col-span-2 bg-[#0f0f0f] border border-[#1f1f1f] rounded-lg p-4">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <Activity size={13} className="text-[#F5A800]" />
              <span className="text-xs text-zinc-300 font-mono tracking-wider">ATIVIDADE — 24H</span>
            </div>
            <Link href="/activity" className="text-[10px] text-zinc-600 hover:text-[#F5A800] transition-colors font-mono">
              VER TUDO →
            </Link>
          </div>
          <ResponsiveContainer width="100%" height={120}>
            <AreaChart data={chartData}>
              <defs>
                <linearGradient id="actGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#F5A800" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#F5A800" stopOpacity={0} />
                </linearGradient>
              </defs>
              <XAxis dataKey="time" tick={{ fontSize: 9, fill: "#52525b" }} axisLine={false} tickLine={false} interval={3} />
              <YAxis hide />
              <Tooltip
                contentStyle={{ background: "#0a0a0a", border: "1px solid #222", borderRadius: 6, fontSize: 11 }}
                labelStyle={{ color: "#a1a1aa" }}
                itemStyle={{ color: "#F5A800" }}
              />
              <Area type="monotone" dataKey="actions" stroke="#F5A800" strokeWidth={1.5} fill="url(#actGrad)" dot={false} />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* System info */}
        <div className="bg-[#0f0f0f] border border-[#1f1f1f] rounded-lg p-4">
          <div className="flex items-center gap-2 mb-4">
            <Zap size={13} className="text-[#F5A800]" />
            <span className="text-xs text-zinc-300 font-mono tracking-wider">SISTEMA</span>
          </div>
          {systemInfo ? (
            <div className="space-y-3">
              <div>
                <div className="flex justify-between text-[11px] mb-1">
                  <span className="text-zinc-500">CPU</span>
                  <span className="text-zinc-300 font-mono">{systemInfo.cpuPercent}%</span>
                </div>
                <div className="h-1.5 bg-[#1a1a1a] rounded-full overflow-hidden">
                  <div
                    className="h-full rounded-full transition-all"
                    style={{
                      width: `${systemInfo.cpuPercent}%`,
                      background: systemInfo.cpuPercent > 80 ? "#EF4444" : "#F5A800",
                    }}
                  />
                </div>
              </div>
              <div>
                <div className="flex justify-between text-[11px] mb-1">
                  <span className="text-zinc-500">RAM</span>
                  <span className="text-zinc-300 font-mono">{systemInfo.memPercent}%</span>
                </div>
                <div className="h-1.5 bg-[#1a1a1a] rounded-full overflow-hidden">
                  <div
                    className="h-full rounded-full transition-all"
                    style={{
                      width: `${systemInfo.memPercent}%`,
                      background: systemInfo.memPercent > 80 ? "#EF4444" : "#3B82F6",
                    }}
                  />
                </div>
              </div>
              <div className="pt-2 border-t border-[#1f1f1f] space-y-1.5">
                <div className="flex justify-between text-[10px]">
                  <span className="text-zinc-600">Node.js</span>
                  <span className="text-zinc-400 font-mono">{systemInfo.nodeVersion}</span>
                </div>
                <Link href="/system" className="block text-center text-[10px] text-zinc-600 hover:text-[#F5A800] transition-colors font-mono mt-2">
                  VER DETALHES →
                </Link>
              </div>
            </div>
          ) : (
            <div className="text-xs text-zinc-600 animate-pulse">Carregando...</div>
          )}
        </div>
      </div>

      {/* Squads overview + Recent activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Squads */}
        <div className="bg-[#0f0f0f] border border-[#1f1f1f] rounded-lg p-4">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <Users size={13} className="text-[#F5A800]" />
              <span className="text-xs text-zinc-300 font-mono tracking-wider">SQUADS</span>
            </div>
            <Link href="/squads" className="text-[10px] text-zinc-600 hover:text-[#F5A800] font-mono transition-colors">
              VER TUDO →
            </Link>
          </div>
          <div className="space-y-2">
            {squads.map((squad) => {
              const color = SQUAD_COLORS[squad.slug] ?? "#6B7280";
              const agentCount = squad.config.agents?.length ?? 0;
              const taskCount = squad.config.tasks?.length ?? 0;
              return (
                <Link key={squad.slug} href={`/squads/${squad.slug}`}>
                  <div className="flex items-center gap-3 py-2 px-2 rounded hover:bg-[#141414] transition-colors group border border-transparent hover:border-[#222]">
                    <div className="w-2 h-2 rounded-full flex-shrink-0" style={{ background: color }} />
                    <div className="flex-1 min-w-0">
                      <div className="text-xs text-zinc-300 group-hover:text-white transition-colors truncate font-mono">
                        {squad.slug}
                      </div>
                    </div>
                    <div className="flex items-center gap-3 text-[10px] text-zinc-600">
                      <span>{agentCount} agentes</span>
                      <span>{taskCount} tasks</span>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>

        {/* Recent activity */}
        <div className="bg-[#0f0f0f] border border-[#1f1f1f] rounded-lg p-4">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <Clock size={13} className="text-[#F5A800]" />
              <span className="text-xs text-zinc-300 font-mono tracking-wider">ATIVIDADE RECENTE</span>
            </div>
            <Link href="/activity" className="text-[10px] text-zinc-600 hover:text-[#F5A800] font-mono transition-colors">
              VER TUDO →
            </Link>
          </div>
          <div className="space-y-2">
            {activity.slice(0, 6).map((item) => (
              <div key={item.id} className="flex items-start gap-2.5 py-1.5">
                <span className="text-sm flex-shrink-0 mt-0.5">{item.icon}</span>
                <div className="flex-1 min-w-0">
                  <div className="text-xs text-zinc-300 truncate">{item.message}</div>
                  <div className="text-[10px] text-zinc-600 font-mono mt-0.5">
                    {item.agent} · {new Date(item.timestamp).toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit" })}
                  </div>
                </div>
              </div>
            ))}
            {activity.length === 0 && (
              <div className="text-xs text-zinc-600 animate-pulse">Carregando atividades...</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
