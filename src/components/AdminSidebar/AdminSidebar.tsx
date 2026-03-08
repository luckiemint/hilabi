import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./AdminSidebar.css";

const DashboardIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <rect x="3" y="3" width="7" height="7" />
    <rect x="14" y="3" width="7" height="7" />
    <rect x="14" y="14" width="7" height="7" />
    <rect x="3" y="14" width="7" height="7" />
  </svg>
);

const QRIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <rect x="3" y="3" width="7" height="7" />
    <rect x="14" y="3" width="7" height="7" />
    <rect x="3" y="14" width="7" height="7" />
    <rect x="14" y="14" width="7" height="7" />
    <path d="M6 6h1M17 6h1M6 17h1M17 17h1" />
  </svg>
);

const UsersIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
    <circle cx="9" cy="7" r="4" />
    <path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
  </svg>
);

const ProfileIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
    <circle cx="12" cy="7" r="4" />
  </svg>
);

const LogoutIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
    <polyline points="16 17 21 12 16 7" />
    <line x1="21" y1="12" x2="9" y2="12" />
  </svg>
);

const ChevronLeftIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <polyline points="15 18 9 12 15 6" />
  </svg>
);

const ChevronRightIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <polyline points="9 18 15 12 9 6" />
  </svg>
);

interface AdminSidebarProps {
  activeTab: string;
  onNavClick: (tab: string) => void;
  collapsed?: boolean;
  onCollapsedChange?: (collapsed: boolean) => void;
  isMobileOpen?: boolean;
  onMobileClose?: () => void;
}

const AdminSidebar = ({
  activeTab,
  onNavClick,
  collapsed = false,
  onCollapsedChange,
  isMobileOpen = false,
  onMobileClose,
}: AdminSidebarProps) => {
  const navigate = useNavigate();
  const [internalCollapsed, setInternalCollapsed] = useState(collapsed);
  const isCollapsed = onCollapsedChange !== undefined ? collapsed : internalCollapsed;

  const handleToggle = () => {
    if (onCollapsedChange) {
      onCollapsedChange(!collapsed);
    } else {
      setInternalCollapsed(!internalCollapsed);
    }
  };

  const handleNav = (tab: string) => {
    onNavClick(tab);
    onMobileClose?.();
  };

  const handleLogout = () => {
    navigate("/admin/login");
    onMobileClose?.();
  };

  const mainItems = [
    { id: "dashboard", label: "Dashboard", icon: DashboardIcon },
    { id: "qrgenerate", label: "QR Management", icon: QRIcon },
    { id: "users", label: "Users", icon: UsersIcon },
  ];

  const settingsItems = [{ id: "profile", label: "Profile", icon: ProfileIcon }];

  return (
    <>
      <aside
        className={`admin-sidebar ${isCollapsed ? "collapsed" : ""} ${isMobileOpen ? "mobile-open" : ""}`}
      >
        <div className="admin-sidebar-header">
          <button
            type="button"
            className="admin-sidebar-logo admin-sidebar-logo-btn"
            onClick={() => navigate("/")}
            aria-label="Go to home"
          >
            <div className="admin-sidebar-logo-icon">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#2563eb" strokeWidth="2">
                <rect x="3" y="3" width="7" height="7" />
                <rect x="14" y="3" width="7" height="7" />
              </svg>
            </div>
            {!isCollapsed && (
              <div className="admin-sidebar-logo-text">
                <span className="admin-sidebar-brand hilabi-font">Hilabi</span>
                <span className="admin-sidebar-subtitle">Admin Panel</span>
              </div>
            )}
          </button>
        </div>

        <button
          className="admin-sidebar-toggle"
          onClick={handleToggle}
          aria-label={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
          title={isCollapsed ? "Expand" : "Collapse"}
        >
          {isCollapsed ? <ChevronRightIcon /> : <ChevronLeftIcon />}
        </button>

        <nav className="admin-sidebar-nav">
          <div className="admin-sidebar-section">
            <div className="admin-sidebar-section-title">{!isCollapsed && "MAIN MENU"}</div>
            {mainItems.map((item) => (
              <button
                key={item.id}
                className={`admin-sidebar-item ${activeTab === item.id ? "active" : ""}`}
                onClick={() => handleNav(item.id)}
              >
                <span className="admin-sidebar-icon">
                  <item.icon />
                </span>
                {!isCollapsed && <span className="admin-sidebar-label">{item.label}</span>}
              </button>
            ))}
          </div>

          <div className="admin-sidebar-section">
            <div className="admin-sidebar-section-title">{!isCollapsed && "SETTINGS"}</div>
            {settingsItems.map((item) => (
              <button
                key={item.id}
                className={`admin-sidebar-item ${activeTab === item.id ? "active" : ""}`}
                onClick={() => handleNav(item.id)}
              >
                <span className="admin-sidebar-icon">
                  <item.icon />
                </span>
                {!isCollapsed && <span className="admin-sidebar-label">{item.label}</span>}
              </button>
            ))}
          </div>

          <div className="admin-sidebar-footer">
            <button className="admin-sidebar-item admin-sidebar-logout" onClick={handleLogout}>
              <span className="admin-sidebar-icon">
                <LogoutIcon />
              </span>
              {!isCollapsed && <span className="admin-sidebar-label">Logout</span>}
            </button>
          </div>
        </nav>
      </aside>
    </>
  );
};

export default AdminSidebar;
