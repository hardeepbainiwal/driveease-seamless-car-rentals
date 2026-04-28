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
      { property: "og:description", content: "DriveEase is a modern web application for seamless online car rentals, offering users booking and management tools." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "DriveEase — Luxury Car Rentals, Reimagined" },
      { name: "description", content: "DriveEase is a modern web application for seamless online car rentals, offering users booking and management tools." },
      { name: "twitter:description", content: "DriveEase is a modern web application for seamless online car rentals, offering users booking and management tools." },
      { property: "og:image", content: "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/6dbce7c3-a63f-46dd-a21f-1158788113a1/id-preview-8af671c6--1bec8537-ff38-4c30-8be8-b44a1ef2e2c3.lovable.app-1777360993507.png" },
      { name: "twitter:image", content: "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/6dbce7c3-a63f-46dd-a21f-1158788113a1/id-preview-8af671c6--1bec8537-ff38-4c30-8be8-b44a1ef2e2c3.lovable.app-1777360993507.png" },
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
