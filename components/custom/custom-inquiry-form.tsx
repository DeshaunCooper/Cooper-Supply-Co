"use client";

import { useState } from "react";

const PROJECT_TYPES = [
  "Hat Design",
  "Apparel Graphics",
  "Brand Identity",
  "Event Merch",
  "Other",
];

export function CustomInquiryForm() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    projectType: "",
    budget: "",
    details: "",
  });

  function set(field: keyof typeof form) {
    return (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) =>
      setForm((prev) => ({ ...prev, [field]: e.target.value }));
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const subject = `Custom Work Inquiry: ${form.projectType || "Project"}`;
    const body = [
      `Name: ${form.name}`,
      `Email: ${form.email}`,
      `Project Type: ${form.projectType}`,
      `Budget: ${form.budget}`,
      ``,
      `Details:`,
      form.details,
    ].join("\n");
    window.location.href = `mailto:Hello@wedesignsstudio.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  }

  const inputClass =
    "w-full rounded-2xl border border-black/10 bg-white px-5 py-3.5 text-sm outline-none placeholder:text-black/30 focus:border-black/25";

  return (
    <form onSubmit={handleSubmit} className="mt-8 grid gap-4 sm:grid-cols-2">
      <div>
        <label className="mb-1.5 block text-[10px] font-semibold uppercase tracking-[0.28em] text-black/40">Name</label>
        <input
          required
          type="text"
          placeholder="Your name"
          value={form.name}
          onChange={set("name")}
          className={inputClass}
        />
      </div>
      <div>
        <label className="mb-1.5 block text-[10px] font-semibold uppercase tracking-[0.28em] text-black/40">Email</label>
        <input
          required
          type="email"
          placeholder="your@email.com"
          value={form.email}
          onChange={set("email")}
          className={inputClass}
        />
      </div>
      <div>
        <label className="mb-1.5 block text-[10px] font-semibold uppercase tracking-[0.28em] text-black/40">Project Type</label>
        <select
          required
          value={form.projectType}
          onChange={set("projectType")}
          className={inputClass}
        >
          <option value="" disabled>Select a type</option>
          {PROJECT_TYPES.map((t) => (
            <option key={t} value={t}>{t}</option>
          ))}
        </select>
      </div>
      <div>
        <label className="mb-1.5 block text-[10px] font-semibold uppercase tracking-[0.28em] text-black/40">Budget</label>
        <input
          type="text"
          placeholder="e.g. $200, $500–$1000, flexible"
          value={form.budget}
          onChange={set("budget")}
          className={inputClass}
        />
      </div>
      <div className="sm:col-span-2">
        <label className="mb-1.5 block text-[10px] font-semibold uppercase tracking-[0.28em] text-black/40">Project Details</label>
        <textarea
          required
          rows={5}
          placeholder="Describe your project. The more detail, the faster we can scope it."
          value={form.details}
          onChange={set("details")}
          className={`${inputClass} resize-none`}
        />
      </div>
      <div className="sm:col-span-2">
        <button
          type="submit"
          className="rounded-full bg-black px-8 py-3.5 text-[11px] font-bold uppercase tracking-[0.22em] text-white transition-opacity hover:opacity-80"
        >
          Send Inquiry
        </button>
        <p className="mt-3 text-[11px] text-black/30">
          Opens your email client — sends to Hello@wedesignsstudio.com
        </p>
      </div>
    </form>
  );
}
