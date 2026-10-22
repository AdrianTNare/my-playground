import { UnofficeHoursSchema } from "@playground/contracts";

export const unofficeHours = UnofficeHoursSchema.parse({
  // Email until a booking page exists; swap in the cal.com link then.
  bookingUrl: "mailto:adriantnare@icloud.com?subject=Unoffice%20hours",
  durationMinutes: 30,
  timezone: "SAST (UTC+2)",
  intro: [
    "Unoffice hours are open time on my calendar for anyone who wants to talk. The idea comes from Matt Webb: block out a few slots, let people book them, and see who turns up.",
    "No agenda needed. Calls are 30 minutes over video.",
  ],
  goodFor: [
    "Talking through an architecture or code review question",
    "Testing strategy, CI and production monitoring",
    "Getting into software development, or the next step in it",
    "Neovim, terminals and developer tooling",
    "Your side project, at any stage",
    "Nothing in particular",
  ],
  notFor: [
    "Sales pitches",
    "Recruiting outreach",
    "A guaranteed fix for your bug",
  ],
});
