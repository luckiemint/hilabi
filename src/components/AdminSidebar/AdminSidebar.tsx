import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  QrCode,
  Users,
  User,
  LogOut,
  ChevronLeft,
  ChevronRight,
  LayoutGrid,
} from "lucide-react";
import "./AdminSidebar.css";

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
  const isCollapsed =
    onCollapsedChange !== undefined ? collapsed : internalCollapsed;

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
    { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
    { id: "qrgenerate", label: "QR Management", icon: QrCode },
    { id: "users", label: "User Management", icon: Users },
  ];

  const settingsItems = [
    { id: "profile", label: "Profile", icon: User },
  ];

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
              <LayoutGrid size={28} strokeWidth={2} color="#2563eb" />
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
          {isCollapsed ? <ChevronRight size={20} /> : <ChevronLeft size={20} />}
        </button>

        <nav className="admin-sidebar-nav">
          <div className="admin-sidebar-section">
            <div className="admin-sidebar-section-title">
              {!isCollapsed && "MAIN MENU"}
            </div>
            {mainItems.map((item) => (
              <button
                key={item.id}
                className={`admin-sidebar-item ${activeTab === item.id ? "active" : ""}`}
                onClick={() => handleNav(item.id)}
              >
                <span className="admin-sidebar-icon">
                  <item.icon size={22} strokeWidth={2} />
                </span>
                {!isCollapsed && (
                  <span className="admin-sidebar-label">{item.label}</span>
                )}
              </button>
            ))}
          </div>

          <div className="admin-sidebar-section">
            <div className="admin-sidebar-section-title">
              {!isCollapsed && "SETTINGS"}
            </div>
            {settingsItems.map((item) => (
              <button
                key={item.id}
                className={`admin-sidebar-item ${activeTab === item.id ? "active" : ""}`}
                onClick={() => handleNav(item.id)}
              >
                <span className="admin-sidebar-icon">
                  <item.icon size={22} strokeWidth={2} />
                </span>
                {!isCollapsed && (
                  <span className="admin-sidebar-label">{item.label}</span>
                )}
              </button>
            ))}
          </div>

          <div className="admin-sidebar-footer">
            <button
              className="admin-sidebar-item admin-sidebar-logout"
              onClick={handleLogout}
            >
              <span className="admin-sidebar-icon">
                <LogOut size={22} strokeWidth={2} />
              </span>
              {!isCollapsed && (
                <span className="admin-sidebar-label">Logout</span>
              )}
            </button>
          </div>
        </nav>
      </aside>
    </>
  );
};

export default AdminSidebar;
