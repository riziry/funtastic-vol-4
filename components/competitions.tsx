import {
  CalendarRange,
  Check,
  FileText,
  GraduationCap,
  ScrollText,
  Ticket,
  UserRound,
  Users,
} from "lucide-react";
import {
  competitions,
  contacts,
  registration,
  schedule,
  type Competition,
  type CompetitionId,
} from "@/content/event";
import { CompetitionEmblem } from "./emblems";
import { Bunting, FloatingMagic } from "./carnival-decor";
import { Reveal } from "./reveal";
import { Tilt } from "./tilt";
import { Corners, RegisterButton, SectionHeading } from "./ui";

/** Per-card accent so each invitation feels distinct within the crimson-and-gold palette. */
const accents: Record<
  CompetitionId,
  { glow: string; emblem: string; numeral: string }
> = {
  futsal: {
    glow: "bg-[radial-gradient(80%_60%_at_50%_0%,rgb(200_50_74/0.45),transparent_70%)]",
    emblem: "text-[#f08a9b]",
    numeral: "I",
  },
  tka: {
    glow: "bg-[radial-gradient(80%_60%_at_50%_0%,rgb(120_70_160/0.45),transparent_70%)]",
    emblem: "text-[#c9a7ea]",
    numeral: "II",
  },
  mewarnai: {
    glow: "bg-[radial-gradient(80%_60%_at_50%_0%,rgb(214_180_106/0.4),transparent_70%)]",
    emblem: "text-gold-light",
    numeral: "III",
  },
};

const details: {
  key: keyof Competition["details"];
  label: string;
  icon: typeof Users;
}[] = [
  { key: "participants", label: "Participants", icon: Users },
  { key: "fee", label: "Registration fee", icon: Ticket },
  { key: "schedule", label: "Schedule", icon: CalendarRange },
];

function CompetitionCard({
  competition,
  index,
}: {
  competition: Competition;
  index: number;
}) {
  const accent = accents[competition.id];
  const [student, teacher] = contacts[competition.id];
  const filled = details.filter(({ key }) => competition.details[key]);

  return (
    <Reveal as="li" delay={index * 0.12} className="h-full">
      <Tilt>
      <article className="group velvet gold-frame relative flex h-full flex-col overflow-hidden rounded-2xl px-6 pt-10 pb-7 transition-transform duration-500  sm:px-8">
        <div
          aria-hidden
          className={`absolute inset-0 ${accent.glow} opacity-70 transition-opacity duration-500 group-hover:opacity-100`}
        />
        <Corners />
        <div className="relative flex flex-1 flex-col">
          <p className="font-display text-sm font-bold tracking-[0.4em] text-gold/70">
            TRIAL {accent.numeral}
          </p>
          <CompetitionEmblem
            id={competition.id}
            className={`my-6 size-24 transition-transform duration-700 group-hover:scale-110 group-hover:rotate-6 ${accent.emblem}`}
          />
          <h3 className="font-display text-3xl font-bold text-ivory">
            {competition.name}
          </h3>
          <p className="mt-1 font-serif text-lg text-gold-light italic">
            {competition.epithet}
          </p>
          <p className="mt-4 leading-relaxed text-ivory/75">
            {competition.description}
          </p>

          <dl className="mt-6 space-y-3 border-t border-gold/20 pt-5 text-sm">
            <div className="flex items-start gap-3">
              <UserRound
                aria-hidden
                className="mt-0.5 size-4 shrink-0 text-gold"
              />
              <div>
                <dt className="text-xs font-bold tracking-[0.18em] text-ivory/55 uppercase">
                  Coordinator
                </dt>
                <dd className="font-semibold text-ivory">{student.name}</dd>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <GraduationCap
                aria-hidden
                className="mt-0.5 size-4 shrink-0 text-gold"
              />
              <div>
                <dt className="text-xs font-bold tracking-[0.18em] text-ivory/55 uppercase">
                  Teacher coordinator
                </dt>
                <dd className="font-semibold text-ivory">{teacher.name}</dd>
              </div>
            </div>
            {filled.map(({ key, label, icon: Icon }) => (
              <div key={key} className="flex items-start gap-3">
                <Icon
                  aria-hidden
                  className="mt-0.5 size-4 shrink-0 text-gold"
                />
                <div>
                  <dt className="text-xs font-bold tracking-[0.18em] text-ivory/55 uppercase">
                    {label}
                  </dt>
                  <dd
                    className={
                      key === "fee"
                        ? "font-display text-lg font-bold text-gold-light"
                        : "text-ivory"
                    }
                  >
                    {competition.details[key]}
                  </dd>
                </div>
              </div>
            ))}
          </dl>

          {competition.rules.length > 0 ? (
            <div className="mt-5 rounded-lg border border-gold/20 bg-midnight/40 px-4 py-3">
              <p className="mb-2 flex items-center gap-2 text-xs font-bold tracking-[0.18em] text-gold uppercase">
                <ScrollText aria-hidden className="size-3.5" />
                Key rules
              </p>
              <ul className="space-y-1.5 text-sm text-ivory/80">
                {competition.rules.map((rule) => (
                  <li key={rule} className="flex gap-2">
                    <span aria-hidden className="text-gold/70">
                      ✦
                    </span>
                    {rule}
                  </li>
                ))}
              </ul>
            </div>
          ) : null}

          {filled.length === 0 && competition.rules.length === 0 ? (
            <p className="mt-5 rounded-lg border border-dashed border-gold/30 px-4 py-3 text-sm text-ivory/65">
              Rules, schedule and fees will be announced soon.
            </p>
          ) : null}
        </div>
      </article>
      </Tilt>
    </Reveal>
  );
}

