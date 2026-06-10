"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Chevron } from "./Logo";

export default function AdminLogin() {
  const router = useRouter();
  const [pw, setPw] = useState("");
  const [err, setErr] = useState("");
  const [loading, setLoading] = useState(false);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErr("");
    const fd = new FormData();
    fd.set("password", pw);
    const res = await fetch("/api/admin-login", { method: "POST", body: fd });
    if (res.ok) {
      router.refresh();
    } else {
      setErr("Incorrect password.");
      setLoading(false);
    }
  };

  return (
    <main className="flex min-h-screen items-center justify-center bg-bg bg-grid px-4">
      <form onSubmit={submit} className="w-full max-w-sm rounded-3xl border border-content/10 bg-surface p-8 shadow-card">
        <span className="eyebrow">
          <span className="h-px w-8 bg-brand-cyan" />
          Admin
        </span>
        <h1 className="display mt-4 text-2xl text-content">Sign in</h1>
        <p className="mt-2 text-sm text-content/60">Enter the admin password to continue.</p>

        <input
          type="password"
          value={pw}
          onChange={(e) => setPw(e.target.value)}
          placeholder="Password"
          autoFocus
          className="mt-6 w-full rounded-xl border border-content/15 bg-bg px-4 py-3 text-content placeholder:text-content/30 focus:border-brand-blue focus:outline-none"
        />
        {err && <p className="mt-3 text-sm font-bold text-red-400">{err}</p>}

        <button disabled={loading} className="btn-primary mt-6 w-full justify-center disabled:opacity-60">
          {loading ? "Checking…" : "Enter"} <Chevron className="h-3.5 w-2.5" />
        </button>
      </form>
    </main>
  );
}
