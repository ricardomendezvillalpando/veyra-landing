type LogoProps = {
  className?: string;
  height?: number;
  color?: string;
  title?: string;
};

/**
 * Official Veyra wordmark — scalable SVG (no raster / white box).
 * E = three bars; A = without crossbar.
 */
export function Logo({
  className = "",
  height = 22,
  color = "#97d2c5",
  title = "Veyra",
}: LogoProps) {
  const width = Math.round(height * (200 / 48));

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 200 48"
      width={width}
      height={height}
      role="img"
      aria-label={title}
      className={className}
      fill={color}
    >
      <title>{title}</title>
      {/* V */}
      <polygon points="4,6 22,42 40,6 31.5,6 22,28 12.5,6" />
      {/* E */}
      <rect x="48" y="8" width="30" height="5" />
      <rect x="48" y="21.5" width="30" height="5" />
      <rect x="48" y="35" width="30" height="5" />
      {/* Y */}
      <polygon points="88,6 102,24 102,42 111,42 111,24 125,6 115,6 106.5,18 98,6" />
      {/* R */}
      <path d="M135 6h18c8.3 0 14 5 14 13s-5.2 12.2-12.5 13.4L168 42h-10.5l-11.5-9.5H144V42h-9V6zm9 6.5V25h9.5c4.2 0 6.8-2.4 6.8-6.2S157.7 12.5 153.5 12.5H144z" />
      {/* A — no bar */}
      <polygon points="176,42 188,6 196.5,6 184.5,42" />
      <polygon points="188,6 200,42 191.5,42" />
    </svg>
  );
}
