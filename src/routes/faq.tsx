import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { ChevronDown } from "lucide-react";

export const Route = createFileRoute("/faq")({
  head: () => ({
    meta: [
      { title: "FAQ — DriveEase" },
      { name: "description", content: "Answers to common questions about DriveEase rentals." },
    ],
  }),
  component: FAQ,
});

const ITEMS = [
  { q: "What do I need to rent a car?", a: "A valid driver's license, a credit card, and you must be at least 21 years old. For luxury and sports categories, minimum age is 25." },
  { q: "Is insurance included?", a: "Yes. Every booking includes full collision, theft, and third-party liability insurance at no extra cost. Premium zero-deductible coverage is available as an add-on." },
  { q: "Can I cancel my booking?", a: "Free cancellation up to 24 hours before pickup. Within 24 hours, a 20% fee applies." },
  { q: "What's the fuel policy?", a: "Same-to-same. Pick up full, return full. EV charging works the same way — we'll provide chargers and nearby station info." },
  { q: "Is there a security deposit?", a: "A pre-authorization of $500 is held at pickup and released within 5 business days of return." },
  { q: "Do you offer delivery?", a: "Yes. Home or hotel delivery is available in all major cities. Fees vary by location." },
  { q: "What if I return late?", a: "We offer a 29-minute grace period. Beyond that, hourly late fees apply at 1.5× the hourly rate." },
];

function FAQ() {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <div className="mx-auto max-w-3xl px-6 py-20">
      <span className="text-xs uppercase tracking-[0.2em] text-primary font-semibold">Help center</span>
      <h1 className="font-display text-5xl md:text-6xl font-bold mt-3 leading-tight">
        Frequently <span className="text-gradient-gold">asked</span>.
      </h1>
      <p className="mt-4 text-muted-foreground">
        Still have questions?{" "}
        <a href="/contact" className="text-primary hover:underline">
          Talk to us
        </a>
        .
      </p>

      <div className="mt-12 space-y-3">
        {ITEMS.map((item, i) => (
          <div key={i} className="glass rounded-2xl overflow-hidden">
            <button
              onClick={() => setOpen(open === i ? null : i)}
              className="w-full flex items-center justify-between p-5 text-left hover:bg-white/5 transition-smooth"
            >
              <span className="font-display text-lg font-semibold">{item.q}</span>
              <ChevronDown
                className={`h-5 w-5 text-primary flex-shrink-0 transition-smooth ${open === i ? "rotate-180" : ""}`}
              />
            </button>
            {open === i && (
              <div className="px-5 pb-5 text-muted-foreground leading-relaxed animate-fade-in">
                {item.a}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
