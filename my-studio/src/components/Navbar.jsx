import { Link } from "react-router-dom";
import { ShieldCheck, Sparkles } from "lucide-react";

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 border-b border-slate-800/80 bg-slate-950/70 backdrop-blur-xl">
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <Link to="/" className="flex items-center gap-3 text-sm font-semibold tracking-[0.2em] text-slate-100 uppercase">
          <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-emerald-500/15 text-emerald-300 ring-1 ring-emerald-400/40">
            <ShieldCheck size={18} />
          </span>
          HM Studios
        </Link>

        <div className="hidden items-center gap-8 text-sm text-slate-300 md:flex">
          <Link to="/" className="transition hover:text-white">Home</Link>
          <Link to="/store" className="transition hover:text-white">Store</Link>
          <Link to="/book" className="transition hover:text-white">Consultation</Link>
          <Link to="/admin" className="transition hover:text-white">Admin</Link>
          <a href="https://wa.me/923018570942" target="_blank" rel="noreferrer" className="transition hover:text-white">
            WhatsApp
          </a>
        </div>

        <div className="flex items-center gap-3">
          <Link
            to="/admin"
            className="hidden rounded-full border border-slate-700 bg-slate-900/60 px-4 py-2 text-sm font-semibold text-white transition hover:border-slate-500 md:inline-flex"
          >
            Admin Portal
          </Link>
          <Link
            to="/store"
            className="inline-flex items-center gap-2 rounded-full border border-emerald-400/40 bg-emerald-500/10 px-4 py-2 text-sm font-semibold text-emerald-200 transition hover:bg-emerald-400 hover:text-slate-950"
          >
            <Sparkles size={16} />
            Buy now
          </Link>
        </div>
      </nav>
    </header>
  );
}