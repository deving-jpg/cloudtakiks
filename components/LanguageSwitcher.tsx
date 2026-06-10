"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useLang } from "./LanguageProvider";
import type { Lang } from "@/lib/i18n";

const LANGS: { code: Lang; label: string; short: string }[] = [
  { code: "en", label: "English", short: "EN" },
  { code: "ar", label: "العربية", short: "ع" },
];

export default function LanguageSwitcher() {
  const { lang, setLang } = useLang();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onDoc = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", onDoc);
    return () => document.removeEventListener("mousedown", onDoc);
  }, []);

  const current = LANGS.find((l) => l.code === lang) ?? LANGS[0];

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen((v) => !v)}
        aria-label="Change language"
        className="flex h-10 items-center gap-1.5 rounded-full border border-content/15 px-3 text-xs font-extrabold uppercase tracking-brand text-content/80 transition-colors hover:border-brand-blue hover:text-brand-blue"
      >
        <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.6">
          <circle cx="12" cy="12" r="9" />
          <path d="M3 12h18M12 3c2.5 2.5 2.5 15 0 18M12 3c-2.5 2.5-2.5 15 0 18" />
        </svg>
        {current.short}
      </button>

      <AnimatePresence>
        {open && (
          <motion.ul
            initial={{ opacity: 0, y: -6, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -6, scale: 0.97 }}
            transition={{ duration: 0.18 }}
            className="absolute end-0 top-12 z-50 w-36 overflow-hidden rounded-xl border border-content/10 bg-bg/95 p-1 shadow-card backdrop-blur-xl"
          >
            {LANGS.map((l) => (
              <li key={l.code}>
                <button
                  onClick={() => {
                    setLang(l.code);
                    setOpen(false);
                  }}
                  className={
                    "flex w-full items-center justify-between rounded-lg px-3 py-2 text-sm font-bold transition-colors " +
                    (l.code === lang ? "bg-brand-blue/15 text-brand-blue" : "text-content/70 hover:bg-content/5 hover:text-content")
                  }
                >
                  {l.label}
                  <span className="text-[11px] opacity-60">{l.short}</span>
                </button>
              </li>
            ))}
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
  );
}
