import { useState, useEffect, ReactNode } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Menu, X, Twitter, Linkedin, Instagram, Phone } from "lucide-react";

const layoutCss = `
@import url('https://fonts.googleapis.com/css2?family=Syne:wght@700;800&family=Inter:wght@300;400;500&display=swap');
*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
:root { --bg: #080809; --surf: #111113; --surf2: #19191c; --border: rgba(255,255,255,0.07); --white: #f5f4f1; --muted: rgba(245,244,241,0.55); --accent: #e8ff50; --dsp: 'Syne', sans-serif; --body: 'Inter', sans-serif; }
html { scroll-behavior: smooth; }
body { background: var(--bg); color: var(--white); font-family: var(--body); -webkit-font-smoothing: antialiased; overflow-x: hidden; }

.nav { position: fixed; top: 0; left: 0; right: 0; z-index: 200; height: 72px; padding: 0 60px; display: flex; align-items: center; justify-content: space-between; transition: background 0.4s, border-color 0.4s; border-bottom: 1px solid transparent; }
.nav.stuck { background: rgba(8,8,9,0.9); backdrop-filter: blur(24px); border-color: var(--border); }
.nav-logo { font-family: var(--dsp); font-size: 20px; font-weight: 800; letter-spacing: -0.03em; cursor: pointer; text-decoration: none; color: inherit; }
.nav-logo em { color: var(--accent); font-style: normal; }
.nav-links { display: flex; gap: 40px; }
.nav-links button { background: none; border: none; cursor: pointer; font-family: var(--body); font-size: 14px; color: rgba(245,244,241,0.70); transition: color .2s; }
.nav-links button:hover { color: var(--white); }
.nav-right { display: flex; gap: 10px; align-items: center; }
.btn-ghost { background: none; border: 1px solid transparent; cursor: pointer; font-family: var(--body); font-size: 14px; color: rgba(245,244,241,0.70); padding: 8px 20px; border-radius: 40px; transition: all .2s; }
.btn-ghost:hover { color: var(--white); border-color: var(--border); }
.btn-pill { background: var(--accent); border: none; cursor: pointer; font-family: var(--dsp); font-size: 13px; font-weight: 700; color: #0a0a0a; padding: 10px 24px; border-radius: 40px; letter-spacing: .02em; transition: all .22s; text-decoration: none; display: inline-flex; align-items: center; }
.btn-pill:hover { background: #e2ff40; transform: translateY(-1px); box-shadow: 0 6px 24px rgba(212,255,0,.25); }
.nav-ham { display: none; background: none; border: none; cursor: pointer; color: var(--white); }

.mob { position: fixed; inset:0; z-index:300; background: rgba(8,8,9,.97); backdrop-filter: blur(24px); display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 4px; }
.mob-close { position: absolute; top: 22px; right: 24px; background: none; border: none; cursor: pointer; color: var(--muted); }
.mob-lnk { background: none; border: none; cursor: pointer; font-family: var(--dsp); font-size: 34px; font-weight: 800; color: rgba(245,244,241,.35); letter-spacing: -.03em; padding: 10px 20px; transition: color .2s; }
.mob-lnk:hover { color: var(--white); }
.mob-cta { background: var(--accent); border: none; cursor: pointer; font-family: var(--dsp); font-size: 16px; font-weight: 700; color: #0a0a0a; padding: 16px 48px; border-radius: 40px; margin-top: 20px; text-decoration: none; display: inline-block; }

.ftr-wrap { background: var(--surf); border-top: 1px solid var(--border); }
.ftr { max-width: 1200px; margin: 0 auto; }
.ftr-top { display: grid; grid-template-columns: 1.4fr 2fr 1.2fr; gap: 80px; padding: 88px 60px 64px; }
.ftr-logo { font-family: var(--dsp); font-size: 22px; font-weight: 800; letter-spacing: -.03em; margin-bottom: 16px; }
.ftr-logo em { color: var(--accent); font-style: normal; }
.ftr-tag { font-size: 14px; color: var(--muted); line-height: 1.75; font-weight: 300; margin-bottom: 28px; }
.ftr-soc { display: flex; gap: 10px; }
.soc-btn { width: 36px; height: 36px; border-radius: 10px; border: 1px solid var(--border); background: var(--surf2); display: flex; align-items: center; justify-content: center; color: var(--muted); text-decoration: none; transition: all .2s; cursor: pointer; }
.soc-btn:hover { color: var(--white); border-color: rgba(255,255,255,.15); }
.ftr-cols { display: grid; grid-template-columns: repeat(2,1fr); gap: 40px; }
.ftr-col h4 { font-family: var(--dsp); font-size: 11px; font-weight: 700; letter-spacing: .1em; text-transform: uppercase; margin-bottom: 20px; }
.ftr-col a { display: block; font-size: 14px; font-weight: 300; color: var(--muted); text-decoration: none; margin-bottom: 12px; transition: color .2s; }
.ftr-col a:hover { color: var(--white); }
.ftr-nl h4 { font-family: var(--dsp); font-size: 11px; font-weight: 700; letter-spacing: .1em; text-transform: uppercase; margin-bottom: 12px; }
.ftr-nl p { font-size: 13px; color: #ffffff; margin-bottom: 18px; font-weight: 300; line-height: 1.7; }
.nl-field { display: flex; align-items: center; gap: 10px; background: var(--surf2); border: 1px solid var(--border); border-radius: 12px; padding: 11px 14px; margin-bottom: 8px; }
.nl-field svg { color: var(--muted); flex-shrink: 0; }
.nl-field input { background: none; border: none; outline: none; font-family: var(--body); font-size: 13px; color: var(--muted); flex:1; }
.nl-field input::placeholder { color: rgba(245,244,241,.22); }
.nl-sub { background: var(--accent); border: none; cursor: pointer; font-family: var(--dsp); font-size: 12px; font-weight: 700; color: #0a0a0a; padding: 11px 0; border-radius: 12px; letter-spacing: .05em; width: 100%; transition: all .2s; }
.nl-sub:hover { background: #e2ff40; }
.ftr-bot { display: flex; justify-content: center; align-items: center; padding: 32px 10px 36px; border-top: 1px solid var(--border); font-size: 13px; color: rgba(245,244,241,.22); }

@media (max-width: 900px) {
  .nav { padding: 0 24px; }
  .nav-links, .nav-right { display: none; }
  .nav-ham { display: flex; }
  .ftr { padding: 64px 24px 28px; }
  .ftr-top { grid-template-columns: 1fr; gap: 48px; }
  .ftr-cols { grid-template-columns: repeat(2,1fr); }
  .ftr-bot { flex-direction: column; gap: 16px; text-align: center; }
}
`;

