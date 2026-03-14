import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { Link, useNavigate } from "react-router-dom";
import { Menu, X, Mail, Phone, LogOut } from "lucide-react";
import "./Header.css";

const SUPPORT_EMAIL = "hilabi.app@gmail.com";
const SUPPORT_PHONE = "+91 983579025";

const Header = () => {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  const handleLogout = () => {
    setMenuOpen(false);
    navigate("/login");
  };

  const handleMail = () => {
    setMenuOpen(false);
    window.location.href = `mailto:${SUPPORT_EMAIL}`;
  };

  const handlePhone = () => {
    setMenuOpen(false);
    window.location.href = `tel:${SUPPORT_PHONE.replace(/\s/g, "")}`;
  };

  return (
    <header className="header">
      <div className="header-content">
        <Link to="/" className="header-logo">
          Hila<em>bi</em>
        </Link>

        {/* Desktop menu */}
        <nav className="header-nav">
          <a
            href={`mailto:${SUPPORT_EMAIL}`}
            className="header-nav-item"
            title="Support email"
          >
            <Mail size={18} />
            <span>Support</span>
          </a>
          <a
            href={`tel:${SUPPORT_PHONE.replace(/\s/g, "")}`}
            className="header-nav-item"
            title="Support phone"
          >
            <Phone size={18} />
            <span>{SUPPORT_PHONE}</span>
          </a>
          <button
            type="button"
            className="header-nav-item header-logout"
            onClick={handleLogout}
            title="Logout"
          >
            <LogOut size={18} />
            <span>Logout</span>
          </button>
        </nav>

        {/* Mobile menu button */}
        <button
          type="button"
          className="header-ham"
          onClick={() => setMenuOpen(true)}
          aria-label="Open menu"
        >
          <Menu size={24} />
        </button>
      </div>

      {/* Mobile menu panel - portal to body so fixed positioning works */}
      {menuOpen &&
        createPortal(
          <>
            <div
              className="header-mob-backdrop"
              onClick={() => setMenuOpen(false)}
              aria-hidden="true"
            />
            <div className="header-mob">
              <button
                type="button"
                className="header-mob-close"
                onClick={() => setMenuOpen(false)}
                aria-label="Close menu"
              >
                <X size={24} />
              </button>

              <div className="header-mob-inner">
                <h3 className="header-mob-title">Reach Us At</h3>
                <div className="header-mob-divider" />
                <nav className="header-mob-nav">
                  <a
                    href={`mailto:${SUPPORT_EMAIL}`}
                    className="header-mob-item"
                    onClick={handleMail}
                  >
                    <span className="header-mob-icon"><Mail size={20} /></span>
                    <span>{SUPPORT_EMAIL}</span>
                  </a>
                  <a
                    href={`tel:${SUPPORT_PHONE.replace(/\s/g, "")}`}
                    className="header-mob-item"
                    onClick={handlePhone}
                  >
                    <span className="header-mob-icon"><Phone size={20} /></span>
                    <span>{SUPPORT_PHONE}</span>
                  </a>
                </nav>
                <div className="header-mob-divider" />
                <button
                  type="button"
                  className="header-mob-item header-mob-logout"
                  onClick={handleLogout}
                >
                  <span className="header-mob-icon"><LogOut size={20} /></span>
                  <span>Logout</span>
                </button>
              </div>
            </div>
          </>,
          document.body
        )}
    </header>
  );
};

export default Header;
