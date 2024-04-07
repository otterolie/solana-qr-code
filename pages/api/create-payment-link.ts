import type { NextApiRequest, NextApiResponse } from "next";
import { clusterApiUrl, Connection, PublicKey, Keypair } from "@solana/web3.js";
import { encodeURL } from "@solana/pay";
import BigNumber from "bignumber.js";
import fs from "fs";
import path from "path";

const NETWORK = "devnet";
const connection = new Connection(clusterApiUrl(NETWORK), "confirmed");
const USDC_SPL_TOKEN_ADDRESS = "EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v";

interface PaymentLinkParams {
  recipient: PublicKey;
  amount: BigNumber;
  reference: PublicKey;
  label?: string;
  message?: string;
  splToken?: PublicKey;
}

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

  const { recipient, amount, currency } = req.body;

  if (!recipient || !amount || !currency) {
    return res
      .status(400)
      .json({ error: "Recipient, amount, and currency are required" });
  }

  try {
    const referenceKeypair = new Keypair();
    const referencePublicKey = referenceKeypair.publicKey;
    const bigAmount = new BigNumber(amount);
    const recipientPublicKey = new PublicKey(recipient);

    const params: PaymentLinkParams = {
      recipient: recipientPublicKey,
      amount: bigAmount,
      reference: referencePublicKey,
      label: "Your Label Here",
      message: "Your Message Here",
    };

    if (currency.toUpperCase() === "USDC") {
      params.splToken = new PublicKey(USDC_SPL_TOKEN_ADDRESS);
    }

    const url = encodeURL(params);
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
