import Image from "next/image";
import FeaturedText from "./FeaturedText";
import FeaturedCouple from "./FeaturedCouple";

export default function FeaturedSection({ FeaturedWeddingCouples }) {


  return (
    <section className="w-full">
      <div className="max-w-[1440px] mx-auto " >
        <FeaturedText />
        {
            FeaturedWeddingCouples.map((couple, index) => (
                <FeaturedCouple key={index} couple={couple} />
            ))
        }
    </div>
    </section>
  );
}
