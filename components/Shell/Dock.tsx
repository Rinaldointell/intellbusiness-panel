"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Monitor,
  FolderOpen,
  Brain,
  Bot,
  Activity,
  Clock,
  Terminal,
  Bell,
  Users,
  Search,
  Settings,
} from "lucide-react";

const NAV_ITEMS = [
  { href: "/",             icon: LayoutDashboard, label: "Dashboard"   },
  { href: "/agents",       icon: Bot,             label: "Agents"      },
  { href: "/squads",       icon: Users,           label: "Squads"      },
  { href: "/system",       icon: Monitor,         label: "System"      },
  { href: "/activity",     icon: Activity,        label: "Activity"    },
  { href: "/memory",       icon: Brain,           label: "Memory"      },
  { href: "/files",        icon: FolderOpen,      label: "Files"       },
  { href: "/cron",         icon: Clock,           label: "Cron Jobs"   },
  { href: "/notifications",icon: Bell,            label: "Alerts"      },
  { href: "/terminal",     icon: Terminal,        label: "Terminal"    },
];

export default function Dock() {
  const pathname = usePathname();

  return (
    <nav
      style={{
        position: "fixed",
        top: "var(--topbar-height)",
        left: 0,
        bottom: "var(--statusbar-height)",
        width: "var(--dock-width)",
        backgroundColor: "var(--surface)",
        borderRight: "1px solid var(--border)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        paddingTop: "12px",
        paddingBottom: "12px",
        gap: "2px",
        zIndex: 40,
        overflowY: "auto",
      }}
    >
      {NAV_ITEMS.map(({ href, icon: Icon, label }) => {
        const active = href === "/" ? pathname === "/" : pathname.startsWith(href);
        return (
          <Link
            key={href}
            href={href}
            title={label}
            className="nav-item"
            style={active ? {
              backgroundColor: "var(--accent-soft)",
              color: "var(--accent)",
            } : undefined}
          >
            <Icon size={20} />
            <span style={{
              fontSize: "9px",
              fontFamily: "var(--font-mono)",
              color: active ? "var(--accent)" : "var(--text-muted)",
              textAlign: "center",
              lineHeight: 1,
            }}>
              {label.split(" ")[0]}
            </span>
            {active && (
              <span style={{
                position: "absolute",
                left: 0,
                top: "50%",
                transform: "translateY(-50%)",
                width: "2px",
                height: "20px",
                backgroundColor: "var(--accent)",
                borderRadius: "0 2px 2px 0",
              }} />
            )}
          </Link>
        );
      })}
    </nav>
  );
}
