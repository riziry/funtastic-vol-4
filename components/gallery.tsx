"use client";

import Image from "next/image";
import { useState } from "react";
import { Expand, Play } from "lucide-react";
import { GALLERY_INITIAL_COUNT, galleryItems, type GalleryLayout } from "@/content/gallery";
import { Lightbox } from "./lightbox";

const spans: Record<GalleryLayout, string> = {
  feature: "col-span-2 row-span-2",
  tall: "row-span-2",
  wide: "col-span-2",
  normal: "",
};

const sizes: Record<GalleryLayout, string> = {
  feature: "(min-width: 768px) 50vw, 100vw",
  wide: "(min-width: 768px) 50vw, 100vw",
  tall: "(min-width: 768px) 25vw, 50vw",
  normal: "(min-width: 768px) 25vw, 50vw",
};

export function GalleryGrid() {
  const [expanded, setExpanded] = useState(false);
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const visible = expanded ? galleryItems : galleryItems.slice(0, GALLERY_INITIAL_COUNT);

  if (galleryItems.length === 0) {
    return (
      <p className="gold-frame mx-auto max-w-lg rounded-xl px-6 py-10 text-center font-serif text-lg text-ivory/75">
        Photographs from previous carnivals will appear here soon.
      </p>
    );
  }

  return (
    <>
      <ul className="grid grid-flow-dense auto-rows-[9.5rem] grid-cols-2 gap-2.5 sm:auto-rows-[12rem] sm:gap-3 md:grid-cols-4 lg:auto-rows-[13.5rem]">
        {visible.map((item, index) => (
          <li key={item.id} className={spans[item.layout]}>
            <button
              type="button"
              onClick={() => setOpenIndex(index)}
              className="group relative block size-full overflow-hidden rounded-lg border border-gold/15 bg-burgundy text-left transition-[border-color,box-shadow] duration-500 hover:border-gold/60 hover:shadow-[0_20px_50px_-20px_rgb(166_27_50/0.8)]"
            >
              <Image
                src={item.image}
                alt={item.alt}
                placeholder="blur"
                sizes={sizes[item.layout]}
                className="size-full object-cover transition-transform duration-[1.2s] ease-out group-hover:scale-[1.06]"
              />
              <span className="absolute inset-0 bg-gradient-to-t from-midnight/85 via-midnight/10 to-transparent opacity-70 transition-opacity duration-500 group-hover:opacity-100" />
              <span className="absolute top-2.5 left-2.5 rounded-full border border-gold/40 bg-midnight/70 px-2.5 py-0.5 text-[0.65rem] font-bold tracking-[0.2em] text-gold-light uppercase">
                {item.year}
              </span>
              {item.video ? (
                <span className="absolute inset-0 grid place-items-center">
                  <span className="grid size-14 place-items-center rounded-full border border-gold/60 bg-midnight/60 text-gold-light transition-transform duration-500 group-hover:scale-110">
                    <Play aria-hidden className="ml-0.5 size-6 fill-current" />
                  </span>
                </span>
              ) : (
                <Expand
                  aria-hidden
                  className="absolute top-2.5 right-2.5 size-8 rounded-full bg-midnight/60 p-2 text-gold-light opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                />
              )}
              {item.caption ? (
                <span className="absolute inset-x-0 bottom-0 p-3 font-serif text-base leading-snug text-ivory sm:p-4 sm:text-lg">
                  {item.caption}
                </span>
              ) : null}
              <span className="sr-only">{item.video ? "Play video" : "Open photo"}</span>
            </button>
          </li>
        ))}
      </ul>

      {galleryItems.length > GALLERY_INITIAL_COUNT ? (
        <div className="mt-10 flex justify-center">
          <button type="button" onClick={() => setExpanded((v) => !v)} className="btn btn-ghost" aria-expanded={expanded}>
            {expanded ? "Show fewer memories" : `Show all ${galleryItems.length} memories`}
          </button>
        </div>
      ) : null}

      <Lightbox
        items={visible}
        index={openIndex}
        onClose={() => setOpenIndex(null)}
        onNavigate={setOpenIndex}
      />
    </>
  );
}
