"use client";

import { motion } from "framer-motion";
import { RevealText } from "./Reveal";

export default function PageHeader({
  eyebrow,
  title,
  intro,
}: {
  eyebrow: string;
  title: string;
  intro: string;
}) {
  return (
    <section className="relative overflow-hidden border-b border-content/10 bg-bg bg-grid pt-36 pb-20">
      <div className="pointer-events-none absolute -left-32 top-0 h-[460px] w-[460px] rounded-full bg-brand-blue/25 blur-[150px]" />

      {/* big graphic chevrons bleeding off the right */}
      <motion.div
        initial={{ opacity: 0, x: 80 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
        className="pointer-events-none absolute top-1/2 hidden -translate-y-1/2 md:block ltr:right-[-3%] rtl:left-[-3%]"
      >
        <svg width="460" height="460" viewBox="0 0 460 460" fill="none" aria-hidden className="rtl:-scale-x-100">
          {[0, 1, 2].map((i) => (
            <g key={i} transform={`translate(${i * -60} 0)`}>
              <motion.path
                d="M160 70 L350 230 L160 390"
                stroke={i === 1 ? "#4ADEDE" : "#4F7CFE"}
                strokeOpacity={i === 1 ? 0.5 : 0.28 - i * 0.08}
                strokeWidth="46"
                strokeLinecap="square"
                animate={{ x: [0, 26, 0], opacity: [0.65, 1, 0.65] }}
                transition={{ repeat: Infinity, duration: 2.6, delay: i * 0.35, ease: "easeInOut" }}
              />
            </g>
          ))}
        </svg>
      </motion.div>

      <div className="container-x relative">
        <motion.span
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="eyebrow"
        >
          <span className="h-px w-8 bg-brand-cyan" />
          {eyebrow}
        </motion.span>
        <h1 className="display mt-6 text-[clamp(2.8rem,8vw,6rem)] text-content">
          <RevealText text={title} />
        </h1>
        <motion.p
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.25 }}
          className="mt-6 max-w-2xl text-lg leading-relaxed text-content/65 md:text-xl"
        >
          {intro}
        </motion.p>
      </div>
    </section>
  );
}
