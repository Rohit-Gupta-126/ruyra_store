// Shared product data used across components

export interface Product {
  id: string;
  name: string;
  price: string;
  image: string;
  alt: string;
  category: string;
  description: string;
  variants: string[];
  variantType: "Size" | "Scent";
}

export const products: Product[] = [
  {
    id: "amber-ritual-candle",
    name: "Amber Ritual Candle",
    price: "₹1,499",
    image: "https://images.unsplash.com/photo-1603006905003-be475563bc59?q=80&w=800&auto=format&fit=crop",
    alt: "Hand-poured soy wax candle in an amber glass jar, casting a warm golden glow on dark stone",
    category: "Home Fragrance",
    description: "Formulated with pure soy wax, infused with notes of warm amber, cedarwood, and wild vetiver. Hand-poured in small batches to ground your space and soothe the senses.",
    variants: ["Standard (8 oz)", "Grand (16 oz)"],
    variantType: "Size"
  },
  {
    id: "ritual-bath-salts",
    name: "Ritual Bath Salts",
    price: "₹1,299",
    image: "https://images.unsplash.com/photo-1540555700478-4be289fbecef?q=80&w=800&auto=format&fit=crop",
    alt: "Textured pink Himalayan salts mixed with dry lavender and calendula petals in a low stoneware dish",
    category: "Bath & Body",
    description: "A restorative blend of mineral-rich pink Himalayan salt, Dead Sea salt, and organic botanical extracts of lavender and chamomile. Dissolves to release a calm, grounding aroma.",
    variants: ["Relaxing Lavender", "Grounding Cedarwood"],
    variantType: "Scent"
  },
  {
    id: "earthen-taper-holder",
    name: "Earthen Taper Holder",
    price: "₹2,199",
    image: "https://images.unsplash.com/photo-1612196808214-b8e1d6145a8c?q=80&w=800&auto=format&fit=crop",
    alt: "Chunky hand-thrown clay taper candle holder showing natural iron spots and beige sand texture",
    category: "Home Decor",
    description: "Molded by hand in clay, then wood-fired to create unique surface irregularities. This sculptural holder adds raw, tactile geometry and rustic elegance to any table setting.",
    variants: ["Sable Clay", "Sandstone"],
    variantType: "Size"
  },
  {
    id: "resin-adornments",
    name: "Resin Adornments",
    price: "₹3,999",
    image: "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?q=80&w=800&auto=format&fit=crop",
    alt: "Amber resin block displaying suspended dry botanical fragments and mineral dust",
    category: "Adornments",
    description: "Hand-cast bio-resin blocks encasing sustainably harvested forest moss, lichen, and amber dust. Captures the ephemeral beauty of the wilderness in a solid, tactile sculpture.",
    variants: ["Forest Floor", "Coastal Driftwood"],
    variantType: "Scent"
  }
];

export const vibeCategories = [
  {
    id: "home-fragrance",
    name: "Home Fragrance",
    price: "₹1,499",
    image: "https://images.unsplash.com/photo-1603006905003-be475563bc59?q=80&w=800&auto=format&fit=crop",
  },
  {
    id: "bath-rituals",
    name: "Bath Rituals",
    price: "₹1,299",
    image: "https://images.unsplash.com/photo-1540555700478-4be289fbecef?q=80&w=800&auto=format&fit=crop",
  },
];
