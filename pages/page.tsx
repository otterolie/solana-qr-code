"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import dynamic from "next/dynamic";

// Dynamically import the QRCodeComponent with SSR disabled
const QRCodeComponent = dynamic(() => import("./QRCodeComponent"), {
  ssr: false,
});

export default function Home() {
  const [paymentLink, setPaymentLink] = useState<string>("");
  const [referenceID, setReferenceID] = useState<string>("");
  const [statusMessage, setStatusMessage] = useState<string>(
    "Initializing payment..."
  );
  const router = useRouter();

  useEffect(() => {
    // Assuming address and amount are both strings
    const address = router.query.address as string;
    const amount = router.query.amount as string;
    const currency = (router.query.currency as string) || "SOL";

    if (address && amount) {
      generatePaymentLink(address, amount, currency);
    } else {
      setStatusMessage("Missing address or amount parameters.");
    }
  }, [router.query]);

  // Annotate the parameters' types
  const generatePaymentLink = async (
    recipient: string,
    amount: string,
    currency: string
  ) => {
    setStatusMessage("Generating payment link...");
    try {
      const response = await fetch("/api/create-payment-link", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ recipient, amount, currency }),
      });

      if (!response.ok) {
        const errorMessage = `Network response was not ok (${response.status}): ${response.statusText}`;
        console.error("Failed to fetch the payment link:", errorMessage);
        setStatusMessage(`Failed to generate payment link: ${errorMessage}`);
        return;
      }

      const data = await response.json();
      setPaymentLink(data.url);
      setReferenceID(data.referenceID);
      setStatusMessage(
        "Payment link generated. Please scan the QR code to complete the payment."
      );
    } catch (error) {
      console.error("Failed to fetch the payment link:", error);
      setStatusMessage("Failed to generate payment link. Please try again.");
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      {paymentLink && (
        <>
          <QRCodeComponent paymentLink={paymentLink} />
          <p>Reference ID: {referenceID}</p>
        </>
      )}
      <p>{statusMessage}</p>
    </div>
  );
}
