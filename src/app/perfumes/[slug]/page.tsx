import { Suspense } from "react";
import { notFound } from "next/navigation";
import PerfumeDetailPage from "@/features/website/pages/PerfumeDetailsPage";
import { getPerfumeBySlug, getRelatedPerfumes } from "@/data/perfumeHelpers";

type Params = Promise<{ slug: string }>;

// Reads the URL (/perfumes/lattafa-out-100ml), so it sits inside <Suspense>.
async function PerfumeLoader({ params }: { params: Params }) {
  const { slug } = await params;
  console.log("slug from URL:", slug);
console.log("perfume found:", getPerfumeBySlug(slug)?.name);

  const perfume = getPerfumeBySlug(slug);
  if (!perfume) notFound();

  return <PerfumeDetailPage perfume={perfume} related={getRelatedPerfumes(perfume)} />;
}

export default function PerfumePage({ params }: { params: Params }) {
  return (
    <Suspense
      fallback={
        <p className="px-4 py-20 text-center text-sm text-[#45464c]">Opening perfume…</p>
      }
    >
      <PerfumeLoader params={params} />
    </Suspense>
  );
}