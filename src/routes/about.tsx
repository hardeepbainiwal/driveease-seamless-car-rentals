import { createFileRoute } from "@tanstack/react-router";
import { Gem, Globe, HeartHandshake, Sparkles } from "lucide-react";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About — DriveEase" },
      { name: "description", content: "The story behind DriveEase and our obsession with the drive." },
    ],
  }),
  component: About,
});

function About() {
  return (
    <div className="mx-auto max-w-5xl px-6 py-20">
      <span className="text-xs uppercase tracking-[0.2em] text-primary font-semibold">Our story</span>
      <h1 className="font-display text-5xl md:text-6xl font-bold mt-3 leading-tight">
        Built for those who <span className="text-gradient-gold">drive with intent</span>.
      </h1>
      <p className="mt-6 text-lg text-muted-foreground leading-relaxed max-w-3xl">
        DriveEase started with a simple question: why does renting a car feel like a chore? We thought renting
        should feel like borrowing a friend's dream car — thrilling, effortless, personal. So we built it.
      </p>

      <div className="mt-16 grid md:grid-cols-2 gap-6">
        {[
          { Icon: Gem, title: "Premium, always", text: "Every car in the fleet is inspected, detailed, and ready the way we'd want it." },
          { Icon: HeartHandshake, title: "Humans first", text: "Real support, never a script. We're here when the unexpected happens." },
          { Icon: Globe, title: "Global fleet", text: "Pick up in 40+ cities — consistent experience, local nuance." },
          { Icon: Sparkles, title: "Sustainable future", text: "Electric and hybrid vehicles make up 60% of our fleet, growing fast." },
        ].map((v) => (
          <div key={v.title} className="glass rounded-2xl p-8">
            <v.Icon className="h-7 w-7 text-primary mb-4" />
            <h3 className="font-display text-xl font-bold mb-2">{v.title}</h3>
            <p className="text-muted-foreground leading-relaxed">{v.text}</p>
          </div>
        ))}
      </div>

      <div className="mt-20 glass-strong rounded-3xl p-12 text-center">
        <h2 className="font-display text-3xl md:text-4xl font-bold">
          Drive the car. Leave the rest to us.
        </h2>
        <p className="mt-4 text-muted-foreground max-w-xl mx-auto">
          We handle the inspection, the paperwork, the insurance. You just show up and go.
        </p>
      </div>
    </div>
  );
}
