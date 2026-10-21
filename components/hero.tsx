"use client";

import Image from "next/image";
import { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { CalendarDays, ChevronDown, MapPin } from "lucide-react";
import { event, formatEventDate, isEventDateComplete, logos } from "@/content/event";
import { FloatingCandles, Sparks } from "./atmosphere";
import { HatAndWand, MagicSky } from "./carnival-decor";
import { Castle, Hills, RuneRing } from "./castle";
import { RegisterButton } from "./ui";

export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const skyY = useTransform(scrollYProgress, [0, 1], ["0%", "10%"]);
  const hillsY = useTransform(scrollYProgress, [0, 1], ["0%", "18%"]);
  const castleY = useTransform(scrollYProgress, [0, 1], ["0%", "8%"]);
  const contentY = useTransform(scrollYProgress, [0, 1], ["0%", "25%"]);
  const fade = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  return (
    <section
      id="home"
      ref={ref}
      aria-labelledby="hero-title"
      className="relative isolate flex min-h-svh flex-col overflow-hidden bg-midnight"
    >
      {/* Sky */}
      <motion.div style={{ y: skyY }} className="absolute inset-0 -z-30">
        <div className="absolute inset-0 bg-[radial-gradient(120%_70%_at_50%_0%,#5a0f22_0%,#2a0a16_45%,#140d12_80%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(40%_35%_at_80%_20%,rgb(59_26_74/0.55),transparent_70%)]" />
        {/* Moon */}
        <div className="absolute top-[12%] left-[62%] size-40 rounded-full bg-[radial-gradient(circle_at_40%_40%,#fff4dc,#ecd59c_45%,#a8853f_80%)] opacity-80 shadow-[0_0_120px_40px_rgb(236_213_156/0.25)] sm:size-56" />
      </motion.div>

      <FloatingCandles className="-z-20 hidden opacity-90 sm:block" />
      <div className="absolute inset-0 -z-10">
        <MagicSky />
      </div>

      <motion.div style={{ y: hillsY }} className="absolute inset-x-0 bottom-0 -z-20 h-[34%] sm:h-[55%]">
        <Hills className="absolute inset-0 size-full" />
      </motion.div>
      <motion.div style={{ y: castleY }} className="absolute inset-x-0 bottom-0 -z-10 h-[40%] sm:h-[62%] lg:h-[70%]">
        <Castle className="absolute inset-0 size-full opacity-95" />
      </motion.div>

      {/* Fog + readability scrim */}
      <div aria-hidden className="absolute inset-x-[-10%] bottom-0 -z-10 h-1/3 animate-fog bg-[radial-gradient(50%_60%_at_30%_100%,rgb(244_233_213/0.12),transparent_70%),radial-gradient(45%_55%_at_75%_100%,rgb(244_233_213/0.1),transparent_70%)]" />
      <div aria-hidden className="absolute inset-0 -z-10 bg-gradient-to-b from-midnight/40 via-midnight/30 to-midnight lg:bg-gradient-to-r lg:from-midnight/85 lg:via-midnight/40 lg:to-transparent" />
      <Sparks className="-z-10" />

      <motion.div
        style={{ y: contentY, opacity: fade }}
        className="mx-auto grid w-full max-w-7xl flex-1 items-center gap-10 px-4 pt-28 pb-24 sm:px-6 lg:grid-cols-[1.1fr_0.9fr] lg:pt-32"
      >
        <div className="order-2 flex flex-col items-center text-center lg:order-1 lg:items-start lg:text-left">
          <div className="mb-6 flex animate-fade-up flex-wrap items-center justify-center gap-3 lg:justify-start">
            <span className="grid size-12 place-items-center rounded-full bg-ivory p-1.5 shadow-[0_0_0_2px_rgb(214_180_106/0.6)]">
              <Image src={logos.school.src} alt={logos.school.alt} width={logos.school.width} height={logos.school.height} sizes="48px" className="h-auto w-full" />
            </span>
            <span className="grid size-12 place-items-center rounded-full bg-ivory p-1.5 shadow-[0_0_0_2px_rgb(214_180_106/0.6)]">
              <Image src={logos.osis.src} alt={logos.osis.alt} width={logos.osis.width} height={logos.osis.height} sizes="48px" className="h-full w-auto" />
            </span>
            <span className="hidden h-px w-10 bg-gold/50 sm:block" />
            <p className="eyebrow w-full sm:w-auto">{event.tagline}</p>
          </div>

          <h1 id="hero-title" className="animate-fade-up font-display text-4xl leading-[1.05] font-bold text-balance [--d:120ms] sm:text-6xl xl:text-7xl">
            <span className="sr-only">{event.fullName}: </span>
            <span className="block text-ivory">{event.headline[0]}</span>
            <span className="text-gold-gradient block animate-shimmer">{event.headline[1]}</span>
          </h1>

          <p className="mt-6 max-w-xl animate-fade-up font-serif text-lg leading-relaxed text-ivory/85 [--d:240ms] sm:text-xl">
            {event.intro}
          </p>

          <div className="mt-7 inline-flex animate-fade-up items-center gap-3 rounded-full border border-gold/40 bg-midnight/50 px-5 py-2.5 [--d:320ms]">
            <CalendarDays aria-hidden className="size-5 text-gold" />
            <span className="font-display text-lg font-bold tracking-wider text-gold-light">{formatEventDate()}</span>
            {!isEventDateComplete() ? (
              <span className="border-l border-gold/30 pl-3 text-xs font-semibold tracking-wide text-ivory/60 uppercase">
                Month &amp; year TBA
              </span>
            ) : null}
          </div>

          <p className="mt-3 inline-flex animate-fade-up items-center gap-2 text-sm text-ivory/70 [--d:360ms]">
            <MapPin aria-hidden className="size-4 text-gold" />
            {event.venue.name} · Bekasi Selatan
          </p>

          <div className="mt-9 flex w-full animate-fade-up flex-col gap-3 [--d:420ms] sm:w-auto sm:flex-row">
            <span className="cta-glow">
              <RegisterButton size="lg" className="w-full" />
            </span>
            <a href="#about" className="btn btn-ghost min-h-14 px-8">
              Explore the Carnival
            </a>
          </div>
        </div>

        <div className="relative order-1 mx-auto w-[min(72vw,24rem)] animate-fade-up [--d:150ms] lg:order-2 lg:w-full lg:max-w-[34rem]">
          <RuneRing className="absolute inset-[-12%] animate-spin-slow" />
          <div aria-hidden className="absolute inset-[8%] rounded-full bg-[radial-gradient(circle,rgb(166_27_50/0.55),transparent_70%)]" />
          <HatAndWand />
          <div className="relative animate-float">
            <Image
              src={logos.event.src}
              alt={logos.event.alt}
              width={logos.event.width}
              height={logos.event.height}
              sizes="(min-width: 1024px) 34rem, 78vw"
              preload
              className="h-auto w-full drop-shadow-[0_20px_40px_rgb(0_0_0/0.6)]"
            />
          </div>
        </div>
      </motion.div>

      <a
        href="#about"
        aria-label="Scroll to introduction"
        className="absolute bottom-6 left-1/2 grid size-11 -translate-x-1/2 place-items-center rounded-full border border-gold/30 text-gold/80 transition hover:text-gold-light"
      >
        <ChevronDown className="size-5 animate-bounce" />
      </a>
    </section>
  );
}
