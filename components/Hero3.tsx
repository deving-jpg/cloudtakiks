"use client";

import { motion } from "framer-motion";
import { HeroContent } from "./HeroContent";
import FitToScreen from "./FitToScreen";
import { useLang } from "./LanguageProvider";

const RINGS = 8;
const DUR = 5.5;

export default function Hero3() {
  const { t } = useLang();
  return (
    <section className="relative flex min-h-[100svh] items-center justify-center overflow-hidden bg-bg py-20">
      {/* depth glow (lighter in light mode, deep in dark mode) */}
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-[55vw] w-[55vw] -translate-x-1/2 -translate-y-1/2 rounded-full bg-brand-sky/20 blur-[160px] dark:bg-brand-deep/45" />
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-[22vw] w-[22vw] -translate-x-1/2 -translate-y-1/2 rounded-full bg-brand-cyan/20 blur-[120px] dark:bg-brand-cyan/25" />

      {/* chevron tunnel — rings scale outward continuously */}
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center rtl:-scale-x-100">
        {Array.from({ length: RINGS }).map((_, i) => (
          <motion.svg
            key={i}
            viewBox="0 0 200 200"
            className="absolute h-[130vmin] w-[130vmin]"
            initial={{ scale: 0.12, opacity: 0 }}
            animate={{ scale: [0.12, 1.7], opacity: [0, 0.55, 0] }}
            transition={{ repeat: Infinity, duration: DUR, delay: i * (DUR / RINGS), ease: "linear" }}
          >
            <path
              d="M72 28 L142 100 L72 172"
              fill="none"
              stroke={`url(#tun-${i})`}
              strokeWidth="5"
              strokeLinecap="square"
            />
            <defs>
              <linearGradient id={`tun-${i}`} x1="0" y1="0" x2="1" y2="1">
                <stop offset="0" stopColor="#4F7CFE" />
                <stop offset="1" stopColor="#4ADEDE" />
              </linearGradient>
            </defs>
          </motion.svg>
        ))}
      </div>

      <FitToScreen reserve={120}>
        <HeroContent
          tone="dark"
          lines={[t.heroLine1, t.heroLine2]}
          accent={t.heroAccent}
          headingSize="text-[clamp(2rem,7.5vw,5.5rem)]"
        />
      </FitToScreen>
    </section>
  );
}
