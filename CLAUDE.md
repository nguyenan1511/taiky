# CLAUDE.md — TakyFood Website 2026

Guidelines for the AI when working in this project. Read carefully before generating code.

---

## Tech Stack

| Layer   | Technology                                                                                                                        |
| ------- | --------------------------------------------------------------------------------------------------------------------------------- |
| UI      | React 18 + TypeScript                                                                                                             |
| Build   | Vite 5                                                                                                                            |
| Styling | **Tailwind CSS v3** (no CSS Modules or styled-components)                                                                         |
| Fonts   | Arsenal, Montserrat (Google Fonts) + `1FTV VIP Imagine Serif Stamp Rough`, `UTM Colossalis` (local woff2/woff in `public/fonts/`) |
| Assets  | `public/images/` — all images must be local files, **no external URLs**                                                           |

---

## Styling Rules ⚠️

### Mandatory rule: Use Tailwind, no inline styles for typography/color

**All** fonts, colors, borders, backgrounds, cursors, and transitions must use **Tailwind utility classes** — do not write `style={{ ... }}`.

```tsx
// ❌ WRONG — don't do this
<h2 style={{ fontFamily: 'Arsenal', fontWeight: 700, color: '#e77707' }}>
  Tiêu đề
</h2>

// ✅ CORRECT — use Tailwind classes
<h2 className="font-bold text-taiky-orange">
  Tiêu đề
</h2>
```

### The ONLY cases where `style={}` is allowed

Anything with a Tailwind equivalent — **including pixel positions and sizes** — must use
utility classes, with **arbitrary values** where needed. Do NOT inline these:

```tsx
// ❌ WRONG — pixel position / size / rotate / color / filter as inline style
<img style={{ left: '220px', top: '48px', width: '262px', height: '378px', transform: 'rotate(-7.71deg)' }} />

// ✅ CORRECT — Tailwind arbitrary-value utilities
<img className="left-[220px] top-[48px] w-[262px] h-[378px] rotate-[-7.71deg]" />
// also: min-h-[900px], bg-taiky-bg, object-cover, brightness-0 invert
```

`style={}` is reserved only for what Tailwind v3 genuinely cannot express:

| Type                | Example                                                        | Reason                                                   |
| ------------------- | -------------------------------------------------------------- | -------------------------------------------------------- |
| Dynamic JS value    | `transform: \`translateX(${tx}px)\``, `width: \`${CARD_W}px\`` | Computed at runtime from state / refs / shared constants |
| CSS mask properties | `maskImage`, `WebkitMaskImage`                                 | No mask utilities in Tailwind v3                         |
| Unsupported filter  | a filter with no utility (e.g. `url(#customFilter)`)           | Simple ones like `brightness-0 invert` DO have utilities |

---

## Design Tokens — `tailwind.config.js`

All brand color, font, and spacing values are defined in `tailwind.config.js`. When you need a new value, **add it to the config first**, then use the class.

### Colors (`taiky.*`)

| Token              | Hex       | Used for                              |
| ------------------ | --------- | ------------------------------------- |
| `taiky-bg`         | `#F3E9DC` | Page / section background             |
| `taiky-cream`      | `#EDE0CF` | Secondary section background          |
| `taiky-brown`      | `#684b2b` | Main text, nav links                  |
| `taiky-lightbrown` | `#b19172` | Secondary text, subtitle              |
| `taiky-orange`     | `#e77707` | Heading, active border, CTA           |
| `taiky-yellow`     | `#eebe37` | Hero CTA button, product links        |
| `taiky-darkbrown`  | `#331f05` | Small body text                       |
| `taiky-footerbg`   | `#e77707` | Footer background (orange, per Figma) |

```tsx
// Correct usage examples
<p className="text-taiky-brown">...</p>
<div className="bg-taiky-footerbg">...</div>
<button className="border border-taiky-orange text-taiky-orange">...</button>
```

### Font Families

| Class             | Font                               | Used for                                                           |
| ----------------- | ---------------------------------- | ------------------------------------------------------------------ |
| `font-sans`       | Arsenal                            | All regular text (body default)                                    |
| `font-montserrat` | Montserrat                         | Footer copyright bar                                               |
| `font-stamp`      | 1FTV VIP Imagine Serif Stamp Rough | Hero headline (h1) + section headings (SẢN PHẨM, GÓC BẾP, CAM KẾT) |
| `font-colossalis` | UTM Colossalis                     | Available (not currently used)                                     |
| `font-impact`     | Arial Black / Impact               | Available (not currently used)                                     |

> ⚠️ **Quote multi-word / digit-leading font names in `tailwind.config.js`** (e.g.
> `'"1FTV VIP Imagine Serif Stamp Rough"'`). An unquoted family that starts with a digit
> is invalid CSS, so the `font-family` is silently dropped and the text falls back to body.

