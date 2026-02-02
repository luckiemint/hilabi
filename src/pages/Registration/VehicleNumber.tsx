import { useState } from "react";
import { useNavigate } from "react-router-dom";

export const BackIcon = ({ size = 24, color = "#1f2937" }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M15 18L9 12L15 6"
      stroke={color}
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const CarIcon = () => (
  <svg
    width="80"
    height="80"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M5 13L3 13.5V18.5L5 19M19 13L21 13.5V18.5L19 19M5 19V21M19 19V21"
      stroke="url(#gradient)"
      strokeWidth="1.5"
      strokeLinecap="round"
    />
    <path
      d="M6 13H18C19.1046 13 20 13.8954 20 15V17C20 18.1046 19.1046 19 18 19H6C4.89543 19 4 18.1046 4 17V15C4 13.8954 4.89543 13 6 13Z"
      stroke="url(#gradient)"
      strokeWidth="1.5"
    />
    <path
      d="M6 13L7.5 9C7.77614 8.44772 8.34543 8 9 8H15C15.6546 8 16.2239 8.44772 16.5 9L18 13"
      stroke="url(#gradient)"
      strokeWidth="1.5"
      strokeLinecap="round"
    />
    <circle cx="8" cy="16" r="1.2" fill="#2563eb" />
    <circle cx="16" cy="16" r="1.2" fill="#2563eb" />
    <defs>
      <linearGradient
        id="gradient"
        x1="3"
        y1="8"
        x2="21"
        y2="21"
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="#3b82f6" />
        <stop offset="1" stopColor="#2563eb" />
      </linearGradient>
    </defs>
  </svg>
);

const VehicleNumber = () => {
  const navigate = useNavigate();
  const [ownerName, setOwnerName] = useState("");
  const [vehicleNumber, setVehicleNumber] = useState("");
  const [touchedName, setTouchedName] = useState(false);
  const [touchedNumber, setTouchedNumber] = useState(false);

  const handleNameChange = (e: { target: { value: any } }) => {
    const value = e.target.value;
    setOwnerName(value);
    if (!touchedName) setTouchedName(true);
  };

  const handleInputChange = (e: { target: { value: string } }) => {
    const value = e.target.value.toUpperCase().replace(/[^A-Z0-9]/g, "");
    setVehicleNumber(value);
    if (!touchedNumber) setTouchedNumber(true);
  };

  const isNameValid = ownerName.trim().length >= 2;
  const isNumberValid = vehicleNumber.length >= 8;
  const isValid = isNameValid && isNumberValid;

  const handleContinue = () => navigate("/registration/phone-number");

  return (
    <div className="mobile-app">
      {/* Status Bar Spacer */}
      <div className="status-bar-spacer"></div>

      {/* Header */}
      <header className="app-header">
        <button
          className="back-btn"
          aria-label="Go back"
          onClick={() => window.history.back()}
        >
          <BackIcon size={28} />
        </button>
        <h1 className="app-title">Vehicle Details</h1>
        <div className="header-spacer"></div>
      </header>

      {/* Main Content */}
      <main className="app-content">
        {/* Icon Section */}
        <div className="icon-section">
          <div className="icon-bg">
            <CarIcon />
          </div>
        </div>

        {/* Form Section */}
        <div className="form-section">
          <h2 className="section-title">Enter Vehicle Details</h2>
          <p className="section-desc">
            Please provide your name and vehicle registration number
          </p>

          <div className="input-group">
            <label className="input-label">Name</label>
            <div className="input-wrapper">
              <input
                type="text"
                className={`mobile-input name-input ${
                  touchedName && !isNameValid ? "error" : ""
                } ${isNameValid ? "valid" : ""}`}
                placeholder="Enter your name"
                value={ownerName}
                onChange={handleNameChange}
                maxLength={50}
                autoComplete="name"
              />
              {ownerName && (
                <button
                  className="clear-btn"
                  onClick={() => {
                    setOwnerName("");
                    setTouchedName(false);
                  }}
                  aria-label="Clear"
                >
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                  >
                    <path d="M18 6L6 18M6 6l12 12" />
                  </svg>
                </button>
              )}
            </div>
          </div>

          <div className="input-group">
            <label className="input-label">Registration Number</label>
            <div className="input-wrapper">
              <input
                type="text"
                className={`mobile-input ${
                  touchedNumber && !isNumberValid ? "error" : ""
                } ${isNumberValid ? "valid" : ""}`}
                placeholder="MH12AB1234"
                value={vehicleNumber}
                onChange={handleInputChange}
                maxLength={15}
                autoComplete="off"
                autoCapitalize="characters"
              />
              {vehicleNumber && (
                <button
                  className="clear-btn"
                  onClick={() => {
                    setVehicleNumber("");
                    setTouchedNumber(false);
                  }}
                  aria-label="Clear"
                >
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                  >
                    <path d="M18 6L6 18M6 6l12 12" />
                  </svg>
                </button>
              )}
            </div>
            <div className="input-hint">
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <circle cx="12" cy="12" r="10" />
                <path d="M12 16v-4M12 8h.01" />
              </svg>
              <span>
                Example: <strong>MH12AB1234</strong> or{" "}
                <strong>KA05MN7890</strong>
              </span>
            </div>
          </div>
        </div>
      </main>

      {/* Bottom Action */}
      <footer className="app-footer">
        <button
          className={`primary-btn ${isValid ? "active" : ""}`}
          disabled={!isValid}
          onClick={handleContinue}
        >
          <span>Continue</span>
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
          >
            <path d="M5 12h14M12 5l7 7-7 7" />
          </svg>
        </button>

        <button className="help-btn">
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <circle cx="12" cy="12" r="10" />
            <path d="M12 16v-4M12 8h.01" />
          </svg>
          <span>Need Help?</span>
        </button>
      </footer>

      <style>{`
        * {
          box-sizing: border-box;
          -webkit-tap-highlight-color: transparent;
        }

        .mobile-app {
          min-height: 100vh;
          background: linear-gradient(180deg, #f8fafc 0%, #f1f5f9 100%);
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
          display: flex;
          flex-direction: column;
          max-width: 100vw;
          overflow-x: hidden;
          padding-bottom: env(safe-area-inset-bottom);
        }

        /* Status Bar */
        .status-bar-spacer {
          height: env(safe-area-inset-top);
          background: #ffffff;
        }

        /* Header */
        .app-header {
          background: #ffffff;
          padding: 16px 20px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          border-bottom: 1px solid #f1f5f9;
          position: sticky;
          top: 0;
          z-index: 100;
          box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
        }

        .back-btn {
          background: none;
          border: none;
          padding: 8px;
          margin: -8px;
          cursor: pointer;
          display: flex;
          align-items: center;
          border-radius: 12px;
          transition: background 0.2s;
          touch-action: manipulation;
        }

        .back-btn:active {
          background: #f1f5f9;
          transform: scale(0.95);
        }

        .app-title {
          font-size: 1.125rem;
          font-weight: 600;
          color: #0f172a;
          margin: 0;
          flex: 1;
          text-align: center;
        }

        .header-spacer {
          width: 44px;
        }

        /* Main Content */
        .app-content {
          flex: 1;
          padding: 24px 20px 120px;
          overflow-y: auto;
        }

        /* Icon Section */
        .icon-section {
          display: flex;
          justify-content: center;
          margin-bottom: 32px;
          padding-top: 8px;
        }

        .icon-bg {
          width: 120px;
          height: 120px;
          background: linear-gradient(135deg, rgba(59, 130, 246, 0.1), rgba(37, 99, 235, 0.05));
          border-radius: 32px;
          display: flex;
          align-items: center;
          justify-content: center;
          animation: float 3s ease-in-out infinite;
          box-shadow: 0 8px 24px rgba(59, 130, 246, 0.12);
        }

        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-8px); }
        }

        /* Form Section */
        .form-section {
          max-width: 100%;
        }

        .section-title {
          font-size: 1.5rem;
          font-weight: 700;
          color: #0f172a;
          margin: 0 0 8px 0;
        }

        .section-desc {
          font-size: 0.9375rem;
          color: #64748b;
          line-height: 1.5;
          margin: 0 0 28px 0;
        }

        /* Input Group */
        .input-group {
          margin-bottom: 15px;
        }

        .input-label {
          display: block;
          font-size: 0.875rem;
          font-weight: 600;
          color: #334155;
          margin-bottom: 10px;
        }

        .input-wrapper {
          position: relative;
        }

        .mobile-input {
          width: 100%;
          padding: 18px 50px 18px 18px;
          font-size: 1.25rem;
          font-weight: 600;
          border: 2px solid #e2e8f0;
          border-radius: 16px;
          background: #ffffff;
          color: #0f172a;
          outline: none;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          letter-spacing: 2px;
          text-transform: uppercase;
          touch-action: manipulation;
        }

        .mobile-input.name-input {
          letter-spacing: normal;
          text-transform: none;
          font-size: 1.125rem;
        }

        .mobile-input::placeholder {
          color: #cbd5e1;
          font-weight: 500;
        }

        .mobile-input:focus {
          border-color: #2563eb;
          box-shadow: 0 0 0 4px rgba(37, 99, 235, 0.1);
          transform: translateY(-1px);
        }

        .mobile-input.valid {
          border-color: #10b981;
          background: #f0fdf4;
        }

        .mobile-input.error {
          border-color: #ef4444;
        }

        .clear-btn {
          position: absolute;
          right: 14px;
          top: 50%;
          transform: translateY(-50%);
          width: 32px;
          height: 32px;
          border-radius: 50%;
          border: none;
          background: #f1f5f9;
          color: #64748b;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: all 0.2s;
          touch-action: manipulation;
        }

        .clear-btn:active {
          background: #e2e8f0;
          transform: translateY(-50%) scale(0.9);
        }

        .input-hint {
          display: flex;
          align-items: flex-start;
          gap: 6px;
          margin-top: 10px;
          font-size: 0.8125rem;
          color: #64748b;
          line-height: 1.5;
        }

        .input-hint svg {
          flex-shrink: 0;
          margin-top: 2px;
        }

        .input-hint strong {
          color: #2563eb;
          font-weight: 600;
        }

        /* Footer */
        .app-footer {
          position: fixed;
          bottom: 0;
          left: 0;
          right: 0;
          background: #ffffff;
          padding: 16px 20px calc(16px + env(safe-area-inset-bottom));
          border-top: 1px solid #f1f5f9;
          box-shadow: 0 -4px 12px rgba(0, 0, 0, 0.05);
          z-index: 50;
        }

        .primary-btn {
          width: 100%;
          padding: 18px 24px;
          background: #cbd5e1;
          color: #94a3b8;
          border: none;
          border-radius: 16px;
          font-size: 1.0625rem;
          font-weight: 600;
          cursor: not-allowed;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          margin-bottom: 12px;
          touch-action: manipulation;
        }

        .primary-btn.active {
          background: linear-gradient(135deg, #3b82f6 0%, #2563eb 100%);
          color: #ffffff;
          cursor: pointer;
          box-shadow: 0 8px 20px rgba(37, 99, 235, 0.3);
        }

        .primary-btn.active:active {
          transform: scale(0.98);
          box-shadow: 0 4px 12px rgba(37, 99, 235, 0.3);
        }

        .primary-btn svg {
          transition: transform 0.3s;
        }

        .primary-btn.active:active svg {
          transform: translateX(4px);
        }

        .help-btn {
          width: 100%;
          padding: 14px;
          background: none;
          border: none;
          color: #2563eb;
          font-size: 0.9375rem;
          font-weight: 500;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 6px;
          border-radius: 12px;
          transition: background 0.2s;
          touch-action: manipulation;
        }

        .help-btn:active {
          background: #f1f5f9;
        }

        /* Responsive */
        @media (min-width: 640px) {
          .mobile-app {
            max-width: 428px;
            margin: 0 auto;
            box-shadow: 0 0 40px rgba(0, 0, 0, 0.1);
          }
        }

        @media (min-width: 1024px) {
          .mobile-app {
            max-width: 100%;
            margin: 0 auto;
            box-shadow: 0 0 40px rgba(0, 0, 0, 0.1);
          }

          .app-content {
            padding: 32px 24px 120px;
            max-width: 600px;
            margin: auto auto;
          }

          .section-title {
            font-size: 1.75rem;
          }

          .mobile-input {
            font-size: 1.5rem;
            padding: 20px 52px 20px 20px;
          }

          .primary-btn {
            padding: 20px 28px;
            font-size: 1.125rem;
          }
        }

        /* Mobile responsiveness for smaller screens */
        @media (max-width: 639px) {
          .app-title {
            font-size: 1rem;
          }

          .section-title {
            font-size: 1.25rem;
          }

          .section-desc {
            font-size: 0.875rem;
          }

          .input-label {
            font-size: 1rem;
          }

          .mobile-input {
            font-size: 1rem;
            padding: 16px 44px 16px 16px;
          }

          .mobile-input.name-input {
            font-size: 1rem;
          }

          .input-hint {
            font-size: 0.75rem;
          }

          .primary-btn {
            font-size: 1rem;
            padding: 16px 20px;
          }

          .help-btn {
            font-size: 0.875rem;
          }

          .app-content {
            padding: 20px 16px 140px;
          }

          .app-header {
            padding: 12px 16px;
          }

          .app-footer {
            padding: 12px 16px calc(12px + env(safe-area-inset-bottom));
          }
        }

        /* Smooth scrolling */
        .app-content {
          -webkit-overflow-scrolling: touch;
        }
      `}</style>
    </div>
  );
};

export default VehicleNumber;
