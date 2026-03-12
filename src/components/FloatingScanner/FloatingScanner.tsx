import "./FloatingScanner.css";
import ScannerIcon from "./ScannerIcon";

type FloatingScannerProps = {
  onClick: () => void;
};

const FloatingScanner = ({ onClick }: FloatingScannerProps) => {
  return (
    <button className="scanner-fab" onClick={onClick} aria-label="Scan QR">
      <ScannerIcon size={26} />
    </button>
  );
};

export default FloatingScanner;
