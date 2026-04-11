import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

const DATA_FILE = path.resolve(process.cwd(), "data/cron-jobs.json");

function readJobs() {
  if (!fs.existsSync(DATA_FILE)) return [];
  return JSON.parse(fs.readFileSync(DATA_FILE, "utf-8"));
}

function writeJobs(data: object[]) {
  fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2));
}

export async function GET() {
  try {
    return NextResponse.json(readJobs());
  } catch (err) {
    console.error("API /cron error:", err);
    return NextResponse.json({ error: "Failed to read cron jobs" }, { status: 500 });
  }
}

export async function PATCH(req: Request) {
  try {
    const { id, enabled } = await req.json();
    const jobs = readJobs() as { id: string; enabled: boolean; status: string }[];
    const idx = jobs.findIndex((j) => j.id === id);
    if (idx === -1) return NextResponse.json({ error: "Not found" }, { status: 404 });

    jobs[idx].enabled = enabled;
    jobs[idx].status = enabled ? "success" : "disabled";
    writeJobs(jobs);
    return NextResponse.json(jobs[idx]);
  } catch (err) {
    console.error("API PATCH /cron error:", err);
    return NextResponse.json({ error: "Failed to update cron job" }, { status: 500 });
  }
}
