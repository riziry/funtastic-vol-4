/**
 * Funtastic Vol. 4 — central event configuration.
 *
 * Every piece of editable event information lives here. Components only read
 * from this file, so organizers can update copy, dates, contacts and payment
 * details without touching any layout code.
 *
 * Rule of thumb: if a value is not officially confirmed yet, leave it `null`
 * and the site will show a graceful "to be announced" state instead.
 */

export const REGISTRATION_URL = "https://forms.gle/wnaEB61DGrAn6vPG7";

export const event = {
  /** Spelled as on the official logo artwork. */
  name: "Funtastic",
  volume: "Vol. 4",
  fullName: "Funtastic Vol. 4",
  tagline: "Magical School Carnival",
  headline: ["Enter the Magic.", "Celebrate the Extraordinary."],
  intro:
    "The gates of the enchanted academy are opening once more. Funtastic Vol. 4 is an inter-school carnival for SD/MI students — two days of futsal, Try Out TKA and colouring, hosted by SMP Tunas Jakasampurna.",

  dates: {
    days: "27–28",
    /** e.g. "November" — keep null until confirmed. */
    month: "November" as string | null,
    /** e.g. 2026 — keep null until confirmed. */
    year: 2026 as number | null,
  },

  /** From the official guidebook. */
  host: "SMP Tunas Jakasampurna",
  organizer: "OSIS SMP Tunas Jakasampurna, periode 2026/2027",
  venue: {
    name: "SMP Tunas Jakasampurna",
    address: "Jl. Sadewa Raya Blok C No.1, Taman Galaxy Jakasetia, Bekasi Selatan",
  },

  /** Public site URL, used for Open Graph links. Update after deployment. */
  siteUrl: "https://funtastic-vol-4.vercel.app",
} as const;

export function formatEventDate() {
  const { days, month, year } = event.dates;
  return [days, month, year].filter(Boolean).join(" ");
}

export function isEventDateComplete() {
  return Boolean(event.dates.month && event.dates.year);
}

