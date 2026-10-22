import type {
  CollectionAfterChangeHook,
  CollectionAfterDeleteHook,
  GlobalAfterChangeHook,
  PayloadRequest,
} from "payload";

/**
 * Tells the playground to refetch a booth's content. It tags every CMS fetch
 * with `cms:<slug>`, so one POST refreshes exactly the pages that use it.
 * Skipped when the playground URL or secret isn't configured (local dev).
 */
const notify = async (slug: string, req: PayloadRequest) => {
  const url = process.env.PLAYGROUND_URL;
  const secret = process.env.REVALIDATE_SECRET;
  if (!url || !secret) return;

  try {
    const res = await fetch(new URL("/api/revalidate", url), {
      method: "POST",
      headers: {
        authorization: `Bearer ${secret}`,
        "content-type": "application/json",
      },
      body: JSON.stringify({ tag: `cms:${slug}` }),
    });
    if (!res.ok) throw new Error(`playground answered ${res.status}`);
  } catch (error) {
    // A missed refresh only delays the update until the hourly revalidate.
    req.payload.logger.warn({ err: error, slug }, "revalidate failed");
  }
};

export const revalidateAfterChange =
  (slug: string): CollectionAfterChangeHook =>
  async ({ doc, req }) => {
    await notify(slug, req);
    return doc;
  };

export const revalidateAfterDelete =
  (slug: string): CollectionAfterDeleteHook =>
  async ({ doc, req }) => {
    await notify(slug, req);
    return doc;
  };

export const revalidateGlobal =
  (slug: string): GlobalAfterChangeHook =>
  async ({ doc, req }) => {
    await notify(slug, req);
    return doc;
  };
