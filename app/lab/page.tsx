import type { Metadata } from "next";
import { PARTNERS } from "@/lib/data";
import { MarqueeVelocity } from "@/components/MarqueeVelocity";
import { MarqueePills } from "@/components/MarqueePills";
import { MarqueeDual } from "@/components/MarqueeDual";
import { MarqueeSpotlight } from "@/components/MarqueeSpotlight";
import { MarqueeStroke } from "@/components/MarqueeStroke";
import { MarqueePillsDual } from "@/components/MarqueePillsDual";
import { MarqueeSheen } from "@/components/MarqueeSheen";

export const metadata: Metadata = {
  title: "Marquee ideas — Cloud Taktiks",
  robots: { index: false, follow: false },
};

export default function LabPage() {
  return (
    <main className="space-y-16 pb-32 pt-32">
      <div className="container-x">
        <span className="eyebrow">
          <span className="h-px w-8 bg-brand-cyan" />
          Lab
        </span>
        <h1 className="display mt-4 text-4xl text-content md:text-5xl">Marquee animation ideas</h1>
        <p className="mt-4 max-w-xl text-content/60">
          Three options for the strip below the counters. Scroll the page (idea 1 reacts to scroll
          speed) and hover the pills (idea 2 pauses).
        </p>
      </div>

      <Block n="01" title="Scroll-velocity ticker" desc="Speeds up and skews based on how fast you scroll; edges fade out.">
        <MarqueeVelocity items={PARTNERS} />
      </Block>

      <Block n="02" title="Glass pill cards" desc="Icon pills on the page background, edge-faded, pause on hover.">
        <MarqueePills />
      </Block>

      <Block n="03" title="3D kinetic dual rows" desc="Two giant rows scrolling opposite directions, tilted in perspective.">
        <MarqueeDual items={PARTNERS} />
      </Block>

      <Block n="04" title="Center spotlight (coverflow)" desc="Logo cards scale up and brighten as they pass the middle.">
        <MarqueeSpotlight />
      </Block>

      <Block n="05" title="Outlined stroke text" desc="Giant hollow outline words gliding across — designy and minimal.">
        <MarqueeStroke items={PARTNERS} />
      </Block>

      <Block n="06" title="Dual glass pills" desc="Two rows of icon pills scrolling opposite directions.">
        <MarqueePillsDual />
      </Block>

      <Block n="07" title="Gradient band + light sheen" desc="Electric gradient band with logos and a light beam sweeping across.">
        <MarqueeSheen />
      </Block>

      {/* spacer so idea 1's scroll reaction is easy to feel */}
      <div className="h-[40vh]" />
    </main>
  );
}

function Block({
  n,
  title,
  desc,
  children,
}: {
  n: string;
  title: string;
  desc: string;
  children: React.ReactNode;
}) {
  return (
    <section>
      <div className="container-x mb-5">
        <div className="flex items-baseline gap-3">
          <span className="display text-2xl text-brand-blue/40">{n}</span>
          <h2 className="text-xl font-extrabold text-content">{title}</h2>
        </div>
        <p className="mt-1 text-sm text-content/55">{desc}</p>
      </div>
      {children}
    </section>
  );
}
