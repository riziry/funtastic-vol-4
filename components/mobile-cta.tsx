"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { CalendarDays } from "lucide-react";
import { formatEventDate } from "@/content/event";
import { RegisterButton } from "./ui";

/**
 * Phone/tablet-only Register bar pinned to the bottom of the screen. It appears
 * once the hero (with its own CTA) has scrolled away and hides again over the
 * closing CTA and footer, so there is never a duplicate button in view.
 */
export function MobileCta() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const hero = document.getElementById("home");
    const finale = document.getElementById("register");
    const footer = document.querySelector("footer");
    const inView = new Map<Element, boolean>();
    const observer = new IntersectionObserver((entries) => {
      for (const e of entries) inView.set(e.target, e.isIntersecting);
      setVisible(![...inView.values()].some(Boolean));
    });
    [hero, finale, footer].forEach((el) => {
      if (!el) return;
      inView.set(el, true);
      observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  return (
    <AnimatePresence>
      {visible ? (
        <motion.div
          key="mobile-cta"
          initial={{ y: "120%" }}
          animate={{ y: 0 }}
          exit={{ y: "120%" }}
          transition={{ type: "spring", damping: 28, stiffness: 300 }}
          className="fixed inset-x-0 bottom-0 z-40 px-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] lg:hidden"
        >
          <div className="mx-auto flex max-w-md items-center gap-3 rounded-full border border-gold/30 bg-midnight/85 py-1.5 pr-1.5 pl-4 shadow-[0_18px_40px_-12px_rgb(0_0_0/0.8)] backdrop-blur-md">
            <CalendarDays aria-hidden className="size-4 shrink-0 text-gold" />
            <span className="min-w-0 flex-1 truncate font-display text-sm font-bold tracking-wide text-gold-light">
              {formatEventDate()}
            </span>
            <RegisterButton className="min-h-11 shrink-0 px-5 py-2 text-sm" />
          </div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
