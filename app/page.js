import Hero from "@/components/hero/Hero";
import Gallery from "@/components/gallery/Gallery";
import FeaturedText from "@/components/feature/FeaturedText"
import FeaturedWedding from "@/components/feature/FeaturedCouple"
import FeaturedSection from "@/components/feature/FeaturedSection";
import TestimonialSection from "@/components/testimonial/TestimonialSection";
import ScrollPathSection from "@/components/ScrollPathSection";
import Hero1 from "@/components/hero/Hero1";
import { weddings } from "@/src/data/weddings";
import HeroTransition from "@/components/HeroTransition";

export default function Home() {

  const featuredWeddings = weddings.filter(w => w.featured);
  const testimonials = weddings.filter(w => w.testimonial);

  return (
    <>
    <Hero1 />
    <HeroTransition/>
    <Hero />
    <HeroTransition/>
      
      <ScrollPathSection />
      <FeaturedSection couples={featuredWeddings} />
      <TestimonialSection TestimonialCouples={testimonials} />
    </>
  );
}
