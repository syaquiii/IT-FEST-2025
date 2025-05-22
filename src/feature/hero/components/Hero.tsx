import { ChevronsDown } from "lucide-react";
import React from "react";

const Hero = () => {
  return (
    <section className="font-changa">
      <div className="flex flex-col mycontainer justify-center items-center z-50 h-screen text-white text-center -translate-y-10 gap-8">
        <h1 className="text-glow xl:text-9xl lg:text-8xl  text-7xl font-robotech">
          IT FEST 2025
        </h1>
        <p className=" xl:text-3xl lg:text-2xl md:text-md text-sm font-bold">
          Visionary Design for Limitless Technological Breakthroughs
        </p>
        <div className="absolute bottom-5 md:translate-x-1.5 translate-1">
          <ChevronsDown className="md:w-16 md:h-16 w-14 h-14 animate-bounce duration-700"/>
        </div>
      </div>
    </section>
  );
};

export default Hero;
