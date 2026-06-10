"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Measures its content's natural height and the available viewport height,
 * then scales the content so it always fits the screen (never upscales past `max`).
 * Recomputes on resize/zoom, content changes, and after web fonts load.
 *
 * `reserve` = pixels to keep free (e.g. fixed navbar + breathing room).
 */
export default function FitToScreen({
  children,
  reserve = 104,
  max = 1,
  origin = "top center",
}: {
  children: React.ReactNode;
  reserve?: number;
  max?: number;
  origin?: string;
}) {
  const innerRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(1);
  const [height, setHeight] = useState<number | undefined>(undefined);

  useEffect(() => {
    const el = innerRef.current;
    if (!el) return;

    const compute = () => {
      const natural = el.scrollHeight; // unaffected by the transform
      if (!natural) return;
      const avail = window.innerHeight - reserve;
      const s = Math.max(0.4, Math.min(max, avail / natural));
      setScale(s);
      setHeight(natural * s);
    };

    compute();
    const ro = new ResizeObserver(compute);
    ro.observe(el);
    window.addEventListener("resize", compute);
    const t = setTimeout(compute, 400);
    // recompute once the brand font has loaded (it changes line heights)
    const fonts = (document as Document & { fonts?: { ready?: Promise<unknown> } }).fonts;
    fonts?.ready?.then(compute).catch(() => {});

    return () => {
      ro.disconnect();
      window.removeEventListener("resize", compute);
      clearTimeout(t);
    };
  }, [reserve, max]);

  return (
    <div style={{ height }} className="w-full">
      <div
        ref={innerRef}
        style={{ transform: `scale(${scale})`, transformOrigin: origin }}
        className="w-full"
      >
        {children}
      </div>
    </div>
  );
}
