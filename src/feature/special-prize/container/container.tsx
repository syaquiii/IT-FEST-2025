import React from "react";
import FooterOrnament from "../components/FooterOrnament";
import MeteorOrnament from "../components/MeteorOrnament";
import Hero from "../components/Hero";
import FooterSeparator from "../components/FooterSeparator";

const SpecialPrizeContainer = () => {
  return (
    <main className="min-h-screen lg:pb-40 w-full relative specialprizebg overflow-x-hidden">
      <MeteorOrnament />
      <Hero />
      <FooterOrnament />
      <FooterSeparator />
    </main>
  );
};

export default SpecialPrizeContainer;
