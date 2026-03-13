import { Link, useLocation } from "react-router-dom";
import { ArrowRight, ScanLine, Bell, ShieldCheck, Smartphone, EyeOff, CheckCircle } from "lucide-react";
import { useEffect, useRef } from "react";
import LandingLayout from "../../components/LandingLayout/LandingLayout";

/* ─── BACKGROUND CANVAS — identical system to Home & Company ─── */
function PageBg() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d")!;
    let raf: number;
    let W = 0, H = 0;

    const CELL = 32;
    const dots: { x: number; y: number; size: number; baseAlpha: number }[] = [];

    const buildDots = () => {
      dots.length = 0;
      const cols = Math.ceil(W / CELL) + 2;
      const rows = Math.ceil(H / CELL) + 2;
      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          if (Math.random() > 0.54) {
            dots.push({
              x: c * CELL - CELL / 2,
              y: r * CELL - CELL / 2,
              size: Math.random() * 2.5 + 1.5,
              baseAlpha: Math.random() * 0.07 + 0.02,
            });
          }
        }
      }
    };

    const resize = () => {
      W = canvas.width = canvas.offsetWidth;
      H = canvas.height = canvas.offsetHeight;
      buildDots();
    };

    const ro = new ResizeObserver(resize);
    ro.observe(canvas);
    resize();

    let laserPos = 0;
    const LASER_SPEED = 0.0018;

    const ripples: { x: number; y: number; r: number; maxR: number; alpha: number; speed: number }[] = [];
    const spawnRipple = () => {
      ripples.push({
        x: W * 0.15 + Math.random() * W * 0.7,
        y: H * 0.1 + Math.random() * H * 0.8,
        r: 0,
        maxR: 100 + Math.random() * 120,
        alpha: 0.22,
        speed: 0.6 + Math.random() * 0.5,
      });
    };
    let rippleTimer = 0;

    // ── ROAD & CAR SYSTEM ──
    const ROADS = [{ y: 0 }, { y: 0 }, { y: 0 }];

    type Car = {
      x: number; y: number; lane: number; road: number;
      speed: number; scale: number; dir: 1 | -1;
      color: string; trailLen: number;
      bobPhase: number; bobAmp: number;
    };
    const carPool: Car[] = [];
    const CAR_COLORS = ["rgba(212,255,0,", "rgba(180,230,255,", "rgba(255,255,255,", "rgba(200,255,180,"];

    const initRoadCars = () => {
      ROADS[0].y = H * 0.18;
      ROADS[1].y = H * 0.52;
      ROADS[2].y = H * 0.82;
      carPool.length = 0;
      ROADS.forEach((road, ri) => {
        for (let lane = 0; lane < 2; lane++) {
          const dir = (lane % 2 === 0 ? 1 : -1) as 1 | -1;
          const count = 1;
          for (let ci = 0; ci < count; ci++) {
            carPool.push({
              x: Math.random() * W,
              y: road.y + (lane === 0 ? -12 : 12),
              lane, road: ri, dir,
              speed: 0.55 + Math.random() * 1.0,
              scale: 0.48 + Math.random() * 0.3,
              color: CAR_COLORS[Math.floor(Math.random() * CAR_COLORS.length)],
              trailLen: 28 + Math.floor(Math.random() * 30),
              bobPhase: Math.random() * Math.PI * 2,
              bobAmp: 0.3 + Math.random() * 0.5,
            });
          }
        }
      });
    };

    const drawDetailedCar = (car: Car) => {
      const { x, y, scale, dir, color, bobPhase, bobAmp } = car;
      const bob = Math.sin(t * 0.04 + bobPhase) * bobAmp;
      const cy = y + bob;
      const baseAlpha = 0.5;
      ctx.save();
      ctx.translate(x, cy);
      if (dir === -1) ctx.scale(-1, 1);
      ctx.scale(scale, scale);
      for (let ti = 1; ti <= 4; ti++) {
        const tx = -(ti * 7);
        ctx.globalAlpha = 0.06 * (1 - ti / 5);
        ctx.fillStyle = color + "1)";
        ctx.beginPath();
        ctx.moveTo(tx-36,6);ctx.lineTo(tx-36,-3);ctx.lineTo(tx-20,-14);
        ctx.lineTo(tx-6,-18);ctx.lineTo(tx+16,-18);ctx.lineTo(tx+30,-10);
        ctx.lineTo(tx+38,-6);ctx.lineTo(tx+38,6);ctx.closePath();
        ctx.fill();
      }
      ctx.globalAlpha = baseAlpha;
      ctx.fillStyle = "rgba(15,15,18,0.88)";
      ctx.strokeStyle = color + "0.85)";
      ctx.lineWidth = 1.3;
      ctx.beginPath();
      ctx.moveTo(-36,6);ctx.lineTo(-36,-3);ctx.lineTo(-20,-14);
      ctx.lineTo(-6,-18);ctx.lineTo(16,-18);ctx.lineTo(30,-10);
      ctx.lineTo(38,-6);ctx.lineTo(38,6);ctx.closePath();
      ctx.fill(); ctx.stroke();
      ctx.fillStyle = "rgba(30,30,35,0.9)"; ctx.strokeStyle = color + "0.55)"; ctx.lineWidth = 0.9;
      ctx.beginPath();ctx.moveTo(-18,-3);ctx.lineTo(-10,-18);ctx.lineTo(16,-18);ctx.lineTo(22,-3);ctx.closePath();
      ctx.fill(); ctx.stroke();
      ctx.fillStyle = color + "0.1)"; ctx.strokeStyle = color + "0.28)"; ctx.lineWidth = 0.6;
      ctx.beginPath();ctx.moveTo(-16,-4);ctx.lineTo(-9,-17);ctx.lineTo(-1,-17);ctx.lineTo(-2,-4);ctx.closePath();ctx.fill();ctx.stroke();
      ctx.beginPath();ctx.moveTo(20,-4);ctx.lineTo(18,-17);ctx.lineTo(13,-17);ctx.lineTo(11,-4);ctx.closePath();ctx.fill();ctx.stroke();
      ctx.fillStyle = "rgba(20,20,22,1)"; ctx.strokeStyle = color + "0.65)"; ctx.lineWidth = 1.4;
      [-22, 24].forEach(wx => {
        ctx.beginPath(); ctx.arc(wx, 8, 7, 0, Math.PI * 2); ctx.fill(); ctx.stroke();
        ctx.fillStyle = color + "0.35)"; ctx.beginPath(); ctx.arc(wx, 8, 3, 0, Math.PI * 2); ctx.fill();
        ctx.fillStyle = "rgba(20,20,22,1)";
      });
      ctx.globalAlpha = baseAlpha * 1.1;
      const hg = ctx.createRadialGradient(38, -2, 0, 38, -2, 26);
      hg.addColorStop(0, color + "0.5)"); hg.addColorStop(1, color + "0)");
      ctx.fillStyle = hg;
      ctx.beginPath();ctx.moveTo(38,-2);ctx.lineTo(64,-16);ctx.lineTo(64,12);ctx.closePath();ctx.fill();
      ctx.fillStyle = color + "0.92)"; ctx.beginPath(); ctx.ellipse(37,-2,3,2,0,0,Math.PI*2); ctx.fill();
      ctx.fillStyle = color + "0.45)"; ctx.beginPath(); ctx.ellipse(36,3,2.5,1.5,0,0,Math.PI*2); ctx.fill();
      ctx.globalAlpha = baseAlpha * 0.8;
      ctx.fillStyle = "rgba(255,60,60,0.82)"; ctx.beginPath(); ctx.ellipse(-35,-2,2.5,2,0,0,Math.PI*2); ctx.fill();
      ctx.fillStyle = "rgba(255,80,80,0.45)"; ctx.beginPath(); ctx.ellipse(-35,3,2,1.5,0,0,Math.PI*2); ctx.fill();
      const tg = ctx.createRadialGradient(-36,0,0,-36,0,20);
      tg.addColorStop(0,"rgba(255,50,50,0.22)"); tg.addColorStop(1,"rgba(255,50,50,0)");
      ctx.fillStyle = tg; ctx.beginPath();ctx.moveTo(-36,0);ctx.lineTo(-56,-12);ctx.lineTo(-56,12);ctx.closePath();ctx.fill();
      ctx.restore();
    };

    const drawRoads = () => {
      ROADS.forEach(road => {
        ctx.globalAlpha = 0.035;
        ctx.fillStyle = "rgba(212,255,0,1)";
        ctx.fillRect(0, road.y - 28, W, 56);
        ctx.globalAlpha = 0.055;
        ctx.strokeStyle = "rgba(212,255,0,1)";
        ctx.lineWidth = 1;
        ctx.setLineDash([18, 22]);
        ctx.lineDashOffset = -(t * 0.7) % 40;
        ctx.beginPath(); ctx.moveTo(0, road.y); ctx.lineTo(W, road.y); ctx.stroke();
        ctx.setLineDash([]); ctx.lineDashOffset = 0;
      });
      ctx.globalAlpha = 1;
    };
    // ── END ROAD & CAR SYSTEM ──

    let t = 0;
    const draw = () => {
      t++;
      if (t === 1) initRoadCars();
      ctx.clearRect(0, 0, W, H);

      laserPos = (laserPos + LASER_SPEED) % 1;
      const easedPos = (1 - Math.cos(laserPos * Math.PI * 2)) / 2;
      const laserY = -60 + easedPos * (H + 120);
      const laserHW = Math.min(W * 0.55, 340);

      dots.forEach((d) => {
        const dist = Math.abs(d.y - laserY);
        const lit = dist < 90 ? d.baseAlpha + (1 - dist / 90) * 0.18 : d.baseAlpha;
        ctx.globalAlpha = lit;
        ctx.fillStyle = "#d4ff00";
        ctx.fillRect(d.x - d.size / 2, d.y - d.size / 2, d.size, d.size);
      });

      ctx.globalAlpha = 1;
      const lg = ctx.createLinearGradient(W / 2 - laserHW, laserY, W / 2 + laserHW, laserY);
      lg.addColorStop(0, "rgba(212,255,0,0)");
      lg.addColorStop(0.5, "rgba(212,255,0,0.14)");
      lg.addColorStop(1, "rgba(212,255,0,0)");
      ctx.fillStyle = lg;
      ctx.fillRect(W / 2 - laserHW, laserY - 1.5, laserHW * 2, 3);

      const bracketSets = [
        { cx: W * 0.18, cy: H * 0.12 }, { cx: W * 0.82, cy: H * 0.12 },
        { cx: W * 0.08, cy: H * 0.45 }, { cx: W * 0.92, cy: H * 0.45 },
        { cx: W * 0.22, cy: H * 0.78 }, { cx: W * 0.78, cy: H * 0.78 },
      ];
      const bSz = 16;
      const bDirs: [number, number][] = [[1,1],[-1,1],[1,-1],[-1,-1]];
      ctx.strokeStyle = "#d4ff00"; ctx.lineWidth = 2;
      bracketSets.forEach(({ cx, cy }, si) => {
        ctx.globalAlpha = 0.1 + 0.04 * Math.sin(t * 0.018 + si * 1.1);
        bDirs.forEach(([dx, dy]) => {
          ctx.beginPath();
          ctx.moveTo(cx, cy + dy * bSz); ctx.lineTo(cx, cy); ctx.lineTo(cx + dx * bSz, cy);
          ctx.stroke();
        });
      });

      rippleTimer++;
      if (rippleTimer > 90) { spawnRipple(); rippleTimer = 0; }
      for (let i = ripples.length - 1; i >= 0; i--) {
        const rp = ripples[i];
        rp.r += rp.speed; rp.alpha *= 0.978;
        if (rp.r > rp.maxR || rp.alpha < 0.01) { ripples.splice(i, 1); continue; }
        ctx.globalAlpha = rp.alpha;
        ctx.strokeStyle = "rgba(212,255,0,1)"; ctx.lineWidth = 1;
        ctx.beginPath(); ctx.arc(rp.x, rp.y, rp.r, 0, Math.PI * 2); ctx.stroke();
      }

      drawRoads();
      carPool.forEach((car) => {
        car.x += car.speed * car.dir;
        if (car.dir === 1 && car.x > W + 160) car.x = -160;
        if (car.dir === -1 && car.x < -160) car.x = W + 160;
        drawDetailedCar(car);
      });

      ctx.globalAlpha = 1;
      raf = requestAnimationFrame(draw);
    };
    draw();

    return () => { cancelAnimationFrame(raf); ro.disconnect(); };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{ position: "fixed", inset: 0, width: "100%", height: "100%", pointerEvents: "none", zIndex: 0 }}
    />
  );
}

