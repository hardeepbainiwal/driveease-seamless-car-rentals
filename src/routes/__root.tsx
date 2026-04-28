import { Outlet, Link, createRootRoute, HeadContent, Scripts } from "@tanstack/react-router";
import appCss from "../styles.css?url";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

function NotFoundComponent() {
  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="text-center max-w-md">
        <h1 className="font-display text-8xl font-bold text-gradient-gold">404</h1>
        <h2 className="mt-4 text-xl font-semibold">Off the map</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          This road doesn't exist. Let's get you back on course.
        </p>
        <Link
          to="/"
          className="mt-6 inline-flex px-6 py-3 bg-gradient-gold text-primary-foreground rounded-full font-semibold shadow-glow"
        >
          Back home
        </Link>
      </div>
    </div>
  );
}

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "DriveEase — Luxury Car Rentals, Reimagined" },
      {
        name: "description",
        content:
          "Rent luxury, electric, and performance cars on demand. Premium vehicles, transparent pricing, effortless booking.",
      },
      { property: "og:title", content: "DriveEase — Luxury Car Rentals, Reimagined" },
      { property: "og:description", content: "Premium car rentals with effortless booking." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "stylesheet", href: appCss }],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
});

function RootShell({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 pt-18">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
