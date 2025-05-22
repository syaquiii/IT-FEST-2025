import React from "react";
import Hero from "../components/Hero";
import Ornament from "../components/Ornament";
import Stars from "../components/Stars";

const HeroContainer = () => {
  return (
    <main className="comingsoonbg h-screen relative overflow-hidden">
      <Stars  />
      <Hero />
      <Ornament />
    </main>
  );
};

export default HeroContainer;
