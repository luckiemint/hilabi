import { useState } from "react";
import { useNavigate } from "react-router-dom";

const BackIcon = ({ size = 24, color = "#1f2937" }) => (
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

const PhoneIcon = () => (
  <svg
    width="80"
    height="80"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <rect
      x="6"
      y="3"
      width="12"
      height="18"
      rx="2"
      stroke="url(#gradient)"
      strokeWidth="1.5"
    />
    <path d="M6 6h12M6 18h12" stroke="url(#gradient)" strokeWidth="1.5" />
    <circle cx="12" cy="20" r="0.5" fill="#2563eb" />
    <defs>
      <linearGradient
        id="gradient"
        x1="6"
        y1="3"
        x2="18"
        y2="21"
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="#3b82f6" />
        <stop offset="1" stopColor="#2563eb" />
      </linearGradient>
    </defs>
  </svg>
);

const ShieldIcon = () => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M12 2L4 6v6c0 5.55 3.84 10.74 8 12 4.16-1.26 8-6.45 8-12V6l-8-4z"
      stroke="#10b981"
      strokeWidth="1.5"
      fill="rgba(16, 185, 129, 0.1)"
    />
    <path
      d="M9 12l2 2 4-4"
      stroke="#10b981"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const PhoneVerification = () => {
  const navigate = useNavigate();
  const [phoneNumber, setPhoneNumber] = useState("");
  const [touched, setTouched] = useState(false);

  const handleInputChange = (e: { target: { value: string } }) => {
    const value = e.target.value.replace(/\D/g, "");
    if (value.length <= 10) {
      setPhoneNumber(value);
      if (!touched) setTouched(true);
    }
  };

  const formatPhoneNumber = (value: string | any[]) => {
    if (!value) return "";
    if (value.length <= 5) return value;
    if (value.length <= 10) return `${value.slice(0, 5)} ${value.slice(5)}`;
    return value;
  };

  const isValid = phoneNumber.length === 10;

  return (
    <div className="mobile-app">
      {/* Status Bar Spacer */}
      <div className="status-bar-spacer"></div>

      {/* Header */}
      <header className="app-header">
        <button
          className="back-btn"
          onClick={() => navigate(-1)}
          aria-label="Go back"
        >
          <BackIcon size={28} />
        </button>
        <h1 className="app-title">Phone Verification</h1>
        <div className="header-spacer"></div>
      </header>

      {/* Main Content */}
      <main className="app-content">
        {/* Icon Section */}
        <div className="icon-section">
          <div className="icon-bg">
            <PhoneIcon />
          </div>
        </div>

        {/* Form Section */}
        <div className="form-section">
          <h2 className="section-title">Verify Your Number</h2>
          <p className="section-desc">
            We'll send you a verification code to confirm your phone number
          </p>

          <div className="input-group">
            <label className="input-label">Mobile Number</label>
            <div className="phone-input-wrapper">
              <div className="country-code">
                <span className="flag">🇮🇳</span>
                <span className="code">+91</span>
              </div>
              <div className="input-wrapper">
                <input
                  type="tel"
                  inputMode="numeric"
                  className={`mobile-input ${
                    touched && !isValid ? "error" : ""
                  } ${isValid ? "valid" : ""}`}
                  placeholder="98765 43210"
                  value={formatPhoneNumber(phoneNumber)}
                  onChange={handleInputChange}
                  maxLength={11}
                  autoComplete="tel"
                />
                {phoneNumber && (
                  <button
                    className="clear-btn"
                    onClick={() => {
                      setPhoneNumber("");
                      setTouched(false);
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
            {touched && !isValid && phoneNumber.length > 0 && (
              <div className="input-error">
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <circle cx="12" cy="12" r="10" />
                  <path d="M12 8v4M12 16h.01" />
                </svg>
                <span>Please enter a valid 10-digit mobile number</span>
              </div>
            )}
            {isValid && (
              <div className="input-success">
                <ShieldIcon />
                <span>Valid mobile number</span>
              </div>
            )}
          </div>

          {/* Security Notice */}
          <div className="security-notice">
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
              <path d="M7 11V7a5 5 0 0110 0v4" />
            </svg>
            <div className="notice-text">
              <strong>Your privacy matters</strong>
              <p>
                We'll only use your number for verification and important
                updates
              </p>
            </div>
          </div>
        </div>
      </main>

      {/* Bottom Action */}
      <footer className="app-footer">
        <button
          className={`primary-btn ${isValid ? "active" : ""}`}
          disabled={!isValid}
          onClick={() => navigate("/registration/otp-verification")}
        >
          <span>Send OTP</span>
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
          >
            <path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z" />
          </svg>
        </button>

        <p className="footer-note">
          By continuing, you agree to receive SMS messages for verification
        </p>
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
          padding: 24px 20px 160px;
          overflow-y: auto;
          -webkit-overflow-scrolling: touch;
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
          animation: pulse 2s ease-in-out infinite;
          box-shadow: 0 8px 24px rgba(59, 130, 246, 0.12);
        }

        @keyframes pulse {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.05); }
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
          margin-bottom: 20px;
        }

        .input-label {
          display: block;
          font-size: 0.875rem;
          font-weight: 600;
          color: #334155;
          margin-bottom: 10px;
        }

        .phone-input-wrapper {
          display: flex;
          gap: 8px;
          align-items: stretch;
        }

        .country-code {
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 0 16px;
          background: #ffffff;
          border: 2px solid #e2e8f0;
          border-radius: 16px;
          font-weight: 600;
          color: #0f172a;
          font-size: 1.125rem;
          flex-shrink: 0;
        }

        .flag {
          font-size: 1.5rem;
          line-height: 1;
        }

        .code {
          font-size: 1.125rem;
        }

        .input-wrapper {
          position: relative;
          flex: 1;
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
          letter-spacing: 1px;
          touch-action: manipulation;
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
          background: #fef2f2;
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

        .input-error {
          display: flex;
          align-items: flex-start;
          gap: 6px;
          margin-top: 10px;
          font-size: 0.8125rem;
          color: #ef4444;
          line-height: 1.5;
        }

        .input-error svg {
          flex-shrink: 0;
          margin-top: 2px;
        }

        .input-success {
          display: flex;
          align-items: center;
          gap: 8px;
          margin-top: 10px;
          font-size: 0.875rem;
          color: #10b981;
          font-weight: 500;
        }

        /* Security Notice */
        .security-notice {
          display: flex;
          gap: 12px;
          padding: 16px;
          background: linear-gradient(135deg, rgba(59, 130, 246, 0.05), rgba(37, 99, 235, 0.02));
          border-radius: 16px;
          border: 1px solid rgba(59, 130, 246, 0.1);
          margin-top: 24px;
        }

        .security-notice svg {
          color: #2563eb;
          flex-shrink: 0;
          margin-top: 2px;
        }

        .notice-text strong {
          display: block;
          font-size: 0.875rem;
          font-weight: 600;
          color: #0f172a;
          margin-bottom: 4px;
        }

        .notice-text p {
          font-size: 0.8125rem;
          color: #64748b;
          line-height: 1.4;
          margin: 0;
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
          transform: translateX(2px);
        }

        .footer-note {
          font-size: 0.75rem;
          color: #94a3b8;
          text-align: center;
          margin: 0;
          line-height: 1.4;
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
            font-size: 0.8125rem;
          }

          .mobile-input {
            font-size: 1rem;
            padding: 16px 44px 16px 16px;
          }

          .country-code {
            font-size: 1rem;
            padding: 0 14px;
          }

          .flag {
            font-size: 1.25rem;
          }

          .code {
            font-size: 1rem;
          }

          .input-error {
            font-size: 0.75rem;
          }

          .input-success {
            font-size: 0.8125rem;
          }

          .primary-btn {
            font-size: 1rem;
            padding: 16px 20px;
          }

          .footer-note {
            font-size: 0.6875rem;
          }

          .app-content {
            padding: 20px 16px 180px;
          }

          .app-header {
            padding: 12px 16px;
          }

          .app-footer {
            padding: 12px 16px calc(12px + env(safe-area-inset-bottom));
          }

          .security-notice {
            padding: 14px;
            margin-top: 20px;
          }

          .notice-text strong {
            font-size: 0.8125rem;
          }

          .notice-text p {
            font-size: 0.75rem;
          }
        }

        /* Responsive */
        @media (min-width: 640px) {
          .mobile-app {
            max-width: 428px;
            margin: 0 auto;
            box-shadow: 0 0 40px rgba(0, 0, 0, 0.1);
          }
          .mobile-input {
            font-size: 1rem;
            padding: 16px 44px 16px 16px;
          }
          .flag{
            font-size: 1rem;
          }
          .code{
            font-size: 1rem;
          }
        }
          
      `}</style>
    </div>
  );
};

export default PhoneVerification;
