import "server-only";
import { z } from "zod";

/** Hourly by default; a publish in the CMS refreshes its tag right away. */
export const CMS_REVALIDATE_SECONDS = 3600;

export const cmsUrl = () => process.env.CMS_URL;

const isBuild = () => process.env.NEXT_PHASE === "phase-production-build";

// Payload's list response; docs are parsed per collection by the caller.
const ListSchema = z.object({ docs: z.array(z.unknown()) });

/**
 * GETs a Payload REST path, tagged `cms` and `cms:<slug>` so the CMS can
 * refresh exactly the pages that use it (see /api/revalidate).
 *
 * Returns null when no CMS is configured, and — at build time only — when
 * the CMS can't be reached, so callers fall back to the bundled content and
 * the build still succeeds. During a background refresh it throws, so Next
 * keeps serving the last good page.
 */
const get = async (path: string, slug: string): Promise<unknown | null> => {
  const base = cmsUrl();
  if (!base) return null;

  const url = new URL(`/api/${path}`, base);
  try {
    const res = await fetch(url, {
      next: {
        revalidate: CMS_REVALIDATE_SECONDS,
        tags: ["cms", `cms:${slug}`],
      },
    });
    if (!res.ok) throw new Error(`CMS answered ${res.status} for ${url}`);
    return await res.json();
  } catch (error) {
    if (!isBuild()) throw error;
    console.warn(`[cms] ${url} unavailable, using bundled content:`, error);
    return null;
  }
};

/** Every published doc in a collection, as raw JSON. */
export const getCollection = async (
  slug: string,
  sort: string,
): Promise<unknown[] | null> => {
  const params = new URLSearchParams({
    "where[_status][equals]": "published",
    sort,
    limit: "500",
    depth: "0",
  });
  const json = await get(`${slug}?${params}`, slug);
  return json === null ? null : ListSchema.parse(json).docs;
};

export const getGlobal = (slug: string): Promise<unknown | null> =>
  get(`globals/${slug}?depth=0`, slug);
