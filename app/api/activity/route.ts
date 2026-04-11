import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

const DATA_FILE = path.resolve(process.cwd(), "data/activities.json");

export async function GET() {
  try {
    if (!fs.existsSync(DATA_FILE)) {
      return NextResponse.json([]);
    }
    const raw = fs.readFileSync(DATA_FILE, "utf-8");
    const data = JSON.parse(raw);
    return NextResponse.json(data);
  } catch (err) {
    console.error("API /activity error:", err);
    return NextResponse.json({ error: "Failed to read activities" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const existing = fs.existsSync(DATA_FILE)
      ? JSON.parse(fs.readFileSync(DATA_FILE, "utf-8"))
      : [];

    const newEntry = {
      id: `act-${Date.now()}`,
      timestamp: new Date().toISOString(),
      ...body,
    };

    const updated = [newEntry, ...existing].slice(0, 200);
    fs.writeFileSync(DATA_FILE, JSON.stringify(updated, null, 2));
    return NextResponse.json(newEntry, { status: 201 });
  } catch (err) {
    console.error("API POST /activity error:", err);
    return NextResponse.json({ error: "Failed to write activity" }, { status: 500 });
  }
}
