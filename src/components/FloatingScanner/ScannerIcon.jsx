const ScannerIcon = ({ size = 24, color = "#ffffff" }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M3 7V5C3 3.895 3.895 3 5 3H7"
      stroke={color}
      strokeWidth="2"
      strokeLinecap="round"
    />
    <path
      d="M17 3H19C20.105 3 21 3.895 21 5V7"
      stroke={color}
      strokeWidth="2"
      strokeLinecap="round"
    />
    <path
      d="M21 17V19C21 20.105 20.105 21 19 21H17"
      stroke={color}
      strokeWidth="2"
      strokeLinecap="round"
    />
    <path
      d="M7 21H5C3.895 21 3 20.105 3 19V17"
      stroke={color}
      strokeWidth="2"
      strokeLinecap="round"
    />
    <line
      x1="7"
      y1="12"
      x2="17"
      y2="12"
      stroke={color}
      strokeWidth="2"
      strokeLinecap="round"
    />
  </svg>
);

export default ScannerIcon;
