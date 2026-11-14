"use client";

import { useRouter } from "next/navigation";
import { categories } from "@/data/categories";
import { priceBands } from "@/data/priceBands";
import { buildSearchUrl } from "@/data/searchUrl";
import { ChevronDownIcon } from "../../../data/icons";

type Option = { value: string; label: string };

type FilterSelectProps = {
  id: string;
  label: string;
  value: string;
  options: readonly Option[];
  onChange: (value: string) => void;
};

function FilterSelect({ id, label, value, options, onChange }: FilterSelectProps) {
  return (
    <div className="flex min-w-0 flex-col gap-1.5">
      <label htmlFor={id} className="font-['Outfit',sans-serif] text-[13px] font-medium text-[#45464c]">
        {label}
      </label>
      <div className="relative">
        {/* key={value} resets the dropdown whenever the URL changes (e.g. after Clear filters) */}
        <select
          key={value}
          id={id}
          defaultValue={value}
          onChange={(e) => onChange(e.target.value)}
          className="h-12 w-full cursor-pointer appearance-none rounded-xl border-2 border-[#c6c6cd] bg-white pl-3 pr-9 font-['Outfit',sans-serif] text-sm font-medium text-[#151c27] shadow-sm outline-none transition-colors hover:border-[#004085] focus:border-[#004085] md:pl-4 md:pr-11 md:text-base"
        >
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        <ChevronDownIcon className="pointer-events-none absolute right-3 top-1/2 h-5 w-5 -translate-y-1/2 text-[#004085] md:right-4" />
      </div>
    </div>
  );
}

type SearchFiltersProps = {
  query?: string; // kept when a filter changes
  category?: string;
  price?: string;
};

// Two dropdowns side by side. Each one narrows the results further and keeps the other choices.
export default function SearchFilters({ query = "", category = "", price = "" }: SearchFiltersProps) {
  const router = useRouter();

  function update(changes: { category?: string; price?: string }) {
    router.push(buildSearchUrl({ q: query, category, price, ...changes }), { scroll: false });
  }

  return (
    <div className="grid w-full grid-cols-2 gap-3 lg:w-[28rem] lg:shrink-0">
      <FilterSelect
        id="category"
        label="Pick a category"
        value={category}
        options={categories}
        onChange={(value) => update({ category: value })}
      />
      <FilterSelect
        id="price"
        label="Pick a price"
        value={price}
        options={priceBands}
        onChange={(value) => update({ price: value })}
      />
    </div>
  );
}