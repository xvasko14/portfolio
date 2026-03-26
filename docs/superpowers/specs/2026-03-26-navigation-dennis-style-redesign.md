# Navigation Dennis-Style Redesign

Date: 2026-03-26
Status: Approved design, ready for implementation planning

## Goal

Redesign the site navigation to follow a Dennis-style two-state pattern while keeping the portfolio's existing dark visual language.

The current navigation feels too button-like. The new design should feel lighter and more editorial at the top of the page, then switch into a more compact menu-trigger model after scroll.

## Scope

In scope:

- desktop header navigation
- scrolled header state
- circular menu trigger
- fullscreen menu overlay
- active state rules
- light verification only

Out of scope:

- route intro behavior
- hero redesign
- content copy changes
- major layout changes outside header/menu
- broad new test coverage

## Chosen Direction

Chosen direction:

- close Dennis-inspired structural adaptation
- keep the dark DevOps brand styling
- remove pill-button navigation entirely
- use a two-state header model
- keep existing accessibility/menu behavior while changing visual structure

## Header States

### Top-of-page state

When the user is at the top of the page:

- show brand on the left
- show clean text navigation links on the right
- do not show the circular menu trigger
- remove all pill styling, background fills, and capsule borders

This state should feel open, calm, and close to the Dennis hero navigation pattern.

### Scrolled state

After the user scrolls down:

- header switches into a compact state
- top text navigation disappears
- circular menu trigger appears
- clicking the trigger opens the fullscreen navigation overlay

This state should feel deliberate and recognizable as the Dennis-like navigation behavior the user requested.

## Desktop Navigation Visual Direction

The top-of-page text navigation should:

- stay in a single horizontal row
- use clean light typography
- have more spacing between links
- avoid any button/chip styling
- use subtle reduced emphasis for inactive links
- use a dot-style active indicator for the current route

## Active State Rules

Current-route logic should be:

- `Home` active only on `/`
- `Projects` active on `/projects` and `/projects/[slug]`
- `About` active on `/about`
- `Contact` active on `/contact`

The active state should use:

- a small dot indicator
- not a filled button
- not a bordered capsule

## Fullscreen Menu Overlay

### Structure

The overlay should remain a fullscreen navigation screen, not a centered card.

It should contain:

- large primary navigation links
- small social/contact links near the bottom

It should not retain the current heavier modal-card feeling.

### Content

Overlay content should be intentionally minimal:

- main site links
- small socials/contact links below

It should not include:

- role text block
- large email CTA card
- extra panel chrome

### Active State

The current page inside the overlay should use the same dot-language as the top navigation.

## Interaction and Accessibility

The existing menu behavior should stay intact:

- Escape closes the overlay
- backdrop click closes the overlay
- focus handling remains preserved

This redesign changes the visual system and header state behavior, not the underlying accessibility model.

## Technical Design

Likely files in scope:

- `src/components/site/Header.astro`
- `src/components/site/MenuOverlay.astro`
- `src/styles/global.css`
- existing menu script only if a small state hook is needed for the two-state header

Current-route logic should come from pathname/layout context rather than static site data.

## Verification Approach

The user explicitly requested minimal testing overhead.

Required:

- one light verification that nav still renders and menu still opens
- local browser review for visual quality and state switching

Not required:

- large new end-to-end test coverage
- complex scroll/interaction matrix

## Risks and Guardrails

Main risks:

- top state still looking too much like buttons
- scrolled state feeling disconnected from the top state
- overlay becoming a modal card again
- active state becoming inconsistent across nested project routes

Guardrails:

- top state uses text links only
- scrolled state uses circular menu trigger
- overlay stays fullscreen and minimal
- active state follows one consistent dot-indicator system
