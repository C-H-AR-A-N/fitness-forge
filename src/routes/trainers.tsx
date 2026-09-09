import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";

export const Route = createFileRoute("/trainers")({
  head: () => ({
    meta: [
      { title: "Coaches — Fitness Forge Fitness Club" },
      {
        name: "description",
        content:
          "Meet the Fitness Forge coaching team — strength, conditioning, mobility and endurance specialists. Request a session.",
      },
      { property: "og:title", content: "Coaches — Fitness Forge Fitness Club" },
      {
        property: "og:description",
        content: "Strength, conditioning, mobility and endurance specialists.",
      },
    ],
  }),
  component: Trainers,
});

const COACHES = [
  {
    name: "Arjun Rao",
    role: "Head strength coach",
    years: 11,
    focus: "Powerlifting, Olympic lifting, return-to-lifting after injury.",
  },
  {
    name: "Neha Kulkarni",
    role: "Mobility & hypertrophy",
    years: 7,
    focus: "Movement screening, hypertrophy blocks, desk-worker shoulders.",
  },
  {
    name: "Sam Fernandes",
    role: "Conditioning coach",
    years: 9,
    focus: "HIIT, work capacity, sport-specific conditioning.",
  },
  {
    name: "Divya Menon",
    role: "Endurance & yoga",
    years: 6,
    focus: "Spin, running form, breathwork and yoga for lifters.",
  },
];

function Trainers() {
  const [requested, setRequested] = useState<string | null>(null);

  return (
    <div className="mx-auto max-w-6xl px-4 py-16">
      <h1 className="text-4xl md:text-5xl">The coaching team</h1>
      <p className="mt-3 max-w-xl text-muted-foreground">
        Every coach is certified and on the floor daily. Request a session and we&apos;ll match the
        time to your schedule.
      </p>

      {requested ? (
        <p role="status" className="surface mt-6 border-primary p-4 text-sm">
          Session request sent to {requested}. Expect a call to confirm your slot.
        </p>
      ) : null}

      <div className="mt-10 grid gap-5 sm:grid-cols-2">
        {COACHES.map((c) => (
          <article key={c.name} className="surface flex flex-col gap-3 p-7">
            <div className="flex h-14 w-14 items-center justify-center rounded-full bg-primary font-display text-xl text-primary-foreground">
              {c.name
                .split(" ")
                .map((n) => n[0])
                .join("")}
            </div>
            <h2 className="text-2xl">{c.name}</h2>
            <p className="text-sm uppercase tracking-widest text-primary">{c.role}</p>
            <p className="text-sm text-muted-foreground">{c.focus}</p>
            <p className="text-sm text-muted-foreground">{c.years} years coaching</p>
            <button
              type="button"
              onClick={() => setRequested(c.name)}
              className="btn-base btn-primary mt-2 w-fit"
            >
              Request a session
            </button>
          </article>
        ))}
      </div>
    </div>
  );
}
