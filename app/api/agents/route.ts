import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import yaml from "js-yaml";

const SQUADS_DIR = process.env.SQUADS_DIR ?? path.resolve(process.cwd(), "squads");

interface AgentRaw {
  id: string;
  file: string;
  status: string;
  role: string;
  tier?: number;
  dna?: string;
  client?: string;
}

interface SquadConfig {
  squad: {
    name: string;
    description: string;
    version: string;
    role?: string;
    created_at: string;
    updated_at?: string;
  };
  agents?: AgentRaw[];
}

export async function GET() {
  try {
    if (!fs.existsSync(SQUADS_DIR)) {
      return NextResponse.json([]);
    }

    const allAgents: object[] = [];
    const dirs = fs.readdirSync(SQUADS_DIR, { withFileTypes: true }).filter((d) => d.isDirectory());

    for (const dir of dirs) {
      const configPath = path.join(SQUADS_DIR, dir.name, "config.yaml");
      if (!fs.existsSync(configPath)) continue;

      const raw = fs.readFileSync(configPath, "utf-8");
      const config = yaml.load(raw) as SquadConfig;

      if (!config.agents) continue;

      for (const agent of config.agents) {
        allAgents.push({
          id: agent.id,
          squad: dir.name,
          squadName: config.squad.name,
          role: agent.role,
          status: agent.status ?? "unknown",
          tier: agent.tier ?? 1,
          dna: agent.dna ?? null,
          file: agent.file,
        });
      }
    }

    return NextResponse.json(allAgents);
  } catch (err) {
    console.error("API /agents error:", err);
    return NextResponse.json({ error: "Failed to read agents" }, { status: 500 });
  }
}
