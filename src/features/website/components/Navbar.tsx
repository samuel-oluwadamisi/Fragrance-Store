import Link from "next/link";
import CartLink from "./CartLink";
import { PerfumeBottleIcon, SearchIcon, UserIcon } from "../../../data/icons";
import { categories } from "@/data/categories";
import { buildSearchUrl } from "@/data/searchUrl";

// Same six categories as the search dropdown (the "All" entry has no value, so it is skipped).
const navLinks = categories
  .filter((item) => item.value !== "")
  .map((item) => ({ label: item.label, href: buildSearchUrl({ category: item.value }) }));

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 bg-[#f9f9ff]/85 shadow-[0_1px_8px_rgba(0,0,0,0.03)] backdrop-blur-xl">
      <div className="mx-auto flex h-16 w-full max-w-[1360px] items-center justify-between gap-2 px-4 md:px-8 lg:px-16">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <PerfumeBottleIcon className="h-[22px] w-[22px] text-black" />
          <span className="font-['Outfit',sans-serif] text-lg font-semibold leading-none tracking-tight text-[#151c27]">
            Fragrance Store
          </span>
        </Link>

        {/* Desktop links */}
        <nav className="hidden items-center gap-5 lg:flex xl:gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="whitespace-nowrap font-['Outfit',sans-serif] text-sm font-medium text-[#45464c] transition-colors hover:text-black xl:text-[15px]"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Actions */}
        <div className="flex items-center gap-1">
          <Link
            href="/search"
            aria-label="Search"
            className="flex h-11 w-11 items-center justify-center rounded-full text-[#151c27] transition-colors hover:text-black"
          >
            <SearchIcon className="h-5 w-5" />
          </Link>

          <CartLink />

          <a
            href="#"
            aria-label="Account"
            className="ml-1 flex h-8 w-8 items-center justify-center rounded-full bg-black text-white"
          >
            <UserIcon className="h-[18px] w-[18px]" />
          </a>
        </div>
      </div>
    </header>
  );
}