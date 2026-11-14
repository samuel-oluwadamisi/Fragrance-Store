import type { Perfume } from "@/features/website/components/PerfumeCard";
import type { Category } from "@/data/categories";
import { formatPrice, priceToNumber } from "@/data/price";
import { getPriceBand, isInPriceBand } from "@/data/priceBands";

export type { Category };

// A perfume can sit in several categories (e.g. Men AND Best Sellers).
// Put the main one first: the product page's "back" link uses it.
export type CatalogPerfume = Perfume & { categories: Category[] };

// Swap for real photos when they arrive, e.g. "/images/lattafa-out-100.jpeg".
const PLACEHOLDER = "/images/perfume-placeholder.svg";

function perfume(
  name: string,
  brand: string,
  amount: number,
  categories: Category[],
  src: string = PLACEHOLDER
): CatalogPerfume {
  return { name, brand, price: formatPrice(amount), src, categories };
}

// THE DATABASE: one array, every perfume in one place. Demo data: replace with the client's catalogue.
// Every size is its own product with its own unique name (name is also what the cart and the URL use).
// Order here is the order shown on shelves and in search results.
export const allPerfumes: CatalogPerfume[] = [
  perfume("Lattafa Oud 100ml", "Lattafa", 45000, ["best-sellers", "men"], "/images/latafa-oud-100.jpeg"),
  perfume("Lattafa Yara 100ml", "Lattafa", 42000, ["best-sellers", "women"], "/images/latafa-yara-100.jpeg"),
  perfume("Lattafa Khamrah 100ml", "Lattafa", 58000, ["best-sellers", "unisex"], "/images/latafa-Khamrah-100.jpeg"),
  perfume("Armaf Club de Nuit Intense Man 105ml", "Armaf", 52000, ["best-sellers", "men"], "/images/armaf-club-de-nuit-100.jpeg" ),

  perfume("Lattafa Asad 100", "Lattafa", 38000, ["new-arrivals", "men"], "/images/latafa-asad-100.jpeg"),
  perfume("Lattafa Fakhar Rose 100", "Lattafa", 40000, ["new-arrivals", "women"], "/images/latafa-fakhar-rose-100.jpeg"),
  perfume("Afnan 9PM 100", "Afnan", 48000, ["new-arrivals", "men"], "/images/afnan-9pm-100.jpeg"),
  perfume("Rasasi Hawas 100", "Rasasi", 62000, ["new-arrivals", "men"], "/images/rasasi-hawas-100.jpeg"),

  perfume("Lattafa Oud 50ml", "Lattafa", 28000, ["best-sellers", "men"], "/images/latafa-oud-100.jpeg"),
  perfume("Lattafa Out 30ml", "Lattafa", 18000, ["best-sellers", "men"], "/images/latafa-out-100.jpeg"),
  perfume("Lattafa Yara 30ml", "Lattafa", 19000, ["women"], "/images/latafa-yara-100.jpeg"),
  perfume("Lattafa Khamrah 30ml", "Lattafa", 20000, ["unisex"], "/images/latafa-Khamrah-100.jpeg"),

  perfume("Armaf Club de Nuit Woman 105ml", "Armaf", 55000, ["women"], "/images/armaf-club-de-nuit-woman-100.jpeg"),
  perfume("Lancome La Vie Est Belle 100", "Lancome", 170000, ["best-sellers", "women"], "/images/lancome-la-vie-est-belle-100.jpeg"),
  perfume("YSL Libre EDP 90ml", "Yves Saint Laurent", 210000, ["women"], "/images/ysl-libre-edp-90ml.jpeg"),
  perfume("Chanel Coco Mademoiselle 100", "Chanel", 285000, ["women"], "/images/chanel-coco-mademoiselle-100.jpeg"),

  perfume("Dior Sauvage EDT 100", "Dior", 165000, ["men"], "/images/dior-sauvage-edt-100.jpeg"),
  perfume("Paco Rabanne 1 Million 100", "Paco Rabanne", 125000, ["men"], "/images/paco-rabanne-1-million-100.jpeg"),
  perfume("Versace Eros 100", "Versace", 110000, ["men"], "/images/versace-eros-100.jpeg"),

  perfume("Tom Ford Oud Wood 50ml", "Tom Ford", 245000, ["unisex"], "/images/tom-ford-oud-wood-100.jpeg"),
  perfume("Baccarat Rouge 540 70ml", "Maison Francis Kurkdjian", 330000, ["unisex"], "/images/baccarat-rouge-540-70.jpeg"),

  perfume("Mini Discovery Set (5 x 10ml)", "Demo Perfumery", 25000, ["special-combos", "new-arrivals"], "/images/mini-discovery-set.jpeg"),
  perfume("Lattafa Oud + Asad Duo Set", "Lattafa", 65000, ["special-combos", "men"], "/images/lattafa-oud-asad-duo-set.jpeg"),
  perfume("Couples Pair: Yara + Out 100", "Lattafa", 78000, ["special-combos", "best-sellers"], "/images/yara-oud-duo-100.jpeg"),
  perfume("Men's Signature Trio Gift Set", "Demo Perfumery", 85000, ["special-combos", "men"], "/images/men-signature-trio-gift-set.jpeg"),
  perfume("Her Luxury Gift Combo", "Demo Perfumery", 120000, ["special-combos", "women"], "/images/her-luxury-gift-combo.jpeg"),
  perfume("Oud Collection Premium Set", "Demo Perfumery", 230000, ["special-combos", "unisex"], "/images/demo-oud-collection-premium-set.jpeg"),
];

