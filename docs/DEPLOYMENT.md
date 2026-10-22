# Deployment

Three Netlify sites, all built from `main` of this repo. Each has its own base
directory and reads the `netlify.toml` inside it.

| Site | Base directory | URL | What |
|---|---|---|---|
| `adriannare` | `apps/playground` | https://adriannare.netlify.app | The site |
| `adriannare-cms` | `apps/cms` | https://adriannare-cms.netlify.app | Payload admin + REST API |
| `adriannare-api` | `apps/api` | https://adriannare-api.netlify.app | Hono API (`/health`, `/reference`) |

Deploy previews build for every PR on each site.

## How content flows

```
editor ──publish──▶ CMS (Payload, Turso) ──POST /api/revalidate──▶ playground
                                                                   │
visitor ◀──────── cached page, refetched from the CMS REST API ◀───┘
```

- The playground reads published content from `CMS_URL` server-side, cached
  for an hour per booth.
- Publishing in the CMS calls the playground's `/api/revalidate` with
  `REVALIDATE_SECRET`, so the change shows on the next visit.
- Without `CMS_URL` (or if the CMS is down at build time) the playground falls
  back to the content bundled in `@playground/content`. It never fails to build
  because of the CMS.

## Environment variables

### Playground (`adriannare`)

| Variable | Value |
|---|---|
| `CMS_URL` | `https://adriannare-cms.netlify.app` |
| `REVALIDATE_SECRET` | Shared secret, same as the CMS's |

### CMS (`adriannare-cms`)

| Variable | Value |
|---|---|
| `PAYLOAD_SECRET` | `openssl rand -hex 32`; signs admin sessions |
| `DATABASE_URL` | `libsql://playground-cms-terminal-knight.aws-ap-northeast-1.turso.io` |
| `DATABASE_AUTH_TOKEN` | `turso db tokens create playground-cms` |
| `CMS_URL` | `https://adriannare-cms.netlify.app` |
| `PLAYGROUND_URL` | `https://adriannare.netlify.app` |
| `REVALIDATE_SECRET` | Same value as the playground's |

### API (`adriannare-api`)

| Variable | Value |
|---|---|
| `CORS_ORIGIN` | `https://adriannare.netlify.app` |
| `DATABASE_URL` / `DATABASE_AUTH_TOKEN` | Only once the API has tables |

## Database

Turso (hosted libsql), free tier, account `terminal-knight`. One database for
the CMS, `playground-cms`, in the default group (Tokyo, `aws-ap-northeast-1`).
That's far from Netlify's functions, so a first uncached request is slow; the
playground caches every booth, so visitors rarely feel it. Moving the group
closer is a later option.

To recreate it:

```bash
turso db create playground-cms
turso db show playground-cms --url
turso db tokens create playground-cms
```

Migrations live in `apps/cms/src/migrations` and run on every CMS build
(`pnpm migrate && pnpm build`). After changing a collection:

```bash
cd apps/cms
pnpm migrate:create <name>   # commit the generated files
```

To load the bundled content into a fresh database:

```bash
cd apps/cms
DATABASE_URL=libsql://… DATABASE_AUTH_TOKEN=… PAYLOAD_SECRET=… pnpm seed
```

The seed upserts by slug, so it's safe to rerun.

## First admin user

Open `/admin` on the CMS. With no users yet, Payload asks you to create the
first one.

## Local development

```bash
pnpm install
cp apps/cms/.env.example apps/cms/.env          # set PAYLOAD_SECRET
pnpm --filter @playground/cms migrate
pnpm --filter @playground/cms seed
pnpm dev
```

| App | URL |
|---|---|
| Playground | http://localhost:3000 (set `CMS_URL=http://localhost:3030` to read the CMS) |
| CMS | http://localhost:3030/admin |
| API | http://localhost:3040/reference |
