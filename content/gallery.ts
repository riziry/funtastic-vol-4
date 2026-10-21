/**
 * Gallery — authentic documentation from Funtastic Vol. 3.
 *
 * To add a photo:
 *   1. Put a web-friendly JPG/WebP in public/gallery/<folder>/ (convert HEIC first).
 *   2. Import it below and add an entry to `galleryItems`.
 * To remove or reorder, just delete or move entries in the array.
 *
 * `layout` controls the tile size in the editorial grid:
 *   "feature" = large 2×2, "tall" = 1×2, "wide" = 2×1, "normal" = 1×1.
 * Tip: keep the total tile area (4 / 2 / 2 / 1) a multiple of 4 and end the
 * list with a few "normal" tiles so the grid closes without gaps.
 *
 * Other converted shots (near-duplicates) are available in public/gallery/vol-3/:
 * img_6252, img_6253, img_6254, img_6255, img_6256, img_6373, img_6374,
 * img_6408, img_6409, img_6416.
 */
import type { StaticImageData } from "next/image";

import img6235 from "@/public/gallery/vol-3/img_6235.jpg";
import img6250 from "@/public/gallery/vol-3/img_6250.jpg";
import img6251 from "@/public/gallery/vol-3/img_6251.jpg";
import img6257 from "@/public/gallery/vol-3/img_6257.jpg";
import img6290 from "@/public/gallery/vol-3/img_6290.jpg";
import img6292 from "@/public/gallery/vol-3/img_6292.jpg";
import img6372 from "@/public/gallery/vol-3/img_6372.jpg";
import img6375 from "@/public/gallery/vol-3/img_6375.jpg";
import img6407 from "@/public/gallery/vol-3/img_6407.jpg";
import img6410 from "@/public/gallery/vol-3/img_6410.jpg";
import img6412 from "@/public/gallery/vol-3/img_6412.jpg";
import img6413 from "@/public/gallery/vol-3/img_6413.jpg";
import img6414 from "@/public/gallery/vol-3/img_6414.jpg";
import img6415 from "@/public/gallery/vol-3/img_6415.jpg";
import img6417 from "@/public/gallery/vol-3/img_6417.jpg";
import poster6230 from "@/public/gallery/vol-3/img_6230-poster.jpg";
import poster6233 from "@/public/gallery/vol-3/img_6233-poster.jpg";
import poster9781 from "@/public/gallery/vol-3/img_9781-poster.jpg";
import poster9829 from "@/public/gallery/vol-3/img_9829-poster.jpg";
import poster9832 from "@/public/gallery/vol-3/img_9832-poster.jpg";

export type GalleryLayout = "feature" | "tall" | "wide" | "normal";

export type GalleryItem = {
  id: string;
  /** Photo, or poster frame for videos. */
  image: StaticImageData;
  alt: string;
  caption?: string;
  year: string;
  layout: GalleryLayout;
  /** When set, the item is a video clip (MP4 in /public). */
  video?: string;
};

const VOL3 = "Vol. 3";

export const galleryItems: GalleryItem[] = [
  {
    id: "vol3-6290",
    image: img6290,
    alt: "Committee members in purple shirts posing in front of the Funtastic Vol. 3 banner",
    caption: "The crew beneath the Vol. 3 banner",
    year: VOL3,
    layout: "tall",
  },
  {
    id: "vol3-6372",
    image: img6372,
    alt: "Two futsal teams posing together for a group photo on the blue court",
    caption: "Rivals on the pitch, friends in the frame",
    year: VOL3,
    layout: "feature",
  },
  {
    id: "vol3-9829",
    image: poster9829,
    video: "/gallery/vol-3/img_9829.mp4",
    alt: "Video: a player in a yellow jersey dribbles the ball during a futsal match",
    caption: "Match highlights",
    year: VOL3,
    layout: "tall",
  },
  {
    id: "vol3-6251",
    image: img6251,
    alt: "Students taking a group selfie in front of the Funtastic Vol. 3 stage banner",
    caption: "One more selfie before the show",
    year: VOL3,
    layout: "normal",
  },
  {
    id: "vol3-6407",
    image: img6407,
    alt: "Futsal teams and referees lined up across the court before kickoff",
    caption: "The line-up before kickoff",
    year: VOL3,
    layout: "wide",
  },
  {
    id: "vol3-6235",
    image: img6235,
    alt: "Committee members in purple shirts playfully posing on the court",
    caption: "Committee spirit",
    year: VOL3,
    layout: "tall",
  },
  {
    id: "vol3-6415",
    image: img6415,
    alt: "A futsal team in red and navy jerseys posing with their coach",
    year: VOL3,
    layout: "normal",
  },
  {
    id: "vol3-9781",
    image: poster9781,
    video: "/gallery/vol-3/img_9781.mp4",
    alt: "Video: committee members helping young players at the check-in desk",
    caption: "Welcoming the teams",
    year: VOL3,
    layout: "tall",
  },
  {
    id: "vol3-6292",
    image: img6292,
    alt: "A group of committee members standing in front of the Vol. 3 banner",
    year: VOL3,
    layout: "normal",
  },
  {
    id: "vol3-6413",
    image: img6413,
    alt: "A futsal team in blue jerseys posing on the court",
    year: VOL3,
    layout: "normal",
  },
  {
    id: "vol3-6375",
    image: img6375,
    alt: "Players from two futsal teams kneeling and standing together for a photo",
    year: VOL3,
    layout: "wide",
  },
  {
    id: "vol3-6230",
    image: poster6230,
    video: "/gallery/vol-3/img_6230.mp4",
    alt: "Video: young players chasing the ball across the futsal court",
    caption: "On the court",
    year: VOL3,
    layout: "tall",
  },
  {
    id: "vol3-6250",
    image: img6250,
    alt: "Committee members in purple shirts taking a playful selfie",
    year: VOL3,
    layout: "normal",
  },
  {
    id: "vol3-6412",
    image: img6412,
    alt: "Referees in yellow standing between two futsal teams on the court",
    caption: "Fair play, always",
    year: VOL3,
    layout: "normal",
  },
  {
    id: "vol3-6417",
    image: img6417,
    alt: "A futsal team in red jerseys posing with their coach on the court",
    year: VOL3,
    layout: "normal",
  },
  {
    id: "vol3-6410",
    image: img6410,
    alt: "A photographer capturing the teams lined up on the court",
    caption: "Behind the lens",
    year: VOL3,
    layout: "normal",
  },
  {
    id: "vol3-9832",
    image: poster9832,
    video: "/gallery/vol-3/img_9832.mp4",
    alt: "Video: futsal match in progress with spectators watching from the stands",
    caption: "The crowd watches on",
    year: VOL3,
    layout: "tall",
  },
  {
    id: "vol3-6233",
    image: poster6233,
    video: "/gallery/vol-3/img_6233.mp4",
    alt: "Video: a futsal match underway on the blue outdoor court",
    year: VOL3,
    layout: "tall",
  },
  {
    id: "vol3-6257",
    image: img6257,
    alt: "Students crowding together for a selfie in front of the stage",
    year: VOL3,
    layout: "normal",
  },
  {
    id: "vol3-6414",
    image: img6414,
    alt: "A futsal team in blue kits posing for a team photo",
    year: VOL3,
    layout: "normal",
  },
];

/** How many tiles to show before the "Show more" button. */
export const GALLERY_INITIAL_COUNT = 20;
