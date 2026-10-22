import assert from "node:assert/strict";
import { test } from "node:test";

process.env.NODE_ENV = "test";
const { createApp } = await import("./app");
const app = createApp({
  getDb: () => {
    throw new Error("no database in these tests");
  },
});

test("GET /health answers ok", async () => {
  const res = await app.request("/health");
  assert.equal(res.status, 200);
  const body = await res.json();
  assert.equal(body.status, "ok");
  assert.equal(typeof body.uptimeSeconds, "number");
});

test("GET /doc serves an OpenAPI document listing /health", async () => {
  const res = await app.request("/doc");
  assert.equal(res.status, 200);
  const doc = await res.json();
  assert.equal(doc.info.title, "playground API");
  assert.ok(doc.paths["/health"]);
});

test("unknown paths are a JSON 404", async () => {
  const res = await app.request("/nope");
  assert.equal(res.status, 404);
  assert.match((await res.json()).message, /nope/);
});
