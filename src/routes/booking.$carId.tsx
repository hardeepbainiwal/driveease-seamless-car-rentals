import { createFileRoute, Link, notFound, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { Check, CreditCard, ShieldCheck, Baby, Navigation, UserRound } from "lucide-react";
import { getCarById } from "@/data/cars";

export const Route = createFileRoute("/booking/$carId")({
  loader: ({ params }) => {
    const car = getCarById(params.carId);
    if (!car) throw notFound();
    return { car };
  },
  component: BookingFlow,
});

const STEPS = ["Details", "Add-ons", "Payment", "Confirm"] as const;

const ADDONS = [
  { id: "driver", label: "Private driver", price: 80, Icon: UserRound },
  { id: "seat", label: "Child seat", price: 12, Icon: Baby },
  { id: "insurance", label: "Premium insurance", price: 25, Icon: ShieldCheck },
  { id: "gps", label: "GPS navigation", price: 8, Icon: Navigation },
];

function BookingFlow() {
  const { car } = Route.useLoaderData();
  const navigate = useNavigate();
  const [step, setStep] = useState(0);
  const [days, setDays] = useState(3);
  const [addons, setAddons] = useState<string[]>([]);
  const [coupon, setCoupon] = useState("");

  const addonsTotal = ADDONS.filter((a) => addons.includes(a.id)).reduce((s, a) => s + a.price * days, 0);
  const subtotal = car.pricePerDay * days + addonsTotal;
  const discount = coupon.toLowerCase() === "drive10" ? Math.round(subtotal * 0.1) : 0;
  const total = subtotal - discount;

  const toggleAddon = (id: string) =>
    setAddons((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]));

  return (
    <div className="mx-auto max-w-6xl px-6 py-12">
      <h1 className="font-display text-3xl md:text-4xl font-bold mb-2">Complete your booking</h1>
      <p className="text-muted-foreground">
        Renting <span className="text-primary font-semibold">{car.name}</span>
      </p>

      {/* Stepper */}
      <div className="mt-10 flex items-center gap-2 md:gap-4 overflow-x-auto pb-2">
        {STEPS.map((s, i) => (
          <div key={s} className="flex items-center gap-2 md:gap-4 flex-shrink-0">
            <div
              className={`h-9 w-9 rounded-full flex items-center justify-center text-sm font-semibold transition-smooth ${
                i <= step ? "bg-gradient-gold text-primary-foreground shadow-glow" : "glass text-muted-foreground"
              }`}
            >
              {i < step ? <Check className="h-4 w-4" /> : i + 1}
            </div>
            <span className={`text-sm font-medium ${i <= step ? "text-foreground" : "text-muted-foreground"}`}>
              {s}
            </span>
            {i < STEPS.length - 1 && <div className="w-8 md:w-16 h-px bg-border" />}
          </div>
        ))}
      </div>

      <div className="mt-10 grid lg:grid-cols-[1fr_380px] gap-8">
        <div className="glass-strong rounded-2xl p-6 md:p-8 animate-fade-in" key={step}>
          {step === 0 && (
            <div className="space-y-6">
              <h2 className="font-display text-2xl font-bold">Pickup & return</h2>
              <div className="grid md:grid-cols-2 gap-4">
                <Field label="Pickup location" defaultValue="New York, NY" />
                <Field label="Drop location" defaultValue="New York, NY" />
                <Field label="Pickup date" defaultValue="Apr 30, 10:00 AM" />
                <Field label="Return date" defaultValue="May 3, 10:00 AM" />
              </div>
              <div>
                <label className="text-xs text-muted-foreground uppercase tracking-wider">
                  Rental duration (days)
                </label>
                <div className="mt-2 flex items-center gap-4">
                  <input
                    type="range"
                    min={1}
                    max={14}
                    value={days}
                    onChange={(e) => setDays(Number(e.target.value))}
                    className="flex-1 accent-primary"
                  />
                  <span className="font-display text-2xl font-bold w-16 text-right text-gradient-gold">
                    {days}d
                  </span>
                </div>
              </div>
            </div>
          )}

          {step === 1 && (
            <div className="space-y-6">
              <h2 className="font-display text-2xl font-bold">Personalize your ride</h2>
              <div className="grid md:grid-cols-2 gap-3">
                {ADDONS.map((a) => {
                  const active = addons.includes(a.id);
                  return (
                    <button
                      key={a.id}
                      onClick={() => toggleAddon(a.id)}
                      className={`relative text-left p-5 rounded-xl border transition-smooth ${
                        active
                          ? "border-primary bg-primary/10 shadow-glow"
                          : "border-border glass hover:bg-white/5"
                      }`}
                    >
                      <a.Icon className="h-6 w-6 text-primary mb-3" />
                      <div className="font-semibold">{a.label}</div>
                      <div className="text-xs text-muted-foreground mt-1">${a.price}/day</div>
                      {active && (
                        <div className="absolute top-3 right-3 h-5 w-5 rounded-full bg-gradient-gold flex items-center justify-center">
                          <Check className="h-3 w-3 text-primary-foreground" />
                        </div>
                      )}
                    </button>
                  );
                })}
              </div>

              <div>
                <label className="text-xs text-muted-foreground uppercase tracking-wider">Coupon code</label>
                <input
                  value={coupon}
                  onChange={(e) => setCoupon(e.target.value)}
                  placeholder='Try "DRIVE10"'
                  className="mt-2 w-full px-4 py-3 rounded-xl bg-white/5 border border-border outline-none focus:border-primary transition-smooth"
                />
                {discount > 0 && (
                  <p className="mt-2 text-xs text-primary">✓ 10% off applied</p>
                )}
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-6">
              <h2 className="font-display text-2xl font-bold">Payment method</h2>
              <div className="grid md:grid-cols-2 gap-3">
                {["Card", "UPI", "Wallet", "Razorpay"].map((m, i) => (
                  <label
                    key={m}
                    className="flex items-center gap-3 p-4 glass rounded-xl cursor-pointer hover:bg-white/10 transition-smooth"
                  >
                    <input type="radio" name="pm" defaultChecked={i === 0} className="accent-primary" />
                    <CreditCard className="h-5 w-5 text-primary" />
                    <span className="font-medium">{m}</span>
                  </label>
                ))}
              </div>
              <div className="grid md:grid-cols-2 gap-4">
                <Field label="Card number" defaultValue="•••• •••• •••• 4242" />
                <Field label="Cardholder name" defaultValue="Alex Morgan" />
                <Field label="Expiry" defaultValue="05 / 28" />
                <Field label="CVC" defaultValue="•••" />
              </div>
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <ShieldCheck className="h-3.5 w-3.5 text-primary" /> Payments encrypted end-to-end.
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="text-center py-8 animate-fade-up">
              <div className="mx-auto h-20 w-20 rounded-full bg-gradient-gold flex items-center justify-center shadow-glow mb-6">
                <Check className="h-10 w-10 text-primary-foreground" strokeWidth={3} />
              </div>
              <h2 className="font-display text-3xl font-bold">Booking confirmed</h2>
              <p className="text-muted-foreground mt-3 max-w-md mx-auto">
                An email receipt has been sent. Your {car.name} will be ready at pickup. Drive safe.
              </p>
              <div className="mt-8 inline-block glass rounded-xl px-6 py-4">
                <div className="text-xs text-muted-foreground">Booking ID</div>
                <div className="font-mono font-bold">DRV-{Date.now().toString().slice(-8)}</div>
              </div>
              <div className="mt-8 flex gap-3 justify-center">
                <Link
                  to="/"
                  className="px-6 py-3 glass rounded-full font-semibold text-sm hover:bg-white/10"
                >
                  Home
                </Link>
                <Link
                  to="/cars"
                  className="px-6 py-3 bg-gradient-gold text-primary-foreground rounded-full font-semibold text-sm shadow-glow"
                >
                  Browse more
                </Link>
              </div>
            </div>
          )}

          {step < 3 && (
            <div className="flex items-center justify-between mt-10 pt-6 border-t border-border">
              <button
                onClick={() => (step === 0 ? navigate({ to: "/cars/$carId", params: { carId: car.id } }) : setStep(step - 1))}
                className="px-5 py-2.5 text-sm font-medium text-muted-foreground hover:text-foreground transition-smooth"
              >
                ← Back
              </button>
              <button
                onClick={() => setStep(step + 1)}
                className="px-7 py-3 bg-gradient-gold text-primary-foreground rounded-full font-semibold text-sm shadow-glow hover:scale-105 transition-smooth"
              >
                {step === 2 ? "Confirm & pay" : "Continue"}
              </button>
            </div>
          )}
        </div>

        {/* Summary */}
        <aside className="h-fit glass-strong rounded-2xl p-6 lg:sticky lg:top-24">
          <div className="flex gap-4">
            <img src={car.image} alt={car.name} className="h-20 w-28 rounded-lg object-cover" />
            <div>
              <p className="text-xs text-muted-foreground uppercase">{car.brand}</p>
              <h3 className="font-display font-bold">{car.name}</h3>
              <p className="text-xs text-muted-foreground mt-1">{car.category}</p>
            </div>
          </div>

          <div className="mt-6 space-y-2.5 text-sm">
            <Row label={`$${car.pricePerDay} × ${days} days`} value={`$${car.pricePerDay * days}`} />
            {addonsTotal > 0 && <Row label="Add-ons" value={`$${addonsTotal}`} />}
            {discount > 0 && <Row label="Discount" value={`-$${discount}`} highlight />}
            <div className="border-t border-border pt-3 mt-3">
              <Row label="Total" value={`$${total}`} bold />
            </div>
          </div>

          <div className="mt-5 flex items-center gap-2 text-xs text-muted-foreground">
            <ShieldCheck className="h-3.5 w-3.5 text-primary" />
            Security deposit refunded on return.
          </div>
        </aside>
      </div>
    </div>
  );
}

function Field({ label, defaultValue }: { label: string; defaultValue?: string }) {
  return (
    <div>
      <label className="text-xs text-muted-foreground uppercase tracking-wider">{label}</label>
      <input
        defaultValue={defaultValue}
        className="mt-2 w-full px-4 py-3 rounded-xl bg-white/5 border border-border outline-none focus:border-primary transition-smooth"
      />
    </div>
  );
}

function Row({ label, value, bold, highlight }: { label: string; value: string; bold?: boolean; highlight?: boolean }) {
  return (
    <div className="flex items-center justify-between">
      <span className={bold ? "font-display text-base font-semibold" : "text-muted-foreground"}>{label}</span>
      <span className={`${bold ? "font-display text-xl font-bold text-gradient-gold" : highlight ? "text-primary font-semibold" : "font-medium"}`}>
        {value}
      </span>
    </div>
  );
}
