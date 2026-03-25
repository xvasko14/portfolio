# Personal Website Design

Date: 2026-03-25
Status: Approved design, ready for implementation planning

## Goal

Build a premium personal website inspired by the overall quality and flow of [dennissnellenberg.com](https://dennissnellenberg.com/), but tailored to a DevOps developer identity rather than an agency-style design portfolio.

The first release should prioritize personal brand and credibility over a large body of case studies. The site should feel technical, dark, confident, and modern, with a balanced console-inspired aesthetic that stays professional and avoids gimmicks.

## Product Direction

Chosen direction:

- Inspired by the reference, not a close clone
- Small multi-page site
- Personal brand first
- Balanced console / hacker aesthetic
- English language
- Static-first deployment

This means the site should borrow the polish, motion quality, and confidence of the reference while clearly presenting a different identity: DevOps, infrastructure, automation, reliability, and platform thinking.

## Audience

Primary audience:

- Potential employers
- Potential freelance or contract clients
- Technical collaborators

The site should quickly answer:

- Who is this person?
- What kind of engineering problems does he solve?
- Why should I trust him?
- How do I contact him?

## Site Map

The initial site structure:

- Home
- About
- Projects
- Contact
- Project detail template

### Home

Primary purpose:

- Establish personal brand
- Communicate positioning as a DevOps developer
- Show technical focus and credibility
- Route visitors toward contact or deeper reading

Suggested sections:

- Hero
- Short intro / positioning
- Selected capabilities
- Proof / credibility
- Project preview
- Contact CTA band

### About

Primary purpose:

- Explain background, working style, and engineering mindset
- Add more depth than the homepage without becoming a resume dump

Suggested sections:

- Intro / background
- How I work
- Principles
- Stack / tools
- Optional short timeline

### Projects

Primary purpose:

- Present curated work and technical highlights
- Act as a foundation for future case studies

Initial content expectation:

- Few or no deep case studies at launch
- Can include lightweight project highlights, selected experiments, learning projects, or infrastructure-focused write-ups later

### Contact

Primary purpose:

- Make it easy to reach out
- Keep the flow clean and direct

Suggested content:

- Email
- LinkedIn
- GitHub
- Short sentence about availability or preferred collaboration types

### Project Detail Template

This should exist from the beginning even if only one project eventually uses it at first.

Purpose:

- Avoid redesigning the content model later
- Make the site feel structurally complete
- Support future expansion into stronger case studies

## Homepage Information Architecture

### 1. Hero

The hero should make a strong first impression and frame the site around the person, not just the tech stack.

Requirements:

- Strong positioning headline
- Supporting sentence that clarifies scope of work
- Clear CTA to contact or explore
- Atmosphere that feels technical and alive

The hero should avoid generic lines like "I build scalable systems" unless refined into sharper copy.

### 2. Short Intro / Positioning

This section should explain the core scope of work in plain, confident language:

- Infrastructure
- CI/CD
- Automation
- Cloud environments
- Observability
- Delivery reliability

The user should understand the professional profile within a few seconds.

### 3. Selected Capabilities

Instead of a generic skills grid, present capabilities as problem-oriented areas of work:

- Platform engineering
- Deployment pipelines
- Infrastructure as code
- Container platforms
- Monitoring and observability
- Operational clarity

This section should describe what kind of engineering work is actually done, not just list tooling.

### 4. Proof / Credibility

Because the first version will not rely on a large case-study archive, credibility must come from structure and signals:

- Technologies used
- Types of systems or workflows built
- Engineering focus areas
- Future room for metrics, outcomes, or practical results

This should feel credible without pretending to have more documented work than is currently available.

### 5. Project Preview

Keep this lightweight in v1:

- One to three highlights at most
- Treated as previews, not the center of gravity of the site
- Easy to grow into a stronger work section later

### 6. Contact CTA Band

The bottom of the homepage should close decisively:

- Short call to action
- Email and key social links
- Clear path to contact

## Visual Direction

### Core Aesthetic

The visual direction should be:

- Dark
- Technical
- Confident
- Premium
- Minimal but not sterile

It should not become:

- Neon cyberpunk
- Retro terminal parody
- Generic SaaS template

### Console Influence

The chosen style is a balanced console-inspired aesthetic.

That means:

- The site can use system-like details, monospace accents, commands, metrics, or status-inspired fragments
- The overall experience should still feel polished and intentional
- The console language should support the brand, not dominate it

### Color Direction

Suggested palette direction:

- Deep charcoal or near-black base
- Cool grays for structure
- Restrained green or cyan accents
- High contrast text

Accents should be used sparingly to preserve a premium feel.

### Typography

Recommended typography system:

- Expressive display face for major headlines
- Clean supporting type for body copy
- Monospace or technical accent type for labels, small UI fragments, and system cues

Typography should carry much of the visual identity.

### Layout

Layout principles:

- Large sections
- Strong spacing
- Precise grid
- Clear reading order
- Big, confident hero treatment

The layout should feel calm and deliberate rather than dense.

## Motion Direction

Motion level: medium-high

This should include:

- Smooth reveals
- Refined hover states
- Page transitions where appropriate
- Menu interactions
- Light scroll transforms or parallax only where useful

Motion should communicate quality and care, but must not overshadow readability or performance.

The goal is to borrow the discipline and smoothness of the reference, not reproduce its effects one-for-one.

## Navigation

Navigation direction:

- Clean top-level nav
- Mobile-friendly structure
- Potential fullscreen menu overlay if it fits the final interaction design

The nav should support the premium feel without becoming unnecessarily complex.

## Imagery and Graphics

The site does not need to depend on photography.

Preferred supporting visuals:

- Abstract system-inspired graphics
- Grid structures
- Signal lines
- Interface fragments
- Subtle status or telemetry motifs

This keeps the identity closer to modern infrastructure and platform work.

## Content Strategy

The first release should not over-promise on project documentation.

Content strategy for v1:

- Lead with identity and positioning
- Use concise credibility signals
- Include lightweight project previews if available
- Keep room for future case studies and articles

Potential future additions:

- Detailed project pages
- Technical notes or blog posts
- Write-ups or postmortems

## Technical Architecture

Recommended stack:

- Astro
- Local content files
- Reusable UI components
- Targeted motion layer
- No CMS in v1

### Why Astro

Astro is the best fit because the site is primarily presentational and content-driven:

- Excellent performance
- Static output
- Strong SEO fundamentals
- Simple deployment
- Easy future expansion

### Content Model

Content should live in the repository.

Suggested content sources:

- Structured local data files
- MDX for project pages and future writing

Benefits:

- No CMS complexity
- Easy to version with git
- Straightforward to expand later

### UI Architecture

Build reusable components for:

- Navigation
- Hero
- Section wrappers
- Capability blocks
- Project cards
- CTA bands
- Contact modules
- Menu overlay

This keeps the design system coherent and maintainable.

### Motion Layer

Use JavaScript selectively only where it materially improves the experience:

- Section reveal animations
- Menu transitions
- Hover motion
- Limited scroll-based transformations

Avoid a fully app-heavy frontend.

## Hosting and Deployment

Recommended deployment flow:

- GitHub repository as source of truth
- Automatic deploys through Cloudflare Pages
- Static Astro build output
- Custom `.eu` domain connected through Cloudflare

### Why Cloudflare Pages

For this project, Cloudflare Pages is the most pragmatic hosting option:

- Well-suited to static sites
- Simple GitHub integration
- Preview deploys for branch or pull request work
- SSL and DNS integration
- Good free tier characteristics for a static portfolio

### Why Not Fly.io for v1

Fly.io remains possible, but it is not the recommended default for this site:

- The site does not need a server process
- The project does not need a containerized runtime
- Cloudflare Pages is simpler and more cost-aligned for a static portfolio

If requirements later change, deployment can be revisited.

## Forms

For v1, avoid a custom backend-backed contact form.

Preferred options:

- Direct email link
- LinkedIn
- GitHub
- Optional external form service later

This keeps the initial release simple and static.

## Non-Goals for v1

Do not include these in the first release unless priorities change:

- Database
- Custom backend
- CMS admin
- Authentication
- Dashboard
- Complex analytics pipeline
- Heavy blog system before the main site exists

## Quality Bar

The site should feel:

- Premium
- Intentional
- Fast
- Technical
- Personal

It should not feel:

- Template-based
- Overanimated
- Empty despite high polish
- Too similar to the reference

## Implementation Priorities

Priority order for implementation:

1. Project setup and deployment-ready architecture
2. Global layout, typography, colors, and navigation
3. Homepage with strong hero and supporting sections
4. About, Projects, and Contact pages
5. Project detail template
6. Motion and interaction polish
7. Deployment setup and domain readiness

## Open Content Dependencies

The following will need to be filled in during implementation:

- Final personal positioning copy
- Bio / about text
- Capability descriptions
- Contact details
- Social links
- Project placeholders or real highlights

These are content tasks, not blockers for starting the build.

## Summary

The first version of the site is a brand-first, small multi-page personal website for a DevOps developer. It should be inspired by the polish and rhythm of the reference site, but visually and structurally adapted to a darker, technical, console-influenced identity. The site should be static, built with Astro, deployed through GitHub and Cloudflare Pages, and structured to grow naturally into stronger project detail pages and future technical writing.
