import { useState } from "react";

const WHATSAPP = "923018570942";

export default function Book() {
  const [form, setForm] = useState({ name: "", email: "", day: "", time: "", tid: "" });

  const submit = (e) => {
    e.preventDefault();
    const msg = [
      "Private HM Studios consultation booking",
      `Name: ${form.name}`,
      `Email: ${form.email}`,
      `Preferred day: ${form.day}`,
      `Preferred time: ${form.time}`,
      `Transaction ID: ${form.tid}`,
      "Please confirm the consultation slot.",
    ].join("\n");

    window.open(`https://wa.me/${WHATSAPP}?text=${encodeURIComponent(msg)}`, "_blank");
  };

  return (
    <main className="mx-auto max-w-2xl px-6 pb-24 pt-12 md:pt-16">
      <div className="mb-8 text-center">
        <p className="mb-3 text-sm font-semibold uppercase tracking-[0.25em] text-emerald-300">Private consultation</p>
        <h1 className="text-4xl font-black text-white md:text-5xl">Book a 1-on-1 session with Haris Awan.</h1>
        <p className="mx-auto mt-4 max-w-xl text-slate-400">
          30-minute weekend consultation for data recovery, digital forensics, and cybersecurity guidance.
          Fee: PKR 3,000 or $11 USDT.
        </p>
      </div>

      <form onSubmit={submit} className="glass-card rounded-[2rem] p-6 md:p-8">
        <div className="space-y-4">
          <div>
            <label className="mb-2 block text-sm text-slate-300">Your name</label>
            <input
              required
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              placeholder="Full name"
              className="w-full rounded-2xl border border-slate-700 bg-slate-900 px-4 py-3 text-slate-100 placeholder:text-slate-500 outline-none transition focus:border-emerald-400"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm text-slate-300">Email address</label>
            <input
              required
              type="email"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              placeholder="you@example.com"
              className="w-full rounded-2xl border border-slate-700 bg-slate-900 px-4 py-3 text-slate-100 placeholder:text-slate-500 outline-none transition focus:border-emerald-400"
            />
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <label className="mb-2 block text-sm text-slate-300">Preferred day</label>
              <input
                required
                value={form.day}
                onChange={(e) => setForm({ ...form, day: e.target.value })}
                placeholder="Saturday"
                className="w-full rounded-2xl border border-slate-700 bg-slate-900 px-4 py-3 text-slate-100 placeholder:text-slate-500 outline-none transition focus:border-emerald-400"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm text-slate-300">Preferred time</label>
              <input
                required
                value={form.time}
                onChange={(e) => setForm({ ...form, time: e.target.value })}
                placeholder="6 PM"
                className="w-full rounded-2xl border border-slate-700 bg-slate-900 px-4 py-3 text-slate-100 placeholder:text-slate-500 outline-none transition focus:border-emerald-400"
              />
            </div>
          </div>

          <div>
            <label className="mb-2 block text-sm text-slate-300">Transaction ID</label>
            <input
              required
              value={form.tid}
              onChange={(e) => setForm({ ...form, tid: e.target.value })}
              placeholder="Payment reference"
              className="w-full rounded-2xl border border-slate-700 bg-slate-900 px-4 py-3 text-slate-100 placeholder:text-slate-500 outline-none transition focus:border-emerald-400"
            />
          </div>
        </div>

        <button type="submit" className="mt-6 w-full rounded-full bg-emerald-400 px-5 py-3 text-sm font-semibold text-slate-950 transition hover:bg-emerald-300">
          Send booking on WhatsApp
        </button>
      </form>
    </main>
  );
}