"use client";

import { useState } from "react";

export function DropNotifyForm() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email.trim()) return;
    setSubmitted(true);
  }

  if (submitted) {
    return (
      <div className="mt-6 rounded-full border border-black/10 bg-[#F5F0E6] px-6 py-3 text-sm font-medium text-black/60 inline-block">
        You're on the list. We'll signal when it drops.
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="mt-6 flex w-full max-w-sm flex-col gap-2.5 sm:flex-row">
      <input
        type="email"
        required
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email address"
        className="flex-1 rounded-full border border-black/10 bg-[#F5F0E6] px-5 py-2.5 text-sm outline-none placeholder:text-black/30 focus:border-black/25"
      />
      <button
        type="submit"
        className="rounded-full bg-black px-5 py-2.5 text-[10px] font-bold uppercase tracking-[0.2em] text-white transition-opacity hover:opacity-80"
      >
        Notify Me
      </button>
    </form>
  );
}
