import { booths, leafBooths } from "@/booths";

/** What a command asks the shell component to do, besides printing. */
export type ShellEffect =
  | { kind: "navigate"; href: string }
  | { kind: "accent"; name: string }
  | { kind: "sound"; on: boolean }
  | { kind: "clear" };

export interface ShellResult {
  lines: string[];
  effect?: ShellEffect;
}

export interface ShellContext {
  accents: string[];
  /** Picks a fortune; injectable so tests are deterministic. */
  random?: () => number;
  now?: () => Date;
}

const FORTUNES = [
  "There are only two hard things in computer science: cache invalidation and naming things. — Phil Karlton",
  "Make it work, make it right, make it fast. — Kent Beck",
  "Programs must be written for people to read, and only incidentally for machines to execute. — Harold Abelson",
  "Simplicity is prerequisite for reliability. — Edsger W. Dijkstra",
  "The best error message is the one that never shows up. — Thomas Fuchs",
  "First, solve the problem. Then, write the code. — John Johnson",
  "Weeks of coding can save you hours of planning. — unknown",
  "It works on my machine. — every engineer, at least once",
  ":wq is a lifestyle.",
  "A test that never fails is a test that never tells you anything.",
];

const HELP = [
  "commands:",
  "  ls               list the booths",
  "  cd <booth>       walk over to a booth (tab completes)",
  "  whoami           who runs this place",
  "  fortune          a line of wisdom, or something like it",
  "  accent <name>    repaint the place",
  "  sound on|off     the clicky bits",
  "  date, echo, clear",
];

/** `writing/til`, `til`, `/writing/til` or `writing` → a booth's href. */
export const resolveBooth = (target: string): string | undefined => {
  const path = target.replace(/^~?\/?/, "").replace(/\/$/, "");
  if (path === "" || path === "..") return "/";

  const exact = leafBooths.find(
    (booth) => booth.href.slice(1) === path || booth.name === path,
  );
  if (exact) return exact.href;

  // A group (reads, writing, tinkering) opens its first booth.
  return booths.find((booth) => booth.name === path)?.href;
};

/** Names `cd` can complete, e.g. `now`, `writing/til`. */
export const completions = (): string[] =>
  leafBooths
    .filter((booth) => booth.href !== "/")
    .map((booth) => booth.href.slice(1));

export const complete = (input: string): string => {
  const match = /^cd\s+(\S*)$/.exec(input);
  if (!match) return input;
  const candidates = completions().filter((name) => name.startsWith(match[1]));
  if (candidates.length !== 1) return input;
  return `cd ${candidates[0]}`;
};

/** Runs one line typed at the home page prompt. */
export const runCommand = (input: string, ctx: ShellContext): ShellResult => {
  const [command = "", ...args] = input.trim().split(/\s+/);
  const arg = args.join(" ");

  switch (command) {
    case "":
      return { lines: [] };
    case "help":
    case "man":
      return { lines: HELP };
    case "ls":
      return {
        lines: [
          booths
            .filter((booth) => booth.href !== "/")
            .map((booth) => (booth.children ? `${booth.name}/` : booth.name))
            .join("  "),
        ],
      };
    case "cd": {
      const href = resolveBooth(arg);
      return href
        ? { lines: [], effect: { kind: "navigate", href } }
        : { lines: [`cd: no such booth: ${arg}`, "try: ls"] };
    }
    case "whoami":
      return {
        lines: [
          "adrian nare: full-stack engineer (TypeScript, Node, .NET).",
          "writes the tests too. vim keybindings, always.",
        ],
      };
    case "fortune": {
      const pick = Math.floor((ctx.random ?? Math.random)() * FORTUNES.length);
      return { lines: [FORTUNES[pick]] };
    }
    case "accent":
    case "theme":
      return ctx.accents.includes(arg)
        ? { lines: [`accent: ${arg}`], effect: { kind: "accent", name: arg } }
        : { lines: [`usage: accent ${ctx.accents.join("|")}`] };
    case "sound":
      return arg === "on" || arg === "off"
        ? {
            lines: [`sound: ${arg}`],
            effect: { kind: "sound", on: arg === "on" },
          }
        : { lines: ["usage: sound on|off"] };
    case "date":
      return { lines: [(ctx.now ?? (() => new Date()))().toString()] };
    case "echo":
      return { lines: [arg] };
    case "clear":
      return { lines: [], effect: { kind: "clear" } };
    case "pwd":
      return { lines: ["/home/adrian/playground"] };
    case "sudo":
      return {
        lines: [
          "visitor is not in the sudoers file. This incident will be reported.",
        ],
      };
    case "vim":
    case "vi":
    case "nvim":
      return {
        lines: [
          "you're already in it, sort of: j/k move around the sidebar.",
          "(and yes, :q works out there too. it just doesn't do anything.)",
        ],
      };
    case ":q":
    case ":wq":
    case "exit":
    case "logout":
      return { lines: ["there's no leaving the playground. try: cd now"] };
    case "rm":
      return { lines: ["rm: nice try."] };
    case "cat":
      return arg === "now.md"
        ? { lines: [], effect: { kind: "navigate", href: "/now" } }
        : { lines: [`cat: ${arg || "what"}: try cd-ing to a booth instead`] };
    default:
      return { lines: [`${command}: command not found. try: help`] };
  }
};
