import type { Metadata } from "next";
import WorldMap from "@/components/WorldMap";
import { Reveal } from "@/components/Reveal";
import { Counter } from "@/components/Counter";

export const metadata: Metadata = {
  title: "Cloud Taktiks — World map test",
  robots: { index: false, follow: false },
};

export default function Test6Page() {
  return (
    <main className="relative overflow-hidden bg-bg bg-grid pb-32 pt-36">
      <div className="pointer-events-none absolute -left-40 top-0 h-[460px] w-[460px] rounded-full bg-brand-blue/15 blur-[150px]" />
      <section className="container-x">
        <Reveal>
          <span className="eyebrow">
            <span className="h-px w-8 bg-brand-cyan" />
            Global presence
          </span>
        </Reveal>
        <Reveal delay={0.05}>
          <h1 className="display mt-5 text-[clamp(2.4rem,6vw,4.5rem)] text-content">
            Trusted across <span className="gradient-text">40+ countries</span>
          </h1>
        </Reveal>
        <Reveal delay={0.1}>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-content/60">
            From the Middle East to Europe and Latin America — hover any country to highlight it.
          </p>
        </Reveal>

        <Reveal delay={0.15} className="mt-12">
          <div className="rounded-3xl border border-content/10 bg-surface/30 p-3 shadow-card md:p-8">
            <WorldMap />
          </div>
        </Reveal>

        <Reveal delay={0.2}>
          <div className="mt-12 flex flex-wrap gap-x-12 gap-y-6">
            {[
              { v: 750, s: "+", l: "Clients" },
              { v: 40, s: "+", l: "Partners" },
              { v: 3750, s: "+", l: "Users" },
            ].map((s) => (
              <div key={s.l}>
                <div className="display text-4xl text-content md:text-5xl">
                  <span className="gradient-text">
                    <Counter value={s.v} suffix={s.s} startWhenReady />
                  </span>
                </div>
                <div className="mt-1 text-xs uppercase tracking-wide2 text-content/45">{s.l}</div>
              </div>
            ))}
          </div>
        </Reveal>
      </section>
    </main>
  );
}
