import Link from "next/link";
import { getCategoryLabel } from "@/data/categories";
import type { CatalogPerfume } from "@/data/mockData";
import { getPriceBand } from "@/data/priceBands";
import { buildSearchUrl } from "@/data/searchUrl";
import ResultsGrid from "../components/ResultGrid";
import SearchFilters from "../components/SearchFilters";
import { PerfumeBottleIcon } from "../../../data/icons";
import SearchBox from "../components/SearchBox";

type SearchResultsPageProps = {
  query?: string; // what is in the search box (name or brand)
  category?: string; // category value, e.g. "special-combos" ("" = All)
  price?: string; // price band value, e.g. "50k-100k" ("" = All)
  perfumes: CatalogPerfume[]; // every perfume that matched the search AND both filters
  total: number; // how many matched in total
};

export default function SearchResultsPage({
  query = "",
  category = "",
  price = "",
  perfumes,
  total,
}: SearchResultsPageProps) {
  const hasFilters = Boolean(category || price);

  // The heading lists everything that is applied, e.g. "Special Combos · ₦50k–₦100k".
  const headingParts = [
    query ? `Results for “${query}”` : "",
    category ? getCategoryLabel(category) : "",
    price ? getPriceBand(price)?.label ?? "" : "",
  ].filter(Boolean);
  const heading = headingParts.length > 0 ? headingParts.join(" · ") : "All Perfumes";

  return (
    <div className="mx-auto w-full max-w-[1360px] px-4 pb-10 pt-4 md:px-8 md:pt-8 lg:px-16">
      <div className="flex flex-col gap-6 md:gap-8">
        {/* Search + the two dropdowns */}
        <section className="flex flex-col gap-4 lg:flex-row lg:items-end lg:gap-6">
          {/* key={query} resets the box when the URL's search changes */}
          <SearchBox
            key={query}
            initialQuery={query}
            category={category}
            price={price}
            label="Search for a perfume or brand"
            className="flex-1"
          />

          <SearchFilters query={query} category={category} price={price} />
        </section>

        {/* What you're looking at */}
        <section className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
          <h1 className="break-words font-['Outfit',sans-serif] text-2xl font-semibold tracking-tight text-[#151c27] md:text-3xl">
            {heading}
          </h1>
          <span aria-live="polite" className="text-sm text-[#45464c]">
            {total} {total === 1 ? "perfume" : "perfumes"} found
          </span>
        </section>

        {/* Results */}
        {perfumes.length > 0 ? (
          // The key makes "Load more" start over whenever the search or a filter changes.
          <ResultsGrid key={`${query}|${category}|${price}`} perfumes={perfumes} />
        ) : (
          <section className="flex flex-col items-center gap-3 rounded-2xl border border-[#e5e7eb] bg-white px-6 py-14 text-center">
            <PerfumeBottleIcon className="h-14 w-14 text-[#004098]/30" strokeWidth={1.2} />
            <h2 className="font-['Outfit',sans-serif] text-xl font-semibold text-[#151c27]">
              No perfumes found
            </h2>
            <p className="max-w-xs text-sm text-[#45464c]">
              {hasFilters
                ? "Nothing matches this category and price. Clear the filters to see more."
                : "Try a different name or brand."}
            </p>
            {/* Clearing keeps the typed search, so the person never ends up stuck */}
            <Link
              href={buildSearchUrl({ q: hasFilters ? query : "" })}
              className="mt-2 inline-flex h-12 items-center justify-center rounded-xl bg-[#004098] px-8 font-['Outfit',sans-serif] text-[15px] font-semibold text-white transition-opacity hover:opacity-95"
            >
              {hasFilters ? "Clear filters" : "View all perfumes"}
            </Link>
          </section>
        )}
      </div>
    </div>
  );
}