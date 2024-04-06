import React, { useState, useEffect, useRef } from "react";
import { useRouter } from "next/router";

export default function Home() {
  const [paymentLink, setPaymentLink] = useState<string>("");
  const [reference, setReference] = useState<string>("");
  const [statusMessage, setStatusMessage] = useState<string>(
    "Initializing payment..."
  );
  const router = useRouter();
  const qrRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Dynamically import QRCodeStyling on the client side
    import("qr-code-styling").then(({ default: QRCodeStyling }) => {
      if (qrRef.current && paymentLink) {
        const qrCode = new QRCodeStyling({
          width: 512,
          height: 512,
          type: "svg",
          data: paymentLink,
          image:
            "https://upload.wikimedia.org/wikipedia/commons/5/51/Facebook_f_logo_%282019%29.svg",
          dotsOptions: {
            color: "#4267b2",
            type: "rounded",
          },
          backgroundOptions: {
            color: "#e9ebee",
          },
          dotsOptions: { type: "extra-rounded", color: "black" },
          imageOptions: {
            crossOrigin: "anonymous",
            margin: 20,
          },
        });
        qrCode.append(qrRef.current);
      }
    });

    return () => {
      if (qrRef.current) {
        qrRef.current.innerHTML = ""; // Clear the div when the component unmounts or paymentLink changes
      }
    };
  }, [paymentLink]); // Depend on paymentLink so the QR code updates when it changes

  useEffect(() => {
    const { address, amount } = router.query;
    if (
      typeof address === "string" &&
      typeof amount === "string" &&
      address &&
      amount
    ) {
      generatePaymentLink(address, amount);
    }
  }, [router.query]);

  const generatePaymentLink = async (recipient: string, amount: string) => {
    setStatusMessage("Generating payment link...");

    // Simulating an API call with a timeout
    setTimeout(() => {
      const fakePaymentLink = `https://paymentgateway.com/pay?recipient=${recipient}&amount=${amount}`;
      const fakeReference = `REF-${Math.random().toString(36).substr(2, 9)}`;

      setPaymentLink(fakePaymentLink);
      setReference(fakeReference);
      setStatusMessage("Payment link generated. Please scan the QR code.");
    }, 1000);
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
