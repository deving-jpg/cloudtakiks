"use client";

import { useRef } from "react";
import {
  motion,
  useScroll,
  useVelocity,
  useSpring,
  useTransform,
  useMotionValue,
  useAnimationFrame,
} from "framer-motion";
import { Chevron } from "./Logo";

const wrap = (min: number, max: number, v: number) => {
  const range = max - min;
  return (((v - min) % range) + range) % range + min;
};

/** Idea 1 — infinite ticker whose speed + skew react to scroll velocity. */
export function MarqueeVelocity({ items, baseVelocity = 3 }: { items: string[]; baseVelocity?: number }) {
  const baseX = useMotionValue(0);
  const { scrollY } = useScroll();
  const scrollVelocity = useVelocity(scrollY);
  const smooth = useSpring(scrollVelocity, { damping: 50, stiffness: 400 });
  const factor = useTransform(smooth, [0, 1000], [0, 5], { clamp: false });
  const skew = useTransform(smooth, [-1500, 1500], [8, -8], { clamp: true });
  const x = useTransform(baseX, (v) => `${wrap(0, -25, v)}%`);
  const dir = useRef(1);

  useAnimationFrame((_, delta) => {
    let moveBy = dir.current * baseVelocity * (delta / 1000);
    const f = factor.get();
    if (f < 0) dir.current = -1;
    else if (f > 0) dir.current = 1;
    moveBy += dir.current * moveBy * Math.abs(f);
    baseX.set(baseX.get() + moveBy);
  });

  const row = [...items, ...items, ...items, ...items];

  return (
    <div className="relative overflow-hidden border-y border-white/10 bg-brand-blue py-6">
      <motion.div style={{ x, skewX: skew }} className="edge-fade flex whitespace-nowrap will-change-transform">
        {row.map((it, i) => (
          <span key={i} className="mx-7 flex items-center gap-7 text-lg font-extrabold uppercase tracking-wide2 text-white">
            {it}
            <Chevron className="h-4 w-3 text-white/60" />
          </span>
        ))}
      </motion.div>
    </div>
  );
}
