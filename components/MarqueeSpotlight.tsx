/* eslint-disable @next/next/no-img-element */
"use client";

import { useEffect, useRef } from "react";
import { LOGOS } from "@/lib/data";

/** Idea 4 — logo cards that scale up + brighten as they pass the center. */
export function MarqueeSpotlight() {
  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let raf = 0;
    let offset = 0;
    const tick = () => {
      const track = trackRef.current;
      const cont = containerRef.current;
      if (track && cont) {
        offset -= 0.7;
        const half = track.scrollWidth / 2;
        if (-offset >= half) offset += half;
        track.style.transform = `translateX(${offset}px)`;

        const cx = cont.getBoundingClientRect().left + cont.clientWidth / 2;
        Array.from(track.children).forEach((ch) => {
          const el = ch as HTMLElement;
          const r = el.getBoundingClientRect();
          const itemC = r.left + r.width / 2;
          const d = Math.min(1, Math.abs(itemC - cx) / (cont.clientWidth / 2));
          el.style.transform = `scale(${(1.25 - d * 0.5).toFixed(3)})`;
          el.style.opacity = `${Math.max(0.3, 1 - d * 0.85).toFixed(3)}`;
        });
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  const row = [...LOGOS, ...LOGOS, ...LOGOS, ...LOGOS];
  return (
    <div ref={containerRef} className="edge-fade relative overflow-hidden border-y border-content/10 bg-bg py-12">
      <div ref={trackRef} className="flex w-max items-center gap-12 will-change-transform">
        {row.map((p, i) => (
          <div key={i} className="flex origin-center items-center gap-3 whitespace-nowrap">
            <span className="flex h-12 items-center justify-center rounded-xl border border-content/10 bg-white px-3">
              <img src={p.src} alt={p.name} className="h-6 w-auto object-contain" />
            </span>
            <span className="text-lg font-extrabold uppercase tracking-tight text-content">{p.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
