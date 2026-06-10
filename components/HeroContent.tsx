"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import clsx from "clsx";
import { Chevron } from "./Logo";
import { Counter } from "./Counter";
import { useLang } from "./LanguageProvider";

const ease = [0.22, 1, 0.36, 1] as const;

/** Shared, responsive centered hero content used by the test heroes. */
export function HeroContent({
  tone = "dark",
  lines = ["Cloud ERP,", "built to"],
  accent = "move forward",
  sub,
  headingSize = "text-[clamp(2.5rem,10vw,8rem)]",
}: {
  tone?: "dark" | "light";
  lines?: string[];
  accent?: string;
  sub?: string;
  headingSize?: string;
}) {
  const light = tone === "light";
  const { t } = useLang();

  return (
    <div className="container-x relative z-10 flex flex-col items-center text-center">
      <motion.div
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className={clsx(
          "inline-flex max-w-[92vw] items-center gap-2 rounded-full border px-3.5 py-2 backdrop-blur-sm sm:px-4",
          light ? "border-white/25 bg-white/10" : "border-content/15 bg-content/5"
        )}
      >
        <span className="relative flex h-2 w-2 shrink-0">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-brand-cyan opacity-70" />
          <span className="relative inline-flex h-2 w-2 rounded-full bg-brand-cyan" />
        </span>
        <span
          className={clsx(
            "text-[10px] font-extrabold uppercase tracking-wide2 sm:text-[11px] sm:tracking-wide3",
            light ? "text-white/85" : "text-content/70"
          )}
        >
          {t.heroEyebrow}
        </span>
      </motion.div>

      <h1 className={clsx("display mt-7 sm:mt-8", headingSize, light ? "text-white" : "text-content")}>
        {lines.map((l, i) => (
          <MaskLine key={i} delay={0.15 + i * 0.12}>
            {l}
          </MaskLine>
        ))}
        <MaskLine delay={0.15 + lines.length * 0.12}>
          <span className={clsx("inline-flex items-center justify-center gap-3 sm:gap-4", light ? "text-white" : "gradient-text")}>
            {accent}
            <motion.span
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.9, duration: 0.6, ease }}
              className="inline-flex"
            >
              <Chevron className="h-[0.6em] w-[0.4em] text-brand-cyan" />
              <Chevron className="h-[0.6em] w-[0.4em] text-brand-sky" />
              <Chevron className={clsx("h-[0.6em] w-[0.4em]", light ? "text-white/50" : "text-brand-blue/40")} />
            </motion.span>
          </span>
        </MaskLine>
      </h1>

      <motion.p
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8, duration: 0.7 }}
        className={clsx("mt-8 max-w-2xl text-base leading-relaxed sm:mt-9 sm:text-lg md:text-xl", light ? "text-white/80" : "text-content/65")}
      >
        {sub || t.heroSub}
      </motion.p>

      <motion.div
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.95, duration: 0.7 }}
        className="mt-9 flex flex-wrap items-center justify-center gap-3 sm:mt-11 sm:gap-4"
      >
        <Link href="/contact" className={light ? "btn-white" : "btn-primary"}>
          {t.startMigration} <Chevron className="h-3.5 w-2.5" />
        </Link>
        <Link
          href="/offerings"
          className={clsx(
            "inline-flex items-center gap-2 rounded-full border-2 px-8 py-4 text-sm font-extrabold uppercase tracking-wide2 transition-colors duration-300",
            light
              ? "border-white/40 text-white hover:border-white hover:bg-white hover:text-navy-deep"
              : "border-content/20 text-content hover:border-brand-blue hover:text-brand-blue"
          )}
        >
          {t.exploreOfferings}
        </Link>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.15, duration: 0.7 }}
        className="mt-12 flex flex-wrap items-center justify-center gap-x-10 gap-y-6 sm:mt-16 sm:gap-x-14"
      >
        {[
          { v: 750, s: "+", l: t.clients },
          { v: 40, s: "+", l: t.partners },
          { v: 3750, s: "+", l: t.users },
        ].map((s) => (
          <div key={s.l}>
            <div className={clsx("display text-4xl md:text-5xl", light && "text-white")}>
              <span className={light ? "" : "gradient-text"}>
                <Counter value={s.v} suffix={s.s} startWhenReady />
              </span>
            </div>
            <div className={clsx("mt-1 text-xs uppercase tracking-wide2", light ? "text-white/60" : "text-content/45")}>{s.l}</div>
          </div>
        ))}
      </motion.div>
    </div>
  );
}

function MaskLine({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  return (
    <span className="block overflow-hidden">
      <motion.span className="block" initial={{ y: "115%" }} animate={{ y: 0 }} transition={{ duration: 0.9, delay, ease }}>
        {children}
      </motion.span>
    </span>
  );
}
