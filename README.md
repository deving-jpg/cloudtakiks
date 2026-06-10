# Cloud Taktiks — Website

Animated marketing site for Cloud Taktiks, built on the official brand guidelines.

## Stack
- **Next.js 14** (App Router, TypeScript)
- **Tailwind CSS** — brand design tokens in `tailwind.config.ts`
- **Framer Motion** — scroll reveals, parallax, staggered text, counters, page motion
- **Lenis** — buttery smooth scrolling
- **Raleway** (Light / Semibold / ExtraBold) via `next/font`

## Brand
| Token | Hex | Use |
|-------|-----|-----|
| `brand-blue` | `#4F7CFE` | Official core light blue |
| `brand-deep` | `#172D9D` | Deep blue (the chevron "K"s) |
| `brand-cyan` | `#4ADEDE` | Secondary teal |
| `brand-sky`  | `#7DD6F6` | Secondary sky |
| `brand-gray` | `#D7D7D7` | Secondary gray |

The repeating **chevron `‹‹‹`** (the arrow-K from the logo) is the signature motif — used in the hero mark, dividers, buttons, marquee and footer.

## Pages
- `/` — Home (animated hero, partners marquee, approach, offerings, stats counters, why-us, blog teaser, CTA)
- `/about` — Mission, vision, stats, journey timeline, 7 core values
- `/offerings` — All 6 services in detail
- `/blog` — Featured post + grid + sidebar (search, categories, recent)
- `/contact` — Animated form + regional contact info

## Run it
```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build
```

## Notes
- Respects `prefers-reduced-motion`.
- Content sourced from the brand guidelines PDF and the existing cloudtaktiks.com site.
- The contact form is currently front-end only (shows a success state) — wire it to an API route / email service when ready.
