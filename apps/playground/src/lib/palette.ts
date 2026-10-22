import { leafBooths } from "@/booths";
import { projects } from "@playground/content";

/** Somewhere the ⌘K palette can take you. Commands are added client-side. */
export interface PaletteLink {
  id: string;
  /** What's matched and shown, e.g. `writing/til`. */
  label: string;
  /** Muted text after the label. */
  hint: string;
  kind: "booth" | "project" | "entry";
  href: string;
}

const boothLabel = (href: string) => (href === "/" ? "~" : href.slice(1));

/** Every booth and detail page, in the order the palette lists them. */
export const paletteLinks = (): PaletteLink[] => [
  ...leafBooths.map((booth) => ({
    id: `booth:${booth.href}`,
    label: boothLabel(booth.href),
    hint: booth.title,
    kind: "booth" as const,
    href: booth.href,
  })),
  ...projects.map((project) => ({
    id: `project:${project.slug}`,
    label: `projects/${project.slug}`,
    hint: project.summary,
    kind: "project" as const,
    href: `/projects/${project.slug}`,
  })),
];
