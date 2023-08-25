import { NextResponse } from "next/server";
import { NextApiRequest, NextApiResponse } from "next";

export async function GET(
  request: Request,
  { params }: { params: { id: string } },
) {
  const pid = params.id;
  const { MongoClient } = require("mongodb");
  const uri = process.env.MONGODB_URI;
  const client = new MongoClient(uri);
  await client.connect();
  const database = "stusome";
  const collection = "accounts";
  const result = await client
    .db(database)
    .collection(collection)
    .findOne({ id: parseInt(pid) });
  return NextResponse.json(result);
}
