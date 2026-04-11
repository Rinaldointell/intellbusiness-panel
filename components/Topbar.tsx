"use client";
import { useEffect, useState } from "react";
import { Bell, Search } from "lucide-react";
import Link from "next/link";

export default function Topbar() {
  const [time, setTime] = useState("");
  const [unread, setUnread] = useState(0);

  useEffect(() => {
    const tick = () => {
      const now = new Date();
      setTime(now.toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit", second: "2-digit" }));
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
    <header className="h-11 bg-[#0a0a0a] border-b border-[#1f1f1f] flex items-center justify-between px-4 shrink-0">
      {/* Left */}
      <div className="flex items-center gap-3">
        <span className="text-[10px] text-zinc-600 font-mono uppercase tracking-widest">
          intellbusiness · mission control
        </span>
      </div>

      {/* Right */}
      <div className="flex items-center gap-3">
        {/* Search */}
        <Link href="/files" className="flex items-center gap-1.5 px-2 py-1 rounded bg-[#141414] border border-[#222] text-zinc-500 hover:text-zinc-300 transition-colors">
          <Search size={11} />
          <span className="text-[10px] font-mono">Buscar...</span>
        </Link>

        {/* Notifications */}
        <Link href="/notifications" className="relative">
          <Bell size={14} className="text-zinc-500 hover:text-zinc-300 transition-colors" />
          {unread > 0 && (
            <span className="absolute -top-1 -right-1 w-3.5 h-3.5 bg-[#F5A800] rounded-full text-[8px] flex items-center justify-center text-black font-bold">
              {unread}
            </span>
          )}
        </Link>

        {/* Clock */}
        <div className="flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
          <span className="text-[10px] text-zinc-500 font-mono">{time}</span>
        </div>
      </div>
    </header>
  );
}
