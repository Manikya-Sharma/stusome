import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { userEmail, friendEmail } = (await req.json()) as {
    userEmail: string;
    friendEmail: string;
  };
  const friends = (await db.keys(`*friend:*${userEmail}*`)) as string[];
  for (const friend of friends) {
    if (friend.includes(friendEmail)) {
      return NextResponse.json("ok");
    }
  }
  return NextResponse.json("no");
}
