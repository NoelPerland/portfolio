# Noel Perland — Full-stack portfolio

A portfolio with two working AI applications and a separate [browser game hub](https://noelperland.github.io/noels-game-hub/).

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
- Two domain workflows share persistence and request validation; no service-role key or second deployment is needed.

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
