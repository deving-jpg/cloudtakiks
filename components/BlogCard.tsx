/* eslint-disable @next/next/no-img-element */
"use client";

import { motion } from "framer-motion";
import { Chevron } from "./Logo";
import { useArticleModal, type Post } from "./ArticleModal";
import { useLang } from "./LanguageProvider";

export function BlogCard({ post, index }: { post: Post; index: number }) {
  const { open } = useArticleModal();
  const { t } = useLang();
  return (
    <motion.article
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-10%" }}
      transition={{ duration: 0.6, delay: (index % 2) * 0.08, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -6 }}
      onClick={() => open(post)}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => (e.key === "Enter" || e.key === " ") && open(post)}
      className="group relative flex h-full cursor-pointer flex-col overflow-hidden rounded-2xl border border-content/10 bg-surface shadow-card transition-colors hover:border-brand-blue/50"
    >
      <span className="absolute inset-x-0 top-0 z-10 h-[3px] origin-left scale-x-0 bg-gradient-to-r from-brand-blue to-brand-cyan transition-transform duration-500 ease-out group-hover:scale-x-100" />
      <span className="pointer-events-none absolute -right-16 -top-16 h-44 w-44 rounded-full bg-brand-blue/15 opacity-0 blur-3xl transition-opacity duration-500 group-hover:opacity-100" />

      {/* thumbnail */}
      {post.image && (
        <div className="relative aspect-[2/1] w-full shrink-0 overflow-hidden">
          <img
            src={post.image}
            alt={post.title}
            className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
          />
        </div>
      )}

      <div className="relative flex flex-1 flex-col p-7">
        <div className="flex items-center gap-3 text-[11px] uppercase tracking-brand text-brand-deep dark:text-brand-cyan">
          <span>{post.category}</span>
          <span className="h-1 w-1 rounded-full bg-content/30" />
          <span className="text-content/40">{post.date}</span>
        </div>

        <h3 className="mt-4 text-lg font-extrabold leading-snug text-content transition-colors group-hover:text-brand-blue">
          {post.title}
        </h3>

        <p className="mt-3 flex-1 text-sm leading-relaxed text-content/60">{post.excerpt}</p>

        <div className="mt-5 flex items-center justify-between border-t border-content/10 pt-4 text-xs text-content/40">
          <span>{post.views} {t.blog.views}</span>
          <span className="flex items-center gap-1 font-bold text-content/55 transition-colors group-hover:text-brand-blue">
            {t.readMore} <Chevron className="h-3 w-2 transition-transform group-hover:translate-x-1" />
          </span>
        </div>
      </div>
    </motion.article>
  );
}

export function FeaturedBlog({ post }: { post: Post }) {
  const { open } = useArticleModal();
  const { t } = useLang();
  return (
    <motion.article
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-10%" }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      onClick={() => open(post)}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => (e.key === "Enter" || e.key === " ") && open(post)}
      className="group relative cursor-pointer overflow-hidden rounded-3xl border border-content/10 shadow-glow"
    >
      {post.image && (
        <img
          src={post.image}
          alt={post.title}
          className="absolute inset-0 h-full w-full object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-105"
        />
      )}
      <div className="absolute inset-0 bg-gradient-to-t from-navy-deep via-navy-deep/70 to-navy-deep/10" />
      <div className="absolute inset-0 bg-gradient-to-r from-navy-deep/60 to-transparent" />

      <div className="relative flex min-h-[420px] flex-col justify-end p-8 md:min-h-[500px] md:p-12">
        <span className="inline-flex w-fit items-center gap-2 rounded-full bg-brand-blue px-3.5 py-1.5 text-[11px] font-extrabold uppercase tracking-wide2 text-white shadow-glow">
          <span className="h-1.5 w-1.5 rounded-full bg-white" />
          {t.blog.featured} · {post.category}
        </span>

        <h2 className="display-normal mt-5 max-w-3xl text-3xl text-white md:text-5xl">{post.title}</h2>
        <p className="mt-4 max-w-xl text-base text-white/75 md:text-lg">{post.excerpt}</p>

        <div className="mt-7 flex flex-wrap items-center gap-4 text-sm font-semibold text-white/70">
          <span>{post.date}</span>
          <span className="h-1 w-1 rounded-full bg-white/40" />
          <span>{post.views} {t.blog.views}</span>
          <span className="ms-1 flex items-center gap-2 font-extrabold text-brand-cyan transition-transform group-hover:translate-x-1">
            {t.readMore} <Chevron className="h-3 w-2" />
          </span>
        </div>
      </div>
    </motion.article>
  );
}
