# RUYRA — Botanical Rituals

RUYRA is a premium luxury e-commerce storefront specializing in handcrafted botanical candles, bath rituals, and artisanal home adornments. This Next.js 16 application showcases a refined editorial aesthetic with immersive UX patterns designed to elevate the brand experience and drive conversions.

## ✨ Key Features

### Hero Section
A breathtaking full-screen hero featuring:
* High-quality background imagery (`hero_bg.png`) with optimized loading and 100% quality rendering
* Centered, minimalist typography with serif headings and elegant sans-serif subtitles
* Soft darkening overlay for text legibility without obscuring the beautiful product backdrop
* Smooth scale-down entrance animation on initial page load
* Responsive CTA buttons (white solid & translucent outline) with hover transitions

### Tactile Product Cards
Enhanced product cards with dual-media hover effects:
* Static product image that fades out smoothly on hover
* Background video that fades in revealing product in motion
* Magnetic button effect: floating `+` button that tracks cursor movement up to 40px radius
* Responsive design: mobile floating button below, desktop magnetic interaction
* Graceful fallback: if video fails to load, the product image remains visible

### Vibe Carousel
Curated product showcase with smart responsive layout:
* Mobile: horizontal snap carousel with finger-scroll interaction
* Tablet/Desktop: CSS Grid (3 columns) with overflow-visible staggered animation
* Product cards fade and scale in on scroll using Framer Motion's `whileInView`
* Brand-aligned color palette (sand background, brown typography, terracotta accents)

### Editorial Interstitial
Premium scroll-linked text animation section:
* Fixed sticky container with 200vh scroll height for immersive reading experience
* Three-line progressive reveal mapped to scroll progress (5%-25%, 35%-55%, 65%-85%)
* Smooth opacity and vertical movement (`useTransform` from Framer Motion)
* Perfect timing eliminates dead space and creates seamless narrative flow

### Value Marquee
Horizontal loop animation showcasing brand pillars:
* Auto-scrolling ticker displaying key brand values
* Seamless infinite loop with duplicate content
* Desktop and mobile optimized widths with responsive font scaling
* Accessibility support with pause on hover/focus

### Revenue Engine
Integrated within the Product Detail Modal:
* **Subscribe & Save**: Stacked cards offering 10% discount with frequency selection
* **Shipping Motivator**: Dynamic progress bar tracking $75 free shipping threshold
* **Cross-sell Recommendations**: "Complete the Ritual" pairing suggestions

### Trust Engine
Community-driven social proof:
* **Photo Review Carousel**: User-generated content with glassmorphic overlays
* **Verified Buyer Badges**: Trust indicators with detailed reviews
* **Dynamic Review Submission**: Write review modal with star rating system

### Performance Engine
Predictive instant search:
* Full-screen responsive search overlay
* Trending intention pills for quick filtering
* Real-time query matching against product metadata
* Staggered result animations with instant modal trigger

---

## 🛠️ Tech Stack

* **Framework**: Next.js 16.2.6 (Turbopack, App Router, Server Components)
* **Styling**: Tailwind CSS v4 with custom design tokens (`brand-sand`, `brand-brown`, `brand-terracotta`, `brand-taupe`)
* **Animations**: Framer Motion (scroll tracking, spring physics, magnetic interactions, stagger effects)
* **Icons**: Lucide React
* **Package Manager**: pnpm with workspace support
* **Type Safety**: TypeScript

### Custom Tailwind Variables
```css
--brand-sand: #F6F4F0
--brand-brown: #3E2C24
--brand-terracotta: #D97A60
--brand-taupe: #8B8680
--rounded-b-sheet: 40px (custom border radius)
```

---

## 📁 Project Structure

```
src/
├── app/
│   ├── page.tsx              # Landing page with full component orchestration
│   ├── layout.tsx            # Root layout with global providers
│   ├── globals.css           # Global styles (overflow-x: hidden removed to preserve sticky)
│   ├── journal/              # Journal/blog section
│   ├── shop/                 # Shop section
│
├── components/
│   ├── features/
│   │   ├── HeroSection.tsx           # Full-screen hero with image & CTA
│   │   ├── ProductCard.tsx           # Tactile cards with video hover
│   │   ├── VibeCarousel.tsx          # Responsive product showcase carousel
│   │   ├── EditorialInterstitial.tsx # Scroll-linked text animation
│   │   ├── ValueMarquee.tsx          # Auto-scrolling brand values ticker
│   │   ├── SignaturePieces.tsx       # Signature collection display
│   │   ├── Testimonials.tsx          # Customer testimonials
│   │   ├── Newsletter.tsx            # Email signup form
│   │   ├── ProductSheet.tsx          # Details modal with revenue engine
│   │   ├── ProductSheetContext.tsx   # Modal state management
│   │   ├── WriteReviewModal.tsx      # Review submission form
│   │   ├── SearchOverlay.tsx         # Search modal with instant results
│   │   └── CartDrawer.tsx            # Shopping cart sidebar
│   │
│   └── layout/
│       ├── Navigation.tsx            # Header navigation
│       └── Footer.tsx                # Footer
│
├── lib/
│   ├── context/
│   │   ├── CartContext.tsx           # Cart state management
│   │   └── SearchContext.tsx         # Search state management
│   └── data/
│       └── products.ts               # Product database & metadata
│
└── types/
    └── (TypeScript type definitions)
```

---

## 🎨 Design Highlights

### Spacing & Alignment Standards
- Navigation height: 64px (fixed)
- Hero section: 85vh (perfectly balanced with header)
- Container max-width: 7xl (1280px)
- Padding scales: mobile 6 (24px), desktop 16 (64px)
- Consistent gap spacing for component layout

### Animation Patterns
- **Entrance**: Scale-down with spring physics (stiffness: 60-70)
- **Hover**: Magnetic interactions + scale transforms
- **Scroll**: Linked opacity/position transforms using Framer Motion's `useScroll`
- **Stagger**: Orchestrated child animations with 150ms delays

### Responsive Breakpoints
- Mobile: Base styles (< 768px)
- Tablet: `md:` prefix (≥ 768px)
- Desktop: `lg:` prefix (≥ 1024px)
- HD: `xl:` prefix (≥ 1280px)

---

## ⚙️ Running Locally

1. **Install dependencies**:
   ```bash
   pnpm install
   ```

2. **Run development server**:
   ```bash
   pnpm dev
   ```
   The site will be available at `http://localhost:3000`

3. **Build for production**:
   ```bash
   pnpm build
   ```

4. **Start production server**:
   ```bash
   pnpm start
   ```

---

## 🐛 Known Considerations

* **Sticky Elements**: `overflow-x: hidden` removed from `body` in `globals.css` to preserve `position: sticky` bounds. Horizontal overflow is managed at individual container level.
* **Video Loading**: Product card videos use fallback error handling—if a video URL is unavailable, the static image remains visible as a graceful degradation.
* **Scroll Performance**: `EditorialInterstitial` uses optimized `useTransform` with `offset: ["start start", "end end"]` for smooth 60fps scroll tracking.

---

## 📦 Dependencies

- `next`: 16.2.6
- `react`: 19.x
- `framer-motion`: Latest (animations & interactions)
- `tailwindcss`: v4 (styling)
- `lucide-react`: Icons
- `typescript`: Type safety

---

## 🚀 Performance Optimizations

- Next.js Image optimization with `quality={100}` for hero background
- Turbopack for ultra-fast builds
- Server Components by default for reduced client bundle
- Tailwind CSS v4 with canonical class names
- Strategic use of `priority` prop for above-fold images
- Scroll-triggered animations only on `whileInView`
