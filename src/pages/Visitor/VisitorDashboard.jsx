import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../../components/header/Header";

const BackIcon = ({ size = 24, color = "#1f2937" }) => (
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

const PhoneIcon = () => (
  <svg
    width="60"
    height="60"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z"
      stroke="url(#phoneGradient)"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <defs>
      <linearGradient
        id="phoneGradient"
        x1="2"
        y1="2"
        x2="22"
        y2="22"
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="#3b82f6" />
        <stop offset="1" stopColor="#2563eb" />
      </linearGradient>
    </defs>
  </svg>
);

const MessageIcon = () => (
  <svg
    width="60"
    height="60"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z"
      stroke="url(#messageGradient)"
      strokeWidth="1.5"
    />
    <path
      d="M8 10h8M8 14h5"
      stroke="url(#messageGradient)"
      strokeWidth="1.5"
      strokeLinecap="round"
    />
    <defs>
      <linearGradient
        id="messageGradient"
        x1="3"
        y1="3"
        x2="21"
        y2="21"
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="#10b981" />
        <stop offset="1" stopColor="#059669" />
      </linearGradient>
    </defs>
  </svg>
);

const EmergencyIcon = () => (
  <svg
    width="60"
    height="60"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <circle
      cx="12"
      cy="12"
      r="10"
      stroke="url(#emergencyGradient)"
      strokeWidth="1.5"
    />
    <path
      d="M12 8v4M12 16h.01"
      stroke="url(#emergencyGradient)"
      strokeWidth="2"
      strokeLinecap="round"
    />
    <defs>
      <linearGradient
        id="emergencyGradient"
        x1="2"
        y1="2"
        x2="22"
        y2="22"
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="#ef4444" />
        <stop offset="1" stopColor="#dc2626" />
      </linearGradient>
    </defs>
  </svg>
);

const AlertIcon = () => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
  >
    <circle cx="12" cy="12" r="10" />
    <path d="M12 8v4M12 16h.01" />
  </svg>
);

const ShieldIcon = () => (
  <svg
    width="18"
    height="18"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
  >
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
  </svg>
);

