# Flavor Studio — Design System

Flavor Studio is a **food R&D and recipe-formulation platform** for product
developers and food scientists. Teams build recipes ingredient-by-ingredient,
watch nutrition, allergens, yield and cost recompute live, generate
compliant nutrition-facts labels (US & Canadian / bilingual), manage
ingredient libraries, and move recipes through testing into finalized,
production-ready formulas.

The product is organized around six top-level areas: **Projects, Inspire,
Recipes, Taste Tests, CRM, Admin**. The heart of the app is the **Recipe
View** — an ingredient grid on the left and a live **Yield / Cost** panel on
the right that rolls up batch size, servings, cost and retail price, with
quick links to Label Preview, Nutrient Content Claims, Procedure, Ingredient
Statement, Images and Notes.

This is a calm, dense, professional B2B tool — closer to a spreadsheet-grade
workspace than a consumer app. The design system reflects that: a slate-navy
structural palette, a single friendly sky-blue action color, a lime-citrus
brand mark, compact Avenir-style typography, soft rounded surfaces and
whisper-light shadows.

---

## Sources

- **Figma:** "Flavour Studio.fig" (attached / mounted). Pages: `flavour-studio`
  (121 frames — the product screens) and `Component` (the component library).
  Key reference frames: `Recipe View`, `Add New Ingredient` (modal),
  `Recipes Admin Settings`, the `Yield / Cost` sidebar variants, `Tags`.
- No codebase or live URL was provided — the system is reconstructed from the
  Figma file's frames and components.

> ⚠️ **Font substitution.** The product is set in **Avenir Next** (a licensed
> Apple face, not web-distributable). This system substitutes **Mulish** (a
> close humanist-geometric match) as the primary UI font, with **Manrope** as
> a display companion. If you hold an Avenir Next webfont license, drop the
> files in `assets/fonts/` and swap the `@import` in `tokens/fonts.css` for
> local `@font-face` rules.

---

## Content fundamentals — voice & copy

The product voice is **plain, precise and operational** — it names things the
way a food technologist would, never marketing fluff.

- **Sentence case** for labels, buttons and headings ("Add Ingredient",
  "Batch size", "Different canadian label"). **ALL-CAPS, wide-tracked** is
  reserved for table column headers and the dark nav items
  (`INGREDIENT · STEP · QTY`, `PROJECTS · RECIPES · ADMIN`).
- **Nouns and domain terms, not slogans.** Copy is the vocabulary of the
  craft: *Yield, Batch size, Containers yielded, Serving weight, Ingredient
  statement, Nutrient content claims, Cost assumptions, Tolling, Procurement.*
- **Verb-first actions:** "Add Ingredient", "Add Assumption", "View
  Nutrition", "Clear all assumptions", "Save". Inline creation is a quiet blue
  text link ("+ Add Assumption"), not a heavy button.
- **Units are always explicit** and live next to the number — `(g)`, `%`, `$`,
  `1 cup`. Numbers are the content; they get tabular alignment and the
  strongest weight.
- **Neutral, second-person-implied.** The UI rarely says "you" or "I"; it
  labels the thing ("Serving size", "Item Code"). Helper text is terse and
  factual ("Manage the cost assumptions used on recipes.").
- **No emoji, no exclamation.** Tone is competent and unhurried. Empty states
  and placeholders are literal ("Select One", "Item code").

---

## Visual foundations

**Palette.** A three-part system:
1. **Slate** (`#324561` → `#9db0c9`) is the structure — the dark top nav, all
   headings and body text, dividers. It carries authority and calm.
2. **Sky blue** (`#59a3eb`, primary) is the *only* action color — buttons,
   links, active tabs, selected rows, panel headers, focus rings. Used
   confidently but never decoratively.
3. **Lime citrus** (`#8cd135`, the logo gradient) is the brand spark — the
   hexagon mark and the occasional celebratory highlight. **Never** an action
   color.
   Semantic accents are sparse: teal success, amber pending/testing, red
   error, violet for special/AI tags.

**Typography.** Mulish (≈ Avenir Next). Compact and data-dense: 13–14px body,
**Medium (500)** as the workhorse weight, **Demi-Bold (600)** for emphasis and
titles, **Bold (700)** for numbers. Page titles are a light 32px. Table
headers and nav are 12–14px uppercase with wide tracking.

