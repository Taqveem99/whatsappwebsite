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