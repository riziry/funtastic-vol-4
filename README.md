# Funtastic Vol. 4 — Magical School Carnival

Single-page event showcase built with Next.js 16 (App Router), Tailwind CSS 4, Motion and Lucide.

```bash
npm install
npm run dev     # http://localhost:3000
npm run build   # production build
npm run lint
```

## Updating content (no layout code needed)

| What | Where |
| --- | --- |
| Event name, headline, intro, **dates (month/year)**, site URL | `content/event.ts` → `event` |
| Welcome letter copy & highlights | `content/event.ts` → `welcomeLetter` |
| Competitions (participants / fee / schedule / key rules) | `content/event.ts` → `competitions` — leave a detail `null` until confirmed |
| Day-by-day programme | `content/event.ts` → `schedule` |
| Contact persons & phone numbers | `content/event.ts` → `contacts` |
| Payment account | `content/event.ts` → `payment` |
| Registration form link (used by every CTA) | `content/event.ts` → `REGISTRATION_URL` |
| Gallery photos & videos | `content/gallery.ts` |
| Logos | `public/brand/` (transparent PNG cutouts of the files in `public/assets/`) |
| Social share image | `public/og-image.jpg` (1200×630) |

### Guidebook

The official PDF lives at `public/assets/GUIDEBOOK LOMBA FUNTASTIC VOL 4.pdf` (path set in
`content/event.ts` → `guidebook.path`). Replace the file and rebuild to update it. If the file is missing, the site
shows a "Guidebook coming soon" state instead of a broken link.

Fees, participants, key rules and registration requirements shown on the site are summarised from this guidebook
(`competitions` and `registration` in `content/event.ts`) — update both together.

### Gallery

The original Vol. 3 HEIC/MOV files live on Google Drive (not in this repo — browsers can't display them and they
weighed 238 MB). The site uses web-optimized copies in `public/gallery/vol-3/` (JPG max 1920px, MP4 H.264 720p +
poster frames). To add new ones, download the original from Drive and convert it:

```bash
vips thumbnail IMG_1234.HEIC public/gallery/vol-3/img_1234.jpg[Q=80,strip] 1920 --size down
ffmpeg -i IMG_1234.MOV -vf "scale=-2:1280,format=yuv420p" -c:v libx264 -crf 27 -movflags +faststart -c:a aac -b:a 96k public/gallery/vol-3/img_1234.mp4
```

Then import the file in `content/gallery.ts` and add an entry.

### Open items for organizers

- Aurel's number `+62 813-9551-787` has one fewer digit than the others (same in the guidebook) — please confirm
- The guidebook defines "WO" as "Walk-in / biaya tambahan…" followed by an editing note that looks unintended;
  the rules (no. 7 & 12) treat it as a refundable deposit. Worth clarifying in the PDF
- `event.siteUrl` after deployment (used for Open Graph links)
