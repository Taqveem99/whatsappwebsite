import { motion } from "framer-motion";
import { Link } from "react-router-dom";

export default function Hero() {
  return (
    <section className="min-h-screen flex items-center pt-16">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="max-w-4xl mx-auto px-6 text-center"
      >
        <h1 className="text-5xl md:text-7xl font-bold tracking-tight">
          Recover what you thought was <span className="text-emerald-400">lost</span>.
        </h1>
        <p className="mt-6 text-lg text-muted">
          One-sentence description of your software and who it's for.
        </p>
        <div className="mt-10 flex gap-4 justify-center">
          <Link to="/store" className="px-6 py-3 rounded-lg bg-emerald-500 text-black font-semibold">
            Get the software
          </Link>
          <Link to="/book" className="px-6 py-3 rounded-lg border border-border">
            Book a consultation
          </Link>
        </div>
      </motion.div>
    </section>
  );
}

import { HardDrive, Lock, MapPin, WifiOff } from "lucide-react";

const features = [
  { icon: HardDrive, title: "Deep scan", text: "Describe feature 1." },
  { icon: Lock, title: "Decryption", text: "Describe feature 2." },
  { icon: MapPin, title: "Metadata", text: "Describe feature 3." },
  { icon: WifiOff, title: "100% offline", text: "Describe feature 4." },
];

export default function Features() {
  return (
    <section className="max-w-6xl mx-auto px-6 py-24 grid md:grid-cols-2 lg:grid-cols-4 gap-6">
      {features.map(({ icon: Icon, title, text }) => (
        <div key={title} className="p-6 rounded-xl bg-card border border-border">
          <Icon className="text-emerald-400 mb-4" />
          <h3 className="font-semibold">{title}</h3>
          <p className="mt-2 text-sm text-muted">{text}</p>
        </div>
      ))}
    </section>
  );
}