function RegistrationInfo() {
  return (
    <Reveal className="velvet gold-frame relative mt-14 rounded-2xl p-6 sm:p-10">
      <Corners />
      <div className="grid gap-8 lg:grid-cols-3">
        <div>
          <p className="eyebrow mb-3">How to register</p>
          <h3 className="font-display text-2xl font-bold text-ivory">
            Registration period
          </h3>
          <p className="mt-2 font-serif text-xl text-gold-light">
            {registration.period}
          </p>
          <ul className="mt-5 space-y-3">
            {registration.channels.map((c) => (
              <li key={c.label} className="flex gap-3 text-sm text-ivory/80">
                <span className="h-fit rounded-full border border-gold/40 px-2.5 py-0.5 text-xs font-bold tracking-wider text-gold-light uppercase">
                  {c.label}
                </span>
                {c.detail}
              </li>
            ))}
          </ul>
        </div>
        <div>
          <p className="mb-3 flex items-center gap-2 text-xs font-bold tracking-[0.18em] text-gold uppercase">
            <FileText aria-hidden className="size-4" />
            Documents to upload
          </p>
          <ul className="space-y-2 text-sm text-ivory/80">
            {registration.documents.map((d) => (
              <li key={d} className="flex gap-2">
                <Check
                  aria-hidden
                  className="mt-0.5 size-4 shrink-0 text-gold"
                />
                {d}
              </li>
            ))}
          </ul>
          <p className="mt-3 text-xs text-ivory/55 italic">
            {registration.documentsNote}
          </p>
        </div>
        <div>
          <p className="mb-3 flex items-center gap-2 text-xs font-bold tracking-[0.18em] text-gold uppercase">
            <ScrollText aria-hidden className="size-4" />
            Good to know
          </p>
          <ul className="space-y-2 text-sm text-ivory/80">
            {registration.goodToKnow.map((d) => (
              <li key={d} className="flex gap-2">
                <span aria-hidden className="text-gold/70">
                  ✦
                </span>
                {d}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </Reveal>
  );
}

function ScheduleStrip() {
  const byId = Object.fromEntries(competitions.map((c) => [c.id, c]));
  return (
    <Reveal className="mb-10 grid gap-4 sm:grid-cols-2">
      {schedule.map((d, i) => (
        <div
          key={d.date}
          className="gold-frame velvet relative flex items-center gap-5 overflow-hidden rounded-2xl px-5 py-5 sm:px-7"
        >
          <div className="flex size-20 shrink-0 flex-col items-center justify-center rounded-xl border border-gold/50 bg-crimson/60 text-center shadow-[0_0_30px_-8px_rgb(214_180_106/0.6)]">
            <span className="text-[0.6rem] font-bold tracking-[0.25em] text-gold-light uppercase">
              Day {i + 1}
            </span>
            <span className="font-display text-3xl leading-none font-bold text-ivory">
              {d.date.split(" ")[0]}
            </span>
            <span className="text-[0.6rem] font-bold tracking-[0.2em] text-gold-light uppercase">
              {d.date.split(" ")[1].slice(0, 3)}
            </span>
          </div>
          <div className="min-w-0">
            <p className="font-display text-xl font-bold text-ivory">
              {d.day}
              <span className="ml-2 font-serif text-base font-normal text-ivory/60 italic">
                {d.date}
              </span>
            </p>
            <ul className="mt-3 flex flex-wrap gap-2">
              {d.competitions.map((id) => (
                <li
                  key={id}
                  className="inline-flex items-center gap-2 rounded-full border border-gold/35 bg-midnight/50 py-1 pr-3 pl-1.5 text-sm font-semibold text-gold-light"
                >
                  <CompetitionEmblem id={id} className={`size-6 ${accents[id].emblem}`} />
                  {byId[id].name}
                </li>
              ))}
            </ul>
          </div>
        </div>
      ))}
    </Reveal>
  );
}

export function Competitions() {
  return (
    <section
      id="competitions"
      aria-labelledby="competitions-title"
      className="relative py-24 sm:py-32"
    >
      <Bunting className="top-4" flags={22} />
      <FloatingMagic
        items={[
          { kind: "wand", className: "top-[8%] left-[4%] w-24 hidden lg:block" },
          { kind: "hat", className: "top-[12%] right-[5%] w-24 -rotate-12 hidden lg:block", delay: "-2s" },
          { kind: "star", className: "top-[40%] left-[2%] w-5", delay: "-1s" },
          { kind: "star", className: "bottom-[10%] right-[8%] w-6", delay: "-3s" },
        ]}
      />
      <div
        aria-hidden
        className="absolute inset-0 -z-10 bg-[linear-gradient(180deg,transparent,rgb(54_10_22/0.6)_40%,transparent)]"
      />
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <SectionHeading
          id="competitions-title"
          eyebrow="Choose your challenge"
          title="The Carnival Trials"
          description="Three trials await. Pick the one that calls to you — then claim your place through the official registration form."
        />
        <ScheduleStrip />
        <ul className="grid gap-6 md:grid-cols-3">
          {competitions.map((c, i) => (
            <CompetitionCard key={c.id} competition={c} index={i} />
          ))}
        </ul>
        <RegistrationInfo />
        <p className="mt-6 text-center text-sm text-ivory/60">
          Full rules are in the{" "}
          <a
            href="#guidebook"
            className="font-semibold text-gold-light underline-offset-4 hover:underline"
          >
            guidebook
          </a>
          ; technical details are shared at the Technical Meeting.
        </p>
        <Reveal className="mt-12 flex flex-col items-center gap-4 text-center">
          <RegisterButton label="Register for a Trial" size="lg" />
          <a
            href="#contact"
            className="text-sm font-semibold text-gold-light underline-offset-4 hover:underline"
          >
            Questions? Speak to the organizers
          </a>
        </Reveal>
      </div>
    </section>
  );
}
