import { MessageCircle, Phone, TriangleAlert, UserRound } from "lucide-react";
import { competitions, contacts, event, type Contact } from "@/content/event";
import { telLink, whatsappLink } from "@/lib/whatsapp";
import { CompetitionEmblem } from "./emblems";
import { Reveal } from "./reveal";
import { SectionHeading } from "./ui";

function ContactCard({ contact, competitionName }: { contact: Contact; competitionName: string }) {
  const message = `Halo ${contact.name}, saya ingin bertanya tentang ${competitionName} di ${event.fullName}.`;
  return (
    <li className="group flex flex-1 flex-col gap-4">
      <div className="flex items-start gap-3">
        <span className="grid size-11 shrink-0 place-items-center rounded-full border border-gold/40 bg-burgundy text-gold-light transition-[box-shadow,border-color] duration-300 group-hover:border-gold-light group-hover:shadow-[0_0_18px_rgb(96_165_250/0.6)]">
          <UserRound aria-hidden className="wiggle size-5" />
        </span>
        <div className="min-w-0">
          <p className="font-display text-lg leading-tight font-bold text-ivory">{contact.name}</p>
          <p className="text-sm font-semibold text-gold">{contact.role}</p>
        </div>
      </div>
      <a
        href={telLink(contact.phone)}
        className="inline-flex items-center gap-2 font-mono text-base tracking-wide whitespace-nowrap text-ivory/90 hover:text-gold-light"
        aria-label={`Call ${contact.name} at ${contact.phone}`}
      >
        <Phone aria-hidden className="wiggle size-4 text-gold/80" />
        {contact.phone}
      </a>
      {contact.needsConfirmation ? (
        <p className="inline-flex items-center gap-2 text-xs text-gold-light/80">
          <TriangleAlert aria-hidden className="size-3.5 shrink-0" />
          {contact.needsConfirmation}
        </p>
      ) : null}
      <a
        href={whatsappLink(contact.phone, message)}
        target="_blank"
        rel="noopener noreferrer"
        className="btn mt-auto min-h-11 w-full border border-[#2fbf71]/50 bg-[#1f7a4a]/25 py-2 text-sm text-[#bff3d4] hover:border-[#2fbf71] hover:bg-[#1f7a4a]/45"
      >
        <MessageCircle aria-hidden className="size-4" />
        Chat on WhatsApp
        <span className="sr-only">with {contact.name} (opens in a new tab)</span>
      </a>
    </li>
  );
}

export function Contacts() {
  return (
    <section id="contact" aria-labelledby="contact-title" className="relative py-20 sm:py-32">
      <div aria-hidden className="absolute inset-0 -z-10 bg-[radial-gradient(55%_45%_at_50%_60%,rgb(59_130_246/0.16),transparent_70%)]" />
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <SectionHeading
          id="contact-title"
          eyebrow="Speak to the organizers"
          title="Your Guides to the Carnival"
          description="Each trial has a coordinator ready to help with information and registration. Reach out on WhatsApp with any questions."
        />
        <div className="grid gap-6 lg:grid-cols-3">
          {competitions.map((c, i) => (
            <Reveal key={c.id} delay={i * 0.1} as="article" className="velvet gold-frame flex flex-col rounded-2xl p-5 transition-shadow duration-500 hover:shadow-[0_26px_50px_-26px_rgb(59_130_246/0.85)] sm:p-6">
              <header className="mb-5 flex items-center gap-3 border-b border-gold/20 pb-4">
                <CompetitionEmblem id={c.id} className="size-12 text-gold-light" />
                <h3 className="font-display text-xl font-bold tracking-[0.12em] text-ivory uppercase">{c.name}</h3>
              </header>
              <ul className="flex flex-1 flex-col">
                {contacts[c.id].map((contact) => (
                  <ContactCard key={contact.name} contact={contact} competitionName={c.name} />
                ))}
              </ul>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
