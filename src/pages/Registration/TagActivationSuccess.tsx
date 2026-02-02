import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import "./ActivateTag.css";
import ScannerModal from '../../components/ScannerModal/ScannerModal';

const CheckCircleIcon = () => (
  <svg width="120" height="120" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="12" cy="12" r="10" stroke="url(#successGradient)" strokeWidth="1.5" fill="rgba(16, 185, 129, 0.1)"/>
    <path d="M8 12.5l2.5 2.5 5.5-5.5" stroke="url(#successGradient)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <defs>
      <linearGradient id="successGradient" x1="2" y1="2" x2="22" y2="22" gradientUnits="userSpaceOnUse">
        <stop stopColor="#10b981"/>
        <stop offset="1" stopColor="#059669"/>
      </linearGradient>
    </defs>
  </svg>
);

const ScanIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M3 7V5a2 2 0 012-2h2M17 3h2a2 2 0 012 2v2M21 17v2a2 2 0 01-2 2h-2M7 21H5a2 2 0 01-2-2v-2"/>
    <circle cx="12" cy="12" r="3"/>
  </svg>
);

const HomeIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/>
    <path d="M9 22V12h6v10"/>
  </svg>
);

const TagActivationSuccess = () => {
  const [confetti, setConfetti] = useState(true);
  const navigate = useNavigate();
  const [showScanner, setShowScanner] = useState(false);

  const handleScanComplete = (tagId: any) => {
    console.log("Scanned tag ID:", tagId);
    setShowScanner(false);
    // Navigate with the scanned tag ID
    navigate("/registration/register-vehicle", { state: { tagId } });
  };

  useEffect(() => {
    // Stop confetti after animation
    const timer = setTimeout(() => setConfetti(false), 3000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="mobile-app">
      {/* Confetti Effect */}
      {confetti && (
        <div className="confetti-container">
          {[...Array(30)].map((_, i) => (
            <div 
              key={i} 
              className="confetti"
              style={{
                left: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 0.5}s`,
                backgroundColor: ['#10b981', '#3b82f6', '#f59e0b', '#ef4444', '#8b5cf6'][i % 5]
              }}
            />
          ))}
        </div>
      )}

      {/* Status Bar Spacer */}
      <div className="status-bar-spacer"></div>

      {/* Header */}
      <header className="app-header">
        <div className="header-spacer"></div>
        <h1 className="app-title">Activation Complete</h1>
        <div className="header-spacer"></div>
      </header>

      {/* Main Content */}
      <main className="app-content">
        {/* Success Icon */}
        <div className="success-icon-wrapper">
          <div className="success-icon">
            <CheckCircleIcon />
          </div>
          <div className="success-pulse"></div>
        </div>

        {/* Success Message */}
        <div className="success-content">
          <h2 className="success-title">Congratulations! 🎉</h2>
          <p className="success-subtitle">Your FASTag has been activated successfully</p>

          {/* Details Card */}
          <div className="details-card">
            <div className="detail-row">
              <span className="detail-label">Vehicle Number</span>
              <span className="detail-value">MH12AB1234</span>
            </div>
            <div className="detail-divider"></div>
            <div className="detail-row">
              <span className="detail-label">Phone Number</span>
              <span className="detail-value">+91 98765 43210</span>
            </div>
            <div className="detail-divider"></div>
            <div className="detail-row">
              <span className="detail-label">Activation Date</span>
              <span className="detail-value">{new Date().toLocaleDateString('en-IN', { 
                day: 'numeric', 
                month: 'short', 
                year: 'numeric' 
              })}</span>
            </div>
          </div>


        </div>
      </main>

      {/* Bottom Actions */}
      <footer className="app-footer">
        <button 
          className="primary-btn scan-btn"
          onClick={() => setShowScanner(true)}
        >
          <ScanIcon />
          <span>Scan Another Tag</span>
        </button>
        
        <button 
          className="secondary-btn"
          onClick={() => navigate("/owner/dashboard")}
        >
          <HomeIcon />
          <span>Go to Home</span>
        </button>
      </footer>
      {/* Scanner Modal */}
            {showScanner && (
              <ScannerModal
                onClose={() => setShowScanner(false)}
                onScanComplete={handleScanComplete}
              />
            )}

      <style>{`
        * {
          box-sizing: border-box;
          -webkit-tap-highlight-color: transparent;
        }

        .mobile-app {
          min-height: 100vh;
          background: linear-gradient(180deg, #f0fdf4 0%, #dcfce7 50%, #f8fafc 100%);
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
          display: flex;
          flex-direction: column;
          max-width: 100vw;
          overflow-x: hidden;
          position: relative;
          padding-bottom: env(safe-area-inset-bottom);
        }

        /* Confetti Animation */
        .confetti-container {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          pointer-events: none;
          z-index: 1000;
          overflow: hidden;
        }

        .confetti {
          position: absolute;
          width: 10px;
          height: 10px;
          top: -20px;
          border-radius: 50%;
          animation: confettiFall 3s linear forwards;
        }

        @keyframes confettiFall {
          to {
            transform: translateY(100vh) rotate(360deg);
            opacity: 0;
          }
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
          padding: 32px 20px 180px;
          overflow-y: auto;
          -webkit-overflow-scrolling: touch;
        }

        /* Success Icon */
        .success-icon-wrapper {
          display: flex;
          justify-content: center;
          align-items: center;
          margin-bottom: 32px;
          position: relative;
        }

        .success-icon {
          animation: scaleIn 0.6s cubic-bezier(0.34, 1.56, 0.64, 1);
          position: relative;
          z-index: 2;
        }

        .success-pulse {
          position: absolute;
          width: 120px;
          height: 120px;
          border-radius: 50%;
          background: rgba(16, 185, 129, 0.2);
          animation: pulse 2s ease-in-out infinite;
        }

        @keyframes scaleIn {
          from {
            transform: scale(0) rotate(-180deg);
            opacity: 0;
          }
          to {
            transform: scale(1) rotate(0deg);
            opacity: 1;
          }
        }

        @keyframes pulse {
          0%, 100% {
            transform: scale(1);
            opacity: 0.5;
          }
          50% {
            transform: scale(1.3);
            opacity: 0;
          }
        }

        /* Success Content */
        .success-content {
          max-width: 100%;
          animation: slideUp 0.6s ease 0.3s backwards;
        }

        @keyframes slideUp {
          from {
            transform: translateY(30px);
            opacity: 0;
          }
          to {
            transform: translateY(0);
            opacity: 1;
          }
        }

        .success-title {
          font-size: 1.75rem;
          font-weight: 700;
          color: #0f172a;
          text-align: center;
          margin: 0 0 8px 0;
        }

        .success-subtitle {
          font-size: 1rem;
          color: #64748b;
          text-align: center;
          margin: 0 0 28px 0;
          line-height: 1.5;
        }

        /* Details Card */
        .details-card {
          background: #ffffff;
          border-radius: 20px;
          padding: 20px;
          box-shadow: 0 4px 16px rgba(0, 0, 0, 0.06);
          margin-bottom: 24px;
          border: 1px solid rgba(16, 185, 129, 0.1);
        }

        .detail-row {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 12px 0;
        }

        .detail-label {
          font-size: 0.875rem;
          color: #64748b;
          font-weight: 500;
        }

        .detail-value {
          font-size: 0.9375rem;
          color: #0f172a;
          font-weight: 600;
        }

        .detail-divider {
          height: 1px;
          background: #f1f5f9;
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
          display: flex;
          flex-direction: column;
          gap: 10px;
        }

        .primary-btn {
          width: 100%;
          padding: 18px 24px;
          background: linear-gradient(135deg, #10b981 0%, #059669 100%);
          color: #ffffff;
          border: none;
          border-radius: 16px;
          font-size: 1.0625rem;
          font-weight: 600;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          box-shadow: 0 8px 20px rgba(16, 185, 129, 0.3);
          touch-action: manipulation;
        }

        .primary-btn:active {
          transform: scale(0.98);
          box-shadow: 0 4px 12px rgba(16, 185, 129, 0.3);
        }

        .secondary-btn {
          width: 100%;
          padding: 16px 24px;
          background: #f8fafc;
          color: #475569;
          border: 2px solid #e2e8f0;
          border-radius: 16px;
          font-size: 1rem;
          font-weight: 600;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          transition: all 0.2s;
          touch-action: manipulation;
        }

        .secondary-btn:active {
          background: #f1f5f9;
          transform: scale(0.98);
        }

        /* Responsive */
        @media (min-width: 640px) {
          .mobile-app {
            max-width: 428px;
            margin: 0 auto;
            box-shadow: 0 0 40px rgba(0, 0, 0, 0.1);
          }
        }

        @media (max-height: 700px) {
          .app-content {
            padding: 24px 20px 180px;
          }

          .success-icon-wrapper {
            margin-bottom: 24px;
          }
        }
      `}</style>
    </div>
  );
};

export default TagActivationSuccess;