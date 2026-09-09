import { createFileRoute } from "@tanstack/react-router";
import { useState, type FormEvent } from "react";

export const Route = createFileRoute("/membership")({
  head: () => ({
    meta: [
      { title: "Membership Plans — Fitness Forge Fitness Club" },
      {
        name: "description",
        content:
          "Compare Fitness Forge membership plans: Flex, Performance and Elite. Monthly billing, no lock-in, free trial week.",
      },
      { property: "og:title", content: "Membership Plans — Fitness Forge Fitness Club" },
      {
        property: "og:description",
        content: "Flex, Performance and Elite plans. Monthly billing, no lock-in.",
      },
    ],
  }),
  component: Membership,
});

type Plan = {
  id: string;
  name: string;
  price: number;
  tagline: string;
  perks: string[];
  featured?: boolean;
};

const PLANS: Plan[] = [
  {
    id: "flex",
    name: "Flex",
    price: 1499,
    tagline: "Open gym, your own pace.",
    perks: ["24/7 keycard access", "Full strength floor", "Locker & shower", "Monthly billing"],
  },
  {
    id: "performance",
    name: "Performance",
    price: 2499,
    tagline: "Classes plus coaching.",
    perks: [
      "Everything in Flex",
      "Unlimited group classes",
      "Quarterly programme review",
      "Sauna & recovery zone",
    ],
    featured: true,
  },
  {
    id: "elite",
    name: "Elite",
    price: 4299,
    tagline: "One-to-one coaching.",
    perks: [
      "Everything in Performance",
      "4 personal training sessions / month",
      "Nutrition check-ins",
      "Guest passes (2 / month)",
    ],
  },
];

function Membership() {
  const [selected, setSelected] = useState<string>("performance");
  const [confirmation, setConfirmation] = useState<string | null>(null);
  const plan = PLANS.find((p) => p.id === selected)!;

  function handleJoin(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const name = String(data.get("name") ?? "").trim();
    const email = String(data.get("email") ?? "").trim();
    if (!name || !email) return;
    setConfirmation(
      `Thanks ${name} — your ${plan.name} membership request is in. We'll email ${email} to set up your first session.`,
    );
    event.currentTarget.reset();
  }

  return (
    <div className="mx-auto max-w-6xl px-4 py-16">
      <h1 className="text-4xl md:text-5xl">Membership plans</h1>
      <p className="mt-3 max-w-xl text-muted-foreground">
        Every plan starts with a free trial week and a movement assessment. No joining fee, cancel
        with 30 days notice.
      </p>

      <div className="mt-10 grid gap-5 md:grid-cols-3">
        {PLANS.map((p) => {
          const isSelected = p.id === selected;
          return (
            <article
              key={p.id}
              className={`surface flex flex-col p-7 transition-colors ${
                isSelected ? "border-primary" : ""
              }`}
            >
              {p.featured ? (
                <span className="mb-3 w-fit rounded-full bg-primary px-3 py-1 text-xs font-bold uppercase tracking-widest text-primary-foreground">
                  Most popular
                </span>
              ) : null}
              <h2 className="text-3xl">{p.name}</h2>
              <p className="mt-1 text-sm text-muted-foreground">{p.tagline}</p>
              <p className="mt-5 font-display text-4xl text-primary">
                ₹{p.price.toLocaleString("en-IN")}
                <span className="ml-1 text-base text-muted-foreground">/ month</span>
              </p>
              <ul className="mt-5 flex flex-1 flex-col gap-2 text-sm text-muted-foreground">
                {p.perks.map((perk) => (
                  <li key={perk}>— {perk}</li>
                ))}
              </ul>
              <button
                type="button"
                onClick={() => setSelected(p.id)}
                className={`mt-6 ${isSelected ? "btn-base btn-primary" : "btn-base btn-outline"}`}
              >
                {isSelected ? "Selected" : `Choose ${p.name}`}
              </button>
            </article>
          );
        })}
      </div>

      <section className="surface mt-12 p-8">
        <h2 className="text-2xl">Join the {plan.name} plan</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          ₹{plan.price.toLocaleString("en-IN")} per month. Leave your details and a coach will call
          you within one working day.
        </p>

        <form onSubmit={handleJoin} className="mt-6 grid gap-4 md:grid-cols-3">
          <label className="flex flex-col gap-2 text-sm">
            <span className="uppercase tracking-widest text-muted-foreground">Full name</span>
            <input
              name="name"
              required
              className="rounded-md border border-input bg-background px-3 py-2 text-foreground outline-none focus:border-primary"
              placeholder="Your name"
            />
          </label>
          <label className="flex flex-col gap-2 text-sm">
            <span className="uppercase tracking-widest text-muted-foreground">Email</span>
            <input
              name="email"
              type="email"
              required
              className="rounded-md border border-input bg-background px-3 py-2 text-foreground outline-none focus:border-primary"
              placeholder="you@example.com"
            />
          </label>
          <label className="flex flex-col gap-2 text-sm">
            <span className="uppercase tracking-widest text-muted-foreground">Phone</span>
            <input
              name="phone"
              className="rounded-md border border-input bg-background px-3 py-2 text-foreground outline-none focus:border-primary"
              placeholder="Optional"
            />
          </label>
          <button type="submit" className="btn-base btn-primary md:col-span-3 md:w-fit">
            Request membership
          </button>
        </form>

        {confirmation ? (
          <p role="status" className="mt-5 text-sm text-primary">
            {confirmation}
          </p>
        ) : null}
      </section>
    </div>
  );
}
