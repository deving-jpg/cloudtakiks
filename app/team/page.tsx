import type { Metadata } from "next";
import Link from "next/link";
import PageHeader from "@/components/PageHeader";
import { Reveal } from "@/components/Reveal";
import { SectionHeading } from "@/components/SectionHeading";
import { Counter } from "@/components/Counter";
import { Chevron } from "@/components/Logo";
import TeamAvatar from "@/components/TeamAvatar";
import { TEAM_PHOTOS } from "@/lib/data";
import { CtaBand } from "../page";
import { getDict } from "@/lib/lang";

export const metadata: Metadata = {
  title: "Our Team — Cloud Taktiks",
  description:
    "Meet the SAP and cloud specialists behind Cloud Taktiks — engineers, security experts and client partners across the Middle East, Europe and Latin America.",
};

export default function TeamPage() {
  const t = getDict();
  const tm = t.team;
  return (
    <>
      <PageHeader eyebrow={tm.eyebrow} title={tm.title} intro={tm.intro} />

      {/* Stats band — electric (accent, fixed colors) */}
      <section className="border-b border-content/10 bg-brand-blue py-20">
        <div className="container-x grid gap-10 sm:grid-cols-3">
          {tm.stats.map((s, i) => (
            <Reveal key={s.label} delay={i * 0.08} className="text-center">
              <div className="display text-5xl text-white md:text-6xl">
                <Counter value={s.value} suffix={s.suffix} />
              </div>
              <p className="mt-3 text-sm uppercase tracking-wide2 text-white/80">{s.label}</p>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Leadership */}
      <section className="py-28">
        <div className="container-x">
          <SectionHeading eyebrow={tm.leadership.eyebrow} title={tm.leadership.title} intro={tm.leadership.intro} />
          <div className="mt-16 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {tm.members.map((m, i) => (
              <Reveal key={m.name} delay={(i % 3) * 0.08}>
                <div className="group h-full overflow-hidden rounded-2xl border border-content/10 bg-surface shadow-card transition-colors hover:border-brand-blue/50">
                  <div className="relative aspect-[4/5] w-full overflow-hidden bg-bg">
                    <TeamAvatar name={m.name} src={TEAM_PHOTOS[i] ?? undefined} />
                    <span className="absolute left-4 top-4 inline-flex items-center gap-2 rounded-full bg-bg/85 px-3 py-1 text-xs font-bold uppercase tracking-wide2 text-content/70 backdrop-blur">
                      <span className="h-1.5 w-1.5 rounded-full bg-brand-cyan" />
                      {m.region}
                    </span>
                  </div>
                  <div className="p-6">
                    <h3 className="text-lg font-extrabold leading-tight text-content">{m.name}</h3>
                    <p className="mt-1 text-sm font-bold text-brand-blue">{m.role}</p>
                    <p className="mt-4 text-sm leading-relaxed text-content/60">{m.bio}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Join band */}
      <section className="border-y border-content/10 bg-bg py-24">
        <div className="container-x">
          <Reveal>
            <div className="relative overflow-hidden rounded-3xl border border-content/10 bg-surface p-10 text-center shadow-card md:p-16">
              <div className="pointer-events-none absolute -right-10 -top-10 h-48 w-48 rounded-full bg-brand-blue/20 blur-3xl" />
              <span className="eyebrow justify-center">
                <span className="h-px w-6 bg-brand-cyan" />
                {tm.joinSection.eyebrow}
              </span>
              <h2 className="display mt-6 text-3xl text-content md:text-5xl">{tm.joinSection.title}</h2>
              <p className="mx-auto mt-5 max-w-2xl text-lg leading-relaxed text-content/65">{tm.joinSection.intro}</p>
              <Link href="/contact" className="btn-primary mt-9 inline-flex">
                {tm.joinSection.cta} <Chevron className="h-3 w-2.5" />
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      <div className="pt-28">
        <CtaBand />
      </div>
    </>
  );
}
