import PortfolioComp from "@/components/storyBoard/PortfolioComp";
import { weddings } from "@/src/data/weddings";


export default function Portfolio() {
  return (
    <main className="bg-bg">
      {/* Hero Section here */}
      <PortfolioComp weddings={weddings} />
    </main>
  );
}
