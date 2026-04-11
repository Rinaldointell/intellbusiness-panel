import { NextResponse } from "next/server";
import { getAllSquads } from "@/lib/squads";

export async function GET() {
  try {
    const squads = getAllSquads();
    return NextResponse.json(squads);
  } catch (err) {
    console.error("API /squads error:", err);
    return NextResponse.json({ error: "Failed to read squads" }, { status: 500 });
  }
}
