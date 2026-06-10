"use client";

import { motion } from "framer-motion";

/** Animated row of the brand chevrons — the signature graphic pattern. */
export function ChevronField({
  count = 6,
  className,
}: {
  count?: number;
  className?: string;
}) {
  return (
    <div className={className} aria-hidden>
      <div className="flex items-center gap-1 rtl:-scale-x-100">
        {Array.from({ length: count }).map((_, i) => (
          <motion.svg
            key={i}
            viewBox="0 0 40 80"
            className="h-16 w-8 shrink-0"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.07, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          >
            <path
              d="M6 6 L30 40 L6 74"
              fill="none"
              stroke="url(#cf)"
              strokeWidth="7"
              strokeLinecap="square"
              opacity={1 - i * 0.12}
            />
            <defs>
              <linearGradient id="cf" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0" stopColor="#4F7CFE" />
                <stop offset="1" stopColor="#172D9D" />
              </linearGradient>
            </defs>
          </motion.svg>
        ))}
      </div>
    </div>
  );
}

/** Big decorative nested chevron used as a section accent (right-aligned). */
export function ChevronMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 400 400" className={className} fill="none" aria-hidden>
      {[0, 1, 2].map((i) => (
        <path
          key={i}
          d={`M${120 + i * 60} 60 L${300 - i * 0} 200 L${120 + i * 60} 340`}
          stroke={i === 1 ? "#fff" : "#4F7CFE"}
          strokeOpacity={i === 0 ? 0.9 : i === 1 ? 1 : 0.6}
          strokeWidth="34"
          strokeLinecap="square"
          transform={`translate(${i * -34} 0)`}
        />
      ))}
    </svg>
  );
}
