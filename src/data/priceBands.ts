export type PriceBand = {
  value: string; // goes in the URL (?price=30k-50k)
  label: string;
  min: number; // included
  max: number; // NOT included, so a ₦50,000 item belongs to exactly one band
};

export const priceBands: PriceBand[] = [
  { value: "", label: "All", min: 0, max: Infinity },
  { value: "under-30k", label: "Under ₦30k", min: 0, max: 30_000 },
  { value: "30k-50k", label: "₦30k–₦50k", min: 30_000, max: 50_000 },
  { value: "50k-100k", label: "₦50k–₦100k", min: 50_000, max: 100_000 },
  { value: "100k-200k", label: "₦100k–₦200k", min: 100_000, max: 200_000 },
  { value: "200k-above", label: "₦200k and above", min: 200_000, max: Infinity },
];

// Returns the band for a URL value, or undefined for "" / unknown values.
export function getPriceBand(value: string): PriceBand | undefined {
  return priceBands.find((band) => band.value !== "" && band.value === value);
}

export function isInPriceBand(amount: number, band: PriceBand): boolean {
  return amount >= band.min && amount < band.max;
}