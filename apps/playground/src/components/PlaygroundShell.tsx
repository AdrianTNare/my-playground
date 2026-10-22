"use client";

import { useRouter } from "next/navigation";
import { useRef, useState, type KeyboardEvent } from "react";
import { ACCENT_OPTIONS } from "@/components/AccentPicker";
import { readGuestbook, signGuestbook } from "@/lib/guestbook";
import { complete, runCommand } from "@/lib/shell";
import { playTick } from "@/lib/sound";
import { useUiStore } from "@/stores/ui";

interface Line {
  id: number;
  text: string;
  /** The echoed command, styled as a prompt. */
  prompt?: boolean;
}

const MAX_LINES = 40;
const ACCENTS = ACCENT_OPTIONS.map((option) => option.name);

/**
 * A small shell at the foot of the home page's booth listing. It never takes
 * focus by itself, so the page-wide vim keys keep working until a visitor
 * clicks in and types.
 */
export const PlaygroundShell = () => {
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);
  const nextId = useRef(0);
  const [lines, setLines] = useState<Line[]>([]);
  const [input, setInput] = useState("");
  const [history, setHistory] = useState<string[]>([]);
  const [cursor, setCursor] = useState<number | null>(null);

  const print = (entries: Omit<Line, "id">[]) =>
    setLines((current) =>
      [
        ...current,
        ...entries.map((entry) => ({ ...entry, id: nextId.current++ })),
      ].slice(-MAX_LINES),
    );

  const submit = () => {
    const command = input.trim();
    if (!useUiStore.getState().muted) playTick();
    setInput("");
    setCursor(null);
    if (command) setHistory((current) => [...current, command]);

    const result = runCommand(command, { accents: ACCENTS });
    const effect = result.effect;
    if (effect?.kind === "clear") {
      setLines([]);
      return;
    }
    print([
      { text: command, prompt: true },
      ...result.lines.map((text) => ({ text })),
    ]);

    if (effect?.kind === "navigate") router.push(effect.href);
    if (effect?.kind === "guestbook-read") {
      readGuestbook()
        .then((entries) =>
          print(
            entries.length === 0
              ? [
                  { text: "the guestbook is empty. be the first:" },
                  { text: 'echo "hello" >> guestbook' },
                ]
              : entries
                  .slice(0, 10)
                  .reverse()
                  .map((entry) => ({
                    text: `${entry.createdAt.slice(0, 10)}  ${entry.name}: ${entry.message}`,
                  })),
          ),
        )
        .catch(() =>
          print([
            { text: "cat: guestbook: couldn't reach it, try again later" },
          ]),
        );
    }
    if (effect?.kind === "guestbook-sign") {
      signGuestbook(effect.message)
        .then(() =>
          print([{ text: "signed. thanks for stopping by. (cat guestbook)" }]),
        )
        .catch((error: Error) =>
          print([{ text: `guestbook: ${error.message}` }]),
        );
    }
    if (effect?.kind === "accent") {
      const option = ACCENT_OPTIONS.find((o) => o.name === effect.name);
      if (option) useUiStore.getState().setAccent(option.value);
    }
    if (effect?.kind === "sound") {
      const { muted, toggleMuted } = useUiStore.getState();
      if (muted === effect.on) toggleMuted();
    }
  };

  const onKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      event.preventDefault();
      submit();
    } else if (event.key === "Tab" && input.startsWith("cd ")) {
      event.preventDefault();
      setInput(complete(input));
    } else if (event.key === "ArrowUp" && history.length > 0) {
      event.preventDefault();
      const next =
        cursor === null ? history.length - 1 : Math.max(0, cursor - 1);
      setCursor(next);
      setInput(history[next]);
    } else if (event.key === "ArrowDown" && cursor !== null) {
      event.preventDefault();
      const next = cursor + 1;
      setCursor(next < history.length ? next : null);
      setInput(next < history.length ? history[next] : "");
    } else if (event.key === "l" && event.ctrlKey) {
      event.preventDefault();
      setLines([]);
    } else if (event.key === "Escape") {
      inputRef.current?.blur();
    }
  };

  return (
    <div
      className="mt-8 border-t border-dashed border-[#3a302a] pt-5 font-mono text-[13px]"
      onClick={() => inputRef.current?.focus()}
    >
      <div aria-live="polite" className="flex flex-col gap-0.5">
        {lines.map((line) =>
          line.prompt ? (
            <div key={line.id} className="text-bright">
              <span className="text-amber">$</span> {line.text}
            </div>
          ) : (
            <div key={line.id} className="whitespace-pre-wrap text-clay">
              {line.text}
            </div>
          ),
        )}
      </div>
      <label className="flex items-center gap-2">
        <span aria-hidden className="text-amber">
          $
        </span>
        <span className="sr-only">Type a command, or help</span>
        <input
          ref={inputRef}
          value={input}
          onChange={(event) => setInput(event.target.value)}
          onKeyDown={onKeyDown}
          autoComplete="off"
          autoCapitalize="off"
          spellCheck={false}
          placeholder="type help, or cd now"
          className="min-h-9 min-w-0 flex-1 bg-transparent text-bright caret-accent outline-none placeholder:text-[#6e6157]"
        />
      </label>
    </div>
  );
};
