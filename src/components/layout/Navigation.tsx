"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Search, ShoppingBag, Compass, Store, Home } from "lucide-react";
import { motion } from "framer-motion";
import { useCart } from "@/lib/context/CartContext";
import { useSearch } from "@/lib/context/SearchContext";

const navLinks = [
  { id: "shop", label: "Shop", href: "/shop" },
  { id: "story", label: "Story", href: "/journal" },
  { id: "sustainability", label: "Sustainability", href: "/#sustainability-section" },
];

const mobileNavItems = [
  { id: "home", label: "Home", icon: Home, href: "/" },
  { id: "shop", label: "Shop", icon: Store, href: "/shop" },
  { id: "journal", label: "Journal", icon: Compass, href: "/journal" },
  { id: "cart", label: "Cart", icon: ShoppingBag, href: "#", isCartButton: true },
];

export default function Navigation() {
  const [hoveredLink, setHoveredLink] = useState<string | null>(null);
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();
  
  const { cartCount, openCart, isCartOpen } = useCart();
  const { openSearch, isSearchOpen } = useSearch();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
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
      {/* ── Top Header (Responsive) ── */}
      <motion.header
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: "spring", stiffness: 100, damping: 20, delay: 0.1 }}
        className={`sticky top-0 w-full z-40 bg-brand-sand/65 backdrop-blur-lg border-b transition-all duration-300 ${
          isScrolled 
            ? "border-brand-brown/5 bg-brand-sand/90" 
            : "border-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-12 h-14 md:h-16 flex items-center justify-between">
          
          {/* Logo: Left-aligned on both mobile and desktop */}
          <div className="flex justify-start">
            <Link href="/" className="font-serif text-lg md:text-xl tracking-[0.25em] text-brand-brown font-bold hover:opacity-85 transition-opacity">
              RUYRA
            </Link>
          </div>
          
          {/* Navigation Links - Hidden on Mobile */}
          <nav className="hidden md:flex items-center gap-8" aria-label="Main Navigation">
            {navLinks.map((link) => (
              <Link
                key={link.id}
                href={link.href}
                className="relative font-serif text-[16px] tracking-widest font-semibold text-brand-brown/60 hover:text-brand-brown py-1.5 transition-colors"
                onMouseEnter={() => setHoveredLink(link.id)}
                onMouseLeave={() => setHoveredLink(null)}
              >
                {link.label}
                {hoveredLink === link.id && (
                  <motion.span
                    layoutId="desktop-nav-underline"
                    className="absolute bottom-0 left-0 right-0 h-[1.5px] bg-brand-terracotta"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
              </Link>
            ))}
          </nav>

          {/* Icons - Hidden on Mobile */}
          <div className="hidden md:flex items-center gap-6 text-brand-brown">
            <button
              id="nav-search-desktop"
              suppressHydrationWarning
              onClick={openSearch}
              className="p-1 hover:text-brand-terracotta transition-colors focus:outline-none cursor-pointer"
              aria-label="Search Collection"
            >
              <Search className="w-4 h-4 stroke-[1.25]" />
            </button>
            <motion.button
              id="nav-cart-desktop"
              suppressHydrationWarning
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={openCart}
              className="relative p-1 hover:text-brand-terracotta transition-colors focus:outline-none cursor-pointer"
              aria-label={`Shopping Cart, ${cartCount} items`}
            >
              <ShoppingBag className="w-4 h-4 stroke-[1.25]" />
              {cartCount > 0 && (
                <span className="absolute top-0 right-0 w-3.5 h-3.5 bg-brand-terracotta text-white text-[9px] font-bold rounded-full flex items-center justify-center translate-x-1 -translate-y-1">
                  {cartCount}
                </span>
              )}
            </motion.button>
          </div>

          {/* Mobile Search Icon - Hidden on Desktop */}
          <div className="flex md:hidden items-center text-brand-brown">
            <button
              id="nav-search-mobile"
              suppressHydrationWarning
              onClick={openSearch}
              className="p-2 hover:text-brand-terracotta transition-colors focus:outline-none cursor-pointer"
              aria-label="Search Collection"
            >
              <Search className="w-5 h-5 stroke-[1.5]" />
            </button>
          </div>
        </div>
      </motion.header>

      {/* ── Mobile Instagram-style Bottom Navigation Bar (md hidden) ── */}
      <motion.nav
        initial={{ y: 80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: "spring", stiffness: 100, damping: 18, delay: 0.3 }}
        aria-label="Mobile Navigation"
        className="fixed bottom-0 left-0 right-0 w-full backdrop-blur-md bg-brand-sand/90 border-t border-brand-brown/10 flex justify-around items-center h-16 px-4 z-50 md:hidden shadow-[0_-2px_15px_rgba(62,44,36,0.05)] pb-[env(safe-area-inset-bottom)]"
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
                className="relative flex flex-col items-center justify-center p-3 text-brand-brown/70 hover:text-brand-terracotta active:scale-95 transition-all focus:outline-none cursor-pointer"
                aria-label={item.label}
              >
                <Icon 
                  className={`w-6 h-6 stroke-[1.5] transition-colors ${
                    isActive ? "text-brand-terracotta" : "text-brand-brown/70"
                  }`} 
                />
                {item.isCartButton && cartCount > 0 && (
                  <span className="absolute top-1 right-1 w-4 h-4 bg-brand-terracotta text-white text-[9px] font-bold rounded-full flex items-center justify-center">
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
              className="relative flex flex-col items-center justify-center p-3 text-brand-brown/70 hover:text-brand-terracotta active:scale-95 transition-all focus:outline-none"
              aria-label={item.label}
              aria-current={isActive ? "page" : undefined}
            >
              <Icon
                className={`w-6 h-6 stroke-[1.5] transition-colors ${
                  isActive ? "text-brand-terracotta" : "text-brand-brown/70"
                }`}
              />
              {isActive && (
                <motion.div
                  layoutId="mobile-nav-active-dot"
                  className="absolute bottom-1 w-1 h-1 bg-brand-terracotta rounded-full"
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
