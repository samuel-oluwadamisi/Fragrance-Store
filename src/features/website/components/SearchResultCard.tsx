import Image from "next/image";
import Link from "next/link";
import { toSlug } from "@/data/slug";
import AddToCartButton from "./AddToCartButton";
import type { Perfume } from "./PerfumeCard";

export default function SearchResultCard({ name, brand, price, src }: Perfume) {
  return (
    <article className="flex flex-col gap-3 rounded-2xl border border-[#e5e7eb] bg-white p-2.5 transition-shadow hover:shadow-[0_8px_24px_-4px_rgba(17,24,39,0.08)] md:p-3">
      {/* Picture and name open the perfume page */}
      <Link href={`/perfumes/${toSlug(name)}`} className="group flex flex-1 flex-col gap-3">
        <div className="relative aspect-[4/5] w-full overflow-hidden rounded-md bg-[#f3f4f6] ring-1 ring-black/5">
          <Image
            src={src}
            alt={name}
            fill
            sizes="(min-width: 1024px) 25vw, (min-width: 768px) 33vw, 50vw"
            className="object-contain p-3 mix-blend-multiply"
          />
        </div>

        <h2 className="line-clamp-2 min-h-10 px-0.5 font-['Outfit',sans-serif] text-base font-semibold leading-5 text-[#151c27] group-hover:underline md:min-h-12 md:text-lg md:leading-6">
          {name}
        </h2>
      </Link>

      {/* Add to Cart is NOT inside the link */}
      <div className="flex flex-col gap-2 px-0.5 pb-0.5">
        <span className="font-['Outfit',sans-serif] text-lg font-semibold text-[#151c27]">
          {price}
        </span>
        <AddToCartButton
          perfume={{ name, brand, price, src }}
          className="flex h-10 w-full items-center justify-center gap-1.5 rounded-lg bg-[#004098] font-['Outfit',sans-serif] text-sm font-semibold text-white transition-colors hover:bg-[#082b54] active:bg-[#072447] md:h-11"
        />
      </div>
    </article>
  );
}