"use client";

import Link from "next/link";
import { useId, useRef, useState } from "react";
import { filterPerfumes } from "@/data/mockData";
import { buildSearchUrl } from "@/data/searchUrl";
import { toSlug } from "@/data/slug";
import { CloseIcon, SearchIcon } from "../../../data/icons";

const MAX_SUGGESTIONS = 6;

type SearchBoxProps = {
  initialQuery?: string; // the text already searched (results page)
  category?: string; // active category filter, kept when a new search is submitted
  price?: string; // active price filter, kept when a new search is submitted
  label?: string; // small label above the bar (results page)
  className?: string; // width / alignment from the page
};

export default function SearchBox({
  initialQuery = "",
  category = "",
  price = "",
  label,
  className = "",
}: SearchBoxProps) {
  const inputId = useId();
  const inputRef = useRef<HTMLInputElement>(null);
  const [query, setQuery] = useState(initialQuery);
  const [open, setOpen] = useState(false);

  // Worked out while rendering, so no useEffect is needed.
  // Suggestions respect the filters that are already applied on the results page.
  const text = query.trim();
  const matches = text ? filterPerfumes({ q: text, category, price }) : [];
  const suggestions = matches.slice(0, MAX_SUGGESTIONS);
  const showList = open && text !== "";

  return (
    <div
      className={`relative w-full ${className}`}
      // Close when focus leaves the whole search box (tap outside, Tab away).
      onBlur={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget)) setOpen(false);
      }}
    >
      {/* Pressing Enter or Search still opens the full results page: /search?q=... */}
      <form action="/search" className="flex flex-col gap-1.5">
        {/* Keeps the category and price filters when a new search is submitted */}
        {category && <input type="hidden" name="category" value={category} />}
        {price && <input type="hidden" name="price" value={price} />}

        {label && (
          <label
            htmlFor={inputId}
            className="font-['Outfit',sans-serif] text-[13px] font-medium text-[#45464c]"
          >
            {label}
          </label>
        )}

        <div className="flex h-12 items-center overflow-hidden rounded-xl border-2 border-[#6B2737] bg-white shadow-sm">
          <SearchIcon
            className="ml-3.5 mr-2 h-5 w-5 shrink-0 text-[#6B2737]"
            strokeWidth={2.2}
          />
          <input
            id={inputId}
            ref={inputRef}
            name="q"
            type="search"
            required
            autoComplete="off"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setOpen(true);
            }}
            onFocus={() => setOpen(true)}
            onKeyDown={(e) => {
              if (e.key === "Escape") setOpen(false);
            }}
            placeholder="Search by perfume name or brand"
            aria-label={label ? undefined : "Search perfumes"}
            className="h-full min-w-0 flex-1 border-0 bg-transparent pr-2 text-base text-neutral-800 outline-none placeholder:text-neutral-500 [&::-webkit-search-cancel-button]:hidden"
          />
          {query && (
            <button
              type="button"
              aria-label="Clear search"
              onClick={() => {
                setQuery("");
                inputRef.current?.focus();
              }}
              className="mr-1 flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-[#45464c] transition-colors hover:bg-[#f0f3ff]"
            >
              <CloseIcon className="h-5 w-5" />
            </button>
          )}
          <button
            type="submit"
            className="h-full shrink-0 bg-[#6B2737] px-5 text-base font-semibold text-white transition-colors hover:bg-[#082b54] active:bg-[#072447] md:px-8"
          >
            Search
          </button>
        </div>
      </form>

      {/* Suggestions. Sits outside the bordered bar so overflow-hidden doesn't clip it. */}
      {showList && (
        <ul
          // Keeps the input focused while the list is pressed, so a tap is never lost.
          onMouseDown={(e) => e.preventDefault()}
          className="absolute left-0 right-0 top-full z-30 mt-2 max-h-80 overflow-y-auto rounded-xl border border-[#e5e7eb] bg-white py-1 shadow-lg"
        >
          {suggestions.length > 0 ? (
            suggestions.map((perfume) => (
              <li key={perfume.name}>
                <Link
                  href={`/perfumes/${toSlug(perfume.name)}`}
                  onClick={() => setOpen(false)}
                  className="flex flex-col px-4 py-2.5 transition-colors hover:bg-[#f0f3ff]"
                >
                  <span className="truncate font-['Outfit',sans-serif] text-[15px] font-semibold text-[#151c27]">
                    {perfume.name}
                  </span>
                  <span className="truncate text-sm text-[#45464c]">{perfume.price}</span>
                </Link>
              </li>
            ))
          ) : (
            <li className="px-4 py-3 text-sm text-[#45464c]">No perfumes found</li>
          )}

          {matches.length > MAX_SUGGESTIONS && (
            <li className="border-t border-[#e5e7eb]">
              <Link
                href={buildSearchUrl({ q: text, category, price })}
                onClick={() => setOpen(false)}
                className="block px-4 py-2.5 font-['Outfit',sans-serif] text-sm font-medium text-[#6B2737] transition-colors hover:bg-[#f0f3ff]"
              >
                See all {matches.length} results
              </Link>
            </li>
          )}
        </ul>
      )}
    </div>
  );
}