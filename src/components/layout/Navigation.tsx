"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Search, ShoppingBag, Compass, Store, Home, Sparkles, Heart } from "lucide-react";
import { motion } from "framer-motion";
import { useCart } from "@/lib/context/CartContext";
import { useSearch } from "@/lib/context/SearchContext";

const navLinks = [
  { id: "shop", label: "Shop All", href: "/shop" },
  { id: "blooms", label: "Blooms", href: "/shop?category=Blooms" },
  { id: "charms", label: "Charms", href: "/shop?category=Charms" },
  { id: "gifts", label: "Gifts", href: "/shop?category=Gifts" },
  { id: "custom", label: "Custom Orders", href: "/shop?category=Custom%20Creations" },
  { id: "story", label: "Our Story", href: "/journal" },
];

const mobileNavItems = [
  { id: "home", label: "Home", icon: Home, href: "/" },
  { id: "shop", label: "Shop", icon: Store, href: "/shop" },
  { id: "journal", label: "Story", icon: Compass, href: "/journal" },
  { id: "cart", label: "Bag", icon: ShoppingBag, href: "#", isCartButton: true },
];

export default function Navigation() {
  const [hoveredLink, setHoveredLink] = useState<string | null>(null);
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();
  
  const { cartCount, openCart, isCartOpen } = useCart();
  const { openSearch } = useSearch();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 15) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      {/* ── Top Announcement Banner ── */}
      <div className="bg-[#422926] text-[#FAF7F2] text-[11px] sm:text-xs py-2 px-4 text-center font-sans tracking-wider flex items-center justify-center gap-2">
        <Sparkles className="w-3 h-3 text-[#D9A557] animate-pulse" />
        <span>Handmade blooms. Thoughtful gifts. Made especially for you. ♡</span>
        <span className="hidden md:inline text-[#E8A598] font-medium">• Free shipping on orders over ₹1,999</span>
      </div>

      {/* ── Main Top Header ── */}
      <motion.header
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: "spring", stiffness: 120, damping: 20 }}
        className={`sticky top-0 w-full z-40 transition-all duration-300 ${
          isScrolled 
            ? "bg-[#FAF7F2]/95 backdrop-blur-md shadow-sm border-b border-[#EFE7DD]" 
            : "bg-[#FAF7F2] border-b border-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-12 h-16 md:h-20 flex items-center justify-between">
          
          {/* Brand Logo */}
          <Link href="/" className="group flex flex-col items-start leading-none py-1 focus:outline-none">
            <span className="font-serif text-2xl md:text-3xl tracking-[0.18em] text-[#422926] font-bold group-hover:text-brand-terracotta transition-colors flex items-center gap-1.5">
              CHISÓ
              <span className="w-1.5 h-1.5 rounded-full bg-brand-blush"></span>
            </span>
            <span className="font-script text-lg md:text-xl text-brand-terracotta -mt-1 tracking-wide">
              Creations ♡
            </span>
          </Link>
          
          {/* Navigation Links - Desktop */}
          <nav className="hidden lg:flex items-center gap-7" aria-label="Main Navigation">
            {navLinks.map((link) => (
              <Link
                key={link.id}
                href={link.href}
                className="relative font-sans text-[13px] tracking-wider uppercase font-semibold text-[#422926]/75 hover:text-[#422926] py-2 transition-colors"
                onMouseEnter={() => setHoveredLink(link.id)}
                onMouseLeave={() => setHoveredLink(null)}
              >
                {link.label}
                {hoveredLink === link.id && (
                  <motion.span
                    layoutId="desktop-nav-underline"
                    className="absolute bottom-0 left-0 right-0 h-[2px] bg-brand-blush rounded-full"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
              </Link>
            ))}
          </nav>

          {/* Action Icons */}
          <div className="flex items-center gap-4 sm:gap-6 text-[#422926]">
            {/* Search Button */}
            <button
              id="nav-search-desktop"
              suppressHydrationWarning
              onClick={openSearch}
              className="p-2 rounded-full hover:bg-brand-taupe/60 text-[#422926] hover:text-brand-terracotta transition-all cursor-pointer focus:outline-none"
              aria-label="Search Handcrafted Creations"
            >
              <Search className="w-4 h-4 sm:w-5 sm:h-5 stroke-[1.75]" />
            </button>

            {/* Shopping Cart Bag Button */}
            <motion.button
              id="nav-cart-desktop"
              suppressHydrationWarning
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={openCart}
              className="relative p-2 rounded-full hover:bg-brand-taupe/60 text-[#422926] hover:text-brand-terracotta transition-all cursor-pointer focus:outline-none flex items-center gap-2"
              aria-label={`Shopping Bag with ${cartCount} items`}
            >
              <div className="relative">
                <ShoppingBag className="w-4 h-4 sm:w-5 sm:h-5 stroke-[1.75]" />
                {cartCount > 0 && (
                  <span className="absolute -top-1.5 -right-1.5 min-w-4 h-4 px-1 bg-brand-blush text-white text-[10px] font-bold rounded-full flex items-center justify-center shadow-sm animate-scale-in">
                    {cartCount}
                  </span>
                )}
              </div>
              <span className="hidden sm:inline font-sans text-xs font-semibold text-brand-brown">
                Bag
              </span>
            </motion.button>
          </div>
        </div>
      </motion.header>

      {/* ── Mobile Bottom Navigation Bar ── */}
      <motion.nav
        initial={{ y: 80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: "spring", stiffness: 100, damping: 18, delay: 0.2 }}
        aria-label="Mobile Navigation"
        className="fixed bottom-0 left-0 right-0 w-full backdrop-blur-lg bg-[#FAF7F2]/95 border-t border-[#EFE7DD] flex justify-around items-center h-16 px-4 z-50 lg:hidden shadow-[0_-4px_20px_rgba(66,41,38,0.06)] pb-[env(safe-area-inset-bottom)]"
      >
        {mobileNavItems.map((item) => {
          const Icon = item.icon;
          const isActive = item.isCartButton 
            ? isCartOpen 
            : (item.href === "/" ? pathname === "/" : pathname?.startsWith(item.href));
          
          if (item.isCartButton) {
            return (
              <button
                key={item.id}
                id={`mobile-nav-${item.id}`}
                suppressHydrationWarning
                onClick={openCart}
                className="relative flex flex-col items-center justify-center p-2 text-[#422926]/70 hover:text-brand-terracotta active:scale-95 transition-all focus:outline-none cursor-pointer"
                aria-label={item.label}
              >
                <Icon 
                  className={`w-5 h-5 stroke-[1.75] transition-colors ${
                    isActive ? "text-brand-terracotta" : "text-[#422926]/70"
                  }`} 
                />
                <span className="text-[10px] font-sans font-medium mt-1">
                  {item.label}
                </span>
                {cartCount > 0 && (
                  <span className="absolute top-1 right-2 w-4 h-4 bg-brand-blush text-white text-[9px] font-bold rounded-full flex items-center justify-center">
                    {cartCount}
                  </span>
                )}
              </button>
            );
          }

          return (
            <Link
              key={item.id}
              href={item.href}
              id={`mobile-nav-${item.id}`}
              className="relative flex flex-col items-center justify-center p-2 text-[#422926]/70 hover:text-brand-terracotta active:scale-95 transition-all focus:outline-none"
              aria-label={item.label}
              aria-current={isActive ? "page" : undefined}
            >
              <Icon
                className={`w-5 h-5 stroke-[1.75] transition-colors ${
                  isActive ? "text-brand-terracotta" : "text-[#422926]/70"
                }`}
              />
              <span className={`text-[10px] font-sans font-medium mt-1 ${isActive ? "text-brand-terracotta font-semibold" : ""}`}>
                {item.label}
              </span>
              {isActive && (
                <motion.div
                  layoutId="mobile-nav-active-dot"
                  className="absolute bottom-0 w-1 h-1 bg-brand-blush rounded-full"
                  transition={{ type: "spring", stiffness: 380, damping: 30 }}
                />
              )}
            </Link>
          );
        })}
      </motion.nav>
    </>
  );
}
