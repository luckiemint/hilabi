import { useState, useRef, useEffect } from "react";
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

const MessageIcon = () => (
  <svg
    width="80"
    height="80"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <rect
      x="3"
      y="5"
      width="18"
      height="14"
      rx="2"
      stroke="url(#gradient)"
      strokeWidth="1.5"
    />
    <path
      d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8"
      stroke="url(#gradient)"
      strokeWidth="1.5"
      strokeLinecap="round"
    />
    <circle cx="17" cy="17" r="4" fill="#2563eb" />
    <path
      d="M15.5 17l1 1 2-2"
      stroke="white"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <defs>
      <linearGradient
        id="gradient"
        x1="3"
        y1="5"
        x2="21"
        y2="19"
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="#3b82f6" />
        <stop offset="1" stopColor="#2563eb" />
      </linearGradient>
    </defs>
  </svg>
);

const OTPVerification = () => {
  const navigate = useNavigate();
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [timer, setTimer] = useState(30);
  const [canResend, setCanResend] = useState(false);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  useEffect(() => {
    if (timer > 0) {
      const interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
      return () => clearInterval(interval);
    } else {
      setCanResend(true);
    }
  }, [timer]);

  useEffect(() => {
    // Auto-focus first input on mount
    inputRefs.current[0]?.focus();
  }, []);

  const handleChange = (index: number, value: string) => {
    // Only allow numbers
    if (value && !/^\d$/.test(value)) return;

    // Clear error when user starts typing
    if (error) setError("");

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Auto-focus next input
    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (
    index: number,
    e: React.KeyboardEvent<HTMLInputElement>
  ) => {
    // Handle backspace
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData("text").slice(0, 6);
    if (!/^\d+$/.test(pastedData)) return;

    const newOtp = [...otp];
    pastedData.split("").forEach((char, index) => {
      if (index < 6) newOtp[index] = char;
    });
    setOtp(newOtp);

    // Focus last filled input or last input
    const lastIndex = Math.min(pastedData.length, 5);
    inputRefs.current[lastIndex]?.focus();
  };

  const handleResend = () => {
    if (!canResend) return;
    setTimer(30);
    setCanResend(false);
    setOtp(["", "", "", "", "", ""]);
    setError("");
    inputRefs.current[0]?.focus();
    alert("OTP resent successfully!");
  };

  const [error, setError] = useState("");
  const [isVerifying, setIsVerifying] = useState(false);

  const isComplete = otp.every((digit) => digit !== "");
  const CORRECT_OTP = "000000";

  const handleVerify = () => {
    if (isComplete) {
      setIsVerifying(true);
      setError("");

      // Simulate API call delay
      setTimeout(() => {
        const enteredOtp = otp.join("");
        if (enteredOtp === CORRECT_OTP) {
          navigate("/registration/tag-activation-success");
        } else {
          setError("Invalid OTP. Please try again.");
          setOtp(["", "", "", "", "", ""]);
          inputRefs.current[0]?.focus();
        }
        setIsVerifying(false);
      }, 800);
    }
  };

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
        <h1 className="app-title">OTP Verification</h1>
        <div className="header-spacer"></div>
      </header>

      {/* Main Content */}
      <main className="app-content">
        {/* Icon Section */}
        <div className="icon-section">
          <div className="icon-bg">
            <MessageIcon />
          </div>
        </div>

        {/* Form Section */}
        <div className="form-section">
          <h2 className="section-title">Enter Verification Code</h2>
          <p className="section-desc">
            We've sent a 6-digit code to
            <br />
            <strong>+91 98765 43210</strong>
          </p>

          {/* OTP Input */}
          <div className="otp-container">
            {otp.map((digit, index) => (
              <input
                key={index}
                ref={(el) => {
                  inputRefs.current[index] = el;
                }}
                type="text"
                inputMode="numeric"
                maxLength={1}
                className={`otp-input ${digit ? "filled" : ""} ${
                  error ? "error" : ""
                }`}
                value={digit}
                onChange={(e) => handleChange(index, e.target.value)}
                onKeyDown={(e) => handleKeyDown(index, e)}
                onPaste={index === 0 ? handlePaste : undefined}
                autoComplete="off"
                disabled={isVerifying}
              />
            ))}
          </div>

          {/* Error Message */}
          {error && (
            <div className="error-message">
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <circle cx="12" cy="12" r="10" />
                <path d="M12 8v4M12 16h.01" />
              </svg>
              <span>{error}</span>
            </div>
          )}

          {/* Timer / Resend */}
          <div className="resend-section">
            {!canResend ? (
              <p className="timer-text">
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <circle cx="12" cy="12" r="10" />
                  <path d="M12 6v6l4 2" />
                </svg>
                Resend code in <strong>{timer}s</strong>
              </p>
            ) : (
              <button className="resend-btn" onClick={handleResend}>
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M21.5 2v6h-6M2.5 22v-6h6M2 11.5a10 10 0 0118.8-4.3M22 12.5a10 10 0 01-18.8 4.2" />
                </svg>
                Resend OTP
              </button>
            )}
          </div>

          {/* Info Card */}
          <div className="info-card">
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
            <div className="info-text">
              <strong>Didn't receive the code?</strong>
              <p>
                Check your messages or try resending after the timer expires
              </p>
            </div>
          </div>
        </div>
      </main>

      {/* Bottom Action */}
      <footer className="app-footer">
        <button
          className={`primary-btn ${isComplete ? "active" : ""} ${
            isVerifying ? "loading" : ""
          }`}
          disabled={!isComplete || isVerifying}
          onClick={handleVerify}
        >
          {isVerifying ? (
            <>
              <span>Verifying</span>
              <svg
                className="spinner"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
              >
                <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" />
              </svg>
            </>
          ) : (
            <>
              <span>Verify & Continue</span>
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
              >
                <path d="M5 12l5 5L20 7" />
              </svg>
            </>
          )}
        </button>

        <button className="change-number-btn">
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
          </svg>
          <span>Change Phone Number</span>
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
          padding: 24px 20px 180px;
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
          animation: bounce 2s ease-in-out infinite;
          box-shadow: 0 8px 24px rgba(59, 130, 246, 0.12);
        }

        @keyframes bounce {
          0%, 100% { transform: translateY(0); }
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
          text-align: center;
        }

        .section-desc {
          font-size: 0.9375rem;
          color: #64748b;
          line-height: 1.6;
          margin: 0 0 32px 0;
          text-align: center;
        }

        .section-desc strong {
          color: #0f172a;
          font-weight: 600;
        }

        /* OTP Input */
        .otp-container {
          display: flex;
          gap: 10px;
          justify-content: center;
          margin-bottom: 24px;
        }

        .otp-input {
          width: 48px;
          height: 56px;
          font-size: 1.5rem;
          font-weight: 700;
          text-align: center;
          border: 2px solid #e2e8f0;
          border-radius: 12px;
          background: #ffffff;
          color: #0f172a;
          outline: none;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          touch-action: manipulation;
        }

        .otp-input:focus {
          border-color: #2563eb;
          box-shadow: 0 0 0 4px rgba(37, 99, 235, 0.1);
          transform: scale(1.05);
        }

        .otp-input.filled {
          border-color: #10b981;
          background: #f0fdf4;
        }

        .otp-input.error {
          border-color: #ef4444;
          background: #fef2f2;
          animation: shake 0.4s;
        }

        .otp-input:disabled {
          opacity: 0.6;
          cursor: not-allowed;
        }

        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          25% { transform: translateX(-8px); }
          75% { transform: translateX(8px); }
        }

        /* Error Message */
        .error-message {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          margin-bottom: 20px;
          padding: 12px 16px;
          background: #fef2f2;
          border: 1px solid #fecaca;
          border-radius: 12px;
          color: #ef4444;
          font-size: 0.875rem;
          font-weight: 500;
          animation: slideDown 0.3s ease;
        }

        .error-message svg {
          flex-shrink: 0;
        }

        @keyframes slideDown {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        /* Resend Section */
        .resend-section {
          display: flex;
          justify-content: center;
          margin-bottom: 24px;
        }

        .timer-text {
          display: flex;
          align-items: center;
          gap: 6px;
          font-size: 0.875rem;
          color: #64748b;
          margin: 0;
        }

        .timer-text svg {
          flex-shrink: 0;
        }

        .timer-text strong {
          color: #2563eb;
          font-weight: 600;
        }

        .resend-btn {
          display: flex;
          align-items: center;
          gap: 6px;
          background: none;
          border: none;
          color: #2563eb;
          font-size: 0.9375rem;
          font-weight: 600;
          cursor: pointer;
          padding: 8px 16px;
          border-radius: 12px;
          transition: all 0.2s;
          touch-action: manipulation;
        }

        .resend-btn:active {
          background: rgba(37, 99, 235, 0.1);
          transform: scale(0.95);
        }

        /* Info Card */
        .info-card {
          display: flex;
          gap: 12px;
          padding: 16px;
          background: linear-gradient(135deg, rgba(249, 115, 22, 0.05), rgba(249, 115, 22, 0.02));
          border-radius: 16px;
          border: 1px solid rgba(249, 115, 22, 0.1);
        }

        .info-card svg {
          color: #f97316;
          flex-shrink: 0;
          margin-top: 2px;
        }

        .info-text strong {
          display: block;
          font-size: 0.875rem;
          font-weight: 600;
          color: #0f172a;
          margin-bottom: 4px;
        }

        .info-text p {
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
          margin-bottom: 10px;
          touch-action: manipulation;
        }

        .primary-btn.active {
          background: linear-gradient(135deg, #10b981 0%, #059669 100%);
          color: #ffffff;
          cursor: pointer;
          box-shadow: 0 8px 20px rgba(16, 185, 129, 0.3);
        }

        .primary-btn.active:active {
          transform: scale(0.98);
          box-shadow: 0 4px 12px rgba(16, 185, 129, 0.3);
        }

        .primary-btn.loading {
          cursor: wait;
        }

        .spinner {
          animation: spin 1s linear infinite;
        }

        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }

        .change-number-btn {
          width: 100%;
          padding: 8px;
          background: none;
          border: none;
          color: #64748b;
          font-size: 0.875rem;
          font-weight: 500;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 6px;
          border-radius: 12px;
          transition: all 0.2s;
          touch-action: manipulation;
        }

        .change-number-btn:active {
          background: #f1f5f9;
          color: #0f172a;
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

          .otp-input {
            width: 44px;
            height: 52px;
            font-size: 1.25rem;
          }

          .otp-container {
            gap: 8px;
          }

          .error-message {
            font-size: 0.8125rem;
            padding: 10px 14px;
          }

          .timer-text {
            font-size: 0.8125rem;
          }

          .resend-btn {
            font-size: 0.875rem;
            padding: 6px 14px;
          }

          .info-text strong {
            font-size: 0.8125rem;
          }

          .info-text p {
            font-size: 0.75rem;
          }

          .primary-btn {
            font-size: 1rem;
            padding: 16px 20px;
          }

          .change-number-btn {
            font-size: 0.8125rem;
          }

          .app-content {
            padding: 20px 16px 200px;
          }

          .app-header {
            padding: 12px 16px;
          }

          .app-footer {
            padding: 12px 16px calc(12px + env(safe-area-inset-bottom));
          }

          .info-card {
            padding: 14px;
          }
        }

        /* Responsive */
        @media (min-width: 640px) {
          .mobile-app {
            max-width: 428px;
            margin: 0 auto;
            box-shadow: 0 0 40px rgba(0, 0, 0, 0.1);
          }
        }

        @media (max-width: 380px) {
          .otp-input {
            width: 44px;
            height: 52px;
            font-size: 1.375rem;
          }

          .otp-container {
            gap: 8px;
          }
        }
      `}</style>
    </div>
  );
};

export default OTPVerification;
