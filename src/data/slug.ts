// "Lattafa Out 100ml" -> "lattafa-out-100ml"
export function toSlug(title: string) {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}