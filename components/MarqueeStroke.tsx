"use client";

import { motion } from "framer-motion";

/** Idea 5 — giant outlined (stroke) words scrolling; transparent fill. */
export function MarqueeStroke({ items }: { items: string[] }) {
  const text = [...items, ...items, ...items].join("   /   ");
  return (
    <div className="edge-fade overflow-hidden bg-bg py-10">
      <motion.div
        className="flex w-max whitespace-nowrap"
        animate={{ x: ["0%", "-50%"] }}
        transition={{ repeat: Infinity, duration: 28, ease: "linear" }}
      >
        <Stroke text={text} />
        <Stroke text={text} />
      </motion.div>
    </div>
  );
}

function Stroke({ text }: { text: string }) {
  return (
    <span
      className="pr-12 text-[6.5vw] font-extrabold uppercase leading-none tracking-tight text-transparent"
      style={{ WebkitTextStroke: "1.5px rgb(var(--c-text) / 0.45)" }}
    >
      {text}
    </span>
  );
}
