import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="border-t border-border mt-10">
      <div className="max-w-6xl mx-auto px-6 py-10 flex flex-col md:flex-row justify-between gap-6 text-sm text-muted">
        <p>© 2026 YourBrand. All rights reserved.</p>
        <div className="flex gap-6">
          <Link to="/store" className="hover:text-foreground">Store</Link>
          <Link to="/book" className="hover:text-foreground">Consultation</Link>
          <a href="mailto:you@example.com" className="hover:text-foreground">Email</a>
        </div>
      </div>
    </footer>
  );
}