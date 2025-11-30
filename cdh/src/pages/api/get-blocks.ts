import type { NextApiRequest, NextApiResponse } from "next";
import clientPromise from "../../lib/mongodb";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const client = await clientPromise;
    const db = client.db("cardano");
    const blocks = db.collection("latest_blocks");

    const data = await blocks
      .find({})
      .sort({ time: 1 }) // chronological order
      .limit(200)        // limit for graph
      .toArray();

    res.status(200).json(data);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
}
