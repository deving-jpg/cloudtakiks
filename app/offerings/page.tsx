import type { Metadata } from "next";
import PageHeader from "@/components/PageHeader";
import { Reveal } from "@/components/Reveal";
import { Icon, type IconName } from "@/components/Icons";
import { Chevron } from "@/components/Logo";
import { CtaBand } from "../page";
import { getDict } from "@/lib/lang";

export const metadata: Metadata = {
  title: "Offerings — Cloud Taktiks",
  description:
    "SAP Business One cloud hosting, CrowdStrike endpoint protection, cyber security, TSplus remote access, MFA & advanced printing, and Microsoft 365 solutions.",
};

export default function OfferingsPage() {
  const t = getDict();
  const OFFERINGS = t.offerings;
  return (
    <>
      <PageHeader eyebrow={t.offeringsPage.eyebrow} title={t.offeringsPage.title} intro={t.offeringsPage.intro} />

      <section className="py-24">
        <div className="container-x space-y-8">
          {OFFERINGS.map((o, i) => (
            <Reveal key={o.slug} delay={(i % 2) * 0.05}>
              <article
                id={o.slug}
                className="group relative grid gap-8 overflow-hidden rounded-3xl border border-content/10 bg-surface p-8 shadow-card transition-colors hover:border-brand-blue/50 md:grid-cols-[auto_1fr] md:p-10"
              >
                <div className="pointer-events-none absolute -right-20 top-0 h-60 w-60 rounded-full bg-brand-blue/20 opacity-0 blur-3xl transition-opacity duration-500 group-hover:opacity-100" />

                <div className="relative flex items-start gap-6">
                  <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-2xl bg-electric text-white">
                    <Icon name={o.icon as IconName} className="h-9 w-9" />
                  </div>
                  <span className="display hidden text-7xl text-content/[0.07] md:block">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                </div>

                <div className="relative">
                  <h2 className="text-2xl font-extrabold text-content md:text-3xl">{o.title}</h2>
                  <p className="mt-4 max-w-3xl text-base leading-relaxed text-content/65">{o.body}</p>
                  <ul className="mt-6 flex flex-wrap gap-2.5">
                    {o.points.map((p) => (
                      <li
                        key={p}
                        className="flex items-center gap-2 rounded-full border border-content/10 bg-content/5 px-4 py-1.5 text-xs font-semibold uppercase tracking-brand text-brand-deep dark:text-brand-cyan"
                      >
                        <Chevron className="h-3 w-2 text-brand-blue" />
                        {p}
                      </li>
                    ))}
                  </ul>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </section>

      <CtaBand />
    </>
  );
}
