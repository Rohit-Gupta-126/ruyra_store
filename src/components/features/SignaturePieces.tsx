"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { products, Product } from "@/lib/data/products";
import { useProductSheet } from "./ProductSheetContext";
import { useCart } from "@/lib/context/CartContext";
import ProductCard from "./ProductCard";
import { Sparkles, ArrowRight } from "lucide-react";

export default function SignaturePieces() {
  const { openSheet } = useProductSheet();
  const { addItem } = useCart();

  const handleOpenProduct = (product: Product) => {
    openSheet(product.name, product.image, product.price);
  };

  return (
    <section id="signature-pieces-section" className="bg-[#FAF7F2] py-20 md:py-28 w-full overflow-hidden border-t border-[#EFE7DD]">
      <div className="max-w-7xl mx-auto px-6 md:px-12 w-full">
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12 sm:mb-16 gap-4">
          <motion.div 
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="space-y-2 max-w-xl"
          >
            <div className="flex items-center gap-2 text-brand-terracotta text-xs font-sans font-bold tracking-widest uppercase">
              <Sparkles className="w-3.5 h-3.5" />
              <span>HANDMADE FAVORITES</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-[#422926]">
              Signature <span className="font-script text-4xl sm:text-5xl lg:text-6xl text-brand-terracotta">Creations</span>
            </h2>
            <p className="font-sans text-xs sm:text-sm text-brand-text-muted">
              Explore our most cherished chenille bouquets, adorable bag charms, and woven pieces.
            </p>
          </motion.div>

          <Link
            href="/shop"
            className="inline-flex items-center gap-1.5 font-sans text-xs uppercase tracking-widest font-bold text-brand-terracotta hover:text-[#B34E59] transition-colors pb-1 border-b border-brand-terracotta/30 hover:border-brand-terracotta self-start sm:self-auto"
          >
            <span>View Full Shop</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {/* Staggered Grid on Scroll */}
        <motion.div 
          variants={{
            hidden: { opacity: 0 },
            show: {
              opacity: 1,
              transition: {
                staggerChildren: 0.1,
                delayChildren: 0.05
              }
            }
          }}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-50px" }}
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6 w-full"
        >
          {products.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onOpenDetails={handleOpenProduct}
              onQuickAdd={(prod) =>
                addItem({
                  id: prod.id,
                  name: prod.name,
                  price: prod.price,
                  variant: prod.variants[0],
                  image: prod.image,
                })
              }
            />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
