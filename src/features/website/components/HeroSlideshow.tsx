"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { getCategoryLabel } from "@/data/categories";
import type { CatalogPerfume } from "@/data/mockData";
import { toSlug } from "@/data/slug";
import { ChevronLeftIcon, ChevronRightIcon } from "../../../data/icons";

const AUTOPLAY_MS = 5000;
const SWIPE_PX = 50;

type HeroSlideshowProps = {
  slides: CatalogPerfume[]; // the 4 featured perfumes
};

export default function HeroSlideshow({ slides }: HeroSlideshowProps) {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const touchStartX = useRef<number | null>(null);
  const count = slides.length;

  // Auto-advance. Stops while the mouse is over the hero or focus is inside it,
  // and never runs for people who asked their device to reduce motion.
  // `index` is a dependency so tapping an arrow or dot restarts the timer.
  useEffect(() => {
    if (paused || count < 2) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const timer = setInterval(() => setIndex((i) => (i + 1) % count), AUTOPLAY_MS);
    return () => clearInterval(timer);
  }, [paused, count, index]);

  if (count === 0) return null;

  const go = (next: number) => setIndex((next + count) % count);

  return (
    <section
      aria-roledescription="carousel"
      aria-label="Featured perfumes"
      className="px-4 py-2 md:px-0 md:py-4"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
      onTouchStart={(e) => {
        touchStartX.current = e.touches[0].clientX;
      }}
      onTouchEnd={(e) => {
        if (touchStartX.current === null) return;
        const distance = e.changedTouches[0].clientX - touchStartX.current;
        touchStartX.current = null;
        if (Math.abs(distance) > SWIPE_PX) go(index + (distance < 0 ? 1 : -1));
      }}
    >
      <div className="relative overflow-hidden rounded-2xl border border-slate-100/80 bg-gradient-to-br from-blue-50/80 via-white to-slate-50 shadow-sm">
        {/* All slides share one grid cell, so the hero is as tall as the tallest slide and never jumps */}
        <div className="grid" aria-live={paused ? "polite" : "off"}>
          {slides.map((perfume, i) => {
            const active = i === index;
            return (
              <article
                key={perfume.name}
                role="group"
                aria-roledescription="slide"
                aria-label={`${i + 1} of ${count}`}
                aria-hidden={!active}
                className={`col-start-1 row-start-1 grid items-center gap-4 p-6 pb-20 transition-[opacity,visibility] duration-500 md:grid-cols-2 md:gap-8 md:p-12 md:pb-20 lg:p-16 lg:pb-24 ${
                  active ? "visible opacity-100" : "invisible opacity-0"
                }`}
              >
                {/* Text: left on desktop, under the bottle on mobile */}
                <div className="flex flex-col items-center gap-2 text-center md:items-start md:text-left">
                  <span className="rounded-full bg-[#e7eefe] px-3 py-1 font-['Outfit',sans-serif] text-xs font-semibold text-[#45464c]">
                    {getCategoryLabel(perfume.categories[0])}
                  </span>
                  <h2 className="pt-1 font-['Outfit',sans-serif] text-2xl font-bold tracking-tight text-[#151c27] md:text-4xl lg:text-5xl">
                    {perfume.name}
                  </h2>
                  <p className="font-['Outfit',sans-serif] text-xl font-semibold text-[#004098] md:text-2xl">
                    {perfume.price}
                  </p>
                  <Link
                    href={`/perfumes/${toSlug(perfume.name)}`}
                    className="mt-3 inline-flex items-center gap-2 rounded-xl bg-[#004098] px-5 py-2.5 font-['Outfit',sans-serif] text-[13px] font-medium text-white shadow-sm transition-all hover:opacity-95 active:scale-95 md:px-7 md:py-3 md:text-[15px]"
                  >
                    Shop now
                    <ChevronRightIcon className="h-[18px] w-[18px]" />
                  </Link>
                </div>

                {/* Picture: first on mobile, right on desktop */}
                <div className="relative order-first mx-auto aspect-square w-48 sm:w-60 md:order-last md:w-full md:max-w-sm">
                  <div
                    aria-hidden="true"
                    className="absolute inset-4 rounded-full bg-blue-100/50 blur-2xl"
                  />
                  <Image
                    src={perfume.src}
                    alt={perfume.name}
                    fill
                    priority={i === 0}
                    sizes="(min-width: 768px) 384px, 240px"
                    className="object-contain mix-blend-multiply"
                  />
                </div>
              </article>
            );
          })}
        </div>

        {/* Controls */}
        <div className="absolute inset-x-0 bottom-3 flex items-center justify-between px-4 md:bottom-5 md:px-12 lg:px-16">
          <div className="flex items-center">
            {slides.map((perfume, i) => (
              <button
                key={perfume.name}
                type="button"
                aria-label={`Show ${perfume.name}`}
                aria-current={i === index}
                onClick={() => go(i)}
                className="flex h-8 w-6 items-center justify-center"
              >
                <span
                  className={`h-2 rounded-full transition-all ${
                    i === index ? "w-6 bg-[#004098]" : "w-2 bg-[#004098]/25"
                  }`}
                />
              </button>
            ))}
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              aria-label="Previous perfume"
              onClick={() => go(index - 1)}
              className="flex h-10 w-10 items-center justify-center rounded-full bg-white text-[#151c27] shadow-sm transition-colors hover:bg-[#e7eefe] active:scale-95"
            >
              <ChevronLeftIcon className="h-5 w-5" />
            </button>
            <button
              type="button"
              aria-label="Next perfume"
              onClick={() => go(index + 1)}
              className="flex h-10 w-10 items-center justify-center rounded-full bg-white text-[#151c27] shadow-sm transition-colors hover:bg-[#e7eefe] active:scale-95"
            >
              <ChevronRightIcon className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}