/**
 * Original enchanted-academy skyline. Gothic towers wear striped pennant roofs,
 * a nod to the carnival tents on the Funtastic logo. Split into layers so the
 * hero can parallax them independently.
 */

export function Hills({ className = "" }: { className?: string }) {
  return (
    <svg aria-hidden viewBox="0 0 1440 400" preserveAspectRatio="xMidYMax slice" className={className}>
      <defs>
        <linearGradient id="hill-far" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0" stopColor="#2b4f91" />
          <stop offset="1" stopColor="#1b335c" />
        </linearGradient>
      </defs>
      <path
        fill="url(#hill-far)"
        opacity=".85"
        d="M0 250c120-60 220-90 340-70s200 70 320 60 220-90 360-90 260 60 420 40v210H0z"
      />
      <path fill="#162a4d" d="M0 320c160-40 300-30 450-5s300 20 470-10 330-20 520 10v85H0z" />
    </svg>
  );
}

const GROUND = 640;

function Tower({
  x,
  w,
  top,
  roof,
  flag = true,
}: {
  x: number;
  w: number;
  top: number;
  roof: number;
  flag?: boolean;
}) {
  const cx = x + w / 2;
  const apex = top - roof;
  const eave = 10;
  const stripes = 6;
  const merlons = Math.max(3, Math.round(w / 14));
  const merlonW = w / (merlons * 2 - 1);
  const windows = Math.floor((GROUND - top - 60) / 74);
  return (
    <g>
      {/* body: stone gradient, moonlit right edge, shaded left edge */}
      <rect x={x} y={top} width={w} height={GROUND - top} fill="url(#castle-stone)" />
      <rect x={x + w * 0.7} y={top} width={w * 0.3} height={GROUND - top} fill="#a9c8ff" opacity=".14" />
      <rect x={x} y={top} width={w * 0.18} height={GROUND - top} fill="#050d1f" opacity=".28" />
      {/* corbelled battlement ring under the roof */}
      <path d={`M${x - 6} ${top + 4}h${w + 12}v14h-${w + 12}z`} fill="#25457e" />
      {Array.from({ length: merlons }, (_, i) => (
        <rect key={i} x={x + i * merlonW * 2} y={top - 6} width={merlonW} height={10} fill="#25457e" />
      ))}
      {/* striped carnival-tent roof */}
      <path d={`M${x - eave} ${top}L${cx} ${apex}L${x + w + eave} ${top}z`} fill="url(#castle-roof)" />
      {Array.from({ length: stripes }, (_, i) => {
        const span = (w + eave * 2) / stripes;
        const a = x - eave + span * i;
        return i % 2 === 1 ? (
          <path key={i} d={`M${a} ${top}L${cx} ${apex}L${a + span} ${top}z`} fill="#e6efff" opacity=".78" />
        ) : null;
      })}
      <path
        d={`M${x - eave - 2} ${top}h${w + eave * 2 + 4}v6h-${w + eave * 2 + 4}z`}
        fill="#ecd59c"
        opacity=".85"
      />
      <circle cx={cx} cy={apex} r="3.5" fill="#ecd59c" />
      {flag ? (
        <>
          <path d={`M${cx} ${apex}v-36`} stroke="#ecd59c" strokeWidth="2" />
          <path d={`M${cx} ${apex - 36}c10 2 18 -2 28 2-6 4-6 8 0 12-10-4-18 0-28-2z`} fill="#ecd59c" />
        </>
      ) : null}
      {/* lit gothic windows */}
      {Array.from({ length: windows }, (_, i) => {
        const wy = top + 52 + i * 74;
        const lit = i % 3 !== 1;
        return (
          <g key={i}>
            {lit ? <circle cx={cx} cy={wy} r="18" fill="#ffcf7a" opacity=".14" /> : null}
            <path d={`M${cx - 6} ${wy + 12}v-14a6 6 0 0 1 12 0v14z`} fill={lit ? "#ffd98f" : "#0c2f6b"} />
          </g>
        );
      })}
    </g>
  );
}

function Banner({ x, y }: { x: number; y: number }) {
  return (
    <g>
      <path d={`M${x} ${y}h22v46l-11-9-11 9z`} fill="#1d4ed8" />
      <path d={`M${x} ${y}h22v4h-22z`} fill="#ecd59c" />
      <path d={`M${x + 11} ${y + 14}l3 7h7l-5.5 4.5 2 7-6.5-4-6.5 4 2-7-5.5-4.5h7z`} fill="#ecd59c" opacity=".9" />
    </g>
  );
}

/**
 * The castle is drawn inside a tight viewBox and scaled with `meet`, so every
 * spire and flag stays visible on any screen shape (no cropping).
 */
