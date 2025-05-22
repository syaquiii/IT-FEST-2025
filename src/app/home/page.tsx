import AboutContainer from "@/feature/about/container/container";
import CategoryContainer from "@/feature/category/container/container";
import HeroContainer from "@/feature/hero/container/container";
import TimelineContainer from "@/feature/timeline/container/container";

export default function Home() {
  return (
    <main className="min-h-screen ">
      {/* YOUR CONTAINER PAGE COMPONENT HERE */}
      <div className="this is your another "></div>
      <HeroContainer />
      <AboutContainer />
      <CategoryContainer />
      <TimelineContainer />
    </main>
  );
}
