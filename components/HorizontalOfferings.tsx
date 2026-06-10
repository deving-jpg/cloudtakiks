"use client";

import Link from "next/link";
import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { Icon, type IconName } from "./Icons";
import { Chevron } from "./Logo";
import { SectionHeading } from "./SectionHeading";
import { useLang } from "./LanguageProvider";

const GAP = 24; // matches gap-6

export default function HorizontalOfferings() {
  const { t } = useLang();
  const OFFERINGS = t.offerings;
  const viewportRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const [index, setIndex] = useState(0);
  const [step, setStep] = useState(0); // px to advance per click (card + gap)
  const [maxOffset, setMaxOffset] = useState(0);

  const measure = useCallback(() => {
    const vp = viewportRef.current;
    const card = cardRef.current;
    if (!vp || !card) return;
    const s = card.offsetWidth + GAP;
    setStep(s);
    setMaxOffset(Math.max(0, vp.scrollWidth - vp.clientWidth));
  }, []);

  useLayoutEffect(() => {
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, [measure]);

  // keep index valid when the viewport resizes
  useEffect(() => {
    if (step > 0 && index * step > maxOffset) {
      setIndex(Math.ceil(maxOffset / step));
    }
  }, [step, maxOffset, index]);

  const offset = step > 0 ? Math.min(index * step, maxOffset) : 0;
  const atStart = offset <= 0;
  const atEnd = offset >= maxOffset - 1;

  const prev = () => setIndex((i) => Math.max(0, i - 1));
  const next = () => setIndex((i) => (step > 0 ? Math.min(i + 1, Math.ceil(maxOffset / step)) : i));

  const progress = maxOffset > 0 ? offset / maxOffset : 0;

  return (
    <section className="relative overflow-hidden border-y border-content/10 bg-bg py-28">
      <div className="container-x">
        {/* heading + arrows */}
        <div className="flex flex-col items-start justify-between gap-8 md:flex-row md:items-end">
          <SectionHeading eyebrow={t.whatWeDo.eyebrow} title={t.whatWeDo.title} intro={t.offeringsPage.intro} />
          <div className="flex items-center gap-3">
            <ArrowButton dir="prev" onClick={prev} disabled={atStart} />
            <ArrowButton dir="next" onClick={next} disabled={atEnd} />
          </div>
        </div>

        {/* carousel viewport */}
        <div ref={viewportRef} className="mt-14 overflow-hidden">
          <motion.div
            className="flex gap-6"
            animate={{ x: -offset }}
            transition={{ type: "spring", stiffness: 260, damping: 34 }}
          >
            {OFFERINGS.map((o, i) => (
              <article
                ref={i === 0 ? cardRef : undefined}
                key={o.slug}
                className="group relative flex w-[86%] shrink-0 flex-col justify-between overflow-hidden rounded-3xl border border-content/10 bg-transparent p-8 sm:w-[60%] md:w-[calc(50%-12px)] lg:w-[calc(33.333%-16px)]"
              >
                <div className="pointer-events-none absolute -right-16 -top-16 h-52 w-52 rounded-full bg-brand-blue/25 opacity-0 blur-3xl transition-opacity duration-500 group-hover:opacity-100" />
                <div className="relative">
                  <div className="flex items-center justify-between">
                    <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-electric text-white">
                      <Icon name={o.icon as IconName} className="h-8 w-8" />
                    </div>
                    <span className="display text-7xl text-content/[0.07]">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                  </div>
                  <h3 className="mt-8 text-2xl font-extrabold leading-tight text-content">{o.title}</h3>
                  <p className="mt-4 text-base leading-relaxed text-content/65">{o.short}</p>
                </div>

                <div className="relative mt-8">
                  <ul className="mb-6 flex flex-wrap gap-2">
                    {o.points.map((p) => (
                      <li
                        key={p}
                        className="rounded-full border border-content/15 px-3 py-1 text-[11px] font-semibold uppercase tracking-brand text-brand-deep dark:text-brand-cyan"
                      >
                        {p}
                      </li>
                    ))}
                  </ul>
                  <Link
                    href="/offerings"
                    className="inline-flex items-center gap-2 text-sm font-bold text-content/70 transition-colors group-hover:text-brand-blue"
                  >
                    {t.learnMore} <Chevron className="h-3 w-2.5 transition-transform group-hover:translate-x-1 rtl:group-hover:-translate-x-1" />
                  </Link>
                </div>
              </article>
            ))}
          </motion.div>
        </div>

        {/* progress bar */}
        <div className="mt-10 h-[3px] w-full max-w-xs overflow-hidden rounded-full bg-content/10">
          <motion.div
            className="h-full origin-left rounded-full bg-brand-blue"
            animate={{ scaleX: Math.max(0.12, progress || 0.12) }}
            transition={{ type: "spring", stiffness: 260, damping: 34 }}
          />
        </div>
      </div>
    </section>
  );
}

function ArrowButton({
  dir,
  onClick,
  disabled,
}: {
  dir: "prev" | "next";
  onClick: () => void;
  disabled: boolean;
}) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      aria-label={dir === "prev" ? "Previous offering" : "Next offering"}
      className={
        "flex h-14 w-14 items-center justify-center rounded-full border-2 transition-all duration-300 " +
        (disabled
          ? "cursor-not-allowed border-content/10 text-content/20"
          : "border-content/20 text-content hover:border-brand-blue hover:bg-brand-blue hover:text-white")
      }
    >
      <Chevron className={"h-5 w-3.5 " + (dir === "prev" ? "rotate-180" : "")} />
    </button>
  );
}
