// QRCodeComponent.tsx
import React, { useEffect, useRef } from "react";
import QRCodeStyling from "qr-code-styling";

interface QRCodeComponentProps {
  paymentLink: string;
}

const QRCodeComponent: React.FC<QRCodeComponentProps> = ({ paymentLink }) => {
  const qrRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (paymentLink && qrRef.current) {
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
  }, [paymentLink]);

  return <div ref={qrRef}></div>;
};

export default QRCodeComponent;
