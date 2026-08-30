// Shared product data for CHISÓ Creations

export interface Product {
  id: string;
  name: string;
  price: string;
  originalPrice?: string;
  image: string;
  alt: string;
  category: "Blooms" | "Charms" | "Gifts" | "Décor" | "Custom Creations";
  tag?: string;
  description: string;
  variants: string[];
  variantType: "Color" | "Style" | "Option";
  rating?: number;
  reviewsCount?: number;
}

export const products: Product[] = [
  {
    id: "chenille-tulip-bouquet",
    name: "Chenille Eternal Tulip Bouquet",
    price: "₹1,899",
    originalPrice: "₹2,299",
    image: "https://images.unsplash.com/photo-1582794543139-8ac9cb0f7b11?q=80&w=800&auto=format&fit=crop",
    alt: "Handcrafted pink and cream chenille tulip flower bouquet wrapped with satin ribbon and kraft tag",
    category: "Blooms",
    tag: "BEST SELLER",
    description: "Handmade with ultra-soft chenille velvet yarn in blushing pink and warm cream tones. Wrapped in kraft paper with a satin ribbon and 'Made with love. Kept forever.' tag. Never wilts, no water needed.",
    variants: ["Blush Pink & Cream", "Pastel Lavender", "Sunlit Yellow & Peach"],
    variantType: "Color",
    rating: 5.0,
    reviewsCount: 38
  },
  {
    id: "crochet-daisy-basket",
    name: "Crochet Daisy Woven Basket Pot",
    price: "₹1,499",
    originalPrice: "₹1,799",
    image: "https://images.unsplash.com/photo-1563245372-f21724e3856d?q=80&w=800&auto=format&fit=crop",
    alt: "Handmade pink and yellow crochet daisy flowers nestled inside a rustic woven basket pot with CHISÓ label",
    category: "Décor",
    tag: "SIGNATURE DÉCOR",
    description: "Charming handcrafted daisy blooms nestled inside a miniature woven rattan basket with a wooden easel stand. Brings a sunny, cozy presence to bedside tables, desks, or shelf spaces.",
    variants: ["Pastel Pink Daisies", "Sunny Yellow Daisies", "Pure White Daisies"],
    variantType: "Color",
    rating: 4.9,
    reviewsCount: 24
  },
  {
    id: "tulip-heart-bag-charm",
    name: "Handmade Tulip & Heart Bag Charm",
    price: "₹799",
    originalPrice: "₹999",
    image: "https://images.unsplash.com/photo-1611085583191-a3b181a88401?q=80&w=800&auto=format&fit=crop",
    alt: "Miniature handcrafted chenille tulip, crochet woven heart charm and faux pearl beaded gold keychain",
    category: "Charms",
    tag: "ADORABLE CHARM",
    description: "Delightful handmade bag charm featuring a plush mini chenille tulip, a hand-stitched crochet heart, a string of lustrous pearls, and a 'handmade with love ♥' wooden tag on a gold clasp.",
    variants: ["Blush Tulip + Coral Heart", "Lavender Tulip + Soft Pink Heart", "Buttercup Tulip + Sage Heart"],
    variantType: "Style",
    rating: 5.0,
    reviewsCount: 42
  },
  {
    id: "blushing-peony-keepsake",
    name: "Everlasting Peony & Rose Keepsake",
    price: "₹2,199",
    image: "https://images.unsplash.com/photo-1561181286-d3fee7d55364?q=80&w=800&auto=format&fit=crop",
    alt: "Intricately crafted plush chenille peony and rose arrangement in a soft ceramic base",
    category: "Blooms",
    tag: "LUXURY KEEPSAKE",
    description: "A showstopping floral centerpiece crafted from hundreds of velvety chenille loops. Features full-bloom peonies and wild roses in romantic sunset hues that keep their vibrant shape forever.",
    variants: ["Sunset Rose Blend", "Ethereal Pastel Mix", "Velvet Crimson & Champagne"],
    variantType: "Color",
    rating: 4.9,
    reviewsCount: 19
  },
  {
    id: "heartfelt-gift-box",
    name: "Heartfelt Custom Gift Hamper",
    price: "₹2,599",
    originalPrice: "₹3,199",
    image: "https://images.unsplash.com/photo-1549465220-1a8b9238cd48?q=80&w=800&auto=format&fit=crop",
    alt: "Artisan gift box containing a mini chenille flower bouquet, heart keychain charm, and personalized letter card",
    category: "Gifts",
    tag: "PERFECT GIFT",
    description: "The ultimate gesture of affection. Includes a bespoke mini chenille bouquet, a matching crochet heart charm, artisanal greeting card with your custom handwritten note, and luxury ribbon gift packaging.",
    variants: ["Love & Romance Box", "Birthday Celebration Box", "Just Because / Self-Love Box"],
    variantType: "Option",
    rating: 5.0,
    reviewsCount: 31
  },
  {
    id: "custom-creation-order",
    name: "Custom Bespoke Flower Creation",
    price: "₹2,499",
    image: "https://images.unsplash.com/photo-1513519245088-0e12902e5a38?q=80&w=800&auto=format&fit=crop",
    alt: "Handmade customized floral design with personalized color palette and special stem tags",
    category: "Custom Creations",
    tag: "MADE FOR YOU",
    description: "Have a dream flower, favorite color palette, or milestone anniversary? Our artisans handcraft your custom bouquet or charm exactly to your vision. Simply include your details or DM us.",
    variants: ["Custom 5-Stem Bouquet", "Custom 9-Stem Grand Bouquet", "Custom Charm & Bloom Duo"],
    variantType: "Option",
    rating: 5.0,
    reviewsCount: 56
  }
];

export const vibeCategories = [
  {
    id: "blooms",
    name: "Blooms",
    subtitle: "Chenille Flower Creations",
    image: "https://images.unsplash.com/photo-1582794543139-8ac9cb0f7b11?q=80&w=800&auto=format&fit=crop",
    href: "/shop?category=Blooms"
  },
  {
    id: "charms",
    name: "Charms",
    subtitle: "Adorable & Unique",
    image: "https://images.unsplash.com/photo-1611085583191-a3b181a88401?q=80&w=800&auto=format&fit=crop",
    href: "/shop?category=Charms"
  },
  {
    id: "gifts",
    name: "Gifts",
    subtitle: "Thoughtful. Heartfelt.",
    image: "https://images.unsplash.com/photo-1549465220-1a8b9238cd48?q=80&w=800&auto=format&fit=crop",
    href: "/shop?category=Gifts"
  },
  {
    id: "decor",
    name: "Décor",
    subtitle: "Handmade to Beautify Spaces",
    image: "https://images.unsplash.com/photo-1563245372-f21724e3856d?q=80&w=800&auto=format&fit=crop",
    href: "/shop?category=Décor"
  },
  {
    id: "custom",
    name: "Custom Creations",
    subtitle: "Made especially for you. ♡",
    image: "https://images.unsplash.com/photo-1513519245088-0e12902e5a38?q=80&w=800&auto=format&fit=crop",
    href: "/shop?category=Custom%20Creations"
  }
];
