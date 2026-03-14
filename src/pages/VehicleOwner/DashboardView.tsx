import { useState } from "react";
import Header from "../../components/header/Header";

const EditIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7" />
    <path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z" />
  </svg>
);

const CarIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M5 13L3 13.5V18.5L5 19M19 13L21 13.5V18.5L19 19" />
    <path d="M6 13H18C19.1046 13 20 13.8954 20 15V17C20 18.1046 19.1046 19 18 19H6C4.89543 19 4 18.1046 4 17V15C4 13.8954 4.89543 13 6 13Z" />
    <path d="M6 13L7.5 9C7.77614 8.44772 8.34543 8 9 8H15C15.6546 8 16.2239 8.44772 16.5 9L18 13" />
  </svg>
);

const UserIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" />
    <circle cx="12" cy="7" r="4" />
  </svg>
);

const PhoneIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z" />
  </svg>
);

const PersonIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="8" r="4" />
    <path d="M4 20c0-4 3.6-7 8-7s8 3 8 7" />
  </svg>
);

const CheckIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20 6L9 17l-5-5" />
  </svg>
);

const OwnerDashboard = () => {
  const [currentView, setCurrentView] = useState("dashboard"); // dashboard, editProfile, editPhone, editEmergency
  const [userData, setUserData] = useState({
    name: "Rajesh Kumar",
    phone: "+91 98765 43210",
    vehicle: "MH12AB1234",
    status: "active" as "active" | "inactive",
    emergencyContacts: [
      { id: 1, name: "Wife", relation: "Spouse", phone: "+91 98765 43210" },
      { id: 2, name: "Son", relation: "Family", phone: "+91 98765 43211" },
      { id: 3, name: "Father", relation: "Family", phone: "+91 98765 43212" },
      { id: 4, name: "Friend", relation: "Emergency Contact", phone: "+91 98765 43213" },
    ],
  });

  const [editingName, setEditingName] = useState("");
  const [editingPhone, setEditingPhone] = useState("");
  const [editingContact, setEditingContact] = useState<{
    id: number;
    name: string;
    relation: string;
    phone: string;
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
      const updatedContacts = userData.emergencyContacts.map((c) =>
        c.id === editingContact.id ? editingContact : c
      );
      setUserData({ ...userData, emergencyContacts: updatedContacts });
      setCurrentView("dashboard");
      setEditingContact(null);
    }
  };

  const DashboardView = () => (
    <>
      {/* Profile Banner */}
      <div className="profile-banner">
        <div className="profile-avatar">
          <UserIcon />
        </div>
        <div className="profile-info">
          <p className="profile-name">{userData.name}</p>
          <p className="profile-phone">{userData.phone}</p>
        </div>
        <div className={`profile-badge ${userData.status === "active" ? "profile-badge-active" : "profile-badge-inactive"}`}>
          {userData.status === "active" ? "Active" : "Inactive"}
        </div>
      </div>

      {/* Vehicle Card */}
      <div className="section-card">
        <div className="section-head">
          <div className="section-icon">
            <CarIcon />
          </div>
          <div>
            <h3 className="card-title">Vehicle</h3>
            <p className="card-subtitle">Registration number</p>
          </div>
        </div>
        <div className="vehicle-plate">
          <span className="vehicle-plate-label">VEHICLE NUMBER</span>
          <span className="vehicle-plate-number">{userData.vehicle}</span>
        </div>
      </div>

      {/* Personal Details Card */}
      <div className="section-card">
        <h3 className="section-title">Personal Details</h3>

        <div className="detail-row">
          <div className="detail-icon-wrap">
            <UserIcon />
          </div>
          <div className="detail-text">
            <p className="detail-label">Full Name</p>
            <p className="detail-value">{userData.name}</p>
          </div>
          <button
            className="edit-btn"
            onClick={() => { setEditingName(userData.name); setCurrentView("editProfile"); }}
          >
            <EditIcon />
          </button>
        </div>

        <div className="detail-divider" />

        <div className="detail-row">
          <div className="detail-icon-wrap">
            <PhoneIcon />
          </div>
          <div className="detail-text">
            <p className="detail-label">Phone Number</p>
            <p className="detail-value">{userData.phone}</p>
          </div>
          <button
            className="edit-btn"
            onClick={() => { setEditingPhone(userData.phone.replace("+91 ", "")); setCurrentView("editPhone"); }}
          >
            <EditIcon />
          </button>
        </div>
      </div>

      {/* Emergency Contacts Card */}
      <div className="section-card">
        <h3 className="section-title">Emergency Contacts</h3>

        {userData.emergencyContacts.map((contact, index) => (
          <div key={contact.id}>
            {index > 0 && <div className="detail-divider" />}
            <div className="detail-row">
              <div className="detail-icon-wrap contact-icon">
                <PersonIcon />
              </div>
              <div className="detail-text">
                <p className="detail-label">{contact.relation}</p>
                <p className="detail-value">{contact.name}</p>
                <p className="contact-phone">{contact.phone}</p>
              </div>
              <button
                className="edit-btn"
                onClick={() => { setEditingContact({ ...contact }); setCurrentView("editEmergency"); }}
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
    <div className="app-page">
      {/* Header - full width */}
      <div className="app-header-wrap">
        <div className="status-bar-spacer"></div>
        <Header />
      </div>

      {/* Main Content - constrained width */}
      <main className="app-content">
        {currentView === "dashboard" && <DashboardView />}
        {currentView === "editProfile" && <EditProfileView />}
        {currentView === "editPhone" && <EditPhoneView />}
        {currentView === "editEmergency" && <EditEmergencyView />}
      </main>

      <style>{`
        *, *::before, *::after { box-sizing: border-box; -webkit-tap-highlight-color: transparent; }

        .app-page {
          min-height: 100vh;
          min-width: 320px;
          background: #f4f4f5;
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
          display: flex;
          flex-direction: column;
          width: 100%;
          overflow-x: hidden;
          padding-bottom: env(safe-area-inset-bottom);
        }

        .app-header-wrap {
          width: 100%;
          max-width: 100%;
          flex-shrink: 0;
          background: #212121;
        }

        .status-bar-spacer {
          height: env(safe-area-inset-top);
          background: #212121;
        }

        .app-content {
          flex: 1;
          width: 100%;
          min-width: 320px;
          padding: 24px 16px;
          margin: 0 auto;
        }

        /* Profile Banner */
        .profile-banner {
          display: flex;
          align-items: center;
          gap: 16px;
          background: #212121;
          border-radius: 16px;
          padding: 20px 20px;
          margin-bottom: 20px;
        }

        .profile-avatar {
          width: 48px;
          height: 48px;
          border-radius: 50%;
          background: rgba(253, 197, 10, 0.18);
          border: 2px solid #fdc50a;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #fdc50a;
          flex-shrink: 0;
        }

        .profile-info { flex: 1; min-width: 0; }

        .profile-name {
          font-size: 1.0625rem;
          font-weight: 700;
          color: #ffffff;
          margin: 0 0 3px 0;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        .profile-phone {
          font-size: 0.8125rem;
          color: rgba(255,255,255,0.6);
          margin: 0;
        }

        .profile-badge {
          font-size: 0.6875rem;
          font-weight: 700;
          letter-spacing: 0.06em;
          text-transform: uppercase;
          padding: 5px 10px;
          border-radius: 20px;
          flex-shrink: 0;
        }

        .profile-badge-active {
          color: #ffffff;
          background: #22c55e;
        }

        .profile-badge-inactive {
          color: #ffffff;
          background: #ef4444;
        }

        /* Section Card */
        .section-card {
          background: #ffffff;
          border-radius: 14px;
          padding: 20px;
          margin-bottom: 14px;
          border: 1px solid #e4e4e7;
        }

        .section-head {
          display: flex;
          align-items: center;
          gap: 12px;
          margin-bottom: 16px;
        }

        .section-icon {
          width: 40px;
          height: 40px;
          border-radius: 10px;
          background: rgba(253, 197, 10, 0.12);
          border: 1px solid rgba(253, 197, 10, 0.3);
          display: flex;
          align-items: center;
          justify-content: center;
          color: #b38900;
          flex-shrink: 0;
        }

        .section-title {
          font-size: 0.875rem;
          font-weight: 700;
          color: #71717a;
          text-transform: uppercase;
          letter-spacing: 0.07em;
          margin: 0 0 16px 0;
        }

        .card-title {
          font-size: 0.9375rem;
          font-weight: 600;
          color: #18181b;
          margin: 0 0 2px 0;
        }

        .card-subtitle {
          font-size: 0.8125rem;
          color: #71717a;
          margin: 0;
        }

        /* Vehicle Plate */
        .vehicle-plate {
          display: flex;
          flex-direction: column;
          gap: 6px;
          padding: 14px 16px;
          background: #fafafa;
          border-radius: 10px;
          border: 1.5px solid #e4e4e7;
        }

        .vehicle-plate-label {
          font-size: 0.6875rem;
          font-weight: 700;
          letter-spacing: 0.08em;
          color: #a1a1aa;
          text-transform: uppercase;
        }

        .vehicle-plate-number {
          font-size: 1.375rem;
          font-weight: 800;
          color: #18181b;
          letter-spacing: 3px;
          font-variant-numeric: tabular-nums;
        }

        /* Detail Row */
        .detail-row {
          display: flex;
          align-items: center;
          gap: 14px;
          padding: 14px 0;
        }

        .detail-icon-wrap {
          width: 38px;
          height: 38px;
          border-radius: 10px;
          background: #f4f4f5;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #52525b;
          flex-shrink: 0;
        }

        .detail-icon-wrap.contact-icon {
          background: rgba(253, 197, 10, 0.12);
          color: #b38900;
        }

        .detail-text { flex: 1; min-width: 0; }

        .detail-label {
          font-size: 0.75rem;
          font-weight: 500;
          color: #a1a1aa;
          margin: 0 0 2px 0;
          text-transform: uppercase;
          letter-spacing: 0.05em;
        }

        .detail-value {
          font-size: 0.9375rem;
          font-weight: 600;
          color: #18181b;
          margin: 0;
        }

        .contact-phone {
          font-size: 0.8125rem;
          color: #71717a;
          margin: 2px 0 0 0;
        }

        .detail-divider {
          height: 1px;
          background: #f4f4f5;
        }

        /* Edit Button */
        .edit-btn {
          width: 34px;
          height: 34px;
          border-radius: 8px;
          border: 1px solid #e4e4e7;
          background: #fafafa;
          color: #71717a;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: all 0.15s;
          flex-shrink: 0;
        }

        .edit-btn:hover { background: #f4f4f5; color: #212121; border-color: #d4d4d8; }
        .edit-btn:active { transform: scale(0.95); }

        /* Edit views */
        .edit-container { padding: 0 0 120px 0; }

        .edit-header { margin-bottom: 28px; }

        .edit-title {
          font-size: 1.375rem;
          font-weight: 700;
          color: #18181b;
          margin: 0 0 6px 0;
        }

        .edit-subtitle {
          font-size: 0.9rem;
          color: #71717a;
          margin: 0;
        }

        .input-group { margin-bottom: 18px; }

        .input-label {
          display: block;
          font-size: 0.8125rem;
          font-weight: 600;
          color: #52525b;
          margin-bottom: 8px;
          text-transform: uppercase;
          letter-spacing: 0.05em;
        }

        .form-input {
          width: 100%;
          padding: 14px 16px;
          font-size: 0.9375rem;
          border: 1.5px solid #e4e4e7;
          border-radius: 10px;
          background: #ffffff;
          color: #18181b;
          outline: none;
          transition: border-color 0.2s, box-shadow 0.2s;
          font-weight: 500;
        }

        .form-input:focus {
          border-color: #fdc50a;
          box-shadow: 0 0 0 3px rgba(253, 197, 10, 0.15);
        }

        .phone-input-wrapper {
          display: flex;
          align-items: center;
          gap: 10px;
          border: 1.5px solid #e4e4e7;
          border-radius: 10px;
          padding: 14px 16px;
          background: #ffffff;
          transition: border-color 0.2s, box-shadow 0.2s;
        }

        .phone-input-wrapper:focus-within {
          border-color: #fdc50a;
          box-shadow: 0 0 0 3px rgba(253, 197, 10, 0.15);
        }

        .country-code {
          font-size: 0.9375rem;
          font-weight: 600;
          color: #18181b;
          flex-shrink: 0;
        }

        .phone-input { border: none; padding: 0; box-shadow: none; }
        .phone-input:focus { box-shadow: none; border-color: transparent; }

        /* Edit Footer */
        .edit-footer {
          position: fixed;
          bottom: 0;
          left: 0;
          right: 0;
          background: #ffffff;
          padding: 14px 16px calc(14px + env(safe-area-inset-bottom));
          border-top: 1px solid #e4e4e7;
          z-index: 50;
        }

        .primary-btn {
          width: 100%;
          padding: 16px 24px;
          background: #212121;
          color: #fdc50a;
          border: none;
          border-radius: 10px;
          font-size: 0.9375rem;
          font-weight: 700;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          transition: all 0.2s;
          margin-bottom: 8px;
          letter-spacing: 0.02em;
        }

        .primary-btn:hover:not(:disabled) { background: #333; }
        .primary-btn:active:not(:disabled) { transform: scale(0.98); }

        .primary-btn:disabled {
          background: #e4e4e7;
          color: #a1a1aa;
          cursor: not-allowed;
        }

        .secondary-btn {
          width: 100%;
          padding: 12px;
          background: none;
          border: none;
          color: #71717a;
          font-size: 0.9375rem;
          font-weight: 500;
          cursor: pointer;
          border-radius: 10px;
          transition: all 0.15s;
        }

        .secondary-btn:hover { background: #f4f4f5; color: #18181b; }

        /* Responsive - Mobile (default) */
        @media (max-width: 639px) {
          .app-content { padding: 18px 14px; }
          .profile-banner { padding: 16px 16px; gap: 14px; margin-bottom: 16px; }
          .profile-avatar { width: 44px; height: 44px; }
          .profile-name { font-size: 1rem; }
          .profile-phone { font-size: 0.75rem; }
          .section-card { padding: 16px; margin-bottom: 12px; }
          .vehicle-plate { padding: 12px 14px; }
          .vehicle-plate-number { font-size: 1.2rem; letter-spacing: 2px; }
          .detail-row { padding: 12px 0; gap: 12px; }
          .detail-icon-wrap { width: 34px; height: 34px; }
          .edit-btn { width: 32px; height: 32px; }
          .edit-footer { padding: 12px 14px calc(12px + env(safe-area-inset-bottom)); }
        }

        /* Responsive - Tablet */
        @media (min-width: 640px) {
          .app-content { max-width: 640px; padding: 28px 24px; margin: 0 auto; }
          .section-card { padding: 24px; margin-bottom: 16px; }
          .profile-banner { padding: 22px 24px; margin-bottom: 22px; }
        }

        @media (min-width: 768px) {
          .app-content { max-width: 720px; padding: 32px 28px; }
          .section-card { padding: 26px; margin-bottom: 18px; }
          .profile-banner { padding: 24px 28px; gap: 18px; }
          .profile-avatar { width: 52px; height: 52px; }
          .profile-name { font-size: 1.125rem; }
          .vehicle-plate-number { font-size: 1.5rem; }
        }

        /* Responsive - Desktop */
        @media (min-width: 1024px) {
          .app-content { max-width: 800px; padding: 36px 32px; }
          .section-card { padding: 28px; margin-bottom: 20px; }
          .profile-banner { padding: 26px 32px; margin-bottom: 24px; gap: 20px; }
          .profile-avatar { width: 56px; height: 56px; }
          .profile-name { font-size: 1.1875rem; }
          .profile-phone { font-size: 0.875rem; }
          .edit-footer {
            left: 50%;
            transform: translateX(-50%);
            max-width: 800px;
            width: 100%;
            border-radius: 14px 14px 0 0;
          }
        }

        @media (min-width: 1280px) {
          .app-content { max-width: 960px; padding: 40px 40px; }
          .section-card { padding: 32px; margin-bottom: 24px; }
          .profile-banner { padding: 28px 36px; }
          .edit-footer { max-width: 960px; }
        }
      `}</style>
    </div>
  );
};

export default OwnerDashboard;
