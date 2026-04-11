"use client";
import { usePathname } from "next/navigation";
import Dock from "./Dock";
import TopBar from "./TopBar";
import StatusBar from "./StatusBar";

export default function ShellWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isPublic = pathname === "/login";

  if (isPublic) {
    return <>{children}</>;
  }

  return (
    <>
      <TopBar />
      <Dock />
      <StatusBar />
      <main
        style={{
          marginLeft: "var(--dock-width)",
          marginTop: "var(--topbar-height)",
          paddingBottom: "var(--statusbar-height)",
          minHeight: "calc(100vh - var(--topbar-height) - var(--statusbar-height))",
          overflowY: "auto",
        }}
      >
        {children}
      </main>
    </>
  );
}
