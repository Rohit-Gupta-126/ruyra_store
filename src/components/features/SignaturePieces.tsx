"use client";

import { motion } from "framer-motion";
import { products, Product } from "@/lib/data/products";
import { useProductSheet } from "./ProductSheetContext";
import { useCart } from "@/lib/context/CartContext";
import ProductCard from "./ProductCard";

export default function SignaturePieces() {
  const { openSheet } = useProductSheet();
  const { addItem } = useCart();

  const handleOpenProduct = (product: Product) => {
    openSheet(product.name, product.image, product.price);
  };

  return (
    <section className="bg-bg-surface rounded-t-[40px] py-24 px-6 md:px-12 w-full mt-12">
      <div className="max-w-7xl mx-auto">
        {/* Header with entrance animation */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="flex justify-between items-baseline mb-12"
        >
          <h2 className="font-serif text-3xl text-text-primary">
            Signature Pieces
          </h2>
          <a
            href="#all-products"
            className="font-sans text-xs uppercase tracking-wider text-text-secondary hover:text-accent-primary transition-colors border-b border-text-secondary/20 hover:border-accent-primary pb-0.5"
          >
            View All
          </a>
        </motion.div>

        {/* Staggered Grid on Scroll */}
        <motion.div 
          variants={{
            hidden: { opacity: 0 },
            show: {
              opacity: 1,
              transition: {
                staggerChildren: 0.12,
                delayChildren: 0.1
              }
            }
          }}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-50px" }}
          className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8"
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