interface LandingLayoutProps {
  children: ReactNode;
}

export default function LandingLayout({ children }: LandingLayoutProps) {
  const navigate = useNavigate();
  const [stuck, setStuck] = useState(false);
  const [mob, setMob] = useState(false);

  useEffect(() => {
    const fn = () => setStuck(window.scrollY > 24);
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mob ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [mob]);

  const go = (path: string) => {
    navigate(path);
    setMob(false);
  };

  return (
    <>
      <style>{layoutCss}</style>
      <nav className={`nav ${stuck ? "stuck" : ""}`}>
        <Link to="/" className="nav-logo">Hila<em>bi</em></Link>
        <div className="nav-links">
          <button onClick={() => go("/company")}>Company</button>
          <button onClick={() => go("/product")}>Product</button>
        </div>
        <div className="nav-right">
          <button className="btn-ghost" onClick={() => go("/visitor/dashboard")}>Login</button>
          <Link to="/registration/activate" className="btn-pill">Get Your Sticker</Link>
        </div>
        <button className="nav-ham" onClick={() => setMob(true)} aria-label="Menu">
          <Menu size={22} />
        </button>
      </nav>

      {mob && (
        <div className="mob">
          <button className="mob-close" onClick={() => setMob(false)}><X size={24} /></button>
          <button className="mob-lnk" onClick={() => { go("/company"); setMob(false); }}>Company</button>
          <button className="mob-lnk" onClick={() => { go("/product"); setMob(false); }}>Product</button>
          <button className="mob-lnk" onClick={() => go("/visitor/dashboard")}>Login</button>
          <Link to="/registration/activate" className="mob-cta" onClick={() => setMob(false)}>Get Your Sticker</Link>
        </div>
      )}

      {children}

      <div className="ftr-wrap">
        <footer className="ftr">
          <div className="ftr-top">
            <div>
              <div className="ftr-logo">Hila<em>bi</em></div>
              <p className="ftr-tag">
                Connect with vehicle owners in seconds.<br />
                One scan, instant contact.
              </p>
              <div className="ftr-soc">
                <a href="#" className="soc-btn" aria-label="Twitter"><Twitter size={15} /></a>
                <a href="#" className="soc-btn" aria-label="LinkedIn"><Linkedin size={15} /></a>
                <a href="#" className="soc-btn" aria-label="Instagram"><Instagram size={15} /></a>
              </div>
            </div>
            <div className="ftr-cols">
              <div className="ftr-col">
                <h4>Product</h4>
                <Link to="/product#features">Features</Link>
                <Link to="/product#pricing">Pricing</Link>
                <Link to="/product#how-it-works">How it works?</Link>
              </div>
              <div className="ftr-col">
                <h4>Company</h4>
                <Link to="/company#about">About us</Link>
                <Link to="/company#contact">Contact</Link>
              </div>
            </div>
            <div className="ftr-nl">
              <h4>Have a question?</h4>
              <p>Leave your phone number and we&apos;ll get back to you shortly.</p>
              <div className="nl-field">
                <Phone size={15} />
                <input type="tel" placeholder="+1 (555) 000-0000" />
              </div>
              <button className="nl-sub">Request a Call</button>
            </div>
          </div>
          <div className="ftr-bot">
            <p>© 2025 Hilabi. All rights reserved.</p>
          </div>
        </footer>
      </div>
    </>
  );
}
