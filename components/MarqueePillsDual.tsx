/* eslint-disable @next/next/no-img-element */
"use client";

import { LOGOS } from "@/lib/data";

/** Idea 6 — two rows of logo pills scrolling in opposite directions. */
export function MarqueePillsDual() {
  return (
    <div className="edge-fade space-y-4 overflow-hidden py-8">
      <PillRow reverse={false} />
      <PillRow reverse />
    </div>
  );
}

function PillRow({ reverse }: { reverse: boolean }) {
  const row = [...LOGOS, ...LOGOS];
  return (
    <div
      className="flex w-max animate-marquee gap-4"
      style={{ animationDirection: reverse ? "reverse" : "normal", animationDuration: "30s" }}
    >
      {row.map((p, i) => (
        <div
          key={i}
          className="flex items-center gap-3 rounded-full border border-content/10 bg-surface px-5 py-2.5 shadow-card"
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
  );
}
