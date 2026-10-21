"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import type { GalleryItem } from "@/content/gallery";

type LightboxProps = {
  items: GalleryItem[];
  index: number | null;
  onClose: () => void;
  onNavigate: (index: number) => void;
};

export function Lightbox({ items, index, onClose, onNavigate }: LightboxProps) {
  const dialogRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const [direction, setDirection] = useState(1);
  const open = index !== null;
  const item = open ? items[index] : null;

  const go = (step: number) => {
    if (index === null) return;
    setDirection(step);
    onNavigate((index + step + items.length) % items.length);
  };

  useEffect(() => {
    if (!open) return;
    const previouslyFocused = document.activeElement as HTMLElement | null;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();
    return () => {
      document.body.style.overflow = "";
      previouslyFocused?.focus();
    };
  }, [open]);

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Escape") onClose();
    else if (e.key === "ArrowRight") go(1);
    else if (e.key === "ArrowLeft") go(-1);
    else if (e.key === "Tab") {
      const focusables = Array.from(dialogRef.current?.querySelectorAll<HTMLElement>("button, video") ?? []);
      const first = focusables[0];
      const last = focusables[focusables.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last?.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first?.focus();
      }
    }
  };

  return (
    <AnimatePresence>
      {open && item ? (
        <motion.div
          ref={dialogRef}
          role="dialog"
          aria-modal="true"
          aria-label={`Gallery viewer: ${item.alt}`}
          onKeyDown={onKeyDown}
          className="fixed inset-0 z-[60] flex flex-col bg-midnight/95 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          <div className="flex items-center justify-between gap-4 px-4 py-3 sm:px-6">
            <p className="eyebrow" aria-live="polite">
              {item.year} · {index + 1} / {items.length}
            </p>
            <button
              ref={closeRef}
              type="button"
              onClick={onClose}
              aria-label="Close gallery viewer"
              className="grid size-11 place-items-center rounded-full border border-gold/40 text-gold-light transition hover:bg-gold/10"
            >
              <X className="size-5" />
            </button>
          </div>

          <div className="relative flex-1 overflow-hidden" onClick={(e) => e.target === e.currentTarget && onClose()}>
            <AnimatePresence initial={false} custom={direction} mode="popLayout">
              <motion.div
                key={item.id}
                custom={direction}
                variants={{
                  enter: (d: number) => ({ opacity: 0, x: d * 60, scale: 0.98 }),
                  center: { opacity: 1, x: 0, scale: 1 },
                  exit: (d: number) => ({ opacity: 0, x: d * -60, scale: 0.98 }),
                }}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                drag={item.video ? false : "x"}
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={0.6}
                onDragEnd={(_, info) => {
                  if (info.offset.x < -80) go(1);
                  else if (info.offset.x > 80) go(-1);
                }}
                className="absolute inset-0 flex items-center justify-center px-2 pb-2 sm:px-20"
                onClick={(e) => e.target === e.currentTarget && onClose()}
              >
                {item.video ? (
                  <video
                    key={item.video}
                    src={item.video}
                    poster={item.image.src}
                    controls
                    autoPlay
                    playsInline
                    className="max-h-full max-w-full rounded-lg border border-gold/20 bg-black"
                  >
                    {item.alt}
                  </video>
                ) : (
                  <div className="relative size-full">
                    <span aria-hidden className="absolute top-1/2 left-1/2 size-10 -translate-1/2 animate-spin rounded-full border-2 border-gold/20 border-t-gold" />
                    <Image
                      src={item.image}
                      alt={item.alt}
                      fill
                      quality={85}
                      sizes="100vw"
                      draggable={false}
                      className="object-contain select-none"
                    />
                  </div>
                )}
              </motion.div>
            </AnimatePresence>

            {items.length > 1 ? (
              <>
                <button
                  type="button"
                  onClick={() => go(-1)}
                  aria-label="Previous"
                  className="absolute top-1/2 left-2 z-10 grid size-12 -translate-y-1/2 place-items-center rounded-full border border-gold/40 bg-midnight/70 text-gold-light transition hover:bg-crimson sm:left-5"
                >
                  <ChevronLeft className="size-6" />
                </button>
                <button
                  type="button"
                  onClick={() => go(1)}
                  aria-label="Next"
                  className="absolute top-1/2 right-2 z-10 grid size-12 -translate-y-1/2 place-items-center rounded-full border border-gold/40 bg-midnight/70 text-gold-light transition hover:bg-crimson sm:right-5"
                >
                  <ChevronRight className="size-6" />
                </button>
              </>
            ) : null}
          </div>

          <p className="min-h-14 px-6 py-4 text-center font-serif text-lg text-ivory/85">
            {item.caption ?? item.alt}
          </p>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
