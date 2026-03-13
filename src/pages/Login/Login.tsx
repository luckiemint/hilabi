import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import LandingLayout from "../../components/LandingLayout/LandingLayout";

type Step = "phone" | "otp";

export default function Login() {
  const navigate = useNavigate();
  const [step, setStep] = useState<Step>("phone");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [timer, setTimer] = useState(30);
  const [canResend, setCanResend] = useState(false);
  const [error, setError] = useState("");
  const [isVerifying, setIsVerifying] = useState(false);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  useEffect(() => {
    if (timer > 0 && step === "otp") {
      const interval = setInterval(() => setTimer((t) => t - 1), 1000);
      return () => clearInterval(interval);
    }
    if (timer === 0) setCanResend(true);
  }, [timer, step]);

  useEffect(() => {
    if (step === "otp") inputRefs.current[0]?.focus();
  }, [step]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const formatPhoneNumber = (val: string) =>
    val.length <= 5 ? val : `${val.slice(0, 5)} ${val.slice(5)}`;
  const rawPhone = phoneNumber.replace(/\D/g, "");
  const isValidPhone = rawPhone.length === 10;

  const handleSendOtp = () => {
    if (!isValidPhone) return;
    setError("");
    setStep("otp");
    setTimer(30);
    setCanResend(false);
    setOtp(["", "", "", "", "", ""]);
  };

  const handleOtpChange = (index: number, value: string) => {
    if (value && !/^\d$/.test(value)) return;
    setError("");
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);
    if (value && index < 5) inputRefs.current[index + 1]?.focus();
  };

  const handleOtpKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e: React.ClipboardEvent) => {
    e.preventDefault();
    const pasted = e.clipboardData.getData("text").slice(0, 6);
    if (!/^\d+$/.test(pasted)) return;
    const newOtp = [...otp];
    pasted.split("").forEach((c, i) => { if (i < 6) newOtp[i] = c; });
    setOtp(newOtp);
    inputRefs.current[Math.min(pasted.length, 5)]?.focus();
  };

  const handleResend = () => {
    if (!canResend) return;
    setTimer(30);
    setCanResend(false);
    setOtp(["", "", "", "", "", ""]);
    setError("");
    inputRefs.current[0]?.focus();
  };

  const handleVerify = () => {
    const entered = otp.join("");
    if (entered.length !== 6) return;
    setIsVerifying(true);
    setError("");
    setTimeout(() => {
      if (entered === "000000") {
        navigate("/owner/dashboard");
      } else {
        setError("Invalid OTP. Please try again.");
        setOtp(["", "", "", "", "", ""]);
        inputRefs.current[0]?.focus();
      }
      setIsVerifying(false);
    }, 800);
  };

  const isOtpComplete = otp.every((d) => d !== "");

  return (
    <LandingLayout>
      <style>{loginCss}</style>
      <div className="login-page">
        <div className="login-card">
          <h1 className="login-title">{step === "phone" ? "Login" : "Verify OTP"}</h1>
          <p className="login-subtitle">
            {step === "phone"
              ? "Enter your mobile number to receive a one-time password"
              : `We sent a 6-digit code to +91 ${formatPhoneNumber(rawPhone)}`}
          </p>

          {step === "phone" ? (
            <>
              <div className="login-input-wrap">
                <span className="login-country">🇮🇳 +91</span>
                <span className="login-divider" aria-hidden="true" />
                <input
                  type="tel"
                  inputMode="numeric"
                  className="login-input"
                  placeholder="98765 43210"
                  value={formatPhoneNumber(rawPhone)}
                  onChange={(e) => {
                    const v = e.target.value.replace(/\D/g, "").slice(0, 10);
                    setPhoneNumber(v);
                  }}
                  maxLength={11}
                />
              </div>
              <button
                className="login-btn"
                disabled={!isValidPhone}
                onClick={handleSendOtp}
              >
                Send OTP
              </button>
            </>
          ) : (
            <>
              <div className="login-otp-wrap">
                {otp.map((d, i) => (
                  <input
                    key={i}
                    ref={(el) => { inputRefs.current[i] = el; }}
                    type="text"
                    inputMode="numeric"
                    maxLength={1}
                    className={`login-otp-input ${error ? "error" : ""}`}
                    value={d}
                    onChange={(e) => handleOtpChange(i, e.target.value)}
                    onKeyDown={(e) => handleOtpKeyDown(i, e)}
                    onPaste={i === 0 ? handlePaste : undefined}
                    disabled={isVerifying}
                  />
                ))}
              </div>
              {error && <p className="login-error">{error}</p>}
              <div className="login-resend">
                {!canResend ? (
                  <span>Resend in <strong>{timer}s</strong></span>
                ) : (
                  <button type="button" className="login-resend-btn" onClick={handleResend}>
                    Resend OTP
                  </button>
                )}
              </div>
              <button
                className="login-btn"
                disabled={!isOtpComplete || isVerifying}
                onClick={handleVerify}
              >
                {isVerifying ? "Verifying…" : "Verify & Continue"}
              </button>
              <button
                type="button"
                className="login-back"
                onClick={() => { setStep("phone"); setError(""); }}
              >
                ← Change number
              </button>
            </>
          )}
        </div>
      </div>
    </LandingLayout>
  );
}

