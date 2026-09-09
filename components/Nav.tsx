"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useEffect, useState } from "react";

// The page opens on the photograph alone; the nav arrives with the room.
// A frosted cream bar keeps it legible over wood, fog, and dusk alike.
export function Nav() {
  const { scrollY } = useScroll();
  const [vh, setVh] = useState(900);
  useEffect(() => {
    const on = () => setVh(window.innerHeight);
    on();
    window.addEventListener("resize", on);
    return () => window.removeEventListener("resize", on);
  }, []);
  const opacity = useTransform(scrollY, [vh * 1.5, vh * 2.1], [0, 1]);
  const y = useTransform(scrollY, [vh * 1.5, vh * 2.1], [-12, 0]);

  return (
    <motion.header
      style={{ opacity, y }}
      className="pointer-events-none fixed inset-x-0 top-0 z-50 border-b border-[#0f1f17]/10 bg-[#eef0e8]/80 text-[#0f1f17] backdrop-blur-md"
    >
      <nav className="mx-auto flex h-16 max-w-[1600px] items-center justify-between px-5 sm:h-20 sm:px-10">
        <div className="pointer-events-auto flex items-center gap-6 text-[12px] font-medium">
          <a href="#retreat" className="hidden hover:opacity-70 sm:inline">The retreat</a>
          <a href="#pace" className="hidden hover:opacity-70 sm:inline">A day, yours</a>
          <a href="#retreat" className="sm:hidden">Menu</a>
        </div>
        <a href="#top" className="pointer-events-auto text-center">
          <span className="display block text-3xl font-medium leading-none tracking-[0.04em] sm:text-4xl">vesper</span>
          <span className="eyebrow mt-1.5 hidden text-[0.5rem] font-semibold opacity-80 sm:block">A retreat in the Cascades</span>
        </a>
        <a
          href="#invitation"
          className="pointer-events-auto whitespace-nowrap rounded-full border border-[#0f1f17]/40 px-4 py-2 text-[12px] font-medium transition hover:bg-[#0f1f17] hover:text-[#eef0e8] sm:px-5"
        >
          <span className="hidden sm:inline">An invitation</span>
          <span className="sm:hidden">Invitation</span>
          <span className="ml-1 text-[0.6rem]">↗</span>
        </a>
      </nav>
    </motion.header>
  );
}
