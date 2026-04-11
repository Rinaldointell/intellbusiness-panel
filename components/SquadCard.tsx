import Link from "next/link";
import type { Squad } from "@/lib/squads";

const ROLE_ICONS: Record<string, string> = {
  master: "◆",
  coordinator: "◈",
  execution: "◇",
};

const STATUS_COLORS: Record<string, string> = {
  active: "bg-emerald-500",
  pending: "bg-yellow-500",
  inactive: "bg-zinc-600",
};

export default function SquadCard({ squad }: { squad: Squad }) {
  const { slug, config } = squad;
  const { name, description, role } = config.squad;
  const agentCount = config.agents?.length ?? 0;
  const taskCount = config.tasks?.length ?? 0;
  const status = agentCount > 0 || taskCount > 0 ? "active" : "pending";

  return (
    <Link href={`/squad/${slug}`}>
      <div className="bg-[#0f0f0f] border border-[#222] rounded-lg p-5 hover:border-[#F5A800] transition-colors cursor-pointer group">
        <div className="flex items-start justify-between mb-3">
          <div className="flex items-center gap-2">
            <span className="text-[#F5A800] text-lg">
              {ROLE_ICONS[role] ?? "◇"}
            </span>
            <h3 className="font-heading text-sm tracking-wider text-white group-hover:text-[#F5A800] transition-colors">
              {name}
            </h3>
          </div>
          <span className={`w-2 h-2 rounded-full mt-1 ${STATUS_COLORS[status]}`} />
        </div>
        <p className="text-xs text-zinc-500 mb-4 leading-relaxed line-clamp-2">
          {description}
        </p>
        <div className="flex items-center gap-4 text-xs text-zinc-600">
          <span>{agentCount} agente{agentCount !== 1 ? "s" : ""}</span>
          <span>{taskCount} task{taskCount !== 1 ? "s" : ""}</span>
          <span className="ml-auto text-zinc-700 capitalize">{role}</span>
        </div>
      </div>
    </Link>
  );
}
