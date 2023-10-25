import { NextResponse } from "next/server";

export async function POST(
  request: Request,
  { params }: { params: { doubtId: string } },
) {
  const answer = (await request.json()) as DoubtAnswer;
  const { MongoClient } = require("mongodb");
  const uri = process.env.MONGODB_URI;
  const client = new MongoClient(uri);
  await client.connect();
  const database = "stusome";

  const collection = "doubt_answers";
  const result = await client
    .db(database)
    .collection(collection)
    .insertOne(answer);

  const pid = params.doubtId;
  const doubtCollection = "doubts";

  const existingDoubt = await client
    .db(database)
    .collection(doubtCollection)
    .findOne({ id: pid });

  const existingDoubtAnswers = existingDoubt.answers;

  const doubtResult = await client
    .db(database)
    .collection(doubtCollection)
    .updateOne(
      { id: pid },
      {
        $set: {
          answers: [...existingDoubtAnswers, answer.id],
        },
      },
    );

  return NextResponse.json(doubtResult);
}
