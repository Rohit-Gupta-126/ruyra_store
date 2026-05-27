"use client";

import { createContext, useContext, useState } from "react";

interface SheetState {
  isOpen: boolean;
  title: string;
  image: string;
  price: string;
}

interface ProductSheetContextValue {
  sheetState: SheetState;
  openSheet: (title: string, image: string, price: string) => void;
  closeSheet: () => void;
}

const ProductSheetContext = createContext<ProductSheetContextValue | null>(null);

export function useProductSheet() {
  const ctx = useContext(ProductSheetContext);
  if (!ctx) throw new Error("useProductSheet must be used within ProductSheetProvider");
  return ctx;
}

export default function ProductSheetProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [sheetState, setSheetState] = useState<SheetState>({
    isOpen: false,
    title: "",
    image: "",
    price: "",
  });

  const openSheet = (title: string, image: string, price: string) => {
    setSheetState({ isOpen: true, title, image, price });
    document.body.style.overflow = "hidden";
  };

  const closeSheet = () => {
    setSheetState((prev) => ({ ...prev, isOpen: false }));
    document.body.style.overflow = "";
  };

  return (
    <ProductSheetContext.Provider value={{ sheetState, openSheet, closeSheet }}>
      {children}
    </ProductSheetContext.Provider>
  );
}
