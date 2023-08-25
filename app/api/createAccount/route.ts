import { NextResponse } from "next/server";
import { NextApiRequest, NextApiResponse } from "next";

export async function POST(request: Request) {
  const user = await request.json();
  const { MongoClient } = require("mongodb");
  const uri = process.env.MONGODB_URI;
  const client = new MongoClient(uri);
  await client.connect();
  const database = "stusome";
  const collection = "accounts";
  const result = await client
    .db(database)
    .collection(collection)
    .insertOne(user);
  return NextResponse.json(result);
}
