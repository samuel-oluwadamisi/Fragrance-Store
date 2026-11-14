import Link from "next/link";
import PerfumeCard, { type Perfume } from "./PerfumeCard";
import { ChevronRightIcon } from "../../../data/icons";
import { buildSearchUrl } from "@/data/searchUrl";

type PerfumeShelfProps = {
  id?: string; // also the category value: best-sellers, new-arrivals, men, women, unisex, special-combos
  title: string;
  subtitle: string;
  perfumes: Perfume[];
};

export default function PerfumeShelf({ id, title, subtitle, perfumes }: PerfumeShelfProps) {
  return (
    <section id={id} className="scroll-mt-20 py-4 md:py-6">
      <div className="mb-1 flex items-center justify-between gap-2 px-4 md:mb-4 md:px-0">
        <div className="min-w-0 flex-1">
          <h3 className="font-['Outfit',sans-serif] text-lg font-semibold tracking-tight text-[#151c27] md:text-2xl">
            {title}
          </h3>
          <p className="text-xs text-[#45464c] md:text-sm">{subtitle}</p>
        </div>
        <Link
          href={buildSearchUrl({ category: id })}
          className="inline-flex min-h-11 shrink-0 items-center justify-center gap-0.5 whitespace-nowrap rounded-md px-2 font-['Outfit',sans-serif] text-[13px] font-medium text-[#45464c] transition-colors hover:text-black focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#004085] md:min-h-0 md:px-0 md:text-[15px]"
        >
          See all
          <ChevronRightIcon className="h-4 w-4" />
        </Link>
      </div>

      {/* Mobile: horizontal slider. Tablet/desktop: 4-column grid */}
      <div className="flex snap-x scroll-pl-4 gap-4 overflow-x-auto px-4 py-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden md:grid md:snap-none md:grid-cols-4 md:gap-6 md:overflow-visible md:px-0 lg:gap-8">
        {perfumes.map((perfume) => (
          <PerfumeCard key={perfume.name} {...perfume} />
        ))}
      </div>
    </section>
  );
}