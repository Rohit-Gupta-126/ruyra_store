"use client";

import { createContext, useContext, useState, useEffect } from "react";

export interface CartItem {
  id: string;
  name: string;
  price: string; // e.g. "$45"
  variant: string;
  image: string;
  quantity: number;
  isSubscription?: boolean;
  frequency?: string;
}

interface CartContextValue {
  cartItems: CartItem[];
  isCartOpen: boolean;
  cartCount: number;
  subtotal: number;
  addItem: (item: Omit<CartItem, "quantity">) => void;
  removeItem: (id: string, variant: string, isSubscription?: boolean, frequency?: string) => void;
  updateQuantity: (id: string, variant: string, quantity: number, isSubscription?: boolean, frequency?: string) => void;
  toggleCart: () => void;
  openCart: () => void;
  closeCart: () => void;
}

const CartContext = createContext<CartContextValue | null>(null);

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within a CartProvider");
  return ctx;
}

export default function CartProvider({ children }: { children: React.ReactNode }) {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  const [isLoaded, setIsLoaded] = useState(false);

  // Load cart from localStorage on mount (Client-side only)
  useEffect(() => {
    const timer = setTimeout(() => {
      const savedCart = localStorage.getItem("ruyra_cart");
      if (savedCart) {
        try {
          const parsed = JSON.parse(savedCart);
          if (Array.isArray(parsed)) {
            setCartItems(parsed);
          }
        } catch (e) {
          console.error("Error loading cart", e);
        }
      }
      setIsLoaded(true);
    }, 0);
    return () => clearTimeout(timer);
  }, []);

  // Save cart to localStorage on change
  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem("ruyra_cart", JSON.stringify(cartItems));
    }
  }, [cartItems, isLoaded]);

  const addItem = (newItem: Omit<CartItem, "quantity">) => {
    setCartItems((prevItems) => {
      const existingItemIndex = prevItems.findIndex(
        (item) =>
          item.id === newItem.id &&
          item.variant === newItem.variant &&
          item.isSubscription === newItem.isSubscription &&
          item.frequency === newItem.frequency
      );

      if (existingItemIndex > -1) {
        const updated = [...prevItems];
        updated[existingItemIndex].quantity += 1;
        return updated;
      } else {
        return [...prevItems, { ...newItem, quantity: 1 }];
      }
    });
    // Open the cart drawer automatically for premium visual feedback
    setIsCartOpen(true);
  };

  const removeItem = (id: string, variant: string, isSubscription?: boolean, frequency?: string) => {
    setCartItems((prevItems) =>
      prevItems.filter(
        (item) =>
          !(
            item.id === id &&
            item.variant === variant &&
            item.isSubscription === isSubscription &&
            item.frequency === frequency
          )
      )
    );
  };

  const updateQuantity = (
    id: string,
    variant: string,
    quantity: number,
    isSubscription?: boolean,
    frequency?: string
  ) => {
    if (quantity <= 0) {
      removeItem(id, variant, isSubscription, frequency);
      return;
    }
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id &&
        item.variant === variant &&
        item.isSubscription === isSubscription &&
        item.frequency === frequency
          ? { ...item, quantity }
          : item
      )
    );
  };

  const toggleCart = () => setIsCartOpen((prev) => !prev);
  const openCart = () => setIsCartOpen(true);
  const closeCart = () => setIsCartOpen(false);

  // Derived values
  const cartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);
  
  const subtotal = cartItems.reduce((acc, item) => {
    const numericPrice = parseFloat(item.price.replace(/[^0-9.]/g, "")) || 0;
    return acc + numericPrice * item.quantity;
  }, 0);

  return (
    <CartContext.Provider
      value={{
        cartItems,
        isCartOpen,
        cartCount,
        subtotal,
        addItem,
        removeItem,
        updateQuantity,
        toggleCart,
        openCart,
        closeCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}
