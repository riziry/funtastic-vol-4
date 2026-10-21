"use client";

import { useEffect, useRef } from "react";

const BURST_EVENT = "funtastic:burst";
const COLORS = ["#ecd59c", "#d6b46a", "#fff6dc", "#c8324a", "#a61b32", "#f4e9d5", "#b58be0"];

/** Fire a confetti + star burst at viewport coordinates. */
export function burst(x: number, y: number, count = 40) {
  window.dispatchEvent(new CustomEvent(BURST_EVENT, { detail: { x, y, count } }));
}

type Particle = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  max: number;
  size: number;
  color: string;
  spin: number;
  angle: number;
  kind: "spark" | "confetti" | "star";
  gravity: number;
};

function drawStar(ctx: CanvasRenderingContext2D, r: number) {
  ctx.beginPath();
  for (let i = 0; i < 8; i++) {
    const rad = i % 2 === 0 ? r : r * 0.35;
    const a = (i * Math.PI) / 4;
    ctx.lineTo(Math.cos(a) * rad, Math.sin(a) * rad);
  }
  ctx.closePath();
  ctx.fill();
}

/**
 * One fixed canvas for every bit of sparkle on the page: the wand-cursor trail
 * on pointer devices, plus confetti bursts on CTA clicks and the curtain reveal.
 * The animation loop only runs while particles are alive.
 */
export function SparkleLayer() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const particles: Particle[] = [];
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    let raf = 0;

    const resize = () => {
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();

    const tick = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.life++;
        if (p.life > p.max) {
          particles.splice(i, 1);
          continue;
        }
        p.vy += p.gravity;
        p.vx *= 0.985;
        p.x += p.vx;
        p.y += p.vy;
        p.angle += p.spin;
        const t = 1 - p.life / p.max;
        ctx.save();
        ctx.globalAlpha = Math.min(1, t * 1.6);
        ctx.translate(p.x, p.y);
        ctx.rotate(p.angle);
        ctx.fillStyle = p.color;
        if (p.kind === "confetti") {
          ctx.fillRect(-p.size / 2, -p.size / 4, p.size, p.size / 2);
        } else if (p.kind === "star") {
          drawStar(ctx, p.size);
        } else {
          ctx.shadowColor = p.color;
          ctx.shadowBlur = 8;
          drawStar(ctx, p.size * t + 0.5);
        }
        ctx.restore();
      }
      raf = particles.length ? requestAnimationFrame(tick) : 0;
    };
    const start = () => {
      if (!raf) raf = requestAnimationFrame(tick);
    };

    const pick = () => COLORS[(Math.random() * COLORS.length) | 0];

    // Wand trail: only for precise pointers, throttled by distance.
    let lastX = -999;
    let lastY = -999;
    const finePointer = window.matchMedia("(pointer: fine)").matches;
    const onMove = (e: PointerEvent) => {
      if (e.pointerType !== "mouse") return;
      const dx = e.clientX - lastX;
      const dy = e.clientY - lastY;
      if (dx * dx + dy * dy < 140) return;
      lastX = e.clientX;
      lastY = e.clientY;
      if (particles.length > 160) return;
      for (let i = 0; i < 2; i++) {
        particles.push({
          x: e.clientX + (Math.random() - 0.5) * 6,
          y: e.clientY + (Math.random() - 0.5) * 6,
          vx: (Math.random() - 0.5) * 0.8,
          vy: Math.random() * 0.6 + 0.2,
          life: 0,
          max: 28 + Math.random() * 18,
          size: 2.5 + Math.random() * 3,
          color: i ? "#fff6dc" : "#ecd59c",
          spin: (Math.random() - 0.5) * 0.2,
          angle: Math.random() * Math.PI,
          kind: "spark",
          gravity: 0.02,
        });
      }
      start();
    };

    const onBurst = (e: Event) => {
      const { x, y, count } = (e as CustomEvent<{ x: number; y: number; count: number }>).detail;
      for (let i = 0; i < count; i++) {
        const a = Math.random() * Math.PI * 2;
        const speed = 3 + Math.random() * 7;
        particles.push({
          x,
          y,
          vx: Math.cos(a) * speed,
          vy: Math.sin(a) * speed - 3,
          life: 0,
          max: 60 + Math.random() * 50,
          size: Math.random() < 0.3 ? 5 + Math.random() * 4 : 7 + Math.random() * 6,
          color: pick(),
          spin: (Math.random() - 0.5) * 0.4,
          angle: Math.random() * Math.PI,
          kind: Math.random() < 0.3 ? "star" : "confetti",
          gravity: 0.16,
        });
      }
      start();
    };

    // Any element marked data-burst throws confetti when activated.
    const onClick = (e: MouseEvent) => {
      const target = (e.target as Element | null)?.closest("[data-burst]");
      if (!target) return;
      const r = target.getBoundingClientRect();
      burst(r.left + r.width / 2, r.top + r.height / 2, 45);
    };

    window.addEventListener("resize", resize);
    window.addEventListener(BURST_EVENT, onBurst);
    document.addEventListener("click", onClick);
    if (finePointer) window.addEventListener("pointermove", onMove, { passive: true });
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      window.removeEventListener(BURST_EVENT, onBurst);
      document.removeEventListener("click", onClick);
      window.removeEventListener("pointermove", onMove);
    };
  }, []);

  return <canvas ref={canvasRef} aria-hidden className="pointer-events-none fixed inset-0 z-[90] size-full" />;
}
