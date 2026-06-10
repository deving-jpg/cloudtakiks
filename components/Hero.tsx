"use client";

import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { Chevron } from "./Logo";
import { Counter } from "./Counter";
import FitToScreen from "./FitToScreen";
import { SITE } from "@/lib/data";

const ease = [0.22, 1, 0.36, 1] as const;

export default function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const yPanel = useTransform(scrollYProgress, [0, 1], [0, 140]);
  const yText = useTransform(scrollYProgress, [0, 1], [0, 60]);

  return (
    <section ref={ref} className="relative flex min-h-[100svh] items-center overflow-hidden bg-bg bg-grid py-20">
      {/* electric glow blobs */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -left-40 top-0 h-[560px] w-[560px] rounded-full bg-brand-blue/30 blur-[150px]" />
        <div className="absolute right-0 top-1/3 h-[480px] w-[480px] rounded-full bg-brand-cyan/15 blur-[160px]" />
      </div>

      <div className="container-x relative grid items-center gap-12 lg:grid-cols-[1.2fr_0.8fr]">
        {/* Left — bold uppercase headline */}
        <motion.div style={{ y: yText }}>
          <FitToScreen reserve={130} origin="top left">
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="eyebrow"
          >
            <span className="h-px w-8 bg-brand-cyan" />
            Cloud-based ERP Excellence · since {SITE.since}
          </motion.div>

          <h1 className="display mt-6 text-[clamp(2.6rem,7vw,5.6rem)] text-content">
            <MaskLine delay={0.15}>Cloud ERP,</MaskLine>
            <MaskLine delay={0.27}>built to</MaskLine>
            <MaskLine delay={0.39}>
              <span className="inline-flex items-center gap-3 gradient-text">
                move forward
                <motion.span
                  initial={{ x: -10, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.95, duration: 0.5 }}
                  className="inline-flex"
                >
                  <Chevron className="h-[0.7em] w-[0.5em] text-brand-cyan" />
                  <Chevron className="h-[0.7em] w-[0.5em] text-brand-blue" />
                  <Chevron className="h-[0.7em] w-[0.5em] text-brand-blue/40" />
                </motion.span>
              </span>
            </MaskLine>
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.7 }}
            className="mt-6 max-w-xl text-lg leading-relaxed text-content/65"
          >
            We help businesses overcome the complexity of cloud adoption — secure, scalable
            SAP Business One solutions built for performance, designed for growth.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.85, duration: 0.7 }}
            className="mt-8 flex flex-wrap items-center gap-4"
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
            transition={{ delay: 1.05, duration: 0.7 }}
            className="mt-10 flex flex-wrap gap-x-12 gap-y-5"
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
          </FitToScreen>
        </motion.div>

        {/* Right — electric panel with marching chevrons */}
        <motion.div style={{ y: yPanel }} className="relative">
          <motion.div
            initial={{ opacity: 0, scale: 0.94, x: 30 }}
            animate={{ opacity: 1, scale: 1, x: 0 }}
            transition={{ duration: 1, ease }}
            className="relative aspect-[4/5] overflow-hidden rounded-[2rem] bg-electric shadow-glow lg:aspect-auto lg:h-[clamp(20rem,70vh,38rem)]"
          >
            <ChevronStream />
            <motion.div
              animate={{ y: [0, -12, 0] }}
              transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }}
              className="absolute bottom-6 left-6 right-6 rounded-2xl border border-white/25 bg-navy-deep/40 p-5 backdrop-blur-md"
            >
              <p className="text-xs font-extrabold uppercase tracking-wide2 text-brand-cyan">
                ISO/IEC 27001:2022 aligned
              </p>
              <p className="mt-2 text-sm leading-snug text-white">
                Encrypted, monitored 24/7, deployed on Microsoft Azure &amp; Huawei Cloud.
              </p>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

function MaskLine({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  return (
    <span className="block overflow-hidden">
      <motion.span className="block" initial={{ y: "115%" }} animate={{ y: 0 }} transition={{ duration: 0.85, delay, ease }}>
        {children}
      </motion.span>
    </span>
  );
}

function ChevronStream() {
  return (
    <div className="absolute inset-0 flex items-center justify-center opacity-90">
      <div className="flex gap-2">
        {[0, 1, 2, 3].map((col) => (
          <div key={col} className="flex flex-col gap-2 overflow-hidden">
            <motion.div
              className="flex flex-col gap-2"
              animate={{ y: ["0%", "-50%"] }}
              transition={{ repeat: Infinity, duration: 9 + col * 2, ease: "linear" }}
            >
              {Array.from({ length: 10 }).map((_, i) => (
                <svg key={i} viewBox="0 0 40 80" className="h-16 w-8 shrink-0">
                  <path
                    d="M8 6 L30 40 L8 74"
                    fill="none"
                    stroke="#ffffff"
                    strokeWidth="8"
                    strokeLinecap="square"
                    strokeOpacity={col === 1 ? 1 : 0.3 + col * 0.12}
                  />
                </svg>
              ))}
            </motion.div>
          </div>
        ))}
      </div>
    </div>
  );
}
