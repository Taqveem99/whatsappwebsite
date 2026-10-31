import { Link } from "react-router-dom";
import { Shield } from "lucide-react";

export default function Navbar() {
  return (
    <header className="fixed top-0 inset-x-0 z-50 backdrop-blur bg-background/70 border-b border-border">
      <nav className="max-w-6xl mx-auto flex items-center justify-between px-6 h-16">
        <Link to="/" className="flex items-center gap-2 font-bold">
          <Shield className="text-emerald-400" size={22} /> YourBrand
        </Link>
        <div className="flex items-center gap-6 text-sm text-muted">
          <Link to="/store" className="hover:text-foreground">Store</Link>
          <Link to="/book" className="hover:text-foreground">Consultation</Link>
          <Link to="/store" className="px-4 py-2 rounded-lg bg-emerald-500 text-black font-semibold">
            Buy now
          </Link>
        </div>
      </nav>
    </header>
  );
}