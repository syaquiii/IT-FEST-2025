import AboutContainer from "@/feature/about/container/container";
import CategoryContainer from "@/feature/category/container/container";
import EventContainer from "@/feature/event/container/EventContainer";
import FaqContainer from "@/feature/faq/container/FaqContainer";
import GuideContainer from "@/feature/guide/container/GuideContainer";
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
      <FaqContainer />
      <EventContainer />
      <GuideContainer />
    </main>
  );
}
