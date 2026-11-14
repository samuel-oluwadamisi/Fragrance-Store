"use client";

import { createContext, useContext, useSyncExternalStore, type ReactNode } from "react";
import type { Perfume } from "@/features/website/components/PerfumeCard";
import { priceToNumber } from "@/data/price";


export type CartItem = Perfume & { quantity: number };
 
type CartContextValue = {
  items: CartItem[];
  isReady: boolean; // false on the server and during the first render in the browser
  totalItems: number; // number of perfumes in the bag (quantities added up)
  totalPrice: number; // in naira
  addToCart: (perfume: Perfume) => void;
  increase: (name: string) => void;
  decrease: (name: string) => void;
  removeItem: (name: string) => void;
  clearCart: () => void;
};
 
const CartContext = createContext<CartContextValue | null>(null);
 
// ---- The saved cart lives in localStorage; React just subscribes to it. ----
const STORAGE_KEY = "demo-perfumery-cart";
const EMPTY: CartItem[] = []; // one stable empty array (also used on the server)
 
let cachedRaw: string | null = null;
let cachedItems: CartItem[] = EMPTY;
const listeners = new Set<() => void>();
 
// Returns the same array until the saved cart actually changes.
function getSnapshot(): CartItem[] {
  let raw: string | null = null;
  try {
    raw = localStorage.getItem(STORAGE_KEY);
  } catch {
    // storage blocked: behave like an empty cart
  }
  if (raw !== cachedRaw) {
    cachedRaw = raw;
    try {
      cachedItems = raw ? JSON.parse(raw) : EMPTY;
    } catch {
      cachedItems = EMPTY; // ignore a broken saved cart
    }
  }
  return cachedItems;
}
 
function getServerSnapshot(): CartItem[] {
  return EMPTY;
}
 
function subscribe(listener: () => void) {
  listeners.add(listener);
  window.addEventListener("storage", listener); // another tab changed the cart
  return () => {
    listeners.delete(listener);
    window.removeEventListener("storage", listener);
  };
}
 
function saveCart(items: CartItem[]) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  } catch {
    // ignore (e.g. storage full or blocked)
  }
  listeners.forEach((listener) => listener());
}
 
// true in the browser, false on the server and while hydrating.
const subscribeNever = () => () => {};
 
export function CartProvider({ children }: { children: ReactNode }) {
  const items = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  const isReady = useSyncExternalStore(subscribeNever, () => true, () => false);
 
  // Each size is its own product with its own name, so the name identifies a cart line.
  function addToCart(perfume: Perfume) {
    const current = getSnapshot();
    const exists = current.some((item) => item.name === perfume.name);
    saveCart(
      exists
        ? current.map((item) =>
            item.name === perfume.name ? { ...item, quantity: item.quantity + 1 } : item
          )
        : [...current, { ...perfume, quantity: 1 }]
    );
  }
 
  function increase(name: string) {
    saveCart(
      getSnapshot().map((item) =>
        item.name === name ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  }
 
  // Stops at 1. Removing a perfume is done with removeItem.
  function decrease(name: string) {
    saveCart(
      getSnapshot().map((item) =>
        item.name === name && item.quantity > 1
          ? { ...item, quantity: item.quantity - 1 }
          : item
      )
    );
  }
 
  function removeItem(name: string) {
    saveCart(getSnapshot().filter((item) => item.name !== name));
  }
 
  function clearCart() {
    saveCart([]);
  }
 
  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = items.reduce(
    (sum, item) => sum + priceToNumber(item.price) * item.quantity,
    0
  );
 
  return (
    <CartContext.Provider
      value={{
        items,
        isReady,
        totalItems,
        totalPrice,
        addToCart,
        increase,
        decrease,
        removeItem,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}
 
export function useCart() {
  const context = useContext(CartContext);
  if (!context) throw new Error("useCart must be used inside <CartProvider>");
  return context;
}