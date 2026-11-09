# About Us Page — Design & Content Brief

Route: `/about`. This is the source of truth for the design-skill pass, the
designer-agent review, and the implementation. Nothing here is invented —
every sentence of copy traces back to `../../docs/features.md`.

## Purpose

Give a visitor who clicked "About Us" (from the header, footer, or the
homepage's "Who We Are" stat section) the fuller company story: who
Northbridge is, what it stands for, who it serves, and an easy next step
into Contact. It should feel like the natural continuation of the homepage
— same design system, slightly quieter pacing (no carousel, no autoplay;
this is a reading page, not a landing page).

## What's genuinely available vs. not

Available (use it): company description, mission, vision, five values, who
they serve, the "tailored enquiries" note, the engagement approach
paragraph.

Not available (do not invent): founding year/history, number of employees,
leadership names/bios, team photos, client testimonials, awards. If the
design calls for a "trust" element, use the values/mission content itself
to carry that weight — not fabricated credentials.

## Section-by-section spec

### 1. Page hero banner
- Full-bleed photo (`hero-kampala-mosque-wide.jpg`), dark overlay (reuse the
  `.nb-cta-overlay` rgba(21,23,26,0.72) treatment), ~360px tall — shorter
  than the homepage's 480px hero since there's no carousel.
- Breadcrumb row above the heading: `Home / About Us` (Home links to `/`,
  About Us is plain text, red `/` separator) — first wayfinding element on
  the site, establishes the pattern for every future interior page.
- Heading: "About Northbridge Frontier Services"
- Subheading: "Security solutions for homes, businesses and valuable assets
  in Uganda." (the profile's own tagline)
- No CTA button here — the banner's job is orientation, not conversion.

### 2. Who we are (intro)
Two-column layout (text left ~60%, nothing decorative on the right at
desktop — keep it a reading column flanked by whitespace; stacks to single
column on mobile). Eyebrow label "WHO WE ARE" in crimson uppercase above a
section heading.

- Heading: "Protecting people, property and valuable assets"
- Paragraph 1 (verbatim from features.md §1): "NORTHBRIDGE FRONTIER SERVICES
  LTD provides security services for households, businesses and
  organisations in Uganda. Our services cover home and corporate security,
  CCTV camera installation, storage of valuable goods, security escorts and
  security dog services."
- Paragraph 2 (verbatim, "Approach"): "We help clients plan protection
  around their premises, activities and assets. From controlling access at
  a residence or workplace to installing surveillance systems and arranging
  the custody of valuable goods, our focus is on a clear service scope and
  practical security arrangements."
- Paragraph 3 (verbatim): "Each assignment begins with understanding the
  client's requirements. We then agree on the service, deployment or
  installation arrangements, responsibilities and communication needed to
  support the assignment."

### 3. Mission & Vision
Two side-by-side cards (stack on mobile), visually heavier than a plain
text section — this is the emotional core of the page. Dark card background
(`var(--color-dark)`) with white text, OR two light cards with a bold
crimson left border and a large icon — designer's call in the design-skill
pass, but it must read as more weighted than section 2, not the same as it.

- Card A — icon `fa-bullseye`, label "Our Mission": "To help protect
  people, property and valuable assets through practical security
  solutions, attentive service and clear accountability."
- Card B — icon `fa-eye`, label "Our Vision": "To become a trusted security
  services partner for households, businesses and organisations in
  Uganda."

### 4. Our Values
Five value cards (NOT six — don't pad to a neater grid number with
invented content). Use a flexible grid (`repeat(auto-fit, minmax(…))`) so
five items wrap cleanly (3+2) rather than forcing an awkward 5-column
squeeze on desktop or leaving a lonely orphan on tablet.

Section heading: "What Guides Our Work" (eyebrow: "OUR VALUES")

1. Icon `fa-handshake` — "Integrity" — "Integrity guides how we handle our
   responsibilities."
2. Icon `fa-binoculars` — "Vigilance" — "Vigilance supports attentive
   security work."
3. Icon `fa-user-shield` — "Confidentiality" — "Confidentiality shapes the
   handling of client information."
4. Icon `fa-user-tie` — "Professionalism" — "Professionalism guides our
   conduct and communication."
5. Icon `fa-clipboard-check` — "Accountability" — "Accountability guides our
   conduct and communication." *(the source groups professionalism and
   accountability under one sentence — split the shared clause naturally
   across both cards rather than duplicating it verbatim on both; keep each
   card's claim traceable to that sentence.)*

Background image option: `control-room-monitoring.jpg` as a full-bleed
section background behind these cards (dark overlay, white card content on
top) — gives Vigilance a literal visual anchor without captioning the photo
as anything it isn't (it's mood/atmosphere, not a claimed Northbridge
facility).

