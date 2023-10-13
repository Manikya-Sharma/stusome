import { NextResponse } from "next/server";
import { Post } from "@/types/post";

export async function POST(request: Request) {
  const updatedPost = (await request.json()) as Post;
  const pid = updatedPost.id;
  const { MongoClient } = require("mongodb");
  const uri = process.env.MONGODB_URI;
  const client = new MongoClient(uri);
  await client.connect();
  const database = "stusome";
  const collection = "posts";
  const result = await client
    .db(database)
    .collection(collection)
    .updateOne({ id: pid }, { $set: updatedPost });
  return NextResponse.json(result);
}
