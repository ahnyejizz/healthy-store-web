"use client";

import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

import type { Product } from "@/types/product";

export type CartItem = Pick<
  Product,
  "id" | "name" | "category" | "badge" | "price"
> & {
  quantity: number;
};

type CartState = {
  items: CartItem[];
  addItem: (product: Product) => void;
  increaseItem: (id: string) => void;
  decreaseItem: (id: string) => void;
  removeItem: (id: string) => void;
  clearCart: () => void;
};

function toCartItem(product: Product): CartItem {
  return {
    id: product.id,
    name: product.name,
    category: product.category,
    badge: product.badge,
    price: product.price,
    quantity: 1,
  };
}

export const useCartStore = create<CartState>()(
  persist(
    (set) => ({
      items: [],
      addItem: (product) =>
        set((state) => {
          const existingItem = state.items.find((item) => item.id === product.id);

          if (!existingItem) {
            return { items: [...state.items, toCartItem(product)] };
          }

          return {
            items: state.items.map((item) =>
              item.id === product.id
                ? { ...item, quantity: item.quantity + 1 }
                : item,
            ),
          };
        }),
      increaseItem: (id) =>
        set((state) => ({
          items: state.items.map((item) =>
            item.id === id ? { ...item, quantity: item.quantity + 1 } : item,
          ),
        })),
      decreaseItem: (id) =>
        set((state) => ({
          items: state.items
            .map((item) =>
              item.id === id
                ? { ...item, quantity: Math.max(0, item.quantity - 1) }
                : item,
            )
            .filter((item) => item.quantity > 0),
        })),
      removeItem: (id) =>
        set((state) => ({
          items: state.items.filter((item) => item.id !== id),
        })),
      clearCart: () => set({ items: [] }),
    }),
    {
      name: "health-store-cart",
      storage: createJSONStorage(() => localStorage),
    },
  ),
);
