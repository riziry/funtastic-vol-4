import { existsSync } from "node:fs";
import path from "node:path";
import { guidebook } from "@/content/event";
import { GuidebookBook } from "./guidebook-book";
import { FloatingMagic } from "./carnival-decor";
import { SectionHeading } from "./ui";

export function Guidebook() {
  // Detect the PDF at build time so a missing file never renders as a broken link.
  const available = existsSync(path.join(process.cwd(), "public", guidebook.path));

  return (
    <section id="guidebook" aria-labelledby="guidebook-title" className="relative overflow-hidden py-24 sm:py-32">
      <div aria-hidden className="absolute inset-0 -z-10 bg-[radial-gradient(50%_50%_at_30%_50%,rgb(59_26_74/0.45),transparent_70%)]" />
      <FloatingMagic
        items={[
          { kind: "letter", className: "top-[14%] right-[6%] w-24 rotate-6 hidden md:block" },
          { kind: "letter", className: "bottom-[16%] left-[4%] w-16 -rotate-12 hidden md:block", delay: "-2s" },
          { kind: "star", className: "top-[30%] left-[10%] w-5", delay: "-1s" },
          { kind: "star", className: "bottom-[30%] right-[14%] w-4", delay: "-2.5s" },
        ]}
      />
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <SectionHeading
          id="guidebook-title"
          eyebrow="The enchanted manual"
          title="The Carnival Guidebook"
          description="Everything participants need in one tome: registration requirements, fees, general conduct and the rules for every competition."
        />
        <GuidebookBook available={available} path={encodeURI(guidebook.path)} fileName={guidebook.fileName} />
      </div>
    </section>
  );
}
