import { useState } from "react";
import { useNavigate } from "react-router-dom";

type Contact = {
  id: number;
  name: string;
  relation: string;
  phone: string;
  avatar: string;
  color: string;
  bgColor: string;
};

const BackIcon = ({ size = 24, color = "#1f2937" }: { size?: number; color?: string }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke={color}
    strokeWidth="2.5"
  >
    <path d="M15 18L9 12L15 6" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const PhoneIcon = ({ size = 20 }: { size?: number }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
  >
    <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z" />
  </svg>
);

const MessageIcon = ({ size = 20 }: { size?: number }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
  >
    <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z" />
  </svg>
);

const EmergencyContactsPage = () => {
  const navigate = useNavigate();
  const [callingContact, setCallingContact] = useState<number | null>(null);

  const contacts: Contact[] = [
    {
      id: 1,
      name: "Wife",
      relation: "Spouse",
      phone: "+91 98765 43210",
      avatar: "👩",
      color: "#ec4899",
      bgColor: "rgba(236, 72, 153, 0.1)",
    },
    {
      id: 2,
      name: "Son",
      relation: "Family",
      phone: "+91 98765 43211",
      avatar: "👦",
      color: "#3b82f6",
      bgColor: "rgba(59, 130, 246, 0.1)",
    },
    {
      id: 3,
      name: "Father",
      relation: "Family",
      phone: "+91 98765 43212",
      avatar: "👨",
      color: "#8b5cf6",
      bgColor: "rgba(139, 92, 246, 0.1)",
    },
    {
      id: 4,
      name: "Friend",
      relation: "Emergency Contact",
      phone: "+91 98765 43213",
      avatar: "👤",
      color: "#10b981",
      bgColor: "rgba(16, 185, 129, 0.1)",
    },
  ];

  const handleCall = (contact: Contact) => {
    setCallingContact(contact.id);
    setTimeout(() => {
      alert(`Calling ${contact.name}...\n${contact.phone}`);
      setCallingContact(null);
    }, 500);
  };

  const handleMessage = (contact: Contact) => {
    alert(`Opening WhatsApp to message ${contact.name}...\n${contact.phone}`);
  };

  return (
    <div className="mobile-app">
      <div className="status-bar-spacer"></div>

      <header className="app-header">
        <button
          className="back-btn"
          onClick={() => navigate("/visitor/dashboard")}
          aria-label="Go back"
        >
          <BackIcon size={28} />
        </button>
        <h1 className="app-title">Emergency Contacts</h1>
        <div className="header-spacer"></div>
      </header>

      <main className="app-content">
        <div className="info-banner">
          <div className="banner-icon">🚨</div>
          <div className="banner-text">
            <strong>Quick Access Contacts</strong>
            <p>Contact vehicle owner's emergency contacts directly</p>
          </div>
        </div>

        <div className="contacts-section">
          <h2 className="section-title">Available Contacts</h2>

          <div className="contacts-list">
            {contacts.map((contact) => (
              <div key={contact.id} className="contact-card">
                <div
                  className="contact-avatar"
                  style={{
                    backgroundColor: contact.bgColor,
                    border: `2px solid ${contact.color}`,
                  }}
                >
                  <span className="avatar-emoji">{contact.avatar}</span>
                </div>

                <div className="contact-info">
                  <h3 className="contact-name">{contact.name}</h3>
                  <span className="contact-relation">{contact.relation}</span>
                </div>

                <div className="contact-actions">
                  <button
                    className="action-icon-btn call-icon-btn"
                    onClick={() => handleCall(contact)}
                    disabled={callingContact === contact.id}
                    aria-label={`Call ${contact.name}`}
                  >
                    {callingContact === contact.id ? (
                      <svg
                        className="spinner-small"
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2.5"
                      >
                        <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" />
                      </svg>
                    ) : (
                      <PhoneIcon size={20} />
                    )}
                  </button>

                  <button
                    className="action-icon-btn message-icon-btn"
                    onClick={() => handleMessage(contact)}
                    aria-label={`Message ${contact.name}`}
                  >
                    <MessageIcon size={20} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="warning-card">
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" />
            <path d="M12 9v4M12 17h.01" />
          </svg>
          <div className="warning-text">
            <strong>Important Notice</strong>
            <p>
              These contacts are for genuine emergencies only. Misuse may result
              in account suspension.
            </p>
          </div>
        </div>
      </main>

      <style>{`
        * {
          box-sizing: border-box;
          -webkit-tap-highlight-color: transparent;
        }

        .mobile-app {
          min-height: 100vh;
          background: linear-gradient(180deg, #fef2f2 0%, #fee2e2 30%, #f8fafc 100%);
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
          display: flex;
          flex-direction: column;
          max-width: 100vw;
          overflow-x: hidden;
          padding-bottom: env(safe-area-inset-bottom);
        }

        .status-bar-spacer {
          height: env(safe-area-inset-top);
          background: #ffffff;
        }

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

        .app-content {
          flex: 1;
          padding: 20px;
          overflow-y: auto;
          -webkit-overflow-scrolling: touch;
        }

        .info-banner {
          display: flex;
          gap: 14px;
          padding: 18px;
          background: linear-gradient(135deg, rgba(239, 68, 68, 0.1), rgba(220, 38, 38, 0.05));
          border: 2px solid rgba(239, 68, 68, 0.2);
          border-radius: 18px;
          margin-bottom: 24px;
          animation: slideDown 0.4s ease;
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

        .banner-icon {
          font-size: 2rem;
          line-height: 1;
          animation: pulse 2s ease-in-out infinite;
        }

        @keyframes pulse {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.1); }
        }

        .banner-text strong {
          display: block;
          font-size: 1rem;
          font-weight: 700;
          color: #0f172a;
          margin-bottom: 4px;
        }

        .banner-text p {
          font-size: 0.875rem;
          color: #ffffff;
          margin: 0;
          line-height: 1.4;
        }

        .contacts-section {
          margin-bottom: 24px;
        }

        .section-title {
          font-size: 0.875rem;
          font-weight: 700;
          color: #64748b;
          text-transform: uppercase;
          letter-spacing: 0.5px;
          margin: 0 0 16px 0;
        }

        .contacts-list {
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        .contact-card {
          display: flex;
          align-items: center;
          gap: 14px;
          background: #ffffff;
          border: 2px solid #f1f5f9;
          border-radius: 18px;
          padding: 16px;
          transition: all 0.2s;
          animation: slideUp 0.4s ease backwards;
        }

        .contact-card:nth-child(1) { animation-delay: 0.1s; }
        .contact-card:nth-child(2) { animation-delay: 0.2s; }
        .contact-card:nth-child(3) { animation-delay: 0.3s; }
        .contact-card:nth-child(4) { animation-delay: 0.4s; }

        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .contact-card:active {
          transform: scale(0.98);
          background: #fafafa;
        }

        .contact-avatar {
          width: 56px;
          height: 56px;
          border-radius: 16px;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }

        .avatar-emoji {
          font-size: 1.75rem;
          line-height: 1;
        }

        .contact-info {
          flex: 1;
          display: flex;
          flex-direction: column;
          gap: 4px;
        }

        .contact-name {
          font-size: 1.0625rem;
          font-weight: 700;
          color: #0f172a;
          margin: 0;
        }

        .contact-relation {
          font-size: 0.8125rem;
          color: #64748b;
          font-weight: 500;
        }

        .contact-actions {
          display: flex;
          gap: 8px;
          flex-shrink: 0;
        }

        .action-icon-btn {
          width: 44px;
          height: 44px;
          border-radius: 12px;
          border: none;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: all 0.2s;
          touch-action: manipulation;
        }

        .call-icon-btn {
          background: linear-gradient(135deg, #3b82f6, #2563eb);
          color: #ffffff;
          box-shadow: 0 4px 12px rgba(59, 130, 246, 0.3);
        }

        .call-icon-btn:active:not(:disabled) {
          transform: scale(0.95);
          box-shadow: 0 2px 8px rgba(59, 130, 246, 0.3);
        }

        .call-icon-btn:disabled {
          opacity: 0.7;
          cursor: not-allowed;
        }

        .message-icon-btn {
          background: linear-gradient(135deg, #10b981, #059669);
          color: #ffffff;
          box-shadow: 0 4px 12px rgba(16, 185, 129, 0.3);
        }

        .message-icon-btn:active {
          transform: scale(0.95);
          box-shadow: 0 2px 8px rgba(16, 185, 129, 0.3);
        }

        .spinner-small {
          animation: spin 1s linear infinite;
        }

        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }

        .warning-card {
          display: flex;
          gap: 12px;
          padding: 16px;
          background: linear-gradient(135deg, rgba(249, 115, 22, 0.08), rgba(249, 115, 22, 0.03));
          border: 2px solid rgba(249, 115, 22, 0.2);
          border-radius: 16px;
          margin-top: 24px;
        }

        .warning-card svg {
          color: #f97316;
          flex-shrink: 0;
          margin-top: 2px;
        }

        .warning-text strong {
          display: block;
          font-size: 0.875rem;
          font-weight: 700;
          color: #0f172a;
          margin-bottom: 4px;
        }

        .warning-text p {
          font-size: 0.8125rem;
          color: #ffffff;
          line-height: 1.5;
          margin: 0;
        }

        @media (min-width: 640px) {
          .mobile-app {
            max-width: 428px;
            margin: 0 auto;
            box-shadow: 0 0 40px rgba(0, 0, 0, 0.1);
          }
        }

        @media (max-width: 380px) {
          .contact-actions {
            flex-direction: column;
            gap: 6px;
          }

          .action-icon-btn {
            width: 40px;
            height: 40px;
          }
        }
      `}</style>
    </div>
  );
};

export default EmergencyContactsPage;
