import { useState } from "react";
import LandingLayout from "../../components/LandingLayout/LandingLayout";

export default function GetSticker() {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const rawPhone = phoneNumber.replace(/\D/g, "");
  const isValidPhone = rawPhone.length === 10;
  const formatPhone = (val: string) =>
    val.length <= 5 ? val : `${val.slice(0, 5)} ${val.slice(5)}`;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isValidPhone) return;
    setSubmitted(true);
  };

  return (
    <LandingLayout>
      <style>{getStickerCss}</style>
      <div className="get-sticker-page">
        <div className="get-sticker-card">
          {!submitted ? (
            <>
              <div className="get-sticker-icon">
                <svg width="56" height="56" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
                  <path d="M12 12l9-5M12 12v9.5M12 12L3 7" />
                </svg>
              </div>
              <h1 className="get-sticker-title">Get Your Hilabi Sticker</h1>
              <p className="get-sticker-desc">
                Enter your mobile number and we&apos;ll give you a call to arrange delivery of your QR sticker. 
                No commitment — just leave your number and we&apos;ll reach out within 24 hours.
              </p>
              <form onSubmit={handleSubmit} className="get-sticker-form">
                <div className="get-sticker-input-wrap">
                  <span className="get-sticker-country">🇮🇳 +91</span>
                  <input
                    type="tel"
                    inputMode="numeric"
                    className="get-sticker-input"
                    placeholder="98765 43210"
                    value={formatPhone(rawPhone)}
                    onChange={(e) => {
                      const v = e.target.value.replace(/\D/g, "").slice(0, 10);
                      setPhoneNumber(v);
                    }}
                    maxLength={11}
                  />
                </div>
                <button
                  type="submit"
                  className="get-sticker-btn"
                  disabled={!isValidPhone}
                >
                  Request a Call
                </button>
              </form>
              <p className="get-sticker-note">
                We&apos;ll use your number only to contact you about your sticker. No spam.
              </p>
            </>
          ) : (
            <div className="get-sticker-success">
              <div className="get-sticker-success-icon">✓</div>
              <h2 className="get-sticker-success-title">Request received!</h2>
              <p className="get-sticker-success-desc">
                We&apos;ll call you at <strong>+91 {formatPhone(rawPhone)}</strong> within 24 hours 
                to arrange delivery of your Hilabi sticker. Thanks for your interest!
              </p>
            </div>
          )}
        </div>
      </div>
    </LandingLayout>
  );
}

const getStickerCss = `
.get-sticker-page {
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
.get-sticker-card {
  width: 100%;
  max-width: 480px;
  min-width: 0;
  background: var(--surf2);
  border: 1px solid var(--border);
  border-radius: 20px;
  padding: 48px 40px;
  box-sizing: border-box;
}
.get-sticker-icon {
  display: flex;
  justify-content: center;
  margin-bottom: 24px;
  color: var(--accent);
}
.get-sticker-title {
  font-family: var(--dsp);
  font-size: 28px;
  font-weight: 800;
  color: var(--white);
  margin: 0 0 12px 0;
  text-align: center;
}
.get-sticker-desc {
  font-size: 15px;
  color: var(--muted);
  line-height: 1.65;
  margin: 0 0 32px 0;
  text-align: center;
}
.get-sticker-form {
  margin-bottom: 16px;
}
.get-sticker-input-wrap {
  display: flex;
  align-items: center;
  gap: 12px;
  background: var(--surf);
  border: 1px solid var(--border);
  border-radius: 12px;
  padding: 0 16px;
  margin-bottom: 20px;
}
.get-sticker-country {
  font-size: 14px;
  color: var(--muted);
}
.get-sticker-input {
  flex: 1;
  padding: 16px 0;
  min-height: 48px;
  background: none;
  border: none;
  color: var(--white);
  font-size: 16px;
  outline: none;
  -webkit-tap-highlight-color: transparent;
}
.get-sticker-input::placeholder {
  color: rgba(245,244,241,0.3);
}
.get-sticker-btn {
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
.get-sticker-btn:hover:not(:disabled) {
  background: #e2ff40;
  transform: translateY(-1px);
}
.get-sticker-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}
.get-sticker-note {
  font-size: 12px;
  color: rgba(245,244,241,0.4);
  text-align: center;
  margin: 0;
}
.get-sticker-success {
  text-align: center;
  padding: 16px 0;
}
.get-sticker-success-icon {
  width: 64px;
  height: 64px;
  margin: 0 auto 24px;
  background: rgba(212,255,0,0.15);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 28px;
  font-weight: 700;
  color: var(--accent);
}
.get-sticker-success-title {
  font-family: var(--dsp);
  font-size: 24px;
  font-weight: 800;
  color: var(--white);
  margin: 0 0 12px 0;
}
.get-sticker-success-desc {
  font-size: 14px;
  color: var(--muted);
  line-height: 1.65;
  margin: 0;
}
.get-sticker-success-desc strong {
  color: var(--white);
}
@media (max-width: 600px) {
  .get-sticker-page {
    padding: 100px 20px 60px;
    padding-top: max(100px, env(safe-area-inset-top, 0) + 88px);
    padding-bottom: max(60px, env(safe-area-inset-bottom, 0) + 24px);
    padding-left: max(20px, env(safe-area-inset-left, 0) + 12px);
    padding-right: max(20px, env(safe-area-inset-right, 0) + 12px);
  }
  .get-sticker-card { padding: 40px 28px; }
  .get-sticker-title { font-size: 24px; }
  .get-sticker-desc { font-size: 14px; margin-bottom: 28px; }
  .get-sticker-icon svg { width: 48px; height: 48px; }
  .get-sticker-input-wrap { padding: 0 14px; margin-bottom: 18px; }
  .get-sticker-btn { padding: 14px 20px; font-size: 14px; }
}
@media (max-width: 480px) {
  .get-sticker-page {
    padding: 80px 16px 40px;
    padding-top: max(80px, env(safe-area-inset-top, 0) + 72px);
    padding-bottom: max(40px, env(safe-area-inset-bottom, 0) + 20px);
    padding-left: max(16px, env(safe-area-inset-left, 0) + 8px);
    padding-right: max(16px, env(safe-area-inset-right, 0) + 8px);
  }
  .get-sticker-card { padding: 32px 20px; }
  .get-sticker-title { font-size: 22px; }
  .get-sticker-desc { font-size: 13px; margin-bottom: 24px; }
  .get-sticker-icon { margin-bottom: 20px; }
  .get-sticker-icon svg { width: 44px; height: 44px; }
  .get-sticker-success-title { font-size: 20px; }
  .get-sticker-success-desc { font-size: 13px; }
  .get-sticker-success-icon { width: 56px; height: 56px; font-size: 24px; }
}
@media (max-width: 380px) {
  .get-sticker-page { padding-left: 12px; padding-right: 12px; }
  .get-sticker-card { padding: 28px 16px; }
  .get-sticker-title { font-size: 20px; }
  .get-sticker-desc { font-size: 12px; }
}
@media (max-height: 500px) {
  .get-sticker-page { align-items: flex-start; padding-top: 24px; }
}
`;
