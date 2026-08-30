"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Heart, Sparkles, Send } from "lucide-react";

export default function Footer() {
  return (
    <footer id="story-section" className="bg-[#FAF7F2] pt-16 pb-12 border-t border-[#EFE7DD] w-full">
      <div className="max-w-7xl mx-auto px-6 md:px-12 flex flex-col gap-10">
        
        {/* Top Segment: Brand & Navigation */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 border-b border-[#EFE7DD] pb-12">
          
          {/* Brand Col */}
          <div className="lg:col-span-5 space-y-3">
            <Link href="/" className="inline-block">
              <span className="font-serif text-2xl sm:text-3xl tracking-[0.18em] text-[#422926] font-bold block">
                CHISÓ
              </span>
              <span className="font-script text-xl text-brand-terracotta -mt-1 block">
                Creations ♡
              </span>
            </Link>
            <p className="font-sans text-xs sm:text-sm text-brand-text-muted max-w-sm font-normal leading-relaxed">
              Your little world of handmade blooms & thoughtful creations. Little luxuries, handcrafted and made especially for you.
            </p>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white border border-[#EFE7DD] text-[11px] font-sans text-brand-terracotta font-semibold">
              <Send className="w-3 h-3" />
              <span>DM FOR ORDERS & CUSTOM CREATIONS</span>
            </div>
          </div>
          
          {/* Directory Links */}
          <div className="lg:col-span-7 grid grid-cols-2 sm:grid-cols-3 gap-8">
            <div className="space-y-3">
              <h4 className="font-sans text-xs uppercase tracking-widest font-bold text-[#422926]">
                Handcrafted
              </h4>
              <ul className="space-y-2 text-xs sm:text-sm font-sans text-brand-text-muted">
                <li><Link href="/shop?category=Blooms" className="hover:text-brand-terracotta transition-colors">Chenille Blooms</Link></li>
                <li><Link href="/shop?category=Charms" className="hover:text-brand-terracotta transition-colors">Bag Charms</Link></li>
                <li><Link href="/shop?category=Décor" className="hover:text-brand-terracotta transition-colors">Woven Décor</Link></li>
                <li><Link href="/shop?category=Gifts" className="hover:text-brand-terracotta transition-colors">Gift Hampers</Link></li>
              </ul>
            </div>

            <div className="space-y-3">
              <h4 className="font-sans text-xs uppercase tracking-widest font-bold text-[#422926]">
                About Chisó
              </h4>
              <ul className="space-y-2 text-xs sm:text-sm font-sans text-brand-text-muted">
                <li><Link href="/journal" className="hover:text-brand-terracotta transition-colors">Our Story & Craft</Link></li>
                <li><Link href="/shop?category=Custom%20Creations" className="hover:text-brand-terracotta transition-colors">Bespoke Orders</Link></li>
                <li><Link href="/journal" className="hover:text-brand-terracotta transition-colors">Flower Care Guide</Link></li>
                <li><Link href="/#newsletter-section" className="hover:text-brand-terracotta transition-colors">Join Community</Link></li>
              </ul>
            </div>

            <div className="space-y-3 col-span-2 sm:col-span-1">
              <h4 className="font-sans text-xs uppercase tracking-widest font-bold text-[#422926]">
                Customer Care
              </h4>
              <ul className="space-y-2 text-xs sm:text-sm font-sans text-brand-text-muted">
                <li><Link href="/checkout" className="hover:text-brand-terracotta transition-colors">Order Tracking</Link></li>
                <li><Link href="/journal" className="hover:text-brand-terracotta transition-colors">Shipping & Returns</Link></li>
                <li><Link href="/journal" className="hover:text-brand-terracotta transition-colors">FAQ & Support</Link></li>
              </ul>
            </div>
          </div>

        </div>

        {/* Bottom Segment: Copyright & Small Business Message */}
        <div className="flex flex-col sm:flex-row justify-between items-center gap-6 pt-2 text-center sm:text-left">
          <div className="space-y-1">
            <p className="font-sans text-xs text-brand-text-muted">
              © {new Date().getFullYear()} CHISÓ Creations. Made with love. Kept forever. ♡
            </p>
            <p className="font-script text-sm text-brand-terracotta">
              Stay tuned & keep supporting small ♡
            </p>
          </div>
          
          <div className="flex items-center gap-3">
            {[
              { label: "Instagram", href: "https://instagram.com" },
              { label: "Pinterest", href: "https://pinterest.com" },
              { label: "WhatsApp", href: "https://whatsapp.com" }
            ].map((social) => (
              <a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noreferrer"
                className="px-3.5 py-1.5 rounded-full bg-white border border-[#EFE7DD] hover:border-brand-rose text-xs font-sans text-[#422926] hover:text-brand-terracotta transition-all shadow-xs"
              >
                {social.label}
              </a>
            ))}
          </div>
        </div>

      </div>
    </footer>
  );
}
