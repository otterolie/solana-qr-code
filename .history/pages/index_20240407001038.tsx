import React, { useState, useEffect, useRef } from "react";
import QRCodeStyling from "qr-code-styling";
import { useRouter } from "next/router";

export default function Home() {
  const [paymentLink, setPaymentLink] = useState<string>(""); // Ensure state is typed
  const [reference, setReference] = useState<string>(""); // Ensure state is typed
  const [statusMessage, setStatusMessage] = useState<string>(
    "Initializing payment..."
  ); // Ensure state is typed
  const router = useRouter();
  const qrRef = useRef<HTMLDivElement>(null); // Specify the type for the ref

  const QRCodeStylingNoSSR = dynamic(() => import("qr-code-styling"), {
    ssr: false,
  });

  useEffect(() => {
    if (qrRef.current) {
      const qrCode = new QRCodeStyling({
        // QRCodeStyling options
      });

      qrCode.append(qrRef.current); // TypeScript knows qrRef.current is not null here
    }

    return () => {
      if (qrRef.current) {
        qrRef.current.innerHTML = ""; // Clear safely
      }
    };
  }, []);

  useEffect(() => {
    let { address, amount } = router.query;
    // Rest of the useEffect
  }, [router.query]);

  const generatePaymentLink = async (recipient: string, amount: string) => {
    // Specify types for parameters
    // Implementation remains the same
  };

  return (
    <div style={{ padding: "20px" }}>
      {paymentLink ? (
        <>
          <div style={{ marginTop: "20px" }} ref={qrRef}></div>{" "}
          {/* Managed by TypeScript */}
          <p>Reference ID: {reference}</p>
        </>
      ) : null}
      <p>{statusMessage}</p>
    </div>
  );
}
