import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { userEmail, friendEmail } = (await req.json()) as {
    userEmail: string;
    friendEmail: string;
  };
  await db.set(`friend:${friendEmail}:${userEmail}`, "friends");
  return NextResponse.json("ok");
}
