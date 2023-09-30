import { Message } from "@/types/user";
import { db } from "@/lib/db";
import { pusherServer } from "@/lib/pusher";
import { getChatId, toPusherKey } from "@/lib/utils";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const request = (await req.json()) as Message;
  const chatId = getChatId(request.receiverEmail, request.senderEmail);
  await db.zadd(`chat:${chatId}`, {
    score: request.timeStamp,
    member: `${request.senderEmail}--${request.receiverEmail}--${request.message}`,
  });

  await pusherServer.trigger(
    `chat-${getChatId(request.senderEmail, request.receiverEmail)}`,
    "chat",
    {
      senderEmail: request.senderEmail,
      receiverEmail: request.receiverEmail,
      message: request.message,
      timeStamp: request.timeStamp,
    },
  );
  return NextResponse.json("ok");
}
