import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";

export const Route = createFileRoute("/classes")({
  head: () => ({
    meta: [
      { title: "Class Timetable — IronCore Fitness Club" },
      {
        name: "description",
        content:
          "Browse the IronCore weekly timetable — strength, HIIT, mobility and spin — and reserve your spot in seconds.",
      },
      { property: "og:title", content: "Class Timetable — IronCore Fitness Club" },
      {
        property: "og:description",
        content: "Strength, HIIT, mobility and spin classes. Reserve your spot in seconds.",
      },
    ],
  }),
  component: Classes,
});

type GymClass = {
  id: number;
  name: string;
  day: string;
  time: string;
  coach: string;
  intensity: "Low" | "Moderate" | "High";
  capacity: number;
  booked: number;
};

const CLASSES: GymClass[] = [
  { id: 1, name: "Barbell Strength", day: "Monday", time: "06:30", coach: "Arjun Rao", intensity: "High", capacity: 14, booked: 9 },
  { id: 2, name: "Mobility Reset", day: "Monday", time: "18:00", coach: "Neha Kulkarni", intensity: "Low", capacity: 16, booked: 6 },
  { id: 3, name: "HIIT Engine", day: "Tuesday", time: "07:00", coach: "Sam Fernandes", intensity: "High", capacity: 12, booked: 12 },
  { id: 4, name: "Olympic Lifting", day: "Wednesday", time: "19:00", coach: "Arjun Rao", intensity: "High", capacity: 10, booked: 4 },
  { id: 5, name: "Spin Interval", day: "Thursday", time: "06:45", coach: "Divya Menon", intensity: "Moderate", capacity: 20, booked: 15 },
  { id: 6, name: "Core & Conditioning", day: "Friday", time: "17:30", coach: "Sam Fernandes", intensity: "Moderate", capacity: 18, booked: 11 },
  { id: 7, name: "Weekend Hypertrophy", day: "Saturday", time: "09:00", coach: "Neha Kulkarni", intensity: "Moderate", capacity: 14, booked: 7 },
  { id: 8, name: "Yoga for Lifters", day: "Sunday", time: "08:30", coach: "Divya Menon", intensity: "Low", capacity: 20, booked: 5 },
];

const DAYS = ["All", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

function Classes() {
  const [day, setDay] = useState("All");
  const [booked, setBooked] = useState<number[]>([]);
  const [notice, setNotice] = useState<string | null>(null);

  const visible = useMemo(
    () => (day === "All" ? CLASSES : CLASSES.filter((c) => c.day === day)),
    [day],
  );

  function toggleBooking(gymClass: GymClass) {
    setBooked((prev) => {
      const isBooked = prev.includes(gymClass.id);
      setNotice(
        isBooked
          ? `Cancelled your spot in ${gymClass.name} (${gymClass.day} ${gymClass.time}).`
          : `Booked — ${gymClass.name} with ${gymClass.coach}, ${gymClass.day} at ${gymClass.time}.`,
      );
      return isBooked ? prev.filter((id) => id !== gymClass.id) : [...prev, gymClass.id];
    });
  }

  return (
    <div className="mx-auto max-w-6xl px-4 py-16">
      <h1 className="text-4xl md:text-5xl">Weekly timetable</h1>
      <p className="mt-3 max-w-xl text-muted-foreground">
        Reserve up to three classes at a time. Cancel free of charge up to two hours before the
        session starts.
      </p>

      <div className="mt-8 flex flex-wrap gap-2">
        {DAYS.map((d) => (
          <button
            key={d}
            type="button"
            onClick={() => setDay(d)}
            className={
              d === day ? "btn-base btn-primary" : "btn-base btn-outline hover:border-primary"
            }
          >
            {d}
          </button>
        ))}
      </div>

      {notice ? (
        <div
          role="status"
          className="surface mt-6 flex items-center justify-between gap-4 border-primary p-4"
        >
          <p className="text-sm text-foreground">{notice}</p>
          <button type="button" onClick={() => setNotice(null)} className="btn-base btn-outline">
            Dismiss
          </button>
        </div>
      ) : null}

      <div className="mt-8 grid gap-4 md:grid-cols-2">
        {visible.map((c) => {
          const isBooked = booked.includes(c.id);
          const seatsLeft = c.capacity - c.booked - (isBooked ? 1 : 0);
          const full = seatsLeft <= 0 && !isBooked;

          return (
            <article key={c.id} className="surface flex flex-col gap-4 p-6">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h2 className="text-2xl">{c.name}</h2>
                  <p className="mt-1 text-sm text-muted-foreground">
                    {c.day} · {c.time} · Coach {c.coach}
                  </p>
                </div>
                <span className="rounded-full border border-border px-3 py-1 text-xs uppercase tracking-widest text-primary">
                  {c.intensity}
                </span>
              </div>

              <p className="text-sm text-muted-foreground">
                {full ? "Class full — join the waitlist" : `${seatsLeft} of ${c.capacity} spots left`}
              </p>

              <button
                type="button"
                onClick={() => toggleBooking(c)}
                className={isBooked ? "btn-base btn-outline" : "btn-base btn-primary"}
              >
                {isBooked ? "Cancel booking" : full ? "Join waitlist" : "Book this class"}
              </button>
            </article>
          );
        })}
      </div>

      <p className="mt-10 text-sm text-muted-foreground">
        You currently have {booked.length} reservation{booked.length === 1 ? "" : "s"}.
      </p>
    </div>
  );
}
