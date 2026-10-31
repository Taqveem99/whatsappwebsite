import { useState } from "react";
import { plans } from "../data/plans";

const WHATSAPP = "92XXXXXXXXXX"; // your number, country code, no + sign

export default function Store() {
  const [currency, setCurrency] = useState("USD");
  const [selected, setSelected] = useState(null);
  const [form, setForm] = useState({ email: "", method: "EasyPaisa", tid: "" });

  const submit = (e) => {
    e.preventDefault();
    const price = currency === "USD" ? `$${selected.usd}` : `PKR ${selected.pkr}`;
    const msg =
      `New order\nPlan: ${selected.name}\nPrice: ${price}\n` +
      `Email: ${form.email}\nPaid via: ${form.method}\nTransaction ID: ${form.tid}`;
    window.open(`https://wa.me/${WHATSAPP}?text=${encodeURIComponent(msg)}`, "_blank");
  };

  return (
    <main className="max-w-6xl mx-auto px-6 pt-28 pb-24">
      <h1 className="text-4xl font-bold text-center">Store</h1>
      <div className="flex justify-center gap-2 mt-6">
        {["USD", "PKR"].map((c) => (
          <button key={c} onClick={() => setCurrency(c)}
            className={`px-4 py-2 rounded-lg border border-border ${currency === c ? "bg-emerald-500 text-black" : ""}`}>
            {c}
          </button>
        ))}
      </div>

      <div className="grid md:grid-cols-3 gap-6 mt-10">
        {plans.map((p) => (
          <div key={p.id} className={`p-6 rounded-xl bg-card border ${p.popular ? "border-emerald-500" : "border-border"}`}>
            <h3 className="text-xl font-semibold">{p.name}</h3>
            <p className="text-sm text-muted">{p.days} days access</p>
            <p className="text-4xl font-bold my-4">
              {currency === "USD" ? `$${p.usd}` : `PKR ${p.pkr.toLocaleString()}`}
            </p>
            <ul className="text-sm text-muted space-y-1 mb-6">
              {p.features.map((f) => <li key={f}>• {f}</li>)}
            </ul>
            <button onClick={() => setSelected(p)} className="w-full py-3 rounded-lg bg-emerald-500 text-black font-semibold">
              Select
            </button>
          </div>
        ))}
      </div>

      {selected && (
        <form onSubmit={submit} className="max-w-md mx-auto mt-12 p-6 rounded-xl bg-card border border-border space-y-4">
          <h2 className="font-semibold">Order: {selected.name}</h2>
          <p className="text-sm text-muted">
            Send payment to EasyPaisa: 03XX-XXXXXXX (Name) or Binance Pay ID: XXXXXXXX, then fill this in.
          </p>
          <input required type="email" placeholder="Your email"
            className="w-full p-3 rounded-lg bg-background border border-border"
            onChange={(e) => setForm({ ...form, email: e.target.value })} />
          <select className="w-full p-3 rounded-lg bg-background border border-border"
            onChange={(e) => setForm({ ...form, method: e.target.value })}>
            <option>EasyPaisa</option>
            <option>Binance Pay (USDT)</option>
          </select>
          <input required placeholder="Transaction ID"
            className="w-full p-3 rounded-lg bg-background border border-border"
            onChange={(e) => setForm({ ...form, tid: e.target.value })} />
          <button className="w-full py-3 rounded-lg bg-emerald-500 text-black font-semibold">
            Submit order on WhatsApp
          </button>
        </form>
      )}
    </main>
  );
}