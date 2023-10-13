import { Post } from "@/types/post";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const post = (await request.json()) as Post;
  const { MongoClient } = require("mongodb");
  const uri = process.env.MONGODB_URI;
  const client = new MongoClient(uri);
  await client.connect();
  const database = "stusome";
  const collection = "posts";
  const result = await client
    .db(database)
    .collection(collection)
    .insertOne(post);
  await fetch("/api/posts/addNewMostViewedPost", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ id: post.id }),
  });
  return NextResponse.json(result);
}
