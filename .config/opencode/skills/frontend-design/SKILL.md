---
name: frontend-design
description: Create distinctive, production-grade frontend interfaces with high design quality. Use this skill when the user asks to build web components, pages, artifacts, posters, or applications (examples include websites, landing pages, dashboards, React components, HTML/CSS layouts, or when styling/beautifying any web UI). Generates creative, polished code and UI design that avoids generic AI aesthetics.
license: Complete terms in LICENSE.txt
---

Create distinctive, production-grade frontend interfaces that avoid generic "AI slop" aesthetics. Implement real working code with exceptional attention to aesthetic details and creative choices.

## Design Philosophy

- **Simplicity Through Reduction**: Identify the essential purpose and eliminate distractions. Begin with complexity, then deliberately remove until reaching the simplest effective solution.
- **Material Honesty**: Digital materials have unique properties. Buttons should feel pressable, cards substantial, animations reflect real-world physics while embracing digital possibilities.
- **Obsessive Detail**: Consider every pixel, interaction, and transition. Excellence emerges from hundreds of thoughtful decisions that collectively project quality.
- **Coherent Design Language**: Every element should visually communicate its function and feel part of a unified system. Nothing arbitrary.
- **Invisibility of Technology**: The best technology disappears. Users focus on content and goals, not understanding the interface.

## Design Thinking

Before coding, commit to a BOLD aesthetic direction:
- **Purpose**: What problem does this solve? Who uses it?
- **Tone**: Pick an extreme: brutally minimal, maximalist chaos, retro-futuristic, organic/natural, luxury/refined, playful/toy-like, editorial/magazine, brutalist/raw, art deco/geometric, soft/pastel, industrial/utilitarian
- **Differentiation**: What makes this UNFORGETTABLE? What's the one thing someone will remember?

**CRITICAL**: Choose a clear conceptual direction and execute with precision. Bold maximalism and refined minimalism both work - the key is intentionality, not intensity.

## Typography

- **Purposeful Selection**: Typography is a core design element, not an afterthought. Every typeface choice serves the app's purpose and personality.
- **Clear Hierarchy**: Distinct but harmonious appearance for headlines, subheadings, body text, and captions that guides users through content.
- **Limited Fonts**: Maximum 2-3 typefaces. Pair a distinctive display font with a refined body font.
- **Type Scale Harmony**: Establish mathematical relationship between text sizes (golden ratio or major third) for visual rhythm.
- **Breathing Room**: Line height ~1.5x font size for body text. Generous paragraph spacing.

**AVOID**: Inter, Roboto, Arial, system fonts, Space Grotesk, and other overused choices.

## Color

- **Intentional Color**: Every color has a specific purpose. Avoid decorative colors that don't communicate function or hierarchy.
- **Color as Communication**: Use color to convey meaning - success, warning, information, action. Maintain consistency.
- **Sophisticated Palettes**: Prefer subtle, slightly desaturated colors. Colors that feel "photographed" rather than "rendered."
- **Focus Through Restraint**: Limit accent colors to guide attention. Dominant colors with sharp accents outperform timid, evenly-distributed palettes.
- **Use CSS Variables**: Define palette in `:root` for consistency. Consider oklch for perceptual uniformity.

**AVOID**: Purple gradients on white backgrounds, cliched color schemes, timid palettes.

## Spatial Composition

- **Compositional Balance**: Every screen should feel balanced with careful attention to visual weight and negative space.
- **Grid Discipline**: Consistent underlying grid system with meaningful exceptions when appropriate.
- **Breathing Room**: Generous negative space to focus attention and create calm. Avoid cluttered interfaces where elements compete.
- **Unexpected Layouts**: Asymmetry, overlap, diagonal flow, grid-breaking elements.

## Interactive Elements

### Buttons
Every button must have distinct states:
- Default (rest) - visually "pressable" through subtle shadows or dimensionality
- Hover - immediate feedback
- Active/Pressed - satisfying response
- Focused - clear for keyboard navigation
- Disabled - obviously inactive

