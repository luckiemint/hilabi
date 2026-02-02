import { useState } from "react";
import Header from "../../components/header/Header";

const MenuIcon = () => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
  >
    <path d="M3 12h18M3 6h18M3 18h18" />
  </svg>
);

const EditIcon = () => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
  >
    <path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7" />
    <path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z" />
  </svg>
);

const CarIcon = () => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
  >
    <path d="M5 13L3 13.5V18.5L5 19M19 13L21 13.5V18.5L19 19" />
    <path d="M6 13H18C19.1046 13 20 13.8954 20 15V17C20 18.1046 19.1046 19 18 19H6C4.89543 19 4 18.1046 4 17V15C4 13.8954 4.89543 13 6 13Z" />
    <path d="M6 13L7.5 9C7.77614 8.44772 8.34543 8 9 8H15C15.6546 8 16.2239 8.44772 16.5 9L18 13" />
  </svg>
);

const UserIcon = () => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
  >
    <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" />
    <circle cx="12" cy="7" r="4" />
  </svg>
);

const PhoneIcon = () => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
  >
    <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z" />
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

const CheckIcon = () => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.5"
  >
    <path d="M20 6L9 17l-5-5" />
  </svg>
);

const OwnerDashboard = () => {
  const [currentView, setCurrentView] = useState("dashboard"); // dashboard, editProfile, editPhone, editEmergency
  const [userData, setUserData] = useState({
    name: "Rajesh Kumar",
    phone: "+91 98765 43210",
    vehicle: "MH12AB1234",
    emergencyContacts: [
      {
        id: 1,
        name: "Wife",
        relation: "Spouse",
        phone: "+91 98765 43210",
        avatar: "👩",
      },
      {
        id: 2,
        name: "Son",
        relation: "Family",
        phone: "+91 98765 43211",
        avatar: "👦",
      },
      {
        id: 3,
        name: "Father",
        relation: "Family",
        phone: "+91 98765 43212",
        avatar: "👨",
      },
      {
        id: 4,
        name: "Friend",
        relation: "Emergency Contact",
        phone: "+91 98765 43213",
        avatar: "👤",
      },
    ],
  });

  const [editingName, setEditingName] = useState("");
  const [editingPhone, setEditingPhone] = useState("");
  const [editingContact, setEditingContact] = useState<{
    id: number;
    name: string;
    relation: string;
    phone: string;
    avatar: string;
  } | null>(null);

  const handleSaveName = () => {
    if (editingName.trim()) {
      setUserData({ ...userData, name: editingName });
      setCurrentView("dashboard");
      setEditingName("");
    }
  };

  const handleSavePhone = () => {
    if (editingPhone.length === 10) {
      setUserData({ ...userData, phone: `+91 ${editingPhone}` });
      setCurrentView("dashboard");
      setEditingPhone("");
    }
  };

  const handleSaveEmergencyContact = () => {
    if (editingContact && editingContact.name && editingContact.phone) {
      const updatedContacts = userData.emergencyContacts.map((contact) =>
        contact.id === editingContact.id ? editingContact : contact
      );
      setUserData({ ...userData, emergencyContacts: updatedContacts });
      setCurrentView("dashboard");
      setEditingContact(null);
    }
  };

  const DashboardView = () => (
    <>
      {/* Welcome Section */}
      <div className="welcome-section">
        <div className="welcome-avatar">
          <span className="avatar-text">{userData.name.charAt(0)}</span>
        </div>
        <div className="welcome-content">
          <h2 className="welcome-title">Welcome back!</h2>
          <p className="welcome-name">{userData.name}</p>
        </div>
      </div>

      {/* Vehicle Card */}
      <div className="section-card vehicle-card">
        <div className="card-header">
          <div className="header-left">
            <div className="icon-wrapper vehicle-icon">
              <CarIcon />
            </div>
            <div>
              <h3 className="card-title">Vehicle Information</h3>
              <p className="card-subtitle">Registration details</p>
            </div>
          </div>
        </div>
        <div className="vehicle-number-display">
          <span className="vehicle-label">VEHICLE NUMBER</span>
          <span className="vehicle-number">{userData.vehicle}</span>
        </div>
      </div>

      {/* Personal Details Card */}
      <div className="section-card">
        <div className="card-header">
          <h3 className="section-title">Personal Details</h3>
        </div>

        <div className="detail-item">
          <div className="detail-left">
            <div className="icon-wrapper">
              <UserIcon />
            </div>
            <div>
              <p className="detail-label">Full Name</p>
              <p className="detail-value">{userData.name}</p>
            </div>
          </div>
          <button
            className="edit-btn"
            onClick={() => {
              setEditingName(userData.name);
              setCurrentView("editProfile");
            }}
          >
            <EditIcon />
          </button>
        </div>

        <div className="detail-divider"></div>

        <div className="detail-item">
          <div className="detail-left">
            <div className="icon-wrapper">
              <PhoneIcon />
            </div>
            <div>
              <p className="detail-label">Phone Number</p>
              <p className="detail-value">{userData.phone}</p>
            </div>
          </div>
          <button
            className="edit-btn"
            onClick={() => {
              setEditingPhone(userData.phone.replace("+91 ", ""));
              setCurrentView("editPhone");
            }}
          >
            <EditIcon />
          </button>
        </div>
      </div>

      {/* Emergency Contacts Card */}
      <div className="section-card">
        <div className="card-header">
          <h3 className="section-title">Emergency Contacts</h3>
        </div>

        {userData.emergencyContacts.map((contact, index) => (
          <div key={contact.id}>
            {index > 0 && <div className="detail-divider"></div>}
            <div className="detail-item emergency-item">
              <div className="detail-left">
                <div className="emergency-avatar">{contact.avatar}</div>
                <div>
                  <p className="detail-label">{contact.name}</p>
                  <p className="detail-value">{contact.phone}</p>
                </div>
              </div>
              <button
                className="edit-btn"
                onClick={() => {
                  setEditingContact({ ...contact });
                  setCurrentView("editEmergency");
                }}
              >
                <EditIcon />
              </button>
            </div>
          </div>
        ))}
      </div>
    </>
  );

  const EditProfileView = () => (
    <div className="edit-container">
      <div className="edit-header">
        <h2 className="edit-title">Edit Your Name</h2>
        <p className="edit-subtitle">Update your full name as per records</p>
      </div>

      <div className="input-group">
        <label className="input-label">Full Name</label>
        <input
          type="text"
          className="form-input"
          placeholder="Enter your full name"
          value={editingName}
          onChange={(e) => setEditingName(e.target.value)}
          autoFocus
        />
      </div>

      <div className="edit-footer">
        <button
          className="primary-btn save-btn"
          disabled={!editingName.trim()}
          onClick={handleSaveName}
        >
          <CheckIcon />
          <span>Save Changes</span>
        </button>
        <button
          className="secondary-btn"
          onClick={() => {
            setCurrentView("dashboard");
            setEditingName("");
          }}
        >
          Cancel
        </button>
      </div>
    </div>
  );

  const EditPhoneView = () => (
    <div className="edit-container">
      <div className="edit-header">
        <h2 className="edit-title">Edit Phone Number</h2>
        <p className="edit-subtitle">Update your contact number</p>
      </div>

      <div className="input-group">
        <label className="input-label">Mobile Number</label>
        <div className="phone-input-wrapper">
          <span className="country-code">+91</span>
          <input
            type="tel"
            inputMode="numeric"
            className="form-input phone-input"
            placeholder="98765 43210"
            value={editingPhone}
            onChange={(e) => {
              const value = e.target.value.replace(/\D/g, "");
              if (value.length <= 10) setEditingPhone(value);
            }}
            autoFocus
          />
        </div>
      </div>

      <div className="edit-footer">
        <button
          className="primary-btn save-btn"
          disabled={editingPhone.length !== 10}
          onClick={handleSavePhone}
        >
          <CheckIcon />
          <span>Save Changes</span>
        </button>
        <button
          className="secondary-btn"
          onClick={() => {
            setCurrentView("dashboard");
            setEditingPhone("");
          }}
        >
          Cancel
        </button>
      </div>
    </div>
  );

  const EditEmergencyView = () => (
    <div className="edit-container">
      <div className="edit-header">
        <h2 className="edit-title">Edit Emergency Contact</h2>
        <p className="edit-subtitle">Update contact information</p>
      </div>

      <div className="input-group">
        <label className="input-label">Contact Name</label>
        <input
          type="text"
          className="form-input"
          placeholder="Enter name"
          value={editingContact?.name || ""}
          onChange={(e) =>
            setEditingContact((prev) =>
              prev ? { ...prev, name: e.target.value } : null
            )
          }
          autoFocus
        />
      </div>

      <div className="input-group">
        <label className="input-label">Phone Number</label>
        <input
          type="tel"
          inputMode="numeric"
          className="form-input"
          placeholder="+91 98765 43210"
          value={editingContact?.phone || ""}
          onChange={(e) =>
            setEditingContact((prev) =>
              prev ? { ...prev, phone: e.target.value } : null
            )
          }
        />
      </div>

      <div className="edit-footer">
        <button
          className="primary-btn save-btn"
          disabled={!editingContact?.name || !editingContact?.phone}
          onClick={handleSaveEmergencyContact}
        >
          <CheckIcon />
          <span>Save Changes</span>
        </button>
        <button
          className="secondary-btn"
          onClick={() => {
            setCurrentView("dashboard");
            setEditingContact(null);
          }}
        >
          Cancel
        </button>
      </div>
    </div>
  );

  return (
    <div className="mobile-app">
      {/* Status Bar Spacer */}
      <div className="status-bar-spacer"></div>

      {/* Header */}
      <Header />
      {/* <header className="app-header">
        <div className="logo-section">
          <CarIcon />
          <h1 className="app-title">SAMPARK</h1>
        </div>
        <button className="menu-btn">
          <MenuIcon />
        </button>
      </header> */}

      {/* Main Content */}
      <main className="app-content">
        {currentView === "dashboard" && <DashboardView />}
        {currentView === "editProfile" && <EditProfileView />}
        {currentView === "editPhone" && <EditPhoneView />}
        {currentView === "editEmergency" && <EditEmergencyView />}
      </main>

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
          box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
          position: sticky;
          top: 0;
          z-index: 100;
        }

        .logo-section {
          display: flex;
          align-items: center;
          gap: 10px;
        }

        .logo-section svg {
          color: #2563eb;
        }

        .app-title {
          font-size: 1.375rem;
          font-weight: 700;
          color: #0f172a;
          margin: 0;
          letter-spacing: 1px;
        }

        .menu-btn {
          background: none;
          border: none;
          padding: 8px;
          cursor: pointer;
          display: flex;
          align-items: center;
          border-radius: 8px;
          transition: background 0.2s;
        }

        .menu-btn:active {
          background: #f1f5f9;
        }

        /* Main Content */
        .app-content {
          flex: 1;
          padding: 20px;
          overflow-y: auto;
          -webkit-overflow-scrolling: touch;
        }

        /* Welcome Section */
        .welcome-section {
          display: flex;
          align-items: center;
          gap: 16px;
          padding: 24px;
          background: linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%);
          border-radius: 20px;
          margin-bottom: 20px;
          box-shadow: 0 8px 20px rgba(37, 99, 235, 0.3);
          animation: slideDown 0.4s ease;
        }

        @keyframes slideDown {
          from {
            opacity: 0;
            transform: translateY(-20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .welcome-avatar {
          width: 60px;
          height: 60px;
          border-radius: 16px;
          background: rgba(255, 255, 255, 0.2);
          backdrop-filter: blur(10px);
          display: flex;
          align-items: center;
          justify-content: center;
          border: 2px solid rgba(255, 255, 255, 0.3);
        }

        .avatar-text {
          font-size: 1.75rem;
          font-weight: 700;
          color: #ffffff;
        }

        .welcome-content {
          flex: 1;
        }

        .welcome-title {
          font-size: 0.875rem;
          color: rgba(255, 255, 255, 0.9);
          margin: 0 0 4px 0;
          font-weight: 500;
        }

        .welcome-name {
          font-size: 1.25rem;
          font-weight: 700;
          color: #ffffff;
          margin: 0;
        }

        /* Section Card */
        .section-card {
          background: #ffffff;
          border-radius: 18px;
          padding: 20px;
          margin-bottom: 16px;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
          border: 1px solid #f1f5f9;
          animation: fadeIn 0.5s ease;
        }

        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        .card-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 16px;
        }

        .header-left {
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .icon-wrapper {
          width: 44px;
          height: 44px;
          border-radius: 12px;
          background: linear-gradient(135deg, rgba(37, 99, 235, 0.1), rgba(29, 78, 216, 0.05));
          display: flex;
          align-items: center;
          justify-content: center;
          color: #2563eb;
        }

        .vehicle-icon {
          background: linear-gradient(135deg, rgba(16, 185, 129, 0.1), rgba(5, 150, 105, 0.05));
          color: #10b981;
        }

        .card-title {
          font-size: 1rem;
          font-weight: 600;
          color: #0f172a;
          margin: 0 0 2px 0;
        }

        .card-subtitle {
          font-size: 0.8125rem;
          color: #64748b;
          margin: 0;
        }

        .section-title {
          font-size: 1rem;
          font-weight: 700;
          color: #0f172a;
          margin: 0;
        }

        /* Vehicle Display */
        .vehicle-number-display {
          display: flex;
          flex-direction: column;
          gap: 8px;
          padding: 16px;
          background: linear-gradient(135deg, rgba(16, 185, 129, 0.08), rgba(5, 150, 105, 0.03));
          border-radius: 12px;
          border: 2px solid rgba(16, 185, 129, 0.2);
        }

        .vehicle-label {
          font-size: 0.75rem;
          font-weight: 700;
          color: #64748b;
          letter-spacing: 0.5px;
        }

        .vehicle-number {
          font-size: 1.5rem;
          font-weight: 700;
          color: #0f172a;
          letter-spacing: 2px;
        }

        /* Detail Item */
        .detail-item {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 12px 0;
        }

        .detail-left {
          display: flex;
          align-items: center;
          gap: 12px;
          flex: 1;
        }

        .detail-label {
          font-size: 0.8125rem;
          color: #64748b;
          margin: 0 0 4px 0;
          font-weight: 500;
        }

        .detail-value {
          font-size: 0.9375rem;
          color: #0f172a;
          margin: 0;
          font-weight: 600;
        }

        .detail-divider {
          height: 1px;
          background: #f1f5f9;
          margin: 4px 0;
        }

        .emergency-avatar {
          width: 44px;
          height: 44px;
          border-radius: 12px;
          background: rgba(37, 99, 235, 0.1);
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1.5rem;
        }

        .edit-btn {
          width: 36px;
          height: 36px;
          border-radius: 10px;
          border: none;
          background: #f1f5f9;
          color: #64748b;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: all 0.2s;
          flex-shrink: 0;
        }

        .edit-btn:active {
          background: #e2e8f0;
          transform: scale(0.95);
        }

        /* Edit Container */
        .edit-container {
          padding: 0 0 120px 0;
        }

        .edit-header {
          margin-bottom: 32px;
        }

        .edit-title {
          font-size: 1.5rem;
          font-weight: 700;
          color: #0f172a;
          margin: 0 0 8px 0;
        }

        .edit-subtitle {
          font-size: 0.9375rem;
          color: #64748b;
          margin: 0;
        }

        /* Form Elements */
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

        .form-input {
          width: 100%;
          padding: 16px;
          font-size: 1rem;
          border: 2px solid #e2e8f0;
          border-radius: 14px;
          background: #ffffff;
          color: #0f172a;
          outline: none;
          transition: all 0.3s;
          font-weight: 500;
        }

        .form-input:focus {
          border-color: #2563eb;
          box-shadow: 0 0 0 4px rgba(37, 99, 235, 0.1);
        }

        .phone-input-wrapper {
          display: flex;
          align-items: center;
          gap: 10px;
          border: 2px solid #e2e8f0;
          border-radius: 14px;
          padding: 16px;
          background: #ffffff;
          transition: all 0.3s;
        }

        .phone-input-wrapper:focus-within {
          border-color: #2563eb;
          box-shadow: 0 0 0 4px rgba(37, 99, 235, 0.1);
        }

        .country-code {
          font-size: 1rem;
          font-weight: 600;
          color: #0f172a;
        }

        .phone-input {
          border: none;
          padding: 0;
          box-shadow: none;
        }

        .phone-input:focus {
          box-shadow: none;
        }

        /* Edit Footer */
        .edit-footer {
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
          background: linear-gradient(135deg, #10b981 0%, #059669 100%);
          color: #ffffff;
          border: none;
          border-radius: 14px;
          font-size: 1.0625rem;
          font-weight: 600;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          transition: all 0.3s;
          margin-bottom: 10px;
          box-shadow: 0 8px 20px rgba(16, 185, 129, 0.3);
        }

        .primary-btn:disabled {
          background: #cbd5e1;
          color: #94a3b8;
          cursor: not-allowed;
          box-shadow: none;
        }

        .primary-btn:active:not(:disabled) {
          transform: scale(0.98);
        }

        .secondary-btn {
          width: 100%;
          padding: 14px;
          background: none;
          border: none;
          color: #64748b;
          font-size: 0.9375rem;
          font-weight: 500;
          cursor: pointer;
          border-radius: 12px;
          transition: all 0.2s;
        }

        .secondary-btn:active {
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
      `}</style>
    </div>
  );
};

export default OwnerDashboard;
