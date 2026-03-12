import { ReactNode } from "react";
import LandingHeader from "../LandingHeader/LandingHeader";
import LandingFooter from "../LandingFooter/LandingFooter";

const layoutCss = `
@import url('https://fonts.googleapis.com/css2?family=Syne:wght@700;800&family=Inter:wght@300;400;500&display=swap');
*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
:root { --bg: #080809; --surf: #111113; --surf2: #19191c; --border: rgba(255,255,255,0.07); --white: #f5f4f1; --muted: rgba(245,244,241,0.55); --accent: #e8ff50; --dsp: 'Syne', sans-serif; --body: 'Inter', sans-serif; }
html { scroll-behavior: smooth; }
body { background: var(--bg); color: var(--white); font-family: var(--body); -webkit-font-smoothing: antialiased; overflow-x: hidden; }
`;

interface LandingLayoutProps {
  children: ReactNode;
}

export default function LandingLayout({ children }: LandingLayoutProps) {
  return (
    <>
      <style>{layoutCss}</style>
      <LandingHeader />
      {children}
      <LandingFooter />
    </>
  );
}
