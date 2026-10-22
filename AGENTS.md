# Agent rules

## Git
- Never commit directly to `main`. Branch from the latest `origin/main`, push the branch, open a PR to `main`.
- Never force-push a shared branch.
- Conventional Commits: `type(scope): subject`, scope = workspace area (`playground`, `cms`, `api`, `contracts`, `repo`).

## Tooling
- pnpm only (`packageManager` pins the version). Node version in `.node-version`.
- Workspace scripts at the root fan out with `pnpm -r`: `dev`, `lint`, `typecheck`, `build`, `test`.
- Shared packages ship raw TypeScript (`exports` → `./src/index.ts`); Next consumes them via `transpilePackages`.

## Frontend
- React components are arrow functions: `export const X = () =>`. Props interfaces declared above the component, never inline.
- No `useEffect` unless there is no event-driven or render-time alternative; say why in a comment.
- The terminal look (palette, fonts, window chrome, `$` prompts, blinking cursor, accent picker) is locked. New UI uses the `frontend-design` skill within those tokens.
- Validate every boundary with zod schemas from `@playground/contracts`.

## Docs
- `docs/first-draft.md` — original notes. `docs/architecture.md` — decisions, booths, phases.