export function Castle({ className = "" }: { className?: string }) {
  const wallTop = 440;
  return (
    <svg aria-hidden viewBox="250 40 940 600" preserveAspectRatio="xMidYMax meet" className={className}>
      <defs>
        <linearGradient id="castle-stone" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0" stopColor="#2c56a0" />
          <stop offset=".55" stopColor="#1d3b70" />
          <stop offset="1" stopColor="#142a52" />
        </linearGradient>
        <linearGradient id="castle-roof" x1="0" x2="1" y1="0" y2="0">
          <stop offset="0" stopColor="#1e4fc2" />
          <stop offset=".6" stopColor="#3b82f6" />
          <stop offset="1" stopColor="#60a5fa" />
        </linearGradient>
        <radialGradient id="castle-glow" cx="50%" cy="55%" r="50%">
          <stop offset="0" stopColor="#7cb4ff" stopOpacity=".38" />
          <stop offset="1" stopColor="#7cb4ff" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="castle-fade" x1="0" x2="0" y1="0" y2="1">
          <stop offset=".78" stopColor="#fff" />
          <stop offset="1" stopColor="#fff" stopOpacity=".25" />
        </linearGradient>
        <mask id="castle-mask" maskUnits="userSpaceOnUse" x="250" y="0" width="940" height="640">
          <rect x="250" y="0" width="940" height="640" fill="url(#castle-fade)" />
        </mask>
      </defs>
      <g mask="url(#castle-mask)">

      {/* soft magical glow behind the silhouette */}
      <ellipse cx={720} cy={380} rx={460} ry={300} fill="url(#castle-glow)" />

      {/* curtain wall with crenellations */}
      <path
        fill="url(#castle-stone)"
        d={`M330 ${wallTop}${"h12v-16h12v16".repeat(33)}h12V${GROUND}H330z`}
      />
      <path d={`M330 ${wallTop}h804v8H330z`} fill="#ecd59c" opacity=".35" />
      <Banner x={500} y={wallTop + 22} />
      <Banner x={918} y={wallTop + 22} />

      <Tower x={290} w={48} top={410} roof={78} flag={false} />
      <Tower x={1102} w={48} top={410} roof={78} flag={false} />
      <Tower x={410} w={66} top={310} roof={108} />
      <Tower x={964} w={66} top={310} roof={108} />
      <Tower x={536} w={72} top={220} roof={146} />
      <Tower x={832} w={72} top={220} roof={146} />

      {/* great hall */}
      <rect x={618} y={300} width={204} height={GROUND - 300} fill="url(#castle-stone)" />
      <rect x={762} y={300} width={60} height={GROUND - 300} fill="#a9c8ff" opacity=".12" />
      <path d="M598 302L720 150L842 302z" fill="url(#castle-roof)" />
      {[0, 2, 4].map((i) => {
        const span = 244 / 6;
        const a = 598 + span * (i + 1);
        return <path key={i} d={`M${a} 302L720 150L${a + span} 302z`} fill="#e6efff" opacity=".78" />;
      })}
      <path d="M594 300h252v7H594z" fill="#ecd59c" opacity=".85" />
      <circle cx={720} cy={150} r={4.5} fill="#ecd59c" />
      <path d="M720 150v-46" stroke="#ecd59c" strokeWidth="2.5" />
      <path d="M720 104c12 2 22-2 34 2-7 5-7 10 0 15-12-4-22 0-34-2z" fill="#ecd59c" />

      {/* rose window */}
      <circle cx={720} cy={372} r={48} fill="#ffcf7a" opacity=".16" />
      <circle cx={720} cy={372} r={30} fill="#ecd59c" />
      <circle cx={720} cy={372} r={26} fill="#ffd98f" />
      <g stroke="#1d3b70" strokeWidth="3">
        {Array.from({ length: 8 }, (_, i) => {
          const a = (i * Math.PI) / 4;
          return (
            <path
              key={i}
              d={`M720 372L${(720 + 26 * Math.cos(a)).toFixed(1)} ${(372 + 26 * Math.sin(a)).toFixed(1)}`}
            />
          );
        })}
      </g>
      <circle cx={720} cy={372} r={8} fill="#3b82f6" />

      {/* hall windows */}
      {[652, 768].map((x) => (
        <g key={x}>
          <circle cx={x + 10} cy={478} r="24" fill="#ffcf7a" opacity=".12" />
          <path d={`M${x} 506v-38a10 10 0 0 1 20 0v38z`} fill="#ffd98f" />
        </g>
      ))}

      {/* great gate with portcullis */}
      <path d={`M684 ${GROUND}v-74a36 36 0 0 1 72 0v74z`} fill="#ecd59c" opacity=".55" />
      <path d={`M690 ${GROUND}v-72a30 30 0 0 1 60 0v72z`} fill="#0c2244" />
      <path d={`M690 ${GROUND}v-72a30 30 0 0 1 60 0v72z`} fill="#ffcf7a" opacity=".18" />
      <g stroke="#ecd59c" strokeOpacity=".45" strokeWidth="2">
        {[700, 712, 724, 736].map((gx) => (
          <path key={gx} d={`M${gx} ${GROUND}v-86`} />
        ))}
        {[584, 604, 624].map((gy) => (
          <path key={gy} d={`M692 ${gy}h56`} />
        ))}
      </g>

      </g>
    </svg>
  );
}

/** Original rune ring that slowly rotates behind the hero logo. */
export function RuneRing({ className = "" }: { className?: string }) {
  const glyphs = "ᚠᚢᚦᚨᚱᚲᚷᚹᚺᚾᛁᛃᛇᛈᛉᛊᛏᛒᛖᛗᛚᛜᛞᛟ";
  return (
    <svg aria-hidden viewBox="0 0 400 400" className={className}>
      <defs>
        <path id="rune-path" d="M200 200m-170 0a170 170 0 1 1 340 0a170 170 0 1 1-340 0" />
      </defs>
      <circle cx="200" cy="200" r="190" fill="none" stroke="#d6b46a" strokeOpacity=".35" />
      <circle cx="200" cy="200" r="182" fill="none" stroke="#d6b46a" strokeOpacity=".2" strokeDasharray="2 6" />
      <circle cx="200" cy="200" r="150" fill="none" stroke="#d6b46a" strokeOpacity=".25" />
      <text fill="#d6b46a" fillOpacity=".55" fontSize="17" letterSpacing="9">
        <textPath href="#rune-path">{glyphs + glyphs}</textPath>
      </text>
    </svg>
  );
}
