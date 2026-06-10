import type { Metadata } from "next";
import PageHeader from "@/components/PageHeader";
import { Reveal } from "@/components/Reveal";
import { SectionHeading } from "@/components/SectionHeading";
import { Counter } from "@/components/Counter";
import { Chevron } from "@/components/Logo";
import { Icon, type IconName } from "@/components/Icons";
import { JourneyTimeline } from "@/components/JourneyTimeline";
import { CtaBand } from "../page";
import { getDict } from "@/lib/lang";

export const metadata: Metadata = {
  title: "About — Cloud Taktiks",
  description:
    "Cloud Taktiks is a strategic ally in digital transformation, specializing in SAP Business One cloud solutions since 2016.",
};

export default function AboutPage() {
  const t = getDict();
  const a = t.about;
  return (
    <>
      <PageHeader eyebrow={a.eyebrow} title={a.title} intro={a.intro} />

      {/* Mission & Vision */}
      <section className="py-28">
        <div className="container-x grid gap-10 lg:grid-cols-2">
          {[
            { tag: a.missionTag, text: a.mission },
            { tag: a.visionTag, text: a.vision },
          ].map((b, i) => (
            <Reveal key={b.tag} delay={i * 0.1}>
              <div className="relative h-full overflow-hidden rounded-2xl border border-content/10 bg-surface p-9 shadow-card">
                <div className="pointer-events-none absolute -right-8 -top-8 h-40 w-40 rounded-full bg-brand-blue/20 blur-3xl" />
                <span className="eyebrow">
                  <span className="h-px w-6 bg-brand-cyan" />
                  {b.tag}
                </span>
                <p className="mt-6 text-xl leading-relaxed text-content/85">{b.text}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Stats band — electric (accent, fixed colors) */}
      <section className="border-y border-content/10 bg-brand-blue py-20">
        <div className="container-x grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          {[
            { value: 60, suffix: "+", label: a.stats[0].label },
            { value: 5, suffix: "", label: a.stats[1].label },
            { value: 750, suffix: "+", label: a.stats[2].label },
            { value: 10, suffix: "+", label: a.stats[3].label },
          ].map((s, i) => (
            <Reveal key={`${s.label}-${s.value}`} delay={i * 0.08} className="text-center">
              <div className="display text-5xl text-white md:text-6xl">
                <Counter value={s.value} suffix={s.suffix} />
              </div>
              <p className="mt-3 text-sm uppercase tracking-wide2 text-white/80">{s.label}</p>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Our Approach — 8 areas */}
      <section className="py-28">
        <div className="container-x">
          <SectionHeading eyebrow={a.approachSection.eyebrow} title={a.approachSection.title} intro={a.approachSection.intro} />
          <div className="mt-16 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {a.approachAreas.map((area, i) => (
              <Reveal key={area.title} delay={(i % 4) * 0.07}>
                <div className="group h-full rounded-2xl border border-content/10 bg-surface p-6 shadow-card transition-colors hover:border-brand-blue/50">
                  <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-electric text-white">
                    <Icon name={area.icon as IconName} className="h-6 w-6" />
                  </div>
                  <h3 className="flex items-center gap-2 font-extrabold text-content">
                    {area.title}
                    <Chevron className="h-3 w-2 text-brand-blue opacity-0 transition-opacity group-hover:opacity-100" />
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-content/60">{area.body}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-28">
        <div className="container-x">
          <SectionHeading eyebrow={a.journey.eyebrow} title={a.journey.title} intro={a.journey.intro} />
          <JourneyTimeline items={a.timeline} />
        </div>
      </section>

      {/* Core values */}
      <section className="border-y border-content/10 bg-bg py-28">
        <div className="container-x">
          <SectionHeading center eyebrow={a.valuesSection.eyebrow} title={a.valuesSection.title} />
          <div className="mt-16 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {a.values.map((v, i) => (
              <Reveal key={v.n} delay={(i % 3) * 0.08}>
                <div className="group h-full rounded-2xl border border-content/10 bg-surface p-7 shadow-card transition-colors hover:border-brand-blue/50">
                  <div className="flex items-center gap-3">
                    <span className="display text-3xl text-brand-blue/40 transition-colors group-hover:text-brand-blue">
                      {v.n}
                    </span>
                    <Chevron className="h-4 w-3 text-brand-blue opacity-0 transition-opacity group-hover:opacity-100" />
                  </div>
                  <h3 className="mt-4 text-lg font-extrabold text-content">{v.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-content/60">{v.body}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <div className="pt-28">
        <CtaBand />
      </div>
    </>
  );
}
