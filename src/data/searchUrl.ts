type SearchParams = { q?: string; category?: string; price?: string };

// One place that builds /search links, so the text search, category and price always travel together.
export function buildSearchUrl({ q, category, price }: SearchParams = {}) {
  const params = new URLSearchParams();
  if (q) params.set("q", q);
  if (category) params.set("category", category);
  if (price) params.set("price", price);
  const query = params.toString();
  return query ? `/search?${query}` : "/search";
}