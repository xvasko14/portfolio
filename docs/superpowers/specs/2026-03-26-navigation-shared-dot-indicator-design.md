# Navigation Shared Dot Indicator

Date: 2026-03-26
Status: Approved design, ready for implementation planning

## Goal

Make the navigation dot indicator feel interactive in a Dennis-like way.

Instead of each link having its own static visible dot, the site should use a shared moving indicator that smoothly follows hover and focus across both the desktop top navigation and the fullscreen overlay navigation.

## Scope

In scope:

- desktop top navigation indicator behavior
- fullscreen overlay navigation indicator behavior
- hover and keyboard-focus movement
- fallback behavior without JavaScript
- reduced-motion behavior
- light verification only

Out of scope:

- changes to navigation structure
- changes to route intro behavior
- hero or content changes
- large new test coverage

## Chosen Direction

Chosen direction:

- use one shared moving dot per navigation context
- one indicator for the top desktop navigation
- one indicator for the fullscreen overlay navigation
- keep the current route as the resting state
- animate the indicator with a smooth premium transition

This keeps the Dennis-like feel the user requested while staying compatible with the existing navigation redesign.

## Interaction Model

### Desktop top navigation

The top navigation should have a single shared indicator.

Behavior:

- default position sits under the active route
- hovering a different link moves the dot to that item
- focusing a different link with keyboard navigation also moves the dot
- leaving the navigation returns the dot to the active route

### Fullscreen overlay navigation

The overlay should follow the same model.

Behavior:

- a single shared indicator belongs to the overlay nav
- hover moves the dot to the hovered overlay item
- keyboard focus moves the dot to the focused overlay item
- when hover/focus ends, the dot returns to the active route

## Visual Direction

The dot should remain visually restrained:

- small and clean
- no pulse or glow gimmicks
- smooth movement rather than abrupt jumps
- consistent with the existing dark navigation styling

Desktop placement should read as Dennis-inspired:

- the dot sits visually below the link text rather than beside it

Overlay placement should stay readable and consistent with the large-link layout:

- the dot should feel attached to the active line item
- it should move clearly without looking detached from the text

## Accessibility and Fallbacks

### Keyboard support

The indicator must respond to focus the same way it responds to hover.

This keeps the effect available to keyboard users rather than limiting it to mouse interaction.

### Reduced motion

If `prefers-reduced-motion` is enabled:

- the indicator still updates position
- movement should be immediate or near-immediate
- no long animated slide

### No-JS fallback

If JavaScript does not run:

- the current static active-route dot behavior should remain intact
- navigation should not degrade compared to the current baseline

## Technical Design

Likely files in scope:

- `src/components/site/Header.astro`
- `src/components/site/MenuOverlay.astro`
- `src/styles/global.css`
- shared client-side navigation script, most likely `public/menu.js`

Implementation shape:

- add a nav-root hook for the desktop navigation and overlay navigation
- add one shared indicator element inside each nav context
- keep current route hooks on individual links
- use a small client-side routine to measure the target item and reposition the shared indicator
- return the indicator to the active route on pointer leave, focus loss, or overlay close

This should stay minimal and layered onto the current navigation system rather than rewriting it.

## Verification Approach

The user asked to keep verification light.

Required:

- local browser review of desktop nav and overlay behavior
- build must succeed

Optional but acceptable:

- reusing the existing navigation smoke spec if needed

Not required:

- a large new test matrix for hover permutations

## Risks and Guardrails

Main risks:

- overcomplicating the effect with too much JS
- making the overlay indicator feel disconnected from the text
- breaking the no-JS active-state baseline
- making reduced-motion behavior feel laggy or inconsistent

Guardrails:

- keep one shared indicator per nav context
- preserve static active state as fallback
- keep movement subtle and short
- do not expand scope beyond the navigation indicator behavior
