"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Bot,
  Users,
  Activity,
  Brain,
  FolderOpen,
  Clock,
  Bell,
  Terminal,
  Monitor,
  ChevronRight,
} from "lucide-react";

const nav = [
  { label: "Dashboard", href: "/", icon: LayoutDashboard },
  { label: "Agentes", href: "/agents", icon: Bot },
  { label: "Squads", href: "/squads", icon: Users },
  { label: "Sistema", href: "/system", icon: Monitor },
  { label: "Atividade", href: "/activity", icon: Activity },
  { label: "Memória", href: "/memory", icon: Brain },
  { label: "Arquivos", href: "/files", icon: FolderOpen },
  { label: "Cron Jobs", href: "/cron", icon: Clock },
  { label: "Notificações", href: "/notifications", icon: Bell },
  { label: "Terminal", href: "/terminal", icon: Terminal },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-56 bg-[#0a0a0a] border-r border-[#1f1f1f] flex flex-col shrink-0">
      {/* Logo */}
      <div className="px-5 py-4 border-b border-[#1f1f1f]">
        <div className="flex items-baseline gap-1">
          <span className="font-heading text-base text-[#F5A800] tracking-widest">INTELL</span>
          <span className="font-heading text-base text-white tracking-widest">BUSINESS</span>
        </div>
        <div className="text-[10px] text-zinc-600 mt-0.5 font-mono">MISSION CONTROL v2.0</div>
      </div>

      {/* Nav */}
      <nav className="flex-1 px-2 py-3 space-y-0.5 overflow-y-auto">
        {nav.map((item) => {
          const Icon = item.icon;
          const active = item.href === "/"
            ? pathname === "/"
            : pathname.startsWith(item.href);
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-2.5 px-3 py-2 rounded text-sm transition-all group ${
                active
                  ? "bg-[#F5A800]/10 text-[#F5A800] border border-[#F5A800]/20"
                  : "text-zinc-500 hover:text-zinc-200 hover:bg-[#141414] border border-transparent"
              }`}
            >
              <Icon size={14} className={active ? "text-[#F5A800]" : "text-zinc-600 group-hover:text-zinc-400"} />
              <span className="flex-1 text-xs tracking-wide">{item.label}</span>
              {active && <ChevronRight size={10} className="text-[#F5A800]/60" />}
            </Link>
          );
        })}
      </nav>

      {/* Footer */}
      <div className="px-4 py-3 border-t border-[#1f1f1f]">
        <div className="flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
          <span className="text-[10px] text-zinc-600 font-mono">AIOX Hub v5.0.3</span>
        </div>
      </div>
    </aside>
  );
}
