import { useNavigate } from "react-router-dom";
import "./Header.css";

const Header = () => {
  const navigate = useNavigate();
  return (
    <header className="header">
      <div className="header-content">
        <div className="logo-container" onClick={() => navigate("/")}>
          <div className="logo-icon">
            <svg
              className="icon"
              viewBox="0 0 24 24"
              style={{ width: "20px", height: "20px" }}
            >
              <path
                d="M5 17h14v-6H5v6zm4-4h6v2H9v-2z"
                fill="currentColor"
                stroke="none"
              />
              <path d="M5 9l7-5 7 5" />
            </svg>
          </div>
          <h1 className="logo-text">Hilabi</h1>
        </div>
      </div>
    </header>
  );
};

export default Header;
