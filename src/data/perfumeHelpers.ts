import { allPerfumes, type CatalogPerfume } from "@/data/mockData";
import { toSlug } from "@/data/slug";

// .find() gives back ONE perfume (or undefined if the slug matches nothing).
export function getPerfumeBySlug(slug: string): CatalogPerfume | undefined {
  return allPerfumes.find((item) => toSlug(item.name) === slug);
}

// For "You May Also Like": perfumes that share categories, with the same brand ranked a little higher.
export function getRelatedPerfumes(perfume: CatalogPerfume): CatalogPerfume[] {
  return allPerfumes
    .filter((item) => item.name !== perfume.name)
    .map((item) => ({
      item,
      score:
        item.categories.filter((category) => perfume.categories.includes(category)).length * 2 +
        (item.brand === perfume.brand ? 1 : 0),
    }))
    .filter(({ score }) => score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, 4)
    .map(({ item }) => item);
}