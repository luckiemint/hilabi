import { Link } from "react-router-dom";
import { Twitter, Linkedin, Instagram, Phone } from "lucide-react";
import "./LandingFooter.css";

export default function LandingFooter() {
  return (
    <div className="landing-ftr-wrap">
      <footer className="landing-ftr">
        <div className="landing-ftr-top">
          <div>
            <div className="landing-ftr-logo">
              Hila<em>bi</em>
            </div>
            <p className="landing-ftr-tag">
              Connect with vehicle owners in seconds.
              <br />
              One scan, instant contact.
            </p>
            <div className="landing-ftr-soc">
              <a href="#" className="landing-soc-btn" aria-label="Twitter">
                <Twitter size={15} />
              </a>
              <a href="#" className="landing-soc-btn" aria-label="LinkedIn">
                <Linkedin size={15} />
              </a>
              <a href="#" className="landing-soc-btn" aria-label="Instagram">
                <Instagram size={15} />
              </a>
            </div>
          </div>
          <div className="landing-ftr-cols">
            <div className="landing-ftr-col">
              <h4>Product</h4>
              <Link to="/product#features">Features</Link>
              <Link to="/product#pricing">Pricing</Link>
              <Link to="/product#how-it-works">How it works?</Link>
            </div>
            <div className="landing-ftr-col">
              <h4>Company</h4>
              <Link to="/company#about">About us</Link>
              <Link to="/company#contact">Contact</Link>
            </div>
          </div>
          <div className="landing-ftr-nl">
            <h4>Have a question?</h4>
            <p>Leave your phone number and we&apos;ll get back to you shortly.</p>
            <div className="landing-nl-field">
              <Phone size={15} />
              <input type="tel" placeholder="+1 (555) 000-0000" />
            </div>
            <button className="landing-nl-sub" type="button">
              Request a Call
            </button>
          </div>
        </div>
        <div className="landing-ftr-bot">
          <p>© 2025 Hilabi. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
