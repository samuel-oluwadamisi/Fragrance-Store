import { Suspense } from "react";
import SearchResultsPage from "@/features/website/pages/SearchResultPage";
import { isCategory } from "@/data/categories";
import { filterPerfumes } from "@/data/mockData";
import { getPriceBand } from "@/data/priceBands";

type SearchParams = Promise<{ q?: string; category?: string; price?: string }>;

// Reads the URL. This is the part that waits for the request, so it sits inside <Suspense>.
async function Results({ searchParams }: { searchParams: SearchParams }) {
  // /search?q=out&category=special-combos&price=50k-100k  (any of the three can be missing)
  const { q = "", category: rawCategory = "", price: rawPrice = "" } = await searchParams;

  // A made-up ?category=xyz or ?price=abc is treated as "All" instead of showing nothing.
  const category = isCategory(rawCategory) ? rawCategory : "";
  const price = getPriceBand(rawPrice) ? rawPrice : "";

  const results = filterPerfumes({ q, category, price });

  return (
    <SearchResultsPage
      query={q}
      category={category}
      price={price}
      perfumes={results}
      total={results.length}
    />
  );
}

export default function SearchPage({ searchParams }: { searchParams: SearchParams }) {
  return (
    <Suspense
      fallback={
        <p className="px-4 py-20 text-center text-sm text-[#45464c]">Finding perfumes…</p>
      }
    >
      <Results searchParams={searchParams} />
    </Suspense>
  );
}