**Surfaces & layout.** App canvas is a soft warm-gray (`#f3f3f6`); content
lives on **white cards** with `10px` radius and a whisper shadow
(`--shadow-card`). Generous 80px page gutters on wide views. A fixed dark top
nav (50px) sometimes sits above a colored sub-nav (blue) or a white title bar
that carries a subtle **inset top shadow** (`inset 0 3px 4px rgba(0,0,0,.15)`)
to separate it from the nav.

**Shape & elevation.** Corners are gently rounded — `6px` inputs, `8px`
buttons, `10px` cards, `14px` modals, **full pill** for version tabs, filter
chips and avatars. Borders are a single hairline `#e9e9e9`. Shadows are cool,
low-opacity and layered; nothing is heavy or dark. Cards rely on a hairline
border *or* a soft shadow, not both.

**Color blocks.** Panels can take a **solid color header**: the bright-blue
Yield/Cost header, or a darker slate band for cost/total rows. These colored
bands (white text, uppercase wide-tracked title) are a signature of the
product — they group and rank information (blue = section, slate = totals).

**Motion.** Restrained and functional. Standard `180ms` ease for hovers and
toggles; `120ms` snappier for knobs/dots. Hover states are a pale blue tint
(`--blue-050/100`) on rows and a slightly darker fill on primary buttons;
press is a subtle darken (no bounce, no scale gimmicks). Row actions fade in
on hover rather than always showing. Respect `prefers-reduced-motion`.

**Imagery.** Warm, appetising, real — top-down or close-up shots of
ingredients and finished food on natural surfaces in soft daylight. Lives in
recipe galleries and the Inspire feed. Avoid cold studio gloss.

---

## Iconography

The product uses **Icon Park – Outline** (rounded ~2px-stroke line icons),
served here via the **Iconify** CDN as `icon-park-outline:*`
(e.g. `icon-park-outline:weight`, `:doc-detail`, `:delete`, `:plus`,
`:save`, `:chef-hat-one`). A handful of **filled Material Design** icons
(`ic:*`) appear for checkbox/radio check-marks. Icons are slate (`#3e5a7f` /
`#9db0c9` when muted), never multicolor. Don't mix in a heavier or thinner
icon family. A few original SVGs are copied into `assets/icons/`
(`chef-hat.svg`); everything else comes from Iconify so stroke weight stays
consistent.

> Icon Park is on Iconify, so it renders identically to the Figma source —
> no substitution needed. Load `https://code.iconify.design/3/3.1.1/iconify.min.js`
> and use `<span class="iconify" data-icon="icon-park-outline:…"></span>`.

---

## Index / manifest

**Foundations**
- `styles.css` — global entry point (imports only).
- `tokens/colors.css` · `typography.css` · `spacing.css` · `fonts.css` · `base.css`
- `guidelines/*.html` — specimen cards (Colors, Type, Spacing, Brand) shown in
  the Design System tab.

**Components** (`components/`, namespace `window.FlavorStudioDesignSystem_*`)
- `forms/` — **Button, IconButton, Input, Select, Checkbox, Radio, Toggle**
- `display/` — **Card, Badge, Tag, Avatar**
- `navigation/` — **TopNav, Tabs**
- `feedback/` — **Dialog**

Each component dir has `<Name>.jsx`, `<Name>.d.ts`, `<Name>.prompt.md` and a
`*.card.html` thumbnail.

**UI kits** (`ui_kits/`)
- `recipe-studio/` — interactive **Recipe Studio**: a **Recipes list**
  (`recipes.html`) that clicks through into the **Recipe View** (`index.html`) —
  top nav, version tabs, the ingredient formulation grid, the live Yield/Cost
  panel, and the New Ingredient modal. `App.jsx`, `RecipesList.jsx`,
  `IngredientTable.jsx`, `YieldCostPanel.jsx`, `NewIngredientModal.jsx`.
- `sous-ai/` — **Sous**, the AI assistant concept (blue→teal identity).
  `index.html` renders answers inside the sidebar; `reports.html` opens
  full-page cited reports. Vanilla-JS prototypes that link `styles.css`.

**Assets** (`assets/`)
- `logo-mark.png` (lime hexagon), `avatar-sample.png`, `food-1/2/3.png`,
  `icons/*.svg`.

**Skill**
- `SKILL.md` — makes this folder usable as a downloadable Claude Agent Skill.