export function mapsLink(address: string) {
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`;
}

/** Editable placeholder copy for the parchment letter (About section). */
export const welcomeLetter = {
  salutation: "To every student, parent and friend of the academy,",
  paragraphs: [
    "You are cordially invited to Funtastic Vol. 4 — an inter-school carnival where courage meets creativity. SD/MI students can step onto the court for the futsal trials, sharpen their minds at the Try Out TKA, or let their imagination flow in the Mewarnai challenge.",
    "Through every trial we hope young competitors gain positive experience, grow their talents, and celebrate sportsmanship, teamwork and friendship between schools.",
  ],
  signOff: "With warm wishes,",
  signature: "The Funtastic Committee",
  /** Short highlight chips shown under the letter. */
  highlights: ["Three competitions", "Two days of celebration", "For SD/MI students"],
};

export const logos = {
  event: { src: "/brand/funtastic-logo.png", alt: "Funtastic Vol. 4 official logo", width: 1100, height: 894 },
  school: { src: "/brand/school-logo.png", alt: "SMP Tunas Jakasampurna (TJS) crest", width: 329, height: 234 },
  osis: { src: "/brand/osis-logo.png", alt: "OSIS SMP Tunas Jakasampurna logo", width: 527, height: 655 },
  mascot: { src: "/brand/ringmaster.png", alt: "Hand-drawn Funtastic ringmaster mascot bowing with a top hat", width: 663, height: 1106 },
} as const;

export const navItems = [
  { id: "home", label: "Home" },
  { id: "about", label: "About" },
  { id: "gallery", label: "Gallery" },
  { id: "competitions", label: "Competitions" },
  { id: "guidebook", label: "Guidebook" },
  { id: "contact", label: "Contact" },
] as const;

export type CompetitionId = "futsal" | "tka" | "mewarnai";

export type Competition = {
  id: CompetitionId;
  name: string;
  epithet: string;
  description: string;
  /** Optional details — fill in once officially confirmed. */
  details: {
    participants: string | null;
    fee: string | null;
    schedule: string | null;
  };
  /** Key rules summarised from the guidebook; the full list lives in the PDF. */
  rules: string[];
};

export const competitions: Competition[] = [
  {
    id: "futsal",
    name: "Futsal",
    epithet: "The Trial of the Pitch",
    description: "A student futsal competition where teamwork, speed and spirit decide the champions.",
    details: {
      participants: "SD/MI sederajat (Putra) · 8–12 players per team · max. 2 teams per school",
      fee: "Rp200.000 + Rp50.000 (WO)",
      schedule: "Friday–Saturday, 27–28 November 2026 (2 days)",
    },
    rules: [
      "Matches last 2 × 10 minutes",
      "Shin guards and matching jerseys with different numbers are required",
      "Teams called 4 times without showing up are declared WO (lose 3–0)",
    ],
  },
  {
    id: "tka",
    name: "Try Out TKA",
    epithet: "The Trial of the Mind",
    description: "A Try Out TKA session to test your knowledge and readiness in a focused, supportive setting.",
    details: {
      participants: "SD/MI sederajat (Putra/Putri)",
      fee: "Rp25.000 (WO)",
      schedule: "Saturday, 28 November 2026",
    },
    rules: [
      "Bring your own stationery and a valid ID or participant card",
      "Books, notes, phones and smartwatches are not allowed",
      "Late arrivals do not receive extra time",
    ],
  },
  {
    id: "mewarnai",
    name: "Mewarnai",
    epithet: "The Trial of Colours",
    description: "A colouring competition that celebrates imagination, patience and a fearless palette.",
    details: {
      participants: "SD/MI sederajat (Putra/Putri) · max. 3 participants per school",
      fee: "Rp75.000",
      schedule: "Friday, 27 November 2026",
    },
    rules: [
      "Theme: “Melestarikan Lingkungan” · 1 hour",
      "Crayons, coloured pencils and markers allowed (no Caran d’Ache crayons)",
      "Bring your own colouring tools and a folding table; paper is provided",
    ],
  },
];

export type Contact = {
  name: string;
  role: string;
  /** Displayed exactly as supplied. */
  phone: string;
  /** Set when a supplied number still needs to be verified by the organizers. */
  needsConfirmation?: string;
};

export const contacts: Record<CompetitionId, Contact[]> = {
  futsal: [
    { name: "Herjuno", role: "Koor Futsal", phone: "+62 857-8282-7416" },
    { name: "Pak Janavin", role: "Koor Futsal Guru", phone: "+62 858-5321-0580" },
  ],
  tka: [
    {
      name: "Aurel",
      role: "Koor Try Out TKA",
      phone: "+62 813-9551-787",
      // ORGANIZER NOTE: this number has only 10 digits after +62, while the
      // other mobile numbers have 11. Preserved exactly as supplied — please
      // confirm with Aurel and update (then remove `needsConfirmation`).
      needsConfirmation: "Number pending confirmation",
    },
    { name: "Ms Diana", role: "Koor Try Out TKA Guru", phone: "+62 851-6130-7975" },
  ],
  mewarnai: [
    { name: "Aqila", role: "Koor Mewarnai", phone: "+62 813-9897-6414" },
    { name: "Pak Raihan", role: "Koor Mewarnai Guru", phone: "+62 813-8703-1610" },
  ],
};

export const payment = {
  bank: "SeaBank",
  /** Stored as a string to preserve every digit exactly. */
  accountNumber: "901240624806",
  accountHolder: "Yohanna Margaretha",
  /** Registration fees are listed per competition in `competitions[].details.fee`. */
  receiptNote: "Upload your transfer receipt (bukti transfer) in the registration form.",
};

/** Day-by-day programme. Competition ids refer to `competitions`. */
export const schedule: { day: string; date: string; competitions: CompetitionId[] }[] = [
  { day: "Friday", date: "27 November 2026", competitions: ["futsal", "mewarnai"] },
  { day: "Saturday", date: "28 November 2026", competitions: ["futsal", "tka"] },
];

/** Registration info from the official guidebook. */
export const registration = {
  period: "Thursday, 1 October 2026 – Friday, 20 November 2026",
  channels: [
    { label: "Online", detail: "Every day, Monday–Sunday, via the Google Form" },
    { label: "Offline", detail: "Monday–Friday at Aula Mawar" },
  ],
  documents: [
    "Student card (kartu pelajar) and a photocopy of it",
    "Active phone number of the team representative / coach / participant",
    "Proof of registration payment (bukti transfer)",
    "3 × 4 cm passport photo in school uniform",
    "Consent letter from the school",
  ],
  documentsNote: "No student card? Attach a letter of confirmation from the school instead.",
  goodToKnow: [
    "Re-register on site 1 hour before your match or competition starts",
    "Bring a printed copy of your registration form on competition day",
    "Registered teams/participants must attend the Technical Meeting and the opening ceremony",
    "WO money can be collected after a team is eliminated, and is forfeited if the team misses the opening ceremony",
    "Fees and WO money are not refunded if a team withdraws",
  ],
};

export const guidebook = {
  /** Path inside /public. Replace the file to update the guidebook. */
  path: "/assets/GUIDEBOOK LOMBA FUNTASTIC VOL 4.pdf",
  fileName: "Guidebook-Lomba-Funtastic-Vol-4.pdf",
};
