"use client";

import { useState } from "react";
import Link from "next/link";
import { Search, ShoppingBag, Home, BookOpen } from "lucide-react";
import { motion } from "framer-motion";
import { useCart } from "@/app/context/CartContext";

const navLinks = [
  { id: "shop", label: "Shop", href: "/shop" },
  { id: "story", label: "Story", href: "/journal" },
  { id: "sustainability", label: "Sustainability", href: "/#sustainability-section" },
];

const mobileNavItems = [
  { id: "home", label: "Home", icon: Home, href: "/" },
  { id: "story", label: "Story", icon: BookOpen, href: "/journal" },
  { id: "search", label: "Search", icon: Search, href: "/shop" },
  { id: "cart", label: "Cart", icon: ShoppingBag, href: "#", isCartButton: true },
];

export default function Navigation() {
  const [hoveredLink, setHoveredLink] = useState<string | null>(null);
  const [activeMobileTab, setActiveMobileTab] = useState("home");
  
  const { cartCount, openCart } = useCart();

  return (
    <>
      {/* ── Desktop/Tablet Top Header (md+) ── */}
      <motion.header
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: "spring", stiffness: 100, damping: 20, delay: 0.1 }}
        className="hidden md:block sticky top-0 w-full z-40 bg-brand-brown border-b border-brand-sand/10 transition-all duration-300"
      >
        <div className="max-w-7xl mx-auto px-6 md:px-12 h-20 flex items-center justify-between">
          
          {/* Logo */}
          <Link href="/" className="font-serif text-2xl tracking-[0.2em] text-brand-sand font-bold hover:opacity-85 transition-opacity">
            RUYRA
          </Link>
          
          {/* Navigation Links */}
          <nav className="flex items-center gap-8" aria-label="Main Navigation">
            {navLinks.map((link) => (
              <Link
                key={link.id}
                href={link.href}
                className="relative font-sans text-sm font-medium text-brand-sand/80 hover:text-brand-sand py-2 transition-colors"
                onMouseEnter={() => setHoveredLink(link.id)}
                onMouseLeave={() => setHoveredLink(null)}
              >
                {link.label}
                {hoveredLink === link.id && (
                  <motion.span
                    layoutId="desktop-nav-underline"
                    className="absolute bottom-0 left-0 right-0 h-[2px] bg-brand-terracotta"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
              </Link>
            ))}
          </nav>

          {/* Icons */}
          <div className="flex items-center gap-6 text-brand-sand">
            <Link
              id="nav-search-desktop"
              href="/shop"
              suppressHydrationWarning
              className="p-1.5 hover:text-brand-terracotta transition-colors focus:outline-none"
              aria-label="Search Collection"
            >
              <Search className="w-5 h-5 stroke-[1.5]" />
            </Link>
            <motion.button
              id="nav-cart-desktop"
              suppressHydrationWarning
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={openCart}
              className="relative p-1.5 hover:text-brand-terracotta transition-colors focus:outline-none"
              aria-label={`Shopping Cart, ${cartCount} items`}
            >
              <ShoppingBag className="w-5 h-5 stroke-[1.5]" />
              {cartCount > 0 && (
                <span className="absolute top-0 right-0 w-4 h-4 bg-brand-terracotta text-white text-[10px] font-bold rounded-full flex items-center justify-center translate-x-1 -translate-y-1">
                  {cartCount}
                </span>
              )}
            </motion.button>
          </div>
        </div>
      </motion.header>

      {/* ── Mobile Floating Bottom Navigation Pill (md hidden) ── */}
      <motion.nav
        initial={{ y: 80, x: "-50%", opacity: 0 }}
        animate={{ y: 0, x: "-50%", opacity: 1 }}
        transition={{ type: "spring", stiffness: 100, damping: 18, delay: 0.3 }}
        aria-label="Mobile Navigation"
        className="fixed bottom-6 left-1/2 w-[90%] backdrop-blur-md bg-brand-brown/95 rounded-full shadow-[0_8px_30px_rgba(0,0,0,0.3)] border border-brand-sand/10 flex justify-around py-3 px-6 z-50 md:hidden"
      >
        {mobileNavItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeMobileTab === item.id;
          
          if (item.isCartButton) {
            return (
              <button
                key={item.id}
                id={`mobile-nav-${item.id}`}
                onClick={openCart}
                className="relative flex flex-col items-center justify-center p-2 rounded-full text-brand-sand/70 hover:text-brand-terracotta active:scale-95 transition-all focus:outline-none cursor-pointer"
                aria-label={item.label}
              >
                <Icon className="w-6 h-6 stroke-[1.5] text-brand-sand/70" />
                {cartCount > 0 && (
                  <span className="absolute top-1 right-1 w-2 h-2 bg-brand-terracotta rounded-full" />
                )}
              </button>
            );
          }

          return (
            <Link
              key={item.id}
              href={item.href}
              id={`mobile-nav-${item.id}`}
              onClick={() => setActiveMobileTab(item.id)}
              className="relative flex flex-col items-center justify-center p-2 rounded-full text-brand-sand/70 hover:text-brand-terracotta active:scale-95 transition-all focus:outline-none"
              aria-label={item.label}
              aria-current={isActive ? "page" : undefined}
            >
              {isActive && (
                <motion.div
                  layoutId="mobile-nav-active-pill"
                  className="absolute inset-0 bg-brand-sand/10 rounded-full -z-10"
                  transition={{ type: "spring", stiffness: 380, damping: 30 }}
                />
              )}
              
              <Icon
                className={`w-6 h-6 stroke-[1.5] transition-colors ${
                  isActive ? "text-brand-terracotta" : "text-brand-sand/70"
                }`}
              />
            </Link>
          );
        })}
      </motion.nav>
    </>
  );
}
