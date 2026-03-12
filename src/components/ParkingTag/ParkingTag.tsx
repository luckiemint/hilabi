import { QRCodeSVG } from "qrcode.react";

interface ParkingTagProps {
  code: string;
  qrValue?: string;
  className?: string;
}

const ScanIcon = () => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 72 56"
    xmlns="http://www.w3.org/2000/svg"
  >
    <g fill="#FFD400">
      <path
        d="
      M26 6
      h12
      l3 4
      h9
      a8 8 0 0 1 8 8
      v10
      h-6
      v-8
      a4 4 0 0 0-4-4
      h-28
      a4 4 0 0 0-4 4
      v8
      h-6
      v-10
      a8 8 0 0 1 8-8
      h9
      z
    "
      />

      <path
        d="
      M10 32
      h6
      v8
      a4 4 0 0 0 4 4
      h12
      v6
      h-14
      a8 8 0 0 1-8-8
      z
    "
      />

      <circle cx="36" cy="30" r="8" />

      <circle cx="54" cy="40" r="6" />
    </g>
  </svg>
);

const NoParkingIcon = () => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 100 100"
    fill="none"
    className="parking-tag-bottom-icon"
  >
    <circle
      cx="50"
      cy="50"
      r="40"
      stroke="#E53935"
      strokeWidth="8"
      fill="none"
    />
    <line
      x1="25"
      y1="25"
      x2="75"
      y2="75"
      stroke="#E53935"
      strokeWidth="8"
      strokeLinecap="round"
    />
    <text
      x="50"
      y="55"
      dominantBaseline="middle"
      textAnchor="middle"
      fontFamily="Arial, sans-serif"
      fontWeight="bold"
      fontSize="40"
      fill="#333"
    >
      P
    </text>
  </svg>
);

const WarningIcon = () => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 100 100"
    fill="none"
    className="parking-tag-bottom-icon"
  >
    <path
      d="M50 10 L90 85 L10 85 Z"
      fill="white"
      stroke="#E53935"
      strokeWidth="6"
      strokeLinejoin="round"
    />
    <rect x="46" y="35" width="8" height="25" fill="black" rx="2" />
    <circle cx="50" cy="72" r="5" fill="black" />
  </svg>
);

const SirenIcon = () => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 100 100"
    fill="none"
    className="parking-tag-bottom-icon"
  >
    <g stroke="#FDD835" strokeWidth="4" strokeLinecap="round">
      <line x1="50" y1="10" x2="50" y2="25" />
      <line x1="25" y1="20" x2="35" y2="30" />
      <line x1="75" y1="20" x2="65" y2="30" />
    </g>
    <path d="M30 75 Q30 35 50 35 Q70 35 70 75 Z" fill="#E53935" />
    <rect x="25" y="75" width="50" height="12" rx="3" fill="#333" />
  </svg>
);

const ParkingTag = ({ code, qrValue, className = "" }: ParkingTagProps) => {
  const value = qrValue ?? `https://hilabi.app/tag/${code}`;

  return (
    <div className={`parking-tag ${className}`}>
      <div className="parking-tag-upper">
        <h2 className="parking-tag-brand hilabi-font">HILABI</h2>
        <div className="parking-tag-qr-frame">
          <div className="parking-tag-qr">
            <QRCodeSVG
              value={value}
              // size={100}
              level="M"
              fgColor="#000"
              bgColor="#fff"
            />
          </div>
        </div>
        <p className="parking-tag-scan" style={{ color: "#FFD400" }}>
          <ScanIcon /> SCAN TO CONTACT OWNER
        </p>
      </div>
      <div className="parking-tag-lower">
        <div className="parking-tag-bottom-item">
          <NoParkingIcon />
        </div>
        <div />
        <div className="parking-tag-bottom-item">
          <WarningIcon />
        </div>
        <div />
        <div className="parking-tag-bottom-item">
          <SirenIcon />
        </div>

        <div className="parking-tag-bottom-item">
          <span style={{ color: "#262626" }}>Wrong Parking</span>
        </div>
        <div className="parking-tag-bullet" style={{ color: "#262626" }}>
          •
        </div>
        <div className="parking-tag-bottom-item">
          <span style={{ color: "#262626" }}>Emergency</span>
        </div>
        <div className="parking-tag-bullet" style={{ color: "#262626" }}>
          •
        </div>
        <div className="parking-tag-bottom-item">
          <span style={{ color: "#262626" }}>Urgent Issue</span>
        </div>
      </div>
    </div>
  );
};

export default ParkingTag;
