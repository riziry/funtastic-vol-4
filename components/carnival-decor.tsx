/**
 * CSS-only festive decorations. Everything here is aria-hidden, uses only
 * transform/opacity animations, and is hidden for prefers-reduced-motion
 * (via the `motion-decor` class).
 */
import { Fragment } from "react";
import { Broom, Owl, Star4, TopHat, Wand, WingedLetter, WingedOrb } from "./magic-icons";

const style = (vars: Record<string, string | number>) => vars as React.CSSProperties;

/** Objects flying across the hero sky. */
export function MagicSky() {
  return (
    <div aria-hidden className="motion-decor pointer-events-none absolute inset-0 overflow-hidden">
      <div className="fly-ltr top-[14%]" style={style({ "--fly-dur": "26s", "--fly-delay": "-4s", "--fly-rise": "-6vh" })}>
        <WingedLetter className="w-20 animate-bob drop-shadow-[0_6px_10px_rgb(0_0_0/0.5)] sm:w-24" />
      </div>
      <div className="fly-rtl top-[30%]" style={style({ "--fly-dur": "34s", "--fly-delay": "-18s", "--fly-rise": "-10vh" })}>
        <WingedLetter className="w-14 animate-bob opacity-80 sm:w-16" />
      </div>
      <div className="fly-ltr top-[6%] hidden sm:block" style={style({ "--fly-dur": "30s", "--fly-delay": "-12s", "--fly-rise": "4vh" })}>
        <Owl className="w-28 animate-bob opacity-90" />
      </div>
      <div className="fly-rtl top-[44%] hidden md:block" style={style({ "--fly-dur": "22s", "--fly-delay": "-9s", "--fly-rise": "-18vh" })}>
        {/* cancel the flight mirror so the handle leads */}
        <div className="relative -scale-x-100 animate-bob">
          <Broom className="w-40 -rotate-6" />
          <span className="absolute top-1/2 -right-6 h-1 w-16 -translate-y-1/2 rounded-full bg-gradient-to-l from-transparent to-gold-light/60" />
        </div>
      </div>
      <div className="orb-zip">
        <WingedOrb className="w-14 drop-shadow-[0_0_12px_rgb(236_213_156/0.8)] sm:w-16" />
      </div>
    </div>
  );
}

/** Top hat with stars spilling out and a waving wand, framing the hero logo. */
export function HatAndWand() {
  const stars = [
    { sx: "-50px", sy: "-130px", d: "0s", c: "text-gold-light" },
    { sx: "10px", sy: "-160px", d: "-0.8s", c: "text-ivory" },
    { sx: "60px", sy: "-120px", d: "-1.6s", c: "text-[#f08a9b]" },
    { sx: "-20px", sy: "-100px", d: "-2.4s", c: "text-gold" },
  ];
  return (
    <div aria-hidden className="motion-decor pointer-events-none absolute inset-0">
      <div className="absolute -bottom-[2%] -left-[6%] w-[30%] animate-bob">
        <div className="relative">
          {stars.map((s, i) => (
            <span
              key={i}
              className={`spill top-[18%] left-[42%] ${s.c}`}
              style={style({ "--sx": s.sx, "--sy": s.sy, "--spill-delay": s.d })}
            >
              <Star4 className="size-4 sm:size-5" />
            </span>
          ))}
          <TopHat className="w-full -rotate-12 drop-shadow-[0_14px_20px_rgb(0_0_0/0.6)]" />
        </div>
      </div>
      <div className="absolute -top-[4%] -right-[4%] w-[30%] origin-bottom-left animate-wave">
        <Wand className="w-full drop-shadow-[0_0_16px_rgb(236_213_156/0.5)]" />
        <Star4 className="absolute top-[8%] right-[6%] size-5 animate-twinkle text-gold-light" />
        <Star4 className="absolute top-[26%] right-[-6%] size-3 animate-twinkle text-ivory [animation-delay:-1s]" />
        <Star4 className="absolute top-[-4%] right-[22%] size-3.5 animate-twinkle text-[#f08a9b] [animation-delay:-1.7s]" />
      </div>
    </div>
  );
}

