"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { PHOTOS } from "@/lib/photos";
import { Rise, Words } from "@/components/ui/Reveal";

// Full-bleed fog over the forest. The photograph drifts slower than the page so it feels deep.
export function Agenda() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["-10%", "10%"]);

  return (
    <section ref={ref} className="relative h-[110vh] overflow-hidden text-[#f2f3ee]">
      <motion.img src={PHOTOS.fog.src} alt={PHOTOS.fog.alt} style={{ y }} className="absolute inset-[-10%_0] h-[120%] w-full object-cover" />
      <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(20,32,26,0.6),rgba(20,32,26,0.15)_60%,transparent)]" />
      <div className="relative mx-auto flex h-full max-w-[1600px] items-center px-6 sm:px-10">
        <div>
          <h2 className="display text-5xl leading-[0.98] sm:text-7xl lg:text-[5.6rem]">
            <Words text="The only thing" />
            <br />
            <Words text="on the agenda." />
            <br />
            <Words italic="Nothing." delay={0.25} />
          </h2>
          <Rise delay={0.5} className="mt-8 text-[14px] leading-relaxed text-[#f2f3ee]/85">
            Water, warmth, and a view.
            <br />
            Stay until you lose track of time.
          </Rise>
        </div>
      </div>
    </section>
  );
}
