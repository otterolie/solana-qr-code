// pages/api/handler.ts
import type { NextApiRequest, NextApiResponse } from "next";
import { clusterApiUrl, Connection, PublicKey, Keypair } from "@solana/web3.js";
import { encodeURL } from "@solana/pay";
import BigNumber from "bignumber.js";

// Define a type for the response to help with TypeScript's type checking
type ResponseData = {
  url?: string;
  reference?: string;
  error?: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  if (req.method !== "GET") {
    res.status(405).end("Method Not Allowed");
    return;
  }

  const recipient = req.query.recipient as string;
  const amount = req.query.amount as string;

  if (!recipient || !amount) {
    res.status(400).json({ error: "Recipient and amount are required" });
    return;
  }

  try {
    const network = "devnet"; // Adjust as needed
    const connection = new Connection(clusterApiUrl(network), "confirmed");
    const reference = new Keypair().publicKey;

    const bigAmount = new BigNumber(amount);
    const recipientPublicKey = new PublicKey(recipient);

    // Ensure encodeURL's return value is converted to a string
    const url = encodeURL({
      recipient: recipientPublicKey,
      amount: bigAmount,
      reference,
      label: "Your Label",
      message: "Your Message",
    }).toString(); // This is the key change
    res.status(200).json({ url }); 
}
