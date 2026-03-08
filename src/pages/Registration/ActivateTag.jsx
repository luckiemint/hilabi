// ActivateTag.jsx
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import logo from "../../assets/logo.png";
import "./ActivateTag.css";
import ScannerIcon from "../../components/FloatingScanner/ScannerIcon";
import ScannerModal from "../../components/ScannerModal/ScannerModal";

const ActivateTag = () => {
  const navigate = useNavigate();
  const [showScanner, setShowScanner] = useState(false);

  const handleScanComplete = (tagId) => {
    console.log("Scanned tag ID:", tagId);
    setShowScanner(false);
    // Navigate with the scanned tag ID
    navigate("/registration/register-vehicle", { state: { tagId } });
  };

  return (
    <>
      {/* Header */}
      <header className="activate-header">
        <button 
          className="header-btn"
          onClick={() => navigate("/")}
          aria-label="Go to home"
        >
          <img src={logo} alt="Hilabi Logo" className="activate-logo" />
        </button>
        
        <h2 className="header-title">Activate Tag</h2>
        
        <div className="header-spacer"></div>
      </header>

      <div className="activate-wrapper">
        <div className="activate-content">
          {/* Logo Section */}
          {/* <div className="logo-section">
            <img src={logo} alt="Hilabi Logo" className="activate-logo" />
          </div> */}

          {/* Title Section */}
          <div className="title-section">
            <h1 className="main-title">Welcome to <span className="hilabi-font">Hilabi</span></h1>
            <p className="motto">One tag. One safe connection.</p>
          </div>

          {/* Description */}
          <p className="description">
            Activate your tag to get started with seamless vehicle access management
          </p>

          {/* Action Buttons */}
          <div className="action-buttons">
            <button
              className="primary-button"
              onClick={() => navigate("/registration/register-vehicle")}
            >
              {/* <svg className="button-icon" viewBox="0 0 24 24">
                <path d="M5 17h14v-6H5v6zm4-4h6v2H9v-2z" fill="currentColor" stroke="none" />
                <path d="M5 9l7-5 7 5" stroke="currentColor" fill="none" strokeWidth="2" />
              </svg> */}
              <span>Activate Tag Now</span>
            </button>

            {/* <button
              className="secondary-button"
              onClick={() => setShowScanner(true)}
            >
              <svg className="button-icon" viewBox="0 0 24 24">
                <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
                <line x1="9" y1="3" x2="9" y2="21" />
                <line x1="15" y1="3" x2="15" y2="21" />
              </svg>
              <span>Scan QR Code</span>
            </button> */}
          </div>

         

          {/* Footer Text */}
          <p className="footer-text">
            By continuing, you agree to link this tag to your account and accept our{" "}
            <a href="/terms" className="footer-link">Terms of Service</a>
          </p>
        </div>
      </div>

      {/* Floating Scanner Button */}
      <button
        className="floating-scanner"
        onClick={() => setShowScanner(true)}
        aria-label="Open scanner"
      >
        <ScannerIcon size={28} />
      </button>

      {/* Scanner Modal */}
      {showScanner && (
        <ScannerModal
          onClose={() => setShowScanner(false)}
          onScanComplete={handleScanComplete}
        />
      )}
    </>
  );
};


export default ActivateTag;