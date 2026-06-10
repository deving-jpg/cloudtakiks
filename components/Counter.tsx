"use client";

import { useEffect, useRef, useState } from "react";
import { useInView } from "framer-motion";
import { useAppReady } from "./useAppReady";

export function Counter({
  value,
  suffix = "",
  raw = false,
  duration = 1600,
  immediate = false,
  startWhenReady = false,
}: {
  value: number;
  suffix?: string;
  raw?: boolean;
  duration?: number;
  immediate?: boolean; // start on mount, ignoring scroll-into-view
  startWhenReady?: boolean; // start once the loading screen has cleared
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-20%" });
  const ready = useAppReady();
  const [n, setN] = useState(0);
  const shouldRun = startWhenReady ? ready : immediate || inView;

  useEffect(() => {
    if (!shouldRun) return;
    let start: number | null = null;
    let frame = 0;
    const tick = (t: number) => {
      if (start === null) start = t;
      const p = Math.min((t - start) / duration, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      setN(Math.round(eased * value));
      if (p < 1) frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [shouldRun, value, duration]);

  const display = raw ? value : n.toLocaleString();
  return (
    <span ref={ref}>
      {display}
      {suffix}
    </span>
  );
}
