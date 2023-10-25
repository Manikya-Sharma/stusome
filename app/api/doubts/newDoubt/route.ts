import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const doubt = (await request.json()) as Doubt;
  const { MongoClient } = require("mongodb");
  const uri = process.env.MONGODB_URI;
  const client = new MongoClient(uri);
  await client.connect();
  const database = "stusome";
  const collection = "doubts";
  const result = await client
    .db(database)
    .collection(collection)
    .insertOne(doubt);
  // add to top doubts
  await client
    .db(database)
    .collection("popular_doubts")
    .insertOne({ id: doubt.id });
  // add to user profile
  const account = await client
    .db(database)
    .collection("accounts")
    .findOne({ email: doubt.author });
  const result2 = await client
    .db(database)
    .collection("accounts")
    .updateOne(
      { email: doubt.author },
      { $set: { doubts: [...account.doubts, doubt.id] } },
    );
  return NextResponse.json(result);
}
