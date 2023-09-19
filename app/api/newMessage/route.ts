import { Message } from "@/app/types/user";
import { db } from "@/lib/db";
import { pusherServer } from "@/lib/pusher";
import { getChatId, toPusherKey } from "@/lib/utils";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const request = (await req.json()) as Message;
  const chatId = getChatId(request.receiverId, request.senderId);
  await db.zadd(`chat:${chatId}`, {
    score: request.timeStamp,
    member: `${request.senderId}--${request.receiverId}--${request.message}`,
  });

  await pusherServer.trigger(
    `chat-${getChatId(request.senderId, request.receiverId)}`,
    "chat",
    {
      senderId: request.senderId,
      receiverId: request.receiverId,
      message: request.message,
      timeStamp: request.timeStamp,
    },
  );
  return NextResponse.json("ok");
}
