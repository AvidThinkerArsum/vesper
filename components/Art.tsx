"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { PHOTOS } from "@/lib/photos";
import { Rise, Words } from "@/components/ui/Reveal";

// "There is an art to doing very little." — copy left, breakfast by the window right.
export function Art() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [50, -50]);
  const imgY = useTransform(scrollYProgress, [0, 1], ["-6%", "6%"]);

  return (
    <section id="retreat" ref={ref} className="bg-[#eef0e8] text-[#1f3328]">
      <div className="mx-auto grid max-w-[1600px] grid-cols-1 gap-16 px-6 py-28 sm:px-10 lg:grid-cols-12 lg:py-40">
        <div className="lg:col-span-1">
          <Rise>
            <svg viewBox="0 0 40 40" className="h-10 w-10 text-[#1f3328]">
              {[0, 45, 90, 135].map((a) => (
                <line key={a} x1="20" y1="2" x2="20" y2="38" stroke="currentColor" strokeWidth="1.4" transform={`rotate(${a} 20 20)`} />
              ))}
            </svg>
          </Rise>
        </div>
        <div className="lg:col-span-6">
          <h2 className="display text-5xl leading-[0.98] sm:text-6xl lg:text-[4.6rem]">
            <Words text="There is an art" />
            <br />
            <Words text="to doing" italic="very little." delay={0.15} />
          </h2>
          <Rise delay={0.35} className="mt-10 max-w-md space-y-5 text-[15px] leading-relaxed text-[#1f3328]/75">
            <p>A long breakfast. Pine in the air after rain. The kind of afternoon that doesn&apos;t need a plan.</p>
            <p>We&apos;re imagining Vesper around these small, expansive things. Thoughtful rooms, wild surroundings, and time that feels like your own.</p>
          </Rise>
          <Rise delay={0.5} className="display mt-8 text-xl italic text-[#1f3328]/80">
            From the mountains, with care.
          </Rise>
        </div>
        <div className="lg:col-span-5">
          <Rise delay={0.2}>
            <motion.figure style={{ y }} className="relative mx-auto aspect-[4/5] max-w-[440px] overflow-hidden shadow-[0_40px_80px_-40px_rgba(31,51,40,0.45)]">
              <motion.img
                src={PHOTOS.breakfast.src}
                alt={PHOTOS.breakfast.alt}
                style={{ y: imgY }}
                className="absolute inset-[-8%_0] h-[116%] w-full object-cover"
              />
              <figcaption className="absolute inset-x-0 bottom-0 flex items-center justify-between bg-[linear-gradient(180deg,transparent,rgba(0,0,0,0.35))] px-4 pb-3 pt-10 text-[#f2f3ee]">
                <span className="eyebrow">Breakfast, unhurried</span>
                <span className="eyebrow">Vesper</span>
              </figcaption>
            </motion.figure>
          </Rise>
        </div>
      </div>
    </section>
  );
}
