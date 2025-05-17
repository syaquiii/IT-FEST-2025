import React from "react";
import Hero from "../components/Hero";
import Pattern from "../components/Pattern";
import Ornament from "../components/Ornament";

const ComingSoonContainer = () => {
  return (
    <main className="comingsoon overflow-x-hidden bg-red-200 h-screen relative comingsoonbg ">
      <Hero />
      <Ornament />
      <Pattern />
    </main>
  );
};

export default ComingSoonContainer;
