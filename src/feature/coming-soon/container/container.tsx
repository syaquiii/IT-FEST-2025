import React from "react";
import Hero from "../components/Hero";
import Ornament from "../components/Ornament";
import Pattern from "@/shared/components/Pattern";
import Stars from "@/feature/hero/components/Stars";

const ComingSoonContainer = () => {
  return (
    <main className="comingsoon overflow-hidden w-screen bg-red-200 h-screen relative comingsoonbg ">
      <Hero />
      <Ornament />
      <Pattern />
      <Stars />
    </main>
  );
};

export default ComingSoonContainer;
