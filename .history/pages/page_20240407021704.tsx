import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import dynamic from "next/dynamic";

// Dynamically import the QRCodeComponent with SSR disabled
const QRCodeComponent = dynamic(() => import("./qrcompoent"), {
  ssr: false,
});

export default function Home() {
  const [paymentLink, setPaymentLink] = useState("");
  const [reference, setReference] = useState("");
  const [statusMessage, setStatusMessage] = useState("Initializing payment...");
  const router = useRouter();

  useEffect(() => {
    let { address, amount } = router.query;
    address = Array.isArray(address) ? address[0] : address;
    amount = Array.isArray(amount) ? amount[0] : amount;

    if (address && amount) {
      generatePaymentLink(address, amount);
    } else {
      setStatusMessage("Missing address or amount parameters.");
    }
  }, [router.query]);

  const generatePaymentLink = async (recipient: string, amount: string) => {
    setStatusMessage("Generating payment link...");
    try {
      const response = await fetch("/api/create-payment-link", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ recipient, amount }),
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();
      setPaymentLink(data.url);
      setReference(data.reference);
      setStatusMessage("Payment link generated. Please scan the QR code.");
    } catch (error) {
      console.error("Failed to fetch the payment link:", error);
      setStatusMessage("Failed to generate payment link. Please try again.");
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      {paymentLink ? (
        <>
          <QRCodeComponent paymentLink={paymentLink} />
          <p>Reference ID: {reference}</p>
        </>
      ) : null}
      <p>{statusMessage}</p>
    </div>
  );
}
