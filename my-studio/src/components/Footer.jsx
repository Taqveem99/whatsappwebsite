import { Link } from "react-router-dom";

const socialLinks = [
  { label: "Instagram", href: "https://www.instagram.com/hmstudios.tech" },
  { label: "YouTube", href: "https://youtube.com/@hmstudiostech" },
  { label: "TikTok", href: "https://www.tiktok.com/@hmstudiostech" },
  { label: "X", href: "https://x.com/hmstudiostech" },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/haris-mehmood-b07790335" },
];

export default function Footer() {
  return (
    <footer className="border-t border-slate-800/80 bg-slate-950/70">
      <div className="mx-auto grid max-w-6xl gap-8 px-6 py-12 md:grid-cols-[1.2fr_0.8fr_1fr]">
        <div>
          <div className="mb-4 text-sm font-semibold uppercase tracking-[0.2em] text-emerald-300">Taqveem Ulhaq</div>
          <p className="max-w-md text-sm text-slate-400">
            Founder-led digital forensics, data recovery, and cybersecurity engineering for Android,
            WhatsApp, and evidence preservation workflows.
          </p>
        </div>

        <div>
          <h3 className="mb-4 text-sm font-semibold uppercase tracking-[0.18em] text-slate-200">Explore</h3>
          <div className="space-y-2 text-sm text-slate-400">
            <Link to="/" className="block hover:text-white">Home</Link>
            <Link to="/store" className="block hover:text-white">Store</Link>
            <Link to="/book" className="block hover:text-white">Consultation</Link>
          </div>
        </div>

        <div>
          <h3 className="mb-4 text-sm font-semibold uppercase tracking-[0.18em] text-slate-200">Connect</h3>
          <div className="space-y-2 text-sm text-slate-400">
            {socialLinks.map(({ label, href }) => (
              <a key={label} href={href} target="_blank" rel="noreferrer" className="block hover:text-white">
                {label}
              </a>
            ))}
            <a href="mailto:taqveemhacker@gmail.com" className="block hover:text-white">taqveemhacker@gmail.com</a>
            <a href="mailto:taqveemulhaq97@gmail.com" className="block hover:text-white">taqveemulhaq97@gmail.com</a>
            <a href="https://wa.me/923018570942" target="_blank" rel="noreferrer" className="block hover:text-white">WhatsApp: +92 301 8570942</a>
          </div>
        </div>
      </div>

      <div className="border-t border-slate-800/80 py-5 text-center text-xs text-slate-500">
        © 2026 Taqveem Ulhaq. Built for recovery, evidence, and cybersecurity clarity.
      </div>
    </footer>
  );
}