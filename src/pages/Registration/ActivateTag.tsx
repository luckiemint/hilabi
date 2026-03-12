import { useNavigate } from "react-router-dom";
import { useState } from "react";
import logo from "../../assets/logo.png";
import "./ActivateTag.css";
import ScannerIcon from "../../components/FloatingScanner/ScannerIcon";
import ScannerModal from "../../components/ScannerModal/ScannerModal";

const ActivateTag = () => {
  const navigate = useNavigate();
  const [showScanner, setShowScanner] = useState(false);

  const handleScanComplete = (tagId: string) => {
    console.log("Scanned tag ID:", tagId);
    setShowScanner(false);
    navigate("/registration/register-vehicle", { state: { tagId } });
  };

  return (
    <>
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
          <div className="title-section">
            <h1 className="main-title">Welcome to <span className="hilabi-font">Hilabi</span></h1>
            <p className="motto">One tag. One safe connection.</p>
          </div>

          <p className="description">
            Activate your tag to get started with seamless vehicle access management
          </p>

          <div className="action-buttons">
            <button
              className="primary-button"
              onClick={() => navigate("/registration/register-vehicle")}
            >
              <span>Activate Tag Now</span>
            </button>
          </div>

          <p className="footer-text">
            By continuing, you agree to link this tag to your account and accept our{" "}
            <a href="/terms" className="footer-link">Terms of Service</a>
          </p>
        </div>
      </div>

      <button
        className="floating-scanner"
        onClick={() => setShowScanner(true)}
        aria-label="Open scanner"
      >
        <ScannerIcon size={28} />
      </button>

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
