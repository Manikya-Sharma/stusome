import { Discussion, Reply } from "@/types/post";
import { NextResponse } from "next/server";

export async function POST(
  request: Request,
  { params }: { params: { discussionId: string } },
) {
  const reply = (await request.json()) as Reply;
  const { MongoClient } = require("mongodb");
  const uri = process.env.MONGODB_URI;
  const client = new MongoClient(uri);
  await client.connect();
  const database = "stusome";

  const collection = "replies";
  const result = await client
    .db(database)
    .collection(collection)
    .insertOne(reply);

  const did = params.discussionId;
  const discussionCollection = "discussions";

  const existingDiscussion = (await client
    .db(database)
    .collection(discussionCollection)
    .findOne({ id: did })) as Discussion;

  const existingDiscussionReplies = existingDiscussion.replies;

  const postResult = await client
    .db(database)
    .collection(discussionCollection)
    .updateOne(
      { id: did },
      {
        $set: {
          replies: [...existingDiscussionReplies, reply.id],
        },
      },
    );

  return NextResponse.json(postResult);
}
