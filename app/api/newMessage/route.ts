import { Message } from "@/app/types/user";
import { db } from "@/lib/db";
import { getChatId } from "@/lib/utils";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const request = (await req.json()) as Message;
  const chatId = getChatId(request.receiverId, request.senderId);
  await db.zadd(`chat:${chatId}`, {
    score: request.timeStamp,
    member: `${request.senderId}--${request.receiverId}--${request.message}`,
  });
  return NextResponse.json("ok");
}
