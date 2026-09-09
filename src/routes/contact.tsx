import { createFileRoute } from "@tanstack/react-router";
import { useState, type FormEvent } from "react";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact & Free Trial — IronCore Fitness Club" },
      {
        name: "description",
        content:
          "Book a free trial week at IronCore Fitness Club or send the team a question about classes, coaching and membership.",
      },
      { property: "og:title", content: "Contact & Free Trial — IronCore Fitness Club" },
      {
        property: "og:description",
        content: "Book a free trial week or ask us about classes, coaching and membership.",
      },
    ],
  }),
  component: Contact,
});

function Contact() {
  const [sent, setSent] = useState<string | null>(null);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const name = String(data.get("name") ?? "").trim();
    setSent(`Thanks ${name} — your message is with the front desk. We reply within one day.`);
    event.currentTarget.reset();
  }

  return (
    <div className="mx-auto max-w-6xl px-4 py-16">
      <h1 className="text-4xl md:text-5xl">Come see the place</h1>
      <p className="mt-3 max-w-xl text-muted-foreground">
        Book a free trial week, or ask anything about classes, coaching and membership.
      </p>

      <div className="mt-10 grid gap-6 md:grid-cols-[1.2fr_1fr]">
        <form onSubmit={handleSubmit} className="surface grid gap-4 p-8">
          <label className="flex flex-col gap-2 text-sm">
            <span className="uppercase tracking-widest text-muted-foreground">Name</span>
            <input
              name="name"
              required
              className="rounded-md border border-input bg-background px-3 py-2 outline-none focus:border-primary"
              placeholder="Your name"
            />
          </label>
          <label className="flex flex-col gap-2 text-sm">
            <span className="uppercase tracking-widest text-muted-foreground">Email</span>
            <input
              name="email"
              type="email"
              required
              className="rounded-md border border-input bg-background px-3 py-2 outline-none focus:border-primary"
              placeholder="you@example.com"
            />
          </label>
          <label className="flex flex-col gap-2 text-sm">
            <span className="uppercase tracking-widest text-muted-foreground">Goal</span>
            <select
              name="goal"
              className="rounded-md border border-input bg-background px-3 py-2 outline-none focus:border-primary"
            >
              <option>Get stronger</option>
              <option>Lose fat</option>
              <option>Improve conditioning</option>
              <option>Return from injury</option>
            </select>
          </label>
          <label className="flex flex-col gap-2 text-sm">
            <span className="uppercase tracking-widest text-muted-foreground">Message</span>
            <textarea
              name="message"
              rows={4}
              className="rounded-md border border-input bg-background px-3 py-2 outline-none focus:border-primary"
              placeholder="Tell us what you're training for"
            />
          </label>
          <button type="submit" className="btn-base btn-primary w-fit">
            Send message
          </button>
          {sent ? (
            <p role="status" className="text-sm text-primary">
              {sent}
            </p>
          ) : null}
        </form>

        <aside className="surface flex flex-col gap-5 p-8">
          <div>
            <h2 className="text-xl">Front desk</h2>
            <p className="mt-2 text-sm text-muted-foreground">
              Phone and address are placeholders — send me the real details and I&apos;ll put them
              in.
            </p>
          </div>
          <div>
            <h2 className="text-xl">Opening hours</h2>
            <p className="mt-2 text-sm text-muted-foreground">Staffed 05:00 – 23:00, daily</p>
            <p className="text-sm text-muted-foreground">Keycard access 24/7 for members</p>
          </div>
          <div>
            <h2 className="text-xl">Owner</h2>
            <p className="mt-2 text-sm text-muted-foreground">Charan V, IronCore Fitness Club</p>
          </div>
        </aside>
      </div>
    </div>
  );
}
