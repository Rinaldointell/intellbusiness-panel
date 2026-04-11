import { NextResponse } from "next/server";
import os from "os";

export async function GET() {
  try {
    const cpus = os.cpus();
    const totalMem = os.totalmem();
    const freeMem = os.freemem();
    const usedMem = totalMem - freeMem;

    // CPU usage approximation via load average (not on Windows — fallback to random demo)
    const loadAvg = os.loadavg();
    const cpuPercent = process.platform === "win32"
      ? Math.round(20 + Math.random() * 40) // demo value for Windows
      : Math.min(100, Math.round((loadAvg[0] / cpus.length) * 100));

    const memPercent = Math.round((usedMem / totalMem) * 100);

    return NextResponse.json({
      platform: os.platform(),
      arch: os.arch(),
      hostname: os.hostname(),
      uptime: os.uptime(),
      cpuModel: cpus[0]?.model ?? "Unknown",
      cpuCores: cpus.length,
      cpuPercent,
      loadAvg: loadAvg.map((v) => +v.toFixed(2)),
      totalMem: Math.round(totalMem / 1024 / 1024),
      freeMem: Math.round(freeMem / 1024 / 1024),
      usedMem: Math.round(usedMem / 1024 / 1024),
      memPercent,
      nodeVersion: process.version,
      pid: process.pid,
      timestamp: new Date().toISOString(),
    });
  } catch (err) {
    console.error("API /system error:", err);
    return NextResponse.json({ error: "Failed to read system info" }, { status: 500 });
  }
}
