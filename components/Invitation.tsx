"use client";

import { PHOTOS } from "@/lib/photos";
import { Rise, Words } from "@/components/ui/Reveal";

export function Invitation() {
  return (
    <section id="invitation" className="relative overflow-hidden text-[#f2f3ee]">
      <img src={PHOTOS.dusk.src} alt={PHOTOS.dusk.alt} className="absolute inset-0 h-full w-full object-cover" />
      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(20,32,26,0.2),rgba(20,32,26,0.75))]" />
      <div className="relative mx-auto flex min-h-[90vh] max-w-[1600px] flex-col justify-end px-6 pb-16 pt-40 sm:px-10">
        <p className="eyebrow text-[#f2f3ee]/70">An invitation</p>
        <h2 className="display mt-6 max-w-4xl text-5xl leading-[0.98] sm:text-7xl lg:text-[6rem]">
          <Words text="Stay until you" />
          <br />
          <Words italic="lose track of time." delay={0.2} />
        </h2>
        <Rise delay={0.4} className="mt-10 flex flex-wrap items-center gap-6">
          <a href="mailto:stay@example.com" className="rounded-full bg-[#eef0e8] px-7 py-4 text-sm text-[#1f3328] transition hover:bg-white">
            Request a stay ↗
          </a>
          <span className="max-w-xs text-[13px] leading-relaxed text-[#f2f3ee]/75">
            Eleven rooms in the Cascade foothills. We open the calendar a season at a time.
          </span>
        </Rise>
        <div className="mt-20 flex flex-col gap-2 border-t border-white/15 pt-6 text-[11px] text-[#f2f3ee]/55 sm:flex-row sm:items-center sm:justify-between">
          <span>
            Vesper is a fictional retreat built as a design study. Photographs via{" "}
            {Object.values(PHOTOS).map((p, i) => (
              <span key={p.id}>
                <a href={p.page} target="_blank" rel="noreferrer" className="underline decoration-white/30 hover:decoration-white">
                  Pexels
                </a>
                {i < Object.values(PHOTOS).length - 1 ? ", " : "."}
              </span>
            ))}
          </span>
          <span className="eyebrow">The art of a slower stay</span>
        </div>
      </div>
    </section>
  );
}
