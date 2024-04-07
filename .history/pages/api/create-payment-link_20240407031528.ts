import type { NextApiRequest, NextApiResponse } from "next";
import { clusterApiUrl, Connection, PublicKey, Keypair } from "@solana/web3.js";
import { encodeURL } from "@solana/pay";
import BigNumber from "bignumber.js";
import fs from "fs";
import path from "path";

// Function to append reference ID and public key to a JSON file
const appendToJSONFile = (id: string, publicKey: string) => {
  const dirPath = path.join(process.cwd(), "data");
  const filePath = path.join(dirPath, "references.json");

  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath);
  }

  const fileData: { id: string; publicKey: string }[] = fs.existsSync(filePath)
    ? JSON.parse(fs.readFileSync(filePath, "utf8"))
    : [];

  fileData.push({ id, publicKey });

  fs.writeFileSync(filePath, JSON.stringify(fileData, null, 2));
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    return res.status(405).end("Method Not Allowed");
  }

  const { recipient, amount } = req.body;

  if (!recipient || !amount) {
    return res.status(400).json({ error: "Recipient and amount are required" });
  }

  try {
    const connection = new Connection(clusterApiUrl("devnet"), "confirmed");
    const referenceKeypair = new Keypair();
    const referencePublicKey = referenceKeypair.publicKey;
    const bigAmount = new BigNumber(amount);
    const recipientPublicKey = new PublicKey(recipient);

    const url = encodeURL({
      recipient: recipientPublicKey,
      amount: bigAmount,
      reference: referencePublicKey,
      label: "Your Label Here",
      message: "Your Message Here",
    });

    appendToJSONFile(
      referenceKeypair.publicKey.toString(),
      recipientPublicKey.toString()
    );

    return res.status(200).json({
      url,
      referenceID: referencePublicKey.toString(), // This is what the frontend expects
      recipientPublicKey: recipientPublicKey.toString(),
    });
  } catch (error) {
    console.error("Error creating payment link:", error);
    return res.status(500).json({ error: "Failed to create payment link" });
  }
}