### 5. Who We Serve
Icon-chip grid, reusing the homepage's `.icon-badge` treatment exactly (same
visual language as the landing page's 6-service grid, so it reads as "part
of the same site," not a new component).

Section heading: "Who We Serve" (eyebrow: "CLIENTS")
Intro line: "We welcome enquiries from homeowners, landlords, property
managers, commercial businesses, warehouse operators, institutions and
organisations seeking protection for their premises or valuable assets."

7 chips, one per client type (icon suggestions, swap freely in the
design-skill pass as long as they're literal/legible at a glance):
Homeowners (`fa-house`), Landlords (`fa-key`), Property Managers
(`fa-building-user`), Commercial Businesses (`fa-shop`), Warehouse
Operators (`fa-warehouse`), Institutions (`fa-landmark`), Organisations
(`fa-people-group`).

### 6. Tailored enquiries + closing CTA
Short, quiet closing band (not another big banner — the page shouldn't end
louder than section 3). Light background, centered, max-width text column.

- Heading: "Beyond the Standard Profile?"
- Paragraph (verbatim, same `min(100%, 65ch)` reading-column treatment as
  the section 2 intro — don't leave this one at default width just because
  it's shorter): "If your requirements extend beyond the services described
  in this profile, contact us to discuss them. Additional assignments are
  considered according to suitability, available resources and applicable
  authorisations."
- CTA button: "Get in Touch" → `#contact` (update to `/contact` once that
  page ships)

## Design tokens & components to reuse (do not reinvent)

- Colors/type/spacing: `app/styles/tokens.css` — no new tokens.
- Buttons: `.btn`, `.btn--primary`.
- Icon badges: `.icon-badge` (from tokens.css, already used in the landing
  page's services grid).
- Card shadow/radius: `.card`.
- Section rhythm: `.section`, `.section-heading`, `.eyebrow` (all from
  tokens.css).
- Header and Footer: the existing `<Header />` / `<Footer />` components,
  unchanged — this page sits between them like every other page will.

New CSS file: `app/styles/about-page.css`, classes prefixed `nb-aboutpage-`
to avoid any collision with the homepage's existing `.nb-about-*` (the
"Who We Are" stats section on the landing page is a different component).

## Responsive notes

- Hero banner: breadcrumb and heading stack normally; keep legible at
  360px width (test against the same overlay-contrast standard as the
  landing hero).
- Mission/Vision cards: side-by-side ≥900px, stacked below.
- Values grid: flexbox with `flex-wrap` + `justify-content:center` (see
  resolved decision #3 below — this is NOT a CSS-grid `auto-fit` layout;
  that line was an earlier draft's leftover and is superseded). Tune each
  card's `flex-basis` per breakpoint explicitly (5-across desktop, centered
  3-then-2 tablet, single column mobile) — centering is not automatic from
  `flex-wrap` alone, it requires that explicit basis tuning.
- Who We Serve chips: same wrap behavior as the landing page's icon grid
  (6→3→2→1 pattern, but with 7 items so the last row will have 1 or 2
  depending on breakpoint — don't force an even grid by padding the list).

## Design-skill pass — resolved decisions

Ran this brief through the `ui-ux-pro-max` design-intelligence skill. Its
font-pairing and landing-pattern databases are tuned for editorial/SaaS
products and didn't have a direct match for "security company content
page" — flagging that per the skill's own no-fabrication rule rather than
forcing a fit. It did surface two concrete, directly-applicable rules from
its accessibility/typography data, folded in below. The rest of these
decisions are my own synthesis, made opinionated rather than left open:

1. **Typography: Poppins solo, no secondary typeface.** The pairing
   database's reading-page suggestions (Playfair/Crimson Pro/Newsreader —
   editorial serifs) are the wrong register for a security company and
   would break continuity with the already-shipped landing page. Instead,
   earn "reading feel" through spacing, not a new font: intro-section body
   copy at `1.05rem` with `line-height: 1.75` (vs. the landing page's 1.6),
   and the reading column capped at `max-inline-size: 65ch` — straight from
   the skill's own accessibility data (`.copy { inline-size: min(100%,
   65ch); }`) so lines never run so long they're tiring to read.
2. **Mission & Vision: two dark cards** (`var(--color-dark)` bg, white
   text), not crimson-left-border light cards. Corrected justification
   after designer review caught the original reasoning as inaccurate: the
   landing page's `.nb-about-stat` boxes are actually a plain 1px
   `var(--color-border)` (light gray) chip with no accent border at all —
   that pattern doesn't exist on the site, so this wasn't actually a
   duplication risk. The real reason to go dark is that it borrows gravity
   from the one other dark surface already on the site (the CTA
   banner's `rgba(21,23,26,0.72)` overlay treatment), which is the genuine
   source of "this reads as heavier." Note this also means `.icon-badge`
   (pink-tint circle, crimson icon) has never been placed on a dark card
   before — it's a new combination, not a borrowed one, so check it looks
   right visually during implementation rather than assuming it's proven.
   Guardrail pulled from the skill's contrast data: body text on the dark
   cards must stay at **minimum `rgba(255,255,255,0.85)`** opacity — the
   common mistake on dark cards is dropping secondary text to ~0.6 opacity,
   which reads fine to the designer and fails contrast for everyone else.
   **Contrast fix (designer review caught this as a real bug, not a
   nitpick):** the bare `.eyebrow` class is crimson-on-transparent, which
   on the dark card background (`#15171A`) is roughly 2:1 contrast — well
   under WCAG AA. If this section carries an eyebrow label, it must use the
   same inverted solid-crimson-pill-with-white-text treatment as
   `.nb-cta-eyebrow` in `cta-banner.css`, never the bare `.eyebrow` class,
   whenever text sits directly on a dark background anywhere on this page.
3. **Values grid (5 items): flexbox, not CSS grid auto-fit.** Auto-fit
   grids left-align whatever's left in the final row, so 5 items at a
   2-per-row tablet width produces a lonely left-aligned orphan. Use
   `display:flex; flex-wrap:wrap; justify-content:center;` instead — at
   desktop all 5 sit in one centered row (same visual density as the
   landing page's 6-icon grid, just one narrower), at tablet it wraps to a
   **centered** 3-then-2, at mobile a single column. The trailing row is
   centered, never orphaned left.
4. **Section rhythm via background alternation, not new decoration.**
   White (intro) → dark (`var(--color-dark)`, Mission/Vision) → light
   `#F2F2F2` (Values, with `control-room-monitoring.jpg` as a contained
   image panel beside the cards, not another full-bleed photo banner — the
   landing page already uses that move twice) → white (Who We Serve) →
   light `#F2F2F2` (closing CTA). Spacing also varies: hero is short
   (~360px), the intro section gets generous `--space-6` padding, Mission/
   Vision and the closing CTA use the tighter `--space-5` so neither
   competes with section 3's emotional peak. The one constant across every
   section is the existing crimson eyebrow-label pattern, which is already
   the site's signature wayfinding element — repeat it, don't replace it.

## Explicitly out of scope for this page

- No contact form here (that belongs to the Contact page, next in the
  roadmap).
- No service detail content (that's the Services hub + 6 detail pages).
- No team/leadership section (no real content exists for it).
