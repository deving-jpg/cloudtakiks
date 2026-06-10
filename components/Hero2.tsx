"use client";

import { motion } from "framer-motion";
import { HeroContent } from "./HeroContent";
import FitToScreen from "./FitToScreen";

// deterministic pseudo-random (stable across SSR/CSR — no hydration mismatch)
const rnd = (n: number) => {
  const x = Math.sin(n * 99.91) * 43758.5453;
  return x - Math.floor(x);
};

const COUNT = 46;

export default function Hero2() {
  return (
    <section className="relative flex min-h-[100svh] items-center justify-center overflow-hidden bg-bg bg-grid py-28 md:py-32">
      {/* core glow */}
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-[60vw] w-[60vw] -translate-x-1/2 -translate-y-1/2 rounded-full bg-brand-blue/20 blur-[150px]" />

      {/* repeating shockwave rings */}
      {[0, 1, 2].map((i) => (
        <motion.div
          key={i}
          aria-hidden
          className="pointer-events-none absolute left-1/2 top-1/2 h-44 w-44 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-brand-cyan/30"
          initial={{ scale: 0, opacity: 0.6 }}
          animate={{ scale: [0, 7], opacity: [0.55, 0] }}
          transition={{ repeat: Infinity, duration: 4, delay: i * 1.3, ease: "easeOut" }}
        />
      ))}

      {/* exploding chevron shards */}
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
        {Array.from({ length: COUNT }).map((_, i) => {
          const ang = rnd(i) * Math.PI * 2;
          const dist = 22 + rnd(i + 7) * 46; // vmin
          const x = Math.cos(ang) * dist;
          const y = Math.sin(ang) * dist;
          const dur = 2.4 + rnd(i + 3) * 2.2;
          const delay = rnd(i + 5) * dur;
          const rot = (rnd(i + 9) - 0.5) * 220;
          const size = 9 + rnd(i + 2) * 18;
          return (
            <motion.svg
              key={i}
              viewBox="0 0 24 32"
              className="absolute"
              style={{ width: size, height: (size * 32) / 24 }}
              initial={{ x: "0vmin", y: "0vmin", opacity: 0, scale: 0, rotate: 0 }}
              animate={{
                x: `${x}vmin`,
                y: `${y}vmin`,
                opacity: [0, 0.85, 0],
                scale: [0, 1, 0.7],
                rotate: rot,
              }}
              transition={{ repeat: Infinity, duration: dur, delay, ease: "easeOut" }}
            >
              <path
                d="M5 3 L19 16 L5 29"
                fill="none"
                stroke={i % 3 === 0 ? "#4ADEDE" : i % 3 === 1 ? "#4F7CFE" : "#7DD6F6"}
                strokeWidth="4"
                strokeLinecap="square"
              />
            </motion.svg>
          );
        })}
      </div>

      <FitToScreen reserve={120}>
        <HeroContent tone="dark" />
      </FitToScreen>
    </section>
  );
}
