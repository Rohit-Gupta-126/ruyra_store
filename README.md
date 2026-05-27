# RUYRA — Botanical Storefront

RUYRA is a high-end luxury e-commerce application specializing in handcrafted botanical candles, bath rituals, and artisanal home adornments. This storefront is upgraded with premium growth, social proof, and performance engines.

## 🚀 Key Features (The Three Engines)

### 1. The Revenue Engine (Growth-Driven PDP)
Integrated directly into the Product Detail Modal to optimize average order value (AOV) and conversion:
* **Subscribe & Save Toggle**: Smooth interactive stacked cards offering a 10% discount on auto-deliveries with selectable frequency (1, 2, or 3 months).
* **Dynamic Shipping Motivator**: A progress bar tracks the subtotal dynamically against a **$75** threshold, letting customers know exactly how much they need to add to qualify for free shipping.
* **"Complete the Ritual" Cross-sell**: Seamlessly suggests 1–2 pairing products that can be instantly added to the cart with a minimal circular `+` button.

### 2. The Trust Engine (Verified Photo Reviews)
Located at the bottom of the scrollable Product Detail Modal:
* **Sanctuary Community Carousel**: Lifestyle user-generated content (UGC) photo cards in a swipeable layout. Hovering displays a dark glassmorphism gradient and slides up a community quote.
* **Verified Buyer Badges**: Trustworthy indicators with custom checkmarks next to detailed text reviews.
* **Dynamic Review Submission**: Clicking "Write a Review" triggers a floating modal to select rating stars and type a review, instantly appending it to the local reviews list for live stateful testing.

### 3. The Performance Engine (Predictive Instant Search)
A full-screen responsive overlay modal that opens instantaneously:
* **Trending Intentions**: Interactive empty-state pills ("Amber Candle", "Bath Salts") that pre-fill the search input when clicked.
* **Frictionless Result Cards**: Dynamic queries match typing against product metadata, showing matching titles, prices, and categories.
* **Staggered Animations**: Implemented using Framer Motion so that results pop smoothly into place. Clicking a result automatically triggers the Product Detail Modal.

---

## 🛠️ Tech Stack & Styling
* **Framework**: React, Next.js (utilizing Turbopack and Server Components)
* **Styling**: Tailwind CSS (Brand colors: `brand-sand` background, `brand-brown` typography, `brand-terracotta` accents, and `brand-taupe` surfaces)
* **Animations**: Framer Motion for smooth, premium transitions, modal triggers, and stagger effects
* **Icons**: Lucide React for consistent line icons

---

## 📁 File Structure
* [`ProductSheet.tsx`](file:///e:/Web%20Dev%20Exercises/Next.js/ruyra_store/src/app/components/ProductSheet.tsx): The details modal hosting the shipping motivator, subscription cards, cross-sells, and photo review grid.
* [`WriteReviewModal.tsx`](file:///e:/Web%20Dev%20Exercises/Next.js/ruyra_store/src/app/components/WriteReviewModal.tsx): Floating review input card.
* [`SearchOverlay.tsx`](file:///e:/Web%20Dev%20Exercises/Next.js/ruyra_store/src/app/components/SearchOverlay.tsx): Full-screen predictive search modal with query matching and navigation routing.
* [`SearchContext.tsx`](file:///e:/Web%20Dev%20Exercises/Next.js/ruyra_store/src/app/context/SearchContext.tsx): Global state manager for search.
* [`CartContext.tsx`](file:///e:/Web%20Dev%20Exercises/Next.js/ruyra_store/src/app/context/CartContext.tsx): Extended to handle subscription identifiers and AOV metrics.
* [`Navigation.tsx`](file:///e:/Web%20Dev%20Exercises/Next.js/ruyra_store/src/app/components/Navigation.tsx): Modified desktop header and bottom mobile navigation bar search hooks.

---

## ⚙️ Running Locally

1. Install dependencies:
   ```bash
   pnpm install
   ```

2. Run the development server:
   ```bash
   pnpm dev
   ```

3. Build production bundle:
   ```bash
   pnpm build
   ```
