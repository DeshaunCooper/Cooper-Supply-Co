"use client";

import { createContext, useContext, useMemo, useState } from "react";
import type { CartItem } from "@/lib/types";
import { useLocalStorage } from "@/hooks/use-local-storage";
import { cartCount, cartSubtotal } from "./cart-utils";

type CartContextValue = {
  items: CartItem[];
  addItem: (item: CartItem) => void;
  updateQty: (productId: string, size: string, quantity: number) => void;
  removeItem: (productId: string, size: string) => void;
  clearCart: () => void;
  count: number;
  subtotal: number;
  open: boolean;
  setOpen: (next: boolean) => void;
  hydrated: boolean;
};

const CartContext = createContext<CartContextValue | null>(null);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems, hydrated] = useLocalStorage<CartItem[]>("cooper-cart", []);
  const [open, setOpen] = useState(false);

  function addItem(item: CartItem) {
    setItems((prev) => {
      const existing = prev.find((x) => x.productId === item.productId && x.size === item.size);
      if (existing) {
        return prev.map((x) =>
          x.productId === item.productId && x.size === item.size
            ? { ...x, quantity: x.quantity + item.quantity }
            : x
        );
      }
      return [...prev, item];
    });
    setOpen(true);
  }

  function updateQty(productId: string, size: string, quantity: number) {
    setItems((prev) =>
      prev.flatMap((item) => {
        if (item.productId !== productId || item.size !== size) return [item];
        if (quantity <= 0) return [];
        return [{ ...item, quantity }];
      })
    );
  }

  function removeItem(productId: string, size: string) {
    setItems((prev) => prev.filter((x) => !(x.productId === productId && x.size === size)));
  }

  function clearCart() {
    setItems([]);
  }

  const value = useMemo(
    () => ({
      items,
      addItem,
      updateQty,
      removeItem,
      clearCart,
      count: cartCount(items),
      subtotal: cartSubtotal(items),
      open,
      setOpen,
      hydrated,
    }),
    [items, open, hydrated]
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used inside CartProvider");
  return ctx;
}
