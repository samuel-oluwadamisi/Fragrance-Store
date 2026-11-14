import Image from "next/image";
import Link from "next/link";
import { getCategoryLabel } from "@/data/categories";
import type { CatalogPerfume } from "@/data/mockData";
import { buildSearchUrl } from "@/data/searchUrl";
import AddToCartButton from "../components/AddToCartButton";
import type { Perfume } from "../components/PerfumeCard";
import PerfumeShelf from "../components/PerfumeShelf";
import {
  ArrowLeftIcon,
  ChatIcon,
  GiftIcon,
  InfoIcon,
  ShareIcon,
  ShieldCheckIcon,
  TruckIcon,
} from "../../../data/icons";

// Hardcoded for now (same text for every perfume). This becomes dynamic later.
const about = [
  "A fragrance made for everyday wear and special occasions alike. Spray on pulse points after a shower for the best result.",
  "Every bottle is checked and carefully packed before it leaves our store, then sent by courier to Lagos and across Nigeria.",
];

const perks = [
  { icon: TruckIcon, title: "Fast Courier", text: "Lagos & Nationwide", highlight: false },
  { icon: ShieldCheckIcon, title: "Checked Stock", text: "Inspected before dispatch", highlight: true },
  { icon: GiftIcon, title: "Gift Ready", text: "Neat, secure packing", highlight: false },
];

type PerfumeDetailPageProps = {
  perfume: CatalogPerfume;
  related: Perfume[];
};

