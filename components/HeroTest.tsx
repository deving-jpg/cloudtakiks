"use client";

import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { Chevron } from "./Logo";
import { Counter } from "./Counter";
import FitToScreen from "./FitToScreen";
import { SITE } from "@/lib/data";

const ease = [0.22, 1, 0.36, 1] as const;

export default function HeroTest() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [0, 120]);
  const fade = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <section
      ref={ref}
      className="relative flex min-h-[100svh] items-center justify-center overflow-hidden bg-bg bg-grid py-28 md:py-32"
    >
      {/* ===== morphing aurora field ===== */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute left-[8%] top-[12%] h-[44vw] w-[44vw] rounded-full bg-brand-blue/40 blur-[130px]"
          animate={{ x: [0, 120, -40, 0], y: [0, 60, 120, 0], scale: [1, 1.18, 0.95, 1] }}
          transition={{ repeat: Infinity, duration: 16, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute right-[6%] top-[24%] h-[38vw] w-[38vw] rounded-full bg-brand-cyan/25 blur-[140px]"
          animate={{ x: [0, -90, 30, 0], y: [0, 90, -30, 0], scale: [1, 0.9, 1.2, 1] }}
          transition={{ repeat: Infinity, duration: 19, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute bottom-[6%] left-[34%] h-[40vw] w-[40vw] rounded-full bg-brand-deep/50 blur-[150px]"
          animate={{ x: [0, 70, -70, 0], y: [0, -50, 40, 0], scale: [1, 1.1, 0.92, 1] }}
          transition={{ repeat: Infinity, duration: 22, ease: "easeInOut" }}
        />
      </div>

      {/* ===== oversized drifting chevrons (hidden on small screens) ===== */}
      <div className="pointer-events-none absolute inset-0 hidden items-center justify-between opacity-[0.07] sm:flex">
        <motion.div animate={{ x: [-40, 20, -40] }} transition={{ repeat: Infinity, duration: 12, ease: "easeInOut" }}>
          <GiantChevron className="h-[55vh] w-auto -scale-x-100 text-content lg:h-[70vh]" />
        </motion.div>
        <motion.div animate={{ x: [40, -20, 40] }} transition={{ repeat: Infinity, duration: 14, ease: "easeInOut" }}>
          <GiantChevron className="h-[55vh] w-auto text-content lg:h-[70vh]" />
        </motion.div>
      </div>

      {/* ===== centered content ===== */}
      <FitToScreen reserve={120}>
      <motion.div style={{ y, opacity: fade }} className="container-x relative z-10 flex flex-col items-center text-center">
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex max-w-[92vw] items-center gap-2 rounded-full border border-content/15 bg-content/5 px-3.5 py-2 backdrop-blur-sm sm:px-4"
        >
          <span className="relative flex h-2 w-2 shrink-0">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-brand-cyan opacity-70" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-brand-cyan" />
          </span>
          <span className="text-[10px] font-extrabold uppercase tracking-wide2 text-content/70 sm:text-[11px] sm:tracking-wide3">
            Cloud-based ERP Excellence · since {SITE.since}
          </span>
        </motion.div>

        <h1 className="display mt-7 text-[clamp(2.5rem,11vw,9rem)] text-content sm:mt-8">
          <MaskLine delay={0.15}>Move your</MaskLine>
          <MaskLine delay={0.28}>business</MaskLine>
          <MaskLine delay={0.41}>
            <span className="inline-flex items-center justify-center gap-4 gradient-text">
              forward
              <motion.span
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 1, duration: 0.6, ease }}
                className="inline-flex"
              >
                <Chevron className="h-[0.62em] w-[0.42em] text-brand-cyan" />
                <Chevron className="h-[0.62em] w-[0.42em] text-brand-blue" />
                <Chevron className="h-[0.62em] w-[0.42em] text-brand-blue/40" />
              </motion.span>
            </span>
          </MaskLine>
        </h1>

        <motion.p
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.7 }}
          className="mt-9 max-w-2xl text-lg leading-relaxed text-content/65 md:text-xl"
        >
          Secure, scalable SAP Business One on the cloud — engineered for performance,
          designed for growth, supported around the clock.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.95, duration: 0.7 }}
          className="mt-9 flex flex-wrap items-center justify-center gap-3 sm:mt-11 sm:gap-4"
        >
          <Link href="/contact" className="btn-primary">
            Start your migration <Chevron className="h-3.5 w-2.5" />
          </Link>
          <Link href="/offerings" className="btn-outline">
            Explore offerings
          </Link>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.15, duration: 0.7 }}
          className="mt-12 flex flex-wrap items-center justify-center gap-x-10 gap-y-6 sm:mt-16 sm:gap-x-14"
        >
          {[
            { v: 750, s: "+", l: "Clients" },
            { v: 40, s: "+", l: "Countries" },
            { v: 7500, s: "+", l: "Users" },
          ].map((s) => (
            <div key={s.l}>
              <div className="display text-4xl md:text-5xl">
                <span className="gradient-text">
                  <Counter value={s.v} suffix={s.s} startWhenReady />
                </span>
              </div>
              <div className="mt-1 text-xs uppercase tracking-wide2 text-content/45">{s.l}</div>
            </div>
          ))}
        </motion.div>
      </motion.div>
      </FitToScreen>

      {/* scroll cue */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-center"
      >
        <span className="text-[10px] uppercase tracking-wide3 text-content/40">Scroll</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 1.8, ease: "easeInOut" }}
          className="mx-auto mt-2 h-9 w-px bg-gradient-to-b from-brand-cyan to-transparent"
        />
      </motion.div>
    </section>
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

function GiantChevron({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 100 200" fill="none" className={className} aria-hidden>
      <path d="M20 12 L78 100 L20 188" stroke="currentColor" strokeWidth="14" strokeLinecap="square" />
    </svg>
  );
}
