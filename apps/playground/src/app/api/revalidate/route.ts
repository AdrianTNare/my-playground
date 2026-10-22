import { revalidateTag } from "next/cache";
import { z } from "zod";

const BodySchema = z.object({
  // Tags the CMS fetches are labelled with: cms:<collection or global>.
  tag: z.string().regex(/^cms:[a-z-]+$/),
});

/**
 * Called by the CMS after a publish, so the change shows on the next visit
 * instead of after the hourly refresh. Bearer-authenticated.
 */
export const POST = async (request: Request) => {
  const secret = process.env.REVALIDATE_SECRET;
  if (!secret || request.headers.get("authorization") !== `Bearer ${secret}`) {
    return Response.json({ error: "unauthorized" }, { status: 401 });
  }

  const body = BodySchema.safeParse(await request.json().catch(() => null));
  if (!body.success) {
    return Response.json(
      { error: "expected { tag: 'cms:<slug>' }" },
      { status: 400 },
    );
  }

  // expire: 0 so the next visit fetches fresh content rather than stale.
  revalidateTag(body.data.tag, { expire: 0 });
  return Response.json({ revalidated: body.data.tag });
};
