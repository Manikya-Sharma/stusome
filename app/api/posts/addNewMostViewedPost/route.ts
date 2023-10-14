import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const rawId = await request.json();
  const id = rawId.id;
  const { MongoClient } = require("mongodb");
  const uri = process.env.MONGODB_URI;
  const client = new MongoClient(uri);
  await client.connect();
  const database = "stusome";
  const collection = "popular_posts";
  const result = await client
    .db(database)
    .collection(collection)
    .insertOne({ id: id });
  return NextResponse.json(result);
}
