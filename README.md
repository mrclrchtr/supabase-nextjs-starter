<p align="center">
  <img src="./assets/demo.png" alt="Supabase Next.js Starter preview" />
</p>

<h1 align="center">⚡ Supabase Next.js Starter Kit ⚡</h1>

<p align="center">
  <a href="https://github.com/mrclrchtr/supabase-nextjs-starter/blob/main/LICENSE">
    <img src="https://img.shields.io/github/license/mrclrchtr/supabase-nextjs-starter" alt="License" />
  </a>
  <a href="https://github.com/mrclrchtr/supabase-nextjs-starter/actions/workflows/ci.yml">
    <img src="https://img.shields.io/github/actions/workflow/status/mrclrchtr/supabase-nextjs-starter/ci.yml?branch=main&label=CI" alt="CI status" />
  </a>
  <img src="https://img.shields.io/badge/pnpm-F69220" alt="pnpm" />
  <img src="https://img.shields.io/badge/Biome-60A5FA" alt="Biome" />
  <img src="https://img.shields.io/badge/Vitest-6E9F18" alt="Vitest" />
  <img src="https://img.shields.io/badge/Knip-7C3AED" alt="Knip" />
</p>

<p align="center">
  A production-leaning starter for building apps with Next.js 16 and Supabase.
</p>

<p align="center">
  It includes SSR-friendly Supabase auth, protected routes, Tailwind 4, shadcn-style UI primitives, TanStack Query, Vitest, Biome, pinned local tooling with mise, and CI coverage for app checks, local Supabase integration, and tracked migrations.
</p>

<div align="center">
  <a href="https://github.com/mrclrchtr/supabase-nextjs-starter"><strong>Repository</strong></a>
  ·
  <a href="#quick-start"><strong>Quick start</strong></a>
  ·
  <a href="#supabase-ssr-auth-and-nextjs-proxy"><strong>Auth + Proxy</strong></a>
  ·
  <a href="https://github.com/mrclrchtr/supabase-nextjs-starter/issues"><strong>Issues</strong></a>
</div>

<br />

## Features

