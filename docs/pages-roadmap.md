# Northbridge — Remaining Pages Roadmap

Phase 1 (landing page) is live. This is the plan for phase 2: the interior
pages, built and shipped **one at a time**, each held to the same visual bar
as the landing page — not rushed, not "good enough."

## Page order

1. **About Us** — mission/vision/values, who we serve, trust-building. Highest
   content readiness (already drafted in the original company-profile
   extraction) and every nav/footer link already points at it.
2. **Contact** — most CTAs across the whole site point here (`#contact`
   placeholders today); needed before the other pages' CTAs mean anything.
3. **Services** — a hub page plus one detail page per service (6 total):
   Home & Residential Security, Corporate & Commercial Security, CCTV
   Installation, Storage of Valuables, Security Escorts, Security Dogs.
   Largest content set, built last among the "core" pages so the hub can
   link to real detail pages instead of anchors.
4. **Careers** — least source material (the company profile has no job
   listings), so it's a "why work with us" + contact-funnel page rather than
   a listings board.

Blog/Newsroom is **not** in this roadmap — there's no real content for it
yet (no newsroom exists), so building one would mean inventing company news.
Revisit only if/when there's something real to publish.

## Per-page production pipeline

Every page goes through the same nine steps before it's considered done.
No skipping steps to go faster.

1. **Scope the page.** Pull its content straight from
   `../../docs/features.md` / the company profile — never invented. Note
   what's genuinely missing (e.g. Careers has no real openings) and mark it
   as a placeholder rather than fabricating specifics.
2. **Source new assets.** Only what that page needs beyond what's already in
   `public/images/` — same process as the landing page (free-license stock,
   optimized, logged in `public/images/CREDITS.md`).
3. **Write an exhaustive design + content brief.** Page purpose, full section
   list, the actual copy for every heading/paragraph, which design tokens
   and existing components to reuse, image assignments, responsive notes.
   This brief is the single source of truth for steps 4–6.
4. **Run it through the design skill** (`ui-ux-pro-max`) to pressure-test and
   sharpen the visual direction — typography pairing, spacing rhythm, hero
   treatment, component choices — before anything is built.
5. **Independent designer-agent review.** A fresh agent, briefed to act as a
   senior visual/UX designer and loaded with the `ui-ux-pro-max` skill,
   reviews the brief from step 4 against visual-design standards (hierarchy,
   contrast, whitespace, consistency with the Northbridge design system
   already established on the landing page) and either signs off or sends it
   back with specific changes. Iterate until it signs off — this agent has
   no stake in "getting it done," only in "getting it right."
6. **Implement.** Build the page as a Next.js route reusing `tokens.css` and
   existing components (Header/Footer) rather than reinventing them.
7. **QA pass.** Same bar as the landing page: dev-server screenshot review,
   responsive check (mobile/tablet/desktop), console-error check.
8. **Ship.** Commit, push to `main` — the existing GitHub Actions workflow
   builds and deploys automatically.
9. **Move to the next page** in the order above.

## Status

| Page | Assets | Brief | Design-skill pass | Designer review | Built | Shipped |
|---|---|---|---|---|---|---|
| About Us | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ |
| Contact | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ |
| Services hub | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ |
| Services × 6 detail pages | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ |
| Careers | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ |
