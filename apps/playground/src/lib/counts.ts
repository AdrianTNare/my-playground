import "server-only";
import { getBlogPosts } from "./hashnode";
import {
  getMediaReactions,
  getPosts,
  getProjects,
  getRefs,
  getTools,
} from "./content";

/** Booth href → how many real entries it has, for the sidebar tree. */
export type BoothCounts = Record<string, number>;

// A failing source just hides that booth's count; it must never take the
// whole layout (every page) down with it.
const count = async (load: () => Promise<unknown[]>) => {
  try {
    return (await load()).length;
  } catch {
    return 0;
  }
};

export const boothCounts = async (): Promise<BoothCounts> => {
  const entries = await Promise.all(
    [
      ["/media", count(getMediaReactions)],
      ["/reads/refs", count(getRefs)],
      ["/reads/bliki", count(() => getPosts("bliki"))],
      ["/writing/til", count(() => getPosts("til"))],
      ["/writing/reflections", count(() => getPosts("reflection"))],
      ["/writing/blog", count(getBlogPosts)],
      ["/projects", count(getProjects)],
      ["/tinkering/terminal", count(() => getTools("terminal"))],
      ["/tinkering/toolset", count(() => getTools("toolset"))],
    ].map(async ([href, n]) => [href, await n] as const),
  );
  return Object.fromEntries(entries);
};
