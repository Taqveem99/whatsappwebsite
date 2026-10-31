import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight, BadgeCheck, Shield, Smartphone, Skull } from "lucide-react";

const trustItems = ["100% Offline", "WhatsApp Crypt14", "Deep Sector Recovery", "EXIF GPS Metadata"];

export default function Hero() {
  return (
    <section className="relative overflow-hidden">
      <div className="grid-pattern absolute inset-0 opacity-40" />
      <div
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage:
            "linear-gradient(rgba(9, 14, 24, 0.7), rgba(9, 14, 24, 0.8)), url('https://images.unsplash.com/photo-1526379095098-d400fd0bf935?auto=format&fit=crop&w=1400&q=80')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />
      <div className="relative mx-auto max-w-6xl px-6 pb-16 pt-10 md:pt-16">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="grid items-center gap-12 lg:grid-cols-[1.2fr_0.8fr]"
        >
          <div>
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-emerald-400/30 bg-emerald-500/10 px-3 py-1 text-xs font-medium uppercase tracking-[0.2em] text-emerald-200">
              <Shield size={14} />
              Founder-led cyber lab
            </div>

            <h1 className="max-w-xl text-balance text-4xl font-black tracking-tight text-white md:text-6xl">
              Taqveem Ulhaq — Founder & Digital Recovery Architect
            </h1>

            <p className="mt-6 max-w-xl text-lg leading-8 text-slate-300">
              Independent digital forensics, data recovery, and cybersecurity engineering. Taqveem Ulhaq delivers
              premium Android & WhatsApp recovery with offline access, deep carving, and private forensic workflows.
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-4">
              <Link
                to="/store"
                className="inline-flex items-center gap-2 rounded-full bg-emerald-400 px-6 py-3 text-sm font-semibold text-slate-950 transition hover:bg-emerald-300"
              >
                Buy HM DeepScan
                <ArrowRight size={16} />
              </Link>
              <Link
                to="/book"
                className="inline-flex items-center gap-2 rounded-full border border-slate-700 bg-slate-900/60 px-6 py-3 text-sm font-semibold text-white transition hover:border-emerald-400/30 hover:text-emerald-200"
              >
                Book a consultation
              </Link>
            </div>

            <div className="mt-8 flex flex-wrap gap-3 text-sm text-slate-300">
              {trustItems.map((item) => (
                <span key={item} className="inline-flex items-center gap-2 rounded-full border border-slate-700 bg-slate-900/50 px-3 py-1.5">
                  <BadgeCheck size={14} className="text-emerald-300" />
                  {item}
                </span>
              ))}
            </div>
          </div>

          <div className="relative">
            <div className="glass-card cyan-ring relative overflow-hidden rounded-3xl p-6">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_rgba(16,185,129,0.18),transparent_35%)]" />
              <div className="relative space-y-5">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs uppercase tracking-[0.22em] text-emerald-200">HM DeepScan v1.0</p>
                    <h2 className="mt-2 text-3xl font-bold text-white">Android & WhatsApp Recovery</h2>
                  </div>
                  <div className="rounded-2xl border border-emerald-400/30 bg-emerald-500/10 p-3 text-emerald-200">
                    <Skull size={20} />
                  </div>
                </div>

                <div className="grid gap-3 sm:grid-cols-2">
                  <div className="rounded-2xl border border-slate-700 bg-slate-900/60 p-4">
                    <Smartphone className="mb-3 text-emerald-300" size={20} />
                    <div className="text-sm text-slate-400">Device acquisition</div>
                    <div className="mt-2 text-lg font-semibold text-white">USB Debugging & forensic scan</div>
                  </div>
                  <div className="rounded-2xl border border-slate-700 bg-slate-900/60 p-4">
                    <Shield className="mb-3 text-emerald-300" size={20} />
                    <div className="text-sm text-slate-400">Crypt14 & evidence</div>
                    <div className="mt-2 text-lg font-semibold text-white">Decrypt WhatsApp databases</div>
                  </div>
                </div>

                <div className="space-y-3 rounded-2xl border border-slate-700 bg-slate-950/70 p-4">
                  <div className="flex items-center justify-between text-sm text-slate-300">
                    <span>Deleted media recovery</span>
                    <span className="font-semibold text-emerald-200">91%</span>
                  </div>
                  <div className="h-2 rounded-full bg-slate-800">
                    <div className="h-2 w-[91%] rounded-full bg-gradient-to-r from-emerald-400 to-cyan-400" />
                  </div>

                  <div className="flex items-center justify-between text-sm text-slate-300">
                    <span>EXIF GPS extraction</span>
                    <span className="font-semibold text-cyan-200">98%</span>
                  </div>
                  <div className="h-2 rounded-full bg-slate-800">
                    <div className="h-2 w-[98%] rounded-full bg-gradient-to-r from-cyan-400 to-blue-400" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

