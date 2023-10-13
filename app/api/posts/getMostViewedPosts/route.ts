import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { MongoClient } = require("mongodb");
  const uri = process.env.MONGODB_URI;
  const client = new MongoClient(uri);
  await client.connect();
  const database = "stusome";
  const collection = "popular_posts";
  const result = await client
    .db(database)
    .collection(collection)
    .find({})
    .toArray();
  return NextResponse.json(result);
}