export default function PerfumeDetailPage({ perfume, related }: PerfumeDetailPageProps) {
  const mainCategory = perfume.categories[0];
  const mainCategoryLabel = getCategoryLabel(mainCategory);

  const whatsappMessage = `Hello Demo Perfumery, I would like to inquire about ${perfume.name} (${perfume.price}).`;

  return (
    <div className="mx-auto w-full max-w-[1360px] pb-10 md:px-8 lg:px-16">
      {/* Back + share */}
      <div className="flex items-center justify-between px-4 pb-1 pt-3 md:px-0 md:pt-6">
        <Link
          href={buildSearchUrl({ category: mainCategory })}
          className="flex items-center gap-1.5 rounded-full bg-[#f0f3ff] px-3 py-1.5 font-['Outfit',sans-serif] text-[13px] font-medium text-[#151c27] transition-colors hover:bg-[#e7eefe]"
        >
          <ArrowLeftIcon className="h-4 w-4" />
          {mainCategoryLabel}
        </Link>
        <button
          type="button"
          aria-label="Share this perfume"
          className="flex h-10 w-10 items-center justify-center rounded-full bg-white text-[#151c27] shadow-sm transition-transform hover:bg-[#e7eefe] active:scale-95"
        >
          <ShareIcon className="h-4 w-4" />
        </button>
      </div>

      {/* Picture + details */}
      <section className="flex flex-col gap-6 px-4 pb-6 pt-4 md:grid md:grid-cols-[260px_1fr] md:items-start md:gap-10 md:px-0 md:pt-8 lg:grid-cols-[380px_1fr] lg:gap-16">
        {/* Picture */}
        <div className="mx-auto w-56 md:w-full">
          <div className="relative aspect-[4/5] w-full overflow-hidden rounded-2xl bg-white shadow-[0_16px_36px_-6px_rgba(21,28,39,0.18),0_4px_12px_rgba(21,28,39,0.08)]">
            <Image
              src={perfume.src}
              alt={perfume.name}
              fill
              priority
              sizes="(min-width: 1024px) 380px, (min-width: 768px) 260px, 224px"
              className="object-contain p-6 mix-blend-multiply"
            />
          </div>
        </div>

        {/* Details */}
        <div className="flex flex-col items-center text-center md:items-start md:text-left">
          <div className="flex flex-wrap items-center justify-center gap-2 md:justify-start">
            {perfume.categories.map((category) => (
              <Link
                key={category}
                href={buildSearchUrl({ category })}
                className="rounded-full bg-[#e7eefe] px-3 py-1 font-['Outfit',sans-serif] text-[11px] font-semibold text-[#45464c] transition-colors hover:bg-[#dce2f3]"
              >
                {getCategoryLabel(category)}
              </Link>
            ))}
            <span className="inline-flex items-center gap-1.5 rounded-full bg-[#e7eefe] px-3 py-1 font-['Outfit',sans-serif] text-[11px] font-semibold text-[#151c27]">
              <span className="h-1.5 w-1.5 rounded-full bg-[#fe932c]" />
              In Stock
            </span>
          </div>

          <h1 className="mt-3 px-2 font-['Outfit',sans-serif] text-2xl font-bold tracking-tight text-[#151c27] md:px-0 md:text-3xl lg:text-4xl">
            {perfume.name}
          </h1>

          <p className="mt-1 text-base font-medium text-[#45464c]">{perfume.brand}</p>

          <p className="mt-3 font-['Outfit',sans-serif] text-2xl font-bold tracking-tight text-black md:text-3xl">
            {perfume.price}
          </p>

          {/* Actions */}
          <div className="mt-5 flex w-full flex-col gap-2 md:max-w-md">
            <AddToCartButton
              perfume={perfume}
              label={`Add to Cart — ${perfume.price}`}
              iconClassName="h-5 w-5"
              className="flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-[#004098] font-['Outfit',sans-serif] text-[15px] font-semibold text-white shadow-md transition-all hover:opacity-95 active:scale-[0.99]"
            />

            <a
              href={`https://wa.me/?text=${encodeURIComponent(whatsappMessage)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-white font-['Outfit',sans-serif] text-[15px] font-medium text-[#151c27] shadow-sm transition-colors hover:bg-[#e7eefe] active:scale-[0.99]"
            >
              <ChatIcon className="h-5 w-5" />
              Inquire via WhatsApp
            </a>
            <span className="flex items-center justify-center gap-1.5 text-xs text-[#45464c] md:justify-start">
              <InfoIcon className="h-3.5 w-3.5 shrink-0 text-[#76777d]" />
              Direct chat with the seller about this perfume
            </span>
          </div>

          {/* Perks */}
          <div className="mt-6 grid w-full grid-cols-3 gap-2 rounded-xl bg-[#f0f3ff] p-3 md:max-w-md">
            {perks.map(({ icon: PerkIcon, title, text, highlight }) => (
              <div
                key={title}
                className={`flex flex-col items-center rounded-lg p-1.5 text-center ${
                  highlight ? "bg-white shadow-sm" : ""
                }`}
              >
                <PerkIcon className="mb-1 h-5 w-5 text-black" />
                <span className="font-['Outfit',sans-serif] text-[11px] font-semibold text-[#151c27]">
                  {title}
                </span>
                <span className="mt-0.5 text-[10px] leading-tight text-[#45464c]">{text}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About */}
      <section className="px-4 pb-6 md:px-0 md:pt-4">
        <h2 className="mb-3 font-['Outfit',sans-serif] text-lg font-semibold tracking-tight text-[#151c27] md:text-2xl">
          About this perfume
        </h2>
        <div className="rounded-xl bg-white p-4 shadow-sm md:max-w-3xl md:p-6">
          {about.map((paragraph, index) => (
            <p
              key={index}
              className={
                index === 0
                  ? "text-sm leading-relaxed text-[#151c27] md:text-base"
                  : "mt-3 text-sm leading-relaxed text-[#151c27] md:text-base"
              }
            >
              {paragraph}
            </p>
          ))}
        </div>
      </section>

      {/* You May Also Like */}
      {related.length > 0 && (
        <PerfumeShelf
          id={mainCategory}
          title="You May Also Like"
          subtitle="More scents from the same collection"
          perfumes={related}
        />
      )}
    </div>
  );
}