/**
 * Original magical-carnival illustrations (no third-party artwork).
 * Wings use the `animate-flap` utility so they beat while the parent flies.
 */
import { useId } from "react";

type IconProps = { className?: string; style?: React.CSSProperties };

export function TopHat({ className = "", style }: IconProps) {
  const gid = useId();
  return (
    <svg aria-hidden viewBox="0 0 120 110" className={className} style={style}>
      <defs>
        <linearGradient id={gid} x1="0" x2="1">
          <stop offset="0" stopColor="#0d080b" />
          <stop offset=".45" stopColor="#3a2a33" />
          <stop offset=".6" stopColor="#1c1217" />
          <stop offset="1" stopColor="#0d080b" />
        </linearGradient>
      </defs>
      <ellipse cx="60" cy="92" rx="54" ry="13" fill="#0d080b" />
      <ellipse cx="60" cy="89" rx="50" ry="10" fill="#241820" />
      <path d="M33 90 L37 30 Q60 22 83 30 L87 90 Q60 98 33 90z" fill={`url(#${gid})`} />
      <ellipse cx="60" cy="30" rx="23" ry="6.5" fill="#2e2028" stroke="#0d080b" strokeWidth="1.5" />
      <path d="M35.6 68 Q60 74 84.4 68 L85.4 80 Q60 87 34.6 80z" fill="#a61b32" />
      <path d="M35.6 68 Q60 74 84.4 68" fill="none" stroke="#ecd59c" strokeWidth="1.5" opacity=".8" />
      <rect x="52" y="69" width="16" height="13" rx="2" fill="none" stroke="#d6b46a" strokeWidth="3" />
      <path d="M44 36 L42 64" stroke="#fff" strokeOpacity=".15" strokeWidth="4" strokeLinecap="round" />
    </svg>
  );
}

export function Wand({ className = "", style }: IconProps) {
  const gid = useId();
  return (
    <svg aria-hidden viewBox="0 0 140 140" className={className} style={style}>
      <defs>
        <linearGradient id={gid} x1="0" x2="1">
          <stop offset="0" stopColor="#2b170e" />
          <stop offset=".5" stopColor="#6b3f22" />
          <stop offset="1" stopColor="#2b170e" />
        </linearGradient>
      </defs>
      {/* shaft from bottom-left handle to top-right tip */}
      <g transform="rotate(-45 70 70)">
        <path d="M12 66 L118 68.4 L118 71.6 L12 74 Q8 70 12 66z" fill={`url(#${gid})`} />
        <rect x="14" y="64.5" width="30" height="11" rx="5" fill="#3b2416" />
        {[18, 26, 34, 42].map((x) => (
          <rect key={x} x={x} y="64" width="2.5" height="12" rx="1" fill="#d6b46a" />
        ))}
        <rect x="112" y="67.8" width="10" height="4.4" rx="2" fill="#f4e9d5" />
      </g>
      {/* sparkle at the tip */}
      <g transform="translate(112 28)">
        <circle r="14" fill="#ecd59c" opacity=".25" />
        <path d="M0-13 L3-3 L13 0 L3 3 L0 13 L-3 3 L-13 0 L-3-3z" fill="#fff6dc" />
      </g>
    </svg>
  );
}

export function WingedLetter({ className = "", style }: IconProps) {
  return (
    <svg aria-hidden viewBox="0 0 140 90" className={className} style={style}>
      <g className="origin-[56px_45px] animate-flap">
        <path d="M56 42 C40 18 18 14 4 22 C16 26 22 32 26 38 C16 38 10 42 6 48 C22 46 38 48 56 50z" fill="#f4e9d5" />
        <path d="M56 44 C40 30 26 28 14 30 M56 47 C42 40 30 40 18 42" stroke="#c9b48a" strokeWidth="1.2" fill="none" />
      </g>
      <g className="origin-[84px_45px] animate-flap">
        <path d="M84 42 C100 18 122 14 136 22 C124 26 118 32 114 38 C124 38 130 42 134 48 C118 46 102 48 84 50z" fill="#f4e9d5" />
        <path d="M84 44 C100 30 114 28 126 30 M84 47 C98 40 110 40 122 42" stroke="#c9b48a" strokeWidth="1.2" fill="none" />
      </g>
      <rect x="44" y="30" width="52" height="36" rx="2" fill="#e9d8b6" stroke="#a8853f" strokeWidth="1.2" />
      <path d="M44 31 L70 52 L96 31" fill="none" stroke="#a8853f" strokeWidth="1.2" />
      <circle cx="70" cy="52" r="6" fill="#a61b32" />
      <path d="M70 48.5 l1.2 2.4 2.6.3-1.9 1.8.5 2.6-2.4-1.3-2.4 1.3.5-2.6-1.9-1.8 2.6-.3z" fill="#f6c9b5" opacity=".8" />
    </svg>
  );
}

