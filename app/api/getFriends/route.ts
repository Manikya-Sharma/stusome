import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const userEmail = req;
  const friends = (await db.keys(`*friend:*${userEmail}*`)) as string[];
  return NextResponse.json(friends);
}
