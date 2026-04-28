import { createFileRoute } from "@tanstack/react-router";
import { useState, useMemo } from "react";
import { Search, SlidersHorizontal } from "lucide-react";
import { CARS } from "@/data/cars";
import { CarCard } from "@/components/CarCard";

export const Route = createFileRoute("/cars")({
  head: () => ({
    meta: [
      { title: "Browse Cars — DriveEase" },
      { name: "description", content: "Explore our premium fleet of luxury, SUV, sedan, and electric vehicles." },
    ],
  }),
  component: CarsPage,
});

const CATEGORIES = ["All", "Luxury", "Sports", "SUV", "Sedan", "Hatchback"] as const;
const SORTS = [
  { id: "popular", label: "Most popular" },
  { id: "price-low", label: "Price: low to high" },
  { id: "price-high", label: "Price: high to low" },
  { id: "rating", label: "Top rated" },
] as const;

function CarsPage() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<(typeof CATEGORIES)[number]>("All");
  const [sort, setSort] = useState<(typeof SORTS)[number]["id"]>("popular");
  const [priceMax, setPriceMax] = useState(600);

  const filtered = useMemo(() => {
    let list = CARS.filter(
      (c) =>
        (category === "All" || c.category === category) &&
        c.pricePerDay <= priceMax &&
        (query === "" ||
          c.name.toLowerCase().includes(query.toLowerCase()) ||
          c.brand.toLowerCase().includes(query.toLowerCase())),
    );
    if (sort === "price-low") list = [...list].sort((a, b) => a.pricePerDay - b.pricePerDay);
    if (sort === "price-high") list = [...list].sort((a, b) => b.pricePerDay - a.pricePerDay);
    if (sort === "rating") list = [...list].sort((a, b) => b.rating - a.rating);
    if (sort === "popular") list = [...list].sort((a, b) => Number(!!b.popular) - Number(!!a.popular));
    return list;
  }, [query, category, sort, priceMax]);

  return (
    <div className="mx-auto max-w-7xl px-6 py-16">
      <div className="mb-10">
        <span className="text-xs uppercase tracking-[0.2em] text-primary font-semibold">
          The fleet
        </span>
        <h1 className="font-display text-4xl md:text-5xl font-bold mt-2">Find your drive</h1>
        <p className="mt-3 text-muted-foreground max-w-xl">
          {filtered.length} premium {filtered.length === 1 ? "vehicle" : "vehicles"} ready to roll.
        </p>
      </div>

      {/* Filter bar */}
      <div className="glass-strong rounded-2xl p-4 mb-10 flex flex-wrap items-center gap-4">
        <div className="flex items-center gap-2 flex-1 min-w-[200px] px-3 py-2 rounded-xl bg-white/5">
          <Search className="h-4 w-4 text-muted-foreground" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search by name or brand..."
            className="bg-transparent outline-none text-sm flex-1"
          />
        </div>

        <div className="flex items-center gap-2 text-xs">
          <SlidersHorizontal className="h-3.5 w-3.5 text-muted-foreground" />
          <span className="text-muted-foreground">Max ${priceMax}/day</span>
          <input
            type="range"
            min={100}
            max={600}
            step={20}
            value={priceMax}
            onChange={(e) => setPriceMax(Number(e.target.value))}
            className="w-32 accent-primary"
          />
        </div>

        <select
          value={sort}
          onChange={(e) => setSort(e.target.value as typeof sort)}
          className="px-3 py-2 rounded-xl bg-white/5 text-sm outline-none border border-border"
        >
          {SORTS.map((s) => (
            <option key={s.id} value={s.id} className="bg-surface">
              {s.label}
            </option>
          ))}
        </select>
      </div>

      {/* Category chips */}
      <div className="flex flex-wrap gap-2 mb-10">
        {CATEGORIES.map((c) => (
          <button
            key={c}
            onClick={() => setCategory(c)}
            className={`px-5 py-2 rounded-full text-sm font-medium transition-smooth ${
              category === c
                ? "bg-gradient-gold text-primary-foreground shadow-glow"
                : "glass hover:bg-white/10"
            }`}
          >
            {c}
          </button>
        ))}
      </div>

      {filtered.length === 0 ? (
        <div className="glass rounded-2xl p-16 text-center">
          <h3 className="font-display text-2xl font-semibold">No cars match your filters</h3>
          <p className="text-muted-foreground mt-2">Try adjusting the price or category.</p>
        </div>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((car) => (
            <CarCard key={car.id} car={car} />
          ))}
        </div>
      )}
    </div>
  );
}
