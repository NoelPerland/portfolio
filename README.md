# Noel Perland — Full-stack portfolio

A portfolio featuring two standalone AI applications and a separate [browser game hub](https://noelperland.github.io/noels-game-hub/).

**Public portfolio:** https://portfolio-eta-amber-97.vercel.app/ · **Source branch:** `master` · **AI handoff:** [AGENTS.md](AGENTS.md)

## Continue on another device

Use Git and Node.js24:

```sh
git clone https://github.com/NoelPerland/portfolio.git
cd portfolio
npm ci
npm run dev
```

The homepage works without secrets. For the legacy AI routes, copy `.env.example` to `.env.local` and configure server variables from your authorized hosting account. Never copy secrets into Git or chat. Run `npm test`, `npm run typecheck` and `npm run build` before release.

## Connected projects

| Project | Live app | Source |
| --- | --- | --- |
| Reply Desk | [Open app](https://support-desk-ai-noel-perlands-projects.vercel.app/) | [support-desk-ai](https://github.com/NoelPerland/support-desk-ai) |
| Minute to Action | [Open app](https://minute-to-action-noel-perlands-projects.vercel.app/) | [minute-to-action](https://github.com/NoelPerland/minute-to-action) |
| Game Hub | [Play games](https://noelperland.github.io/noels-game-hub/) | [noels-game-hub](https://github.com/NoelPerland/noels-game-hub) |

Clone a product's repository separately to develop it. Each AI app has its own Next.js deployment, README, `.env.example`, tests and database schema notes. Portfolio cards link out to them. The embedded routes described below remain for compatibility with previous saved work.

## Verification and remaining work

As of 30 October 2026, standalone guest flows passed real AI generation, saved edits/reload, status changes, Markdown/CSV exports as applicable, separate-browser isolation, rejected foreign-origin mutations and phone layouts. The apps share a bounded Supabase quota ledger. Existing-account login has not been tested with credentials; registration is disabled until confirmation email delivery is tested. No payments, automatic sending or recording is included.

The homepage has production-build, desktop/phone/rotation, theme persistence, CV and legacy-route checks. Physical-device coverage remains limited. The original Liivo URL is independently hosted; the Vercel URL above is the maintained release.

The homepage preserves the original Liivo portfolio’s layout, typography, colors, portrait, CV, experience, skills, contact links, and theme switch. Only the Work collection changes to emphasize useful AI tools and collect the games behind one hub card. Its static markup is in `app/home-markup.ts`; `app/original-home.css` scopes the original styles so the existing application routes keep their own interface. `app/original-theme.tsx` adds the theme interaction and tolerates disabled browser storage.

## Reply Desk

`/projects/support-desk` — Turn a support request into a priority, category, explanation, reply draft, and next steps. Review and edit the output, track Open / Reviewed / Done status, revisit saved tickets, export Markdown, or delete a ticket.

## Minute to Action

`/projects/meeting-notes` — Extract decisions, actions, owners, dates, and open questions from meeting notes. Unknown owners and dates remain explicitly unassigned. Edit the plan, complete checklist items, save, and export a handoff.

Both call a real model. Missing credentials, provider failures, and invalid responses produce a readable error and preserve input. No canned result is presented as generated AI.

## Architecture

- Next.js App Router, React, TypeScript, responsive CSS, and Zod.
- Server-rendered portfolio; client workspace for the interactive tools.
- `/api/records` validates requests and model output. Credentials stay server-side.
- Groq Chat Completions with `openai/gpt-oss-20b`, bounded input, and a timeout.
- Supabase PostgreSQL for records and an atomic generation-quota ledger.
- Legacy embedded workflows share persistence and request validation; no service-role key is used. Featured standalone products have their own deployments.

Start with `lib/domain.ts`, `lib/server.ts`, `app/api/records/route.ts`, and `app/projects/[kind]/workspace.tsx`.

## Isolation and limits

A random 256-bit HttpOnly cookie identifies each browser. The server sends its SHA-256 digest as a database capability header. Row-level security requires a matching capability for SELECT, INSERT, UPDATE, and DELETE. API results omit ownership keys; mutations reject foreign origins and responses are not cached.

This is a browser-bound demo workspace, not a password account. Clearing cookies loses access; export first. The UI lists the latest 50 records. Access expires after 30 days; physical cleanup runs on the next generation request.

The quota function uses a transaction lock: 8 generations per workspace, 10 per hashed IP, and 100 globally in a rolling day. Failed attempts count. No raw IP is stored. The anonymous quota RPC can only consume the fixed budget and remove expired portfolio data; it cannot read records or reset limits. Supabase's SECURITY DEFINER warning for this narrow RPC and its deny-all usage table are intentional. Public quota exhaustion remains a demo availability limit. Add accounts and platform rate limiting before commercial use.

Pasted text is treated as untrusted source material. AI drafts require review and cannot send messages or act outside this app.

## Run and verify

Requires Node.js 22.22+ or 24+.

1. `npm ci`
2. Configure `SUPABASE_URL`, `SUPABASE_PUBLISHABLE_KEY`, and `GROQ_API_KEY` in your environment. Optional: `GROQ_MODEL`. Never commit secrets.
3. Apply `supabase/migrations/20261029_portfolio_ai.sql` once.
4. `npm run dev` → `http://localhost:3000`

```sh
npm test
npm run typecheck
npm run build
```

Tests cover bounded input, domain validation, editable-list normalization, checklist export, and provider failures. Release browser checks cover real AI generation, saved edits and reloads, checklists, downloads, deletion, theme persistence, mobile layouts, and cross-browser isolation. Database checks verify rejected ownership transfer and the durable quota boundary.

## Deployment

Use the existing Vercel `portfolio` project, Next.js preset, Node.js 24, and the `master` branch. Configure the three environment variables for Production. A paused Supabase project must be restored before saving records.

The release's Groq key expires on **27 January 2027**. Rotate `GROQ_API_KEY` in Vercel and redeploy before then. No paid upgrade is configured.

The original Liivo page is a separate deployment; GitHub changes alone do not update it.

## Development note

Built with AI-assisted implementation, iteration, testing, and deployment checks. Example messages and notes are fictional. Portrait, CV, contact details, and experience come from Noel's existing public portfolio. No customer counts, business results, or testimonials are invented.

## Portable browser regression

Run `npm run build`, then `npm run test:browser` using Node24. The test starts/stops its own local production server and uses installed Google Chrome. Set `CHROME_PATH` to another Chromium executable when Chrome is not installed in its usual location. `playwright-core` is a development dependency; no browser download or credentials are required.

Checks cover blocked browser storage, nonempty/empty draft leave warnings, failed generation preserving exact input and enabling retry. Portfolio also checks canceled discard. API responses are mocked; this does not verify live AI, database isolation, real account login, session renewal, email delivery, or physical devices. Registration remains disabled pending real confirmation-email verification.

The regression also checks rejection of foreign-origin mutations. Standalone checks cover guest auth status, disabled registration and guest logout with backend credentials cleared. Real account login, refresh, isolation and email delivery remain release checklist items requiring authorized test accounts.
