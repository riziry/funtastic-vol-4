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
          <stop offset="0" stopColor="#3b1a4a" />
          <stop offset="1" stopColor="#1d0b18" />
        </linearGradient>
      </defs>
      <path
        fill="url(#hill-far)"
        opacity=".85"
        d="M0 250c120-60 220-90 340-70s200 70 320 60 220-90 360-90 260 60 420 40v210H0z"
      />
      <path fill="#170812" d="M0 320c160-40 300-30 450-5s300 20 470-10 330-20 520 10v85H0z" />
    </svg>
  );
}

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
  const stripes = 5;
  return (
    <g>
      <rect x={x} y={top} width={w} height={640 - top} fill="#1a0810" />
      {/* striped conical roof */}
      <path d={`M${x - 8} ${top}L${cx} ${apex}L${x + w + 8} ${top}z`} fill="#6e0d22" />
      {Array.from({ length: stripes }, (_, i) => {
        const a = x - 8 + ((w + 16) / stripes) * i;
        const b = a + (w + 16) / stripes / 2;
        return <path key={i} d={`M${a} ${top}L${cx} ${apex}L${b} ${top}z`} fill="#a61b32" opacity=".85" />;
      })}
      <path d={`M${x - 10} ${top}h${w + 20}v6h-${w + 20}z`} fill="#d6b46a" opacity=".7" />
      {flag ? (
        <>
          <path d={`M${cx} ${apex}v-34`} stroke="#d6b46a" strokeWidth="2" />
          <path d={`M${cx} ${apex - 34}l26 7-26 8z`} fill="#c8324a" />
        </>
      ) : null}
      {/* lit gothic windows */}
      {Array.from({ length: Math.floor((640 - top - 40) / 70) }, (_, i) => (
        <g key={i}>
          <circle cx={cx} cy={top + 46 + i * 70} r="16" fill="#ffcf7a" opacity=".12" />
          <path
            d={`M${cx - 5} ${top + 56 + i * 70}v-12a5 5 0 0 1 10 0v12z`}
            fill={i % 3 === 1 ? "#5a2a2a" : "#ffd98f"}
          />
        </g>
      ))}
    </g>
  );
}

export function Castle({ className = "" }: { className?: string }) {
  return (
    <svg aria-hidden viewBox="0 0 1440 640" preserveAspectRatio="xMidYMax slice" className={className}>
      <defs>
        <linearGradient id="castle-shade" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0" stopColor="#140d12" stopOpacity="0" />
          <stop offset="1" stopColor="#140d12" />
        </linearGradient>
      </defs>
      {/* curtain wall with crenellations */}
      <path
        fill="#1a0810"
        d={`M360 430${"h10v-14h10v14".repeat(36)}V640H360z`}
      />
      <Tower x={300} w={44} top={400} roof={70} flag={false} />
      <Tower x={1096} w={44} top={410} roof={70} flag={false} />
      <Tower x={420} w={64} top={300} roof={100} />
      <Tower x={956} w={64} top={320} roof={96} />
      <Tower x={540} w={70} top={200} roof={140} />
      <Tower x={830} w={70} top={225} roof={130} />
      {/* great hall */}
      <rect x={620} y={300} width={200} height={340} fill="#1f0912" />
      <path d="M600 300L720 150L840 300z" fill="#6e0d22" />
      <path d="M600 300L720 150L660 300zM720 150L780 300h-60z" fill="#a61b32" opacity=".85" />
      <path d="M596 300h248v7H596z" fill="#d6b46a" opacity=".7" />
      <path d="M720 150v-44" stroke="#d6b46a" strokeWidth="2.5" />
      <path d="M720 106l34 9-34 10z" fill="#c8324a" />
      {/* rose window */}
      <circle cx={720} cy={370} r={44} fill="#ffcf7a" opacity=".12" />
      <circle cx={720} cy={370} r={26} fill="#ffd98f" />
      <g stroke="#1f0912" strokeWidth="3">
        {Array.from({ length: 8 }, (_, i) => {
          const a = (i * Math.PI) / 4;
          return <path key={i} d={`M720 370L${(720 + 26 * Math.cos(a)).toFixed(1)} ${(370 + 26 * Math.sin(a)).toFixed(1)}`} />;
        })}
      </g>
      <circle cx={720} cy={370} r={8} fill="#a61b32" />
      {/* hall windows + great door */}
      {[650, 770].map((x) => (
        <g key={x}>
          <circle cx={x + 10} cy={470} r="22" fill="#ffcf7a" opacity=".1" />
          <path d={`M${x} ${500}v-36a10 10 0 0 1 20 0v36z`} fill="#ffd98f" />
        </g>
      ))}
      <path d="M690 640v-70a30 30 0 0 1 60 0v70z" fill="#ffcf7a" opacity=".2" />
      <path d="M698 640v-66a22 22 0 0 1 44 0v66z" fill="#2b0c14" />
      <rect x={0} y={0} width={1440} height={640} fill="url(#castle-shade)" opacity=".55" />
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