Minimum touch target: 44×44px regardless of visual size.

### Input Controls
- Clear labeling that remains visible during input
- Smart defaults when possible
- Inline validation with constructive error messages
- Subtle but distinct focus states

### Feedback
- Immediate visual feedback within 100ms for every interaction
- Loading states: purpose-built indicators that communicate progress
- Success confirmation: subtle but clear visual acknowledgment
- Error handling: constructive guidance, never dead ends

## Motion & Animation

Every animation serves a functional purpose:
- Orient users during navigation changes
- Establish relationships between elements
- Provide feedback for interactions
- Guide attention to important changes

### Natural Physics
Movement follows real-world physics with appropriate acceleration, deceleration, mass, and momentum.

### Timing Guidelines
- Quick actions (button press): 100-150ms
- State changes: 200-300ms
- Page transitions: 300-500ms
- Attention-directing: 200-400ms

### Restraint
Animations should be felt rather than seen. Focus on high-impact moments: one well-orchestrated page load with staggered reveals creates more delight than scattered micro-interactions.

## Visual Details

Create atmosphere and depth:
- Gradient meshes, noise textures, geometric patterns
- Layered transparencies, dramatic shadows
- Decorative borders, custom cursors, grain overlays
- Scroll-triggering effects, hover states that surprise

## Accessibility

- **Contrast**: Target WCAG AA minimum (4.5:1 for normal text, 3:1 for large text)
- **Keyboard Navigation**: Complete accessibility with logical tab order and visible focus states
- **Touch Targets**: Generous hit areas beyond visible controls

## Sample Images (Unsplash)

Use Unsplash for high-quality placeholder images. Two approaches:

### Direct URLs (No API Key)
Use known photo IDs with Imgix parameters for resizing:
```
https://images.unsplash.com/photo-{PHOTO_ID}?w=800&h=600&fit=crop
```

Common parameters:
- `w`, `h`: width/height in pixels
- `fit=crop`: crop to exact dimensions
- `q=80`: quality (1-100)
- `auto=format`: auto-select best format

Example curated photos (reliable, high-quality):
- `photo-1682687220742-aba13b6e50ba` - nature/landscape
- `photo-1618005182384-a83a8bd57fbe` - abstract gradient
- `photo-1497436072909-60f360e1d4b1` - mountains
- `photo-1506905925346-21bda4d32df4` - mountain lake
- `photo-1519389950473-47ba0277781c` - tech/workspace
- `photo-1460925895917-afdab827c52f` - dashboard/data
- `photo-1522202176988-66273c2fd55f` - team/collaboration
- `photo-1507003211169-0a1dd7228f2d` - portrait/headshot
- `photo-1494790108377-be9c29b29330` - woman portrait
- `photo-1472099645785-5658abf4ff4e` - man portrait

### API (For Dynamic Content)
Use `unsplash.sh` in this skill directory for search and random photos:

```bash
# Get random photo(s) by keyword
./unsplash.sh random "coffee shop"
./unsplash.sh random "office workspace" 3   # get 3 photos

# Search photos
./unsplash.sh search "minimal architecture" 5

# Download with custom dimensions (append Imgix params to any URL)
./unsplash.sh download "https://images.unsplash.com/photo-xxx?w=800&h=600&fit=crop" hero.jpg
```

Output includes attribution (photographer name/username) and URLs at different sizes.
Append `&w=WIDTH&h=HEIGHT&fit=crop` to any `raw:` URL for custom dimensions.

Rate limit: 50 requests/hour. Credentials in `.env`.

## Anti-Patterns

NEVER produce generic AI aesthetics:
- Overused font families
- Cliched color schemes
- Predictable layouts and component patterns
- Cookie-cutter design lacking context-specific character

No design should be the same. Vary between light and dark themes, different fonts, different aesthetics.

**Match complexity to vision**: Maximalist designs need elaborate code with extensive animations. Minimalist designs need restraint, precision, and careful attention to spacing and subtle details.
