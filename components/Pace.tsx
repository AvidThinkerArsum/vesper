"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { Rise, Words } from "@/components/ui/Reveal";

const MOODS = {
  Wander: [
    { when: "Morning", title: "A path through the pines.", body: "Take a flask, leave the clock, and see where the forest leads." },
    { when: "Afternoon", title: "Lunch, with a long view.", body: "Find a quiet place to pause. The mountains aren't going anywhere." },
    { when: "Evening", title: "Back before the light goes.", body: "A warm soak, a good book, and the pleasure of a day outdoors." },
  ],
  Restore: [
    { when: "Morning", title: "Sleep until the mist lifts.", body: "Breakfast arrives when you do. No one is keeping count." },
    { when: "Afternoon", title: "The water, then a nap.", body: "Warmth first, then a blanket by the window and nothing to decide." },
    { when: "Evening", title: "Dinner, slowly.", body: "Whatever the valley gave us that week, cooked without hurry." },
  ],
  Linger: [
    { when: "Morning", title: "One more coffee on the sill.", body: "Watch the lake change its mind about the weather." },
    { when: "Afternoon", title: "A book you keep not finishing.", body: "The chair by the fire is yours for as long as you want it." },
    { when: "Evening", title: "Stars, if the sky allows.", body: "And if it doesn't, the sound of rain on the roof will do." },
  ],
} as const;

type Mood = keyof typeof MOODS;

export function Pace() {
  const [mood, setMood] = useState<Mood>("Wander");
  return (
    <section id="pace" className="bg-[#e7ebdf] text-[#1f3328]">
      <div className="mx-auto grid max-w-[1600px] grid-cols-1 gap-14 px-6 py-28 sm:px-10 lg:grid-cols-12 lg:py-40">
        <div className="lg:col-span-5">
          <h2 className="display text-5xl leading-[0.98] sm:text-6xl lg:text-[4.8rem]">
            <Words text="Follow your" />
            <br />
            <Words italic="own pace." delay={0.15} />
          </h2>
          <Rise delay={0.3} className="mt-8 max-w-sm text-[15px] leading-relaxed text-[#1f3328]/75">
            Choose a mood. We&apos;ll sketch a day around it.
            <br />
            No schedule you have to keep.
          </Rise>
          <Rise delay={0.4} className="mt-8 flex flex-wrap gap-3">
            {(Object.keys(MOODS) as Mood[]).map((m) => (
              <button
                key={m}
                onClick={() => setMood(m)}
                className={`rounded-full border px-5 py-2.5 text-[13px] transition ${
                  m === mood ? "border-[#1f3328] bg-[#1f3328] text-[#eef0e8]" : "border-[#1f3328]/25 hover:border-[#1f3328]"
                }`}
              >
                {m}
              </button>
            ))}
          </Rise>
          <Rise delay={0.5} className="mt-8">
            <a href="#invitation" className="border-b border-[#1f3328]/40 pb-1 text-[13px]">
              Keep this day ↓
            </a>
          </Rise>
        </div>

        <div className="lg:col-span-6 lg:col-start-7">
          <div className="hairline text-[#1f3328]" />
          <AnimatePresence mode="wait">
            <motion.ol
              key={mood}
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
              className="divide-y divide-[#1f3328]/15"
            >
              {MOODS[mood].map((s, i) => (
                <motion.li
                  key={s.when}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.08, duration: 0.5 }}
                  className="py-8"
                >
                  <p className="eyebrow text-[#1f3328]/55">{s.when}</p>
                  <p className="display mt-3 text-3xl sm:text-4xl">{s.title}</p>
                  <p className="mt-3 max-w-lg text-[14px] leading-relaxed text-[#1f3328]/70">{s.body}</p>
                </motion.li>
              ))}
            </motion.ol>
          </AnimatePresence>
          <div className="hairline text-[#1f3328]" />
          <p className="eyebrow mt-4 text-[#1f3328]/50">An inspiration for your future stay, not a booked itinerary.</p>
        </div>
      </div>
    </section>
  );
}
