"use client";

import { motion } from "framer-motion";

/** Idea 3 — two giant rows scrolling opposite directions, tilted in 3D. */
export function MarqueeDual({ items }: { items: string[] }) {
  const text = [...items, ...items, ...items].join("   •   ");
  return (
    <div className="relative overflow-hidden bg-brand-deep py-12 [perspective:700px]">
      <div className="space-y-1 [transform:rotateX(22deg)]">
        <Row text={text} reverse={false} />
        <Row text={text} reverse />
      </div>
    </div>
  );
}

function Row({ text, reverse }: { text: string; reverse?: boolean }) {
  return (
    <div className="flex overflow-hidden">
      <motion.div
        className="flex shrink-0 whitespace-nowrap text-[8vw] font-extrabold uppercase leading-none tracking-tight text-white/15"
        animate={{ x: reverse ? ["-50%", "0%"] : ["0%", "-50%"] }}
        transition={{ repeat: Infinity, duration: 24, ease: "linear" }}
      >
        <span className="pr-12">{text}</span>
        <span className="pr-12" aria-hidden>
          {text}
        </span>
      </motion.div>
    </div>
  );
}
