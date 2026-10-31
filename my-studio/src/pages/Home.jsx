import { CheckCircle2, ChevronRight, Mail, ShieldCheck, Smartphone, MessageSquareText } from "lucide-react";
import { Link } from "react-router-dom";
import Hero from "../components/Hero";
import Features from "../components/Features";

const process = [
  { step: "01", title: "Connect the device", text: "Enable USB debugging and prepare the Android / WhatsApp source device for safe offline acquisition." },
  { step: "02", title: "Run forensic scan", text: "Recover deleted media, message artifacts, and data structures from raw storage and app databases." },
  { step: "03", title: "Export evidence", text: "Organize recovered files with metadata, GPS EXIF data, and documentation-ready outputs." },
];

const faqs = [
  { q: "What is HM DeepScan v1.0?", a: "HM DeepScan v1.0 is a Windows 10/11 desktop forensic recovery suite built for Android and WhatsApp media/data recovery workflows." },
  { q: "Does it work offline?", a: "Yes. The workflow is designed to remain fully offline, keeping sensitive evidence and media on-device without cloud handoff." },
  { q: "Does it support deleted WhatsApp recovery?", a: "Yes. The suite includes deep recovery logic with WhatsApp Crypt14 decryption support for protected databases and deleted media." },
  { q: "Can I get private support?", a: "Yes. You can book a private 1-on-1 consultation with Haris Awan for complex recovery or cybersecurity questions." },
];

export default function Home() {
  return (
    <main>
      <Hero />
      <Features />

      <section className="mx-auto max-w-6xl px-6 py-8 md:py-12">
        <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
          <div className="glass-card rounded-3xl p-8">
            <p className="mb-4 text-sm font-semibold uppercase tracking-[0.22em] text-emerald-300">Why people choose HM</p>
            <h3 className="text-3xl font-bold text-white">Evidence-first recovery for real cases.</h3>
            <ul className="mt-8 space-y-4 text-slate-300">
              {[
                "Android & WhatsApp recovery built specifically for sensitive media restoration",
                "Offline-first architecture for privacy, control, and forensic integrity",
                "Private 1-on-1 consultations for technical guidance and case analysis",
              ].map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <CheckCircle2 size={20} className="mt-0.5 text-emerald-300" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="grid gap-6 sm:grid-cols-3">
            {[
              { icon: Smartphone, value: "Android", label: "Device recovery" },
              { icon: ShieldCheck, value: "Offline", label: "Private workflow" },
              { icon: MessageSquareText, value: "Crypt14", label: "WhatsApp decrypt" },
            ].map(({ icon: Icon, value, label }) => (
              <div key={label} className="glass-card rounded-3xl p-6 text-center">
                <div className="mx-auto mb-4 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-500/10 text-emerald-300 ring-1 ring-emerald-400/30">
                  <Icon size={20} />
                </div>
                <div className="text-2xl font-black text-white">{value}</div>
                <div className="mt-2 text-sm text-slate-400">{label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-20">
        <div className="mb-10 max-w-2xl">
          <p className="mb-3 text-sm font-semibold uppercase tracking-[0.25em] text-emerald-300">How it works</p>
          <h2 className="text-3xl font-bold text-white md:text-4xl">A structured yet practical recovery flow.</h2>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {process.map(({ step, title, text }) => (
            <div key={step} className="glass-card rounded-3xl p-6">
              <div className="mb-5 text-sm font-semibold uppercase tracking-[0.3em] text-emerald-300">{step}</div>
              <h3 className="text-xl font-semibold text-white">{title}</h3>
              <p className="mt-4 text-sm leading-7 text-slate-400">{text}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 pb-10">
        <div className="rounded-[2rem] border border-emerald-400/30 bg-gradient-to-br from-emerald-500/10 via-slate-900/80 to-slate-950 p-8 md:p-12">
          <div className="flex flex-col gap-8 md:flex-row md:items-center md:justify-between">
            <div>
              <p className="mb-3 text-sm font-semibold uppercase tracking-[0.22em] text-emerald-300">Private consultation</p>
              <h3 className="text-3xl font-bold text-white">Need technical guidance or a critical recovery case?</h3>
            </div>
            <Link to="/book" className="inline-flex items-center gap-2 self-start rounded-full bg-emerald-400 px-6 py-3 text-sm font-semibold text-slate-950 transition hover:bg-emerald-300">
              Book a session
              <ChevronRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-20">
        <div className="mb-10 max-w-2xl">
          <p className="mb-3 text-sm font-semibold uppercase tracking-[0.25em] text-emerald-300">FAQ</p>
          <h2 className="text-3xl font-bold text-white md:text-4xl">Common questions.</h2>
        </div>

        <div className="space-y-4">
          {faqs.map(({ q, a }) => (
            <details key={q} className="glass-card rounded-2xl p-5 text-left" open={q === faqs[0].q}>
              <summary className="cursor-pointer list-none text-lg font-semibold text-white">{q}</summary>
              <p className="mt-3 text-sm leading-7 text-slate-400">{a}</p>
            </details>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 pb-20">
        <div className="glass-card rounded-[2rem] p-8 md:p-12">
          <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
            <div>
              <p className="mb-3 text-sm font-semibold uppercase tracking-[0.25em] text-emerald-300">Official channels</p>
              <h3 className="text-3xl font-bold text-white">Connect directly with HM Studios.</h3>
            </div>
            <div className="flex flex-wrap gap-3">
              <a href="https://wa.me/923324171101" target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-full border border-emerald-400/30 bg-emerald-500/10 px-4 py-2 text-sm font-semibold text-emerald-200 transition hover:bg-emerald-400 hover:text-slate-950">
                <MessageSquareText size={16} /> WhatsApp
              </a>
              <a href="mailto:hmstudios.tech@gmail.com" className="inline-flex items-center gap-2 rounded-full border border-slate-700 bg-slate-900/60 px-4 py-2 text-sm font-semibold text-white transition hover:border-slate-500">
                <Mail size={16} /> Email
              </a>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}