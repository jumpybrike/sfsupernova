# CTA Button Standards

This document establishes the standardized design patterns for Call-to-Action (CTA) buttons across SF Supernova.

## Button Hierarchy

### Primary Buttons (Solid)
**Purpose:** Main actions, primary conversions (e.g., "Explore the Space Age", "Listen to Radio Dramas", "Browse Gallery")

**Styling:**
```tsx
className="inline-block px-8 py-3 bg-[#2ec4b6] text-white font-semibold rounded-md hover:bg-[#2ec4b6]/90 transition-all duration-300 shadow-lg hover:shadow-xl uppercase tracking-wider"
style={{ fontFamily: 'var(--font-inter)' }}
```

**Color Palette:**
- Primary Cyan: `#2ec4b6` - Main CTAs
- Secondary Orange: `#ff6b35` - Alternative primary CTAs for variety

**Key Attributes:**
- Padding: `px-8 py-3` (32px horizontal, 12px vertical)
- Background: Solid color
- Text: White
- Font: Inter (via CSS variable)
- Transform: uppercase
- Tracking: wider
- Border radius: `rounded-md`
- Shadow: `shadow-lg hover:shadow-xl`

### Secondary Buttons (Outline)
**Purpose:** Secondary actions, alternative choices (e.g., "About SF Supernova", "View Full Gallery")

**Styling:**
```tsx
className="inline-block px-8 py-3 bg-transparent border-2 border-[#ff6b35] text-[#ff6b35] font-semibold rounded-md hover:bg-[#ff6b35] hover:text-white transition-all duration-300 uppercase tracking-wider"
style={{ fontFamily: 'var(--font-inter)' }}
```

**Color Palette:**
- Border/Text: `#ff6b35` (orange) or `#ffbe0b` (yellow)
- Background: Transparent → Fills on hover
- Hover text: White

**Key Attributes:**
- Padding: `px-8 py-3` (32px horizontal, 12px vertical)
- Background: Transparent with 2px border
- Border: `border-2 border-[color]`
- Hover: Background fills with border color
- Font: Inter (via CSS variable)

### Tertiary Buttons (Text-only)
**Purpose:** Low-priority actions, navigation links (e.g., "Read full review →")

**Styling:**
```tsx
className="text-[#ff6b35] hover:text-[#e63946] transition-colors inline-flex items-center font-medium"
style={{ fontFamily: 'var(--font-inter)' }}
```

**Key Attributes:**
- Padding: None or minimal
- Background: None
- Text color changes on hover
- Optional arrow or icon
- Font weight: medium

## Special Button Variants

### Retro-styled Buttons
Used on audio, reviews, and about pages for thematic consistency.

```tsx
className="px-8 py-3 bg-[#00ffaa]/20 border-2 border-[#00ffaa] text-[#00ffaa] font-bold rounded retro-button hover:bg-[#00ffaa] hover:text-background transition-all duration-300"
style={{ fontFamily: 'Orbitron, sans-serif' }}
```

**Key Attributes:**
- Font: Orbitron
- Colors: Retro cyan (`#00ffaa`)
- Class: `retro-button` (applies glow effects)

### Badge-style Buttons
Used in hero section for prominent CTAs.

```tsx
className="inline-block px-8 py-3 text-white font-semibold rounded-md transition-all duration-300 shadow-lg hover:shadow-xl hover:-translate-y-1 uppercase tracking-wider badge-orange"
// or
className="... badge-cyan"
```

**Key Attributes:**
- Class: `badge-orange` or `badge-cyan`
- Hover effect: `hover:-translate-y-1` (lift effect)

## Universal Standards

### Padding
**All CTA buttons must use:** `px-8 py-3`
- Horizontal (px-8): 2rem / 32px
- Vertical (py-3): 0.75rem / 12px

**Exceptions:**
- Icon-only buttons (use appropriate sizing)
- Small inline badges or tags (not CTAs)
- Dropdown menu items (use `px-4 py-3`)

### Typography
- **Font Family:** `var(--font-inter)` (Inter) for modern CTAs
- **Font Family:** `Orbitron, sans-serif` for retro-themed CTAs
- **Text Transform:** `uppercase` for primary/secondary buttons
- **Letter Spacing:** `tracking-wider`
- **Font Weight:** `font-semibold` or `font-bold`

