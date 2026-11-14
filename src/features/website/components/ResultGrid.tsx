"use client";

import { useState } from "react";
import type { CatalogPerfume } from "@/data/mockData";
import SearchResultCard from "./SearchResultCard";

// 12 divides evenly into the 2, 3 and 4 column layouts, so the last row is never half empty.
const PAGE_SIZE = 12;

type ResultsGridProps = {
  perfumes: CatalogPerfume[]; // everything that matched; this component decides how many to show
};

// The page gives this a `key` made from the search + filters, so "Load more" starts over
// at the first 12 whenever the search or a filter changes.
export default function ResultsGrid({ perfumes }: ResultsGridProps) {
  const [visible, setVisible] = useState(PAGE_SIZE);
  const shown = perfumes.slice(0, visible);

  return (
    <>
      <section
        aria-label="Perfume search results"
        className="grid grid-cols-2 gap-3 md:grid-cols-3 md:gap-6 lg:grid-cols-4"
      >
        {shown.map((perfume) => (
          <SearchResultCard
            key={perfume.name}
            name={perfume.name}
            brand={perfume.brand}
            price={perfume.price}
            src={perfume.src}
          />
        ))}
      </section>

      {shown.length < perfumes.length && (
        <div className="flex flex-col items-center gap-3">
          <p className="text-sm text-[#45464c]">
            Showing {shown.length} of {perfumes.length}
          </p>
          <button
            type="button"
            onClick={() => setVisible((count) => count + PAGE_SIZE)}
            className="inline-flex h-12 items-center justify-center rounded-xl bg-[#004098] px-10 font-['Outfit',sans-serif] text-[15px] font-semibold text-white shadow-sm transition-all hover:opacity-95 active:scale-[0.99]"
          >
            Load more
          </button>
        </div>
      )}
    </>
  );
}