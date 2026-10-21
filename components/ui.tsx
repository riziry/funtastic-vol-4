import { useId } from "react";
import { ArrowUpRight } from "lucide-react";
import { REGISTRATION_URL } from "@/content/event";
import { Star4 } from "./magic-icons";
import { Reveal } from "./reveal";

/** Every registration CTA on the site goes through this component. */
export function RegisterButton({
  label = "Register Now",
  className = "",
  size = "md",
}: {
  label?: string;
  className?: string;
  size?: "md" | "lg";
}) {
  return (
    <a
      href={REGISTRATION_URL}
      target="_blank"
      rel="noopener noreferrer"
      data-burst
      className={`btn btn-primary sweep ${size === "lg" ? "min-h-14 px-9 text-base" : ""} ${className}`}
    >
      {label}
      <ArrowUpRight aria-hidden className="size-4" />
      <span className="sr-only">(opens the registration form in a new tab)</span>
    </a>
  );
}

export function SectionHeading({
  id,
  eyebrow,
  title,
  description,
  tone = "dark",
  align = "center",
}: {
  id?: string;
  eyebrow: string;
  title: React.ReactNode;
  description?: React.ReactNode;
  tone?: "dark" | "light";
  align?: "center" | "left";
}) {
  const centered = align === "center";
  return (
    <Reveal className={`mb-12 flex flex-col gap-4 md:mb-16 ${centered ? "items-center text-center" : "items-start"}`}>
      <p className={`eyebrow inline-flex items-center gap-3 ${tone === "light" ? "text-crimson!" : ""}`}>
        <Star4 className="size-3 animate-twinkle" />
        {eyebrow}
        <Star4 className="size-3 animate-twinkle [animation-delay:-1.2s]" />
      </p>
      <h2
        id={id}
        className={`font-display text-3xl leading-tight font-bold text-balance sm:text-4xl md:text-5xl ${
          tone === "light" ? "text-ink" : "text-ivory"
        }`}
      >
        {title}
      </h2>
      <Flourish className={tone === "light" ? "text-crimson/70" : "text-gold/80"} />
      {description ? (
        <p
          className={`max-w-2xl font-serif text-lg leading-relaxed text-pretty sm:text-xl ${
            tone === "light" ? "text-ink/80" : "text-ivory/75"
          }`}
        >
          {description}
        </p>
      ) : null}
    </Reveal>
  );
}

/** Fine gold divider with a central diamond star. */
export function Flourish({ className = "text-gold/80" }: { className?: string }) {
  return (
    <svg aria-hidden viewBox="0 0 240 20" className={`h-4 w-48 ${className}`} fill="none">
      <path d="M0 10h96M144 10h96" stroke="currentColor" strokeWidth="1" />
      <path d="M60 10c12-7 24-7 36 0M180 10c-12-7-24-7-36 0" stroke="currentColor" strokeWidth="1" opacity=".6" />
      <path d="M120 1l5 9-5 9-5-9 5-9z" fill="currentColor" />
      <circle cx="104" cy="10" r="2" fill="currentColor" />
      <circle cx="136" cy="10" r="2" fill="currentColor" />
    </svg>
  );
}

/** Ornamental corner brackets for framed panels. */
export function Corners({ className = "text-gold/70" }: { className?: string }) {
  const corner = "pointer-events-none absolute size-7 sm:size-9";
  const path = <path d="M2 30V10a8 8 0 0 1 8-8h20M8 30V14a6 6 0 0 1 6-6h16" stroke="currentColor" strokeWidth="1.2" fill="none" />;
  return (
    <span aria-hidden className={className}>
      <svg viewBox="0 0 32 32" className={`${corner} top-2 left-2`}>{path}</svg>
      <svg viewBox="0 0 32 32" className={`${corner} top-2 right-2 rotate-90`}>{path}</svg>
      <svg viewBox="0 0 32 32" className={`${corner} right-2 bottom-2 rotate-180`}>{path}</svg>
      <svg viewBox="0 0 32 32" className={`${corner} bottom-2 left-2 -rotate-90`}>{path}</svg>
    </span>
  );
}

/** Original wax seal emblem: a star within a scalloped seal. */
export function WaxSeal({ className = "", label = "F4" }: { className?: string; label?: string }) {
  const gradientId = useId();
  return (
    <svg viewBox="0 0 120 120" className={className} aria-hidden>
      <defs>
        <radialGradient id={gradientId} cx="40%" cy="35%" r="70%">
          <stop offset="0" stopColor="#d23a52" />
          <stop offset=".55" stopColor="#8c1229" />
          <stop offset="1" stopColor="#4a0716" />
        </radialGradient>
      </defs>
      <path
        fill={`url(#${gradientId})`}
        d="M60 4c6 0 8 6 13 7s10-3 14 1 1 10 4 14 10 4 11 10-4 8-4 14 6 9 4 14-9 5-11 10 1 11-4 14-9-1-14 1-7 7-13 7-8-6-13-7-10 3-14-1-1-10-4-14-10-4-11-10 4-8 4-14-6-9-4-14 9-5 11-10-1-11 4-14 9 1 14-1 7-7 13-7z"
      />
      <circle cx="60" cy="60" r="36" fill="none" stroke="#f0b8a4" strokeOpacity=".45" strokeWidth="1.5" />
      <circle cx="60" cy="60" r="31" fill="none" stroke="#2a0510" strokeOpacity=".5" strokeWidth="1" />
      <path d="M60 33l5.5 14.5 15.5.8-12 9.8 4 15-13-8.4-13 8.4 4-15-12-9.8 15.5-.8z" fill="#f6c9b5" fillOpacity=".25" />
      <text x="60" y="68" textAnchor="middle" fontFamily="var(--font-cinzel), serif" fontWeight="700" fontSize="22" fill="#fde1d0" fillOpacity=".9">
        {label}
      </text>
    </svg>
  );
}
