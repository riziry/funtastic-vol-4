import Image from "next/image";
import { REGISTRATION_URL, event, formatEventDate, isEventDateComplete, logos, mapsLink, navItems } from "@/content/event";

async function CopyrightYear() {
  "use cache";
  return <>{new Date().getFullYear()}</>;
}

export function Footer() {
  const links = [...navItems, { id: "payment", label: "Payment" }];
  return (
    <footer className="relative border-t border-gold/20 bg-wine">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-14 sm:px-6 md:grid-cols-[1.3fr_1fr_1fr]">
        <div>
          <Image src={logos.event.src} alt={logos.event.alt} width={logos.event.width} height={logos.event.height} sizes="10rem" className="h-auto w-36" />
          <p className="mt-4 max-w-xs font-serif text-lg text-ivory/75">
            {event.fullName} — {event.tagline}.
          </p>
          <p className="mt-1 text-sm text-ivory/55">Organised by {event.organizer}.</p>
          <div className="mt-5 flex items-center gap-3">
            <span className="grid size-14 place-items-center rounded-full bg-ivory p-2">
              <Image src={logos.school.src} alt={logos.school.alt} width={logos.school.width} height={logos.school.height} sizes="56px" className="h-auto w-full" />
            </span>
            <span className="grid size-14 place-items-center rounded-full bg-ivory p-2">
              <Image src={logos.osis.src} alt={logos.osis.alt} width={logos.osis.width} height={logos.osis.height} sizes="56px" className="h-full w-auto" />
            </span>
          </div>
        </div>

        <nav aria-label="Footer">
          <p className="eyebrow mb-4">Quick links</p>
          <ul className="grid grid-cols-2 gap-x-6 gap-y-2.5">
            {links.map((l) => (
              <li key={l.id}>
                <a href={`#${l.id}`} className="text-ivory/75 transition-colors hover:text-gold-light">
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div>
          <p className="eyebrow mb-4">The carnival</p>
          <p className="font-display text-2xl font-bold text-gold-light">{formatEventDate()}</p>
          {!isEventDateComplete() ? <p className="text-sm text-ivory/60">Month &amp; year to be announced</p> : null}
          <a
            href={mapsLink(`${event.venue.name}, ${event.venue.address}`)}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-3 block text-sm leading-relaxed text-ivory/70 hover:text-gold-light"
          >
            <span className="font-semibold text-ivory">{event.venue.name}</span>
            <br />
            {event.venue.address}
          </a>
          <div className="mt-5 flex flex-col items-start gap-3">
            <a href="#contact" className="text-ivory/75 underline-offset-4 hover:text-gold-light hover:underline">
              Contact the organizers
            </a>
            <a href={REGISTRATION_URL} target="_blank" rel="noopener noreferrer" data-burst className="btn btn-primary min-h-11 px-5 py-2 text-sm">
              Register Now
              <span className="sr-only">(opens in a new tab)</span>
            </a>
          </div>
        </div>
      </div>
      <div className="border-t border-gold/10 px-4 py-5 text-center text-sm text-ivory/55">
        © <CopyrightYear /> {event.fullName}. All rights reserved.
      </div>
    </footer>
  );
}
