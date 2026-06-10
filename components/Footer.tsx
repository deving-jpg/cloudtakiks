"use client";

import Link from "next/link";
import { Logo, Chevron } from "./Logo";
import { SocialIcon } from "./SocialIcons";
import { useTheme } from "./ThemeProvider";
import { useLang } from "./LanguageProvider";
import { NAV, SITE } from "@/lib/data";

export default function Footer() {
  const { theme } = useTheme();
  const { t } = useLang();

  return (
    <footer className="relative overflow-hidden border-t-2 border-brand-blue/30 bg-bg text-content">
      {/* faint chevron pattern (theme-aware via currentColor) */}
      <div className="pointer-events-none absolute inset-y-0 hidden w-1/3 text-content opacity-[0.06] md:block ltr:right-0 rtl:left-0 rtl:-scale-x-100">
        <svg viewBox="0 0 200 400" preserveAspectRatio="none" className="h-full w-full">
          {[0, 1, 2, 3, 4].map((i) => (
            <path
              key={i}
              d={`M${20 + i * 40} 20 L${120 + i * 40} 200 L${20 + i * 40} 380`}
              stroke="currentColor"
              strokeWidth="14"
              fill="none"
            />
          ))}
        </svg>
      </div>

      <div className="container-x relative py-16">
        <div className="grid gap-12 md:grid-cols-[1.4fr_1fr_1fr_1.2fr]">
          <div>
            {/* Logo unchanged — color follows theme */}
            <Logo className="mb-5" onDark={theme === "dark"} />
            <p className="max-w-xs text-sm leading-relaxed text-content/60">{t.footerTagline}</p>
            <div className="mt-6 flex gap-3">
              {SITE.socials.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-content/20 text-content/70 transition-colors hover:border-brand-cyan hover:bg-brand-cyan/10 hover:text-brand-cyan"
                >
                  <SocialIcon name={s.icon} className="h-[18px] w-[18px]" />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="mb-4 text-xs font-extrabold uppercase tracking-wide3 text-brand-deep dark:text-brand-cyan">{t.navigate}</h4>
            <ul className="space-y-2.5">
              {NAV.map((n, i) => (
                <li key={n.href}>
                  <Link href={n.href} className="text-sm text-content/60 transition-colors hover:text-content">
                    {t.nav[i]}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="mb-4 text-xs font-extrabold uppercase tracking-wide3 text-brand-deep dark:text-brand-cyan">{t.offeringsTitle}</h4>
            <ul className="space-y-2.5">
              {t.offerings.slice(0, 5).map((o) => (
                <li key={o.slug}>
                  <Link href="/offerings" className="text-sm text-content/60 transition-colors hover:text-content">
                    {o.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="mb-4 text-xs font-extrabold uppercase tracking-wide3 text-brand-deep dark:text-brand-cyan">{t.talkToUs}</h4>
            <a href={`mailto:${SITE.email}`} className="text-sm text-content/80 hover:text-brand-blue">
              {SITE.email}
            </a>
            <ul className="mt-4 space-y-2.5">
              {SITE.phones.map((p) => (
                <li key={p.region} className="text-sm text-content/60">
                  <span className="block text-[11px] uppercase tracking-brand text-content/40">{t.regions[p.region] ?? p.region}</span>
                  <span dir="ltr" className="inline-block">{p.number}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-14 flex flex-col items-center justify-between gap-4 border-t border-content/15 pt-6 text-xs text-content/50 md:flex-row">
          <p>© {new Date().getFullYear()} {t.brand}. {t.rights}</p>
          <div className="flex items-center gap-2">
            <Chevron className="h-3 w-2 text-brand-blue" />
            <Chevron className="h-3 w-2 text-brand-blue/60" />
            <Chevron className="h-3 w-2 text-brand-blue/30" />
            <span className="ms-2">{t.address}</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
