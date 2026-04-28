import { Link } from "@tanstack/react-router";
import { Car, Menu, X } from "lucide-react";
import { useState, useEffect } from "react";

const links = [
  { to: "/", label: "Home" },
  { to: "/cars", label: "Cars" },
  { to: "/dashboard", label: "Dashboard" },
  { to: "/about", label: "About" },
  { to: "/contact", label: "Contact" },
] as const;

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-smooth ${
        scrolled ? "glass-strong border-b border-border" : "bg-transparent"
      }`}
    >
      <div className="mx-auto max-w-7xl px-6 h-18 flex items-center justify-between py-4">
        <Link to="/" className="flex items-center gap-2 group">
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-gold blur-md opacity-60 group-hover:opacity-100 transition-smooth" />
            <Car className="relative h-7 w-7 text-primary" strokeWidth={2.2} />
          </div>
          <span className="font-display text-xl font-bold tracking-tight">
            Drive<span className="text-gradient-gold">Ease</span>
          </span>
        </Link>

        <nav className="hidden md:flex items-center gap-1">
          {links.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              activeOptions={{ exact: l.to === "/" }}
              className="px-4 py-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-smooth rounded-lg hover:bg-white/5 data-[status=active]:text-foreground data-[status=active]:bg-white/5"
            >
              {l.label}
            </Link>
          ))}
        </nav>

        <div className="hidden md:flex items-center gap-3">
          <Link
            to="/cars"
            className="px-5 py-2.5 text-sm font-semibold bg-gradient-gold text-primary-foreground rounded-full shadow-glow hover:scale-105 transition-smooth"
          >
            Book a Car
          </Link>
        </div>

        <button
          className="md:hidden p-2 text-foreground"
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
        >
          {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {open && (
        <div className="md:hidden glass-strong border-t border-border animate-fade-in">
          <div className="px-6 py-4 space-y-1">
            {links.map((l) => (
              <Link
                key={l.to}
                to={l.to}
                onClick={() => setOpen(false)}
                className="block px-4 py-3 text-sm font-medium rounded-lg hover:bg-white/5"
              >
                {l.label}
              </Link>
            ))}
            <Link
              to="/cars"
              onClick={() => setOpen(false)}
              className="block mt-2 px-4 py-3 text-center text-sm font-semibold bg-gradient-gold text-primary-foreground rounded-full"
            >
              Book a Car
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
