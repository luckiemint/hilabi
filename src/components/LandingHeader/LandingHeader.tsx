import { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";
import "./LandingHeader.css";

export default function LandingHeader() {
  const navigate = useNavigate();
  const location = useLocation();
  const [stuck, setStuck] = useState(false);
  const [mob, setMob] = useState(false);

  useEffect(() => {
    const fn = () => setStuck(window.scrollY > 24);
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mob ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mob]);

  const go = (path: string) => {
    navigate(path);
    setMob(false);
  };

  const { pathname, hash } = location;
  const isFeaturesActive = pathname === "/product" && (hash === "#features" || hash === "" || !hash);
  const isPricingActive = pathname === "/product" && hash === "#pricing";
  const isAboutActive = pathname === "/company" && (hash === "#about" || hash === "" || !hash);

  return (
    <>
      <nav className={`landing-nav ${stuck ? "stuck" : ""}`}>
        <Link
          to="/"
          className={`landing-nav-logo ${pathname === "/" ? "active" : ""}`}
          onClick={(e) => {
            if (location.pathname === "/" && !location.hash) {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: "smooth" });
            }
          }}
        >
          Hila<em>bi</em>
        </Link>
        <div className="landing-nav-links">
          <button
            className={isFeaturesActive ? "active" : ""}
            onClick={() => go("/product#features")}
          >
            Features
          </button>
          <button
            className={isPricingActive ? "active" : ""}
            onClick={() => go("/product#pricing")}
          >
            Pricing
          </button>
          <button
            className={isAboutActive ? "active" : ""}
            onClick={() => go("/company#about")}
          >
            About Us
          </button>
        </div>
        <div className="landing-nav-right">
          <button
            className="landing-btn-ghost"
            onClick={() => {
              go("/login");
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
          >
            Login
          </button>
          <Link to="/get-sticker" className="landing-btn-pill">
            Get Your Sticker
          </Link>
        </div>
        <button
          className="landing-nav-ham"
          onClick={() => setMob(true)}
          aria-label="Menu"
        >
          <Menu size={22} />
        </button>
      </nav>

      {mob && (
        <div className="landing-mob">
          <button
            className="landing-mob-close"
            onClick={() => setMob(false)}
            aria-label="Close menu"
          >
            <X size={24} />
          </button>
          <button
            className={`landing-mob-lnk ${isFeaturesActive ? "active" : ""}`}
            onClick={() => go("/product#features")}
          >
            Features
          </button>
          <button
            className={`landing-mob-lnk ${isPricingActive ? "active" : ""}`}
            onClick={() => go("/product#pricing")}
          >
            Pricing
          </button>
          <button
            className={`landing-mob-lnk ${isAboutActive ? "active" : ""}`}
            onClick={() => go("/company#about")}
          >
            About Us
          </button>
          <button
            className="landing-mob-lnk"
            onClick={() => {
              go("/login");
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
          >
            Login
          </button>
          <Link
            to="/get-sticker"
            className="landing-mob-cta"
            onClick={() => setMob(false)}
          >
            Get Your Sticker
          </Link>
        </div>
      )}
    </>
  );
}
