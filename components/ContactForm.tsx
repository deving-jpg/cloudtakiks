"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Chevron } from "./Logo";
import { useLang } from "./LanguageProvider";

export default function ContactForm() {
  const { t } = useLang();
  const f = t.contact.form;
  const fields = [
    { name: "name", label: f.name, type: "text", placeholder: f.namePh },
    { name: "email", label: f.email, type: "email", placeholder: f.emailPh },
    { name: "company", label: f.company, type: "text", placeholder: f.companyPh },
  ];
  const [sent, setSent] = useState(false);

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
  };

  return (
    <div className="flex h-full flex-col justify-center rounded-3xl border border-content/10 bg-surface p-8 shadow-card md:p-10">
      <AnimatePresence mode="wait">
        {sent ? (
          <motion.div
            key="done"
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex min-h-[440px] flex-col items-center justify-center text-center"
          >
            <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-electric shadow-glow">
              <Chevron className="h-7 w-5 text-navy-deep" />
            </div>
            <h3 className="display text-3xl text-content">{f.received}</h3>
            <p className="mt-3 max-w-sm text-content/60">{f.receivedSub}</p>
            <button onClick={() => setSent(false)} className="btn-outline mt-8">
              {f.sendAnother}
            </button>
          </motion.div>
        ) : (
          <motion.form key="form" initial={{ opacity: 0 }} animate={{ opacity: 1 }} onSubmit={onSubmit} className="space-y-6">
            {fields.map((f, i) => (
              <motion.div
                key={f.name}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.08 }}
              >
                <label className="mb-2 block text-xs font-extrabold uppercase tracking-wide2 text-brand-deep dark:text-brand-cyan">
                  {f.label}
                </label>
                <input
                  required
                  type={f.type}
                  placeholder={f.placeholder}
                  className="w-full rounded-xl border border-content/15 bg-bg px-4 py-3.5 text-content placeholder:text-content/30 transition-colors focus:border-brand-blue focus:outline-none"
                />
              </motion.div>
            ))}

            <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.24 }}>
              <label className="mb-2 block text-xs font-extrabold uppercase tracking-wide2 text-brand-deep dark:text-brand-cyan">
                {f.help}
              </label>
              <textarea
                required
                rows={4}
                placeholder={f.helpPh}
                className="w-full resize-none rounded-xl border border-content/15 bg-bg px-4 py-3.5 text-content placeholder:text-content/30 transition-colors focus:border-brand-blue focus:outline-none"
              />
            </motion.div>

            <button type="submit" className="btn-primary w-full justify-center">
              {f.send} <Chevron className="h-3.5 w-2.5" />
            </button>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  );
}