// Perfumes in one category (used by "See all" and the home page shelves).
export function getPerfumesByCategory(category: string): CatalogPerfume[] {
  return allPerfumes.filter((item) => item.categories.includes(category as Category));
}

export type SearchFilters = {
  q?: string; // text typed in the search box
  category?: string; // category value, "" = All
  price?: string; // price band value, "" = All
};

// Every filter narrows the results further. The text search needs EVERY word to appear in the
// name or brand ("out lattafa" and "lattafa out" both find Lattafa Out). Empty filters match everything.
export function filterPerfumes({ q = "", category = "", price = "" }: SearchFilters = {}): CatalogPerfume[] {
  const words = q.trim().toLowerCase().split(/\s+/).filter(Boolean);
  const band = getPriceBand(price);

  return allPerfumes.filter((item) => {
    if (category && !item.categories.includes(category as Category)) return false;
    if (band && !isInPriceBand(priceToNumber(item.price), band)) return false;
    const text = `${item.name} ${item.brand}`.toLowerCase();
    return words.every((word) => text.includes(word));
  });
}

// Home page shelves show a taste of each category; "See all" opens the full list.
export const SHELF_SIZE = 4;
export const bestSellers = getPerfumesByCategory("best-sellers").slice(0, SHELF_SIZE);
export const newArrivals = getPerfumesByCategory("new-arrivals").slice(0, SHELF_SIZE);
export const men = getPerfumesByCategory("men").slice(0, SHELF_SIZE);
export const women = getPerfumesByCategory("women").slice(0, SHELF_SIZE);
export const unisex = getPerfumesByCategory("unisex").slice(0, SHELF_SIZE);
export const specialCombos = getPerfumesByCategory("special-combos").slice(0, SHELF_SIZE);

// The 4 slides in the home page hero. Names must match a product in allPerfumes.
const HERO_NAMES = [
  "Lattafa Oud 100ml",
  "Lattafa Yara 100ml",
  "Lattafa Khamrah 100ml",
  "Armaf Club de Nuit Intense Man 105ml",
];
export const heroPerfumes = HERO_NAMES.flatMap((name) =>
  allPerfumes.filter((item) => item.name === name)
);