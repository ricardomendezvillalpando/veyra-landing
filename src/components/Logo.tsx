type LogoProps = {
  className?: string;
  height?: number;
  color?: string;
  title?: string;
};

/** Clean modern wordmark — Sora bold, open tracking. */
export function Logo({
  className = "",
  height = 22,
  color = "#0c1418",
  title = "Veyra",
}: LogoProps) {
  return (
    <span
      className={`font-display font-bold tracking-[0.16em] ${className}`}
      style={{ fontSize: height * 0.82, color, lineHeight: 1 }}
      aria-label={title}
      role="img"
    >
      VEYRA
    </span>
  );
}
