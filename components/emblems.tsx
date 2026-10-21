import type { CompetitionId } from "@/content/event";

/** Original line-art emblems for each competition. */
export function CompetitionEmblem({ id, className = "" }: { id: CompetitionId; className?: string }) {
  const common = { fill: "none", stroke: "currentColor", strokeWidth: 2, strokeLinecap: "round" as const, strokeLinejoin: "round" as const };
  return (
    <svg aria-hidden viewBox="0 0 96 96" className={className}>
      <circle cx="48" cy="48" r="45" {...common} strokeWidth={1} opacity=".5" />
      <circle cx="48" cy="48" r="40" {...common} strokeWidth={1} strokeDasharray="1.5 4" opacity=".6" />
      {id === "futsal" ? (
        <g {...common}>
          <circle cx="48" cy="50" r="18" />
          <path d="M48 41l7 5-2.7 8.3h-8.6L41 46z" fill="currentColor" fillOpacity=".25" />
          <path d="M48 41v-9M55 46l8-4M52.3 54.3l5 7.7M43.7 54.3l-5 7.7M41 46l-8-4" />
          <path d="M30 24l3 4M66 24l-3 4M48 18v4" opacity=".7" />
        </g>
      ) : null}
      {id === "tka" ? (
        <g {...common}>
          <path d="M26 34c8-3 15-3 22 2v30c-7-5-14-5-22-2z" />
          <path d="M70 34c-8-3-15-3-22 2v30c7-5 14-5 22-2z" />
          <path d="M31 42c4-1 8-1 12 1M31 49c4-1 8-1 12 1M53 43c4-2 8-2 12-1M53 50c4-2 8-2 12-1" opacity=".6" />
          <path d="M62 16l8 8-14 14-9 2 2-9z" fill="currentColor" fillOpacity=".2" />
        </g>
      ) : null}
      {id === "mewarnai" ? (
        <g {...common}>
          <path d="M48 24c-14 0-24 10-24 22 0 11 9 18 17 18 4 0 5-3 4-6s1-6 5-6h7c7 0 11-5 11-11 0-10-9-17-20-17z" />
          <circle cx="37" cy="42" r="3" fill="currentColor" />
          <circle cx="46" cy="34" r="3" fill="currentColor" />
          <circle cx="57" cy="36" r="3" fill="currentColor" />
          <path d="M60 58l14 14M58 64l4-4 6 6-4 4z" />
        </g>
      ) : null}
    </svg>
  );
}
