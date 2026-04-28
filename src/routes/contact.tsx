import { createFileRoute } from "@tanstack/react-router";
import { Mail, Phone, MapPin, MessageCircle } from "lucide-react";
import { useState } from "react";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — DriveEase" },
      { name: "description", content: "Reach our concierge team, 24/7." },
    ],
  }),
  component: Contact,
});

function Contact() {
  const [sent, setSent] = useState(false);
  return (
    <div className="mx-auto max-w-6xl px-6 py-20">
      <span className="text-xs uppercase tracking-[0.2em] text-primary font-semibold">Let's talk</span>
      <h1 className="font-display text-5xl md:text-6xl font-bold mt-3 leading-tight">
        We're here, <span className="text-gradient-gold">24/7</span>.
      </h1>
      <p className="mt-4 text-muted-foreground max-w-xl">
        Booking help, event fleet requests, partnerships — we answer within an hour.
      </p>

      <div className="mt-12 grid lg:grid-cols-[1fr_1.2fr] gap-10">
        <div className="space-y-4">
          {[
            { Icon: Mail, label: "Email", value: "concierge@driveease.io" },
            { Icon: Phone, label: "Phone", value: "+1 (800) DRIVE-EZ" },
            { Icon: MapPin, label: "HQ", value: "420 Park Ave, New York, NY" },
            { Icon: MessageCircle, label: "Live chat", value: "Available 24/7" },
          ].map((c) => (
            <div key={c.label} className="glass rounded-2xl p-5 flex items-center gap-4">
              <div className="h-11 w-11 rounded-xl bg-gradient-gold flex items-center justify-center shadow-glow flex-shrink-0">
                <c.Icon className="h-5 w-5 text-primary-foreground" />
              </div>
              <div>
                <div className="text-xs text-muted-foreground uppercase tracking-wider">{c.label}</div>
                <div className="font-semibold mt-0.5">{c.value}</div>
              </div>
            </div>
          ))}
        </div>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            setSent(true);
          }}
          className="glass-strong rounded-2xl p-8 space-y-5"
        >
          {sent ? (
            <div className="py-12 text-center animate-fade-up">
              <h3 className="font-display text-2xl font-bold text-gradient-gold">Message sent</h3>
              <p className="text-muted-foreground mt-2">We'll be in touch shortly.</p>
            </div>
          ) : (
            <>
              <div className="grid md:grid-cols-2 gap-4">
                <Input label="Name" placeholder="Your name" />
                <Input label="Email" placeholder="you@example.com" type="email" />
              </div>
              <Input label="Subject" placeholder="How can we help?" />
              <div>
                <label className="text-xs text-muted-foreground uppercase tracking-wider">Message</label>
                <textarea
                  rows={5}
                  placeholder="Tell us everything..."
                  className="mt-2 w-full px-4 py-3 rounded-xl bg-white/5 border border-border outline-none focus:border-primary transition-smooth resize-none"
                />
              </div>
              <button
                type="submit"
                className="w-full py-4 bg-gradient-gold text-primary-foreground rounded-xl font-semibold shadow-glow hover:scale-[1.02] transition-smooth"
              >
                Send message
              </button>
            </>
          )}
        </form>
      </div>
    </div>
  );
}

function Input({ label, ...props }: { label: string } & React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <div>
      <label className="text-xs text-muted-foreground uppercase tracking-wider">{label}</label>
      <input
        {...props}
        className="mt-2 w-full px-4 py-3 rounded-xl bg-white/5 border border-border outline-none focus:border-primary transition-smooth"
      />
    </div>
  );
}
