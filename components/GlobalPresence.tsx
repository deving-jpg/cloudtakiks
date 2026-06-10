import WorldMap from "./WorldMap";
import { Reveal } from "./Reveal";
import { SectionHeading } from "./SectionHeading";
import { getDict } from "@/lib/lang";

/** Dedicated "Global presence" section — interactive world map, no counters. */
export default function GlobalPresence() {
  const t = getDict();
  return (
    <section className="relative overflow-hidden border-b border-content/10 py-28">
      <div className="pointer-events-none absolute -left-40 top-0 h-[460px] w-[460px] rounded-full bg-brand-blue/12 blur-[150px]" />
      <div className="container-x relative">
        <SectionHeading eyebrow={t.globalPresence.eyebrow} title={t.globalPresence.title} intro={t.globalPresence.intro} />
        <Reveal delay={0.15} className="mt-12">
          <div className="md:-translate-x-[5%]">
            <WorldMap />
          </div>
        </Reveal>
      </div>
    </section>
  );
}