const ContactVehiclePages = () => {
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState("menu");
  const [selectedContactIndex, setSelectedContactIndex] = useState(null);

  const MenuPage = () => (
    <div className="page-content">
      {/* Vehicle Info Card */}
      <div className="vehicle-card">
        <div className="vehicle-badge">
          <span className="vehicle-label">VEHICLE</span>
          <span className="vehicle-number">DL8CX ####</span>
        </div>
        <p className="contact-heading">CONTACT VEHICLE OWNER</p>
        <p className="contact-subheading">
          Choose how you'd like to reach out to the vehicle owner.
        </p>
      </div>

      <div className="menu-options">
        <button
          className="menu-option call-option"
          onClick={() => setCurrentPage("call")}
        >
          <div className="option-icon">
            <svg
              width="28"
              height="28"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z" />
            </svg>
          </div>
          <div className="option-content">
            <h3>Private Call</h3>
            <p>Call the vehicle owner directly</p>
          </div>
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path d="M9 18l6-6-6-6" />
          </svg>
        </button>

        <button
          className="menu-option message-option"
          onClick={() => setCurrentPage("message")}
        >
          <div className="option-icon">
            <svg
              width="28"
              height="28"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z" />
            </svg>
          </div>
          <div className="option-content">
            <h3>Send Message</h3>
            <p>Send a text message.</p>
          </div>
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path d="M9 18l6-6-6-6" />
          </svg>
        </button>

        <button
          className="menu-option emergency-option"
          onClick={() => setCurrentPage("emergency")}
        >
          <div className="option-icon">
            <svg
              width="28"
              height="28"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <circle cx="12" cy="12" r="10" />
              <path d="M12 8v4M12 16h.01" />
            </svg>
          </div>
          <div className="option-content">
            <h3>Emergency Contacts</h3>
            <p>Contact owner's family/friends</p>
          </div>
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path d="M9 18l6-6-6-6" />
          </svg>
        </button>
      </div>
    </div>
  );

  const ContactFormPage = ({
    type,
    icon: Icon,
    title,
    subtitle,
    buttonText,
    buttonClass,
    onClick,
    selectedContactIndex,
    onContactSelect,
  }) => {
    const inputRef = useRef(null);

    // Mock contacts with hidden numbers
    const contacts =
      type === "emergency"
        ? [
            { id: 1, label: "Wife", phone: "+91 98765 43210", type: "Mobile", relation: "Spouse" },
            { id: 2, label: "Mother", phone: "+91 87654 32109", type: "Mobile", relation: "Parent" },
            { id: 3, label: "Brother", phone: "+91 76543 21098", type: "Mobile", relation: "Sibling" },
            { id: 4, label: "Father", phone: "+91 65432 10987", type: "Mobile", relation: "Parent" },
          ]
        : [
            { id: 1, label: "Primary Contact", phone: "+91 98765 43210", type: "Mobile" },
            { id: 2, label: "Alternate Contact", phone: "+91 87654 32109", type: "Mobile" },
          ];

    useEffect(() => {
      inputRef.current?.focus();
    }, []);

    return (
      <div className="page-content">
        <div className="icon-section">
          <div className="icon-bg">
            <Icon />
          </div>
        </div>

        <div className="form-section">
          <h2 className="section-title">{title}</h2>
          <p className="section-desc">{subtitle}</p>

          <div className="input-group">
            <label className="input-label">
              Select Contact to{" "}
              {type === "call"
                ? "Call"
                : type === "message"
                  ? "Message"
                  : "Reach"}
            </label>
            <div className="phone-options-modern">
              {contacts.map((contact, index) => (
                <div
                  key={contact.id}
                  className={`phone-card ${selectedContactIndex === index ? "selected" : ""} ${type}-theme`}
                  onClick={() => onContactSelect(index)}
                >
                  <div className="phone-card-inner">
                    <div className="phone-card-header">
                      <div className="phone-badge">
                        <svg
                          width="18"
                          height="18"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                        >
                          <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" />
                          <circle cx="12" cy="7" r="4" />
                        </svg>
                        <span className="phone-label-tag">
                          {contact.label}
                        </span>
                      </div>
                      <div className="selection-indicator">
                        <div className="checkmark">
                          <svg
                            width="14"
                            height="14"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="3"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          >
                            <polyline points="20 6 9 17 4 12" />
                          </svg>
                        </div>
                      </div>
                    </div>

                    <div className="phone-number-display">
                      <div className="masked-number">
                        <ShieldIcon />
                        <span className="masked-text">Protected Number</span>
                      </div>
                      <span className="contact-type-badge">{contact.type}</span>
                    </div>

                    {/* {contact.relation && (
                      <div className="relation-badge">
                        <svg
                          width="14"
                          height="14"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                        >
                          <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                          <circle cx="9" cy="7" r="4" />
                          <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
                          <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                        </svg>
                        <span>{contact.relation}</span>
                      </div>
                    )} */}

                    <div className="privacy-note">
                      <svg
                        width="14"
                        height="14"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                      >
                        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                      </svg>
                      <span>Number hidden for privacy</span>
                    </div>
                  </div>

                  <div className="shimmer"></div>
                </div>
              ))}
            </div>
          </div>

          <div className="info-card">
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M12 2L4 6v6c0 5.55 3.84 10.74 8 12 4.16-1.26 8-6.45 8-12V6l-8-4z" />
            </svg>
            <div className="info-text">
              <strong>Complete Privacy Protection</strong>
              <p>Neither party will see each other's actual phone numbers. All communications are routed through our secure system.</p>
            </div>
          </div>

          <div className="emergency-card">
            <div className="emergency-header">
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M12 2L2 12h3v8h14v-8h3L12 2z" />
              </svg>
              <strong>Indian Emergency Helplines</strong>
            </div>

            <div className="emergency-list">
              <div className="emergency-item">
                <span>National Emergency</span>
                <span className="number">112</span>
              </div>
              <div className="emergency-item">
                <span>Ambulance</span>
                <span className="number">102</span>
              </div>
              <div className="emergency-item">
                <span>Police</span>
                <span className="number">100</span>
              </div>
              <div className="emergency-item">
                <span>Women Helpline</span>
                <span className="number">1091</span>
              </div>
            </div>
          </div>
        </div>

        <footer className="form-footer">
          {type === "emergency" ? (
            <div className="emergency-buttons-row">
              <button
                className={`primary-btn emergency-btn-primary ${selectedContactIndex !== null ? "active" : ""}`}
                disabled={selectedContactIndex === null}
                onClick={() =>
                  selectedContactIndex !== null &&
                  (window.location.href = `tel:${contacts[selectedContactIndex].phone.replace(/\s/g, "")}`)
                }
              >
                <span>Make Call</span>
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                >
                  <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z" />
                </svg>
              </button>
              <button
                className={`primary-btn message-btn-primary ${selectedContactIndex !== null ? "active" : ""}`}
                disabled={selectedContactIndex === null}
                onClick={() =>
                  selectedContactIndex !== null &&
                  window.open(
                    `https://wa.me/${contacts[selectedContactIndex].phone.replace(/\s/g, "").replace("+", "")}`,
                    "_blank",
                  )
                }
              >
                <span>Send Message</span>
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                >
                  <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z" />
                </svg>
              </button>
            </div>
          ) : (
            <button
              className={`primary-btn ${buttonClass} ${selectedContactIndex !== null ? "active" : ""}`}
              disabled={selectedContactIndex === null}
              onClick={() => selectedContactIndex !== null && onClick(contacts[selectedContactIndex].phone)}
            >
              <span>{buttonText}</span>
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
          )}
        </footer>
      </div>
    );
  };

  return (
    <div className="mobile-app">
      <div className="status-bar-spacer"></div>

      {currentPage === "menu" ? (
        <Header />
      ) : (
        <header className="app-header">
          {currentPage !== "menu" && (
            <button
              className="back-btn"
              onClick={() => {
                setCurrentPage("menu");
                setSelectedContactIndex(null);
              }}
            >
              <BackIcon size={28} />
            </button>
          )}
          <h1 className="app-title">
            {currentPage === "menu"
              ? "SAMPARK"
              : currentPage === "call"
                ? "Private Call"
                : currentPage === "message"
                  ? "Send Message"
                  : "Emergency"}
          </h1>
          <div className="header-spacer"></div>
        </header>
      )}

      <main
        className={`app-content ${currentPage !== "menu" ? "with-footer" : ""}`}
      >
        {currentPage === "menu" && <MenuPage />}
        {currentPage === "call" && (
          <ContactFormPage
            type="call"
            icon={PhoneIcon}
            title="Make Private Call"
            subtitle="Call the vehicle owner anonymously. Your number will remain private."
            buttonText="Initiate Secure Call"
            buttonClass="call-btn-primary"
            selectedContactIndex={selectedContactIndex}
            onContactSelect={setSelectedContactIndex}
            onClick={(phone) =>
              (window.location.href = `tel:${phone.replace(/\s/g, "")}`)
            }
          />
        )}
        {currentPage === "message" && (
          <ContactFormPage
            type="message"
            icon={MessageIcon}
            title="Send WhatsApp Message"
            subtitle="Send a message to the vehicle owner via WhatsApp"
            buttonText="Send Secure Message"
            buttonClass="message-btn-primary"
            selectedContactIndex={selectedContactIndex}
            onContactSelect={setSelectedContactIndex}
            onClick={(phone) =>
              window.open(
                `https://wa.me/${phone.replace(/\s/g, "").replace("+", "")}`,
                "_blank",
              )
            }
          />
        )}
        {currentPage === "emergency" && (
          <ContactFormPage
            type="emergency"
            icon={EmergencyIcon}
            title="Emergency Contacts"
            subtitle="In case of emergency situation with the vehicle owner. Contact their trusted family members or friends."
            buttonText="View Emergency Contacts"
            buttonClass="emergency-btn-primary"
            selectedContactIndex={selectedContactIndex}
            onContactSelect={setSelectedContactIndex}
            onClick={(phone) => navigate("/visitor/emergency-contacts")}
          />
        )}
        {/* Warning Note */}
        <div className="warning-note">
          <AlertIcon />
          <p>
            Please note: any kind of spam will get your IP and Number blocked on
            platform for upto 6 Months.
          </p>
        </div>
        {/* Footer Links */}
        <div className="footer-links">
          <span>
            🆘 Urgent, <a href="#">Sampark us</a>
          </span>
          <span>
            {" "}
            or Report, <a href="#">Wrong Info</a>
          </span>
          <span>
            {" "}
            - <a href="#">Share</a>
          </span>
        </div>
      </main>

      <footer className="footer">
        <p>© 2025 <span className="hilabi-font">Hilabi</span>. All rights reserved.</p>
      </footer>
      <style>{`
        .emergency-card {
          border: 1px solid #ef4444;
          background: #fff;
          border-radius: 12px;
          padding: 14px;
          margin-top: 12px;
        }

        .emergency-header {
          display: flex;
          align-items: center;
          gap: 8px;
          color: #b91c1c;
          font-size: 14px;
          margin-bottom: 10px;
        }

        .emergency-list {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }

        .emergency-item {
          display: flex;
          justify-content: space-between;
          font-size: 14px;
          color: #111827;
        }

        .emergency-item .number {
          font-weight: 600;
          color: #b91c1c;
        }

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
          overflow-y: auto;
          -webkit-overflow-scrolling: touch;
        }

        .app-content.with-footer {
          padding-bottom: 160px;
        }

        .page-content {
          padding: 20px 20px 15px;
        }

        /* Vehicle Card */
        .vehicle-card {
          background: #ffffff;
          border-radius: 16px;
          padding: 20px;
          margin-bottom: 20px;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
        }

        .vehicle-badge {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          background: #f8fafc;
          border: 2px solid #e2e8f0;
          border-radius: 12px;
          padding: 8px 16px;
          margin-bottom: 16px;
        }

        .vehicle-label {
          font-size: 0.75rem;
          font-weight: 700;
          color: #64748b;
          letter-spacing: 0.5px;
        }

        .vehicle-number {
          font-size: 1.125rem;
          font-weight: 700;
          color: #0f172a;
          letter-spacing: 1px;
        }

        .contact-heading {
          font-size: 0.875rem;
          font-weight: 700;
          color: #0f172a;
          text-transform: uppercase;
          letter-spacing: 0.5px;
          margin: 0 0 8px 0;
        }

        .contact-subheading {
          font-size: 0.85rem;
          color: #64748b;
          margin: 0;
          line-height: 1.5;
        }

        /* Warning Note */
        .warning-note {
          display: flex;
          gap: 10px;
          padding: 14px;
          background: rgba(249, 115, 22, 0.05);
          border: 1px solid rgba(249, 115, 22, 0.2);
          border-radius: 12px;
          margin: 10px 20px 40px;
        }

        .warning-note svg {
          color: #f97316;
          flex-shrink: 0;
          margin-top: 2px;
        }

        .warning-note p {
          font-size: 0.8125rem;
          color: #64748b;
          margin: 0;
          line-height: 1.5;
        }

        /* Footer Links */
        .footer-links {
          text-align: center;
          font-size: 0.8125rem;
          color: #64748b;
          line-height: 1.6;
        }

        .footer-links a {
          color: #2563eb;
          text-decoration: none;
          font-weight: 600;
        }

        .footer-links a:active {
          color: #1d4ed8;
        }

        /* Menu Page */
        .menu-options {
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        .menu-option {
          display: flex;
          align-items: center;
          gap: 16px;
          background: #ffffff;
          border: 2px solid #e2e8f0;
          border-radius: 16px;
          padding: 10px 18px;
          cursor: pointer;
          transition: all 0.2s;
          text-align: left;
        }

        .menu-option:active {
          transform: scale(0.98);
        }

        .call-option {
          border-color: #3b82f6;
          background: linear-gradient(135deg, rgba(59, 130, 246, 0.05), rgba(37, 99, 235, 0.02));
        }

        .call-option .option-icon {
          background: linear-gradient(135deg, #3b82f6, #2563eb);
        }

        .call-option .option-icon svg {
          color: #ffffff;
        }

        .message-option {
          border-color: #10b981;
          background: linear-gradient(135deg, rgba(16, 185, 129, 0.05), rgba(5, 150, 105, 0.02));
        }

        .message-option .option-icon {
          background: linear-gradient(135deg, #10b981, #059669);
        }

        .message-option .option-icon svg {
          color: #ffffff;
        }

        .emergency-option {
          border-color: #ef4444;
          background: linear-gradient(135deg, rgba(239, 68, 68, 0.05), rgba(220, 38, 38, 0.02));
        }

        .emergency-option .option-icon {
          background: linear-gradient(135deg, #ef4444, #dc2626);
        }

        .emergency-option .option-icon svg {
          color: #ffffff;
        }

        .option-icon {
          width: 46px;
          height: 46px;
          border-radius: 14px;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
        }

        .option-content {
          flex: 1;
        }

        .option-content h3 {
          font-size: 1rem;
          font-weight: 600;
          color: #0f172a;
          margin: 0 0 4px 0;
        }

        .option-content p {
          font-size: 0.8125rem;
          color: #64748b;
          margin: 0;
        }

        /* Contact Form Pages */
        .icon-section {
          display: flex;
          justify-content: center;
          margin-bottom: 32px;
          padding-top: 8px;
        }

        .icon-bg {
          width: 100px;
          height: 100px;
          background: linear-gradient(135deg, rgba(59, 130, 246, 0.1), rgba(37, 99, 235, 0.05));
          border-radius: 24px;
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

        .input-group {
          margin-bottom: 20px;
        }

        .input-label {
          display: block;
          font-size: 0.875rem;
          font-weight: 600;
          color: #334155;
          margin-bottom: 14px;
        }

        /* Modern Phone Selection Cards */
        .phone-options-modern {
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        .phone-card {
          position: relative;
          background: #ffffff;
          border: 2px solid #e2e8f0;
          border-radius: 20px;
          overflow: hidden;
          cursor: pointer;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04);
        }

        .phone-card:active {
          transform: scale(0.98);
        }

        .phone-card-inner {
          padding: 18px;
          position: relative;
          z-index: 2;
        }

        /* Shimmer effect */
        .shimmer {
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(
            90deg,
            transparent,
            rgba(255, 255, 255, 0.4),
            transparent
          );
          transition: left 0.5s;
          pointer-events: none;
        }

        .phone-card:hover .shimmer {
          left: 100%;
        }

        /* Selected state */
        .phone-card.selected {
          border-color: #3b82f6;
          box-shadow: 0 8px 24px rgba(59, 130, 246, 0.2);
        }

        .phone-card.selected.call-theme {
          background: linear-gradient(135deg, rgba(59, 130, 246, 0.08), rgba(37, 99, 235, 0.03));
          border-color: #3b82f6;
        }

        .phone-card.selected.message-theme {
          background: linear-gradient(135deg, rgba(16, 185, 129, 0.08), rgba(5, 150, 105, 0.03));
          border-color: #10b981;
        }

        .phone-card.selected.emergency-theme {
          background: linear-gradient(135deg, rgba(239, 68, 68, 0.08), rgba(220, 38, 38, 0.03));
          border-color: #ef4444;
        }

        /* Card Header */
        .phone-card-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          margin-bottom: 14px;
        }

        .phone-badge {
          display: flex;
          align-items: center;
          gap: 6px;
          background: #f8fafc;
          border: 1px solid #e2e8f0;
          border-radius: 10px;
          padding: 6px 12px;
        }

        .phone-badge svg {
          color: #64748b;
        }

        .phone-card.selected.call-theme .phone-badge {
          background: rgba(59, 130, 246, 0.1);
          border-color: rgba(59, 130, 246, 0.3);
        }

        .phone-card.selected.call-theme .phone-badge svg {
          color: #3b82f6;
        }

        .phone-card.selected.message-theme .phone-badge {
          background: rgba(16, 185, 129, 0.1);
          border-color: rgba(16, 185, 129, 0.3);
        }

        .phone-card.selected.message-theme .phone-badge svg {
          color: #10b981;
        }

        .phone-card.selected.emergency-theme .phone-badge {
          background: rgba(239, 68, 68, 0.1);
          border-color: rgba(239, 68, 68, 0.3);
        }

        .phone-card.selected.emergency-theme .phone-badge svg {
          color: #ef4444;
        }

        .phone-label-tag {
          font-size: 0.75rem;
          font-weight: 600;
          color: #64748b;
        }

        .phone-card.selected .phone-label-tag {
          color: #0f172a;
        }

        /* Selection Indicator */
        .selection-indicator {
          width: 24px;
          height: 24px;
          border-radius: 12px;
          border: 2px solid #e2e8f0;
          background: #ffffff;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.3s;
        }

        .checkmark {
          opacity: 0;
          transform: scale(0);
          transition: all 0.3s cubic-bezier(0.68, -0.55, 0.265, 1.55);
        }

        .checkmark svg {
          color: #ffffff;
        }

        .phone-card.selected .selection-indicator {
          border-color: transparent;
        }

        .phone-card.selected.call-theme .selection-indicator {
          background: linear-gradient(135deg, #3b82f6, #2563eb);
        }

        .phone-card.selected.message-theme .selection-indicator {
          background: linear-gradient(135deg, #10b981, #059669);
        }

        .phone-card.selected.emergency-theme .selection-indicator {
          background: linear-gradient(135deg, #ef4444, #dc2626);
        }

        .phone-card.selected .checkmark {
          opacity: 1;
          transform: scale(1);
        }

        /* Phone Number Display - UPDATED FOR MASKED NUMBERS */
        .phone-number-display {
          margin-bottom: 12px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 10px;
        }

        .masked-number {
          display: flex;
          align-items: center;
          gap: 8px;
          flex: 1;
        }

        .masked-number svg {
          color: #64748b;
          flex-shrink: 0;
        }

        .phone-card.selected.call-theme .masked-number svg {
          color: #3b82f6;
        }

        .phone-card.selected.message-theme .masked-number svg {
          color: #10b981;
        }

        .phone-card.selected.emergency-theme .masked-number svg {
          color: #ef4444;
        }

        .masked-text {
          font-size: 1rem;
          font-weight: 600;
          color: #64748b;
        }

        .phone-card.selected .masked-text {
          color: #0f172a;
        }

        .contact-type-badge {
          display: inline-block;
          padding: 4px 10px;
          background: #f1f5f9;
          border-radius: 8px;
          font-size: 0.75rem;
          font-weight: 600;
          color: #64748b;
        }

        .phone-card.selected.call-theme .contact-type-badge {
          background: rgba(59, 130, 246, 0.15);
          color: #2563eb;
        }

        .phone-card.selected.message-theme .contact-type-badge {
          background: rgba(16, 185, 129, 0.15);
          color: #059669;
        }

        .phone-card.selected.emergency-theme .contact-type-badge {
          background: rgba(239, 68, 68, 0.15);
          color: #dc2626;
        }

        /* Privacy Note */
        .privacy-note {
          display: flex;
          align-items: center;
          gap: 6px;
          padding-top: 12px;
          border-top: 1px solid #f1f5f9;
          font-size: 0.75rem;
          color: #94a3b8;
        }

        .privacy-note svg {
          color: #cbd5e1;
          flex-shrink: 0;
        }

        .phone-card.selected .privacy-note {
          color: #64748b;
        }

        .phone-card.selected.call-theme .privacy-note svg {
          color: #93c5fd;
        }

        .phone-card.selected.message-theme .privacy-note svg {
          color: #6ee7b7;
        }

        .phone-card.selected.emergency-theme .privacy-note svg {
          color: #fca5a5;
        }

        /* Relation Badge */
        .relation-badge {
          display: flex;
          align-items: center;
          gap: 6px;
          padding: 8px 12px;
          background: #f8fafc;
          border: 1px solid #e2e8f0;
          border-radius: 10px;
          font-size: 0.8125rem;
          font-weight: 500;
          color: #64748b;
          margin-bottom: 12px;
          width: fit-content;
        }

        .relation-badge svg {
          color: #94a3b8;
          flex-shrink: 0;
        }

        .phone-card.selected.emergency-theme .relation-badge {
          background: rgba(239, 68, 68, 0.08);
          border-color: rgba(239, 68, 68, 0.2);
          color: #dc2626;
        }

        .phone-card.selected.emergency-theme .relation-badge svg {
          color: #ef4444;
        }

        .info-card {
          display: flex;
          gap: 12px;
          padding: 16px;
          background: linear-gradient(135deg, rgba(59, 130, 246, 0.05), rgba(37, 99, 235, 0.02));
          border-radius: 16px;
          border: 1px solid rgba(59, 130, 246, 0.1);
          margin-top: 20px;
        }

        .info-card svg {
          color: #2563eb;
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

        .form-footer {
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

        .emergency-buttons-row {
          display: flex;
          gap: 10px;
        }

        .emergency-buttons-row .primary-btn {
          flex: 1;
          padding: 12px 12px;
          font-size: 0.9375rem;
          margin-bottom: 0;
        }

        .primary-btn {
          width: 100%;
          padding: 12px 24px;
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
          transition: all 0.3s;
        }

        .primary-btn.active {
          cursor: pointer;
        }

        .call-btn-primary.active {
          background: linear-gradient(135deg, #3b82f6 0%, #2563eb 100%);
          color: #ffffff;
          box-shadow: 0 8px 20px rgba(37, 99, 235, 0.3);
        }

        .message-btn-primary.active {
          background: linear-gradient(135deg, #10b981 0%, #059669 100%);
          color: #ffffff;
          box-shadow: 0 8px 20px rgba(16, 185, 129, 0.3);
        }

        .emergency-btn-primary.active {
          background: linear-gradient(135deg, #ef4444 0%, #dc2626 100%);
          color: #ffffff;
          box-shadow: 0 8px 20px rgba(239, 68, 68, 0.3);
        }

        .primary-btn.active:active {
          transform: scale(0.98);
        }

        @media (max-width: 639px) {
          .section-title {
            font-size: 1.25rem;
          }
          .section-desc {
            font-size: 0.875rem;
          }
          .input-label {
            font-size: 0.8125rem;
          }
        }

        @media (min-width: 640px) {
          .mobile-app {
            max-width: 428px;
            margin: 0 auto;
            box-shadow: 0 0 40px rgba(0, 0, 0, 0.1);
          }
        }
      `}</style>
    </div>
  );
};

export default ContactVehiclePages;