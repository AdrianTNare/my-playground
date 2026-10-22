# my-playground

Adrian Nare's personal site, rebuilt as a playground of booths. pnpm workspace monorepo.

| Workspace | What |
|---|---|
| `apps/playground` | The site (Next.js) |
| `packages/contracts` | Shared zod schemas for content |

```bash
pnpm install
pnpm dev         # every app in parallel
pnpm lint && pnpm typecheck && pnpm build
```

Design and roadmap: [`docs/architecture.md`](docs/architecture.md).
