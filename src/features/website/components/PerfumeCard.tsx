import Image from "next/image";
import Link from "next/link";
import { toSlug } from "@/data/slug";
import AddToCartButton from "./AddToCartButton";

export type Perfume = {
  name: string; // unique, includes the size: "Lattafa Out 100ml"
  brand: string;
  price: string;
  src: string;
};

export default function PerfumeCard({ name, brand, price, src }: Perfume) {
  return (
    <article className="flex w-36 shrink-0 snap-start flex-col gap-2 md:w-auto">
      {/* Picture, name and price open the perfume page */}
      <Link href={`/perfumes/${toSlug(name)}`} className="group flex flex-col gap-2">
        <div className="relative aspect-[4/5] w-full overflow-hidden rounded-lg bg-[#dce2f3] shadow-sm transition-shadow md:group-hover:shadow-[0_8px_24px_-4px_rgba(17,24,39,0.12)]">
          <Image
            src={src}
            alt={name}
            fill
            sizes="(min-width: 768px) 25vw, 144px"
            className="object-contain p-3 mix-blend-multiply"
          />
        </div>

        <div className="flex flex-col gap-1">
          <h4 className="line-clamp-2 min-h-10 font-['Outfit',sans-serif] text-[15px] font-semibold leading-5 text-[#151c27] group-hover:underline md:min-h-12 md:text-lg md:leading-6">
            {name}
          </h4>
          <span className="font-['Outfit',sans-serif] text-[13px] font-semibold text-[#151c27] md:text-[15px]">
            {price}
          </span>
        </div>
      </Link>

      {/* Add to Cart is NOT inside the link, so it works without opening the perfume */}
      <AddToCartButton
        perfume={{ name, brand, price, src }}
        className="flex h-8 w-full items-center justify-center gap-1 rounded-lg bg-[#004085] font-['Outfit',sans-serif] text-[11px] font-semibold text-white transition-colors hover:bg-[#082b54] active:bg-[#072447] md:h-10 md:gap-2 md:text-sm"
      />
    </article>
  );
}