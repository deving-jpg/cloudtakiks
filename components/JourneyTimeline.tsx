"use client";

import { useRef } from "react";
import { motion, useScroll, useSpring, useTransform } from "framer-motion";

type Item = { year: string; text: string };

export function JourneyTimeline({ items }: { items: Item[] }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 80%", "end 55%"] });
  const fill = useSpring(scrollYProgress, { stiffness: 80, damping: 26, mass: 0.4 });
  const cometTop = useTransform(fill, (v) => `${v * 100}%`);
  const cometOpacity = useTransform(fill, [0, 0.02, 0.98, 1], [0, 1, 1, 0]);

  return (
    <div ref={ref} className="relative mt-16">
      {/* line track */}
      <div className="absolute left-5 top-0 h-full w-[2px] -translate-x-1/2 bg-content/10 md:left-1/2" />
      {/* animated fill */}
      <motion.div
        style={{ scaleY: fill }}
        className="absolute left-5 top-0 h-full w-[2px] origin-top -translate-x-1/2 bg-gradient-to-b from-brand-blue via-brand-cyan to-brand-blue md:left-1/2"
      />
      {/* travelling comet */}
      <motion.div
        style={{ top: cometTop, opacity: cometOpacity }}
        className="absolute left-5 -translate-x-1/2 md:left-1/2"
        aria-hidden
      >
        <span className="block h-3.5 w-3.5 rounded-full bg-brand-cyan shadow-[0_0_22px_5px_rgba(74,222,222,0.7)]" />
      </motion.div>

      <div className="space-y-10 md:space-y-14">
        {items.map((it, i) => (
          <Milestone key={it.year} item={it} even={i % 2 === 0} />
        ))}
      </div>
    </div>
  );
}

function Milestone({ item, even }: { item: Item; even: boolean }) {
  return (
    <div className="relative md:grid md:grid-cols-2 md:gap-x-16">
      {/* node on the line */}
      <span className="absolute left-5 top-3 z-10 -translate-x-1/2 md:left-1/2">
        <motion.span
          initial={{ scale: 0, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          viewport={{ once: true, margin: "-20%" }}
          transition={{ type: "spring", stiffness: 320, damping: 16 }}
          className="block h-4 w-4 rounded-full border-2 border-brand-cyan bg-bg shadow-[0_0_14px_2px_rgba(74,222,222,0.45)]"
        />
      </span>

      {/* card */}
      <motion.div
        initial={{ opacity: 0, x: even ? -48 : 48, y: 16 }}
        whileInView={{ opacity: 1, x: 0, y: 0 }}
        viewport={{ once: true, margin: "-15%" }}
        transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
        className={
          "ml-12 md:ml-0 " + (even ? "md:pr-2 md:text-right" : "md:col-start-2 md:pl-2")
        }
      >
        <div className="group relative overflow-hidden rounded-2xl border border-content/10 bg-surface p-6 shadow-card transition-colors hover:border-brand-blue/50">
          <span className="pointer-events-none absolute -right-12 -top-12 h-32 w-32 rounded-full bg-brand-blue/15 opacity-0 blur-2xl transition-opacity duration-500 group-hover:opacity-100" />
          <span className="relative display text-3xl gradient-text md:text-4xl">{item.year}</span>
          <p className="relative mt-2 leading-relaxed text-content/70">{item.text}</p>
        </div>
      </motion.div>
    </div>
  );
}
