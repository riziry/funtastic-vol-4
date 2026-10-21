import { GraduationCap, MessageCircle, Phone, TriangleAlert, UserRound } from "lucide-react";
import { competitions, contacts, event, type Contact } from "@/content/event";
import { telLink, whatsappLink } from "@/lib/whatsapp";
import { CompetitionEmblem } from "./emblems";
import { Reveal } from "./reveal";
import { SectionHeading } from "./ui";

function ContactCard({ contact, isTeacher, competitionName }: { contact: Contact; isTeacher: boolean; competitionName: string }) {
  const Icon = isTeacher ? GraduationCap : UserRound;
  const message = `Halo ${contact.name}, saya ingin bertanya tentang ${competitionName} di ${event.fullName}.`;
  return (
    <li className="flex flex-col gap-4 rounded-xl border border-gold/15 bg-midnight/50 p-5 transition-colors duration-300 hover:border-gold/45">
      <div className="flex items-start gap-3">
        <span className="grid size-11 shrink-0 place-items-center rounded-full border border-gold/40 bg-burgundy text-gold-light">
          <Icon aria-hidden className="size-5" />
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
        <Phone aria-hidden className="size-4 text-gold/80" />
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
    <section id="contact" aria-labelledby="contact-title" className="relative py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <SectionHeading
          id="contact-title"
          eyebrow="Speak to the organizers"
          title="Your Guides to the Carnival"
          description="Each trial has a student coordinator and a teacher coordinator ready to help with information and registration. Reach out on WhatsApp with any questions."
        />
        <div className="grid gap-6 lg:grid-cols-3">
          {competitions.map((c, i) => (
            <Reveal key={c.id} delay={i * 0.1} as="article" className="velvet gold-frame rounded-2xl p-5 sm:p-6">
              <header className="mb-5 flex items-center gap-3 border-b border-gold/20 pb-4">
                <CompetitionEmblem id={c.id} className="size-12 text-gold-light" />
                <h3 className="font-display text-xl font-bold tracking-[0.12em] text-ivory uppercase">{c.name}</h3>
              </header>
              <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1">
                {contacts[c.id].map((contact, idx) => (
                  <ContactCard key={contact.name} contact={contact} isTeacher={idx === 1} competitionName={c.name} />
                ))}
              </ul>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
