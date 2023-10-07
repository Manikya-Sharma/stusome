import { Discussion, Post } from "@/types/post";
import { NextResponse } from "next/server";

export async function POST(
  request: Request,
  { params }: { params: { postId: string } },
) {
  const discussion = (await request.json()) as Discussion;
  const { MongoClient } = require("mongodb");
  const uri = process.env.MONGODB_URI;
  const client = new MongoClient(uri);
  await client.connect();
  const database = "stusome";

  const collection = "discussions";
  const result = await client
    .db(database)
    .collection(collection)
    .insertOne(discussion);

  const pid = params.postId;
  const postCollection = "posts";

  const existingPost = await client
    .db(database)
    .collection(postCollection)
    .findOne({ id: pid });

  const existingPostDiscussions = existingPost.discussions;

  const postResult = await client
    .db(database)
    .collection(postCollection)
    .updateOne(
      { id: pid },
      {
        $set: {
          discussions: [...existingPostDiscussions, discussion.id],
        },
      },
    );

  return NextResponse.json(postResult);
}