/** A swaying garland of carnival pennants. */
export function Bunting({ className = "", flags = 18 }: { className?: string; flags?: number }) {
  const colors = ["#a61b32", "#d6b46a", "#f4e9d5", "#7f1026", "#3b1a4a"];
  const w = 1440 / flags;
  return (
    <div aria-hidden className={`pointer-events-none absolute inset-x-0 top-0 h-16 overflow-hidden sm:h-20 ${className}`}>
      <svg viewBox="0 0 1440 90" preserveAspectRatio="none" className="size-full">
        <path d="M0 8 Q720 46 1440 8" fill="none" stroke="#d6b46a" strokeOpacity=".7" strokeWidth="2" />
        {Array.from({ length: flags }, (_, i) => {
          const x = i * w + w / 2;
          const t = x / 1440;
          const y = 8 + 4 * 38 * t * (1 - t);
          return (
            <g key={i} transform={`translate(${x} ${y})`}>
              <g className="animate-sway" style={{ transformBox: "fill-box", transformOrigin: "50% 0", animationDelay: `${-(i % 5) * 0.6}s` }}>
                <path d={`M${-w * 0.36} 0 L${w * 0.36} 0 L0 ${w * 0.7}z`} fill={colors[i % colors.length]} />
                <path d={`M${-w * 0.36} 0 L${w * 0.36} 0`} stroke="#ecd59c" strokeOpacity=".6" />
                <circle cy={w * 0.22} r="3" fill={i % colors.length === 1 ? "#7f1026" : "#ecd59c"} opacity=".8" />
              </g>
            </g>
          );
        })}
      </svg>
    </div>
  );
}

/** Tilted, endlessly scrolling marquee band. */
export function Marquee({ items, reverse = false, tilt = "-rotate-2" }: { items: string[]; reverse?: boolean; tilt?: string }) {
  const icons = [Star4, TopHat, Wand];
  const row = (
    <div className="flex shrink-0 items-center">
      {items.map((item, i) => {
        const Icon = icons[i % icons.length];
        return (
          <Fragment key={i}>
            <span className="px-6 font-display text-xl font-bold tracking-[0.18em] whitespace-nowrap text-ivory uppercase sm:text-2xl">
              {item}
            </span>
            <Icon className="size-6 shrink-0 text-gold-light sm:size-7" />
          </Fragment>
        );
      })}
    </div>
  );
  return (
    <div aria-hidden className="relative z-10 overflow-hidden py-6">
      <div className={`-mx-[5%] overflow-hidden border-y-2 border-gold/70 bg-gradient-to-r from-crimson via-blood to-crimson py-3 shadow-[0_10px_40px_-10px_rgb(166_27_50/0.7)] ${tilt}`}>
        <div className={`flex w-max animate-marquee ${reverse ? "[animation-direction:reverse]" : ""}`}>
          {row}
          {row}
        </div>
      </div>
    </div>
  );
}

const FIREWORK_SHADOW = (() => {
  const dots: string[] = [];
  for (let i = 0; i < 16; i++) {
    const a = (i / 16) * Math.PI * 2;
    const r = i % 2 ? 70 : 92;
    dots.push(`${Math.round(Math.cos(a) * r)}px ${Math.round(Math.sin(a) * r)}px 0 1px currentColor`);
  }
  return dots.join(",");
})();

/** Periodic firework bursts for the closing CTA. */
export function Fireworks() {
  const bursts = [
    { left: "14%", top: "22%", color: "#ecd59c", delay: "0s" },
    { left: "84%", top: "18%", color: "#f08a9b", delay: "-0.9s" },
    { left: "72%", top: "70%", color: "#fff6dc", delay: "-1.7s" },
    { left: "24%", top: "74%", color: "#b58be0", delay: "-2.3s" },
    { left: "50%", top: "10%", color: "#d6b46a", delay: "-1.2s" },
  ];
  return (
    <div aria-hidden className="motion-decor pointer-events-none absolute inset-0">
      {bursts.map((b, i) => (
        <span
          key={i}
          className="firework"
          style={{ left: b.left, top: b.top, color: b.color, boxShadow: FIREWORK_SHADOW, ...style({ "--fw-delay": b.delay }) }}
        />
      ))}
    </div>
  );
}

type FloatItem = {
  kind: "hat" | "wand" | "letter" | "star";
  className: string;
  delay?: string;
};

/** Gently floating magic props for section backgrounds. */
export function FloatingMagic({ items }: { items: FloatItem[] }) {
  return (
    <div aria-hidden className="motion-decor pointer-events-none absolute inset-0 -z-10 overflow-hidden">
      {items.map((item, i) => (
        <div key={i} className={`absolute animate-float ${item.className}`} style={{ animationDelay: item.delay }}>
          {item.kind === "hat" ? <TopHat className="w-full animate-bob" /> : null}
          {item.kind === "wand" ? <Wand className="w-full animate-wave" /> : null}
          {item.kind === "letter" ? <WingedLetter className="w-full" /> : null}
          {item.kind === "star" ? <Star4 className="w-full animate-twinkle text-gold-light" /> : null}
        </div>
      ))}
    </div>
  );
}
