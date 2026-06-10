/* eslint-disable @next/next/no-img-element */
"use client";

import { LOGOS } from "@/lib/data";

/** Idea 2 — glass pill cards with real logos, edge-faded, pause on hover. */
export function MarqueePills() {
  const row = [...LOGOS, ...LOGOS, ...LOGOS, ...LOGOS];
  return (
    <div className="edge-fade relative overflow-hidden py-8">
      <div className="flex w-max animate-marquee hover:[animation-play-state:paused]">
        {row.map((p, i) => (
          <div
            key={i}
            className="mr-4 flex items-center gap-3 rounded-full border border-content/10 bg-surface px-5 py-2.5 shadow-card"
          >
            <span className="flex h-9 items-center justify-center rounded-lg border border-content/10 bg-white px-2">
              <img src={p.src} alt={p.name} className="h-5 w-auto object-contain" />
            </span>
            <span className="whitespace-nowrap text-sm font-extrabold uppercase tracking-brand text-content">
              {p.name}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
