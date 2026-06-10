"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Chevron } from "./Logo";

type Status = { type: "idle" | "loading" | "ok" | "error"; msg?: string };

const today = new Date().toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });

export default function AdminForm() {
  const router = useRouter();
  const formRef = useRef<HTMLFormElement>(null);
  const [status, setStatus] = useState<Status>({ type: "idle" });
  const [preview, setPreview] = useState<string | null>(null);

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus({ type: "loading" });
    try {
      const data = new FormData(e.currentTarget);
      const res = await fetch("/api/blogs", { method: "POST", body: data });
      const json = await res.json();
      if (!res.ok) throw new Error(json.error || "Failed to publish.");
      setStatus({ type: "ok", msg: `Published “${json.post.title}”.` });
      formRef.current?.reset();
      setPreview(null);
    } catch (err) {
      setStatus({ type: "error", msg: (err as Error).message });
    }
  };

  const logout = async () => {
    await fetch("/api/admin-login", { method: "DELETE" });
    router.refresh();
  };

  return (
    <main className="min-h-screen bg-bg bg-grid pb-24 pt-32">
      <div className="container-x max-w-3xl">
        <div className="flex items-start justify-between gap-4">
          <div>
            <span className="eyebrow">
              <span className="h-px w-8 bg-brand-cyan" />
              Admin
            </span>
            <h1 className="display mt-4 text-4xl text-content md:text-5xl">Add a blog post</h1>
          </div>
          <button
            onClick={logout}
            className="mt-2 shrink-0 rounded-full border border-content/15 px-4 py-2 text-xs font-extrabold uppercase tracking-brand text-content/70 transition-colors hover:border-brand-blue hover:text-brand-blue"
          >
            Log out
          </button>
        </div>

        <p className="mt-4 text-content/60">
          Fill in the details and publish — it appears on the{" "}
          <Link href="/blog" className="font-bold text-brand-blue hover:underline">
            blog page
          </Link>{" "}
          immediately.
        </p>

        <form ref={formRef} onSubmit={onSubmit} className="mt-10 space-y-6">
          <Field label="Title" required>
            <input name="title" required placeholder="The Competitive Edge of Cloud ERP" className={inputCls} />
          </Field>

          <div className="grid gap-6 sm:grid-cols-2">
            <Field label="Category">
              <input name="category" defaultValue="Technology" className={inputCls} />
            </Field>
            <Field label="Date">
              <input name="date" defaultValue={today} className={inputCls} />
            </Field>
          </div>

          <Field label="Excerpt" hint="Short summary shown on the card.">
            <textarea name="excerpt" rows={2} placeholder="A one or two line summary…" className={inputCls} />
          </Field>

          <Field label="Article body" hint="Separate paragraphs with a blank line.">
            <textarea name="body" rows={8} placeholder={"First paragraph…\n\nSecond paragraph…"} className={inputCls} />
          </Field>

          <Field label="Cover image" hint="Upload an image (or leave empty).">
            <input
              type="file"
              name="image"
              accept="image/*"
              onChange={(e) => {
                const f = e.target.files?.[0];
                setPreview(f ? URL.createObjectURL(f) : null);
              }}
              className="block w-full text-sm text-content/70 file:mr-4 file:rounded-full file:border-0 file:bg-brand-blue file:px-4 file:py-2 file:text-sm file:font-extrabold file:uppercase file:tracking-brand file:text-white hover:file:scale-[1.03]"
            />
          </Field>

          {preview && (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={preview} alt="preview" className="h-44 w-full rounded-2xl border border-content/10 object-cover" />
          )}

          <div className="flex flex-wrap items-center gap-4 pt-2">
            <button type="submit" disabled={status.type === "loading"} className="btn-primary disabled:opacity-60">
              {status.type === "loading" ? "Publishing…" : "Publish post"} <Chevron className="h-3.5 w-2.5" />
            </button>
            {status.type === "ok" && <span className="text-sm font-bold text-brand-cyan">✓ {status.msg}</span>}
            {status.type === "error" && <span className="text-sm font-bold text-red-400">✕ {status.msg}</span>}
          </div>
        </form>
      </div>
    </main>
  );
}

const inputCls =
  "w-full rounded-xl border border-content/15 bg-surface px-4 py-3 text-content placeholder:text-content/30 transition-colors focus:border-brand-blue focus:outline-none";

function Field({
  label,
  hint,
  required,
  children,
}: {
  label: string;
  hint?: string;
  required?: boolean;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <span className="mb-2 flex items-center gap-2 text-xs font-extrabold uppercase tracking-wide2 text-brand-deep dark:text-brand-cyan">
        {label}
        {required && <span className="text-red-400">*</span>}
        {hint && <span className="font-medium normal-case tracking-normal text-content/40">— {hint}</span>}
      </span>
      {children}
    </label>
  );
}
