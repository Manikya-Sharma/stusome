import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const reqId = await req.json();

  const chatsKeys = await db.keys(`*${reqId}*`);
  const chats = (await db.zrange(chatsKeys[0], 0, -1, {
    withScores: true,
  })) as [string, number];

  const messages: [
    {
      senderId: string;
      receiverId: string;
      message: string;
      timeStamp: number;
    },
  ] = [
    {
      senderId: "",
      receiverId: "",
      message: "",
      timeStamp: 0,
    },
  ];

  for (const chat of chats) {
    if (typeof chat == "string") {
      messages.push({
        senderId: chat.split("--")[0],
        receiverId: chat.split("--")[1],
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
    messages.filter((elem) => elem.receiverId.trim() != "")
  );
}
