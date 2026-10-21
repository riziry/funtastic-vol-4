import { About } from "@/components/about";
import { Marquee } from "@/components/carnival-decor";
import { Competitions } from "@/components/competitions";
import { Contacts } from "@/components/contacts";
import { CurtainIntro } from "@/components/curtain-intro";
import { FinalCta } from "@/components/final-cta";
import { Footer } from "@/components/footer";
import { GalleryGrid } from "@/components/gallery";
import { Guidebook } from "@/components/guidebook";
import { Hero } from "@/components/hero";
import { Navbar } from "@/components/navbar";
import { Payment } from "@/components/payment";
import { SparkleLayer } from "@/components/sparkle-layer";
import { SectionHeading } from "@/components/ui";
import { event, formatEventDate } from "@/content/event";

const marqueeItems = [event.fullName, "Futsal", "Try Out TKA", "Mewarnai", formatEventDate(), event.host];

export default function Home() {
  return (
    <>
      <a
        href="#about"
        className="sr-only z-[70] rounded-full bg-gold px-4 py-2 font-semibold text-ink focus:not-sr-only focus:fixed focus:top-3 focus:left-3"
      >
        Skip to content
      </a>
      <CurtainIntro />
      <SparkleLayer />
      <Navbar />
      <main>
        <Hero />
        <Marquee items={marqueeItems} />
        <About />
        <section id="gallery" aria-labelledby="gallery-title" className="relative py-24 sm:py-32">
          <div className="mx-auto max-w-7xl px-4 sm:px-6">
            <SectionHeading
              id="gallery-title"
              eyebrow="Memories from Vol. 3"
              title="Moments From Past Carnivals"
              description="A glimpse of the laughter, teamwork and friendly rivalry from the previous Funtastic. Tap any moment to step inside."
            />
            <GalleryGrid />
          </div>
        </section>
        <Competitions />
        <Guidebook />
        <Contacts />
        <Payment />
        <Marquee items={marqueeItems} reverse tilt="rotate-1" />
        <FinalCta />
      </main>
      <Footer />
    </>
  );
}
