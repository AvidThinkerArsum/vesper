# Vesper — a fictional retreat in the Cascades

Design study: a Serein-style hospitality landing page. The page opens on a photograph alone — a misty lake — with no text. As you scroll, the camera pulls back: the photograph shrinks into the window of a plywood cabin bedroom, the room assembles around it, and only then does the copy arrive on the wall.

**Stack:** Next.js 16 · React 19 · Tailwind v4 · Framer Motion 13.

**Photographs:** from Pexels, under the Pexels license, referenced from Pexels' CDN (nothing copied into the repo). Sources are listed in `lib/photos.ts` and linked in the footer. To make the site self-contained, download those files into `public/` and point `lib/photos.ts` at them.

## Run

```bash
npm run dev -- -p 3003
```

## How the hero works

Two photographs and a mask. The bedroom photograph is drawn as an SVG `<image>` with a `<mask>` that cuts out the window glass (a polygon in image percentages, measured against a grid — it hugs the roller blind above and the folded robes below). The lake photograph sits behind that hole, positioned at the glass rectangle. Because the hole's edges are the real window frame in the real photo, the composite reads as one space.

The whole composite scales about the centre of the window. At scroll 0 the scale is `max(vw/winW, vh/winH)`, so the glass exactly covers the viewport and you see only the lake. A spring-smoothed scroll value drives scale and translate back to identity; the glass reflection, the frame's inward shadow, the wall copy, and the nav fade in as the room arrives. The lake parallaxes with the mouse inside the frame; the room barely moves.

Layout math lives in one `useMemo` in `components/Hero.tsx` (`L`): the cover-fit rectangle of the room photo, the glass rectangle in viewport pixels, the cover scale, and the wall region for the copy.

## Where things are

| Piece | File |
|---|---|
| Photo sources | `lib/photos.ts` |
| Hero: mask, camera pull-back, parallax, copy placement | `components/Hero.tsx` |
| Nav (fades in with the room) | `components/Nav.tsx` |
| "There is an art to doing very little" | `components/Art.tsx` |
| "Made for staying in" — the rooms / the water | `components/StayingIn.tsx` |
| Full-bleed fog: "The only thing on the agenda. Nothing." | `components/Agenda.tsx` |
| Mood picker → itinerary (Wander / Restore / Linger) | `components/Pace.tsx` |
| Invitation + footer with photo credits | `components/Invitation.tsx` |

## Gotcha worth knowing

Framer Motion does not update `left`/`top`/`width`/`height` passed via `style` on **SVG** elements after the first render (it treats them as attributes). Position SVGs with a wrapping `motion.div`.