export function WingedOrb({ className = "", style }: IconProps) {
  const gid = useId();
  return (
    <svg aria-hidden viewBox="0 0 120 60" className={className} style={style}>
      <defs>
        <radialGradient id={gid} cx="35%" cy="35%" r="70%">
          <stop offset="0" stopColor="#fff6dc" />
          <stop offset=".45" stopColor="#ecd59c" />
          <stop offset="1" stopColor="#a8853f" />
        </radialGradient>
      </defs>
      <g className="origin-[48px_30px] animate-flap-fast">
        <path d="M48 28 C34 8 14 6 2 12 C14 18 20 24 24 30 C16 32 10 36 8 40 C22 38 36 36 48 34z" fill="#f4e9d5" fillOpacity=".9" />
      </g>
      <g className="origin-[72px_30px] animate-flap-fast">
        <path d="M72 28 C86 8 106 6 118 12 C106 18 100 24 96 30 C104 32 110 36 112 40 C98 38 84 36 72 34z" fill="#f4e9d5" fillOpacity=".9" />
      </g>
      <circle cx="60" cy="31" r="12" fill={`url(#${gid})`} />
      <path d="M50 27 Q60 34 70 27 M52 36 Q60 30 68 36" stroke="#a8853f" strokeWidth="1" fill="none" />
    </svg>
  );
}

export function Owl({ className = "", style }: IconProps) {
  return (
    <svg aria-hidden viewBox="0 0 160 100" className={className} style={style}>
      <g className="origin-[66px_50px] animate-flap">
        <path d="M68 46 C52 18 26 8 4 14 C18 22 26 30 30 38 C20 40 14 46 12 54 C30 50 48 52 68 58z" fill="#2a1622" />
        <path d="M64 48 C50 32 34 26 20 26 M62 52 C48 44 34 42 24 44" stroke="#4a2c3c" strokeWidth="2" fill="none" />
      </g>
      <g className="origin-[94px_50px] animate-flap">
        <path d="M92 46 C108 18 134 8 156 14 C142 22 134 30 130 38 C140 40 146 46 148 54 C130 50 112 52 92 58z" fill="#2a1622" />
        <path d="M96 48 C110 32 126 26 140 26 M98 52 C112 44 126 42 136 44" stroke="#4a2c3c" strokeWidth="2" fill="none" />
      </g>
      <ellipse cx="80" cy="58" rx="18" ry="24" fill="#3a2030" />
      <ellipse cx="80" cy="64" rx="11" ry="15" fill="#5a3546" />
      <path d="M64 40 L68 28 L74 38z M96 40 L92 28 L86 38z" fill="#3a2030" />
      <circle cx="73" cy="46" r="6" fill="#ffcf5a" />
      <circle cx="87" cy="46" r="6" fill="#ffcf5a" />
      <circle cx="73" cy="46" r="2.6" fill="#140d12" />
      <circle cx="87" cy="46" r="2.6" fill="#140d12" />
      <path d="M77 52 L80 57 L83 52z" fill="#d6b46a" />
      {/* tiny scroll in its talons */}
      <rect x="72" y="80" width="16" height="7" rx="3.5" fill="#e9d8b6" stroke="#a8853f" />
      <circle cx="80" cy="83.5" r="2" fill="#a61b32" />
    </svg>
  );
}

export function Broom({ className = "", style }: IconProps) {
  return (
    <svg aria-hidden viewBox="0 0 180 60" className={className} style={style}>
      <path d="M8 26 L118 30" stroke="#6b3f22" strokeWidth="5" strokeLinecap="round" />
      <path d="M8 26 L118 30" stroke="#a06a3f" strokeWidth="1.5" strokeLinecap="round" opacity=".7" />
      <path d="M112 24 L120 22 L122 38 L114 36z" fill="#d6b46a" />
      <path d="M120 22 C140 14 162 8 178 4 C170 18 168 30 176 46 C160 44 140 42 120 38z" fill="#c8964e" />
      <path d="M122 26 C144 22 160 18 172 12 M122 30 C146 30 160 30 170 30 M122 34 C144 38 158 40 170 44" stroke="#8a5f2c" strokeWidth="1.3" fill="none" />
      <path d="M126 24 l4 -6 M134 22 l5 -7" stroke="#ecd59c" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

export function Star4({ className = "", style }: IconProps) {
  return (
    <svg aria-hidden viewBox="0 0 24 24" className={className} style={style}>
      <path d="M12 0 L14.5 9.5 L24 12 L14.5 14.5 L12 24 L9.5 14.5 L0 12 L9.5 9.5z" fill="currentColor" />
    </svg>
  );
}
