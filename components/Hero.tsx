"use client";

import { motion, useMotionValue, useReducedMotion, useScroll, useSpring, useTransform } from "framer-motion";
import { useEffect, useId, useMemo, useRef, useState } from "react";
import { PHOTOS } from "@/lib/photos";
import { Words, Rise } from "@/components/ui/Reveal";

/**
 * The window glass in the bedroom photograph, as % of the image. The roller blind
 * sits above 27.5%, the folded robes start at 78%, and a sliver of glass shows
 * between them down to 82%.
 */
const GLASS: [number, number][] = [
  [27.5, 26.6],
  [78, 26.6],
  [78, 81],
  [76, 79.5],
  [72, 78],
  [66, 77.5],
  [60, 78.5],
  [58, 80],
  [58, 82.5],
  [42, 82.5],
  [42, 80],
  [41, 78.5],
  [36, 77.5],
  [30, 79],
  [27.5, 81],
];
const GLASS_BOX = { x: 27.5, y: 26.6, w: 50.5, h: 55.9 };
// The plain plywood wall left of the window, where the copy lands (desktop).
const WALL = { x: 3, y: 30, w: 21.5 };

export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const id = useId().replace(/[^a-zA-Z0-9]/g, "");
  const reduce = useReducedMotion();
  const [vp, setVp] = useState({ w: 1440, h: 900 });
  const [img, setImg] = useState({ w: 1400, h: 1000 });
  useEffect(() => {
    const on = () => setVp({ w: window.innerWidth, h: window.innerHeight });
    on();
    window.addEventListener("resize", on);
    const probe = new Image();
    probe.onload = () => setImg({ w: probe.naturalWidth, h: probe.naturalHeight });
    probe.src = PHOTOS.bedroom.src;
    return () => window.removeEventListener("resize", on);
  }, []);
  const mobile = vp.w < 768;

  // Where the room photograph lands when it covers the viewport (object-fit: cover).
  const L = useMemo(() => {
    const s = Math.max(vp.w / img.w, vp.h / img.h);
    const w = img.w * s, h = img.h * s;
    const ox = (vp.w - w) / 2, oy = (vp.h - h) / 2;
    const win = { x: ox + (GLASS_BOX.x / 100) * w, y: oy + (GLASS_BOX.y / 100) * h, w: (GLASS_BOX.w / 100) * w, h: (GLASS_BOX.h / 100) * h };
    const cx = win.x + win.w / 2, cy = win.y + win.h / 2;
    const cover = Math.max(vp.w / win.w, vp.h / win.h) * 1.04;
    return { ox, oy, w, h, win, cx, cy, cover, wall: { x: ox + (WALL.x / 100) * w, y: oy + (WALL.y / 100) * h, w: (WALL.w / 100) * w } };
  }, [vp, img]);

  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  // 0 = inside the view, 1 = pulled back into the room (holds until the section ends).
  const raw = useTransform(scrollYProgress, [0.08, 0.6], [0, 1]);
  const reveal = useSpring(raw, { stiffness: 55, damping: 20, mass: 0.9 });
  const scale = useTransform(reveal, [0, 1], [L.cover, 1]);
  const x = useTransform(reveal, [0, 1], [vp.w / 2 - L.cx, 0]);
  const y = useTransform(reveal, [0, 1], [vp.h / 2 - L.cy, 0]);
  const glassO = useTransform(reveal, [0.3, 1], [0, 1]);
  const textO = useTransform(reveal, [0.72, 1], [0, 1]);
  const textY = useTransform(reveal, [0.72, 1], [24, 0]);
  // Full 0→1 range: scroll-linked opacity becomes a native scroll timeline, and a
  // range that ends early gets an implicit keyframe back at the underlying value.
  const cueO = useTransform(scrollYProgress, [0, 0.06, 1], [1, 0, 0]);

  // Mouse parallax: the view moves inside the frame, the room barely.
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const smx = useSpring(mx, { stiffness: 40, damping: 16 });
  const smy = useSpring(my, { stiffness: 40, damping: 16 });
  const lakeX = useTransform(smx, (v) => -v * 34);
  const lakeY = useTransform(smy, (v) => -v * 18);
  const roomX = useTransform(smx, (v) => -v * 8);
  const roomY = useTransform(smy, (v) => -v * 4);
  function onMove(e: React.MouseEvent<HTMLElement>) {
    if (reduce) return;
    mx.set(e.clientX / window.innerWidth - 0.5);
    my.set(e.clientY / window.innerHeight - 0.5);
  }

  // Solid, dark, slightly heavier type — it sits on mid-toned plywood, not a white wall.
  const copy = (
    <div className="relative">
      <div aria-hidden className="absolute -inset-x-8 -inset-y-10 -z-10 rounded-[40%] bg-[radial-gradient(ellipse_at_center,rgba(245,243,236,0.55),rgba(245,243,236,0)_70%)] blur-xl" />
      <p className="eyebrow font-semibold text-[#0f1f17]">Vesper · A retreat in the Cascades</p>
      <h1 className="display mt-4 text-[2.6rem] font-medium leading-[0.95] text-[#0b1a12] sm:text-5xl lg:text-[3.1rem] xl:text-[3.6rem]">
        <Words text="Where the light" />
        <br />
        <Words italic="takes its time." delay={0.15} />
      </h1>
      <p className="mt-5 max-w-[260px] text-[13px] font-medium leading-relaxed text-[#0f1f17]">
        A little closer to the trees. A little further from everything else.
      </p>
      <a href="#retreat" className="mt-6 inline-flex items-center gap-2 border-b border-[#0f1f17]/60 pb-1 text-[13px] font-medium text-[#0f1f17]">
        The retreat <span className="text-[0.65rem]">↓</span>
      </a>
    </div>
  );

  return (
    <section id="top" ref={ref} onMouseMove={onMove} className="relative" style={{ height: reduce ? "auto" : "380vh" }}>
      <div className={`relative overflow-hidden bg-[#0e0f0c] ${reduce ? "h-screen" : "sticky top-0 h-screen"}`}>
        {/* camera: the whole composite scales about the window */}
        <motion.div
          style={reduce ? undefined : { x, y, scale, transformOrigin: `${L.cx}px ${L.cy}px` }}
          className="absolute inset-0"
        >
          {/* the view, sitting behind the glass */}
          <div className="absolute overflow-hidden" style={{ left: L.win.x, top: L.win.y, width: L.win.w, height: L.win.h }}>
            <motion.img
              src={PHOTOS.lake.src}
              alt={PHOTOS.lake.alt}
              style={{ x: lakeX, y: lakeY, scale: 1.14 }}
              className="h-full w-full object-cover object-[50%_45%]"
              draggable={false}
            />
            {/* glass: a little reflection, and the frame's shadow falling inward */}
            <motion.div style={{ opacity: glassO }} className="pointer-events-none absolute inset-0">
              <div className="absolute inset-0 shadow-[inset_0_0_90px_rgba(0,0,0,0.42)]" />
              <div className="absolute inset-0 bg-[linear-gradient(112deg,rgba(255,255,255,0.10)_0%,transparent_30%,transparent_70%,rgba(255,255,255,0.06)_100%)]" />
            </motion.div>
          </div>

          {/* the room, with the glass cut out. Positioned by a div: framer-motion does not
              update left/top/width/height on SVG elements after first render. */}
          <motion.div style={{ x: roomX, y: roomY, left: L.ox, top: L.oy, width: L.w, height: L.h }} className="absolute">
            <svg className="h-full w-full" viewBox="0 0 100 100" preserveAspectRatio="none">
              <defs>
                <mask id={`${id}-glass`} maskUnits="userSpaceOnUse" x="0" y="0" width="100" height="100">
                  <rect width="100" height="100" fill="#fff" />
                  <polygon points={GLASS.map((p) => p.join(",")).join(" ")} fill="#000" />
                </mask>
              </defs>
              <image href={PHOTOS.bedroom.src} width="100" height="100" preserveAspectRatio="none" mask={`url(#${id}-glass)`} />
            </svg>
          </motion.div>
        </motion.div>

        {/* copy: on the wall (desktop) or over the bed (mobile) — only once we're in the room */}
        {mobile ? (
          <motion.div style={{ opacity: textO, y: textY }} className="absolute inset-x-0 bottom-0 bg-[linear-gradient(180deg,transparent,rgba(238,240,232,0.92)_40%)] px-6 pb-10 pt-24">
            {copy}
          </motion.div>
        ) : (
          <motion.div style={{ opacity: textO, y: textY, left: L.wall.x, top: L.wall.y, width: L.wall.w }} className="absolute">
            {copy}
          </motion.div>
        )}

        {/* a wordless scroll cue while we're still inside the view */}
        <motion.div style={{ opacity: cueO }} className="absolute bottom-8 left-1/2 flex -translate-x-1/2 flex-col items-center gap-2">
          <span className="block h-10 w-px animate-pulse bg-[#f2f3ee]/80" />
        </motion.div>
      </div>
    </section>
  );
}
