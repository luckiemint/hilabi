import {  useEffect, useRef } from "react";
import LandingLayout from "../../components/LandingLayout/LandingLayout";
import {
  QrCode,
  ScanLine,
  Bell,
  CheckCircle,
  ShieldCheck,
  Smartphone,
  EyeOff,
  Car,
  Zap,
} from "lucide-react";

const css = `
@import url('https://fonts.googleapis.com/css2?family=Syne:wght@700;800&family=Inter:wght@300;400;500&display=swap');

*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

:root {
  --bg:      #080809;
  --surf:    #111113;
  --surf2:   #19191c;
  --border:  rgba(255,255,255,0.07);
  --white:   #f5f4f1;
  --muted:   rgba(245,244,241,0.55);
  --accent:  #e8ff50;
  --dsp:     'Syne', sans-serif;
  --body:    'Inter', sans-serif;
}

html { scroll-behavior: smooth; }
body { background: var(--bg); color: var(--white); font-family: var(--body); -webkit-font-smoothing: antialiased; overflow-x: hidden; }

/* CANVAS BG */
.hero-canvas { position: absolute; inset: 0; width: 100%; height: 100%; pointer-events: none; z-index: 0; }

/* HERO */
.hero {
  min-height: 100vh;
  padding: 120px 60px 60px;
  display: flex; flex-direction: column; align-items: center; justify-content: center;
  text-align: center; position: relative; overflow: hidden;
}
.hero-inner {
  display: flex; flex-direction: row; align-items: center; justify-content: center; 
  gap: 80px; width: 100%; max-width: 1000px; position: relative; z-index: 1;
}
.hero-left {
  flex: 1; display: flex; flex-direction: column; align-items: flex-start; text-align: left;
  min-width: 0;
}
.hero-right {
  flex-shrink: 0; display: flex; align-items: center; justify-content: center;
  opacity: 0; animation: up .7s .35s ease forwards;
}
.hero::after {
  content: ''; position: absolute; top: -15%; left: 20%; transform: translateX(-50%);
  width: 800px; height: 700px;
  background: radial-gradient(ellipse, rgba(212,255,0,.07) 0%, transparent 60%);
  pointer-events: none;
}
.hero-grid {
  position: absolute; inset: 0; pointer-events: none;
  background-image: linear-gradient(rgba(255,255,255,.02) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.02) 1px, transparent 1px);
  background-size: 72px 72px;
  -webkit-mask-image: radial-gradient(ellipse 90% 70% at 40% 40%, black, transparent);
  mask-image: radial-gradient(ellipse 90% 70% at 40% 40%, black, transparent);
}

/* eyebrow */
.eyebrow {
  display: inline-flex; align-items: center; gap: 8px;
  border: 1px solid rgba(212,255,0,.2); background: rgba(212,255,0,.06);
  border-radius: 40px; padding: 7px 18px 7px 12px;
  margin-bottom: 32px;
  opacity: 0; animation: up .55s .15s ease forwards;
}
.edot { width: 7px; height: 7px; border-radius: 50%; background: var(--accent); box-shadow: 0 0 10px var(--accent); animation: blink 2.2s infinite; }
@keyframes blink { 0%,100%{opacity:1;transform:scale(1)} 50%{opacity:.5;transform:scale(.8)} }
.eyebrow span { font-size: 11px; font-weight: 500; letter-spacing: .1em; text-transform: uppercase; color: var(--accent); }

/* headline */
.hl {
  font-family: var(--dsp);
  font-size: clamp(48px, 7.5vw, 96px);
  font-weight: 800;
  line-height: 1.02;
  letter-spacing: -0.045em;
  margin-bottom: 32px; z-index: 1;
}
.hl-w {
  display: block;
  opacity: 0; transform: translateY(28px);
  animation: up .6s ease forwards;
}
.hl-w:nth-child(1) { color: var(--white);  animation-delay: .3s; }
.hl-w:nth-child(2) { color: var(--accent); animation-delay: .5s; }
/* FIX 4: Change third headline word from gray to a visible teal/cyan tint */
.hl-w:nth-child(3) { color: rgba(160,220,255,0.55); animation-delay: .7s; }

@keyframes up { to { opacity:1; transform:translateY(0); } }

/* sub */
.hero-sub {
  font-size: clamp(15px, 1.5vw, 18px); font-weight: 300; line-height: 1.8;
  color: #ffffff; max-width: 440px;
  
}

/* steps */
.steps {
  display: flex; align-items: center; justify-content: flex-start;
  margin: 44px 0;
  opacity: 0; animation: up .6s 1.05s ease forwards;
}
.step { display: flex; flex-direction: column; align-items: center; gap: 10px; padding: 0 32px; }
.step-ic {
  width: 52px; height: 52px; border-radius: 14px;
  border: 1px solid var(--border); background: var(--surf2);
  display: flex; align-items: center; justify-content: center;
  transition: all .3s;
}
.step-ic svg { color: var(--muted); transition: color .3s; }
.step.on .step-ic { border-color: rgba(212,255,0,.35); background: rgba(212,255,0,.08); box-shadow: 0 0 22px rgba(212,255,0,.1); }
.step.on .step-ic svg { color: var(--accent); }
.step-name { font-family: var(--dsp); font-size: 12px; font-weight: 700; letter-spacing: .07em; text-transform: uppercase; color: #fff; }
.step.on .step-name { color: var(--accent); }
.step-hint { font-size: 11px; color: #e5e7eb }
.arr { color: rgba(255,255,255,.14); font-size: 18px; padding-bottom: 22px; }

/* TRUST BADGES */
.trust-row {
  display: flex; align-items: center; gap: 20px; flex-wrap: wrap; justify-content: flex-start;
  margin-bottom: 0;
  margin-top: 20px;
  opacity: 0; animation: up .6s 1.1s ease forwards;
}
.trust-badge {
  display: flex; align-items: center; gap: 10px;
  font-size: 16px; font-weight: 500; color: rgba(255,255,255,.9);
  letter-spacing: .02em;
}
.trust-badge svg { color: var(--accent); flex-shrink: 0; }
.trust-sep { width: 3px; height: 3px; border-radius: 50%; background: rgba(255,255,255,.15); }

/* DEMO FLOW */
.demo-flow {
  width: 100%;
  display: flex; align-items: center; justify-content: center; gap: 0;
  align-self: center;
  background: var(--surf); border: 1px solid var(--border);
  border-radius: 20px; padding: 20px 28px;
  margin-bottom: 40px; align-self: flex-start;
  overflow: hidden; position: relative;
  opacity: 0; animation: up .6s 1.15s ease forwards;
}
.demo-flow::before {
  content: '';
  position: absolute; inset: 0;
  background: linear-gradient(90deg, transparent 0%, rgba(212,255,0,.03) 50%, transparent 100%);
  pointer-events: none;
}
.demo-node {
  display: flex; flex-direction: column; align-items: center; gap: 8px;
  padding: 0 20px;
}
.demo-icon-wrap {
  width: 48px; height: 48px; border-radius: 14px;
  border: 1px solid var(--border); background: var(--surf2);
  display: flex; align-items: center; justify-content: center;
  position: relative; transition: all .3s;
}
.demo-icon-wrap.pulse-node {
  border-color: rgba(212,255,0,.3);
  background: rgba(212,255,0,.07);
  animation: nodePulse 2.4s ease-in-out infinite;
}
@keyframes nodePulse {
  0%,100% { box-shadow: 0 0 0 0 rgba(212,255,0,.0); }
  50% { box-shadow: 0 0 0 6px rgba(212,255,0,.12); }
}
.demo-icon-wrap svg { color: var(--muted); }
.demo-icon-wrap.pulse-node svg { color: var(--accent); }
.demo-label { font-size: 11px; font-weight: 500; letter-spacing: .06em; text-transform: uppercase; color: #7594c0; }
.demo-label.active { color: var(--accent); }
.demo-arrow {
  display: flex; flex-direction: column; align-items: center; padding-bottom: 20px;
}
.demo-arrow-line {
  width: 32px; height: 1px;
  background: linear-gradient(90deg, rgba(212,255,0,.3), rgba(212,255,0,.1));
  position: relative; overflow: visible;
}
.demo-arrow-dot {
  position: absolute; top: -3px; left: -4px;
  width: 7px; height: 7px; border-radius: 50%;
  background: var(--accent);
  box-shadow: 0 0 8px var(--accent);
  animation: slideRight 2.4s ease-in-out infinite;
}
.demo-arrow-dot:nth-child(2) { animation-delay: .8s; }
.demo-arrow-dot:nth-child(3) { animation-delay: 1.6s; }
@keyframes slideRight {
  0%   { left: -4px; opacity: 0; }
  15%  { opacity: 1; }
  85%  { opacity: 1; }
  100% { left: 30px; opacity: 0; }
}
@keyframes slideRightSm {
  0%   { left: -3px; opacity: 0; }
  15%  { opacity: 1; }
  85%  { opacity: 1; }
  100% { left: 24px; opacity: 0; }
}

/* cta */
.cta-wrap {
  display: flex; flex-direction: column; align-items: flex-start; gap: 16px;
  opacity: 0; animation: up .6s 1.2s ease forwards;
}
.cta-row { display: flex; gap: 12px; flex-wrap: wrap; justify-content: flex-start; }
.cta-pill {
  display: flex; align-items: center; gap: 10px;
  background: var(--surf); border: 1px solid var(--border);
  border-radius: 40px; padding: 13px 24px; width: 280px;
  cursor: pointer; transition: border-color .2s;
}
.cta-pill:hover { border-color: rgba(255,255,255,.14); }
.cta-pill svg { color: var(--muted); flex-shrink: 0; }
.cta-pill input { background: none; border: none; outline: none; font-family: var(--body); font-size: 13px; color: var(--white); cursor: pointer; width: 100%; }
.cta-pill input::placeholder { color: rgba(245,244,241,.28); }
.cta-btn {
  background: var(--accent); border: none; cursor: pointer;
  font-family: var(--dsp); font-size: 14px; font-weight: 700;
  color: #0a0a0a; padding: 13px 28px; border-radius: 40px;
  display: flex; align-items: center; gap: 8px;
  transition: all .25s; white-space: nowrap;
}
.cta-btn:hover { background: #e2ff40; transform: translateY(-2px); box-shadow: 0 10px 32px rgba(212,255,0,.28); }
.cta-note { font-size: 12px; color: rgba(245,244,241,.2); letter-spacing: .04em; }

/* Hero bottom */
.hero-bottom {
  width: 100%; max-width: 1200px; margin: 0 auto;
  display: flex; flex-direction: column; align-items: center;
  position: relative; z-index: 1;
  align-self: stretch;
}

.scue {
  position: absolute; bottom: 40px; left: 50%; transform: translateX(-50%);
  display: flex; flex-direction: column; align-items: center; gap: 10px;
  opacity: 0; animation: up .6s 1.6s ease forwards;
}
.scue span { font-size: 10px; letter-spacing: .14em; text-transform: uppercase; color: rgba(255,255,255,.18); }
.scue-bar { width: 1px; height: 44px; background: linear-gradient(to bottom, rgba(212,255,0,.45), transparent); animation: drip 1.9s ease-in-out infinite; }
@keyframes drip {
  0%   { transform: scaleY(0); transform-origin: top; opacity:1; }
  60%  { transform: scaleY(1); transform-origin: top; opacity:1; }
  100% { transform: scaleY(1); transform-origin: bottom; opacity:0; }
}

/* PROOF BAR */
.proof {
  border-top: 1px solid var(--border); border-bottom: 1px solid var(--border);
  background: var(--surf);
  padding: 56px 60px;
  display: flex; align-items: center; justify-content: center;
}
.proof-item { flex: 1; text-align: center; }
.proof-num { font-family: var(--dsp); font-size: clamp(38px,4vw,54px); font-weight: 800; letter-spacing: -0.04em; line-height: 1; }
.proof-num em { color: var(--accent); font-style: normal; }
.proof-lbl { margin-top: 10px; font-size: 13px; font-weight: 300; color: var(--muted); }
.proof-div { width: 1px; height: 56px; background: var(--border); flex-shrink: 0; }

/* HOW */
.how { padding: 80px 60px; max-width: 1200px; margin: 0 auto; }
.sec-eye { font-size: 11px; font-weight: 500; letter-spacing: .12em; text-transform: uppercase; color: var(--accent); margin-bottom: 24px; }
.sec-title { font-family: var(--dsp); font-size: clamp(44px,6vw,72px); font-weight: 800; line-height: 1.04; letter-spacing: -0.04em; margin-bottom: 72px; }
/* FIX 4: "Zero friction." was gray — change to visible muted blue-white */
.sec-title span { color: rgba(160,220,255,0.45); }
.how-grid { display: grid; grid-template-columns: repeat(3,1fr); gap: 1px; background: var(--border); border-radius: 20px; overflow: hidden; }
.how-card { background: var(--surf); padding: 52px 40px; position: relative; overflow: hidden; transition: background .3s; }
.how-card:hover { background: var(--surf2); }
.how-card::before { content: ''; position: absolute; top:0; left:0; right:0; height:1px; background: transparent; transition: background .3s; }
.how-card:hover::before { background: linear-gradient(90deg, transparent, var(--accent), transparent); }
.how-card::after { content: attr(data-n); position: absolute; bottom: -12px; right: 20px; font-family: var(--dsp); font-size: 110px; font-weight: 800; letter-spacing: -.06em; color: rgba(255,255,255,.03); line-height:1; pointer-events:none; }
.hc-icon { width: 48px; height: 48px; border-radius: 13px; background: rgba(212,255,0,.07); border: 1px solid rgba(212,255,0,.18); display: flex; align-items: center; justify-content: center; margin-bottom: 28px; }
.hc-icon svg { color: var(--accent); }
.how-card h3 { font-family: var(--dsp); font-size: 22px; font-weight: 700; letter-spacing: -.025em; margin-bottom: 14px; }
.how-card p { font-size: 14px; color: #ffffff; line-height: 1.8; font-weight: 300; }

/* RESPONSIVE */
@media (max-width: 900px) {
  .hero { padding: 100px 24px 80px; }
  .hero-inner { flex-direction: column; gap: 48px; }
  .hero-left { align-items: center; text-align: center; }
  .hero-sub { margin: 0 auto 48px; }
  .hero-right { display: none; }
  .hero-bottom { align-items: center; }
  .arr { display: none; }
  .step { padding: 0 16px; }
  .steps { justify-content: center; }
  .demo-flow { align-self: center; padding: 16px 20px; margin-bottom: 32px; border-radius: 16px; }
  .demo-node { padding: 0 14px; gap: 6px; }
  .demo-icon-wrap { width: 42px; height: 42px; border-radius: 12px; }
  .demo-icon-wrap svg { width: 18px; height: 18px; }
  .demo-label { font-size: 10px; }
  .demo-arrow { padding-bottom: 16px; }
  .demo-arrow-line { width: 24px; }
  .demo-arrow-dot { width: 6px; height: 6px; animation: slideRightSm 2.4s ease-in-out infinite; }
  .demo-arrow-dot:nth-child(2) { animation-delay: .8s; }
  .demo-arrow-dot:nth-child(3) { animation-delay: 1.6s; }
  .trust-row { gap: 14px; justify-content: center; }
  .cta-wrap { align-items: center; }
  .cta-row { justify-content: center; }
  .proof { padding: 44px 24px; flex-wrap: wrap; gap: 36px; }
  .proof-div { display: none; }
  .proof-item { min-width: 120px; }
  .how { padding: 90px 24px; }
  .how-grid { grid-template-columns: 1fr; }
}
@media (max-width: 480px) {
  .demo-flow { padding: 14px 16px; }
  .demo-node { padding: 0 10px; gap: 5px; }
  .demo-icon-wrap { width: 38px; height: 38px; border-radius: 11px; }
  .demo-icon-wrap svg { width: 16px; height: 16px; }
  .demo-label { font-size: 9px; }
  .demo-arrow-line { width: 18px; }
  .demo-arrow-dot { width: 5px; height: 5px; animation: slideRightSm 2.4s ease-in-out infinite; }
  .demo-arrow-dot:nth-child(2) { animation-delay: .8s; }
  .demo-arrow-dot:nth-child(3) { animation-delay: 1.6s; }
  .cta-row { flex-direction: column; width: 100%; }
  .cta-pill { width: 100%; }
  .cta-btn { width: 100%; justify-content: center; }
}
`;

