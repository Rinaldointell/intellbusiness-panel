import type { Metadata } from "next";
import "./globals.css";
import ShellWrapper from "@/components/Shell/ShellWrapper";

export const metadata: Metadata = {
  title: "INTELLBUSINESS — Mission Control",
  description: "Real-time dashboard and control center for INTELLBUSINESS AI agents",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR">
      <body>
        <ShellWrapper>{children}</ShellWrapper>
      </body>
    </html>
  );
}