/* ─── PAGE CSS ─── */
const pageCss = `
@import url('https://fonts.googleapis.com/css2?family=Syne:wght@700;800&family=Inter:wght@300;400;500&display=swap');

:root {
  --bg:     #080809;
  --surf:   #111113;
  --surf2:  #19191c;
  --border: rgba(255,255,255,0.07);
  --white:  #f5f4f1;
  --muted:  rgba(245,244,241,0.55);
  --accent: #e8ff50;
  --dsp:    'Syne', sans-serif;
  --body:   'Inter', sans-serif;
}

/* ── WRAP ── */
.pg-page-wrap { position: relative; z-index: 1; }

/* ── HERO ── */
.pg-hero {
  padding: 120px 60px 100px;
  text-align: center;
  max-width: 860px;
  margin: 0 auto;
  position: relative;
}
.pg-eyebrow {
  display: inline-flex; align-items: center; gap: 8px;
  border: 1px solid rgba(212,255,0,.2); background: rgba(212,255,0,.06);
  border-radius: 40px; padding: 7px 18px 7px 12px;
  margin-bottom: 32px;
  opacity: 0; animation: pgUp .55s .1s ease forwards;
}
.pg-edot { width: 7px; height: 7px; border-radius: 50%; background: var(--accent); box-shadow: 0 0 10px var(--accent); }
.pg-eyebrow span { font-size: 11px; font-weight: 500; letter-spacing: .1em; text-transform: uppercase; color: var(--accent); }
.pg-hero h1 {
  font-family: var(--dsp);
  font-size: clamp(48px, 7.5vw, 96px);
  font-weight: 800; letter-spacing: -0.045em; line-height: 1.02;
  margin-bottom: 28px;
  opacity: 0; animation: pgUp .6s .25s ease forwards;
}
.pg-hero h1 em { color: var(--accent); font-style: normal; }
.pg-hero p {
  font-size: clamp(16px, 1.6vw, 19px);
  color: #ffffff; line-height: 1.8; font-weight: 300;
  max-width: 580px; margin: 0 auto;

}

/* ── DIVIDER ── */
.pg-rule { width: 100%; height: 1px; background: var(--border); }

/* ── FEATURES SECTION ── */
.pg-features {
  padding: 100px 60px;
  max-width: 1200px;
  margin: 0 auto;
}
.pg-features-label {
  font-size: 11px; font-weight: 500; letter-spacing: .12em; text-transform: uppercase;
  color: var(--accent); margin-bottom: 24px;
}
.pg-features-title {
  font-family: var(--dsp);
  font-size: clamp(36px, 4.5vw, 56px);
  font-weight: 800; letter-spacing: -0.04em; line-height: 1.04;
  margin-bottom: 64px;
}
.pg-features-title span { color: rgba(160,220,255,0.45); }
.pg-features-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1px;
  background: var(--border);
  border-radius: 20px;
  overflow: hidden;
}
.pg-feat-card {
  background: var(--surf);
  padding: 44px 36px;
  position: relative; overflow: hidden;
  transition: background .3s;
}
.pg-feat-card:hover { background: var(--surf2); }
.pg-feat-card::before {
  content: ''; position: absolute; top: 0; left: 0; right: 0; height: 1px;
  background: transparent; transition: background .3s;
}
.pg-feat-card:hover::before { background: linear-gradient(90deg, transparent, var(--accent), transparent); }
.pg-feat-icon {
  width: 46px; height: 46px; border-radius: 13px;
  background: rgba(212,255,0,.07); border: 1px solid rgba(212,255,0,.18);
  display: flex; align-items: center; justify-content: center;
  margin-bottom: 24px;
}
.pg-feat-icon svg { color: var(--accent); }
.pg-feat-card h3 {
  font-family: var(--dsp); font-size: 20px; font-weight: 700;
  letter-spacing: -.025em; margin-bottom: 12px;
}
.pg-feat-card p { font-size: 14px; color: #ffffff; line-height: 1.8; font-weight: 300; }

/* ── HOW IT WORKS ── */
.pg-how-wrap {
  background: var(--surf);
  border-top: 1px solid var(--border);
  border-bottom: 1px solid var(--border);
}
.pg-how {
  padding: 100px 60px;
  max-width: 1200px;
  margin: 0 auto;
}
.pg-how-label {
  font-size: 11px; font-weight: 500; letter-spacing: .12em; text-transform: uppercase;
  color: var(--accent); margin-bottom: 24px;
}
.pg-how-title {
  font-family: var(--dsp);
  font-size: clamp(36px, 4.5vw, 56px);
  font-weight: 800; letter-spacing: -0.04em; line-height: 1.04;
  margin-bottom: 64px;
}
.pg-how-title span { color: rgba(160,220,255,0.45); }
.pg-steps-row {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 40px;
  align-items: start;
}
.pg-step {
  display: flex; flex-direction: column; gap: 20px;
  position: relative;
}
.pg-step-num {
  font-family: var(--dsp); font-size: 11px; font-weight: 700;
  letter-spacing: .1em; text-transform: uppercase;
  color: var(--accent);
}
.pg-step-icon {
  width: 52px; height: 52px; border-radius: 14px;
  border: 1px solid rgba(212,255,0,.25); background: rgba(212,255,0,.07);
  display: flex; align-items: center; justify-content: center;
}
.pg-step-icon svg { color: var(--accent); }
.pg-step h3 {
  font-family: var(--dsp); font-size: 22px; font-weight: 700;
  letter-spacing: -.03em; margin-bottom: 10px;
}
.pg-step p { font-size: 14px; color: #ffffff; line-height: 1.8; font-weight: 300; }
.pg-step-connector {
  position: absolute; top: 26px; left: calc(100% + 8px);
  width: calc(40px - 16px); height: 1px;
  background: linear-gradient(90deg, rgba(212,255,0,.3), rgba(212,255,0,.05));
  display: none;
}

/* ── PRICING ── */
.pg-pricing {
  padding: 100px 60px;
  max-width: 1200px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 80px;
  align-items: center;
}
.pg-pricing-label {
  font-size: 11px; font-weight: 500; letter-spacing: .12em; text-transform: uppercase;
  color: var(--accent); margin-bottom: 24px;
}
.pg-pricing h2 {
  font-family: var(--dsp);
  font-size: clamp(32px, 3.5vw, 48px);
  font-weight: 800; letter-spacing: -0.04em; line-height: 1.06;
  margin-bottom: 16px;
}
.pg-pricing > div:first-child p {
  font-size: 15px; color: #ffffff; line-height: 1.8; font-weight: 300;
}
.pg-price-card {
  background: var(--surf2);
  border: 1px solid var(--border);
  border-radius: 20px;
  padding: 40px;
  position: relative; overflow: hidden;
  transition: border-color .25s;
}
.pg-price-card::before {
  content: ''; position: absolute; top: 0; left: 0; right: 0; height: 1px;
  background: linear-gradient(90deg, transparent, rgba(212,255,0,.35), transparent);
}
.pg-price-card:hover { border-color: rgba(212,255,0,.2); }
.pg-price-badge {
  display: inline-flex; align-items: center; gap: 6px;
  background: rgba(212,255,0,.1); border: 1px solid rgba(212,255,0,.2);
  border-radius: 40px; padding: 5px 14px;
  font-size: 11px; font-weight: 600; letter-spacing: .08em; text-transform: uppercase;
  color: var(--accent); margin-bottom: 24px;
}
.pg-price-amount {
  font-family: var(--dsp); font-size: 52px; font-weight: 800;
  letter-spacing: -0.04em; line-height: 1; margin-bottom: 6px;
}
.pg-price-amount span { font-size: 20px; font-weight: 400; color: var(--muted); vertical-align: top; margin-top: 10px; display: inline-block; }
.pg-price-sub { font-size: 13px; color: var(--muted); margin-bottom: 28px; font-weight: 300; }
.pg-price-divider { height: 1px; background: var(--border); margin-bottom: 24px; }
.pg-price-perks { display: flex; flex-direction: column; gap: 12px; margin-bottom: 32px; }
.pg-price-perk {
  display: flex; align-items: center; gap: 10px;
  font-size: 14px; font-weight: 300; color: var(--muted);
}
.pg-price-perk svg { color: var(--accent); flex-shrink: 0; }
.pg-price-btn {
  display: flex; align-items: center; justify-content: center; gap: 8px;
  width: 100%;
  background: var(--accent); border: none; cursor: pointer;
  font-family: var(--dsp); font-size: 14px; font-weight: 700;
  color: #0a0a0a; padding: 14px 0; border-radius: 40px;
  letter-spacing: .02em; text-decoration: none;
  transition: all .25s;
}
.pg-price-btn:hover { background: #e2ff40; transform: translateY(-2px); box-shadow: 0 10px 32px rgba(212,255,0,.28); }

/* ── CTA ── */
.pg-cta {
  padding: 120px 60px;
  text-align: center;
  position: relative; overflow: hidden;
}
.pg-cta::before {
  content: ''; position: absolute;
  top: 50%; left: 50%; transform: translate(-50%, -50%);
  width: 600px; height: 400px;
  background: radial-gradient(ellipse, rgba(212,255,0,.06) 0%, transparent 65%);
  pointer-events: none;
}
.pg-cta-eye { font-size: 11px; font-weight: 500; letter-spacing: .12em; text-transform: uppercase; color: var(--accent); margin-bottom: 20px; }
.pg-cta h2 {
  font-family: var(--dsp);
  font-size: clamp(36px, 4.5vw, 56px);
  font-weight: 800; letter-spacing: -0.04em; line-height: 1.04;
  margin-bottom: 16px;
}
.pg-cta h2 span { color: rgba(160,220,255,0.45); }
.pg-cta p { font-size: 16px; color: #ffffff; line-height: 1.8; font-weight: 300; margin-bottom: 44px; max-width: 420px; margin-left: auto; margin-right: auto; }
.pg-cta-btn {
  display: inline-flex; align-items: center; gap: 10px;
  background: var(--accent); border: none; cursor: pointer;
  font-family: var(--dsp); font-size: 15px; font-weight: 700;
  color: #0a0a0a; padding: 16px 36px; border-radius: 40px;
  letter-spacing: .02em; text-decoration: none;
  transition: all .25s;
}
.pg-cta-btn:hover { background: #e2ff40; transform: translateY(-2px); box-shadow: 0 10px 40px rgba(212,255,0,.3); }

@keyframes pgUp { to { opacity: 1; transform: translateY(0); } }

/* ── RESPONSIVE ── */
@media (max-width: 900px) {
  .pg-hero { padding: 120px 24px 80px; }
  .pg-hero h1 { font-size: clamp(28px, 8vw, 52px); }
  .pg-hero p { font-size: 15px; }
  .pg-features, .pg-how, .pg-pricing { padding: 80px 24px; }
  .pg-features-title, .pg-how-title { font-size: clamp(28px, 6vw, 44px); margin-bottom: 40px; }
  .pg-features-grid { grid-template-columns: 1fr; }
  .pg-feat-card { padding: 32px 24px; }
  .pg-feat-card h3 { font-size: 18px; }
  .pg-feat-card p { font-size: 13px; }
  .pg-feat-icon { width: 40px; height: 40px; margin-bottom: 20px; }
  .pg-steps-row { grid-template-columns: 1fr; }
  .pg-step h3 { font-size: 18px; }
  .pg-step p { font-size: 13px; }
  .pg-pricing { grid-template-columns: 1fr; gap: 48px; }
  .pg-pricing h2 { font-size: clamp(28px, 6vw, 44px); }
  .pg-pricing > div:first-child p { font-size: 14px; }
  .pg-price-card { padding: 28px 24px; }
  .pg-price-amount { font-size: 44px; }
  .pg-cta { padding: 80px 24px; }
  .pg-cta h2 { font-size: clamp(28px, 6vw, 44px); }
  .pg-cta p { font-size: 15px; }
}
`;

