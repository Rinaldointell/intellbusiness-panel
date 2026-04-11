import type { Metadata } from "next";
import "./globals.css";
import Dock from "@/components/Shell/Dock";
import TopBar from "@/components/Shell/TopBar";
import StatusBar from "@/components/Shell/StatusBar";

export const metadata: Metadata = {
  title: "INTELLBUSINESS — Mission Control",
  description: "Real-time dashboard and control center for INTELLBUSINESS AI agents",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR">
      <body>
        {/* Fixed TopBar */}
        <TopBar />

        {/* Fixed Dock */}
        <Dock />

        {/* Fixed StatusBar */}
        <StatusBar />

        {/* Content area offset by dock + topbar + statusbar */}
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
      </body>
    </html>
  );
}
