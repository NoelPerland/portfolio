# AI handoff

Read README.md first. This repository is Noel's portfolio, not the home of every featured product.

## Preserve the approved design
- The user explicitly requested the original cream/Bricolage/orange Liivo design back. Do not redesign it.
- Homepage: `app/page.tsx`, static trusted `app/home-markup.ts`, scoped `app/original-home.css`, theme `app/original-theme.tsx`.
- Keep portrait, CV, experience, skills and contact details. Update Work cards when a product has a verified public deployment.
- The two new AI products live in separate repositories linked in README. Games live behind one Game Hub card.

## Existing users and data
- Keep `/projects/support-desk`, `/projects/meeting-notes` and `/api/records` working for existing saved work.
- Never replace real AI with canned output, expose server secrets, remove RLS, reset saves, or modify unrelated Supabase tables.
- The Supabase project is shared. Its food_entries table belongs to another app.
- Guest work is cookie-bound and expires after 30 days. Public generation quotas are shared with the standalone apps.

## Change and verify
Use Node 24, `npm ci`, `npm test`, `npm run typecheck`, `npm run build`.
For UI changes inspect the actual page at 1366x768, 1920x1080, 390x844 and 360x640, plus rotation, keyboard access and both themes.
For server changes test successful generation, provider failure with input retained, edit/reload, export and separate-browser isolation.
Do not call an HTTP200 or a visible canvas an end-to-end pass. Report untested accounts/devices honestly.

## Release
Source branch: `master`. Existing Vercel project: `portfolio`, team `noel-perlands-projects`, Node24. Pushing master deploys production.
Use the existing deployment and credentials; do not create a duplicate project. Keep secrets out of Git, logs, screenshots and chat.
GitHub/Vercel changes do not publish the separate old Liivo URL.
