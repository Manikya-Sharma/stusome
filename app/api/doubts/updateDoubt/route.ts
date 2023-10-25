import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const updatedDoubt = (await request.json()) as Doubt;
  const did = updatedDoubt.id;
  const { MongoClient } = require("mongodb");
  const uri = process.env.MONGODB_URI;
  const client = new MongoClient(uri);
  await client.connect();
  const database = "stusome";
  const collection = "doubts";
  const result = await client
    .db(database)
    .collection(collection)
    .updateOne({ id: did }, { $set: updatedDoubt });
  return NextResponse.json(result);
}
