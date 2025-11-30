import type { NextApiRequest, NextApiResponse } from "next";

type TxEntry = {
  hash: string;
  block: number;
  amount: number;
  fees: number;
  timestamp: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const { address } = req.query;

    // Validate address
    if (!address || typeof address !== "string") {
      return res.status(400).json({ error: "Address missing or invalid" });
    }

    // MORE realistic Cardano-style dummy transaction history
    const dummyTxHistory: TxEntry[] = [
      {
        hash: "f9d8123c77aa90234234adbba9ddfe1100cc11ef77aabb229945ab10",
        block: 9751402,
        amount: 100.562,
        fees: 162.12,
        timestamp: "2025-11-30T03:10:00Z",
      },
      {
        hash: "c68a2d9c871ab23f98dd0fa91c1e45de78891bcf0f8f3a1124fabc12",
        block: 9751240,
        amount: 469.769, // ₳ ADA
        fees: 172.921,
        timestamp: "2025-11-29T13:20:00Z",
      },
      {
        hash: "a1c77cc9b10ef0023bbcd90a78f89ae6cfee11234bcd80123aa44dde",
        block: 9751299,
        amount: 470.246,
        fees: 221.30,
        timestamp: "2025-11-29T08:45:00Z",
      },
    ];

    // Sort by date (latest first)
    dummyTxHistory.sort(
      (a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
    );

    return res.status(200).json(dummyTxHistory);
  } catch (err) {
    console.error("TX API ERROR:", err);
    return res.status(500).json({ error: "Internal Server Error" });
  }
}
