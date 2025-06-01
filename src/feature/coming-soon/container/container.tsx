import React from "react";
import Hero from "../components/Hero";
import Ornament from "../components/Ornament";
import Pattern from "@/shared/components/Pattern";

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
