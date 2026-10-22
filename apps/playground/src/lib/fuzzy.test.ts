import { describe, expect, it } from "vitest";
import { fuzzyMatch } from "./fuzzy";

describe("fuzzyMatch", () => {
  it("matches an in-order subsequence, case-insensitively", () => {
    expect(fuzzyMatch("TL", "til")?.hits).toEqual([0, 2]);
  });

  it("returns null when a character is missing or out of order", () => {
    expect(fuzzyMatch("xyz", "til")).toBeNull();
    expect(fuzzyMatch("lt", "til")).toBeNull();
  });

  it("matches everything for an empty query", () => {
    expect(fuzzyMatch("  ", "anything")).toEqual({ score: 0, hits: [] });
  });

  it("ranks consecutive and word-start hits higher", () => {
    const til = fuzzyMatch("til", "writing/til")!;
    const scattered = fuzzyMatch("til", "tinkering/toolset")!;
    expect(til.score).toBeGreaterThan(scattered.score);
  });

  it("ignores spaces in the query", () => {
    expect(fuzzyMatch("copy email", "copy email")).not.toBeNull();
  });
});
