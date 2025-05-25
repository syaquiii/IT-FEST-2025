import AboutContainer from "@/feature/about/container/container";
import CategoryContainer from "@/feature/category/container/container";
import HeroContainer from "@/feature/hero/container/container";
import SpecialPrizeContainer from "@/feature/special-prize/container/container";
import TimelineContainer from "@/feature/timeline/container/container";

export default function Home() {
  return (
    <main className="min-h-screen scroll-smooth ">
      <HeroContainer />
      <AboutContainer />
      <CategoryContainer />
      <TimelineContainer />
      <SpecialPrizeContainer />
    </main>
  );
}
