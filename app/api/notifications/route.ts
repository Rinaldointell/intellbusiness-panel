import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

const DATA_FILE = path.resolve(process.cwd(), "data/notifications.json");

function readNotifs() {
  if (!fs.existsSync(DATA_FILE)) return [];
  return JSON.parse(fs.readFileSync(DATA_FILE, "utf-8"));
}

function writeNotifs(data: object[]) {
  fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2));
}

export async function GET() {
  try {
    return NextResponse.json(readNotifs());
  } catch (err) {
    console.error("API /notifications error:", err);
    return NextResponse.json({ error: "Failed to read notifications" }, { status: 500 });
  }
}

export async function PATCH(req: Request) {
  try {
    const { id } = await req.json();
    const notifs = readNotifs() as { id: string; read: boolean }[];

    if (id === "all") {
      notifs.forEach((n) => (n.read = true));
    } else {
      const idx = notifs.findIndex((n) => n.id === id);
      if (idx !== -1) notifs[idx].read = true;
    }

    writeNotifs(notifs);
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("API PATCH /notifications error:", err);
    return NextResponse.json({ error: "Failed to update notification" }, { status: 500 });
  }
}
