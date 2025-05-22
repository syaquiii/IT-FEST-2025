import React from "react";
import FooterOrnament from "../components/FooterOrnament";
import MeteorOrnament from "../components/MeteorOrnament";
import Hero from "../components/Hero";

const SpecialPrizeContainer = () => {
  return (
    <main className="min-h-screen w-full relative specialprizebg overflow-x-hidden">
      <MeteorOrnament />
      <Hero />
      <FooterOrnament />
    </main>
  );
};

export default SpecialPrizeContainer;
