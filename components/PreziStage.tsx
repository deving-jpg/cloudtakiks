"use client";

import Link from "next/link";
import { useRef } from "react";
import {
  motion,
  useScroll,
  useSpring,
  useTransform,
  useMotionTemplate,
  type MotionValue,
} from "framer-motion";
import { Logo, Chevron } from "./Logo";
import { Counter } from "./Counter";

type Slide = { cx: number; cy: number; z: number; rot: number; node: React.ReactNode };

// content spread across a big canvas — coords far apart for big pans,
// z range wide for big zoom, rot strong for big tilt
const SLIDES: Slide[] = [
  {
    cx: 0,
    cy: 0,
    z: 1,
    rot: 0,
    node: (
      <Panel className="items-center text-center">
        <Logo onDark className="mb-6 [&_img]:h-12" />
        <h2 className="display text-[clamp(2.2rem,6vw,4.5rem)] text-content">
          Your premium
          <br />
          <span className="gradient-text">SAP B1 cloud</span>
        </h2>
        <p className="mt-5 max-w-md text-content/60">Scroll to fly through the Cloud Taktiks story.</p>
        <Chevron className="mt-7 h-4 w-2.5 rotate-90 animate-bounce text-brand-cyan" />
      </Panel>
    ),
  },
  {
    cx: 2400,
    cy: -900,
    z: 1.45,
    rot: 15,
    node: (
      <Panel>
        <Eyebrow>Our mission</Eyebrow>
        <p className="text-[clamp(1.4rem,3vw,2.4rem)] font-extrabold leading-tight text-content">
          We help businesses overcome the complexity of cloud adoption —{" "}
          <span className="gradient-text">securely, seamlessly, at scale.</span>
        </p>
      </Panel>
    ),
  },
  {
    cx: 650,
    cy: 1900,
    z: 0.82,
    rot: -13,
    node: (
      <Panel>
        <Eyebrow>What we do</Eyebrow>
        <ul className="space-y-3">
          {["SAP Business One Hosting", "CrowdStrike Endpoint Protection", "Cyber Security", "Microsoft 365"].map(
            (t) => (
              <li key={t} className="flex items-center gap-3 text-lg font-bold text-content">
                <span className="flex h-7 w-7 items-center justify-center rounded-md bg-electric text-white">
                  <Chevron className="h-3 w-2" />
                </span>
                {t}
              </li>
            )
          )}
        </ul>
      </Panel>
    ),
  },
  {
    cx: 3300,
    cy: 1500,
    z: 1.75,
    rot: 9,
    node: (
      <Panel className="items-center text-center">
        <Eyebrow>Global recognition</Eyebrow>
        <div className="flex flex-wrap items-center justify-center gap-x-12 gap-y-6">
          {[
            { v: 750, s: "+", l: "Clients" },
            { v: 40, s: "+", l: "Partners" },
            { v: 3750, s: "+", l: "Users" },
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
        </div>
      </Panel>
    ),
  },
  {
    cx: -1500,
    cy: 2300,
    z: 1.2,
    rot: -8,
    node: (
      <Panel className="items-center text-center">
        <h2 className="display text-[clamp(2rem,5vw,3.8rem)] text-content">
          Ready to <span className="gradient-text">move forward?</span>
        </h2>
        <p className="mt-4 max-w-md text-content/60">Migration with minimal disruption is what we do.</p>
        <Link href="/contact" className="btn-primary mt-8">
          Get started <Chevron className="h-3.5 w-2.5" />
        </Link>
      </Panel>
    ),
  },
];

const DECO = [
  { x: 1100, y: 700, s: 130, o: 0.12 },
  { x: 2600, y: -200, s: 100, o: 0.1 },
  { x: 1600, y: 2100, s: 160, o: 0.1 },
  { x: -700, y: 1200, s: 110, o: 0.12 },
  { x: 3400, y: 2200, s: 90, o: 0.1 },
  { x: 200, y: 1100, s: 80, o: 0.1 },
  { x: 2900, y: 800, s: 70, o: 0.1 },
];

const N = SLIDES.length;

// expand into keyframes with a pulled-back, over-rotated midpoint between each
// slide → camera flies WAY out and spins, then dives back in (dramatic)
const STOPS: { t: number; cx: number; cy: number; z: number; rot: number }[] = [];
for (let i = 0; i < N; i++) {
  STOPS.push({ t: i / (N - 1), cx: SLIDES[i].cx, cy: SLIDES[i].cy, z: SLIDES[i].z, rot: SLIDES[i].rot });
  if (i < N - 1) {
    const a = SLIDES[i];
    const b = SLIDES[i + 1];
    STOPS.push({
      t: (i + 0.5) / (N - 1),
      cx: (a.cx + b.cx) / 2,
      cy: (a.cy + b.cy) / 2,
      z: Math.min(a.z, b.z) * 0.38, // big zoom-out
      rot: (a.rot + b.rot) / 2 + (i % 2 === 0 ? 22 : -22), // rotation overshoot
    });
  }
}
const INPUTS = STOPS.map((s) => s.t);

export default function PreziStage() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  const p = useSpring(scrollYProgress, { stiffness: 52, damping: 15, mass: 0.9 });

  const ncx = useTransform(p, INPUTS, STOPS.map((s) => -s.cx));
  const ncy = useTransform(p, INPUTS, STOPS.map((s) => -s.cy));
  const z = useTransform(p, INPUTS, STOPS.map((s) => s.z));
  const rot = useTransform(p, INPUTS, STOPS.map((s) => -s.rot));

  const transform = useMotionTemplate`translate(50vw, 50vh) scale(${z}) rotate(${rot}deg) translate(${ncx}px, ${ncy}px)`;

  const goTo = (i: number) => {
    const el = ref.current;
    if (!el) return;
    const t = i / (N - 1);
    const target = el.offsetTop + t * (el.offsetHeight - window.innerHeight);
    const lenis = (window as unknown as { __lenis?: { scrollTo: (n: number, o?: object) => void } }).__lenis;
    if (lenis?.scrollTo) lenis.scrollTo(target, { duration: 1.6 });
    else window.scrollTo({ top: target, behavior: "smooth" });
  };

  return (
    <section ref={ref} className="relative bg-bg" style={{ height: `${N * 110}vh` }}>
      <div className="sticky top-0 h-screen overflow-hidden bg-grid">
        <div className="pointer-events-none absolute left-1/2 top-1/2 h-[60vw] w-[60vw] -translate-x-1/2 -translate-y-1/2 rounded-full bg-brand-blue/15 blur-[160px]" />

        {/* flying camera stage */}
        <motion.div
          style={{ transform, transformOrigin: "0 0" }}
          className="absolute left-0 top-0 h-0 w-0 will-change-transform"
        >
          {DECO.map((d, i) => (
            <svg
              key={i}
              viewBox="0 0 24 32"
              className="absolute text-content"
              style={{ left: d.x, top: d.y, width: d.s, height: (d.s * 32) / 24, opacity: d.o, transform: "translate(-50%,-50%)" }}
              aria-hidden
            >
              <path d="M5 3 L19 16 L5 29" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="square" />
            </svg>
          ))}

          {SLIDES.map((s, i) => (
            <div
              key={i}
              className="absolute"
              style={{ left: s.cx, top: s.cy, transform: `translate(-50%,-50%) rotate(${s.rot}deg)` }}
            >
              {s.node}
            </div>
          ))}
        </motion.div>

        {/* click-to-jump dots */}
        <div className="absolute bottom-6 left-1/2 flex -translate-x-1/2 items-center gap-1">
          {SLIDES.map((_, i) => (
            <Dot key={i} index={i} progress={p} total={N} onClick={() => goTo(i)} />
          ))}
        </div>
      </div>
    </section>
  );
}

function Panel({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <div
      className={
        "flex w-[min(820px,86vw)] flex-col rounded-3xl border border-content/10 bg-surface/90 p-8 shadow-card backdrop-blur-md md:p-12 " +
        className
      }
    >
      {children}
    </div>
  );
}

function Eyebrow({ children }: { children: React.ReactNode }) {
  return (
    <span className="eyebrow mb-5">
      <span className="h-px w-6 bg-brand-cyan" />
      {children}
    </span>
  );
}

function Dot({
  index,
  progress,
  total,
  onClick,
}: {
  index: number;
  progress: MotionValue<number>;
  total: number;
  onClick: () => void;
}) {
  const target = index / (total - 1);
  const opacity = useTransform(progress, [target - 0.12, target, target + 0.12], [0.35, 1, 0.35]);
  const scale = useTransform(progress, [target - 0.12, target, target + 0.12], [1, 1.7, 1]);
  return (
    <button onClick={onClick} aria-label={`Fly to section ${index + 1}`} className="group grid place-items-center p-2">
      <motion.span style={{ opacity, scale }} className="h-2.5 w-2.5 rounded-full bg-brand-cyan transition-colors group-hover:bg-white" />
    </button>
  );
}
