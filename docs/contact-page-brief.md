# Contact Page — Design & Content Brief

Route: `/contact`. Second page in the roadmap. Unlike About Us, this page's
job isn't to explain the company — it's to be the place every CTA on the
rest of the site (`#contact` placeholders, "Get a Quote", "Request a Site
Assessment", "Get in Touch") actually lands on and gets something done.

## Purpose

Give a visitor who's already decided to reach out the fastest possible path
to doing so — direct channels first, a short enquiry form second — without
duplicating content that already lives on the homepage (the 4-step
engagement process) or About Us (the "tailored enquiries" CTA).

## The no-backend problem — stated plainly, not hidden

This is a static export with no server. There is no API route to receive
form submissions, and there's no real phone/email yet anyway (the footer's
contact details are explicitly placeholders — see `components/Footer.js`).
Two honest options, no fake-looking AJAX form that silently does nothing:

1. **Direct channels only** (tel: / mailto: links, no form) — simplest, but
   loses the structured "which service, what's the situation" context a
   form gives the team once real contact info exists.
2. **A real `mailto:` form** — collect the fields, and on submit build a
   `mailto:` URL (to the placeholder address) with the form data formatted
   into the subject/body, then navigate to it. This actually works with no
   backend (opens the visitor's own mail client with everything
   pre-filled) — it's not a fake submit button. Must be labeled honestly:
   a line under the form saying "Submitting opens your email app with this
   filled in" so nobody expects an in-page confirmation that isn't coming.

**Decision: option 2.** It's more useful than bare links once there's a
real inbox behind the placeholder, and it's not deceptive as long as it's
labeled for what it does.

## What's genuinely available vs. not

Available: the four engagement-process steps and their descriptions
(already fully used on the homepage — do not re-paste the same cards here,
see "Explicitly out of scope" below), the "tailored enquiries" sentence
(already the About page's closing CTA), the placeholder contact details
already defined in `components/Footer.js`.

Not available: a real phone number, a real email domain, a real street
address, business hours, response-time commitments. **Do not invent any of
these** — e.g. never write "we respond within 24 hours" since nothing in
the source material supports it. Keep every placeholder visually marked
the same way the footer already does (HTML comments flagging them in the
source, so whoever has real details later knows exactly what to replace).

## Section-by-section spec

### 1. Page hero banner
Same pattern as `/about`'s hero (reuse `.nb-aboutpage-hero*` classes
directly — this is the wayfinding pattern for every interior page now, not
a per-page reinvention): full-bleed photo (`security-gatehouse-entrance.jpg`),
dark overlay, breadcrumb `Home / Contact`, heading, subheading.

- Heading: "Contact Us"
- Subheading: "Tell us what you need — service required, general location,
  and preferred start date." (this is the opening line of the source
  material's step 1, repurposed as the hero's framing since it's literally
  "what to put in the form," not a duplicate of the full 4-step section)

### 2. Direct contact channels
Three cards, icon + label + the actual (placeholder) value, each a live
`tel:`/`mailto:` link where applicable:

1. `fa-phone` — "Call Us" — `+256 700 000 000` (`tel:+256700000000`)
2. `fa-envelope` — "Email Us" — `info@northbridgefrontier.ug`
   (`mailto:info@northbridgefrontier.ug`)
3. `fa-location-dot` — "Find Us" — "Northbridge Frontier Services Ltd,
   Uganda" (not a link — no real address to link to a map with)

Each card gets the same placeholder-flag HTML comment treatment as
`Footer.js` already uses, immediately above the value.

### 3. Enquiry form
Fields (all map directly to what step 1 of the engagement process asks
for, nothing extra invented):

- Full name (text, required)
- Email (email, required)
- Phone (tel, optional)
- Service needed (select: the 6 services + "Other / not sure yet",
  required)
- General location (text, required — matches "general location" from the
  source's step 1, phrased exactly that way so the field label is
  traceable)
- Preferred start date (date, optional — matches "preferred start date")
- Message (textarea, optional — free text for anything the fields don't
  cover)
- Message field gets `maxLength={600}` with a visible live character
  counter ("142 / 600") — designer review flagged that `mailto:` URLs
  silently truncate past ~2000 chars in several mail clients, and an
  unbounded textarea risks losing exactly the longest, most-context-rich
  messages without any warning.
- Submit button: "Send Enquiry"
- Helper line directly under the button, smaller/muted text: "This opens
  your email app with the details above, addressed to our team."
