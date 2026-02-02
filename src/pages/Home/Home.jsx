import { useNavigate } from "react-router-dom";
import "./Home.css";
import Header from "../../components/header/Header";

function HomePage() {
  const navigate = useNavigate();

  return (
    <>
      {/* Header */}
      <Header />

      {/* Hero Section */}
      <div className="hero-section">
        <div className="badge">Smart Vehicle Management</div>

        <h2 className="hero-title">
          Welcome to <span className="gradient-text">Hilabi</span>
        </h2>

        <p className="hero-description">
          Seamless vehicle access management for your community
        </p>

        {/* Mobile Quick Actions */}
        <div className="quick-actions">
          <button
            className="quick-action-btn blue"
            onClick={() => navigate("/owner/dashboard")}
          >
            <svg className="quick-action-icon" viewBox="0 0 24 24">
              <path
                d="M5 17h14v-6H5v6zm4-4h6v2H9v-2z"
                fill="currentColor"
                stroke="none"
              />
              <path
                d="M5 9l7-5 7 5"
                stroke="currentColor"
                fill="none"
                strokeWidth="2"
              />
            </svg>
            <span className="quick-action-label">Vehicle Owner</span>
          </button>
          
          <button
            className="quick-action-btn green"
            onClick={() => navigate("/visitor/dashboard")}
          >
            <svg className="quick-action-icon" viewBox="0 0 24 24">
              <path
                d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"
                stroke="currentColor"
                fill="none"
                strokeWidth="2"
              />
              <circle
                cx="9"
                cy="7"
                r="4"
                stroke="currentColor"
                fill="none"
                strokeWidth="2"
              />
              <path
                d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75"
                stroke="currentColor"
                fill="none"
                strokeWidth="2"
              />
            </svg>
            <span className="quick-action-label">Visitor</span>
          </button>

           <button
            className="quick-action-btn purple"
            onClick={() => navigate("/admin/dashboard")}
          >
            <svg className="quick-action-icon" viewBox="0 0 24 24">
              <path
                d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"
                fill="currentColor"
                stroke="none"
              />
            </svg>
            <span className="quick-action-label">Admin</span>
          </button>
        </div>

        {/* Mobile Featured Card */}
        <div className="featured-card">
          <h3 className="featured-title">Activate Your Tag</h3>
          <p className="featured-description">
            Quick and easy setup in minutes
          </p>
          <button
            className="featured-btn"
            onClick={() => navigate("/registration/activate")}
          >
            <span>Start Now</span>
            <svg
              className="icon"
              viewBox="0 0 24 24"
              style={{ width: "20px", height: "20px" }}
            >
              <line x1="5" y1="12" x2="19" y2="12" />
              <polyline points="12 5 19 12 12 19" />
            </svg>
          </button>
        </div>

        {/* Desktop Navigation Cards */}
        <div className="nav-cards">
          <div
            className="nav-card blue"
            onClick={() => navigate("/owner/dashboard")}
          >
            <div className="nav-card-icon blue">
              <svg
                className="icon"
                viewBox="0 0 24 24"
                style={{ width: "32px", height: "32px" }}
              >
                <path
                  d="M5 17h14v-6H5v6zm4-4h6v2H9v-2z"
                  fill="currentColor"
                  stroke="none"
                />
                <path
                  d="M5 9l7-5 7 5"
                  stroke="currentColor"
                  fill="none"
                  strokeWidth="2"
                />
              </svg>
            </div>
            <h3 className="nav-card-title">Vehicle Owner</h3>
            <p className="nav-card-description">
              Activate tags, manage vehicles, and access your dashboard
            </p>
            <div className="nav-card-link">
              Get Started
              <svg
                className="icon"
                viewBox="0 0 24 24"
                style={{ marginLeft: "8px" }}
              >
                <line x1="5" y1="12" x2="19" y2="12" />
                <polyline points="12 5 19 12 12 19" />
              </svg>
            </div>
          </div>

          <div
            className="nav-card purple"
            onClick={() => navigate("/admin/login")}
          >
            <div className="nav-card-icon purple">
              <svg
                className="icon"
                viewBox="0 0 24 24"
                style={{ width: "32px", height: "32px" }}
              >
                <path
                  d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"
                  fill="currentColor"
                  stroke="none"
                />
              </svg>
            </div>
            <h3 className="nav-card-title">Administrator</h3>
            <p className="nav-card-description">
              Manage system settings, users, and access controls
            </p>
            <div className="nav-card-link">
              Get Started
              <svg
                className="icon"
                viewBox="0 0 24 24"
                style={{ marginLeft: "8px" }}
              >
                <line x1="5" y1="12" x2="19" y2="12" />
                <polyline points="12 5 19 12 12 19" />
              </svg>
            </div>
          </div>

          <div
            className="nav-card green"
            onClick={() => navigate("/visitor/dashboard")}
          >
            <div className="nav-card-icon green">
              <svg
                className="icon"
                viewBox="0 0 24 24"
                style={{ width: "32px", height: "32px" }}
              >
                <path
                  d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"
                  stroke="currentColor"
                  fill="none"
                  strokeWidth="2"
                />
                <circle
                  cx="9"
                  cy="7"
                  r="4"
                  stroke="currentColor"
                  fill="none"
                  strokeWidth="2"
                />
                <path
                  d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75"
                  stroke="currentColor"
                  fill="none"
                  strokeWidth="2"
                />
              </svg>
            </div>
            <h3 className="nav-card-title">Visitor</h3>
            <p className="nav-card-description">
              Quick access for temporary visitors and guests
            </p>
            <div className="nav-card-link">
              Get Started
              <svg
                className="icon"
                viewBox="0 0 24 24"
                style={{ marginLeft: "8px" }}
              >
                <line x1="5" y1="12" x2="19" y2="12" />
                <polyline points="12 5 19 12 12 19" />
              </svg>
            </div>
          </div>
        </div>

        {/* Desktop CTA */}
        <div className="desktop-cta">
          <h3>Need to Activate a Tag?</h3>
          <p>Start the activation process in just a few clicks</p>
          <button
            className="desktop-cta-btn"
            onClick={() => navigate("/registration/activate")}
          >
            <span>Activate Now</span>
            <svg
              className="icon"
              viewBox="0 0 24 24"
              style={{ width: "20px", height: "20px" }}
            >
              <line x1="5" y1="12" x2="19" y2="12" />
              <polyline points="12 5 19 12 12 19" />
            </svg>
          </button>
        </div>
      </div>

      {/* Footer */}
      <footer className="footer">
        <p>© 2025 Hilabi. All rights reserved.</p>
      </footer>
    </>
  );
}

export default HomePage;