const HOW = [
  {
    n: "01",
    Icon: ScanLine,
    h: "Scan the QR",
    p: "Anyone near your vehicle scans the Hilabi sticker with their phone. No app download required — works instantly in any browser.",
  },
  {
    n: "02",
    Icon: Bell,
    h: "Owner notified",
    p: "You receive an instant SMS or push alert with the message and precise location. Your personal information stays private — always.",
  },
  {
    n: "03",
    Icon: CheckCircle,
    h: "Problem solved",
    p: "Move your car, respond to an emergency, or connect with the finder. Fast, calm, and simple for everyone involved.",
  },
];

const PROOF = [
  { n: "12", s: "k", l: "Stickers Active" },
  { n: "98", s: "%", l: "Issues Resolved" },
  { n: "<2", s: "m", l: "Avg Response Time" },
  { n: "40", s: "+", l: "Cities" },
];

/* ─── STICKER CARD SVG ─── */
function StickerCard() {
  return (
    <svg
      viewBox="0 0 270 368"
      width="270"
      height="368"
      xmlns="http://www.w3.org/2000/svg"
      style={{
        filter:
          "drop-shadow(0 0 40px rgba(212,255,0,0.15)) drop-shadow(0 24px 48px rgba(0,0,0,0.6))",
      }}
    >
      <defs>
        <linearGradient id="scanGlow" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="rgba(212,255,0,0.2)" />
          <stop offset="100%" stopColor="rgba(212,255,0,0)" />
        </linearGradient>
        {/* clip card corners */}
        <clipPath id="cardClip">
          <rect x="0" y="0" width="270" height="368" rx="18" ry="18" />
        </clipPath>
      </defs>

      {/* Card background */}
      <rect x="0" y="0" width="270" height="368" rx="18" ry="18" fill="#0f0f11" />
      {/* Card border */}
      <rect x="1" y="1" width="268" height="366" rx="17" ry="17" fill="none" stroke="rgba(212,255,0,0.25)" strokeWidth="1.5" />
    

      {/* HILABI text */}
      <text x="135" y="44" textAnchor="middle" fontFamily="'Syne', sans-serif" fontWeight="800" fontSize="26" letterSpacing="4" fill="#f5f4f1">
        HILABI
      </text>

      {/* QR frame outer border */}
      <rect x="22" y="58" width="226" height="196" rx="12" ry="12" fill="none" stroke="rgba(212,255,0,0.35)" strokeWidth="2" />

      {/* QR scan corner brackets */}
      <path d="M36 78 L36 68 L46 68" fill="none" stroke="#d4ff00" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M234 78 L234 68 L224 68" fill="none" stroke="#d4ff00" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M36 236 L36 246 L46 246" fill="none" stroke="#d4ff00" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M234 236 L234 246 L224 246" fill="none" stroke="#d4ff00" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />

      {/* QR code inner area */}
      <rect x="42" y="76" width="186" height="160" rx="7" fill="#161619" />

      {/* Top-left finder */}
      <rect x="51" y="85" width="46" height="46" rx="4" fill="none" stroke="#d4ff00" strokeWidth="2" />
      <rect x="58" y="92" width="32" height="32" rx="2" fill="rgba(212,255,0,0.13)" />
      <rect x="64" y="98" width="20" height="20" rx="1" fill="#d4ff00" />

      {/* Top-right finder */}
      <rect x="173" y="85" width="46" height="46" rx="4" fill="none" stroke="#d4ff00" strokeWidth="2" />
      <rect x="180" y="92" width="32" height="32" rx="2" fill="rgba(212,255,0,0.13)" />
      <rect x="186" y="98" width="20" height="20" rx="1" fill="#d4ff00" />

      {/* Bottom-left finder */}
      <rect x="51" y="181" width="46" height="46" rx="4" fill="none" stroke="#d4ff00" strokeWidth="2" />
      <rect x="58" y="188" width="32" height="32" rx="2" fill="rgba(212,255,0,0.13)" />
      <rect x="64" y="194" width="20" height="20" rx="1" fill="#d4ff00" />

      {/* Data modules — scaled down */}
      {[
        [114,85],[121,85],[128,85],[135,85],[142,85],[149,85],[156,85],
        [114,92],[128,92],[142,92],[156,92],
        [114,99],[121,99],[135,99],[149,99],[156,99],
        [114,106],[128,106],[135,106],[142,106],
        [121,113],[135,113],[149,113],[156,113],
        [114,120],[121,120],[142,120],[156,120],
        [114,127],[128,127],[135,127],[149,127],
        [51,141],[58,141],[72,141],[79,141],[93,141],[107,141],[121,141],[135,141],[149,141],[163,141],[177,141],[191,141],[198,141],
        [51,148],[65,148],[79,148],[93,148],[114,148],[128,148],[142,148],[170,148],[184,148],[198,148],
        [58,155],[72,155],[86,155],[100,155],[121,155],[135,155],[156,155],[177,155],[191,155],
        [51,162],[65,162],[79,162],[93,162],[107,162],[128,162],[142,162],[163,162],[184,162],[198,162],
        [163,170],[177,170],[191,170],[198,170],
        [163,177],[177,177],[184,177],[198,177],
        [170,184],[191,184],
        [163,191],[177,191],[184,191],[198,191],
        [170,198],[177,198],[191,198],[198,198],
        [163,205],[184,205],[198,205],
        [170,212],[177,212],[191,212],
      ].map(([cx, cy], i) => (
        <rect key={i} x={cx} y={cy} width="5" height="5" rx="1" fill="rgba(212,255,0,0.75)" />
      ))}

      {/* Scan line animation */}
      <rect x="42" y="76" width="186" height="4" rx="2" fill="rgba(212,255,0,0.5)">
        <animateTransform attributeName="transform" type="translate" values="0,0; 0,156; 0,0" dur="3s" repeatCount="indefinite" calcMode="easeInOut" />
        <animate attributeName="opacity" values="0.7;0.4;0.7" dur="3s" repeatCount="indefinite" />
      </rect>
      <rect x="42" y="76" width="186" height="12" rx="2" fill="url(#scanGlow)">
        <animateTransform attributeName="transform" type="translate" values="0,0; 0,152; 0,0" dur="3s" repeatCount="indefinite" calcMode="easeInOut" />
      </rect>

      {/* "SCAN TO CONTACT OWNER" label */}
      <rect x="22" y="264" width="226" height="32" rx="7" fill="rgba(212,255,0,0.08)" />
      <rect x="22" y="264" width="226" height="32" rx="7" fill="none" stroke="rgba(212,255,0,0.2)" strokeWidth="1" />
      <text x="135" y="284" textAnchor="middle" fontFamily="'Syne', sans-serif" fontWeight="700" fontSize="11" letterSpacing="2" fill="#d4ff00">
        SCAN TO CONTACT OWNER
      </text>

      {/* Bottom strip */}
      <rect x="0" y="305" width="270" height="62" rx="0" fill="rgba(212,255,0,0.06)" clipPath="url(#cardClip)" />
      <line x1="0" y1="305" x2="270" y2="305" stroke="rgba(212,255,0,0.15)" strokeWidth="1" />

      {/* Three icons with labels — Wrong Parking | Emergency | Urgent Issue */}
      <g fill="none" stroke="rgba(212,255,0,0.9)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        {/* No parking sign — Wrong Parking */}
        <g transform="translate(55, 322) scale(0.72) translate(-12, -12)">
          <circle cx="12" cy="12" r="10" />
          <path d="M4.93 4.93l14.14 14.14" />
        </g>
        {/* Alert triangle — Emergency */}
        <g transform="translate(135, 322) scale(0.72) translate(-12, -12)">
          <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
          <path d="M12 9v4" />
          <path d="M12 17h.01" />
        </g>
        {/* Zap — Urgent Issue */}
        <g transform="translate(215, 322) scale(0.72) translate(-12, -12)">
          <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
        </g>
      </g>
      <text x="55" y="354" textAnchor="middle" fontFamily="'Inter', sans-serif" fontSize="8.5" fontWeight="500" fill="rgba(255,255,255,0.88)">Wrong Parking</text>
      <text x="135" y="354" textAnchor="middle" fontFamily="'Inter', sans-serif" fontSize="8.5" fontWeight="500" fill="rgba(255,255,255,0.88)">Emergency</text>
      <text x="215" y="354" textAnchor="middle" fontFamily="'Inter', sans-serif" fontSize="8.5" fontWeight="500" fill="rgba(255,255,255,0.88)">Urgent Issue</text>
    </svg>
  );
}

