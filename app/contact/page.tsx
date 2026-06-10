import type { Metadata } from "next";
import PageHeader from "@/components/PageHeader";
import ContactForm from "@/components/ContactForm";
import { Reveal } from "@/components/Reveal";
import { Icon } from "@/components/Icons";
import { getDict } from "@/lib/lang";
import { SITE } from "@/lib/data";

export const metadata: Metadata = {
  title: "Contact — Cloud Taktiks",
  description:
    "Talk to Cloud Taktiks about SAP Business One cloud hosting, security and Microsoft 365. Offices and support across the Middle East, Europe and Latin America.",
};

export default function ContactPage() {
  const t = getDict();
  return (
    <>
      <PageHeader eyebrow={t.contact.eyebrow} title={t.contact.title} intro={t.contact.intro} />

      <section className="py-24">
        <div className="container-x grid items-stretch gap-12 lg:grid-cols-[1fr_1.1fr]">
          {/* Info column */}
          <div className="space-y-6">
            {[
              {
                icon: "mail",
                title: t.contact.emailUs,
                node: (
                  <a href={`mailto:${SITE.email}`} className="mt-1 block text-brand-blue hover:underline">
                    {SITE.email}
                  </a>
                ),
              },
              {
                icon: "phone",
                title: t.contact.callRegion,
                node: (
                  <ul className="mt-3 space-y-3">
                    {SITE.phones.map((p) => (
                      <li key={p.region} className="flex items-center justify-between">
                        <span className="text-[11px] uppercase tracking-brand text-content/40">{t.regions[p.region] ?? p.region}</span>
                        <a dir="ltr" href={`tel:${p.number.replace(/\s/g, "")}`} className="text-content hover:text-brand-blue">
                          {p.number}
                        </a>
                      </li>
                    ))}
                  </ul>
                ),
              },
              {
                icon: "pin",
                title: t.contact.headquarters,
                node: <p className="mt-1 text-content/65">{t.address}</p>,
              },
            ].map((c, i) => (
              <Reveal key={c.title} delay={i * 0.08}>
                <div className="rounded-2xl border border-content/10 bg-surface p-7 shadow-card">
                  <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-xl bg-electric text-white">
                    <Icon name={c.icon as never} className="h-6 w-6" />
                  </div>
                  <h3 className="font-extrabold text-content">{c.title}</h3>
                  {c.node}
                </div>
              </Reveal>
            ))}
          </div>

          {/* Form */}
          <Reveal delay={0.1} dir="left" className="h-full">
            <ContactForm />
          </Reveal>
        </div>
      </section>
    </>
  );
}
