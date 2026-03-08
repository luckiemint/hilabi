import React from "react";
import "./HilabiLogo.css";

/**
 * Hilabi logo - bold, slanted, rounded uppercase
 * Uses custom font styling to match branding
 */
const HilabiLogo = ({
  width,
  height = 48,
  color = "currentColor",
  className = "",
  size = "md",
}) => {
  const sizes = {
    sm: { width: 100, fontSize: 22, height: 32 },
    md: { width: 140, fontSize: 30, height: 44 },
    lg: { width: 180, fontSize: 40, height: 56 },
    xl: { width: 220, fontSize: 50, height: 68 },
  };
  const s = sizes[size] || sizes.md;
  const w = width ?? s.width;
  const h = height ?? s.height;

  return (
    <svg
      width={w}
      height={h}
      viewBox={`0 0 ${w} ${h}`}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`hilabi-logo ${className}`}
      aria-label="Hilabi"
    >
      <defs>
        <filter id="hilabi-shadow" x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="0" dy="2" stdDeviation="1" floodOpacity="0.15" />
        </filter>
      </defs>
      <text
        x="50%"
        y="78%"
        textAnchor="middle"
        dominantBaseline="alphabetic"
        fill={color}
        filter="url(#hilabi-shadow)"
        style={{
          fontFamily: "'Nunito', sans-serif",
          fontWeight: 800,
          fontStyle: "italic",
          fontSize: s.fontSize,
          letterSpacing: "0.02em",
        }}
      >
        HILABI
      </text>
    </svg>
  );
};

export default HilabiLogo;
