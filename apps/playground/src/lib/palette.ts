import "server-only";
import { leafBooths } from "@/booths";
import { getMediaReactions, getPosts, getProjects } from "./content";

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

const POST_BOOTHS = [
  { kind: "til", href: "/writing/til" },
  { kind: "reflection", href: "/writing/reflections" },
  { kind: "bliki", href: "/reads/bliki" },
] as const;

/** Every booth and detail page, in the order the palette lists them. */
export const paletteLinks = async (): Promise<PaletteLink[]> => {
  const [projects, media, ...posts] = await Promise.all([
    getProjects(),
    getMediaReactions(),
    ...POST_BOOTHS.map(({ kind }) => getPosts(kind)),
  ]);

  return [
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
    ...POST_BOOTHS.flatMap(({ href }, i) =>
      posts[i].map((post) => ({
        id: `entry:${href}/${post.slug}`,
        label: `${href.slice(1)}/${post.slug}`,
        hint: post.title,
        kind: "entry" as const,
        href: `${href}/${post.slug}`,
      })),
    ),
    ...media.map((reaction) => ({
      id: `entry:/media/${reaction.slug}`,
      label: `media/${reaction.slug}`,
      hint: reaction.title,
      kind: "entry" as const,
      href: `/media/${reaction.slug}`,
    })),
  ];
};