const FEATURES = [
  {
    Icon: ScanLine,
    title: "Instant Scan",
    desc: "Anyone can scan your Hilabi sticker with their phone camera. No app download required — works instantly in any browser.",
  },
  {
    Icon: Bell,
    title: "Instant Alerts",
    desc: "You receive an SMS or push notification with the message and precise location. Your number stays completely private.",
  },
  {
    Icon: ShieldCheck,
    title: "Privacy First",
    desc: "Your personal number is never shared. All communication goes through Hilabi — no spam, no exposure, ever.",
  },
  {
    Icon: Smartphone,
    title: "No App Required",
    desc: "Scanners need nothing installed. Owners manage everything from a simple, clean web dashboard.",
  },
  {
    Icon: EyeOff,
    title: "Number Protection",
    desc: "Your contact info stays hidden until you choose to respond. You're always in full control.",
  },
  {
    Icon: CheckCircle,
    title: "Instant Resolution",
    desc: "Move your car, respond to emergencies, or connect with the finder. Fast, calm, and simple for everyone.",
  },
];

const HOW_STEPS = [
  {
    n: "01",
    Icon: ScanLine,
    h: "Scan",
    p: "Anyone near your vehicle scans the Hilabi sticker with their phone. No app download, no friction — just point and scan.",
  },
  {
    n: "02",
    Icon: Bell,
    h: "Notify",
    p: "You receive an instant alert with the message and precise location. Your number stays private at all times.",
  },
  {
    n: "03",
    Icon: CheckCircle,
    h: "Solve",
    p: "Move your car, respond to an emergency, or connect with the finder. Fast and stress-free for everyone.",
  },
];

