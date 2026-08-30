# CHISÓ Creations — Little Luxuries, Handcrafted. ✨

**CHISÓ Creations** is an artisanal luxury e-commerce storefront specializing in everlasting chenille floral creations, adorable bag charms, woven room décor, and heartfelt bespoke gifts. Built on Next.js 16 with Turbopack, Tailwind CSS v4, and Framer Motion, it delivers a cozy, tactile editorial aesthetic with high-converting, modern UI/UX interactions.

> *"Handmade blooms. Thoughtful gifts. Made especially for you. ♡"*

---

## 🌸 Core Handcrafted Pillars

1. 🌸 **BLOOMS**: Everlasting chenille and crochet flower bouquets (tulips, daisies, peonies) handcrafted with love and kept forever.
2. 🎀 **CHARMS**: Adorable & unique plush mini tulips, hand-stitched crochet hearts, and faux pearl beaded keychains.
3. 🎁 **GIFTS**: Curated celebratory gift hampers with complimentary handwritten calligraphy cards.
4. 🏠 **DÉCOR**: Miniature daisy flower arrangements in rustic woven rattan basket pots with wooden display stands.
5. ✏️ **CUSTOM CREATIONS**: Bespoke floral designs tailored to custom color palettes, anniversaries, and milestone moments.

---

## ✨ Key Features & UX Highlights

### 1. Interactive 3D Hero Showcase
- **3D Tilt Physics**: Interactive perspective card responding to cursor movement.
- **Floating Craft Tags**: *"Made with love. Kept forever. ♡"* and *"Blooming happiness, crafted by hand. ✨"*
- **Multi-vibe Switcher**: Seamless autoplay and manual tab navigation between Blooms, Charms, and Décor.
- **Top Announcement Bar**: Displays promotional alerts and free shipping thresholds.

### 2. Category Pillars Grid (`CategoryPillars.tsx`)
- Interactive 5-pillar visual navigation bar mapping directly to corresponding collections with animated hover transitions.

### 3. Tactile Product Cards (`ProductCard.tsx`)
- Soft linen and pastel card surfaces with category badges.
- **Magnetic Quick-Add Button**: Floating spring-physics button that attracts cursor within a 40px radius.
- Star rating indicators and instant preview sheet triggers.

### 4. Keepsake Product Quick-View (`ProductSheet.tsx`)
- Tabbed specifications: **Artisanal Craft Details**, **Everlasting Care Guide** (no watering needed), and **Customer Photo Reviews**.
- Interactive stem/ribbon variant selectors.
- Complimentary **Handwritten Gift Note** checkbox with custom message input.

### 5. Keepsake Bag & Checkout Flow (`CartDrawer.tsx` & `/checkout`)
- Real-time free shipping motivator meter (₹1,999 threshold).
- Plastic-free craft packaging reminder.
- Multi-step checkout with UPI (PhonePe, Paytm, BHIM QR codes), order confirmation, and celebratory receipt generation.

### 6. Handcrafted Story Interstitial (`EditorialInterstitial.tsx`)
- Scroll-driven parallax text reveal: *"Handmade with Love. Kept Forever. ♡ Blooming Happiness in Every Stitch."*

### 7. Instant Search Overlay (`SearchOverlay.tsx`)
- Full-screen search with trending intention pills (*"Chenille Tulip"*, *"Bag Charms"*, *"Daisy Basket"*, *"Gift Box"*).

---

## 🎨 Design System & Palette

- **Base Canvas**: Warm Linen & Oat Milk (`#FAF7F2`, `#FFFDF9`)
- **Primary Typography**: Deep Warm Mocha & Espresso (`#422926`, `#38201D`)
- **Accent Palette**: Romantic Blush Pink (`#D9777F`), Coral Rose (`#E8A598`), Terracotta (`#C8626D`)
- **Botanical & Sparkle**: Sage Green (`#7E9675`) & Honey Gold (`#D9A557`)
- **Typography Pairings**:
  - `Playfair Display` (Luxury Editorial Serif)
  - `Plus Jakarta Sans` (Clean Modern Sans)
  - `Caveat` & `Alex Brush` (Handcrafted Romantic Script)

---

## 🛠️ Tech Stack

- **Framework**: Next.js 16.2.6 (Turbopack, App Router, React 19)
- **Styling**: Tailwind CSS v4 with custom design tokens
- **Animations**: Framer Motion (spring physics, scroll-linked transforms, stagger animations)
- **Icons**: Lucide React
- **Package Manager**: pnpm (v11+)
- **Language**: TypeScript

---

## 📁 Project Structure

```
src/
├── app/
│   ├── page.tsx              # CHISÓ Creations landing page
│   ├── layout.tsx            # Root layout with fonts, metadata & providers
│   ├── globals.css           # Design tokens, Tailwind v4 @theme, custom classes
│   ├── shop/                 # Catalog page with category pills & price sort
│   ├── journal/              # Artisanal craft stories & care guide
│   ├── checkout/             # Multi-step checkout flow with UPI QR codes
│   ├── not-found.tsx         # Branded 404 page
│   └── error.tsx             # Error boundary
│
├── components/
│   ├── features/
│   │   ├── HeroSection.tsx           # 3D tilt showcase & craft tags
│   │   ├── CategoryPillars.tsx       # 5 signature pillars (Blooms, Charms, etc.)
│   │   ├── ProductCard.tsx           # Magnetic add & tactile hover card
│   │   ├── ProductSheet.tsx          # Quick-view drawer with care guide & notes
│   │   ├── LaunchesAndOffers.tsx     # Gift set bundles & drops
│   │   ├── EditorialInterstitial.tsx # Scroll-driven text reveal
│   │   ├── ValueMarquee.tsx          # Infinite brand values loop
│   │   ├── SignaturePieces.tsx       # Signature product catalog grid
│   │   ├── Testimonials.tsx          # Verified community reviews
│   │   ├── Newsletter.tsx            # Community signup & custom inquiry
│   │   ├── CartDrawer.tsx            # Keepsake bag with free shipping progress
│   │   ├── SearchOverlay.tsx         # Instant search modal
│   │   └── WriteReviewModal.tsx      # Customer review submission
│   │
│   └── layout/
│       ├── Navigation.tsx            # Top header & mobile bottom dock
│       └── Footer.tsx                # Artisanal footer with social connections
│
└── lib/
    ├── context/
    │   ├── CartContext.tsx           # Cart state management (chiso_cart)
    │   └── SearchContext.tsx         # Global search modal context
    └── data/
        └── products.ts               # Handcrafted product catalog & metadata
```

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
   Open [http://localhost:3000](http://localhost:3000) in your browser.

3. **Build for production**:
   ```bash
   pnpm build
   ```

4. **Start production server**:
   ```bash
   pnpm start
   ```

---

## 💌 Stay Tuned & Keep Supporting Small ♡

Handcrafted with love by **CHISÓ Creations**. Kept forever.