const loginCss = `
.login-page {
  min-height: calc(100vh - 72px);
  min-height: calc(100dvh - 72px);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 120px 24px 80px;
  padding-top: max(120px, env(safe-area-inset-top, 0) + 96px);
  padding-bottom: max(80px, env(safe-area-inset-bottom, 0) + 40px);
  padding-left: max(24px, env(safe-area-inset-left, 0) + 16px);
  padding-right: max(24px, env(safe-area-inset-right, 0) + 16px);
  overflow-y: auto;
  -webkit-overflow-scrolling: touch;
  box-sizing: border-box;
}
.login-card {
  width: 100%;
  max-width: 400px;
  min-width: 0;
  background: var(--surf2);
  border: 1px solid var(--border);
  border-radius: 20px;
  padding: 48px 40px;
  box-sizing: border-box;
}
.login-title {
  font-family: var(--dsp);
  font-size: 28px;
  font-weight: 800;
  color: var(--white);
  margin: 0 0 8px 0;
  text-align: center;
}
.login-subtitle {
  font-size: 14px;
  color: var(--muted);
  line-height: 1.6;
  margin: 0 0 32px 0;
  text-align: center;
}
.login-input-wrap {
  display: flex;
  align-items: stretch;
  gap: 0;
  background: var(--surf);
  border: 1px solid var(--border);
  border-radius: 12px;
  overflow: hidden;
  margin-bottom: 24px;
}
.login-country {
  flex-shrink: 0;
  display: flex;
  align-items: center;
  padding: 0 14px 0 16px;
  font-size: 14px;
  color: var(--muted);
}
.login-divider {
  width: 1px;
  background: var(--border);
  flex-shrink: 0;
}
.login-input {
  flex: 1;
  min-width: 0;
  padding: 16px 16px 16px 14px;
  min-height: 48px;
  background: none;
  border: none;
  color: var(--white);
  font-size: 16px;
  outline: none;
  -webkit-tap-highlight-color: transparent;
}
.login-input::placeholder {
  color: rgba(245,244,241,0.3);
}
.login-btn {
  width: 100%;
  padding: 16px 24px;
  min-height: 48px;
  background: var(--accent);
  border: none;
  border-radius: 12px;
  font-family: var(--dsp);
  font-size: 15px;
  font-weight: 700;
  color: #0a0a0a;
  cursor: pointer;
  transition: all 0.2s;
  -webkit-tap-highlight-color: transparent;
  touch-action: manipulation;
}
.login-btn:hover:not(:disabled) {
  background: #e2ff40;
  transform: translateY(-1px);
}
.login-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}
.login-otp-wrap {
  display: flex;
  gap: 10px;
  justify-content: center;
  margin-bottom: 20px;
}
.login-otp-input {
  width: 48px;
  height: 56px;
  min-width: 0;
  font-size: 20px;
  font-weight: 700;
  text-align: center;
  background: var(--surf);
  border: 2px solid var(--border);
  border-radius: 12px;
  color: var(--white);
  outline: none;
  transition: border-color 0.2s;
  -webkit-tap-highlight-color: transparent;
}
.login-otp-input:focus {
  border-color: var(--accent);
}
.login-otp-input.error {
  border-color: #ef4444;
}
.login-error {
  font-size: 13px;
  color: #ef4444;
  margin: -8px 0 16px 0;
  text-align: center;
}
.login-resend {
  text-align: center;
  margin-bottom: 24px;
  font-size: 13px;
  color: var(--muted);
}
.login-resend-btn {
  background: none;
  border: none;
  color: var(--accent);
  font-weight: 600;
  cursor: pointer;
  font-size: 13px;
}
.login-resend-btn:hover {
  text-decoration: underline;
}
.login-back {
  display: block;
  width: 100%;
  margin-top: 16px;
  padding: 12px;
  background: none;
  border: none;
  color: var(--muted);
  font-size: 13px;
  cursor: pointer;
}
.login-back:hover {
  color: var(--white);
}
@media (max-width: 600px) {
  .login-page {
    padding: 100px 20px 60px;
    padding-top: max(100px, env(safe-area-inset-top, 0) + 88px);
    padding-bottom: max(60px, env(safe-area-inset-bottom, 0) + 24px);
    padding-left: max(20px, env(safe-area-inset-left, 0) + 12px);
    padding-right: max(20px, env(safe-area-inset-right, 0) + 12px);
  }
  .login-card { padding: 40px 28px; }
  .login-title { font-size: 24px; }
  .login-subtitle { font-size: 13px; margin-bottom: 28px; }
  .login-input-wrap { padding: 0 14px; margin-bottom: 20px; }
  .login-btn { padding: 14px 20px; font-size: 14px; }
}
@media (max-width: 480px) {
  .login-page {
    padding: 80px 16px 40px;
    padding-top: max(80px, env(safe-area-inset-top, 0) + 72px);
    padding-bottom: max(40px, env(safe-area-inset-bottom, 0) + 20px);
    padding-left: max(16px, env(safe-area-inset-left, 0) + 8px);
    padding-right: max(16px, env(safe-area-inset-right, 0) + 8px);
  }
  .login-card { padding: 32px 20px; }
  .login-title { font-size: 22px; }
  .login-subtitle { font-size: 12px; margin-bottom: 24px; }
  .login-otp-wrap { gap: 8px; margin-bottom: 16px; }
  .login-otp-input { width: 40px; height: 48px; font-size: 17px; min-width: 0; }
  .login-resend { margin-bottom: 20px; font-size: 12px; }
  .login-btn { padding: 14px 18px; font-size: 14px; }
}
@media (max-width: 380px) {
  .login-page { padding-left: 12px; padding-right: 12px; }
  .login-card { padding: 28px 16px; }
  .login-title { font-size: 20px; }
  .login-otp-wrap { gap: 6px; }
  .login-otp-input { width: 34px; height: 42px; font-size: 15px; }
}
@media (max-height: 500px) {
  .login-page { align-items: flex-start; padding-top: 24px; }
}
`;
