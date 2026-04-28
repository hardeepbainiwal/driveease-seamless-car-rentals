import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState, useRef } from "react";
import {
  CalendarDays,
  History,
  Heart,
  User as UserIcon,
  FileCheck,
  Upload,
  CheckCircle2,
  Clock,
  XCircle,
  MapPin,
  Trash2,
  Mail,
  Phone,
  Edit3,
  ShieldCheck,
  ShieldAlert,
  Loader2,
  Sparkles,
} from "lucide-react";
import { CARS, type Car } from "@/data/cars";

export const Route = createFileRoute("/dashboard")({
  head: () => ({
    meta: [
      { title: "My Dashboard — DriveEase" },
      { name: "description", content: "Manage your bookings, favorites, profile, and driving license." },
      { property: "og:title", content: "My Dashboard — DriveEase" },
      { property: "og:description", content: "Your personal DriveEase cockpit." },
    ],
  }),
  component: DashboardPage,
});

type Booking = {
  id: string;
  carId: string;
  startDate: string;
  endDate: string;
  pickup: string;
  total: number;
  status: "upcoming" | "active" | "completed" | "cancelled";
};

type Profile = {
  name: string;
  email: string;
  phone: string;
  address: string;
  avatar: string;
};

type License = {
  number: string;
  expiry: string;
  fileName: string;
  fileData: string; // data URL
  verified: boolean;
};

const STORAGE = {
  bookings: "driveease_bookings",
  favorites: "driveease_favorites",
  profile: "driveease_profile",
  license: "driveease_license",
};

const DEFAULT_PROFILE: Profile = {
  name: "Alex Morgan",
  email: "alex.morgan@driveease.com",
  phone: "+1 (555) 014-2208",
  address: "221B Baker Street, London",
  avatar: "",
};

const SEED_BOOKINGS: Booking[] = [
  {
    id: "BK-10284",
    carId: CARS[0]?.id ?? "obsidian-gt",
    startDate: "2026-05-12",
    endDate: "2026-05-15",
    pickup: "Downtown — Terminal A",
    total: 960,
    status: "upcoming",
  },
  {
    id: "BK-10177",
    carId: CARS[2]?.id ?? CARS[0]?.id,
    startDate: "2026-03-02",
    endDate: "2026-03-05",
    pickup: "Airport — Zone B",
    total: 720,
    status: "completed",
  },
  {
    id: "BK-10044",
    carId: CARS[1]?.id ?? CARS[0]?.id,
    startDate: "2026-01-18",
    endDate: "2026-01-20",
    pickup: "City Center",
    total: 540,
    status: "cancelled",
  },
];

function load<T>(key: string, fallback: T): T {
  if (typeof window === "undefined") return fallback;
  try {
    const raw = localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : fallback;
  } catch {
    return fallback;
  }
}
function save<T>(key: string, value: T) {
  if (typeof window === "undefined") return;
  localStorage.setItem(key, JSON.stringify(value));
}

type TabKey = "upcoming" | "history" | "favorites" | "profile" | "license";

const TABS: { key: TabKey; label: string; icon: typeof CalendarDays }[] = [
  { key: "upcoming", label: "Upcoming", icon: CalendarDays },
  { key: "history", label: "History", icon: History },
  { key: "favorites", label: "Favorites", icon: Heart },
  { key: "profile", label: "Profile", icon: UserIcon },
  { key: "license", label: "License", icon: FileCheck },
];

