import "./FloatingScanner.css";
import ScannerIcon from "./ScannerIcon";

const FloatingScanner = ({ onClick }) => {
  return (
    <button className="scanner-fab" onClick={onClick} aria-label="Scan QR">
      <ScannerIcon size={26} />
    </button>
  );
};

export default FloatingScanner;
  