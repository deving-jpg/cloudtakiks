/* eslint-disable @next/next/no-img-element */
"use client";

import { motion } from "framer-motion";
import { LOGOS } from "@/lib/data";

/** Idea 7 — electric gradient band with logos + a sweeping light sheen. */
export function MarqueeSheen() {
  const row = [...LOGOS, ...LOGOS];
  return (
    <div className="relative overflow-hidden border-y border-white/10 bg-gradient-to-r from-brand-blue via-brand-deep to-brand-blue py-6">
      <motion.div
        aria-hidden
        className="pointer-events-none absolute inset-y-0 left-0 z-10 w-1/3 -skew-x-12 bg-white/15 blur-2xl"
        animate={{ x: ["-50%", "400%"] }}
        transition={{ repeat: Infinity, duration: 5, ease: "easeInOut" }}
      />
      <div className="edge-fade relative flex w-max animate-marquee gap-5">
        {row.map((p, i) => (
          <div key={i} className="flex items-center gap-3 rounded-full bg-white px-4 py-2 shadow-card">
            <img src={p.src} alt={p.name} className="h-5 w-auto object-contain" />
            <span className="whitespace-nowrap text-sm font-extrabold uppercase tracking-brand text-navy-deep">
              {p.name}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
