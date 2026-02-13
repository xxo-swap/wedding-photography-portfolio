import Hero from "@/components/hero/Hero";
import Gallery from "@/components/gallery/Gallery";
import FeaturedText from "@/components/feature/FeaturedText"
import FeaturedWedding from "@/components/feature/FeaturedCouple"
import FeaturedSection from "@/components/feature/FeaturedSection";
import TestimonialSection from "@/components/testimonial/TestimonialSection";
import ScrollPathSection from "@/components/ScrollPathSection";
import Hero1 from "@/components/hero/Hero1";
import { FeaturedWeddingCouples, TestimonialCouples } from "@/src/data/weddings";

export default function Home() {



  return (
    <>
      <Hero />
      <Hero1 />
      <ScrollPathSection />
      <FeaturedSection FeaturedWeddingCouples={FeaturedWeddingCouples} />
      <TestimonialSection TestimonialCouples={TestimonialCouples} />
    </>

  );
}
