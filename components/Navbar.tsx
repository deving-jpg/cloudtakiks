"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import clsx from "clsx";
import { Logo, Chevron } from "./Logo";
import ThemeToggle from "./ThemeToggle";
import LanguageSwitcher from "./LanguageSwitcher";
import { useTheme } from "./ThemeProvider";
import { useLang } from "./LanguageProvider";
import { NAV } from "@/lib/data";

export default function Navbar() {
  const pathname = usePathname();
  const { theme } = useTheme();
  const { t } = useLang();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => setOpen(false), [pathname]);

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className={clsx(
        "fixed inset-x-0 top-0 z-50 transition-all duration-300",
        open ? "bg-bg" : scrolled ? "border-b border-content/10 bg-bg/85 backdrop-blur-xl" : "border-b border-transparent"
      )}
    >
      <nav className="container-x flex h-[74px] items-center justify-between">
        {/* Logo unchanged — color follows theme (brand-approved both ways) */}
        <Logo onDark={theme === "dark"} />

        <ul className="hidden items-center gap-1 md:flex">
          {NAV.map((item, i) => {
            const active = pathname === item.href;
            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={clsx(
                    "relative rounded-full px-4 py-2 text-sm font-bold uppercase tracking-brand transition-colors",
                    active ? "text-content" : "text-content/50 hover:text-content"
                  )}
                >
                  {t.nav[i]}
                  {active && (
                    <motion.span
                      layoutId="nav-pill"
                      className="absolute inset-0 -z-10 rounded-full bg-brand-blue/20 ring-1 ring-brand-blue/40"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                </Link>
              </li>
            );
          })}
        </ul>

        <div className="flex items-center gap-2 sm:gap-3">
          <LanguageSwitcher />
          <ThemeToggle />
          <a
            href="https://support.cloudtaktiks.com/support/home"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary hidden !px-6 !py-2.5 md:inline-flex"
          >
            {t.clientSupport} <Chevron className="h-3 w-2.5" />
          </a>

          <button
            aria-label="Toggle menu"
            onClick={() => setOpen((v) => !v)}
            className="flex h-10 w-10 items-center justify-center rounded-full border border-content/20 md:hidden"
          >
            <div className="space-y-1.5">
              <span className={clsx("block h-0.5 w-5 bg-content transition", open && "translate-y-2 rotate-45")} />
              <span className={clsx("block h-0.5 w-5 bg-content transition", open && "opacity-0")} />
              <span className={clsx("block h-0.5 w-5 bg-content transition", open && "-translate-y-2 -rotate-45")} />
            </div>
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden border-t border-content/10 bg-bg shadow-card md:hidden"
          >
            <ul className="container-x flex flex-col gap-1 py-4">
              {NAV.map((item, i) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="flex items-center justify-between rounded-xl px-4 py-3 text-lg font-extrabold uppercase tracking-brand text-content/80 hover:bg-content/5 hover:text-content"
                  >
                    {t.nav[i]}
                    <Chevron className="h-4 w-3 text-brand-blue" />
                  </Link>
                </li>
              ))}
              <li className="mt-2">
                <a
                  href="https://support.cloudtaktiks.com/support/home"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-primary w-full justify-center"
                >
                  {t.clientSupport}
                </a>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
