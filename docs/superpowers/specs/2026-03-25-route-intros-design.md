# Route Intros Design

Date: 2026-03-25
Status: Approved design, ready for implementation planning

## Goal

Add fullscreen intro and route transition behavior inspired by the motion pattern on [dennissnellenberg.com](https://dennissnellenberg.com/), while keeping the portfolio's existing dark DevOps visual language.

This feature is intended to bring the site closer to the reference through:

- a greeting-based intro on the home page
- fullscreen title transitions for the main routes
- a more cinematic feeling when opening and navigating the site

The goal is not to copy every effect exactly, but to get much closer to the reference's structure and pacing.

## Scope

Applies only to the main routes:

- Home
- Projects
- About
- Contact

Out of scope:

- project detail pages
- menu redesign
- new content copy
- deep animation test coverage

## Chosen Direction

Chosen direction:

- Global transition system
- Very close to the reference in concept
- Fullscreen overlays with no skip option
- Home gets a dedicated greeting intro on direct open
- All main routes get fullscreen title transitions

This should be implemented quickly first, then tuned visually in the browser.

## Behavior Lifecycle

### Home direct open or refresh

When the user lands directly on `/` or refreshes the home page:

- show a fullscreen dark overlay
- play a sequence of greetings in different languages
- keep background interaction and scroll blocked
- reveal the homepage only after the greeting sequence completes

### Home internal navigation

When the user navigates to Home from another main route inside the site:

- do not replay the rotating greetings
- show a simpler fullscreen title transition using `Home`
- reveal the homepage after the transition completes

### Direct open or refresh on other main routes

When the user lands directly on `/about`, `/projects`, or `/contact`:

- show a fullscreen title intro for that route
- examples: `About`, `Projects`, `Contact`
- reveal the page only after the intro completes

### Internal navigation between main routes

When the user clicks between main routes inside the site:

- intercept those navigations
- show a fullscreen title transition for the destination route
- allow navigation to continue after the transition completes

### Project detail pages

Project detail pages should open normally without this fullscreen intro pattern.

## Visual Direction

### Home greeting intro

The home intro should be:

- fullscreen
- dark
- clean
- typography-led
- close in feeling to the reference

The greetings should rotate one at a time with deliberate pacing. The animation should feel premium and controlled, not flashy.

### Page title transitions

The non-home route transitions should use:

- a fullscreen dark overlay
- a large page title
- a minimal leading marker or similar subtle detail
- a short hold before the page reveal

The look should stay close to the reference screenshot the user shared while still fitting the existing site.

### Reveal

The content under the overlay should not appear with a hard cut. The transition should end with a softer reveal using fade, slide, or a comparable masking effect.

## Technical Design

### Global overlay in layout

Add a single shared transition overlay to `BaseLayout`. This keeps the system centralized and avoids per-page duplication.

### Route metadata

Each main route should provide simple metadata to the layout, for example:

- `transitionTitle`
- `transitionMode`

Expected modes:

- `home-greetings`
- `home-title`
- `page-title`
- `none`

The exact prop names can change during implementation if a better local naming scheme fits the codebase.

### Client transition controller

Use one small client-side controller script to:

- detect direct load vs internal navigation
- decide whether Home should use greetings or a simple title transition
- intercept navigation only for main routes
- block scroll during transitions
- release the page after the animation completes

### Navigation interception

Only intercept these routes:

- `/`
- `/about`
- `/projects`
- `/contact`

All other links should behave normally.

### Progressive degradation

If JavaScript fails or loads late:

- pages should still remain accessible
- navigation should still work
- the site may simply fall back to normal page loads without the cinematic transition layer

## Verification Approach

This iteration should keep verification intentionally light.

Required:

- `npm run build` passes
- a basic smoke verification for main routes still opening
- visual review in the browser

Not required for this feature iteration:

- broad end-to-end animation timing coverage
- complex interaction test matrix

## Risks and Guardrails

Main risks:

- transitions becoming too slow and hurting usability
- direct-open and internal-navigation logic diverging
- overlay timing fighting with the existing menu and reveal scripts

Guardrails:

- keep the system centralized
- keep project detail pages out of scope
- keep the first version visually strong but technically contained
- prefer quick implementation plus iterative browser tuning over overengineering
