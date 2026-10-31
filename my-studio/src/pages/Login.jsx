import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowRight, LockKeyhole } from "lucide-react";

export default function Login() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: "taqveemhacker@gmail.com", password: "Admin@12345" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || "Login failed");
      }

      localStorage.setItem("hm-admin-token", data.token);
      navigate("/admin", { replace: true });
    } catch (err) {
      setError(err.message || "Unable to login");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="mx-auto flex min-h-[70vh] max-w-5xl items-center justify-center px-6 py-20">
      <div className="grid w-full max-w-4xl overflow-hidden rounded-[2rem] border border-slate-800 bg-slate-950/80 shadow-2xl shadow-emerald-950/20 md:grid-cols-2">
        <div className="hidden bg-[radial-gradient(circle_at_top,_rgba(16,185,129,0.18),transparent_35%),linear-gradient(180deg,rgba(15,23,42,0.9),rgba(2,6,23,0.9))] p-8 md:block">
          <div className="flex h-full flex-col justify-between">
            <div>
              <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-500/10 text-emerald-300 ring-1 ring-emerald-400/30">
                <LockKeyhole size={24} />
              </div>
              <div className="text-sm uppercase tracking-[0.23em] text-emerald-300">Secure access</div>
              <h1 className="mt-4 text-4xl font-black text-white">HM Admin Portal</h1>
            </div>
            <p className="max-w-sm text-sm leading-7 text-slate-300">
              Manage orders, bookings, customer leads, and AI-assisted marketing and support messaging from one place.
            </p>
          </div>
        </div>

        <div className="p-8 md:p-10">
          <div className="mb-6 text-sm uppercase tracking-[0.22em] text-emerald-300">Sign in</div>
          <h2 className="text-3xl font-black text-white">Welcome back</h2>
          <form onSubmit={handleSubmit} className="mt-8 space-y-5">
            <div>
              <label className="mb-2 block text-sm text-slate-300">Email</label>
              <input
                type="email"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                className="w-full rounded-2xl border border-slate-700 bg-slate-900 px-4 py-3 text-slate-100 outline-none transition focus:border-emerald-400"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm text-slate-300">Password</label>
              <input
                type="password"
                value={form.password}
                onChange={(e) => setForm({ ...form, password: e.target.value })}
                className="w-full rounded-2xl border border-slate-700 bg-slate-900 px-4 py-3 text-slate-100 outline-none transition focus:border-emerald-400"
              />
            </div>

            {error && <div className="rounded-xl border border-red-500/30 bg-red-500/10 px-3 py-2 text-sm text-red-200">{error}</div>}

            <button
              type="submit"
              disabled={loading}
              className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-emerald-400 px-5 py-3 text-sm font-semibold text-slate-950 transition hover:bg-emerald-300 disabled:cursor-not-allowed disabled:opacity-70"
            >
              {loading ? "Signing in..." : "Sign in"}
              <ArrowRight size={16} />
            </button>
          </form>

          <div className="mt-8 rounded-2xl border border-slate-700 bg-slate-900/70 p-4 text-xs text-slate-400">
            Advanced admin access: taqveemhacker@gmail.com / Admin@12345
          </div>
        </div>
      </div>
    </main>
  );
}
