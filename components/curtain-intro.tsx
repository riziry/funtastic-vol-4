"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { event, formatEventDate, logos } from "@/content/event";
import { Star4 } from "./magic-icons";
import { burst } from "./sparkle-layer";

const BURST = Array.from({ length: 18 }, (_, i) => {
  const angle = (i / 18) * Math.PI * 2;
  const dist = 180 + (i % 3) * 70;
  return {
    bx: `${Math.round(Math.cos(angle) * dist)}px`,
    by: `${Math.round(Math.sin(angle) * dist)}px`,
    size: 10 + (i % 4) * 5,
    color: i % 3 === 0 ? "#fff6dc" : i % 3 === 1 ? "#ecd59c" : "#f08a9b",
  };
});

/**
 * Opening curtain. Rendered on the server so it covers the first paint, opened
 * by pure CSS (works before hydration), then removed from the DOM.
 */
export function CurtainIntro() {
  const [mounted, setMounted] = useState(true);

  useEffect(() => {
    // Under reduced motion the stage is hidden by CSS and burst() is a no-op.
    const pop = setTimeout(() => burst(window.innerWidth / 2, window.innerHeight / 2, 70), 1150);
    const done = setTimeout(() => setMounted(false), 2900);
    return () => {
      clearTimeout(pop);
      clearTimeout(done);
    };
  }, []);

  if (!mounted) return null;

  return (
    <div aria-hidden className="curtain-stage">
      <div className="curtain-backdrop" />
      <div className="curtain-panel curtain-left" />
      <div className="curtain-panel curtain-right" />

      <svg viewBox="0 0 1440 140" preserveAspectRatio="none" className="curtain-valance">
        <defs>
          <linearGradient id="valance-g" x1="0" x2="0" y1="0" y2="1">
            <stop offset="0" stopColor="#3a0612" />
            <stop offset="1" stopColor="#8c1229" />
          </linearGradient>
        </defs>
        <path
          fill="url(#valance-g)"
          d={`M0 0H1440V96${Array.from({ length: 12 }, (_, i) => `Q${1440 - i * 120 - 60} 140 ${1440 - (i + 1) * 120} 96`).join("")}Z`}
        />
        <path
          fill="none"
          stroke="#d6b46a"
          strokeWidth="4"
          d={`M0 96${Array.from({ length: 12 }, (_, i) => `Q${i * 120 + 60} 140 ${(i + 1) * 120} 96`).join("")}`}
        />
        <path d="M0 18H1440" stroke="#d6b46a" strokeWidth="3" opacity=".7" />
        {Array.from({ length: 12 }, (_, i) => (
          <g key={i} transform={`translate(${i * 120 + 60} 118)`}>
            <path d="M0 0v10" stroke="#d6b46a" strokeWidth="2" />
            <path d="M-6 10h12l-3 16h-6z" fill="#d6b46a" />
          </g>
        ))}
      </svg>

      <div className="curtain-spot left-[8%] origin-top [--from:-18deg] [--to:14deg]" />
      <div className="curtain-spot right-[8%] origin-top [--from:18deg] [--to:-14deg]" />

      <div className="curtain-center">
        <div className="flex flex-col items-center px-6 text-center">
          <p className="eyebrow mb-4">Ladies &amp; gentlemen, welcome to</p>
          <Image
            src={logos.event.src}
            alt=""
            width={logos.event.width}
            height={logos.event.height}
            sizes="(min-width: 640px) 26rem, 75vw"
            preload
            className="h-auto w-[min(75vw,26rem)] drop-shadow-[0_0_50px_rgb(236_213_156/0.45)]"
          />
          <p className="mt-4 font-display text-lg font-bold tracking-[0.25em] text-gold-light uppercase">
            {formatEventDate()}
          </p>
          <p className="mt-1 font-serif text-base text-ivory/70 italic">{event.tagline}</p>
        </div>
      </div>

      {BURST.map((b, i) => (
        <span
          key={i}
          className="curtain-burst"
          style={{ "--bx": b.bx, "--by": b.by, color: b.color } as React.CSSProperties}
        >
          <Star4 style={{ width: b.size, height: b.size }} />
        </span>
      ))}
    </div>
  );
}
