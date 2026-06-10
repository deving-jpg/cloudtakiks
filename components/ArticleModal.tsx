/* eslint-disable @next/next/no-img-element */
"use client";

import { createContext, useCallback, useContext, useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

export type Post = {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  views: number;
  category: string;
  image?: string;
  body?: string[];
};

const Ctx = createContext<{ open: (p: Post) => void }>({ open: () => {} });
export const useArticleModal = () => useContext(Ctx);

export function ArticleModalProvider({ children }: { children: React.ReactNode }) {
  const [post, setPost] = useState<Post | null>(null);
  const open = useCallback((p: Post) => setPost(p), []);
  const close = useCallback(() => setPost(null), []);

  useEffect(() => {
    const lenis = (window as unknown as { __lenis?: { stop: () => void; start: () => void } }).__lenis;
    if (post) {
      document.body.style.overflow = "hidden";
      lenis?.stop();
    } else {
      document.body.style.overflow = "";
      lenis?.start();
    }
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [post, close]);

  return (
    <Ctx.Provider value={{ open }}>
      {children}

      <AnimatePresence>
        {post && (
          <motion.div
            className="fixed inset-0 z-[120] flex items-start justify-center bg-navy-deep/70 px-4 pb-4 pt-[3vh] backdrop-blur-sm md:px-8 md:pt-[4vh]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={close}
          >
            <motion.article
              initial={{ opacity: 0, y: 36, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 24, scale: 0.98 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              onClick={(e) => e.stopPropagation()}
              className="relative flex max-h-[90vh] w-full max-w-3xl flex-col overflow-hidden rounded-3xl border border-content/10 bg-surface shadow-glow"
            >
              <button
                onClick={close}
                aria-label="Close article"
                className="absolute right-4 top-4 z-10 flex h-10 w-10 items-center justify-center rounded-full border border-content/15 bg-bg/70 text-content backdrop-blur transition-colors hover:border-brand-blue hover:text-brand-blue"
              >
                <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                  <path d="M6 6l12 12M18 6L6 18" />
                </svg>
              </button>

              {/* static image */}
              {post.image && (
                <div className="relative h-48 w-full shrink-0 overflow-hidden md:h-64">
                  <img src={post.image} alt={post.title} className="h-full w-full object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-surface via-surface/10 to-transparent" />
                </div>
              )}

              {/* static title */}
              <div className="shrink-0 px-7 pt-6 md:px-10 md:pt-8">
                <span className="text-[11px] font-extrabold uppercase tracking-wide3 text-brand-deep dark:text-brand-cyan">
                  {post.category} · {post.date} · {post.views} views
                </span>
                <h2 className="display-normal mt-3 text-2xl text-content md:text-4xl">{post.title}</h2>
              </div>

              {/* scrollable body only */}
              <div
                data-lenis-prevent
                className="min-h-0 flex-1 space-y-4 overflow-y-auto overscroll-contain px-7 pb-8 pt-5 text-[15px] leading-relaxed text-content/70 md:px-10 md:pb-10"
              >
                {(post.body && post.body.length ? post.body : [post.excerpt]).map((para, i) => (
                  <p key={i}>{para}</p>
                ))}
              </div>
            </motion.article>
          </motion.div>
        )}
      </AnimatePresence>
    </Ctx.Provider>
  );
}
