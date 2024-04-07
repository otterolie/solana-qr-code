import type { NextApiRequest, NextApiResponse } from "next";
import { clusterApiUrl, Connection, PublicKey, Keypair } from "@solana/web3.js";
import { encodeURL } from "@solana/pay";
import BigNumber from "bignumber.js";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "GET") {
    return res.status(405).end("Method Not Allowed");
  }

  const recipient = req.query.recipient as string;
  const amount = req.query.amount as string;

  if (!recipient || !amount) {
    return res.status(400).json({ error: "Recipient and amount are required" });
  }

  try {
    const connection = new Connection(clusterApiUrl("devnet"), "confirmed");
    const reference = new Keypair().publicKey; // Generates a new reference for each request

    const bigAmount = new BigNumber(amount);
    const recipientPublicKey = new PublicKey(recipient);

    // Encode payment URL with the provided recipient public key, amount, and generated reference
    const url = encodeURL({
      recipient: recipientPublicKey,
      amount: bigAmount,
      reference,
      label: "SolBet",
      message: "Remove liquidity from your friends.",
    });

    // Respond with the payment URL and the reference as a string
    return res.status(200).json({ url, reference: reference.toString() });
  } catch (error) {
    console.error("Error creating payment link:", error);
    return res.status(500).json({ error: "Failed to create payment link" });
  }
}
