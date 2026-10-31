import { useMemo, useState } from "react";
import { plans } from "../data/plans";

const WHATSAPP = "923018570942";

export default function Store() {
  const [currency, setCurrency] = useState("USD");
  const [selected, setSelected] = useState(plans[1]);
  const [form, setForm] = useState({ email: "", method: "EasyPaisa", tid: "" });

  const currentPrice = useMemo(
    () => (currency === "USD" ? `$${selected.usd}` : `PKR ${selected.pkr.toLocaleString()}`),
    [currency, selected],
  );

  const submit = (e) => {
    e.preventDefault();
    const msg = [
      "New HM Studios order",
      `Plan: ${selected.name}`,
      `Price: ${currentPrice}`,
      `Email: ${form.email}`,
      `Payment method: ${form.method}`,
      `Transaction ID: ${form.tid}`,
      "Please confirm license and delivery details.",
    ].join("\n");

    window.open(`https://wa.me/${WHATSAPP}?text=${encodeURIComponent(msg)}`, "_blank");
  };

  return (
    <main className="mx-auto max-w-6xl px-6 pb-24 pt-12 md:pt-16">
      <section className="mb-10 text-center">
        <p className="mb-3 text-sm font-semibold uppercase tracking-[0.25em] text-emerald-300">HM DeepScan v1.0</p>
        <h1 className="text-4xl font-black text-white md:text-5xl">Choose the right recovery plan.</h1>
        <p className="mx-auto mt-4 max-w-2xl text-slate-400">
          Desktop-grade Android and WhatsApp forensic recovery tools with offline workflows and private support.
        </p>

        <div className="mt-8 inline-flex rounded-full border border-slate-700 bg-slate-900/60 p-1">
          {['USD', 'PKR'].map((option) => (
            <button
              key={option}
              type="button"
              onClick={() => setCurrency(option)}
              className={`rounded-full px-5 py-2 text-sm font-semibold transition ${
                currency === option ? "bg-emerald-400 text-slate-950" : "text-slate-300 hover:text-white"
              }`}
            >
              {option}
            </button>
          ))}
        </div>
      </section>

      <section className="grid gap-6 md:grid-cols-3">
        {plans.map((plan) => (
          <div
            key={plan.id}
            className={`glass-card rounded-[2rem] p-6 ${plan.popular ? "border border-emerald-400/40 ring-1 ring-emerald-500/25" : ""}`}
          >
            {plan.popular && (
              <div className="mb-4 inline-flex rounded-full border border-emerald-400/40 bg-emerald-500/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-emerald-200">
                Most popular
              </div>
            )}
            <h2 className="text-2xl font-bold text-white">{plan.name}</h2>
            <p className="mt-2 text-sm text-slate-400">{plan.subtitle}</p>
            <div className="mt-6 text-4xl font-black text-white">
              {currency === "USD" ? `$${plan.usd}` : `PKR ${plan.pkr.toLocaleString()}`}
            </div>
            <div className="mt-1 text-sm text-slate-400">{plan.days}-day access</div>

            <ul className="mt-6 space-y-3 text-sm text-slate-300">
              {plan.features.map((feature) => (
                <li key={feature} className="flex items-start gap-3">
                  <span className="mt-1 text-emerald-300">•</span>
                  <span>{feature}</span>
                </li>
              ))}
            </ul>

            <button
              type="button"
              onClick={() => setSelected(plan)}
              className={`mt-8 w-full rounded-full px-4 py-3 text-sm font-semibold transition ${
                selected.id === plan.id ? "bg-emerald-400 text-slate-950" : "border border-slate-700 bg-slate-900/50 text-white hover:border-slate-500"
              }`}
            >
              {selected.id === plan.id ? "Selected" : "Select plan"}
            </button>
          </div>
        ))}
      </section>

      <section className="mx-auto mt-14 max-w-2xl rounded-[2rem] border border-slate-800 bg-slate-950/80 p-6 md:p-8">
        <div className="mb-4 text-sm font-semibold uppercase tracking-[0.25em] text-emerald-300">Order confirmation</div>
        <h3 className="text-2xl font-bold text-white">{selected.name}</h3>
        <p className="mt-2 text-slate-400">Total: {currentPrice}</p>

        <form onSubmit={submit} className="mt-6 space-y-4">
          <div>
            <label className="mb-2 block text-sm text-slate-300">Email address</label>
            <input
              required
              type="email"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              placeholder="you@example.com"
              className="w-full rounded-2xl border border-slate-700 bg-slate-900 px-4 py-3 text-slate-100 placeholder:text-slate-500 outline-none ring-0 transition focus:border-emerald-400"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm text-slate-300">Payment method</label>
            <select
              value={form.method}
              onChange={(e) => setForm({ ...form, method: e.target.value })}
              className="w-full rounded-2xl border border-slate-700 bg-slate-900 px-4 py-3 text-slate-100 outline-none transition focus:border-emerald-400"
            >
              <option>EasyPaisa</option>
              <option>Binance Pay (USDT)</option>
            </select>
          </div>

          <div>
            <label className="mb-2 block text-sm text-slate-300">Transaction ID</label>
            <input
              required
              value={form.tid}
              onChange={(e) => setForm({ ...form, tid: e.target.value })}
              placeholder="TXN-000000"
              className="w-full rounded-2xl border border-slate-700 bg-slate-900 px-4 py-3 text-slate-100 placeholder:text-slate-500 outline-none transition focus:border-emerald-400"
            />
          </div>

          <button type="submit" className="w-full rounded-full bg-emerald-400 px-5 py-3 text-sm font-semibold text-slate-950 transition hover:bg-emerald-300">
            Submit order on WhatsApp
          </button>
        </form>
      </section>
    </main>
  );
}