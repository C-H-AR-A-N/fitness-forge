import { createFileRoute, Link } from "@tanstack/react-router";
import heroImage from "@/assets/hero-gym.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "IronCore Fitness Club — Strength & Conditioning" },
      {
        name: "description",
        content:
          "IronCore Fitness Club: coached strength training, group classes and flexible memberships. Book a class or join today.",
      },
      { property: "og:title", content: "IronCore Fitness Club — Strength & Conditioning" },
      {
        property: "og:description",
        content: "Coached strength training, group classes and flexible memberships.",
      },
    ],
  }),
  component: Home,
});

const PILLARS = [
  {
    title: "Coached strength",
    body: "Every member gets a written programme and a coach checking your lifts, not a laminated poster.",
  },
  {
    title: "Small group classes",
    body: "Capped at 14 people so the coach actually knows your name and your numbers.",
  },
  {
    title: "Recovery built in",
    body: "Sauna, mobility zone and guided cooldowns included with every membership tier.",
  },
];

const STATS = [
  { value: "1,200+", label: "Active members" },
  { value: "38", label: "Weekly classes" },
  { value: "12", label: "Certified coaches" },
  { value: "24/7", label: "Keycard access" },
];

function Home() {
  return (
    <>
      <section className="relative isolate overflow-hidden">
        <img
          src={heroImage}
          alt="Athlete performing a deadlift in the IronCore training floor"
          width={1600}
          height={1000}
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="hero-overlay absolute inset-0" />
        <div className="relative mx-auto max-w-6xl px-4 py-28 md:py-40">
          <p className="text-sm font-semibold uppercase tracking-[0.35em] text-primary">
            IronCore Fitness Club
          </p>
          <h1 className="mt-5 max-w-2xl text-5xl leading-[0.95] md:text-7xl">
            Train heavy.
            <br />
            Recover smart.
            <br />
            <span className="text-primary">Stay consistent.</span>
          </h1>
          <p className="mt-6 max-w-lg text-lg text-muted-foreground">
            A coaching-first gym for people who want a plan, not a treadmill. First session is on
            the house.
          </p>
          <div className="mt-9 flex flex-wrap gap-3">
            <Link to="/membership" className="btn-base btn-primary">
              See membership plans
            </Link>
            <Link to="/classes" className="btn-base btn-outline">
              Book a class
            </Link>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-16">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {STATS.map((s) => (
            <div key={s.label} className="surface px-6 py-7 text-center">
              <p className="font-display text-4xl text-primary">{s.value}</p>
              <p className="mt-1 text-xs uppercase tracking-widest text-muted-foreground">
                {s.label}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 pb-8">
        <h2 className="text-3xl md:text-4xl">Why members stay</h2>
        <div className="mt-8 grid gap-5 md:grid-cols-3">
          {PILLARS.map((p) => (
            <article key={p.title} className="surface p-7">
              <h3 className="text-xl text-primary">{p.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{p.body}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-16">
        <div className="surface flex flex-col items-start gap-6 p-10 md:flex-row md:items-center md:justify-between">
          <div>
            <h2 className="text-3xl">Start with a free trial week</h2>
            <p className="mt-2 text-sm text-muted-foreground">
              Full floor access, two classes and a movement assessment with a coach.
            </p>
          </div>
          <Link to="/contact" className="btn-base btn-primary">
            Claim your trial
          </Link>
        </div>
      </section>
    </>
  );
}
