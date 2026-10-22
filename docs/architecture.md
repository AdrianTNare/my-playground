# my-playground — architecture

The site is a "playground" of **booths** reached from a sidebar, keeping the terminal look of
the original landing page. Source notes: [`first-draft.md`](./first-draft.md).

## Decisions

| Topic | Decision |
|---|---|
| Repo shape | pnpm workspace monorepo (tooling mirrors amax-ecommerce): `apps/*`, `packages/*` |
| Site | `apps/playground` — Next 16, React 19, TypeScript, Tailwind 4 + daisyUI 5 |
| CMS | `apps/cms` — Payload 3 as its own Next app, `@payloadcms/db-sqlite` (file DB locally, Turso in prod) |
| Backend | `apps/api` — Hono + `@hono/zod-openapi` + drizzle/libsql skeleton; only `/health` until a feature needs it |
| Contracts | `packages/contracts` — zod schemas for every CMS DTO; the playground parses at fetch |
| Data | Content pages are server components that fetch Payload REST and parse with contracts. TanStack Query only for client-interactive bits. zustand for UI prefs (accent, mute, mobile nav). TanStack Form with the first form |
| Content authoring | Raw markdown (`code` field, markdown language) for short pieces — TIL, media reactions, refs. Lexical rich text for longer pieces — reflections, bliki — with an `afterRead` markdown copy via `convertLexicalToMarkdown` |
| Design | Existing look is locked: terracotta default accent, JetBrains Mono / Space Grotesk / Hanken Grotesk, terminal window chrome, `$ whoami`, blinking cursor, accent picker. New surfaces follow the `frontend-design` skill within those tokens |
| Sounds | Synthesized Web Audio tick on `[data-nav-sound]`, on by default, mute toggle persisted; silent under `prefers-reduced-motion` or a hidden tab |
| Blog | Writing → Blog lists previews that link out to the external blog |
| Placeholders | A booth without real content shows one "coming soon" item |
| Hosting | Decided later |

## Booths (information architecture)

| Sidebar | Route(s) |
|---|---|
| home | `/` |
| now | `/now` |
| unoffice hours | `/unoffice-hours` |
| media | `/media`, `/media/[slug]` |
| reads ▸ refs, bliki | `/reads/refs`, `/reads/bliki` |
| writing ▸ til, reflections, blog | `/writing/til`, `/writing/reflections`, `/writing/blog` |
| projects | `/projects`, `/projects/[slug]` |
| tinkering ▸ terminal, toolset | `/tinkering/terminal`, `/tinkering/toolset` |

Desktop (`lg+`): sticky left sidebar with collapsible groups. Mobile: top bar with a
`booths` menu trigger that opens a full-screen overlay.

## Phases

0. **Foundation** — docs, workspace tooling, move the site into `apps/playground` and upgrade it with no visual change.
1. **Booth shell** — sidebar + mobile overlay, nav sounds, home callout, every route (placeholder content except Now, Unoffice Hours, Projects). Content is local typed data shaped by contracts.
2. **CMS + API** — Payload collections, seed, fetch layer replaces local content, media detail embeds, Hono skeleton.
3. **Polish** — view transitions, ⌘K booth switcher, OG images, RSS, sidebar counts.
4. **Deploy** — hosting, Turso, `DEPLOYMENT.md`, domain.
