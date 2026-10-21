"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Check, Copy, Landmark, ShieldCheck, Upload } from "lucide-react";
import { competitions, payment } from "@/content/event";
import { FloatingMagic } from "./carnival-decor";
import { Corners, SectionHeading, WaxSeal } from "./ui";

async function copyText(text: string) {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch {
    // Fallback for older browsers / non-secure contexts.
    const el = document.createElement("textarea");
    el.value = text;
    el.setAttribute("readonly", "");
    el.style.position = "fixed";
    el.style.opacity = "0";
    document.body.appendChild(el);
    el.select();
    const ok = document.execCommand("copy");
    el.remove();
    return ok;
  }
}

export function Payment() {
  const [status, setStatus] = useState<"idle" | "copied" | "error">("idle");

  useEffect(() => {
    if (status === "idle") return;
    const t = setTimeout(() => setStatus("idle"), 2500);
    return () => clearTimeout(t);
  }, [status]);

  const onCopy = async () => setStatus((await copyText(payment.accountNumber)) ? "copied" : "error");

  return (
    <section id="payment" aria-labelledby="payment-title" className="relative py-24 sm:py-32">
      <div aria-hidden className="absolute inset-0 -z-10 bg-[radial-gradient(50%_45%_at_50%_55%,rgb(214_180_106/0.12),transparent_70%)]" />
      <FloatingMagic
        items={[
          { kind: "hat", className: "top-[18%] left-[6%] w-24 rotate-12 opacity-70 hidden md:block" },
          { kind: "star", className: "top-[30%] right-[12%] w-6", delay: "-2s" },
          { kind: "wand", className: "bottom-[14%] right-[6%] w-28 opacity-80 hidden md:block", delay: "-1s" },
          { kind: "star", className: "bottom-[24%] left-[14%] w-4", delay: "-3s" },
        ]}
      />
      <div className="mx-auto max-w-3xl px-4 sm:px-6">
        <SectionHeading
          id="payment-title"
          eyebrow="The treasury"
          title="Payment Information"
          description="Transfer details for registration payments."
        />

        <div className="parchment relative overflow-hidden rounded-2xl px-6 py-10 shadow-[0_40px_80px_-30px_rgb(0_0_0/0.9)] sm:px-12 sm:py-12">
          <Corners className="text-crimson/45" />
          <WaxSeal className="absolute -top-5 -right-5 size-24 opacity-90 sm:size-28" />

          <div className="flex items-center gap-3 pr-16">
            <span className="grid size-12 place-items-center rounded-full bg-crimson text-ivory">
              <Landmark aria-hidden className="size-6" />
            </span>
            <div>
              <p className="text-xs font-bold tracking-[0.25em] text-crimson/80 uppercase">Bank</p>
              <p className="font-display text-2xl font-bold text-ink">{payment.bank}</p>
            </div>
          </div>

          <dl className="mt-8 grid gap-6">
            <div>
              <dt className="text-xs font-bold tracking-[0.25em] text-crimson/80 uppercase">Account number</dt>
              <dd className="mt-2 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <span className="font-mono text-3xl font-bold tracking-wider break-all text-ink sm:text-4xl">
                  {payment.accountNumber}
                </span>
                <button
                  type="button"
                  onClick={onCopy}
                  data-burst
                  className={`btn min-h-12 shrink-0 ${status === "copied" ? "border border-[#1f7a4a] bg-[#1f7a4a] text-ivory" : "btn-ink"}`}
                >
                  <AnimatePresence mode="wait" initial={false}>
                    <motion.span
                      key={status}
                      initial={{ opacity: 0, y: 6 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -6 }}
                      transition={{ duration: 0.18 }}
                      className="inline-flex items-center gap-2"
                    >
                      {status === "copied" ? <Check aria-hidden className="size-4" /> : <Copy aria-hidden className="size-4" />}
                      {status === "copied" ? "Copied!" : status === "error" ? "Copy failed — select manually" : "Copy Account Number"}
                    </motion.span>
                  </AnimatePresence>
                </button>
              </dd>
              <p className="sr-only" role="status" aria-live="polite">
                {status === "copied" ? "Account number copied to clipboard" : status === "error" ? "Copy failed" : ""}
              </p>
            </div>
            <div>
              <dt className="text-xs font-bold tracking-[0.25em] text-crimson/80 uppercase">Account holder</dt>
              <dd className="mt-1 font-display text-2xl font-bold text-ink">{payment.accountHolder}</dd>
            </div>
            <div>
              <dt className="text-xs font-bold tracking-[0.25em] text-crimson/80 uppercase">Registration fees</dt>
              <dd className="mt-2">
                <ul className="divide-y divide-crimson/15 rounded-lg border border-crimson/25 bg-ivory/45">
                  {competitions
                    .filter((c) => c.details.fee)
                    .map((c) => (
                      <li key={c.id} className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1 px-4 py-2.5">
                        <span className="font-semibold text-ink">{c.name}</span>
                        <span className="font-mono font-bold text-crimson">{c.details.fee}</span>
                      </li>
                    ))}
                </ul>
              </dd>
            </div>
          </dl>

          <p className="relative mt-8 flex items-start gap-3 rounded-lg bg-crimson p-4 text-sm leading-relaxed font-semibold text-ivory">
            <Upload aria-hidden className="mt-0.5 size-5 shrink-0" />
            {payment.receiptNote}
          </p>

          <p className="relative mt-3 flex items-start gap-3 rounded-lg border border-crimson/30 bg-ivory/60 p-4 text-sm leading-relaxed text-ink">
            <ShieldCheck aria-hidden className="mt-0.5 size-5 shrink-0 text-crimson" />
            <span>
              Please double-check the bank, account number and account holder name before transferring. If anything
              looks different from what the organizers shared with you, confirm with a coordinator first.
            </span>
          </p>
        </div>
      </div>
    </section>
  );
}
