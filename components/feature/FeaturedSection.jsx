import FeaturedText from "./FeaturedText";
import FeaturedCouple from "./FeaturedCouple";

export default function FeaturedSection({ couples }) {
  return (
    <section className="w-full">
      <div className="max-w-[1440px] mx-auto">
        <FeaturedText />
        {couples.map((couple, i) => (
          <FeaturedCouple key={i} couple={couple} />
        ))}
      </div>
    </section>
  );
}