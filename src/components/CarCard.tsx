import { Link } from "@tanstack/react-router";
import { Star, Users, Fuel, Gauge } from "lucide-react";
import type { Car } from "@/data/cars";

export function CarCard({ car }: { car: Car }) {
  return (
    <Link
      to="/cars/$carId"
      params={{ carId: car.id }}
      className="group relative glass rounded-2xl overflow-hidden shadow-card hover:shadow-elegant transition-smooth hover:-translate-y-1"
    >
      <div className="relative aspect-[4/3] overflow-hidden bg-surface">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-transparent" />
        <img
          src={car.image}
          alt={car.name}
          loading="lazy"
          width={1024}
          height={768}
          className="h-full w-full object-cover group-hover:scale-110 transition-smooth duration-700"
        />
        {car.popular && (
          <span className="absolute top-3 left-3 px-3 py-1 text-xs font-semibold bg-gradient-gold text-primary-foreground rounded-full">
            Popular
          </span>
        )}
        <span className="absolute top-3 right-3 px-3 py-1 text-xs font-medium glass-strong rounded-full">
          {car.category}
        </span>
      </div>

      <div className="p-5">
        <div className="flex items-start justify-between mb-3">
          <div>
            <p className="text-xs text-muted-foreground uppercase tracking-wider">{car.brand}</p>
            <h3 className="font-display text-lg font-semibold mt-0.5">{car.name}</h3>
          </div>
          <div className="flex items-center gap-1 text-sm">
            <Star className="h-4 w-4 fill-primary text-primary" />
            <span className="font-semibold">{car.rating}</span>
          </div>
        </div>

        <div className="flex items-center gap-4 text-xs text-muted-foreground mb-4">
          <span className="flex items-center gap-1"><Users className="h-3.5 w-3.5" />{car.seats}</span>
          <span className="flex items-center gap-1"><Fuel className="h-3.5 w-3.5" />{car.fuel}</span>
          <span className="flex items-center gap-1"><Gauge className="h-3.5 w-3.5" />{car.transmission}</span>
        </div>

        <div className="flex items-end justify-between pt-4 border-t border-border">
          <div>
            <p className="text-xs text-muted-foreground">Starting</p>
            <p className="font-display text-xl font-bold text-gradient-gold">
              ${car.pricePerDay}
              <span className="text-xs text-muted-foreground font-normal"> /day</span>
            </p>
          </div>
          <span className="text-xs font-semibold text-primary group-hover:translate-x-1 transition-smooth">
            View →
          </span>
        </div>
      </div>
    </Link>
  );
}
