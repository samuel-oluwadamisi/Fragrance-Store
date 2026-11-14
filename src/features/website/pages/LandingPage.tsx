import PerfumeShelf from "../components/PerfumeShelf";
import HeroSlideshow from "../components/HeroSlideshow";
import SearchBox from "../components/SearchBox";
import {
  heroPerfumes,
  bestSellers,
  newArrivals,
  men,
  women,
  unisex,
  specialCombos,
} from "@/data/mockData";

// "id" is also the category value, so "See all" opens /search?category=<id>.
const shelves = [
  { id: "best-sellers", title: "Best Sellers", subtitle: "The fragrances our customers keep coming back for", perfumes: bestSellers },
  { id: "new-arrivals", title: "New Arrivals", subtitle: "Fresh scents, just landed in store", perfumes: newArrivals },
  { id: "men", title: "Men", subtitle: "Bold, woody and fresh signatures", perfumes: men },
  { id: "women", title: "Women", subtitle: "Floral, sweet and elegant fragrances", perfumes: women },
  { id: "unisex", title: "Unisex", subtitle: "Scents made to be shared", perfumes: unisex },
  { id: "special-combos", title: "Special Combos", subtitle: "Gift sets and bundles, ready to give", perfumes: specialCombos },
];

export default function LandingPage() {
  return (
    <div className="mx-auto w-full max-w-[1360px] md:px-8 lg:px-16">
      <h1 className="sr-only">Demo Perfumery</h1>

      {/* Search bar: suggestions while typing, Enter or Search opens /search?q=... */}
      <section className="px-4 pb-1 pt-2 md:px-0 md:pb-2 md:pt-6">
        <SearchBox className="mx-auto max-w-3xl" />
      </section>

      {/* Hero: 4 featured perfumes */}
      <HeroSlideshow slides={heroPerfumes} />

      {/* Shelves */}
      <div className="pt-2 md:pt-6">
        {shelves.map((shelf) => (
          <PerfumeShelf
            key={shelf.id}
            id={shelf.id}
            title={shelf.title}
            subtitle={shelf.subtitle}
            perfumes={shelf.perfumes}
          />
        ))}
      </div>
    </div>
  );
}