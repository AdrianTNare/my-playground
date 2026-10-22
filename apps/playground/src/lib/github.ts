import "server-only";
import { z } from "zod";

const RepoSchema = z.object({
  stargazers_count: z.number(),
  language: z.string().nullable(),
  pushed_at: z.string(),
});

export interface RepoStats {
  stars: number;
  language: string | null;
  /** ISO day of the last push. */
  pushed: string;
}

const REPO_URL = /^https:\/\/github\.com\/([\w.-]+)\/([\w.-]+)\/?$/;

/**
 * Stars, language and last push for a GitHub repo link, refreshed daily.
 * Unauthenticated (60 requests an hour), so any failure just hides the stats.
 */
export const getRepoStats = async (href: string): Promise<RepoStats | null> => {
  const match = REPO_URL.exec(href);
  if (!match) return null;

  try {
    const res = await fetch(
      `https://api.github.com/repos/${match[1]}/${match[2]}`,
      {
        headers: { accept: "application/vnd.github+json" },
        next: { revalidate: 86400 },
      },
    );
    if (!res.ok) return null;
    const repo = RepoSchema.parse(await res.json());
    return {
      stars: repo.stargazers_count,
      language: repo.language,
      pushed: repo.pushed_at.slice(0, 10),
    };
  } catch {
    return null;
  }
};
