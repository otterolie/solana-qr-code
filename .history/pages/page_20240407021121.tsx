import React, { useState, useEffect, useRef } from "react";
import QRCodeStyling from "qr-code-styling";
import { useRouter } from "next/router";

export default function Home() {
  const [paymentLink, setPaymentLink] = useState("");
  const [reference, setReference] = useState("");
  const [statusMessage, setStatusMessage] = useState("Initializing payment...");
  const router = useRouter();
  const qrRef = useRef(null); // Reference for the div where the QR code will be appended

  useEffect(() => {
    // Initialize QRCodeStyling with default configuration
    // This instance will be updated later with the actual payment link
    const qrCode = new QRCodeStyling({
      width: 300,
      height: 300,
      type: "svg",
      data: "",
      image:
        "https://upload.wikimedia.org/wikipedia/commons/5/51/Facebook_f_logo_%282019%29.svg",
      dotsOptions: {
        color: "#4267b2",
        type: "rounded",
      },
      backgroundOptions: {
        color: "#e9ebee",
      },
      imageOptions: {
        crossOrigin: "anonymous",
        margin: 20,
      },
    });

    qrCode.append(qrRef.current);

    // Cleanup function to remove QR code when component unmounts or updates
    return () => {
      qrRef.current.innerHTML = ""; // Clear the div's contents
    };
  }, []); // Empty dependency array means this effect runs once on mount

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

  useEffect(() => {
    if (paymentLink && qrRef.current) {
      // Create a new instance of QRCodeStyling with the paymentLink
      const qrCode = new QRCodeStyling({
        width: 300,
        height: 300,
        type: "svg",
        data: paymentLink, // Use the dynamic payment link here
        image:
          "https://upload.wikimedia.org/wikipedia/commons/5/51/Facebook_f_logo_%282019%29.svg",
        dotsOptions: {
          color: "#4267b2",
          type: "rounded",
        },
        backgroundOptions: {
          color: "#e9ebee",
        },
        imageOptions: {
          crossOrigin: "anonymous",
          margin: 20,
        },
      });

      qrCode.append(qrRef.current); // Append the new QR code to the div
    }
  }, [paymentLink]); // This effect runs whenever paymentLink changes

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
          <div style={{ marginTop: "20px" }} ref={qrRef}></div>
          <p>Reference ID: {reference}</p>
        </>
      ) : null}
      <p>{statusMessage}</p>
    </div>
  );
}
