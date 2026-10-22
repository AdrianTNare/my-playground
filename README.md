# my-playground

Adrian Nare's personal site, rebuilt as a playground of booths. pnpm workspace monorepo.

| Workspace | What |
|---|---|
| `apps/playground` | The site (Next.js, Tailwind, daisyUI) |
| `apps/cms` | Payload CMS for booth content (SQLite locally, Turso in production) |
| `apps/api` | Hono API with OpenAPI docs |
| `packages/contracts` | Shared zod schemas for content |
| `packages/content` | Bundled content: the CMS seed and the site's fallback |

```bash
pnpm install
pnpm dev         # every app in parallel
pnpm lint && pnpm typecheck && pnpm test && pnpm build
```

- Design and roadmap: [`docs/architecture.md`](docs/architecture.md)
- Hosting, env vars and the content flow: [`docs/DEPLOYMENT.md`](docs/DEPLOYMENT.md)