/* ─── BACKGROUND ANIMATION — FIX 3: smooth continuous laser, no halt ─── */
function HeroBg() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    let raf: number | undefined;
    let W = 0;
    let H = 0;

    const resize = () => {
      W = canvas.width = canvas.offsetWidth;
      H = canvas.height = canvas.offsetHeight;
    };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);

    // QR dots grid
    const CELL = 28;
    const dots: { x: number; y: number; size: number; baseAlpha: number }[] = [];
    const buildDots = () => {
      dots.length = 0;
      const cols = Math.ceil(W / CELL) + 2;
      const rows = Math.ceil(H / CELL) + 2;
      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          if (Math.random() > 0.52) {
            dots.push({
              x: c * CELL - CELL / 2,
              y: r * CELL - CELL / 2,
              size: Math.random() * 3 + 2,
              baseAlpha: Math.random() * 0.09 + 0.03,
            });
          }
        }
      }
    };
    buildDots();

    // FIX 3: Use a single continuous fractional position [0..1] that never resets abruptly.
    // We drive laserPos linearly and map it to a sine wave so it eases in/out smoothly
    // at top and bottom — giving the appearance of a natural back-and-forth with no halt.
    let laserPos = 0; // 0 → 1, incremented every frame
    const LASER_SPEED = 0.003; // fraction of the full height per frame (~333 frames for full sweep)

    // signal ripples
    const ripples: { x: number; y: number; r: number; maxR: number; alpha: number; speed: number }[] = [];
    const spawnRipple = () => {
      ripples.push({
        x: W * 0.5 + (Math.random() - 0.5) * W * 0.3,
        y: H * 0.45 + (Math.random() - 0.5) * H * 0.2,
        r: 0,
        maxR: 120 + Math.random() * 80,
        alpha: 0.35,
        speed: 0.8 + Math.random() * 0.5,
      });
    };
    let rippleTimer = 0;

    // floating cars
    const drawCar = (ctx: CanvasRenderingContext2D, x: number, y: number, scale: number, alpha: number) => {
      ctx.save();
      ctx.globalAlpha = alpha;
      ctx.strokeStyle = "rgba(212,255,0,1)";
      ctx.lineWidth = 1.2;
      ctx.translate(x, y);
      ctx.scale(scale, scale);
      ctx.beginPath();
      ctx.moveTo(-36, 6); ctx.lineTo(-36, -4); ctx.lineTo(-22, -14);
      ctx.lineTo(-8, -18); ctx.lineTo(14, -18); ctx.lineTo(28, -10);
      ctx.lineTo(38, -6); ctx.lineTo(38, 6); ctx.closePath();
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(-18, -4); ctx.lineTo(-10, -18);
      ctx.moveTo(22, -4); ctx.lineTo(18, -18);
      ctx.stroke();
      ctx.beginPath(); ctx.arc(-22, 8, 7, 0, Math.PI * 2); ctx.stroke();
      ctx.beginPath(); ctx.arc(24, 8, 7, 0, Math.PI * 2); ctx.stroke();
      ctx.restore();
    };

    const cars = Array.from({ length: 5 }, (_, i) => ({
      x: -120 + i * (300 + 60),
      y: 0,
      speed: 0.18 + Math.random() * 0.14,
      scale: 0.55 + Math.random() * 0.3,
      alpha: 0.06 + Math.random() * 0.07,
      dir: i % 2 === 0 ? 1 : -1,
    }));

    // Reposition cars once W/H are known
    const initCars = () => {
      cars.forEach((car, i) => {
        car.x = -120 + i * (W / 4 + 60);
        car.y = H * 0.18 + (i % 2 === 0 ? 30 : -30);
      });
    };

    let t = 0;
    const draw = () => {
      t++;

      // lazy init cars once canvas has real dimensions
      if (t === 1) initCars();

      ctx.clearRect(0, 0, W, H);

      // FIX 3: smooth laser y using sine easing — goes top → bottom → top seamlessly
      laserPos = (laserPos + LASER_SPEED) % 1;
      // Map 0..1 → 0..1 with ease: use (1 - cos(2π·p)) / 2  (smooth ping-pong)
      const easedPos = (1 - Math.cos(laserPos * Math.PI * 2)) / 2;
      const laserY = -60 + easedPos * (H + 120);
      const laserHalfW = 220;

      // QR dot grid
      const laserInfluence = 80;
      dots.forEach((d) => {
        const dist = Math.abs(d.y - laserY);
        const lit = dist < laserInfluence
          ? d.baseAlpha + (1 - dist / laserInfluence) * 0.22
          : d.baseAlpha;
        ctx.globalAlpha = lit;
        ctx.fillStyle = "#d4ff00";
        const s = d.size;
        ctx.fillRect(d.x - s / 2, d.y - s / 2, s, s);
      });

      // laser beam
      const laserGrad = ctx.createLinearGradient(W / 2 - laserHalfW, laserY, W / 2 + laserHalfW, laserY);
      laserGrad.addColorStop(0, "rgba(212,255,0,0)");
      laserGrad.addColorStop(0.5, "rgba(212,255,0,0.18)");
      laserGrad.addColorStop(1, "rgba(212,255,0,0)");
      ctx.globalAlpha = 1;
      ctx.fillStyle = laserGrad;
      ctx.fillRect(W / 2 - laserHalfW, laserY - 1.5, laserHalfW * 2, 3);

      ctx.globalAlpha = 0.6;
      ctx.strokeStyle = "rgba(212,255,0,0.25)";
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(W / 2 - laserHalfW, laserY);
      ctx.lineTo(W / 2 + laserHalfW, laserY);
      ctx.stroke();

      // corner QR brackets
      const bSize = 18, bThick = 2.5;
      const positions = [
        [W / 2 - 90, H / 2 - 60],
        [W / 2 + 74, H / 2 - 60],
        [W / 2 - 90, H / 2 + 44],
        [W / 2 + 74, H / 2 + 44],
      ];
      const dirs2 = [[1,1],[-1,1],[1,-1],[-1,-1]];
      ctx.globalAlpha = 0.18 + 0.06 * Math.sin(t * 0.025);
      ctx.strokeStyle = "#d4ff00";
      ctx.lineWidth = bThick;
      positions.forEach(([bx, by], i) => {
        const [dx, dy] = dirs2[i];
        ctx.beginPath();
        ctx.moveTo(bx, by + dy * bSize);
        ctx.lineTo(bx, by);
        ctx.lineTo(bx + dx * bSize, by);
        ctx.stroke();
      });

      // signal ripples
      rippleTimer++;
      if (rippleTimer > 120) { spawnRipple(); rippleTimer = 0; }
      for (let i = ripples.length - 1; i >= 0; i--) {
        const rp = ripples[i];
        rp.r += rp.speed;
        rp.alpha *= 0.975;
        if (rp.r > rp.maxR || rp.alpha < 0.01) { ripples.splice(i, 1); continue; }
        ctx.globalAlpha = rp.alpha;
        ctx.strokeStyle = "rgba(212,255,0,1)";
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.arc(rp.x, rp.y, rp.r, 0, Math.PI * 2);
        ctx.stroke();
      }

      // floating cars
      cars.forEach((car) => {
        car.x += car.speed * car.dir;
        if (car.dir === 1 && car.x > W + 140) car.x = -140;
        if (car.dir === -1 && car.x < -140) car.x = W + 140;
        drawCar(ctx, car.x, car.y, car.scale, car.alpha);
      });

      ctx.globalAlpha = 1;
      raf = requestAnimationFrame(draw);
    };
    draw();

    return () => {
      if (raf !== undefined) cancelAnimationFrame(raf);
      ro.disconnect();
    };
  }, []);

  return <canvas ref={canvasRef} className="hero-canvas" />;
}

