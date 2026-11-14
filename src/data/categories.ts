// "value" is what goes in the URL (?category=men).
// The Category type below is built from this list, so adding a category here is all it takes.
export const categories = [
  { value: "", label: "All" },
  { value: "best-sellers", label: "Best Sellers" },
  { value: "new-arrivals", label: "New Arrivals" },
  { value: "men", label: "Men" },
  { value: "women", label: "Women" },
  { value: "unisex", label: "Unisex" },
  { value: "special-combos", label: "Special Combos" },
] as const;

export type Category = Exclude<(typeof categories)[number]["value"], "">;

// True only for a real category value (so a made-up ?category=xyz is ignored).
export function isCategory(value: string): value is Category {
  return categories.some((item) => item.value !== "" && item.value === value);
}

export function getCategoryLabel(value: string): string {
  return categories.find((item) => item.value === value)?.label ?? "Perfumes";
}