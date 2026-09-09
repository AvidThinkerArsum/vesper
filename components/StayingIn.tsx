"use client";

import { motion } from "framer-motion";
import { PHOTOS } from "@/lib/photos";
import { Rise, Words } from "@/components/ui/Reveal";

const CARDS = [
  { photo: PHOTOS.rooms, title: "The rooms", note: "Warm wood. Soft edges. A long view." },
  { photo: PHOTOS.water, title: "The water", note: "Let the afternoon go." },
];

// "Made for staying in." — two tall photographs: the rooms, the water.
export function StayingIn() {
  return (
    <section className="bg-[#eef0e8] text-[#1f3328]">
      <div className="mx-auto max-w-[1600px] px-6 pb-28 sm:px-10 lg:pb-40">
        <div className="hairline text-[#1f3328]" />
        <div className="mt-8 flex flex-col gap-8 lg:flex-row lg:items-start lg:justify-between">
          <p className="eyebrow text-[#1f3328]/60">The art of a slower stay</p>
          <h2 className="display text-5xl leading-[0.98] sm:text-6xl lg:text-right lg:text-[4.6rem]">
            <Words text="Made for" />
            <br />
            <Words italic="staying in." delay={0.15} />
          </h2>
        </div>

        <div className="mt-20 grid grid-cols-1 gap-8 md:grid-cols-2 lg:gap-12">
          {CARDS.map((c, i) => (
            <Rise key={c.title} delay={i * 0.15} className={i === 1 ? "md:mt-20" : ""}>
              <motion.figure whileHover={{ y: -6 }} transition={{ type: "spring", stiffness: 160, damping: 20 }} className="group">
                <div className="relative aspect-[4/3] overflow-hidden shadow-[0_40px_80px_-40px_rgba(31,51,40,0.45)]">
                  <img src={c.photo.src} alt={c.photo.alt} className="h-full w-full object-cover transition duration-[1400ms] group-hover:scale-[1.04]" />
                </div>
                <figcaption className="mt-4 flex items-center justify-between text-[12px]">
                  <span>{c.title}</span>
                  <span className="text-[#1f3328]/60">{c.note}</span>
                </figcaption>
              </motion.figure>
            </Rise>
          ))}
        </div>
      </div>
    </section>
  );
}
