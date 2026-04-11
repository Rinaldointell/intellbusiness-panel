import fs from "fs";
import path from "path";
import yaml from "js-yaml";

const SQUADS_DIR = process.env.SQUADS_DIR ?? path.resolve(process.cwd(), "squads");

export interface AgentConfig {
  id: string;
  file: string;
  status: string;
  role: string;
  client?: string;
}

export interface SquadConfig {
  squad: {
    name: string;
    description: string;
    version: string;
    role: string;
    created_at: string;
  };
  agents?: AgentConfig[];
  tasks?: { file: string; agent?: string; command?: string }[];
  templates?: { file: string; description?: string }[];
}

export interface Squad {
  slug: string;
  config: SquadConfig;
}

export function getAllSquads(): Squad[] {
  if (!fs.existsSync(SQUADS_DIR)) return [];

  return fs
    .readdirSync(SQUADS_DIR, { withFileTypes: true })
    .filter((d) => d.isDirectory())
    .map((d) => {
      const configPath = path.join(SQUADS_DIR, d.name, "config.yaml");
      if (!fs.existsSync(configPath)) return null;
      const raw = fs.readFileSync(configPath, "utf-8");
      const config = yaml.load(raw) as SquadConfig;
      return { slug: d.name, config };
    })
    .filter(Boolean) as Squad[];
}

export function getSquad(slug: string): Squad | null {
  const configPath = path.join(SQUADS_DIR, slug, "config.yaml");
  if (!fs.existsSync(configPath)) return null;
  const raw = fs.readFileSync(configPath, "utf-8");
  const config = yaml.load(raw) as SquadConfig;
  return { slug, config };
}
