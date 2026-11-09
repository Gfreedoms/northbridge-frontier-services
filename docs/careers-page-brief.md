# Careers Page — Design & Content Brief

Route: `/careers`. Fourth page shipped (jumped ahead of the Services hub
in the original roadmap order, per explicit instruction — Services hub +
6 detail pages remains the next item after this).

## Purpose — and the constraint that shapes everything else

There are **no open positions right now**. The user said so explicitly.
Every other interior page so far has had real source material to build
from (the company profile); this one doesn't — there's no job board, no
listed roles, no stated benefits, no culture copy anywhere in the source
material. The honest move is to build a genuine empty-state page, not to
invent "benefits" or "culture" copy to make it feel fuller than it is.

## What's genuinely available vs. not

Available: the five values (already fully built on `/about#values` —
this page should point there, not re-render the cards), the mission/
vision, the general enquiry mechanism (the `/contact` form already
accepts a message — speculative applicants can use it).

Not available — do not invent: specific job titles, departments, team
size, benefits, salary ranges, office photos of the real team, "culture"
testimonials. If the design calls for warmth or personality, get it from
tone of voice and photography, not fabricated specifics.

## Section-by-section spec

### 1. Page hero banner
Shared `<InteriorHero />` (same component About and Contact use — no new
hero pattern for a third page in a row).

- Image: `security-team-colleagues.jpg`
- Breadcrumb: `Home / Careers`
- Heading: "Careers at Northbridge"
- Subheading: "Join a team focused on practical security solutions,
  attentive service and clear accountability." *(built from the mission
  statement's own language — "practical security solutions, attentive
  service and clear accountability" — not new marketing copy)*

### 2. No open positions (the centerpiece, not an afterthought)
This is the actual content of the page — it should look designed, not
like a missing-content placeholder. Centered, generous whitespace,
single focal icon.

- Icon: `fa-clipboard-list`, standalone (no card wrapper), inside a
  circle **96–120px diameter with a ~2.5rem icon** — a real size bump
  from the default 56px `.icon-badge`, not the same token reused at
  default size. Designer review flagged that reusing `.icon-badge`
  unmodified here would read as "a smaller, sadder orphan" of the
  pattern that works elsewhere (3–5 icons in a row, each paired with a
  card) — the differentiation only survives with a concrete, larger size.
- Heading: "No Open Positions Right Now"
- Body: "We don't have any roles open at the moment. If that changes,
  this page is where we'll list them." *(plain, factual — no "but check
  back soon, exciting things coming" filler that implies knowledge we
  don't have)*

### 3. Speculative interest — route to the real mechanism that exists
Not a second form (the Contact page already has one) — a short bridge to
it, honest about what it is.

- Heading: "Want to Be Considered if Something Opens?"
- Body: "You're welcome to send your details through our contact form.
  Start your message with &ldquo;Speculative job enquiry&rdquo; so it's
  easy to tell apart from a security-service request, then pick whichever
  service area is closest to your interest." *(strengthened per designer
  review: `ContactForm.js` is a client-side `mailto:` generator whose
  auto-subject is `Enquiry from {name} — {service}` — with no Careers
  option in the service dropdown, a generic "mention it's speculative"
  instruction risks the recipient never reading past the subject/service
  field into the body. Leading the message body with an explicit flag is
  the one copy change that actually makes it self-identifying, with zero
  new code or fields.)*
- CTA button: "Go to Contact Form" → `/contact`

### 4. What guides us (a pointer, not a re-build)
One short line + a link, not a duplicated Values grid. Keeps the page
from feeling thin without re-rendering content that already has a proper
home.

- "Our work is guided by integrity, vigilance, confidentiality,
  professionalism and accountability." → linked text or a small CTA:
  "Read more about our values" → `/about#values`

## Design-skill pass

Checked against `ui-ux-pro-max`'s Feedback/Empty-States rule: "show a
helpful message AND an action; never a blank empty screen." The brief
already satisfies this by design — section 2 is the message, section 3
is the action (routes to the real, working Contact form) — so no change
needed, just confirmation that splitting message and action into two
short sections rather than cramming both into one dense block is the
right call, not over-engineering.

## Design tokens & components to reuse (do not reinvent)

- `<InteriorHero />`, `app/styles/interior-hero.css` — unchanged.
- `.icon-badge`, `.btn`, `.btn--primary`, `.section`, `.section-heading`.
- `next/link` for every internal href (About/Contact's basePath bug is
  the cautionary tale here — no bare `<a href="/...">` on this page,
  ever).

New CSS file: `app/styles/careers-page.css`, classes prefixed
`nb-careerspage-`.

## Responsive notes

- Empty-state section: icon + heading + body all stay centered and
  stacked at every width — there's no grid/row to break here, so this is
  low-risk, but keep the max text width constrained (`min(100%, 60ch)`)
  so the single paragraph doesn't stretch edge-to-edge on wide screens.

## Explicitly out of scope for this page

- Any job listing, department, or role — none exist.
- A newsletter/"notify me when positions open" signup — would need real
  email infrastructure this static site doesn't have; the existing
  Contact form already covers the same intent without adding a new
  mechanism.
- Team photos claiming to be the real Northbridge team (none exist) —
  the hero photo is mood/stock, same honesty standard as every other
  page's photography.