const PERKS = [
  "1-year active protection for your vehicle",
  "Sticker delivered within 3 business days",
  "Activate your tag in under 2 minutes",
  "Access your vehicle dashboard anytime",
  "Unlimited scans & instant notifications",
];

export default function Product() {
  const { hash } = useLocation();

  useEffect(() => {
    if (!hash) return;
    const id = hash.slice(1);
    const scroll = () => {
      const el = document.getElementById(id);
      if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
    };
    const t = setTimeout(scroll, 50);
    return () => clearTimeout(t);
  }, [hash]);

  return (
    <LandingLayout>
      <style>{pageCss}</style>
      <PageBg />
      <div className="pg-page-wrap">

        {/* ── HERO ── */}
        <section className="pg-hero">
          <div className="pg-eyebrow">
            <span className="pg-edot" />
            <span>Our Product</span>
          </div>
          <h1>
            Everything you need.<br />
            <em>Nothing you don't.</em>
          </h1>
          <p>
            One QR sticker on your vehicle. Anyone can reach you instantly — wrong parking, emergency, accident. No app, no exposure, no hassle.
          </p>
        </section>

        <div className="pg-rule" />

        {/* ── FEATURES ── */}
        <section className="pg-features" id="features">
          <p className="pg-features-label">Features</p>
          <h2 className="pg-features-title">
            Built for real<br />
            <span>everyday moments.</span>
          </h2>
          <div className="pg-features-grid">
            {FEATURES.map(({ Icon, title, desc }) => (
              <div key={title} className="pg-feat-card">
                <div className="pg-feat-icon"><Icon size={22} /></div>
                <h3>{title}</h3>
                <p>{desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ── HOW IT WORKS ── */}
        <div className="pg-how-wrap">
          <section className="pg-how" id="how-it-works">
            <p className="pg-how-label">How it works</p>
            <h2 className="pg-how-title">
              Three steps.<br />
              <span>Zero friction.</span>
            </h2>
            <div className="pg-steps-row">
              {HOW_STEPS.map(({ n, Icon, h, p }) => (
                <div key={n} className="pg-step">
                  <span className="pg-step-num">Step {n}</span>
                  <div className="pg-step-icon"><Icon size={22} /></div>
                  <div>
                    <h3>{h}</h3>
                    <p>{p}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>

        {/* ── PRICING ── */}
        <section className="pg-pricing" id="pricing">
          <div>
            <p className="pg-pricing-label">Pricing</p>
            <h2>Simple, honest<br />pricing.</h2>
            <p>
              One sticker, one payment. No subscriptions, no hidden fees. Launch price ₹200 for 1 year — regular ₹250.
            </p>
          </div>
          <div className="pg-price-card">
            <div className="pg-price-badge">
              <span>⚡</span> Launch offer
            </div>
            <div className="pg-price-amount">
              <span>₹</span>200
            </div>
            <p className="pg-price-sub">per sticker · 1 year validity · <s style={{ opacity: 0.7 }}>₹250</s></p>
            <div className="pg-price-divider" />
            <div className="pg-price-perks">
              {PERKS.map(perk => (
                <div key={perk} className="pg-price-perk">
                  <CheckCircle size={15} />
                  {perk}
                </div>
              ))}
            </div>
            <Link to="/registration/activate" className="pg-price-btn">
              Get Your Sticker <ArrowRight size={15} />
            </Link>
          </div>
        </section>

        {/* ── CTA ── */}
        <section className="pg-cta">
          <p className="pg-cta-eye">Ready to get started?</p>
          <h2>
            One scan away<br />
            <span>from peace of mind.</span>
          </h2>
          <p>
            Join thousands of drivers who've already made their vehicles reachable — privately and instantly.
          </p>
          <Link to="/registration/activate" className="pg-cta-btn">
            Get Your Sticker <ArrowRight size={16} />
          </Link>
        </section>

      </div>{/* end pg-page-wrap */}
    </LandingLayout>
  );
}