```tsx
// Hero headline
<h1 className="font-stamp font-normal text-taiky-orange uppercase">Đậm chất bản Việt</h1>

// Section heading
<h2 className="font-stamp font-normal tracking-brand text-taiky-orange uppercase">
  GÓC BẾP CỦA TAIKYFOOD
</h2>
```

### Letter Spacing

| Token            | Value    | Used for                       |
| ---------------- | -------- | ------------------------------ |
| `tracking-brand` | `0.02em` | `font-impact` section headings |

### Layout / Container ⚠️

The page content max width (**1440px**) is the `max-w-container` token. **Do not hardcode
`max-w-[1440px]`.** Wrap centered content in the `Container` component, which applies
`max-w-container mx-auto`; pass section-specific padding/layout via `className`.

```tsx
import Container from '../Container';

<Container className="flex items-center justify-between px-[72px] py-[20px]">…</Container>;
```

---

## Project Structure

```
src/
├── App.tsx                  — Root layout, composes the sections
├── main.tsx                 — Entry point
├── index.css                — Tailwind directives + @font-face + global body styles
├── vite-env.d.ts            — Vite type declarations (required)
└── components/
    ├── Container/
    │   └── index.tsx        — Centered content wrapper (max-w-container = 1440px)
    ├── Header/
    │   └── index.tsx        — Fixed transparent header (logo + main nav)
    ├── Hero/
    │   └── index.tsx        — Hero section (blob layers + product bags)
    ├── Products/
    │   ├── index.tsx        — Product carousel + brand tabs (7 brands)
    │   └── ProductCard.tsx  — Single product card (sub-component, reusable)
    ├── KitchenCorner/
    │   └── index.tsx        — "Góc bếp" section — id="goc-am-thuc"
    ├── FoodBowls/
    │   └── index.tsx        — Grid of 5 round bowls
    ├── Commitment/
    │   └── index.tsx        — Commitment section (warm background image)
    └── Footer/
        └── index.tsx        — Orange footer

public/
└── images/                  — All image assets (local, no external URLs)
```

### Component Convention ⚠️

**Each component lives in its own folder named after the component**, with the main
component exported from `index.tsx`. Import it by folder path — the `index.tsx`
resolves automatically (e.g. `import Products from './components/Products'`).

When a component grows enough to be split, **create the smaller sub-components as
sibling files inside the same folder** (not in a shared/global location). Keep a
sub-component local to its parent until it genuinely needs to be shared elsewhere.

```
ComponentName/
├── index.tsx          ← main component (the folder's public entry point)
├── SubComponent.tsx   ← broken out when index.tsx gets too big
└── AnotherPart.tsx
```

```tsx
// ✅ Import the main component by folder name
import Products from './components/Products';

// ✅ Inside Products/index.tsx, import a local sub-component as a sibling
import ProductCard, { type Product } from './ProductCard';
```

> Use `index.tsx` (TypeScript + React), the TSX equivalent of `index.js`.

---

## Assets

- All images must live in `public/images/` and be referenced via the `/images/...` path
- **Do not commit Figma URLs** (`figma.com/api/mcp/asset/...`) into the code — these URLs expire after 7 days
- When adding an image from Figma: download it to `public/images/` first, then use the local path

### SVG assets ⚠️

**Reference SVG files via `<img src="/images/foo.svg">` — do not paste raw `<svg>…</svg>`
markup into components.** Logos, icons, and illustrations are assets: keep them in
`public/images/` and load them as images. Inlining huge `<path>` data bloats the
component, hurts readability, and isn't reusable.

```tsx
// ❌ WRONG — hundreds of lines of <path> inlined in the component
<svg width="226" height="70" viewBox="0 0 226 70">
  <path d="M93.86 61.70H92.63V61.49…" />
  {/* …and 20 more paths */}
</svg>

// ✅ CORRECT — load the SVG as an image (set width/height to avoid layout shift)
const imgLogoMain = "/images/logo-main.svg"
<img src={imgLogoMain} alt="TAKYfood" width={226} height={70} className="block h-[70px] w-auto" />
```

> Only inline an SVG when you must style/animate its inner paths from React
> (e.g. dynamic `fill` driven by state). Static art always goes through `<img>`.

---

## Responsive

- Pixel-perfect design at the **1440px** viewport (Figma spec)
- `html, body` have `overflow-x: hidden` to prevent horizontal scroll from decorative blobs
- Sections with a natural layout (Footer, FoodBowls) use `flex-wrap` + responsive Tailwind breakpoints (`md:`)
- Pixel-perfect sections (Hero, hero blobs) keep absolute positioning

---

## Section IDs (Anchor navigation)

| Section       | ID            |
| ------------- | ------------- |
| Products      | `san-pham`    |
| KitchenCorner | `goc-am-thuc` |
