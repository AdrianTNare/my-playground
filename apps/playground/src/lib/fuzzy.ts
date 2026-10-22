export interface FuzzyMatch {
  score: number;
  /** Indexes of the matched characters in the text, for highlighting. */
  hits: number[];
}

const BOUNDARY = /[\s/\-_.~]/;

/** Greedy in-order match of `q` in `t`, starting at `start`. */
const matchFrom = (q: string, t: string, start: number): FuzzyMatch | null => {
  const hits: number[] = [];
  let score = 0;
  let from = start;

  for (const char of q) {
    const at = t.indexOf(char, from);
    if (at === -1) return null;

    const consecutive = hits.length > 0 && hits.at(-1) === at - 1;
    const wordStart = at === 0 || BOUNDARY.test(t[at - 1]);
    score += 1 + (consecutive ? 3 : 0) + (wordStart ? 2 : 0);
    hits.push(at);
    from = at + 1;
  }
  return { score, hits };
};

/**
 * Subsequence match, case-insensitive: every query character must appear in
 * order. Runs of consecutive hits and hits at word starts score higher, so
 * "til" ranks `writing/til` above `tinkering/toolset`. Returns null on no
 * match. Texts are short labels, so trying every start position is cheap.
 */
export const fuzzyMatch = (query: string, text: string): FuzzyMatch | null => {
  const q = query.toLowerCase().replace(/\s+/g, "");
  if (!q) return { score: 0, hits: [] };

  const t = text.toLowerCase();
  let best: FuzzyMatch | null = null;

  for (
    let start = t.indexOf(q[0]);
    start !== -1;
    start = t.indexOf(q[0], start + 1)
  ) {
    const match = matchFrom(q, t, start);
    if (!match) break; // a later start can only find fewer characters
    if (!best || match.score > best.score) best = match;
  }

  // Prefer shorter texts when the hits are equally good.
  return best && { score: best.score - text.length * 0.01, hits: best.hits };
};