function DashboardPage() {
  const [tab, setTab] = useState<TabKey>("upcoming");
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [favorites, setFavorites] = useState<string[]>([]);
  const [profile, setProfile] = useState<Profile>(DEFAULT_PROFILE);
  const [license, setLicense] = useState<License | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setBookings(load<Booking[]>(STORAGE.bookings, SEED_BOOKINGS));
    setFavorites(load<string[]>(STORAGE.favorites, [CARS[0]?.id, CARS[3]?.id].filter(Boolean) as string[]));
    setProfile(load<Profile>(STORAGE.profile, DEFAULT_PROFILE));
    setLicense(load<License | null>(STORAGE.license, null));
    setMounted(true);
  }, []);

  useEffect(() => { if (mounted) save(STORAGE.bookings, bookings); }, [bookings, mounted]);
  useEffect(() => { if (mounted) save(STORAGE.favorites, favorites); }, [favorites, mounted]);
  useEffect(() => { if (mounted) save(STORAGE.profile, profile); }, [profile, mounted]);
  useEffect(() => { if (mounted) save(STORAGE.license, license); }, [license, mounted]);

  const upcoming = bookings.filter((b) => b.status === "upcoming" || b.status === "active");
  const history = bookings.filter((b) => b.status === "completed" || b.status === "cancelled");

  const stats = [
    { label: "Total Trips", value: bookings.length },
    { label: "Upcoming", value: upcoming.length },
    { label: "Favorites", value: favorites.length },
    { label: "License", value: license?.verified ? "Verified" : license ? "Pending" : "—" },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="relative overflow-hidden border-b border-border">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-transparent" />
        <div className="relative mx-auto max-w-7xl px-6 py-16 md:py-20">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 animate-fade-up">
            <div>
              <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">Welcome back</p>
              <h1 className="mt-2 font-display text-4xl md:text-5xl font-bold tracking-tight">
                Hi, <span className="text-gradient-gold">{profile.name.split(" ")[0]}</span>
              </h1>
              <p className="mt-3 text-muted-foreground max-w-xl">
                Your personal cockpit. Manage trips, curate your dream fleet, and keep your documents ready.
              </p>
            </div>
            <Link
              to="/cars"
              className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-gold text-primary-foreground rounded-full font-semibold shadow-glow hover:scale-105 transition-smooth self-start md:self-auto"
            >
              Browse fleet
            </Link>
          </div>

          {/* Stats */}
          <div className="mt-10 grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
            {stats.map((s) => (
              <div key={s.label} className="glass rounded-2xl p-5 border border-border">
                <p className="text-xs uppercase tracking-wider text-muted-foreground">{s.label}</p>
                <p className="mt-2 font-display text-2xl md:text-3xl font-bold">{s.value}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Tabs + Content */}
      <section className="mx-auto max-w-7xl px-6 py-10 md:py-14">
        <div className="flex gap-2 overflow-x-auto pb-3 -mx-2 px-2 scrollbar-none">
          {TABS.map((t) => {
            const Icon = t.icon;
            const active = tab === t.key;
            return (
              <button
                key={t.key}
                onClick={() => setTab(t.key)}
                className={`flex-shrink-0 inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold transition-smooth border ${
                  active
                    ? "bg-gradient-gold text-primary-foreground border-transparent shadow-glow"
                    : "border-border text-muted-foreground hover:text-foreground hover:bg-white/5"
                }`}
              >
                <Icon className="h-4 w-4" />
                {t.label}
              </button>
            );
          })}
        </div>

        <div className="mt-8">
          {tab === "upcoming" && (
            <BookingsList
              bookings={upcoming}
              empty="No upcoming trips. Time to plan your next drive."
              onCancel={(id) =>
                setBookings((prev) => prev.map((b) => (b.id === id ? { ...b, status: "cancelled" } : b)))
              }
            />
          )}
          {tab === "history" && (
            <BookingsList bookings={history} empty="No past trips yet." />
          )}
          {tab === "favorites" && (
            <Favorites favorites={favorites} onRemove={(id) => setFavorites((p) => p.filter((x) => x !== id))} />
          )}
          {tab === "profile" && <ProfileEditor profile={profile} onSave={setProfile} />}
          {tab === "license" && <LicenseUpload license={license} onSave={setLicense} />}
        </div>
      </section>
    </div>
  );
}

function statusBadge(status: Booking["status"]) {
  const map = {
    upcoming: { icon: Clock, label: "Upcoming", cls: "bg-primary/15 text-primary border-primary/30" },
    active: { icon: CheckCircle2, label: "Active", cls: "bg-emerald-500/15 text-emerald-400 border-emerald-500/30" },
    completed: { icon: CheckCircle2, label: "Completed", cls: "bg-muted text-muted-foreground border-border" },
    cancelled: { icon: XCircle, label: "Cancelled", cls: "bg-destructive/15 text-destructive border-destructive/30" },
  } as const;
  return map[status];
}

function BookingsList({
  bookings,
  empty,
  onCancel,
}: {
  bookings: Booking[];
  empty: string;
  onCancel?: (id: string) => void;
}) {
  if (bookings.length === 0) {
    return (
      <div className="glass rounded-3xl border border-border p-12 text-center">
        <CalendarDays className="h-10 w-10 mx-auto text-muted-foreground" />
        <p className="mt-4 text-muted-foreground">{empty}</p>
        <Link
          to="/cars"
          className="mt-6 inline-flex px-6 py-3 bg-gradient-gold text-primary-foreground rounded-full font-semibold shadow-glow"
        >
          Explore cars
        </Link>
      </div>
    );
  }

  return (
    <div className="grid gap-4">
      {bookings.map((b) => {
        const car = CARS.find((c) => c.id === b.carId);
        if (!car) return null;
        const badge = statusBadge(b.status);
        const BIcon = badge.icon;
        const days =
          Math.max(1, Math.round((+new Date(b.endDate) - +new Date(b.startDate)) / 86400000));
        return (
          <div
            key={b.id}
            className="glass rounded-3xl border border-border overflow-hidden hover:border-primary/40 transition-smooth animate-fade-up"
          >
            <div className="flex flex-col md:flex-row">
              <div className="md:w-64 aspect-video md:aspect-auto relative overflow-hidden bg-muted">
                <img src={car.image} alt={car.name} className="absolute inset-0 h-full w-full object-cover" />
              </div>
              <div className="flex-1 p-6 flex flex-col gap-4">
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div>
                    <p className="text-xs text-muted-foreground">Booking {b.id}</p>
                    <h3 className="mt-1 font-display text-xl font-bold">
                      {car.brand} {car.name}
                    </h3>
                  </div>
                  <span
                    className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold border ${badge.cls}`}
                  >
                    <BIcon className="h-3.5 w-3.5" />
                    {badge.label}
                  </span>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                  <div>
                    <p className="text-xs text-muted-foreground">Pickup</p>
                    <p className="mt-0.5 font-medium flex items-center gap-1">
                      <MapPin className="h-3.5 w-3.5 text-primary" /> {b.pickup}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">From</p>
                    <p className="mt-0.5 font-medium">{new Date(b.startDate).toLocaleDateString()}</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">To</p>
                    <p className="mt-0.5 font-medium">{new Date(b.endDate).toLocaleDateString()}</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Total · {days}d</p>
                    <p className="mt-0.5 font-bold text-primary">${b.total}</p>
                  </div>
                </div>

                <div className="flex flex-wrap gap-2 pt-2">
                  <Link
                    to="/cars/$carId"
                    params={{ carId: car.id }}
                    className="px-4 py-2 text-xs font-semibold rounded-full border border-border hover:bg-white/5 transition-smooth"
                  >
                    View car
                  </Link>
                  {b.status === "upcoming" && onCancel && (
                    <button
                      onClick={() => onCancel(b.id)}
                      className="px-4 py-2 text-xs font-semibold rounded-full border border-destructive/40 text-destructive hover:bg-destructive/10 transition-smooth"
                    >
                      Cancel trip
                    </button>
                  )}
                  {b.status === "completed" && (
                    <button className="px-4 py-2 text-xs font-semibold rounded-full border border-border hover:bg-white/5 transition-smooth">
                      Leave review
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

function Favorites({ favorites, onRemove }: { favorites: string[]; onRemove: (id: string) => void }) {
  const cars = favorites.map((id) => CARS.find((c) => c.id === id)).filter(Boolean) as Car[];

  if (cars.length === 0) {
    return (
      <div className="glass rounded-3xl border border-border p-12 text-center">
        <Heart className="h-10 w-10 mx-auto text-muted-foreground" />
        <p className="mt-4 text-muted-foreground">No favorites yet. Heart a car to save it here.</p>
        <Link
          to="/cars"
          className="mt-6 inline-flex px-6 py-3 bg-gradient-gold text-primary-foreground rounded-full font-semibold shadow-glow"
        >
          Browse cars
        </Link>
      </div>
    );
  }

  return (
    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
      {cars.map((c) => (
        <div
          key={c.id}
          className="glass rounded-3xl border border-border overflow-hidden group hover:border-primary/40 transition-smooth animate-fade-up"
        >
          <div className="relative aspect-[16/10] overflow-hidden bg-muted">
            <img
              src={c.image}
              alt={c.name}
              className="absolute inset-0 h-full w-full object-cover group-hover:scale-105 transition-smooth"
            />
            <button
              onClick={() => onRemove(c.id)}
              className="absolute top-3 right-3 h-9 w-9 rounded-full glass-strong flex items-center justify-center hover:bg-destructive/20 hover:text-destructive transition-smooth"
              aria-label="Remove from favorites"
            >
              <Trash2 className="h-4 w-4" />
            </button>
          </div>
          <div className="p-5">
            <p className="text-xs text-muted-foreground">{c.category}</p>
            <h3 className="mt-1 font-display text-lg font-bold">
              {c.brand} {c.name}
            </h3>
            <div className="mt-3 flex items-center justify-between">
              <p className="text-primary font-bold">
                ${c.pricePerDay}
                <span className="text-xs font-normal text-muted-foreground">/day</span>
              </p>
              <Link
                to="/booking/$carId"
                params={{ carId: c.id }}
                className="px-4 py-1.5 text-xs font-semibold bg-gradient-gold text-primary-foreground rounded-full"
              >
                Book
              </Link>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

function ProfileEditor({ profile, onSave }: { profile: Profile; onSave: (p: Profile) => void }) {
  const [form, setForm] = useState(profile);
  const [saved, setSaved] = useState(false);
  useEffect(() => setForm(profile), [profile]);

  const initials = form.name
    .split(" ")
    .map((n) => n[0])
    .filter(Boolean)
    .slice(0, 2)
    .join("")
    .toUpperCase();

  const onAvatar = (file: File) => {
    const reader = new FileReader();
    reader.onload = () => setForm((f) => ({ ...f, avatar: String(reader.result) }));
    reader.readAsDataURL(file);
  };

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(form);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <form onSubmit={submit} className="glass rounded-3xl border border-border p-6 md:p-8 animate-fade-up">
      <div className="flex flex-col sm:flex-row gap-6 items-start sm:items-center pb-6 border-b border-border">
        <div className="relative">
          <div className="h-24 w-24 rounded-full bg-gradient-gold flex items-center justify-center font-display text-3xl font-bold text-primary-foreground overflow-hidden shadow-glow">
            {form.avatar ? (
              <img src={form.avatar} alt="Avatar" className="h-full w-full object-cover" />
            ) : (
              initials
            )}
          </div>
          <label className="absolute -bottom-1 -right-1 h-8 w-8 rounded-full bg-background border border-border flex items-center justify-center cursor-pointer hover:bg-white/5 transition-smooth">
            <Edit3 className="h-3.5 w-3.5" />
            <input
              type="file"
              accept="image/*"
              className="sr-only"
              onChange={(e) => e.target.files?.[0] && onAvatar(e.target.files[0])}
            />
          </label>
        </div>
        <div>
          <h3 className="font-display text-2xl font-bold">{form.name}</h3>
          <p className="text-sm text-muted-foreground flex items-center gap-1.5 mt-1">
            <Mail className="h-3.5 w-3.5" />
            {form.email}
          </p>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-5 pt-6">
        <Field label="Full name" icon={UserIcon}>
          <input
            required
            maxLength={80}
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            className="input-base"
          />
        </Field>
        <Field label="Email" icon={Mail}>
          <input
            required
            type="email"
            maxLength={120}
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            className="input-base"
          />
        </Field>
        <Field label="Phone" icon={Phone}>
          <input
            maxLength={30}
            value={form.phone}
            onChange={(e) => setForm({ ...form, phone: e.target.value })}
            className="input-base"
          />
        </Field>
        <Field label="Address" icon={MapPin}>
          <input
            maxLength={160}
            value={form.address}
            onChange={(e) => setForm({ ...form, address: e.target.value })}
            className="input-base"
          />
        </Field>
      </div>

      <div className="mt-8 flex items-center gap-4">
        <button
          type="submit"
          className="px-6 py-3 bg-gradient-gold text-primary-foreground rounded-full font-semibold shadow-glow hover:scale-105 transition-smooth"
        >
          Save changes
        </button>
        {saved && (
          <span className="text-sm text-emerald-400 flex items-center gap-1.5 animate-fade-in">
            <CheckCircle2 className="h-4 w-4" /> Profile updated
          </span>
        )}
      </div>
    </form>
  );
}

function Field({
  label,
  icon: Icon,
  children,
}: {
  label: string;
  icon: typeof UserIcon;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <span className="text-xs uppercase tracking-wider text-muted-foreground flex items-center gap-1.5">
        <Icon className="h-3.5 w-3.5" /> {label}
      </span>
      <div className="mt-2">{children}</div>
    </label>
  );
}

function LicenseUpload({ license, onSave }: { license: License | null; onSave: (l: License | null) => void }) {
  const [form, setForm] = useState<License>(
    license ?? { number: "", expiry: "", fileName: "", fileData: "", verified: false },
  );
  const [saved, setSaved] = useState(false);
  const [dragging, setDragging] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (license) setForm(license);
  }, [license]);

  const handleFile = (file: File) => {
    if (file.size > 5 * 1024 * 1024) {
      alert("File must be under 5MB");
      return;
    }
    const reader = new FileReader();
    reader.onload = () =>
      setForm((f) => ({ ...f, fileName: file.name, fileData: String(reader.result) }));
    reader.readAsDataURL(file);
  };

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.fileData) {
      alert("Please upload a license image");
      return;
    }
    onSave({ ...form, verified: false });
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  const remove = () => {
    onSave(null);
    setForm({ number: "", expiry: "", fileName: "", fileData: "", verified: false });
  };

  return (
    <form onSubmit={submit} className="glass rounded-3xl border border-border p-6 md:p-8 animate-fade-up">
      <div className="flex items-start justify-between gap-4 pb-6 border-b border-border">
        <div>
          <h3 className="font-display text-2xl font-bold">Driving License</h3>
          <p className="mt-1 text-sm text-muted-foreground">
            Upload your license for faster, friction-free bookings.
          </p>
        </div>
        {license && (
          <span
            className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold border ${
              license.verified
                ? "bg-emerald-500/15 text-emerald-400 border-emerald-500/30"
                : "bg-primary/15 text-primary border-primary/30"
            }`}
          >
            {license.verified ? <CheckCircle2 className="h-3.5 w-3.5" /> : <Clock className="h-3.5 w-3.5" />}
            {license.verified ? "Verified" : "Pending review"}
          </span>
        )}
      </div>

      <div className="grid md:grid-cols-2 gap-5 pt-6">
        <Field label="License number" icon={FileCheck}>
          <input
            required
            maxLength={40}
            value={form.number}
            onChange={(e) => setForm({ ...form, number: e.target.value })}
            placeholder="e.g. DL-998-27-A"
            className="input-base"
          />
        </Field>
        <Field label="Expiry date" icon={CalendarDays}>
          <input
            required
            type="date"
            value={form.expiry}
            onChange={(e) => setForm({ ...form, expiry: e.target.value })}
            className="input-base"
          />
        </Field>
      </div>

      <div className="mt-6">
        <p className="text-xs uppercase tracking-wider text-muted-foreground mb-2">License document</p>
        <div
          onDragOver={(e) => {
            e.preventDefault();
            setDragging(true);
          }}
          onDragLeave={() => setDragging(false)}
          onDrop={(e) => {
            e.preventDefault();
            setDragging(false);
            const f = e.dataTransfer.files?.[0];
            if (f) handleFile(f);
          }}
          onClick={() => inputRef.current?.click()}
          className={`cursor-pointer rounded-2xl border-2 border-dashed p-8 text-center transition-smooth ${
            dragging ? "border-primary bg-primary/5" : "border-border hover:border-primary/50 hover:bg-white/5"
          }`}
        >
          {form.fileData ? (
            <div className="flex flex-col items-center gap-3">
              {form.fileData.startsWith("data:image") ? (
                <img
                  src={form.fileData}
                  alt="License preview"
                  className="max-h-48 rounded-lg border border-border"
                />
              ) : (
                <FileCheck className="h-10 w-10 text-primary" />
              )}
              <p className="text-sm font-medium">{form.fileName}</p>
              <p className="text-xs text-muted-foreground">Click or drop to replace</p>
            </div>
          ) : (
            <div className="flex flex-col items-center gap-2">
              <Upload className="h-10 w-10 text-muted-foreground" />
              <p className="text-sm font-medium">Drop image here or click to upload</p>
              <p className="text-xs text-muted-foreground">JPG, PNG, PDF · max 5MB</p>
            </div>
          )}
          <input
            ref={inputRef}
            type="file"
            accept="image/*,application/pdf"
            className="sr-only"
            onChange={(e) => e.target.files?.[0] && handleFile(e.target.files[0])}
          />
        </div>
      </div>

      <div className="mt-8 flex flex-wrap items-center gap-4">
        <button
          type="submit"
          className="px-6 py-3 bg-gradient-gold text-primary-foreground rounded-full font-semibold shadow-glow hover:scale-105 transition-smooth"
        >
          {license ? "Update license" : "Submit for review"}
        </button>
        {license && (
          <button
            type="button"
            onClick={remove}
            className="px-5 py-3 rounded-full border border-destructive/40 text-destructive text-sm font-semibold hover:bg-destructive/10 transition-smooth"
          >
            Remove
          </button>
        )}
        {saved && (
          <span className="text-sm text-emerald-400 flex items-center gap-1.5 animate-fade-in">
            <CheckCircle2 className="h-4 w-4" /> License saved
          </span>
        )}
      </div>
    </form>
  );
}
