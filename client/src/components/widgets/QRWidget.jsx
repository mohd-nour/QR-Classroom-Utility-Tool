import React from "react";
import QRCode from "react-qr-code"

function QRWidget(props) {
  return (
    <div className="QR-Panel">
      <QRCode value={props.QRCodeData} />
    </div>
  );
}

export default QRWidget;
