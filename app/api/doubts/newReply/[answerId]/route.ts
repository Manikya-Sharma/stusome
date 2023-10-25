import { Discussion, Reply } from "@/types/post";
import { NextResponse } from "next/server";

export async function POST(
  request: Request,
  { params }: { params: { answerId: string } },
) {
  const reply = (await request.json()) as DoubtReply;
  const { MongoClient } = require("mongodb");
  const uri = process.env.MONGODB_URI;
  const client = new MongoClient(uri);
  await client.connect();
  const database = "stusome";

  const collection = "doubt_replies";
  const result = await client
    .db(database)
    .collection(collection)
    .insertOne(reply);

  const aid = params.answerId;
  const answerCollection = "doubt_answers";

  const existingAnswer = (await client
    .db(database)
    .collection(answerCollection)
    .findOne({ id: aid })) as DoubtAnswer;

  const existingAnswerReplies = existingAnswer.replies;

  const doubtResult = await client
    .db(database)
    .collection(answerCollection)
    .updateOne(
      { id: aid },
      {
        $set: {
          replies: [...existingAnswerReplies, reply.id],
        },
      },
    );

  return NextResponse.json(doubtResult);
}
