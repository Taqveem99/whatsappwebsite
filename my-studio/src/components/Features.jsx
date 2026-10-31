import { FileSearch, LockKeyhole, MapPinned, WifiOff } from "lucide-react";

const features = [
  {
    icon: FileSearch,
    title: "Deep sector extraction",
    text: "Carves deleted files from Android storage and recovers lost media beyond standard indexed folders.",
  },
  {
    icon: LockKeyhole,
    title: "WhatsApp Crypt14 decryption",
    text: "Access protected local databases and recover deleted conversations, attachments, and media files.",
  },
  {
    icon: MapPinned,
    title: "EXIF GPS metadata",
    text: "Extract geolocation from media with evidence-focused documentation for investigation and recovery workflows.",
  },
  {
    icon: WifiOff,
    title: "100% offline workflow",
    text: "No cloud dependency, no external transmission, and a privacy-first process designed for sensitive files.",
  },
];

export default function Features() {
  return (
    <section className="mx-auto max-w-6xl px-6 py-20">
      <div className="mb-10 max-w-2xl">
        <p className="mb-3 text-sm font-semibold uppercase tracking-[0.25em] text-emerald-300">What HM DeepScan does</p>
        <h2 className="text-3xl font-bold text-white md:text-4xl">Built for recovery, verification, and evidence clarity.</h2>
      </div>

      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
        {features.map(({ icon: Icon, title, text }) => (
          <div key={title} className="glass-card rounded-3xl p-6">
            <div className="mb-5 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-500/12 text-emerald-300 ring-1 ring-emerald-400/30">
              <Icon size={22} />
            </div>
            <h3 className="text-xl font-semibold text-white">{title}</h3>
            <p className="mt-3 text-sm leading-7 text-slate-400">{text}</p>
          </div>
        ))}
      </div>
    </section>
  );
}