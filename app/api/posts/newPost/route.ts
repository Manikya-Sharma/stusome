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
  // add to top posts
  await client
    .db(database)
    .collection("popular_posts")
    .insertOne({ id: post.id });
  // add to user profile
  const account = await client
    .db(database)
    .collection("accounts")
    .findOne({ email: post.author });
  const result2 = await client
    .db(database)
    .collection("accounts")
    .updateOne(
      { email: post.author },
      { $set: { posts: [...account.posts, post.id] } },
    );
  return NextResponse.json(result);
}
