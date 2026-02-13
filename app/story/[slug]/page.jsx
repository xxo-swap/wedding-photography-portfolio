import Gallery from "@/components/gallery/Gallery";
import { weddings } from "@/src/data/weddings";
import { notFound } from "next/navigation";


export async function generateStaticParams() {
  return weddings.map(w => ({
    slug : w.slug
  }));
}

export default function WeddingStory({ params }) {

  const wedding = weddings.find(
    w => w.slug === params.slug
  );

  if (!wedding) return notFound();

  return (
    <section className="p-10">
      <Gallery wedding={wedding} />
    </section>
  );
}
