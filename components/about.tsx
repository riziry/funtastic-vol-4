import Image from "next/image";
import { CalendarDays, MapPin, Sparkles } from "lucide-react";
import { event, formatEventDate, isEventDateComplete, logos, mapsLink, welcomeLetter } from "@/content/event";
import { Bunting, FloatingMagic } from "./carnival-decor";
import { Reveal } from "./reveal";
import { Corners, Flourish, SectionHeading, WaxSeal } from "./ui";

export function About() {
  return (
    <section id="about" aria-labelledby="about-title" className="relative overflow-hidden py-24 sm:py-32">
      <div aria-hidden className="absolute inset-0 -z-10 bg-[radial-gradient(60%_50%_at_50%_30%,rgb(127_16_38/0.25),transparent_70%)]" />
      <Bunting className="top-6" />
      <FloatingMagic
        items={[
          { kind: "letter", className: "top-[22%] left-[3%] w-24 -rotate-12 hidden lg:block" },
          { kind: "star", className: "top-[16%] right-[10%] w-6", delay: "-1s" },
          { kind: "star", className: "bottom-[20%] left-[8%] w-5", delay: "-2.5s" },
          { kind: "letter", className: "bottom-[12%] right-[2%] w-20 rotate-12 hidden xl:block", delay: "-3s" },
        ]}
      />
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <SectionHeading id="about-title" eyebrow="An invitation" title="A Letter From the Academy" />

        <div className="grid items-end gap-10 lg:grid-cols-[1fr_17rem]">
          <Reveal className="relative">
            <article className="parchment relative rounded-sm px-6 py-12 shadow-[0_40px_80px_-30px_rgb(0_0_0/0.9)] sm:px-14 sm:py-16">
              <Corners className="text-crimson/50" />
              <WaxSeal className="absolute -top-10 right-6 size-20 drop-shadow-[0_8px_12px_rgb(0_0_0/0.45)] sm:right-12 sm:size-24" />

              <p className="font-display text-xs font-bold tracking-[0.3em] text-crimson uppercase">
                {event.fullName} · {event.tagline}
              </p>
              <p className="mt-6 font-serif text-xl text-ink italic sm:text-2xl">{welcomeLetter.salutation}</p>
              <div className="mt-5 space-y-4 font-serif text-lg leading-relaxed text-ink/90 sm:text-xl">
                {welcomeLetter.paragraphs.map((p) => (
                  <p key={p}>{p}</p>
                ))}
              </div>

              <div className="mt-8 flex flex-col gap-3 border-y border-crimson/25 py-4">
                <p className="inline-flex flex-wrap items-center gap-3">
                  <CalendarDays aria-hidden className="size-5 text-crimson" />
                  <span className="font-display text-lg font-bold text-crimson">{formatEventDate()}</span>
                  {!isEventDateComplete() ? (
                    <span className="text-sm text-ink/65 italic">Month &amp; year to be announced</span>
                  ) : null}
                </p>
                <p className="flex items-start gap-3">
                  <MapPin aria-hidden className="mt-0.5 size-5 shrink-0 text-crimson" />
                  <span>
                    <span className="font-display font-bold text-crimson">{event.venue.name}</span>
                    <br />
                    <a
                      href={mapsLink(`${event.venue.name}, ${event.venue.address}`)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-ink/75 underline decoration-crimson/30 underline-offset-4 hover:text-crimson"
                    >
                      {event.venue.address}
                    </a>
                  </span>
                </p>
              </div>

              <div className="mt-8">
                <p className="font-serif text-lg text-ink/80 italic">{welcomeLetter.signOff}</p>
                <p className="mt-1 font-display text-xl font-bold text-ink">{welcomeLetter.signature}</p>
                <p className="text-sm text-ink/70">{event.organizer}</p>
              </div>

              <Flourish className="mt-8 text-crimson/50" />

              <ul className="mt-6 flex flex-wrap gap-2">
                {welcomeLetter.highlights.map((h) => (
                  <li
                    key={h}
                    className="inline-flex items-center gap-2 rounded-full border border-crimson/30 bg-ivory/50 px-4 py-1.5 text-sm font-semibold text-crimson"
                  >
                    <Sparkles aria-hidden className="size-3.5" />
                    {h}
                  </li>
                ))}
              </ul>
            </article>
          </Reveal>

          <Reveal delay={0.15} className="relative mx-auto w-52 sm:w-60 lg:w-full">
            <div aria-hidden className="absolute inset-x-0 bottom-0 h-2/3 rounded-full bg-[radial-gradient(circle,rgb(214_180_106/0.25),transparent_70%)]" />
            <Image
              src={logos.mascot.src}
              alt={logos.mascot.alt}
              width={logos.mascot.width}
              height={logos.mascot.height}
              sizes="(min-width: 1024px) 17rem, 15rem"
              className="relative h-auto w-full animate-bob drop-shadow-[0_20px_30px_rgb(0_0_0/0.6)] [animation-duration:5s]"
            />
            <p className="mt-3 text-center font-serif text-lg text-gold-light italic">“Welcome, one and all.”</p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
