# AGENTS.md

## Cursor Cloud specific instructions

Single-product repo: a static Next.js 15 (App Router) marketing site (`ytilikan-site`). No backend, database, or Docker. Standard scripts live in `package.json` (`dev`, `build`, `start`, `lint`).

- **Run (dev):** `npm run dev` serves on `http://localhost:3000`.
- **Build / type-check:** `npm run build` runs the production build and also does TypeScript type-checking (the most reliable static check here).
- **Lint caveat:** `npm run lint` (`next lint`) is deprecated and **interactive** — this repo has no ESLint config, so the command prompts "How would you like to configure ESLint?" and blocks waiting for TTY input. Avoid it in automation; rely on `npm run build` for type validation instead.
- **Missing assets are expected:** `public/logo.jpeg`, `public/logo-white.jpg`, and `public/hero-bg.jpg` are referenced but not committed, so those images render broken locally. This is not an error.
- **Contact form:** the contact form (bottom of `/`) posts directly to the external Web3Forms API using the access key committed in `lib/site.ts`, so submitting sends a real email. Use a clearly-labeled test message when exercising it end to end.
