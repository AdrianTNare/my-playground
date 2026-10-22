import { describe, expect, it } from "vitest";
import { complete, resolveBooth, runCommand } from "./shell";

const ctx = {
  accents: ["terracotta", "sage"],
  random: () => 0,
  now: () => new Date("2026-10-22T10:00:00Z"),
};

describe("resolveBooth", () => {
  it.each([
    ["til", "/writing/til"],
    ["writing/til", "/writing/til"],
    ["~/writing/til/", "/writing/til"],
    ["writing", "/writing/til"],
    ["now", "/now"],
    ["..", "/"],
    ["~", "/"],
  ])("%s → %s", (target, href) => {
    expect(resolveBooth(target)).toBe(href);
  });

  it("is undefined for unknown booths", () => {
    expect(resolveBooth("nope")).toBeUndefined();
  });
});

describe("complete", () => {
  it("completes a unique booth prefix", () => {
    expect(complete("cd writing/t")).toBe("cd writing/til");
    expect(complete("cd no")).toBe("cd now");
  });

  it("leaves ambiguous or non-cd input alone", () => {
    expect(complete("cd writing/")).toBe("cd writing/");
    expect(complete("ls")).toBe("ls");
  });
});

describe("runCommand", () => {
  it("navigates with cd", () => {
    expect(runCommand("cd til", ctx).effect).toEqual({
      kind: "navigate",
      href: "/writing/til",
    });
  });

  it("explains a bad cd", () => {
    expect(runCommand("cd moon", ctx).lines[0]).toBe("cd: no such booth: moon");
  });

  it("lists booths, groups with a slash", () => {
    const [line] = runCommand("ls", ctx).lines;
    expect(line).toContain("writing/");
    expect(line).toContain("now");
    expect(line).not.toContain("home");
  });

  it("switches accent only to a known one", () => {
    expect(runCommand("accent sage", ctx).effect).toEqual({
      kind: "accent",
      name: "sage",
    });
    expect(runCommand("accent pink", ctx).effect).toBeUndefined();
  });

  it("toggles sound", () => {
    expect(runCommand("sound off", ctx).effect).toEqual({
      kind: "sound",
      on: false,
    });
  });

  it("knows a few jokes and not much else", () => {
    expect(runCommand("sudo rm -rf /", ctx).lines[0]).toMatch(/sudoers/);
    expect(runCommand("make coffee", ctx).lines[0]).toBe(
      "make: command not found. try: help",
    );
  });

  it("has a fortune", () => {
    expect(runCommand("fortune", ctx).lines[0]).toMatch(/cache invalidation/);
  });
});
