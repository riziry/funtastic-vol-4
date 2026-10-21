"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Menu, X } from "lucide-react";
import { REGISTRATION_URL, logos, navItems } from "@/content/event";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState<string>("home");
  const toggleRef = useRef<HTMLButtonElement>(null);
  const drawerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Highlight the section currently in the middle of the viewport.
  useEffect(() => {
    // Observe every section so non-nav sections (payment, register) clear the highlight.
    const sections = Array.from(document.querySelectorAll<HTMLElement>("main > section[id]"));
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) if (entry.isIntersecting) setActive(entry.target.id);
      },
      { rootMargin: "-45% 0px -50% 0px" },
    );
    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  // Drawer: lock scroll, close on Escape, keep focus inside.
  useEffect(() => {
    if (!open) return;
    const toggle = toggleRef.current;
    document.body.style.overflow = "hidden";
    const focusables = () =>
      Array.from(drawerRef.current?.querySelectorAll<HTMLElement>("a, button") ?? []);
    focusables()[0]?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
      if (e.key === "Tab") {
        const items = focusables();
        const first = items[0];
        const last = items[items.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last?.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first?.focus();
        }
      }
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
      toggle?.focus();
    };
  }, [open]);

  return (
    <>
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
        scrolled
          ? "border-b border-gold/20 bg-midnight/85 py-2 shadow-[0_10px_40px_-20px_rgb(0_0_0/0.9)] backdrop-blur-md"
          : "bg-transparent py-4"
      }`}
    >
      <nav aria-label="Main" className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 sm:px-6">
        <a href="#home" className="flex shrink-0 items-center gap-3" aria-label="Funtastic Vol. 4 — back to top">
          <Image
            src={logos.event.src}
            alt=""
            width={logos.event.width}
            height={logos.event.height}
            className={`w-auto transition-all duration-500 ${scrolled ? "h-10" : "h-12 sm:h-14"}`}
            sizes="80px"
            preload
          />
        </a>

        <ul className="hidden items-center gap-1 lg:flex">
          {navItems.map((item) => (
            <li key={item.id}>
              <a
                href={`#${item.id}`}
                aria-current={active === item.id ? "true" : undefined}
                className={`relative rounded-full px-4 py-2 text-sm font-semibold tracking-wide transition-colors ${
                  active === item.id ? "text-gold-light" : "text-ivory/75 hover:text-ivory"
                }`}
              >
                {item.label}
                {active === item.id ? (
                  <motion.span
                    layoutId="nav-underline"
                    className="absolute inset-x-4 -bottom-0.5 h-px bg-gradient-to-r from-transparent via-gold to-transparent"
                  />
                ) : null}
              </a>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-2">
          <a
            href={REGISTRATION_URL}
            target="_blank"
            rel="noopener noreferrer"
            data-burst
            className="btn btn-primary sweep hidden min-h-10 px-5 py-2 text-sm sm:inline-flex"
          >
            Register
            <span className="sr-only">(opens in a new tab)</span>
          </a>
          <button
            ref={toggleRef}
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="mobile-drawer"
            aria-label={open ? "Close menu" : "Open menu"}
            className="grid size-11 place-items-center rounded-full border border-gold/40 text-gold-light transition hover:bg-gold/10 lg:hidden"
          >
            {open ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>
      </nav>
    </header>

      <AnimatePresence>
        {open ? (
          <>
            <motion.div
              key="backdrop"
              className="fixed inset-0 top-0 z-40 bg-midnight/70 backdrop-blur-sm lg:hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setOpen(false)}
            />
            <motion.div
              key="drawer"
              id="mobile-drawer"
              ref={drawerRef}
              role="dialog"
              aria-modal="true"
              aria-label="Site navigation"
              className="velvet fixed inset-y-0 right-0 z-50 flex w-[min(20rem,85vw)] flex-col border-l border-gold/30 px-6 pt-6 pb-8 lg:hidden"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 30, stiffness: 260 }}
            >
              <div className="mb-8 flex items-center justify-between">
                <p className="eyebrow">Navigate</p>
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  aria-label="Close menu"
                  className="grid size-11 place-items-center rounded-full border border-gold/40 text-gold-light"
                >
                  <X className="size-5" />
                </button>
              </div>
              <ul className="flex flex-col gap-1">
                {navItems.map((item, i) => (
                  <motion.li
                    key={item.id}
                    initial={{ opacity: 0, x: 24 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.05 * i + 0.1 }}
                  >
                    <a
                      href={`#${item.id}`}
                      onClick={() => setOpen(false)}
                      aria-current={active === item.id ? "true" : undefined}
                      className={`flex items-center justify-between border-b border-gold/10 py-4 font-display text-xl ${
                        active === item.id ? "text-gold-light" : "text-ivory"
                      }`}
                    >
                      {item.label}
                      <span aria-hidden className="text-gold/60">✦</span>
                    </a>
                  </motion.li>
                ))}
              </ul>
              <a
                href={REGISTRATION_URL}
                target="_blank"
                rel="noopener noreferrer"
            data-burst
                className="btn btn-primary mt-auto w-full"
              >
                Register Now
                <span className="sr-only">(opens in a new tab)</span>
              </a>
            </motion.div>
          </>
        ) : null}
      </AnimatePresence>
    </>
  );
}
