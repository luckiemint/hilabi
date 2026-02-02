import React, { useState } from "react";

interface ScannerModalProps {
  onClose: () => void;
  onScanComplete: (tag: string) => void;
}

const ScannerModal: React.FC<ScannerModalProps> = ({
  onClose,
  onScanComplete,
}) => {
  const [scanning, setScanning] = useState(true);

  const handleSimulateScan = () => {
    setScanning(false);
    setTimeout(() => {
      onScanComplete(
        "TAG-" + Math.random().toString(36).substr(2, 9).toUpperCase()
      );
    }, 500);
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h3>Scan QR Code</h3>
          <button className="close-button" onClick={onClose}>
            <svg className="icon" viewBox="0 0 24 24">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>

        <div className="scanner-container">
          {scanning ? (
            <>
              <div className="scanner-frame">
                <div className="scanner-corner top-left"></div>
                <div className="scanner-corner top-right"></div>
                <div className="scanner-corner bottom-left"></div>
                <div className="scanner-corner bottom-right"></div>
                <div className="scanner-line"></div>
              </div>
              <p className="scanner-instruction">
                Position the QR code within the frame
              </p>
              {/* Simulate scan button for demo */}
              <button
                className="simulate-scan-btn"
                onClick={handleSimulateScan}
              >
                Simulate Scan (Demo)
              </button>
            </>
          ) : (
            <div className="scan-success">
              <div className="success-icon">
                <svg viewBox="0 0 24 24">
                  <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                  <polyline points="22 4 12 14.01 9 11.01" />
                </svg>
              </div>
              <p>Scan successful!</p>
            </div>
          )}
        </div>

        <div className="modal-footer">
          <button className="modal-cancel" onClick={onClose}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default ScannerModal;
