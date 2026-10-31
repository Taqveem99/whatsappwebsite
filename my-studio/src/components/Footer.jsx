import { Link } from "react-router-dom";
import { Mail, Twitter, Github, Linkedin } from "lucide-react"; // Icons

export default function Footer() {
  return (
    <footer className="border-t border-border bg-background mt-auto">
      <div className="max-w-6xl mx-auto px-6 py-12 flex flex-col md:flex-row justify-between items-center gap-6">
        
        {/* Left Side: Copyright */}
        <div className="text-sm text-muted">
          © {new Date().getFullYear()} YourBrand. All rights reserved.
        </div>

        {/* Middle: Legal Links */}
        <div className="flex gap-6 text-sm text-muted">
          <Link to="/terms" className="hover:text-foreground transition">Terms</Link>
          <Link to="/privacy" className="hover:text-foreground transition">Privacy</Link>
          <Link to="/refund" className="hover:text-foreground transition">Refund</Link>
        </div>

        {/* Right Side: Social & Email */}
        <div className="flex items-center gap-4 text-muted">
          <a href="mailto:your@email.com" className="hover:text-foreground transition">
            <Mail size={20} />
          </a>
          <a href="https://twitter.com/yourusername" target="_blank" rel="noreferrer" className="hover:text-foreground transition">
            <Twitter size={20} />
          </a>
          <a href="https://github.com/yourusername" target="_blank" rel="noreferrer" className="hover:text-foreground transition">
            <Github size={20} />
          </a>
        </div>

      </div>
    </footer>
  );
}