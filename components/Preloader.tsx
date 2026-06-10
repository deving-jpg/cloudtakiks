"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion, type TargetAndTransition } from "framer-motion";
import Image from "next/image";
import logo from "@/public/logo.png";
import { Chevron } from "./Logo";
import { markReady } from "./useAppReady";
import { useLang } from "./LanguageProvider";

const SWEEP = 3.0; // light sweep duration (s)
const REVEAL_AT = 3000; // ms — begin opening as the light leaves
const FALLBACK_DONE = 4200; // ms — safety unmount

type Variant = "default" | "aurora" | "explosion" | "tunnel" | "kinetic";

// each variant = the curtain panels + how they leave to reveal the site
const PANELS: Record<Variant, { cls: string; exit: TargetAndTransition }[]> = {
  default: [{ cls: "inset-0", exit: { opacity: 0, scale: 1.06, filter: "blur(6px)" } }],
  aurora: [{ cls: "inset-0", exit: { opacity: 0, scale: 1.1, filter: "blur(10px)" } }],
  tunnel: [{ cls: "inset-0", exit: { opacity: 0, scale: 2.7, filter: "blur(12px)" } }],
  explosion: [
    { cls: "left-0 top-0 h-1/2 w-1/2", exit: { x: "-105%", y: "-105%", opacity: 0, rotate: -6 } },
    { cls: "right-0 top-0 h-1/2 w-1/2", exit: { x: "105%", y: "-105%", opacity: 0, rotate: 6 } },
    { cls: "bottom-0 left-0 h-1/2 w-1/2", exit: { x: "-105%", y: "105%", opacity: 0, rotate: 6 } },
    { cls: "bottom-0 right-0 h-1/2 w-1/2", exit: { x: "105%", y: "105%", opacity: 0, rotate: -6 } },
  ],
  kinetic: [
    { cls: "left-0 top-0 h-full w-1/2", exit: { x: "-100%" } },
    { cls: "right-0 top-0 h-full w-1/2", exit: { x: "100%" } },
  ],
};

const TRANSITIONS: Record<Variant, object> = {
  default: { duration: 1, ease: [0.65, 0, 0.35, 1] },
  aurora: { duration: 1.1, ease: [0.65, 0, 0.35, 1] },
  tunnel: { duration: 1.05, ease: [0.7, 0, 0.84, 0] }, // accelerate inward
  explosion: { duration: 0.95, ease: [0.6, 0, 0.2, 1] },
  kinetic: { duration: 0.9, ease: [0.76, 0, 0.24, 1] },
};

function variantFor(path: string | null): Variant {
  if (path === "/") return "tunnel";
  if (path === "/test") return "aurora";
  if (path === "/test2") return "explosion";
  if (path === "/test3") return "tunnel";
  if (path === "/test4") return "kinetic";
  return "default";
}

export default function Preloader() {
  const pathname = usePathname();
  const { t, lang } = useLang();
  const [variant] = useState<Variant>(() => variantFor(pathname));
  const [revealing, setRevealing] = useState(false);
  const [done, setDone] = useState(false);

  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const t1 = setTimeout(() => setRevealing(true), REVEAL_AT);
    const t2 = setTimeout(() => setDone(true), FALLBACK_DONE);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      document.body.style.overflow = prev;
    };
  }, []);

  useEffect(() => {
    if (done) {
      document.body.style.overflow = "";
      markReady(); // signal the page so counters start now
    }
  }, [done]);

  const panels = PANELS[variant];
  const transition = TRANSITIONS[variant];

  return (
    <AnimatePresence>
      {!done && (
        <motion.div className="fixed inset-0 z-[100] overflow-hidden" exit={{ opacity: 0 }} transition={{ duration: 0.2 }}>
          {/* ===== curtain panels (variant-specific reveal) ===== */}
          {panels.map((p, i) => (
            <motion.div
              key={i}
              className={"absolute bg-gradient-to-b from-[#0A1352] to-[#06092E] " + p.cls}
              initial={false}
              animate={revealing ? p.exit : {}}
              transition={transition}
              onAnimationComplete={() => {
                if (revealing) setDone(true);
              }}
            />
          ))}

          {/* ===== loading content (fades out first) ===== */}
          <motion.div
            className="absolute inset-0"
            animate={{ opacity: revealing ? 0 : 1 }}
            transition={{ duration: 0.3 }}
          >
            {/* ambient glows */}
            <div className="pointer-events-none absolute -left-32 top-1/4 h-[460px] w-[460px] rounded-full bg-brand-blue/25 blur-[150px]" />
            <div className="pointer-events-none absolute -right-24 bottom-1/4 h-[420px] w-[420px] rounded-full bg-brand-cyan/15 blur-[150px]" />

            {/* smooth light sweep */}
            <motion.div
              aria-hidden
              className="pointer-events-none absolute left-0 top-[-20%] h-[140%] w-[42vw] -skew-x-12 bg-gradient-to-r from-transparent via-white/20 to-transparent blur-2xl"
              initial={{ x: "-70vw" }}
              animate={{ x: "165vw" }}
              transition={{ duration: SWEEP, ease: [0.4, 0, 0.2, 1] }}
            />

            {/* center: logo + chevrons + label */}
            <div className="absolute inset-0 flex flex-col items-center justify-center px-6">
              <motion.div
                initial={{ opacity: 0, scale: 0.94, y: 14 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
                className="[filter:drop-shadow(0_0_34px_rgba(79,124,254,0.35))]"
              >
                <Image src={logo} alt="Cloud Taktiks" priority className="h-16 w-auto brightness-0 invert md:h-20" />
              </motion.div>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.55, duration: 0.7 }}
                className="mt-7 flex items-center gap-1.5"
              >
                {[0, 1, 2, 3, 4].map((i) => (
                  <motion.span
                    key={i}
                    animate={{ opacity: [0.12, 1 - i * 0.12, 0.12] }}
                    transition={{ repeat: Infinity, duration: 1.8, delay: i * 0.16, ease: "easeInOut" }}
                  >
                    <Chevron className="h-4 w-2.5 text-brand-cyan" />
                  </motion.span>
                ))}
              </motion.div>

              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.75, duration: 0.7 }}
                className={
                  "mt-7 text-[11px] font-extrabold text-white/40 " +
                  (lang === "ar" ? "tracking-normal" : "uppercase tracking-[0.45em]")
                }
              >
                {t.loadingExperience}
              </motion.p>
            </div>

            {/* progress line */}
            <motion.div
              className="absolute inset-x-0 bottom-0 h-[3px] origin-left bg-gradient-to-r from-brand-blue via-brand-sky to-brand-cyan"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: SWEEP, ease: [0.4, 0, 0.2, 1] }}
            />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
