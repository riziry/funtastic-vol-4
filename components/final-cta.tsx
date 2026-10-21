import Image from "next/image";
import { CalendarDays } from "lucide-react";
import { formatEventDate, isEventDateComplete, logos } from "@/content/event";
import { Sparks } from "./atmosphere";
import { Bunting, Fireworks, HatAndWand } from "./carnival-decor";
import { RuneRing } from "./castle";
import { Reveal } from "./reveal";
import { Flourish, RegisterButton } from "./ui";

export function FinalCta() {
  return (
    <section id="register" aria-labelledby="register-title" className="relative isolate overflow-hidden py-28 sm:py-36">
      <div aria-hidden className="absolute inset-0 -z-20 bg-[radial-gradient(60%_70%_at_50%_50%,#7f1026_0%,#360a16_55%,#140d12_100%)]" />
      <Sparks className="-z-10 opacity-70" />
      <Fireworks />
      <Bunting className="top-2" flags={20} />
      <div aria-hidden className="absolute top-1/2 left-1/2 -z-10 size-[44rem] -translate-x-1/2 -translate-y-1/2 opacity-60">
        <RuneRing className="size-full animate-spin-slow" />
      </div>

      <Reveal className="mx-auto flex max-w-3xl flex-col items-center px-4 text-center sm:px-6">
        <div className="relative w-44 sm:w-60">
          <HatAndWand />
          <Image
            src={logos.event.src}
            alt=""
            width={logos.event.width}
            height={logos.event.height}
            sizes="15rem"
            className="relative h-auto w-full animate-float"
          />
        </div>
        <h2 id="register-title" className="mt-8 font-display text-4xl leading-tight font-bold text-balance text-ivory sm:text-6xl">
          Your Next Adventure <span className="text-gold-gradient animate-shimmer">Awaits.</span>
        </h2>
        <Flourish className="mt-6" />
        <p className="mt-6 font-serif text-xl text-ivory/85 sm:text-2xl">Be part of the magic. Join us at Funtastic Vol. 4.</p>
        <p className="mt-6 inline-flex items-center gap-2 font-display text-lg font-bold tracking-wider text-gold-light">
          <CalendarDays aria-hidden className="size-5 text-gold" />
          {formatEventDate()}
          {!isEventDateComplete() ? (
            <span className="font-sans text-xs font-semibold tracking-wide text-ivory/60 uppercase">· Month &amp; year TBA</span>
          ) : null}
        </p>
        <span className="cta-glow mt-10">
          <RegisterButton size="lg" />
        </span>
      </Reveal>
    </section>
  );
}
