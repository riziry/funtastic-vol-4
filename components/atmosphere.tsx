/**
 * Lightweight, CSS-only magical atmosphere: drifting sparks and floating candles.
 * Positions are deterministic so server and client render identically.
 */

const SPARKS = Array.from({ length: 22 }, (_, i) => {
  // Integer hash keeps values identical across JS engines.
  const r = (n: number) => (((i + 1) * 9301 + n * 49297 + i * n * 233) % 233280) / 233280;
  return {
    left: `${(r(1) * 100).toFixed(2)}%`,
    bottom: `${(r(2) * 30).toFixed(2)}%`,
    size: 2 + Math.round(r(3) * 3),
    duration: `${(10 + r(4) * 12).toFixed(1)}s`,
    delay: `${(-r(5) * 20).toFixed(1)}s`,
    dx: `${Math.round((r(6) - 0.5) * 120)}px`,
    opacity: (0.4 + r(7) * 0.5).toFixed(2),
  };
});

export function Sparks({ className = "" }: { className?: string }) {
  return (
    <div aria-hidden className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}>
      {SPARKS.map((s, i) => (
        <span
          key={i}
          className="absolute animate-drift rounded-full bg-gold-light shadow-[0_0_8px_2px_rgb(236_213_156/0.55)] will-change-transform"
          style={
            {
              left: s.left,
              bottom: s.bottom,
              width: s.size,
              height: s.size,
              animationDuration: s.duration,
              animationDelay: s.delay,
              "--dx": s.dx,
              "--o": s.opacity,
            } as React.CSSProperties
          }
        />
      ))}
    </div>
  );
}

const CANDLES = [
  { left: "6%", top: "22%", scale: 0.8, delay: "0s" },
  { left: "15%", top: "10%", scale: 0.6, delay: "-2s" },
  { left: "27%", top: "30%", scale: 0.5, delay: "-4s" },
  { left: "72%", top: "14%", scale: 0.55, delay: "-1s" },
  { left: "84%", top: "28%", scale: 0.75, delay: "-3s" },
  { left: "93%", top: "12%", scale: 0.6, delay: "-5s" },
];

export function FloatingCandles({ className = "" }: { className?: string }) {
  return (
    <div aria-hidden className={`pointer-events-none absolute inset-0 ${className}`}>
      {CANDLES.map((c, i) => (
        <div
          key={i}
          className="absolute animate-float"
          style={{ left: c.left, top: c.top, animationDelay: c.delay, scale: c.scale }}
        >
          <div className="relative flex flex-col items-center">
            <span className="absolute -top-8 size-16 rounded-full bg-[radial-gradient(circle,rgb(255_200_120/0.45),transparent_65%)]" />
            <span className="h-4 w-2 origin-bottom animate-flicker rounded-[50%_50%_45%_45%] bg-gradient-to-t from-[#ff8a3c] via-[#ffd37a] to-[#fff6dc]" />
            <span className="h-0.5 w-px bg-ink" />
            <span className="h-14 w-3 rounded-sm bg-gradient-to-r from-[#d9c9a8] via-[#fbf3e2] to-[#cbb893]" />
          </div>
        </div>
      ))}
    </div>
  );
}
