import type { NextApiRequest, NextApiResponse } from "next";
import clientPromise from "../../lib/mongodb";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const response = await fetch(
      `https://cardano-preprod.blockfrost.io/api/v0/blocks/latest`,
      {
        headers: {
          project_id: process.env.BLOCKFROST_API_KEY!,
        },
      }
    );

    if (!response.ok) {
      return res.status(500).json({ error: "Blockfrost error", details: await response.text() });
    }

    const block = await response.json();

    const client = await clientPromise;
    const db = client.db("cardano");
    const blocks = db.collection("latest_blocks");

    // OPTIONAL: avoid duplicates
    await blocks.updateOne(
      { hash: block.hash },
      { $set: block },
      { upsert: true }
    );

    return res.status(200).json({ success: true, stored: block });

  } catch (err: any) {
    return res.status(500).json({ error: "Server error", details: err.message });
  }
}