- ⚡️ [Next.js](https://nextjs.org/) 16 with the App Router
- 💚 [Supabase](https://supabase.com/) auth with `@supabase/ssr`
- ⚛️ [React](https://react.dev/) 19
- ⛑  [TypeScript](https://www.typescriptlang.org/)
- 🎨 [Tailwind CSS](https://tailwindcss.com/) 4
- 🔌 [shadcn/ui](https://ui.shadcn.com/) style primitives
- 🪝 [TanStack Query](https://tanstack.com/query/latest) and React Query Devtools
- ⚪⚫ Dark mode with [next-themes](https://github.com/pacocoursey/next-themes)
- ✨ [Next Top Loader](https://github.com/TheSGJ/nextjs-toploader) for route transitions
- 🧪 [Vitest](https://vitest.dev/), [Testing Library](https://testing-library.com/), and [MSW](https://mswjs.io/)
- 🧹 [Biome](https://biomejs.dev/) for linting and formatting
- 🔍 [Knip](https://knip.dev/) for dependency analysis
- 🧰 [mise](https://mise.jdx.dev/) for pinned local and CI tooling
- 🪝 [hk](https://hk.jdx.dev/) for git hooks and local quality checks
- 👷 [GitHub Actions](https://github.com/features/actions) CI for linting, typechecking, dependency checks, tests, and build verification
- 🗄️ Supabase DB push workflow for tracked migrations
- 🔋 Bundle analysis and [Vercel Analytics](https://vercel.com/analytics)

## Quick start

### 1. Clone the repository

```bash
git clone https://github.com/mrclrchtr/supabase-nextjs-starter.git
cd supabase-nextjs-starter
```

### 2. Install the pinned toolchain and dependencies

```bash
mise install
pnpm install
```

`mise install` sets up the pinned local toolchain, including the Supabase CLI used by the local workflow.

If you want the local git hooks as well:

```bash
hk install --mise
```

### 3. Configure environment variables

Copy `.env.example` to `.env.local` and point it at either your local Supabase stack or a hosted project:

```bash
cp .env.example .env.local
```

For local development, start Supabase, apply the tracked migration, seed the starter notes table, and copy the generated values:

```bash
supabase start
supabase db reset --local
supabase status -o env
```

```bash
NEXT_PUBLIC_SUPABASE_URL=http://127.0.0.1:54321
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY=[INSERT SUPABASE API PUBLISHABLE KEY]
```

For hosted projects, use the values from your Supabase project settings under API.

### 4. Start the app

```bash
pnpm dev
```

The app will be available at [http://localhost:3000](http://localhost:3000).

## Requirements

Preferred setup:

- [mise](https://mise.jdx.dev/)
- Node.js
- pnpm
- Supabase CLI

If you do not use mise, install compatible versions of Node.js, pnpm, and the Supabase CLI manually. Local setup uses `supabase start`, `supabase db reset --local`, and `supabase status -o env`. CI currently pins Supabase CLI `2.75.0` for consistency.

## Environment variables and auth redirects

This starter currently requires these public Supabase variables:

- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY`

`src/lib/env.ts` keeps the landing page usable when both values are missing so the app can show setup guidance. Once either value is configured, the helper requires the full pair so partial setup fails fast.

If you use the built-in auth flows, configure these redirect URLs in the Supabase dashboard:

- `/auth/confirm?next=/protected` for email sign-up confirmation
- `/auth/update-password` for password reset

Relevant implementation:

- `src/app/(auth)/auth/confirm/route.ts`
- `src/features/auth/components/sign-up-form.tsx`
- `src/features/auth/components/forgot-password-form.tsx`
- `src/features/auth/components/update-password-form.tsx`

## Supabase SSR auth and Next.js Proxy

Starting with Next.js 16, Middleware is now called **Proxy**. This repository uses `proxy.ts` together with `src/lib/supabase/proxy.ts` to keep Supabase sessions in sync for SSR routes.

Why this exists:

- Server Components can read cookies, but they cannot write refreshed auth cookies back to the browser.
- Supabase recommends using Next.js Proxy to refresh auth state for SSR.
- The proxy calls `supabase.auth.getClaims()` and propagates refreshed cookies through both the request and the response.

This keeps the browser session and server-rendered session aligned and helps protect routes like `/protected`.

Relevant files:

- `proxy.ts`
- `src/lib/supabase/proxy.ts`
- `src/lib/supabase/server.ts`
- `src/app/(protected)/protected/page.tsx`

## Built-in flows

This starter already includes:

- sign up
- login
- forgot password
- update password
- auth confirmation route
- a protected page that requires an authenticated user
- a seeded `notes` table used by the protected server-rendered and client-rendered examples

Auth pages live under the `(auth)` route group at `src/app/(auth)/auth`, and the protected example lives under the `(protected)` route group at `src/app/(protected)/protected/page.tsx`.

## Tooling workflow

This repository uses:

- `mise` to pin developer tooling locally and in CI
- `hk` to run git hooks
- `Biome` for linting and formatting
- `Knip` for unused dependency checks
- `Vitest` for tests

Recommended bootstrap:

```bash
mise install
pnpm install
hk install --mise
```

## Scripts

- `pnpm dev` — Start the app in development mode at `http://localhost:3000`
- `pnpm build` — Create an optimized production build
- `pnpm start` — Start the production server
- `pnpm biome` — Run Biome checks
- `pnpm biome:fix` — Run Biome and apply fixes
- `pnpm biome:ci` — Run Biome in CI mode
- `pnpm typecheck` — Run the TypeScript compiler without emitting files
- `pnpm test` — Start Vitest in watch mode
- `pnpm test:ci` — Run Vitest once for CI or local verification
- `pnpm test:ui` — Start the Vitest UI
- `pnpm test:e2e` — Run the Playwright end-to-end suite locally
- `pnpm test:e2e:ci` — Run the Playwright suite with the CI reporter
- `pnpm knip` — Check for unused dependencies
- `pnpm check` — Run the main local quality gate (`biome:ci`, `typecheck`, `knip`, `test:ci`)
- `pnpm check:fix` — Apply Biome fixes, then run the full quality gate
- `pnpm analyze` — Build the project with bundle analysis enabled

## CI

GitHub Actions runs the following jobs on pushes and pull requests to `main`:

- `changes` — classifies file changes to decide whether local Supabase and Playwright need to run
- `checks` — runs `pnpm biome:ci`, `pnpm typecheck`, `pnpm knip`, `pnpm test:ci`, and `pnpm build`
- `integration` — conditionally starts the local Supabase stack and runs `pnpm test:e2e:ci`
- `deploy_db` — on pushes to `main`, conditionally links to Supabase and runs `supabase db push` when tracked migrations change

The CI workflow uses:

- `mise` to install the pinned toolchain
- explicit pnpm store caching via the shared setup action
- `pnpm install --frozen-lockfile` for reproducible installs
- `supabase start` and `supabase status -o env` for local integration coverage

Relevant workflow:

- `.github/workflows/ci.yml`

## Supabase migrations and DB push

Tracked migrations live under:

```text
supabase/migrations/
```

The starter ships with an initial `notes` migration plus seeded local data. The `deploy_db` job inside `.github/workflows/ci.yml` runs automatically on pushes to `main` after the rest of CI passes whenever tracked migrations change.

To use that job, configure these GitHub repository secrets:

- `SUPABASE_ACCESS_TOKEN`
- `SUPABASE_DB_PASSWORD`
- `SUPABASE_PROJECT_REF`

The job uses the Supabase CLI to:

1. link to the target project
2. run `supabase db push`

To reset your local database to the tracked schema and starter data, run:

```bash
supabase db reset --local
```

## Project structure

Current top-level layout:

```text
src/
  app/          Next.js routes, layouts, route handlers, metadata, and route-local private folders
  components/   Shared composed UI and design-system primitives
  features/     Feature slices such as auth and notes
  hooks/        Shared client hooks when the app needs them
  lib/          Infrastructure helpers such as env and Supabase runtime setup
  mocks/        MSW handlers for tests
  providers/    App-wide React providers
  test/         Test utilities
  utils/        Generic helpers still being narrowed over time
supabase/
  config.toml   Local Supabase stack configuration
  migrations/   Tracked database schema changes
  seed.sql      Local seed data
e2e/
  smoke.spec.ts Playwright smoke test
```

This starter uses these boundaries to stay scalable as the app grows:

```text
src/
  app/                Route ownership: pages, layouts, route handlers, metadata, route-local code
  features/<feature>/ Domain/product code owned by a feature slice
  components/ui/      Design-system primitives only
  components/shared/  Cross-feature composed UI only
  lib/                Infrastructure and domain-agnostic helpers
  providers/          App-wide React providers
```

### Structure contract

#### `src/app` owns routes

Use `src/app` for:
- route segments
- `page.tsx`, `layout.tsx`, `loading.tsx`, `error.tsx`, `not-found.tsx`
- `route.ts`
- metadata files like `favicon.ico`, `opengraph-image.png`, and `twitter-image.png`
- route-local private folders such as `_components` and `_lib` when code belongs to one route subtree only

Keep business logic out of route files when it has a stable home elsewhere. Pages, layouts, and route handlers should mostly orchestrate feature modules, navigation, and HTTP concerns.

#### `src/features/<feature>` owns domain code

Use feature folders for product/domain slices that may be used by multiple routes or entrypoints.

Good examples for this starter:
- `features/auth`
- `features/notes`

A feature can contain only the folders it actually needs, such as:
- `components/`
- `hooks/`
- `server/`
- `types/`

Do not create empty scaffolding just to match the pattern.

#### `src/components/ui` owns primitives

Keep generic design-system primitives here:
- buttons
- inputs
- cards
- labels
- dropdowns

No product semantics should live in this folder.

#### `src/components/shared` stays narrow

Use shared components only for cross-feature composed UI, such as:
- navigation
- shared app chrome
- generic feedback/presentational components reused across multiple features

Do not use `components/shared` as a catch-all for:
- route-only sections
- tutorial blocks tied to one route area
- domain-specific UI like auth forms or notes lists

If a component belongs to one route subtree, prefer route-local `_components`. If it belongs to one domain, prefer `features/<feature>/components`.

#### `src/lib` owns infrastructure, not feature queries

The target long-term home for infrastructure code is `src/lib`.

Good fits:
- Supabase runtime wiring
- env access
- generic helpers
- framework/platform integration

Bad fits:
- table/domain queries
- feature-specific data loading
- auth forms and domain UI

Important rule:
- `lib/supabase` should contain runtime and session infrastructure only
- feature-specific queries should live under `features/<feature>/server`

#### `src/providers` owns app-wide provider setup

Keep app-wide React providers here and compose them from the root layout.

Current examples:
- `src/providers/react-query-provider.tsx`
- `src/providers/theme-provider.tsx`

#### Starter/demo content is not the same as shared product code

This repository is both an app and a starter. Tutorial/setup/demo content should not silently turn into shared app architecture.

Use these rules:
- if starter content belongs only to the landing area, keep it route-local
- if it is a deliberate reusable teaching slice, document why it exists
- do not move starter-only content into `components/shared` just because it is reused once or twice

### Dependency direction

Use these rules when placing code:
- `app` may depend on `features`, `components/shared`, `components/ui`, `lib`, and `providers`
- feature server modules may depend on `lib`, but should not depend on feature UI
- `lib` must not depend on `features` or `app`
- domain types should not be owned by UI component files
- protected-route-only orchestration should prefer route-local `_lib` / `_components` over broad shared buckets

One concrete example from the current repo: the notes feature should own its data types and data-access code rather than keeping them in global `components`, `hooks`, or `utils` buckets.

### Current structure guidance

The repository now demonstrates the core boundaries directly in the tree:
1. landing-only starter/demo UI lives in route-local private folders under `src/app`
2. protected-route-only orchestration lives in route-local `_lib` / `_components`
3. `components/shared` stays narrow while `components/ui` holds primitives
4. feature slices such as auth and notes own their domain-specific code

## Git hooks

`hk.pkl` defines the local hook workflow:

- `pre-commit` runs safety and formatting checks
- `pre-push` runs `biome:ci` and `typecheck`

Useful commands:

```bash
hk install --mise
hk run check
hk run fix
```

## Paths

TypeScript path mapping is configured with the `@` prefix for `src` imports.

```tsx
import { Button } from "@/components/ui/button";
```

## License

This project is licensed under the MIT License. See [LICENSE](LICENSE) for details.

## Feedback and issues

Please file issues here:

- https://github.com/mrclrchtr/supabase-nextjs-starter/issues
