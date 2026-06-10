"use client";

import { motion } from "framer-motion";
import { useRef, useState } from "react";
import { Icon, type IconName } from "./Icons";
import { Chevron } from "./Logo";

export function OfferingCard({
  index,
  title,
  short,
  points,
  icon,
}: {
  index: number;
  title: string;
  short: string;
  points: string[];
  icon: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ rx: 0, ry: 0 });

  const onMove = (e: React.MouseEvent) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width - 0.5;
    const py = (e.clientY - r.top) / r.height - 0.5;
    setTilt({ rx: py * -8, ry: px * 10 });
  };
  const reset = () => setTilt({ rx: 0, ry: 0 });

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-10%" }}
      transition={{ duration: 0.6, delay: (index % 3) * 0.08, ease: [0.22, 1, 0.36, 1] }}
      style={{ perspective: 1000 }}
    >
      <div
        ref={ref}
        onMouseMove={onMove}
        onMouseLeave={reset}
        style={{ transform: `rotateX(${tilt.rx}deg) rotateY(${tilt.ry}deg)` }}
        className="group relative h-full overflow-hidden rounded-2xl border border-content/10 bg-surface p-7 shadow-card transition-[transform,border-color] duration-200 ease-out hover:border-brand-blue/60"
      >
        <div className="pointer-events-none absolute -right-16 -top-16 h-44 w-44 rounded-full bg-brand-blue/25 opacity-0 blur-3xl transition-opacity duration-500 group-hover:opacity-100" />

        <div className="relative">
          <div className="mb-6 flex items-center justify-between">
            <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-electric text-navy-deep">
              <Icon name={icon as IconName} className="h-7 w-7" />
            </div>
            <span className="display text-5xl text-content/[0.07] transition-colors group-hover:text-brand-blue/30">
              {String(index + 1).padStart(2, "0")}
            </span>
          </div>

          <h3 className="text-xl font-extrabold leading-tight text-content">{title}</h3>
          <p className="mt-3 text-sm leading-relaxed text-content/60">{short}</p>

          <ul className="mt-5 flex flex-wrap gap-2">
            {points.map((p) => (
              <li
                key={p}
                className="rounded-full border border-content/10 bg-content/5 px-3 py-1 text-[11px] font-semibold uppercase tracking-brand text-brand-deep dark:text-brand-cyan"
              >
                {p}
              </li>
            ))}
          </ul>

          <div className="mt-6 flex items-center gap-2 text-sm font-bold text-content/45 transition-colors group-hover:text-brand-blue">
            Learn more
            <Chevron className="h-3 w-2.5 transition-transform group-hover:translate-x-1" />
          </div>
        </div>
      </div>
    </motion.div>
  );
}
