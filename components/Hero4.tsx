"use client";

import { motion } from "framer-motion";
import { HeroContent } from "./HeroContent";
import FitToScreen from "./FitToScreen";

export default function Hero4() {
  return (
    <section className="relative flex min-h-[100svh] items-center justify-center overflow-hidden bg-gradient-to-br from-brand-blue via-brand-deep to-navy-deep py-28 md:py-32">
      {/* breathing sheen */}
      <motion.div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{ background: "radial-gradient(45% 45% at 50% 45%, rgba(255,255,255,0.18), transparent 70%)" }}
        animate={{ opacity: [0.4, 0.85, 0.4], scale: [1, 1.1, 1] }}
        transition={{ repeat: Infinity, duration: 7, ease: "easeInOut" }}
      />
      {/* drifting color blobs */}
      <motion.div
        className="pointer-events-none absolute -left-20 top-10 h-[40vw] w-[40vw] rounded-full bg-brand-cyan/30 blur-[140px]"
        animate={{ x: [0, 120, 0], y: [0, 60, 0] }}
        transition={{ repeat: Infinity, duration: 18, ease: "easeInOut" }}
      />

      {/* giant counter-scrolling kinetic type */}
      <div className="pointer-events-none absolute inset-0 flex flex-col justify-center gap-2 opacity-[0.09]">
        <KineticRow text="CLOUD TAKTIKS · " dir={1} />
        <KineticRow text="SECURE · SCALABLE · ON THE CLOUD · " dir={-1} />
        <KineticRow text="CLOUD TAKTIKS · " dir={1} />
      </div>

      <FitToScreen reserve={120}>
        <HeroContent tone="light" />
      </FitToScreen>
    </section>
  );
}

function KineticRow({ text, dir }: { text: string; dir: 1 | -1 }) {
  const block = text.repeat(6);
  return (
    <div className="flex overflow-hidden">
      <motion.div
        className="flex shrink-0 whitespace-nowrap text-[13vw] font-extrabold uppercase leading-[0.9] tracking-tighter text-white"
        animate={{ x: dir > 0 ? ["0%", "-50%"] : ["-50%", "0%"] }}
        transition={{ repeat: Infinity, duration: 28, ease: "linear" }}
      >
        <span>{block}</span>
        <span aria-hidden>{block}</span>
      </motion.div>
    </div>
  );
}
