# Tribera Page Design Spec

Reference pages:

- `src/pages/index.astro`
- `src/pages/candidates.astro`

This spec defines the visual system that inner pages should follow, especially on mobile.

## 1. Page Rhythm

- Use alternating section backgrounds where possible:
  - dark hero
  - light brand strip
  - then alternate dark/light by section
- Avoid two large consecutive sections with the same background unless they are clearly part of one chapter.
- Preserve strong chapter separation with background, spacing, and section-intro labels.

## 2. Color System

- Primary brand red: `#da0007`
- Primary dark surface: `#000000`
- Dark card shell:
  - `bg-gradient-to-b from-[#181818] to-[#0f0f0f]`
  - `border border-white/10`
  - strong dark shadow
- Light page background:
  - `#f3f3f3` or `#f5f5f5`
- Light card shell:
  - white or soft grey-white surface
  - thin black border or low-contrast border
  - soft red top rail where used on homepage-style cards

## 3. Typography

### Hero headlines

- Homepage hero remains the largest and most fluid.
- Inner-page hero scale:
  - mobile: `text-[38px]`
  - small tablet: `sm:text-[50px]`
  - desktop: `lg:text-[64px]`
- Inner-page hero body copy:
  - mobile: `text-[15px]` to `text-[16px]`
  - desktop: `md:text-[19px]` to `md:text-[20px]`

### Section labels

- Eyebrow labels should be small, uppercase, letterspaced, and red.
- Typical pattern:
  - `text-[11px]`
  - `tracking-[0.22em]` to `tracking-[0.28em]`
  - `uppercase`
  - `text-[#da0007]`

### Section headings

- Inner-page section heading scale:
  - mobile: `text-[34px]`
  - small tablet: `sm:text-[44px]`
  - desktop: `lg:text-[55px]`
- Tight leading and negative tracking:
  - `leading-[1.08]`
  - `tracking-[-0.03em]`

### Card typography on mobile

Use homepage/candidates mobile rhythm, not desktop-heavy sizing.

- Light or dark card title:
  - mobile: `text-[15px]` to `text-[17px]`
  - larger screens may step to `18px`, `20px`, or `21px`
- Card body:
  - mobile: `text-[12px]` to `text-[13px]`
  - larger screens: `text-[13px]` to `text-[14px]`
- Small labels / module labels:
  - mobile: `text-[9px]` to `text-[11px]`
- Numeric stat values in compact modules:
  - mobile: around `text-[17px]` to `text-[20px]`
  - desktop may increase to `22px+`

## 4. Buttons

- Follow homepage CTA style.
- Primary CTA:
  - red fill
  - white text
  - rounded full
  - `text-[13px] font-bold`
- Secondary CTA:
  - dark fill
  - low-contrast border
  - white/80 text
  - same size and radius as primary

Avoid duplicated CTA meaning in the same group.

## 5. Brands Strip

- `Who We Work With` remains a light section across pages.
- Keep title/subtitle scale restrained on mobile:
  - title around `14px`
  - subtitle around `12px` or `11px` if single-line mobile mode is used
- Carousel logos should feel secondary to the hero and section content.

## 6. Card Patterns

### Homepage-style light cards

- White or soft grey surface
- Thin low-contrast border
- Soft shadow
- Red top rail for emphasis where appropriate
- Hover lift + stronger shadow
- Small red badge / outlined number chip instead of heavy decorative badges

### Dark cards

- Use the same shell logic as candidate profile / dark platform cards:
  - gradient dark fill
  - subtle white border
  - red accents should be precise, not decorative overload
- For dense dark cards, keep body contrast readable:
  - titles in white
  - body in `white/50` to `white/75`

### Proof / inset boxes

- Use the candidate-style red proof box when highlighting a “what stays true” message:
  - dark red gradient
  - red glow
  - thin red border

## 7. Motion and Effects

- Motion should be subtle and purposeful.
- Default floating motion should be used sparingly:
  - okay for hero visual cards
  - avoid for informational panels unless clearly consistent with homepage/candidates
- Hover movement should be small:
  - slight lift
  - slight shadow increase
  - mild border emphasis
- Do not invent page-specific motion systems if existing homepage/candidates patterns cover the use case.

## 8. Layout Behavior

- On desktop, major left/right sections should feel balanced:
  - vertically center supportive columns against headline blocks where appropriate
- Avoid cramped right-side cards caused by overly narrow columns.
- On mobile:
  - reduce card padding where needed
  - avoid desktop-sized type inside stacked cards
  - avoid vertically centered heroes that push content below the fold

## 9. Consistency Rules

- New pages should borrow existing card, label, button, and dark-section patterns from `index` and `candidates`.
- Do not invent one-off styles when a similar component already exists on those pages.
- If a section feels off, prefer:
  - reusing an existing pattern
  - removing a weak section
  - simplifying a layout
    instead of adding another decorative treatment.
