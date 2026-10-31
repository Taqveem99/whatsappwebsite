import { useState } from "react";

const WHATSAPP = "923001234567"; // yahan apna number likho, + ke baghair

export default function Book() {
  const [form, setForm] = useState({ name: "", email: "", day: "", time: "", tid: "" });

  const submit = (e) => {
    e.preventDefault();
    const msg =
      `Consultation Booking\nName: ${form.name}\nEmail: ${form.email}\n` +
      `Preferred day: ${form.day}\nTime: ${form.time}\nTransaction ID: ${form.tid}`;
    window.open(`https://wa.me/${WHATSAPP}?text=${encodeURIComponent(msg)}`, "_blank");
  };

  const input = "w-full p-3 rounded-lg bg-background border border-border";

  return (
    <main className="max-w-xl mx-auto px-6 pt-28 pb-24">
      <h1 className="text-4xl font-bold">Book a Consultation</h1>
      <p className="mt-3 text-muted">
        30 minute private call. Fee: PKR 3,000 (EasyPaisa) ya $11 (USDT).
      </p>

      <form onSubmit={submit} className="mt-8 space-y-4">
        <input required placeholder="Your name" className={input}
          onChange={(e) => setForm({ ...form, name: e.target.value })} />
        <input required type="email" placeholder="Your email" className={input}
          onChange={(e) => setForm({ ...form, email: e.target.value })} />
        <input required placeholder="Preferred day (e.g. Saturday)" className={input}
          onChange={(e) => setForm({ ...form, day: e.target.value })} />
        <input required placeholder="Preferred time (e.g. 6 PM)" className={input}
          onChange={(e) => setForm({ ...form, time: e.target.value })} />
        <input required placeholder="Payment transaction ID" className={input}
          onChange={(e) => setForm({ ...form, tid: e.target.value })} />
        <button className="w-full py-3 rounded-lg bg-emerald-500 text-black font-semibold">
          Send booking on WhatsApp
        </button>
      </form>
    </main>
  );
}