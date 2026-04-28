import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useState } from "react";
import { Star, Users, Fuel, Gauge, MapPin, Shield, Check, ChevronLeft } from "lucide-react";
import { getCarById, CARS } from "@/data/cars";
import { CarCard } from "@/components/CarCard";

export const Route = createFileRoute("/cars/$carId")({
  loader: ({ params }) => {
    const car = getCarById(params.carId);
    if (!car) throw notFound();
    return { car };
  },
  head: ({ loaderData }) => ({
    meta: [
      { title: `${loaderData?.car.name} — DriveEase` },
      { name: "description", content: loaderData?.car.description },
      { property: "og:title", content: `${loaderData?.car.name} — DriveEase` },
      { property: "og:description", content: loaderData?.car.description },
      { property: "og:image", content: loaderData?.car.image },
    ],
  }),
  component: CarDetails,
});

function CarDetails() {
  const { car } = Route.useLoaderData();
  const [active, setActive] = useState(0);
  const similar = CARS.filter((c) => c.id !== car.id && c.category === car.category).slice(0, 3);

  return (
    <div className="mx-auto max-w-7xl px-6 py-12">
      <Link
        to="/cars"
        className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-primary transition-smooth mb-6"
      >
        <ChevronLeft className="h-4 w-4" /> Back to fleet
      </Link>

      <div className="grid lg:grid-cols-[1.3fr_1fr] gap-10">
        {/* Gallery */}
        <div>
          <div className="relative aspect-[4/3] rounded-3xl overflow-hidden glass shadow-elegant">
            <img
              src={car.gallery[active]}
              alt={car.name}
              className="h-full w-full object-cover animate-fade-in"
              key={active}
            />
          </div>
          <div className="mt-4 grid grid-cols-3 gap-3">
            {car.gallery.map((src, i) => (
              <button
                key={i}
                onClick={() => setActive(i)}
                className={`aspect-[4/3] rounded-xl overflow-hidden transition-smooth ${
                  active === i ? "ring-2 ring-primary shadow-glow" : "opacity-60 hover:opacity-100"
                }`}
              >
                <img src={src} alt={`${car.name} ${i + 1}`} className="h-full w-full object-cover" />
              </button>
            ))}
          </div>

          <div className="mt-10">
            <h2 className="font-display text-2xl font-bold mb-4">About this car</h2>
            <p className="text-foreground/80 leading-relaxed">{car.description}</p>

            <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { Icon: Users, label: "Seats", val: car.seats },
                { Icon: Fuel, label: "Fuel", val: car.fuel },
                { Icon: Gauge, label: "Transmission", val: car.transmission },
                { Icon: MapPin, label: "Performance", val: car.mileage },
              ].map((s) => (
                <div key={s.label} className="glass rounded-xl p-4">
                  <s.Icon className="h-5 w-5 text-primary mb-2" />
                  <div className="text-xs text-muted-foreground">{s.label}</div>
                  <div className="font-semibold mt-0.5">{s.val}</div>
                </div>
              ))}
            </div>

            <h3 className="font-display text-xl font-bold mt-10 mb-4">Features & amenities</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
              {car.features.map((f) => (
                <div key={f} className="flex items-center gap-2 text-sm">
                  <div className="h-5 w-5 rounded-full bg-primary/20 flex items-center justify-center">
                    <Check className="h-3 w-3 text-primary" />
                  </div>
                  {f}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Booking panel */}
        <aside className="lg:sticky lg:top-24 h-fit">
          <div className="glass-strong rounded-2xl p-6 shadow-elegant">
            <p className="text-xs text-muted-foreground uppercase tracking-wider">{car.brand}</p>
            <h1 className="font-display text-3xl font-bold mt-1">{car.name}</h1>
            <div className="flex items-center gap-2 mt-2 text-sm">
              <Star className="h-4 w-4 fill-primary text-primary" />
              <span className="font-semibold">{car.rating}</span>
              <span className="text-muted-foreground">· {car.reviews} reviews</span>
            </div>

            <div className="mt-6 grid grid-cols-3 gap-2 text-center">
              {[
                { label: "Hour", price: car.pricePerHour },
                { label: "Day", price: car.pricePerDay, featured: true },
                { label: "Week", price: car.pricePerWeek },
              ].map((p) => (
                <div
                  key={p.label}
                  className={`rounded-xl p-3 ${p.featured ? "bg-gradient-gold text-primary-foreground shadow-glow" : "glass"}`}
                >
                  <div className={`text-xs ${p.featured ? "opacity-80" : "text-muted-foreground"}`}>
                    per {p.label}
                  </div>
                  <div className="font-display font-bold text-lg mt-0.5">${p.price}</div>
                </div>
              ))}
            </div>

            <div className="mt-6 space-y-3">
              <FieldRow label="Pickup" value="New York, NY" />
              <FieldRow label="Pickup date" value="Apr 30, 10:00 AM" />
              <FieldRow label="Return date" value="May 3, 10:00 AM" />
            </div>

            <div className="mt-6 flex items-center gap-2 text-xs text-muted-foreground">
              <Shield className="h-3.5 w-3.5 text-primary" />
              Fully insured. Free cancellation up to 24h before pickup.
            </div>

            <Link
              to="/booking/$carId"
              params={{ carId: car.id }}
              className="mt-6 block w-full text-center py-4 bg-gradient-gold text-primary-foreground rounded-xl font-semibold shadow-glow hover:scale-[1.02] transition-smooth"
            >
              Book now — ${car.pricePerDay}/day
            </Link>
          </div>
        </aside>
      </div>

      {similar.length > 0 && (
        <section className="mt-24">
          <h2 className="font-display text-3xl font-bold mb-8">You may also like</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {similar.map((c) => (
              <CarCard key={c.id} car={c} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}

function FieldRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between py-2.5 px-3 rounded-lg bg-white/5">
      <span className="text-xs text-muted-foreground uppercase tracking-wider">{label}</span>
      <span className="text-sm font-medium">{value}</span>
    </div>
  );
}
