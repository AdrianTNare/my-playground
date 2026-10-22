import assert from "node:assert/strict";
import { mkdtempSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { after, test } from "node:test";
import { migrate } from "drizzle-orm/libsql/migrator";

process.env.NODE_ENV = "test";
const { createApp } = await import("../app");
const { createDb } = await import("../db/client-node");

const dir = mkdtempSync(join(tmpdir(), "guestbook-"));
const db = createDb(`file:${join(dir, "test.db")}`);
await migrate(db, {
  migrationsFolder: join(import.meta.dirname, "../../drizzle"),
});
const app = createApp({ getDb: () => db });
after(() => rmSync(dir, { recursive: true, force: true }));

const sign = (body: unknown) =>
  app.request("/guestbook", {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify(body),
  });

test("signing adds an entry, listed newest first", async () => {
  assert.equal((await sign({ message: "first!" })).status, 201);
  const res = await sign({ name: "ada", message: "lovely booths" });
  assert.equal(res.status, 201);
  assert.equal((await res.json()).name, "ada");

  const list = await (await app.request("/guestbook")).json();
  assert.deepEqual(
    list.map((entry: { message: string; name: string }) => [
      entry.name,
      entry.message,
    ]),
    [
      ["ada", "lovely booths"],
      ["a visitor", "first!"],
    ],
  );
});

test("rejects links, empty and overlong messages", async () => {
  for (const message of ["see https://spam.example", "   ", "x".repeat(281)]) {
    const res = await sign({ message });
    assert.equal(res.status, 400, message);
    assert.match((await res.json()).message, /message/);
  }
});

test("rejects bots that fill the honeypot", async () => {
  const res = await sign({ message: "hello", website: "http://bot" });
  assert.equal(res.status, 400);
});
