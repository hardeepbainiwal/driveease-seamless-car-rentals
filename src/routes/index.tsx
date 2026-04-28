import { createFileRoute, Link } from "@tanstack/react-router";
import { MapPin, Calendar, Search, Shield, Zap, Headphones, Award, ChevronRight, Star } from "lucide-react";
import heroCar from "@/assets/hero-car.jpg";
import { CARS } from "@/data/cars";
import { CarCard } from "@/components/CarCard";

export const Route = createFileRoute("/")({
  component: Home,
});

function Home() {
  const featured = CARS.filter((c) => c.popular).slice(0, 6);

  return (
    <>
      {/* HERO */}
      <section className="relative min-h-[92vh] flex items-center overflow-hidden">
        <div className="absolute inset-0">
          <img
            src={heroCar}
            alt="Luxury car on wet asphalt"
            className="h-full w-full object-cover opacity-40"
            width={1920}
            height={1080}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/80 to-background/40" />
          <div className="absolute inset-0 bg-gradient-to-r from-background/90 via-background/50 to-transparent" />
        </div>

        <div className="relative mx-auto max-w-7xl px-6 w-full py-24">
          <div className="max-w-2xl animate-fade-up">
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass text-xs font-medium text-primary mb-6">
              <Zap className="h-3.5 w-3.5" /> Premium fleet · 0 hidden fees
            </span>
            <h1 className="font-display text-5xl md:text-7xl font-bold leading-[1.05] tracking-tight">
              Drive the <span className="text-gradient-gold">extraordinary</span>.
              <br />
              On your terms.
            </h1>
            <p className="mt-6 text-lg text-muted-foreground max-w-lg leading-relaxed">
              From sculpted electric coupes to commanding SUVs — rent the car that matches the moment.
            </p>
            <div className="flex flex-wrap gap-4 mt-8">
              <Link
                to="/cars"
                className="px-7 py-3.5 bg-gradient-gold text-primary-foreground rounded-full font-semibold shadow-glow hover:scale-105 transition-smooth"
              >
                Browse fleet
              </Link>
              <Link
                to="/about"
                className="px-7 py-3.5 glass rounded-full font-semibold hover:bg-white/10 transition-smooth"
              >
                How it works
              </Link>
            </div>
          </div>

          {/* Search widget */}
          <div className="mt-16 glass-strong rounded-2xl p-2 shadow-elegant max-w-4xl animate-fade-up">
            <div className="grid md:grid-cols-[1fr_1fr_1fr_auto] gap-1 items-center">
              <SearchField icon={MapPin} label="Pickup" value="New York, NY" />
              <SearchField icon={Calendar} label="Pickup date" value="Apr 30, 10:00 AM" />
              <SearchField icon={Calendar} label="Return date" value="May 3, 10:00 AM" />
              <Link
                to="/cars"
                className="m-1 px-6 py-4 bg-gradient-gold text-primary-foreground rounded-xl font-semibold flex items-center justify-center gap-2 hover:scale-[1.02] transition-smooth"
              >
                <Search className="h-4 w-4" /> Search
              </Link>
            </div>
          </div>

          <div className="mt-10 flex flex-wrap gap-8 text-sm text-muted-foreground animate-fade-up">
            {[
              { num: "12K+", label: "Happy drivers" },
              { num: "250+", label: "Premium cars" },
              { num: "4.9★", label: "Avg. rating" },
              { num: "24/7", label: "Concierge" },
            ].map((s) => (
              <div key={s.label}>
                <div className="font-display text-2xl font-bold text-foreground">{s.num}</div>
                <div className="text-xs uppercase tracking-wider">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FEATURED */}
      <section className="py-24 mx-auto max-w-7xl px-6">
        <div className="flex items-end justify-between mb-12">
          <div>
            <span className="text-xs uppercase tracking-[0.2em] text-primary font-semibold">
              Hand-picked
            </span>
            <h2 className="font-display text-4xl md:text-5xl font-bold mt-2">
              The featured fleet
            </h2>
          </div>
          <Link
            to="/cars"
            className="hidden md:flex items-center gap-1 text-sm font-semibold text-primary hover:gap-2 transition-smooth"
          >
            View all <ChevronRight className="h-4 w-4" />
          </Link>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featured.map((car) => (
            <CarCard key={car.id} car={car} />
          ))}
        </div>
      </section>

      {/* WHY */}
      <section className="py-24 relative">
        <div className="mx-auto max-w-7xl px-6">
          <div className="text-center mb-16 max-w-2xl mx-auto">
            <span className="text-xs uppercase tracking-[0.2em] text-primary font-semibold">
              Why DriveEase
            </span>
            <h2 className="font-display text-4xl md:text-5xl font-bold mt-2">
              The details others overlook
            </h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { Icon: Shield, title: "Fully Insured", desc: "Every trip covered with zero-deductible premium insurance." },
              { Icon: Zap, title: "Instant Booking", desc: "Keys in hand within minutes. No paperwork. No waiting rooms." },
              { Icon: Headphones, title: "24/7 Concierge", desc: "Real humans, on the line, whenever the road calls." },
              { Icon: Award, title: "Premium Only", desc: "Each car hand-inspected and detailed before it reaches you." },
            ].map((f) => (
              <div key={f.title} className="glass rounded-2xl p-6 hover:shadow-glow transition-smooth">
                <div className="h-12 w-12 rounded-xl bg-gradient-gold flex items-center justify-center mb-4 shadow-glow">
                  <f.Icon className="h-6 w-6 text-primary-foreground" />
                </div>
                <h3 className="font-display text-lg font-semibold mb-2">{f.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="py-24 mx-auto max-w-7xl px-6">
        <div className="text-center mb-16">
          <span className="text-xs uppercase tracking-[0.2em] text-primary font-semibold">
            Voices
          </span>
          <h2 className="font-display text-4xl md:text-5xl font-bold mt-2">
            Loved by drivers worldwide
          </h2>
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          {[
            { name: "Alex Morgan", role: "Creative Director", quote: "Picked up the Obsidian GT in under 10 minutes. It felt like being handed the keys to a concept car.", rating: 5 },
            { name: "Priya Shah", role: "Architect", quote: "The SUV was spotless, the app made returns effortless. DriveEase is what rentals should have always been.", rating: 5 },
            { name: "Marcus Lee", role: "Entrepreneur", quote: "Finally, a rental experience that feels designed — not endured. I'm never going back.", rating: 5 },
          ].map((t) => (
            <div key={t.name} className="glass rounded-2xl p-8">
              <div className="flex gap-1 mb-4">
                {Array.from({ length: t.rating }).map((_, i) => (
                  <Star key={i} className="h-4 w-4 fill-primary text-primary" />
                ))}
              </div>
              <p className="text-foreground/90 leading-relaxed mb-6">"{t.quote}"</p>
              <div>
                <div className="font-semibold">{t.name}</div>
                <div className="text-xs text-muted-foreground">{t.role}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-7xl px-6 py-16">
        <div className="relative glass-strong rounded-3xl p-12 md:p-16 overflow-hidden">
          <div className="absolute -top-24 -right-24 h-64 w-64 rounded-full bg-gradient-gold blur-3xl opacity-30" />
          <div className="relative grid md:grid-cols-2 gap-8 items-center">
            <div>
              <h2 className="font-display text-3xl md:text-4xl font-bold leading-tight">
                Your next drive is <span className="text-gradient-gold">one tap away</span>.
              </h2>
              <p className="mt-4 text-muted-foreground">
                Download the DriveEase app and unlock exclusive member pricing, instant keyless entry, and priority concierge.
              </p>
            </div>
            <div className="flex flex-wrap gap-3 md:justify-end">
              <button className="px-6 py-3 glass rounded-xl font-semibold text-sm hover:bg-white/10 transition-smooth">
                App Store
              </button>
              <button className="px-6 py-3 glass rounded-xl font-semibold text-sm hover:bg-white/10 transition-smooth">
                Google Play
              </button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

function SearchField({ icon: Icon, label, value }: { icon: typeof MapPin; label: string; value: string }) {
  return (
    <div className="px-5 py-3 rounded-xl hover:bg-white/5 transition-smooth cursor-pointer">
      <div className="flex items-center gap-2 text-xs text-muted-foreground uppercase tracking-wider">
        <Icon className="h-3.5 w-3.5" /> {label}
      </div>
      <div className="mt-1 font-medium text-sm">{value}</div>
    </div>
  );
}
