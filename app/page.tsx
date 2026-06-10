import Link from "next/link";
import Hero from "@/components/Hero3";
import { MarqueePills } from "@/components/MarqueePills";
import { SectionHeading } from "@/components/SectionHeading";
import { Reveal } from "@/components/Reveal";
import HorizontalOfferings from "@/components/HorizontalOfferings";
import GlobalPresence from "@/components/GlobalPresence";
import { Chevron } from "@/components/Logo";
import { Icon, type IconName } from "@/components/Icons";
import { ChevronField } from "@/components/ChevronField";
import { getDict } from "@/lib/lang";
import { BLOG } from "@/lib/data";

const APPROACH_ICONS: IconName[] = ["cloud", "grid", "arrow", "clock"];

export default function HomePage() {
  return (
    <>
      <Hero />
      <HomeBody />
    </>
  );
}

export function HomeBody() {
  const t = getDict();
  return (
    <>
      <MarqueePills />

      <GlobalPresence />

      {/* Who we are */}
      <section className="relative py-28">
        <div className="container-x grid gap-12 lg:grid-cols-2 lg:items-center">
          <div>
            <SectionHeading eyebrow={t.whoWeAre.eyebrow} title={t.whoWeAre.title} intro={t.whoWeAre.intro} />
            <Reveal delay={0.15}>
              <div className="mt-10 flex flex-wrap gap-4">
                <Link href="/about" className="btn-primary">
                  {t.ourStory} <Chevron className="h-3.5 w-2.5" />
                </Link>
                <Link href="/contact" className="btn-outline">
                  {t.bookCall}
                </Link>
              </div>
            </Reveal>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            {t.approach.map((c, i) => (
              <Reveal key={c.title} delay={i * 0.08}>
                <div className="group flex h-full flex-col gap-4 rounded-2xl border border-content/10 bg-surface p-6 shadow-card transition-colors hover:border-brand-blue/50">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-electric text-white">
                    <Icon name={APPROACH_ICONS[i]} className="h-6 w-6" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="text-base font-extrabold leading-tight text-content">{c.title}</h3>
                      <Chevron className="h-3 w-2 text-brand-blue opacity-0 transition-opacity group-hover:opacity-100" />
                    </div>
                    <p className="mt-2 text-sm leading-relaxed text-content/60">{c.body}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <HorizontalOfferings />

      {/* Bold statement band */}
      <section className="relative overflow-hidden bg-bg py-28">
        <div className="pointer-events-none absolute -left-20 top-1/2 h-[420px] w-[420px] -translate-y-1/2 rounded-full bg-brand-blue/20 blur-[140px]" />
        <div className="container-x relative">
          <Reveal>
            <p className="eyebrow">
              <span className="h-px w-8 bg-brand-cyan" />
              {t.promise.eyebrow}
            </p>
          </Reveal>
          <Reveal delay={0.05}>
            <p className="display-normal mt-7 max-w-5xl text-[clamp(2.1rem,5.5vw,4rem)] leading-[1.04] text-content">
              {t.promise.before}
              <span className="gradient-text">{t.promise.highlight}</span>
              {t.promise.after}
            </p>
          </Reveal>
          <Reveal delay={0.1} className="mt-12">
            <ChevronField count={8} />
          </Reveal>
        </div>
      </section>

      {/* Why choose us */}
      <section className="border-y border-content/10 bg-bg py-28">
        <div className="container-x">
          <SectionHeading center eyebrow={t.whyUs.eyebrow} title={t.whyUs.title} intro={t.whyUs.intro} />
          <div className="mt-16 grid gap-px overflow-hidden rounded-2xl border border-content/10 bg-content/10 md:grid-cols-5">
            {t.why.map((w, i) => (
              <Reveal key={w.title} delay={i * 0.06}>
                <div className="group h-full bg-surface p-7 transition-colors hover:bg-surface2">
                  <span className="display text-3xl text-brand-blue/40 transition-colors group-hover:text-brand-blue">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h3 className="mt-4 font-extrabold text-content">{w.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-content/60">{w.body}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Blog teaser */}
      <section className="py-28">
        <div className="container-x">
          <div className="flex flex-col items-start justify-between gap-8 md:flex-row md:items-end">
            <SectionHeading eyebrow={t.fromBlog.eyebrow} title={t.fromBlog.title} />
            <Reveal>
              <Link href="/blog" className="btn-outline shrink-0">
                {t.readBlog} <Chevron className="h-3.5 w-2.5" />
              </Link>
            </Reveal>
          </div>
          <div className="mt-14 grid gap-6 md:grid-cols-3">
            {BLOG.slice(0, 3).map((b, i) => (
              <Reveal key={b.slug} delay={i * 0.08}>
                <Link
                  href="/blog"
                  className="group block h-full rounded-2xl border border-content/10 bg-surface p-7 shadow-card transition-colors hover:border-brand-blue/50"
                >
                  <div className="flex items-center gap-3 text-[11px] uppercase tracking-brand text-brand-deep dark:text-brand-cyan">
                    <span>{b.category}</span>
                    <span className="h-1 w-1 rounded-full bg-content/30" />
                    <span className="text-content/40">{b.date}</span>
                  </div>
                  <h3 className="mt-4 text-lg font-extrabold leading-snug text-content group-hover:text-brand-blue">
                    {b.title}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-content/60">{b.excerpt}</p>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <CtaBand />
    </>
  );
}

export function CtaBand() {
  const t = getDict();
  return (
    <section className="relative overflow-hidden">
      <div className="container-x pb-28">
        <Reveal>
          <div className="relative overflow-hidden rounded-3xl bg-electric p-12 shadow-glow md:p-16">
            <div className="pointer-events-none absolute -right-6 -top-6 opacity-25">
              <ChevronField count={5} />
            </div>
            <div className="relative max-w-2xl">
              <h2 className="display text-4xl text-navy-deep md:text-6xl">{t.cta.title}</h2>
              <p className="mt-6 text-lg font-medium text-navy-deep/80">{t.cta.sub}</p>
              <div className="mt-9 flex flex-wrap gap-4">
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 rounded-full bg-navy-deep px-8 py-4 text-sm font-extrabold uppercase tracking-wide2 text-white transition-transform hover:scale-[1.04]"
                >
                  {t.getStarted} <Chevron className="h-3.5 w-2.5" />
                </Link>
                <Link
                  href="/offerings"
                  className="inline-flex items-center gap-2 rounded-full border-2 border-navy-deep/30 px-8 py-4 text-sm font-extrabold uppercase tracking-wide2 text-navy-deep transition-colors hover:border-navy-deep"
                >
                  {t.seeOffer}
                </Link>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
