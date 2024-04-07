import type { NextApiRequest, NextApiResponse } from "next";
import { clusterApiUrl, Connection, PublicKey, Keypair } from "@solana/web3.js";
import { encodeURL } from "@solana/pay";
import BigNumber from "bignumber.js";
import fs from "fs";
import path from "path";

// Easily change this variable to switch between networks ("devnet", "mainnet-beta", "testnet")
const NETWORK = "devnet";

const appendToJSONFile = (id: string, publicKey: string) => {
  const filePath = path.join(
    process.cwd(),
    "public",
    "data",
    "references.json"
  );

  const dirPath = path.dirname(filePath);
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
  }

  const fileData: { id: string; publicKey: string }[] = fs.existsSync(filePath)
    ? JSON.parse(fs.readFileSync(filePath, "utf8"))
    : [];

  // Append the new data to the fileData array
  fileData.push({ id, publicKey });

  // Write the updated array back to 'references.json' within the 'public/data' directory
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
    // Use the NETWORK variable to dynamically choose the network
    const connection = new Connection(clusterApiUrl(NETWORK), "confirmed");
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
      referencePublicKey.toString(),
      recipientPublicKey.toString()
    );

    return res.status(200).json({
      url,
      referenceID: referencePublicKey.toString(),
      recipientPublicKey: recipientPublicKey.toString(),
    });
  } catch (error) {
    console.error("Error creating payment link:", error);
    return res.status(500).json({ error: "Failed to create payment link" });
  }
}
