import { useState } from "react";
import { useNavigate } from "react-router-dom";
import AdminSidebar from "../../components/AdminSidebar";
import { MenuIcon, CloseIcon } from "./components/AdminIcons";
import DashboardOverview from "./pages/DashboardOverview";
import ProfilePage from "./pages/ProfilePage";
import UsersPage from "./pages/UsersPage";
import QRManagementPage from "./pages/QRManagementPage";

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("dashboard");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  const handleNavClick = (tab: string) => {
    setActiveTab(tab);
    setSidebarOpen(false);
  };

  const renderPage = () => {
    switch (activeTab) {
      case "dashboard":
        return <DashboardOverview />;
      case "profile":
        return <ProfilePage />;
      case "users":
        return <UsersPage />;
      case "qrgenerate":
        return <QRManagementPage />;
      default:
        return <DashboardOverview />;
    }
  };

  return (
    <div className={`admin-app ${sidebarCollapsed ? "sidebar-collapsed" : ""}`}>
      {/* Mobile Header */}
      <header className="mobile-header">
        <button
          type="button"
          className="menu-btn"
          onClick={() => setSidebarOpen((prev) => !prev)}
          aria-label={sidebarOpen ? "Close menu" : "Open menu"}
        >
          {sidebarOpen ? <CloseIcon /> : <MenuIcon />}
        </button>
        <button
          type="button"
          className="mobile-logo"
          onClick={() => navigate("/")}
          aria-label="Go to home"
        >
          <svg
            width="28"
            height="28"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#2563eb"
            strokeWidth="2"
          >
            <rect x="3" y="3" width="7" height="7" />
            <rect x="14" y="3" width="7" height="7" />
          </svg>
          <h1 className="hilabi-font">HILABI</h1>
        </button>
        <div className="mobile-spacer"></div>
      </header>

      {/* Sidebar Overlay */}
      {sidebarOpen && (
        <div
          className="sidebar-overlay"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <AdminSidebar
        activeTab={activeTab}
        onNavClick={handleNavClick}
        collapsed={sidebarCollapsed}
        onCollapsedChange={setSidebarCollapsed}
        isMobileOpen={sidebarOpen}
        onMobileClose={() => setSidebarOpen(false)}
      />

      <main className="main-content">{renderPage()}</main>

      <style>{`
        * { box-sizing: border-box; margin: 0; padding: 0; }
        
        .admin-app { 
          display: flex; 
          min-height: 100vh; 
          background: #e9eef3; 
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; 
        }

        /* Mobile Header */
        .mobile-header {
          display: none;
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          height: 60px;
          background: #fff;
          border-bottom: 1px solid #e2e8f0;
          align-items: center;
          padding: 0 16px;
          z-index: 1100;
        }

        .menu-btn {
          position: relative;
          z-index: 1;
          background: none;
          border: none;
          cursor: pointer;
          padding: 12px;
          min-width: 44px;
          min-height: 44px;
          color: #0f172a;
          display: flex;
          align-items: center;
          justify-content: center;
          touch-action: manipulation;
        }

        .mobile-logo {
          display: flex;
          align-items: center;
          gap: 10px;
          flex: 1;
          justify-content: center;
          border: none;
          background: none;
          cursor: pointer;
          padding: 0;
          font: inherit;
          margin-left: -40px;
        }

        .mobile-logo h1 {
          font-size: 1.125rem;
          font-weight: 700;
          color: #0f172a;
        }

        .mobile-spacer {
          width: 40px;
        }

        /* Sidebar Overlay */
        .sidebar-overlay {
          display: none;
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0, 0, 0, 0.5);
          z-index: 999;
        }

        .main-content { 
          flex: 1; 
          margin-left: 260px; 
          padding: 32px; 
          overflow-y: auto;
          transition: margin-left 0.3s ease;
        }
        
        .admin-app.sidebar-collapsed .main-content {
          margin-left: 80px;
        }
        
        .profile-placeholder {
          background: #fff;
          border-radius: 16px;
          padding: 48px;
          text-align: center;
          color: #64748b;
          border: 1px solid #f1f5f9;
        }
        
        .confirm-modal-overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0, 0, 0, 0.5);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 2000;
          padding: 20px;
        }
        
        .confirm-modal {
          background: #fff;
          border-radius: 16px;
          padding: 24px;
          max-width: 420px;
          width: 100%;
          box-shadow: 0 20px 60px rgba(0, 0, 0, 0.2);
        }
        
        .confirm-modal-title {
          font-size: 1.25rem;
          font-weight: 700;
          color: #0f172a;
          margin-bottom: 12px;
        }
        
        .confirm-modal-message {
          font-size: 0.9375rem;
          color: #64748b;
          line-height: 1.6;
          margin-bottom: 24px;
        }
        
        .confirm-modal-actions {
          display: flex;
          gap: 12px;
          justify-content: flex-end;
        }
        
        .confirm-modal-btn {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 12px 20px;
          border-radius: 10px;
          font-size: 0.9375rem;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.2s;
          border: 2px solid transparent;
        }
        
        .confirm-modal-btn.cancel {
          background: #f1f5f9;
          color: #64748b;
        }
        
        .confirm-modal-btn.cancel:hover {
          background: #e2e8f0;
        }
        
        .confirm-modal-btn.confirm.activate {
          background: rgba(16, 185, 129, 0.2);
          color: #059669;
          border-color: rgba(16, 185, 129, 0.4);
        }
        
        .confirm-modal-btn.confirm.activate:hover {
          background: #10b981;
          color: #fff;
          border-color: #10b981;
        }
        
        .confirm-modal-btn.confirm.deactivate {
          background: rgba(239, 68, 68, 0.15);
          color: #dc2626;
          border-color: rgba(239, 68, 68, 0.35);
        }
        
        .confirm-modal-btn.confirm.deactivate:hover {
          background: #ef4444;
          color: #fff;
          border-color: #ef4444;
        }
        
        .users-table-card {
          background: #fff;
          border-radius: 16px;
          border: 1px solid #f1f5f9;
          overflow: hidden;
        }
        
        .users-table-wrap {
          overflow-x: auto;
        }
        
        .users-table {
          width: 100%;
          border-collapse: collapse;
        }
        
        .users-table th {
          text-align: left;
          padding: 16px 20px;
          font-size: 0.75rem;
          font-weight: 600;
          color: #64748b;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          background: #f8fafc;
          border-bottom: 1px solid #e2e8f0;
        }
        
        .users-table td {
          padding: 16px 20px;
          border-bottom: 1px solid #f1f5f9;
          font-size: 0.9375rem;
        }
        
        .users-table tbody tr:hover {
          background: #f8fafc;
        }
        
        .serial-no {
          font-weight: 600;
          color: #64748b;
        }
        
        .user-name {
          font-weight: 600;
          color: #0f172a;
        }
        
        .user-phone {
          font-size: 0.875rem;
          color: #475569;
        }
        
        .qr-code-text {
          font-family: monospace;
          font-size: 0.875rem;
          color: #475569;
        }
        
        .status-text {
          font-size: 0.875rem;
          font-weight: 600;
          text-transform: capitalize;
        }
        
        .status-text.status-active {
          color: #059669;
        }
        
        .status-text.status-inactive {
          color: #64748b;
        }
        
        .subscription-days {
          font-weight: 500;
          color: #10b981;
        }
        
        .subscription-days.warning {
          color: #f59e0b;
        }
        
        .subscription-days.expired {
          color: #dc2626;
          font-weight: 600;
        }
        
        .user-action-btn {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          padding: 6px 12px;
          border-radius: 8px;
          font-size: 0.8125rem;
          font-weight: 600;
          cursor: pointer;
          border: 1px solid transparent;
          transition: all 0.2s;
        }
        
        .user-action-btn.activate {
          background: rgba(16, 185, 129, 0.2);
          color: #059669;
          border-color: rgba(16, 185, 129, 0.4);
        }
        
        .user-action-btn.activate:hover {
          background: #10b981;
          color: #fff;
          border-color: #10b981;
          transform: translateY(-1px);
        }
        
        .user-action-btn.deactivate {
          background: rgba(239, 68, 68, 0.15);
          color: #dc2626;
          border-color: rgba(239, 68, 68, 0.35);
        }
        
        .user-action-btn.deactivate:hover {
          background: #ef4444;
          color: #fff;
          border-color: #ef4444;
          transform: translateY(-1px);
        }
        
        .page-header { 
          margin-bottom: 32px; 
        }
        
        .page-header h2 { 
          font-size: 1.875rem; 
          font-weight: 700; 
          color: #0f172a; 
          margin-bottom: 8px; 
        }
        
.page-header p {
          font-size: 1rem;
          color: #ffffff;
        }
        
        .kpi-grid { 
          display: grid; 
          grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); 
          gap: 20px; 
          margin-bottom: 40px; 
        }
        
        .kpi-card { 
          background: #fff; 
          border-radius: 16px; 
          padding: 24px; 
          border: 1px solid #f1f5f9; 
          box-shadow: 0 1px 3px rgba(0,0,0,0.05); 
          animation: slideUp 0.5s ease backwards; 
          transition: all 0.3s ease;
        }
        
        @keyframes slideUp { 
          from { opacity: 0; transform: translateY(20px); } 
          to { opacity: 1; transform: translateY(0); } 
        }
        
        .kpi-card:hover { 
          transform: translateY(-4px); 
          box-shadow: 0 8px 20px rgba(0,0,0,0.08); 
        }
        
        .kpi-header { 
          display: flex; 
          justify-content: space-between; 
          margin-bottom: 16px; 
        }
        
        .kpi-icon { 
          width: 56px; 
          height: 56px; 
          border-radius: 14px; 
          display: flex; 
          align-items: center; 
          justify-content: center; 
        }
        
        .kpi-change { 
          padding: 6px 10px; 
          border-radius: 8px; 
          font-size: 0.8125rem; 
          font-weight: 600; 
          background: rgba(16, 185, 129, 0.1); 
          color: #10b981; 
        }
        
        .kpi-card h3 { 
          font-size: 2rem; 
          font-weight: 700; 
          color: #0f172a; 
          margin-bottom: 4px; 
        }
        
.kpi-card p {
          font-size: 0.9375rem;
          color: #ffffff;
        }
        
        .activity-section { 
          background: #fff; 
          border-radius: 16px; 
          padding: 24px; 
          border: 1px solid #f1f5f9; 
        }
        
        .activity-section h3 { 
          font-size: 1.125rem; 
          font-weight: 700; 
          margin-bottom: 20px; 
        }
        
        .activity-item { 
          display: flex; 
          gap: 16px; 
          margin-bottom: 20px; 
        }
        
        .activity-dot { 
          width: 12px; 
          height: 12px; 
          border-radius: 50%; 
          background: #2563eb; 
          margin-top: 6px;
          flex-shrink: 0;
        }
        
.activity-item p {
          font-size: 0.9375rem;
          color: #ffffff;
          margin-bottom: 4px; 
        }
        
        .activity-item span { 
          font-size: 0.8125rem; 
          color: #94a3b8; 
        }
        
        .mode-selector { 
          display: flex; 
          gap: 12px; 
          margin-bottom: 24px; 
          background: #fff; 
          padding: 8px; 
          border-radius: 14px; 
        }
        
        .mode-selector button { 
          flex: 1; 
          padding: 14px; 
          border: none; 
          background: transparent; 
          color: #64748b; 
          font-weight: 600; 
          border-radius: 10px; 
          cursor: pointer;
          transition: all 0.2s;
        }
        
        .mode-selector button.active { 
          background: linear-gradient(135deg, #2563eb, #1d4ed8); 
          color: #fff; 
          box-shadow: 0 4px 12px rgba(37, 99, 235, 0.3); 
        }
        
        .generate-card {
          background: #fff;
          border-radius: 16px;
          padding: 32px;
          margin-bottom: 32px;
        }

        .qr-modal-input-wrap {
          display: flex;
          flex-direction: column;
          gap: 8px;
          margin-bottom: 16px;
        }

        .qr-modal-input-wrap label {
          font-size: 0.9375rem;
          font-weight: 600;
          color: #0f172a;
        }

        .qr-count-input {
          width: 100%;
          max-width: 120px;
          padding: 12px 14px;
          font-size: 1rem;
          font-weight: 600;
          text-align: center;
          border: 2px solid #e2e8f0;
          border-radius: 10px;
        }

        .qr-count-input:focus {
          outline: none;
          border-color: #8b5cf6;
        }

        .icon-btn-generate {
          background: linear-gradient(135deg, #8b5cf6, #7c3aed) !important;
          color: #fff !important;
          border-color: transparent !important;
          box-shadow: 0 4px 12px rgba(139, 92, 246, 0.3);
        }

        .icon-btn-generate:hover {
          background: linear-gradient(135deg, #7c3aed, #6d28d9) !important;
          transform: translateY(-1px);
        }

        .qr-confirm-number {
          color: #8b5cf6;
        }

        .qr-confirm-btn {
          background: rgba(139, 92, 246, 0.2) !important;
          color: #7c3aed !important;
          border-color: rgba(139, 92, 246, 0.4) !important;
        }

        .qr-confirm-btn:hover {
          background: #8b5cf6 !important;
          color: #fff !important;
          border-color: #8b5cf6 !important;
        }

        .form-content {
          margin-bottom: 24px; 
        }
        
        .form-content label { 
          display: block; 
          font-weight: 600; 
          margin-bottom: 10px; 
        }
        
        .form-content select { 
          width: 100%; 
          padding: 14px; 
          border: 2px solid #e2e8f0; 
          border-radius: 12px; 
          font-size: 1rem; 
        }
        
        .generate-btn { 
          width: 100%; 
          padding: 18px; 
          background: linear-gradient(135deg, #8b5cf6, #7c3aed); 
          color: #fff; 
          border: none; 
          border-radius: 14px; 
          font-size: 1.0625rem; 
          font-weight: 600; 
          cursor: pointer; 
          display: flex; 
          align-items: center; 
          justify-content: center; 
          gap: 10px; 
          box-shadow: 0 8px 20px rgba(139, 92, 246, 0.3);
          transition: all 0.2s;
        }
        
        .generate-btn:hover { 
          transform: translateY(-2px); 
        }
        
        .results-section { 
          background: #fff; 
          border-radius: 16px; 
          padding: 24px; 
        }
        
        .results-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 20px;
          flex-wrap: wrap;
          gap: 12px;
        }

        .results-header h3 {
          font-size: 1.125rem;
          font-weight: 700;
        }

        .results-header-actions {
          display: flex;
          align-items: center;
          gap: 16px;
          flex-wrap: wrap;
        }

        .qr-filters {
          display: flex;
          align-items: center;
          gap: 20px;
          margin-bottom: 20px;
          padding: 12px 0;
          border-bottom: 1px solid #e2e8f0;
          flex-wrap: wrap;
        }

        .qr-filter-search {
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 8px 14px;
          background: #f8fafc;
          border: 2px solid #e2e8f0;
          border-radius: 10px;
          min-width: 220px;
        }

        .qr-filter-search svg {
          color: #64748b;
          flex-shrink: 0;
        }

        .qr-search-input {
          flex: 1;
          border: none;
          background: transparent;
          font-size: 0.9375rem;
          outline: none;
        }

        .qr-search-input::placeholder {
          color: #94a3b8;
        }

        .qr-filter-group {
          display: flex;
          align-items: center;
          gap: 10px;
        }

        .qr-filter-label {
          font-size: 0.8125rem;
          font-weight: 600;
          color: #64748b;
        }

        .qr-filter-toggle {
          display: flex;
          border: 2px solid #e2e8f0;
          border-radius: 10px;
          overflow: hidden;
        }

        .qr-filter-btn {
          padding: 8px 14px;
          border: none;
          background: #fff;
          font-size: 0.8125rem;
          font-weight: 600;
          color: #64748b;
          cursor: pointer;
          transition: all 0.2s;
        }

        .qr-filter-btn:hover {
          background: #f8fafc;
          color: #0f172a;
        }

        .qr-filter-btn.active {
          background: linear-gradient(135deg, #2563eb, #7c3aed);
          color: #fff;
        }

        .qr-filter-toggle .qr-filter-btn:not(:last-child) {
          border-right: 1px solid #e2e8f0;
        }

        .qr-card-badge-row {
          display: flex;
          align-items: center;
          
          gap: 8px;
          flex-wrap: wrap;
        }

        .qr-download-single-btn {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          padding: 6px 12px;
          font-size: 0.75rem;
          font-weight: 600;
          color: #2563eb;
          background: #fff;
          border: 2px solid #e2e8f0;
          border-radius: 8px;
          cursor: pointer;
          transition: all 0.2s;
        }

        .qr-download-single-btn:hover {
          background: rgba(37, 99, 235, 0.05);
        }

        .qr-download-single-btn svg {
          width: 14px;
          height: 14px;
        }

        .qr-view-toggle {
          display: flex;
          border: 2px solid #e2e8f0;
          border-radius: 10px;
          overflow: hidden;
        }

        .view-toggle-btn {
          padding: 10px 14px;
          background: #fff;
          border: none;
          color: #64748b;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.2s;
        }

        .view-toggle-btn:first-child {
          border-right: 1px solid #e2e8f0;
        }

        .view-toggle-btn:hover {
          background: #f8fafc;
          color: #0f172a;
        }

        .view-toggle-btn.active {
          background: linear-gradient(135deg, #2563eb, #7c3aed);
          color: #fff;
        }

        .action-buttons {
          display: flex; 
          gap: 10px; 
        }
        
        .icon-btn { 
          display: flex; 
          align-items: center; 
          gap: 8px; 
          padding: 10px 20px; 
          border: 2px solid #e2e8f0; 
          background: #fff; 
          border-radius: 10px; 
          font-weight: 600; 
          cursor: pointer; 
          color: #2563eb;
          transition: all 0.2s;
        }
        
        .icon-btn:hover { 
          background: rgba(37, 99, 235, 0.05); 
        }
        
        .qr-display.qr-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
          gap: 16px;
        }

        .qr-table-wrap {
          overflow-x: auto;
        }

        .qr-table {
          width: 100%;
          border-collapse: collapse;
        }

        .qr-table th {
          text-align: left;
          padding: 16px 20px;
          font-size: 0.75rem;
          font-weight: 600;
          color: #64748b;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          background: #f8fafc;
          border-bottom: 2px solid #e2e8f0;
        }

        .qr-table td {
          padding: 16px 20px;
          border-bottom: 1px solid #f1f5f9;
          font-size: 0.9375rem;
          color: #334155;
          vertical-align: middle;
        }

        .qr-table tbody tr:hover {
          background: #f8fafc;
        }

        .qr-placeholder-cell {
          width: 48px;
          height: 48px;
          min-width: 48px;
          margin: 0;
          padding: 8px;
        }

        .qr-placeholder-cell svg {
          width: 100%;
          height: 100%;
        }

        .qr-code-cell {
          font-weight: 600;
          color: #0f172a;
        }

        .qr-item {
          border: 2px solid #f1f5f9;
          border-radius: 12px;
          padding: 10px 16px;
          text-align: center;
        }

        .qr-item-tag {
          display: flex;
          flex-direction: column;
          align-items: center;
        }

        .qr-item-tag .parking-tag {
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
        }

        .qr-tag-meta {
          margin-top: 12px;
          width: 100%;
        }

        .qr-item-content {
          flex: 1;
          min-width: 0;
          display: flex;
          flex-direction: column;
          gap: 4px;
        }

        .qr-placeholder {
          width: 100%;
          aspect-ratio: 1;
          background: linear-gradient(135deg, rgba(139, 92, 246, 0.1), rgba(124, 58, 237, 0.05));
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #8b5cf6;
          margin-bottom: 12px;
        }

        .qr-code {
          font-weight: 700;
          color: #0f172a;
          margin-bottom: 4px;
          font-size: 0.875rem;
          word-break: break-all;
        }

        .qr-timestamp {
          font-size: 0.75rem;
          color: #94a3b8;
        }

        .qr-status-badge {
          display: inline-block;
          padding: 4px 10px;
          border-radius: 20px;
          font-size: 0.75rem;
          font-weight: 600;
        }

        .qr-status-badge.linked {
          background: rgba(16, 185, 129, 0.15);
          color: #059669;
        }

        .qr-status-badge.unlinked {
          background: rgba(100, 116, 139, 0.15);
          color: #64748b;
        }

        .qr-linked-to {
          font-size: 0.8125rem;
          color: #64748b;
          width: 100%;
        }

        .qr-status-toggle {
          display: inline-flex;
          background: #f1f5f9;
          border-radius: 20px;
          padding: 3px;
          gap: 2px;
          box-shadow: inset 0 1px 2px rgba(0, 0, 0, 0.05);
        }

        .qr-status-toggle-btn {
          padding: 6px 14px;
          border: none;
          border-radius: 16px;
          font-size: 0.8125rem;
          font-weight: 600;
          cursor: pointer;
          background: transparent;
          color: #94a3b8;
          transition: all 0.2s ease;
        }

        .qr-status-toggle-btn:hover {
          color: #64748b;
        }

        .qr-status-toggle-btn.active {
          background: #fff;
          color: #14b8a6;
          box-shadow: 0 2px 6px rgba(0, 0, 0, 0.08);
        }

        .qr-status-toggle-btn.active.deactivated {
          color: #dc2626;
        }

        .qr-card-status-wrap {
          margin-top: 10px;
          display: flex;
          justify-content: center;
        }

        .qr-card-status-wrap .qr-status-toggle {
          width: 100%;
          justify-content: stretch;
        }

        .qr-card-status-wrap .qr-status-toggle-btn {
          flex: 1;
          min-width: 0;
        }

        /* Tablet Styles */
        @media (max-width: 1024px) { 
          .main-content { 
            margin-left: 260px; 
            padding: 24px;
          }
          .admin-app.sidebar-collapsed .main-content {
            margin-left: 80px;
          }
          .kpi-grid {
            grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
            gap: 16px;
          }
        }

        /* Mobile Styles */
        @media (max-width: 768px) { 
          .mobile-header {
            display: flex;
          }

          .sidebar-overlay {
            display: block;
            top: 60px;
          }

          .main-content { 
            margin-left: 0 !important;
            margin-top: 60px;
            padding: 12px;
          }

          .page-header {
            margin-bottom: 20px;
          }

          .page-header h2 {
            font-size: 1.25rem;
          }

          .page-header p {
            font-size: 0.8125rem;
          }

          .kpi-grid {
            grid-template-columns: repeat(2, 1fr);
            gap: 10px;
            margin-bottom: 16px;
          }

          .kpi-card {
            padding: 14px 16px;
          }

          .kpi-header {
            margin-bottom: 10px;
          }

          .kpi-icon {
            width: 40px;
            height: 40px;
          }

          .kpi-change {
            font-size: 0.75rem;
            padding: 4px 8px;
          }

          .kpi-card h3 {
            font-size: 1.375rem;
          }

          .kpi-card p {
            font-size: 0.8125rem;
          }

          .activity-section {
            padding: 14px 16px;
          }

          .activity-section h3 {
            font-size: 0.9375rem;
            margin-bottom: 12px;
          }

          .activity-item {
            margin-bottom: 12px;
          }

          .activity-item p {
            font-size: 0.8125rem;
          }

          .activity-item span {
            font-size: 0.75rem;
          }

          .activity-dot {
            width: 8px;
            height: 8px;
            margin-top: 5px;
          }

          .users-table {
            min-width: 580px;
          }

          .users-table th, .users-table td {
            padding: 12px 18px;
            font-size: 0.75rem;
          }

          .users-table th {
            font-size: 0.65rem;
          }

          .user-name, .user-phone, .qr-code-text, .status-text {
            font-size: 0.75rem;
          }

          .subscription-days {
            font-size: 0.75rem;
          }

          .user-action-btn {
            padding: 5px 10px;
            font-size: 0.75rem;
          }

          .users-table th:nth-child(4),
          .users-table td:nth-child(4) {
            display: none;
          }

          .generate-card {
            padding: 20px;
          }

          .generate-btn {
            font-size: 1rem;
            padding: 16px;
          }

          .results-section {
            padding: 20px;
          }

          .results-header {
            flex-direction: column;
            align-items: flex-start;
          }

          .qr-filters {
            flex-direction: column;
            align-items: stretch;
          }

          .qr-filter-search {
            min-width: unset;
          }

          .action-buttons {
            width: 100%;
          }

          .icon-btn {
            flex: 1;
            justify-content: center;
            padding: 10px 12px;
          }

          .icon-btn span {
            display: none;
          }

          .main-content .qr-display.qr-grid.qr-grid-tags {
            grid-template-columns: 1fr;
            gap: 16px;
            max-width: 280px;
            margin: 0 auto;
          }

          .main-content .qr-item-tag .parking-tag {
            width: 100%;
            max-width: 200px;
          }

          .qr-display.qr-grid {
            grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
            gap: 12px;
          }

          .qr-item {
            padding: 12px;
          }

          .qr-table {
            min-width: 520px;
          }

          .qr-table th, .qr-table td {
            padding: 12px 14px;
            font-size: 0.8125rem;
          }

          .qr-placeholder-cell {
            width: 40px;
            height: 40px;
            min-width: 40px;
          }
        }

        /* Small Mobile Styles */
        @media (max-width: 480px) {
          .main-content {
            padding: 10px;
          }

          .page-header {
            margin-bottom: 16px;
          }

          .page-header h2 {
            font-size: 1.125rem;
          }

          .page-header p {
            font-size: 0.75rem;
          }

          .kpi-grid {
            grid-template-columns: repeat(2, 1fr);
            gap: 8px;
            margin-bottom: 12px;
          }

          .kpi-card {
            padding: 12px 14px;
          }

          .kpi-icon {
            width: 36px;
            height: 36px;
          }

          .kpi-card h3 {
            font-size: 1.25rem;
          }

          .kpi-card p {
            font-size: 0.75rem;
          }

          .activity-section {
            padding: 12px 14px;
          }

          .activity-section h3 {
            font-size: 0.875rem;
            margin-bottom: 10px;
          }

          .activity-item {
            margin-bottom: 10px;
          }

          .activity-item p {
            font-size: 0.75rem;
          }

          .activity-item span {
            font-size: 0.6875rem;
          }

          .users-table {
            min-width: 520px;
          }

          .users-table th, .users-table td {
            padding: 10px 14px;
            font-size: 0.6875rem;
          }

          .users-table th {
            font-size: 0.6rem;
          }

          .user-name, .user-phone, .qr-code-text, .status-text,
          .subscription-days {
            font-size: 0.6875rem;
          }

          .user-action-btn {
            padding: 4px 8px;
            font-size: 0.6875rem;
          }

          .kpi-grid {
            gap: 10px;
          }

          .kpi-card {
            padding: 16px;
          }

          .main-content .qr-display.qr-grid.qr-grid-tags {
            grid-template-columns: 1fr;
            max-width: 260px;
            margin: 0 auto;
          }

          // .main-content .qr-item-tag .parking-tag {
          //   max-width: 180px;
          // }

          .qr-display.qr-grid {
            grid-template-columns: 1fr 1fr;
            gap: 10px;
          }

          .action-buttons {
            gap: 8px;
          }

          .icon-btn {
            padding: 8px;
          }
        }
      `}</style>
    </div>
  );
};

export default AdminDashboard;
