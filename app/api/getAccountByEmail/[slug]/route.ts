import { NextResponse } from "next/server";
import { NextApiRequest, NextApiResponse } from "next";

export async function GET(
  request: Request,
  { params }: { params: { slug: string } },
) {
  const pemail = params.slug;
  const { MongoClient } = require("mongodb");
  const uri = process.env.MONGODB_URI;
  const client = new MongoClient(uri);
  await client.connect();
  const database = "stusome";
  const collection = "accounts";
  const result = await client
    .db(database)
    .collection(collection)
    .findOne({ email: pemail });
  return NextResponse.json(result);
}