- **Persistent fallback line, separate from the helper text above**,
  visible right next to the button at all times (not just on failure):
  "If nothing opens, email us directly at info@northbridgefrontier.ug."
  Designer review's point: the channel cards in section 2 solve this in
  theory, but they're off-screen by the time someone has scrolled down to
  fill in the form, and the button-label change (below) only confirms the
  click happened — it can't confirm an OS mail handler actually existed to
  catch it.

On submit: build a `mailto:info@northbridgefrontier.ug?subject=...&body=...`
URL from the field values and navigate to it (`window.location.href =`).

**Design-skill correction:** the ui-ux-pro-max skill's own Forms guidance
flags "button click with no response" as a High-severity anti-pattern —
and it's right to flag it here even though the mechanism is honest:
`mailto:` opening the OS mail client isn't instant, and on a device with no
configured mail app it can fail silently with no in-page signal at all.
Resolved: the submit button's label swaps to "Opening your email app…" the
instant it's clicked (synchronous, before the `mailto:` navigation even
resolves), reverting back after ~2s. That's a real, truthful state change
— not a fake loading spinner pretending a server request is in flight —
and it satisfies "never leave a click with zero visible response."

### 4. Closing note
One short paragraph, not a big CTA band (there's nowhere further to send
someone from the contact page) — just sets expectations for what the form
above can handle:

"Need something not listed above? The form still reaches us — describe
what you need in the message field and we'll follow up." *(This is a
light paraphrase of the "tailored enquiries" idea for THIS page's context
— not a verbatim re-paste of the About page's version, which was written
as a CTA pointing here. Here, there's nothing to point to, so it reads as
reassurance, not a call to action.)*

## Design tokens & components to reuse (do not reinvent)

- Hero: **designer review caught that "reuse as-is" wasn't good enough** —
  keeping classes named `.nb-aboutpage-hero*` while a second page uses them
  is cheap to fix now and expensive to fix after a third or fourth page
  does the same. Extract to a genuinely shared `<InteriorHero />` component
  (`components/InteriorHero.js`, props: `image`, `alt`, `breadcrumbCurrent`,
  `heading`, `subheading`) backed by a renamed `app/styles/interior-hero.css`
  (`.nb-interior-hero*`, moved out of `about-page.css` entirely). About's
  hero gets migrated to this component as part of this page's work, not
  left on the old classes.
- Cards: `.card`, `.icon-badge`.
- Buttons: `.btn`, `.btn--primary`.
- Section rhythm: `.section`, `.section-heading`, `.eyebrow`.
- Header and Footer: unchanged, as on every page.

New CSS file: `app/styles/contact-page.css`, classes prefixed
`nb-contactpage-` for anything genuinely new (the channel cards, the form
itself) — but the hero import is the one deliberate exception noted above.

## Form UX requirements (non-negotiable, not a style preference)

- Every field has a real, visible `<label>` — never placeholder-text-only
  labels.
- Required fields marked, and native `required` attribute used (free
  baseline validation without extra code).
- Minimum touch target 44×44px on the select/inputs/button for mobile.
- Error/required state must not rely on color alone (native browser
  validation messages already satisfy this — don't suppress them with
  `noValidate` to build a custom one unless there's a real reason to).

## Responsive notes

- Channel cards: 3-across desktop, stack on mobile (reuse the same
  flexbox-center pattern from the About page's Values section if they need
  to wrap at any width — they're only 3 items, so this is unlikely to
  matter, but don't reach for a fixed 3-column grid that would orphan on
  an in-between width either).
- Form: single column always — two-column contact forms are a common
  source of mis-tapped fields on mobile; not worth it for 7 fields.

## Future enhancement (not now, not invented content — just a flag)

Designer review noted Ugandan SME contact behavior leans heavily on
WhatsApp over desktop mail clients. Worth a `wa.me` channel card once a
real phone number exists — correctly out of scope today since the number
is still a placeholder, but noting it here so it isn't silently forgotten.

## Explicitly out of scope for this page

- The 4-step engagement process cards — already fully built on the
  homepage (`components/Process.js`); do not duplicate them here.
- The About page's "Beyond the Standard Profile?" CTA — already covers
  tailored enquiries as a call-to-action; this page's closing note (section
  4) covers the same idea in a different, non-duplicate register.
- A map embed — no real address exists to pin, and a generic/wrong pin
  would be worse than no map.
- Any response-time/SLA claim not present in the source material.
