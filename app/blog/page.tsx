import type { Metadata } from "next";
import PageHeader from "@/components/PageHeader";
import { Reveal } from "@/components/Reveal";
import { Icon } from "@/components/Icons";
import { BlogCard, FeaturedBlog } from "@/components/BlogCard";
import { ArticleModalProvider } from "@/components/ArticleModal";
import { CtaBand } from "../page";
import { getBlogs } from "@/lib/blogs";
import { getDict } from "@/lib/lang";

export const metadata: Metadata = {
  title: "Blog — Cloud Taktiks",
  description: "Insights on cloud ERP, SAP Business One migration, cybersecurity and disaster recovery.",
};

// read the latest posts (including ones added via /admin) on each request
export const dynamic = "force-dynamic";

export default async function BlogPage() {
  const t = getDict();
  const BLOG = await getBlogs();
  const [feature, ...rest] = BLOG;

  return (
    <>
      <PageHeader eyebrow={t.blogPage.eyebrow} title={t.blogPage.title} intro={t.blogPage.intro} />

      <ArticleModalProvider>
        {/* Featured — dedicated full-width section above the blog grid */}
        <section className="pt-16">
        <div className="container-x">
          <FeaturedBlog post={feature} />
        </div>
      </section>

      {/* Articles + sidebar */}
      <section className="pb-20 pt-6">
        <div className="container-x grid gap-12 lg:grid-cols-[1fr_300px]">
          {/* Grid — cards lift + glow on hover, stagger in on scroll */}
          <div className="grid h-fit gap-6 sm:grid-cols-2">
            {rest.map((b, i) => (
              <BlogCard key={b.slug} post={b} index={i} />
            ))}
          </div>

          {/* Sidebar */}
          <aside className="space-y-8">
            <Reveal>
              <div className="rounded-2xl border border-content/10 bg-surface p-6 shadow-card">
                <label className="text-xs font-extrabold uppercase tracking-wide2 text-brand-deep dark:text-brand-cyan">{t.blog.search}</label>
                <div className="mt-3 flex items-center gap-2 rounded-full border border-content/15 bg-bg px-4 py-2.5">
                  <Icon name="search" className="h-4 w-4 text-content/40" />
                  <input
                    placeholder={t.blog.searchPh}
                    className="w-full bg-transparent text-sm text-content placeholder:text-content/30 focus:outline-none"
                  />
                </div>
              </div>
            </Reveal>

            <Reveal delay={0.1}>
              <div className="rounded-2xl border border-content/10 bg-surface p-6 shadow-card">
                <h4 className="text-xs font-extrabold uppercase tracking-wide2 text-brand-deep dark:text-brand-cyan">{t.blog.categories}</h4>
                <ul className="mt-4 space-y-3 text-sm">
                  <li className="flex items-center justify-between text-content/70">
                    {t.blog.technology} <span className="text-content/40">32</span>
                  </li>
                  <li className="flex items-center justify-between text-content/70">
                    {t.blog.digitalMarketing} <span className="text-content/40">1</span>
                  </li>
                </ul>
              </div>
            </Reveal>

            <Reveal delay={0.15}>
              <div className="rounded-2xl border border-content/10 bg-surface p-6 shadow-card">
                <h4 className="text-xs font-extrabold uppercase tracking-wide2 text-brand-deep dark:text-brand-cyan">{t.blog.recent}</h4>
                <ul className="mt-4 space-y-4">
                  {BLOG.slice(0, 5).map((b) => (
                    <li
                      key={b.slug}
                      className="group cursor-pointer text-sm leading-snug text-content/60 transition-colors hover:text-content"
                    >
                      {b.title}
                      <span className="mt-1 block text-[11px] text-content/30">{b.date}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          </aside>
        </div>
      </section>
      </ArticleModalProvider>

      <CtaBand />
    </>
  );
}
