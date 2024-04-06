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
    // This dynamic import ensures QRCodeStyling is only imported client-side
    import("qr-code-styling").then(({ default: QRCodeStyling }) => {
      if (qrRef.current && paymentLink) {
        const qrCode = new QRCodeStyling({
          width: 300,
          height: 300,
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
    // Assuming you're fetching some data that eventually updates paymentLink
    const { address, amount } = router.query;
    if (typeof address === "string" && typeof amount === "string") {
      generatePaymentLink(address, amount);
    }
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
