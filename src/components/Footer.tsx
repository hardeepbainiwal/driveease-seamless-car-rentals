import { Link } from "@tanstack/react-router";
import { Car, Instagram, Twitter, Facebook, Youtube } from "lucide-react";

export function Footer() {
  return (
    <footer className="relative mt-32 border-t border-border glass-strong">
      <div className="mx-auto max-w-7xl px-6 py-16 grid gap-12 md:grid-cols-4">
        <div>
          <div className="flex items-center gap-2 mb-4">
            <Car className="h-6 w-6 text-primary" />
            <span className="font-display text-lg font-bold">
              Drive<span className="text-gradient-gold">Ease</span>
            </span>
          </div>
          <p className="text-sm text-muted-foreground max-w-xs leading-relaxed">
            Luxury car rentals, reimagined. Drive the extraordinary on your terms — anywhere, anytime.
          </p>
          <div className="flex gap-3 mt-6">
            {[Instagram, Twitter, Facebook, Youtube].map((Icon, i) => (
              <a
                key={i}
                href="#"
                className="h-9 w-9 flex items-center justify-center rounded-full glass hover:bg-primary hover:text-primary-foreground transition-smooth"
              >
                <Icon className="h-4 w-4" />
              </a>
            ))}
          </div>
        </div>

        {[
          {
            title: "Explore",
            items: [
              { label: "All Cars", to: "/cars" },
              { label: "Luxury", to: "/cars" },
              { label: "SUVs", to: "/cars" },
              { label: "Electric", to: "/cars" },
            ],
          },
          {
            title: "Company",
            items: [
              { label: "About", to: "/about" },
              { label: "Contact", to: "/contact" },
              { label: "FAQ", to: "/faq" },
              { label: "Careers", to: "/about" },
            ],
          },
          {
            title: "Legal",
            items: [
              { label: "Terms", to: "/faq" },
              { label: "Privacy", to: "/faq" },
              { label: "Cookies", to: "/faq" },
              { label: "Licenses", to: "/faq" },
            ],
          },
        ].map((col) => (
          <div key={col.title}>
            <h4 className="font-display font-semibold mb-4 text-sm uppercase tracking-wider text-muted-foreground">
              {col.title}
            </h4>
            <ul className="space-y-3">
              {col.items.map((item) => (
                <li key={item.label}>
                  <Link
                    to={item.to}
                    className="text-sm text-foreground/80 hover:text-primary transition-smooth"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="border-t border-border py-6 px-6 text-center text-xs text-muted-foreground">
        © {new Date().getFullYear()} DriveEase. All rights reserved. Crafted for those who drive with intent.
      </div>
    </footer>
  );
}
