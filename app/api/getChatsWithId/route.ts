import { db, fetchRedis } from "@/lib/db";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const reqId = await req.json();

  const chatsKeys = await db.keys(`*${reqId}*`);

  const chats = (await db.zrange(chatsKeys[0], 0, -1, {
    withScores: true,
  })) as [string, number];

  const messages: [
    {
      senderEmail: string;
      receiverEmail: string;
      message: string;
      timeStamp: number;
    },
  ] = [
    {
      senderEmail: "",
      receiverEmail: "",
      message: "",
      timeStamp: 0,
    },
  ];

  for (const chat of chats) {
    if (typeof chat == "string") {
      messages.push({
        senderEmail: chat.split("--")[0],
        receiverEmail: chat.split("--")[1],
        message: chat.split("--")[2],
        timeStamp: 0,
      });
    }
  }

  let i = 1;
  for (const chat of chats) {
    if (typeof chat == "number") {
      messages[i].timeStamp = chat;
      i++;
    }
  }

  return NextResponse.json(
    messages.filter((elem) => elem.receiverEmail.trim() != ""),
  );
}
