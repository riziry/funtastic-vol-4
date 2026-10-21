"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { BookOpen, Download, ExternalLink, Hourglass, X } from "lucide-react";
import { event } from "@/content/event";
import { Corners, Flourish, WaxSeal } from "./ui";

type Props = { available: boolean; path: string; fileName: string };

function BookCover({ open }: { open: boolean }) {
  return (
    <div className="relative mx-auto aspect-[3/4] w-[min(72vw,19rem)] [perspective:1400px]">
      {/* pages */}
      <div className="parchment absolute inset-y-2 right-0 left-3 rounded-r-md shadow-[inset_8px_0_16px_-8px_rgb(0_0_0/0.4)]">
        <div className="flex h-full flex-col items-center justify-center gap-3 px-6 text-center">
          <Flourish className="w-28 text-crimson/60" />
          <p className="font-display text-sm font-bold tracking-[0.3em] text-crimson uppercase">Chapter I</p>
          <p className="font-serif text-lg text-ink/80 italic">Of trials, guides &amp; good conduct</p>
        </div>
      </div>
      {/* cover */}
      <motion.div
        className="absolute inset-0 origin-left rounded-md border border-gold/60 bg-[linear-gradient(135deg,#8c1229,#4a0716_60%,#2a0510)] shadow-[0_30px_60px_-20px_rgb(0_0_0/0.9)] [backface-visibility:hidden] [transform-style:preserve-3d]"
        animate={{ rotateY: open ? -150 : 0 }}
        transition={{ duration: 1.1, ease: [0.65, 0, 0.35, 1] }}
      >
        <div className="absolute inset-3 rounded-sm border border-gold/40" />
        <Corners className="text-gold/80" />
        <div className="absolute inset-y-0 left-0 w-4 rounded-l-md bg-gradient-to-r from-black/40 to-transparent" />
        <div className="flex h-full flex-col items-center justify-center gap-4 px-8 text-center">
          <p className="eyebrow text-[0.6rem]!">{event.fullName}</p>
          <p className="font-display text-3xl leading-tight font-bold text-gold-light">The Guidebook</p>
          <Flourish className="w-32 text-gold/70" />
          <WaxSeal className="size-16" />
        </div>
      </motion.div>
    </div>
  );
}

export function GuidebookBook({ available, path, fileName }: Props) {
  const [hovered, setHovered] = useState(false);
  const [viewerOpen, setViewerOpen] = useState(false);
  const closeRef = useRef<HTMLButtonElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!viewerOpen) return;
    const trigger = triggerRef.current;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setViewerOpen(false);
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
      trigger?.focus();
    };
  }, [viewerOpen]);

  return (
    <div className="grid items-center gap-12 md:grid-cols-2">
      <div onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}>
        <BookCover open={available && (hovered || viewerOpen)} />
      </div>

      <div className="flex flex-col items-center text-center md:items-start md:text-left">
        {available ? (
          <>
            <p className="font-serif text-xl leading-relaxed text-ivory/85">
              Open the official guidebook to read event information and participant guidelines before you register.
            </p>
            <div className="mt-8 flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
              <button
                ref={triggerRef}
                type="button"
                onClick={() => setViewerOpen(true)}
                onFocus={() => setHovered(true)}
                onMouseEnter={() => setHovered(true)}
                onMouseLeave={() => setHovered(false)}
                onBlur={() => setHovered(false)}
                className="btn btn-primary sweep min-h-14 px-8"
              >
                <BookOpen aria-hidden className="size-5" />
                Open Guidebook
              </button>
              <a href={path} download={fileName} className="btn btn-ghost min-h-14 px-8">
                <Download aria-hidden className="size-5" />
                Download PDF
              </a>
            </div>
          </>
        ) : (
          <div className="gold-frame velvet relative w-full rounded-2xl px-6 py-8 sm:px-8">
            <Corners />
            <div className="flex items-center gap-3 text-gold-light">
              <Hourglass aria-hidden className="size-6" />
              <p className="font-display text-xl font-bold">Guidebook coming soon</p>
            </div>
            <p className="mt-4 leading-relaxed text-ivory/75">
              The scribes are still putting the final touches on this year&apos;s guidebook. It will appear right here as
              soon as it is ready — in the meantime, reach out to the organizers with any questions.
            </p>
            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
              <button type="button" disabled className="btn btn-ghost cursor-not-allowed opacity-50" aria-disabled="true">
                <BookOpen aria-hidden className="size-5" />
                Open Guidebook
              </button>
              <a href="#contact" className="btn btn-ghost">
                Contact the organizers
              </a>
            </div>
          </div>
        )}
      </div>

      <AnimatePresence>
        {viewerOpen ? (
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label="Funtastic guidebook viewer"
            className="fixed inset-0 z-[60] flex flex-col bg-midnight/95 p-3 backdrop-blur-sm sm:p-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div className="mb-3 flex flex-wrap items-center justify-between gap-3">
              <p className="eyebrow">The Guidebook</p>
              <div className="flex items-center gap-2">
                <a href={path} target="_blank" rel="noopener noreferrer" className="btn btn-ghost min-h-11 px-4 py-2 text-sm">
                  <ExternalLink aria-hidden className="size-4" />
                  <span className="hidden sm:inline">New tab</span>
                  <span className="sr-only sm:hidden">Open in new tab</span>
                </a>
                <a href={path} download={fileName} className="btn btn-ghost min-h-11 px-4 py-2 text-sm">
                  <Download aria-hidden className="size-4" />
                  <span className="hidden sm:inline">Download</span>
                  <span className="sr-only sm:hidden">Download PDF</span>
                </a>
                <button
                  ref={closeRef}
                  type="button"
                  onClick={() => setViewerOpen(false)}
                  aria-label="Close guidebook"
                  className="grid size-11 place-items-center rounded-full border border-gold/40 text-gold-light hover:bg-gold/10"
                >
                  <X className="size-5" />
                </button>
              </div>
            </div>
            <motion.div
              className="relative flex-1 overflow-hidden rounded-lg border border-gold/30 bg-ivory"
              initial={{ scale: 0.96, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.96, y: 20 }}
            >
              <iframe src={path} title="Funtastic Vol. 4 guidebook (PDF)" className="hidden size-full md:block" />
              {/* Most mobile browsers can't embed PDFs, so offer direct actions instead. */}
              <div className="parchment flex size-full flex-col items-center justify-center gap-4 p-6 text-center md:hidden">
                <BookOpen aria-hidden className="size-10 text-crimson" />
                <p className="font-serif text-lg text-ink">Your device opens PDFs best in a new tab.</p>
                <a href={path} target="_blank" rel="noopener noreferrer" className="btn btn-ink">
                  Read the guidebook
                </a>
              </div>
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  );
}