### Transitions
All buttons should include smooth transitions:
```tsx
transition-all duration-300
```

### Hover Effects
- **Primary:** Shadow enhancement (`hover:shadow-xl`)
- **Secondary:** Background fill with color
- **Tertiary:** Color change
- **Optional:** Lift effect (`hover:-translate-y-1`)

## Content Standards

### NO Emojis
**Do NOT use emojis in CTA button text.** This applies to:
- Hero CTAs
- Navigation CTAs
- Download/action buttons
- All primary user-facing CTAs

**Exception:** Emojis may be used in decorative elements or non-CTA content.

**Examples:**
- ❌ Bad: `🚀 Explore the Space Age`
- ✅ Good: `Explore the Space Age`
- ❌ Bad: `📻 Listen to Radio Dramas`
- ✅ Good: `Listen to Radio Dramas`

### Action-Oriented Text
CTAs should use clear, action-oriented language:
- "Explore the Space Age" not "Space Age"
- "Browse Gallery" not "Gallery"
- "Listen Now" not "Audio"
- "Subscribe" not "Join Us"

## Color Reference

### Primary Colors
- **Cyan/Teal:** `#2ec4b6` - Primary actions
- **Orange:** `#ff6b35` - Secondary actions, accents
- **Yellow:** `#ffbe0b` - Tertiary actions, highlights
- **Retro Cyan:** `#00ffaa` - Retro-themed pages

### Text Colors
- **On Primary:** `white` or `text-white`
- **On Secondary:** Match border color, then `white` on hover
- **On Tertiary:** `#ff6b35` (orange) or `#e63946` (red) on hover

## Accessibility

### Color Contrast
Ensure all button text meets WCAG AA standards:
- White on `#2ec4b6` ✅
- White on `#ff6b35` ✅
- `#ff6b35` on white ✅

### Interactive States
Always provide clear hover and focus states:
```tsx
hover:bg-[color] focus:outline-none focus:ring-2 focus:ring-[color] focus:ring-offset-2
```

### Disabled States
For disabled buttons:
```tsx
className="... opacity-50 cursor-not-allowed"
disabled={true}
```

## Implementation Checklist

When creating or updating a CTA button:

- [ ] Uses `px-8 py-3` padding
- [ ] Follows hierarchy (primary/secondary/tertiary)
- [ ] Uses correct color from palette
- [ ] Includes transition effects
- [ ] Uses Inter font family (or Orbitron for retro)
- [ ] NO emojis in text
- [ ] Uppercase + wider tracking for primary/secondary
- [ ] Includes hover state
- [ ] Meets accessibility standards
- [ ] Action-oriented text

## Examples

### Primary CTA (Hero Section)
```tsx
<Link
  href="/decades/1950s"
  className="inline-block px-8 py-3 text-white font-semibold rounded-md transition-all duration-300 shadow-lg hover:shadow-xl hover:-translate-y-1 uppercase tracking-wider whitespace-nowrap badge-orange"
  style={{ fontFamily: 'var(--font-inter)' }}
>
  Explore the Space Age
</Link>
```

### Secondary CTA (Gallery)
```tsx
<Link
  href="/gallery"
  className="inline-block px-8 py-3 bg-transparent border-2 border-[#ff6b35] text-[#ff6b35] font-semibold rounded-md hover:bg-[#ff6b35] hover:text-white transition-all duration-300 uppercase tracking-wider"
  style={{ fontFamily: 'var(--font-inter)' }}
>
  View Full Gallery
</Link>
```

### Tertiary CTA (Review Card)
```tsx
<Link
  href="/reviews"
  className="text-[#ff6b35] hover:text-[#e63946] transition-colors inline-flex items-center font-medium"
  style={{ fontFamily: 'var(--font-inter)' }}
>
  Read full review <span className="ml-1">→</span>
</Link>
```

## Maintenance

This document should be updated whenever:
- New button variants are introduced
- Color palette changes
- Typography standards evolve
- Accessibility requirements change

Last updated: 2025-11-03