export default function Home() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <LandingLayout>
      <style>{css}</style>
      {/* HERO */}
      <section className="hero">
        <HeroBg />
        <div className="hero-grid" />
        <div className="eyebrow">
          <span className="edot" />
          <span>Vehicle QR Tag System</span>
        </div>
        <div className="hero-inner">
          <div className="hero-left">
            <h1 className="hl" aria-label="Scan. Notify. Solve.">
              <span className="hl-w">Scan.</span>
              <span className="hl-w">Notify.</span>
              <span className="hl-w">Solve.</span>
            </h1>
            <p className="hero-sub">
              Anyone can reach you when it matters. Wrong parking, emergency, accident — just scan the QR. No app needed.
            </p>
          </div>
          <div className="hero-right">
            <StickerCard />
          </div>
        </div>
        <div className="hero-bottom">~
          <div className="steps">
            <div className="step on">
              <div className="step-ic"><ScanLine size={20} /></div>
              <span className="step-name">Scan</span>
              <span className="step-hint">Sticker on car</span>
            </div>
            <span className="arr">→</span>
            <div className="step">
              <div className="step-ic"><Bell size={20} /></div>
              <span className="step-name">Notify</span>
              <span className="step-hint">Owner alerted</span>
            </div>
            <span className="arr">→</span>
            <div className="step">
              <div className="step-ic"><CheckCircle size={20} /></div>
              <span className="step-name">Solve</span>
              <span className="step-hint">Issue resolved</span>
            </div>
          </div>

          {/* DEMO FLOW */}
          <div className="demo-flow">
            <div className="demo-node">
              <div className="demo-icon-wrap"><Car size={20} /></div>
              <span className="demo-label">Your car</span>
            </div>
            <div className="demo-arrow">
              <div className="demo-arrow-line">
                <div className="demo-arrow-dot" /><div className="demo-arrow-dot" /><div className="demo-arrow-dot" />
              </div>
            </div>
            <div className="demo-node">
              <div className="demo-icon-wrap pulse-node"><QrCode size={20} /></div>
              <span className="demo-label active">QR sticker</span>
            </div>
            <div className="demo-arrow">
              <div className="demo-arrow-line">
                <div className="demo-arrow-dot" /><div className="demo-arrow-dot" /><div className="demo-arrow-dot" />
              </div>
            </div>
            <div className="demo-node">
              <div className="demo-icon-wrap"><Smartphone size={20} /></div>
              <span className="demo-label">Stranger scans</span>
            </div>
            <div className="demo-arrow">
              <div className="demo-arrow-line">
                <div className="demo-arrow-dot" /><div className="demo-arrow-dot" /><div className="demo-arrow-dot" />
              </div>
            </div>
            <div className="demo-node">
              <div className="demo-icon-wrap pulse-node"><Zap size={20} /></div>
              <span className="demo-label active">You're notified</span>
            </div>
          </div>

          <div className="cta-wrap">
            <div className="trust-row">
              <div className="trust-badge"><Smartphone size={18} />No app required</div>
              <div className="trust-sep" />
              <div className="trust-badge"><EyeOff size={18} />Number stays private</div>
              <div className="trust-sep" />
              <div className="trust-badge"><ShieldCheck size={18} />No spam, ever</div>
            </div>
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="how">
        <p className="sec-eye">How it works</p>
        <h2 className="sec-title">
          Three steps.<br />
          <span>Zero friction.</span>
        </h2>
        <div className="how-grid">
          {HOW.map(({ n, Icon, h, p }) => (
            <div key={n} className="how-card" data-n={n}>
              <div className="hc-icon"><Icon size={22} /></div>
              <h3>{h}</h3>
              <p>{p}</p>
            </div>
          ))}
        </div>
      </section>

    </LandingLayout>
  );
}