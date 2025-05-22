import React from "react";
import PrizeCount from "./PrizeCount";

const Hero = () => {
  return (
    <div className="mycontainer relative grid place-items-center h-screen ">
      <div>
        <h4 className="font-neighbor mb-8 text-3xl md:text-4xl lg:text-5xl text-center text-blue-100">
          SPECIAL PRIZE
        </h4>
        <PrizeCount />
      </div>
      <div className="absolute bg-white w-full min-h-[30rem] textprizeglowbanget "></div>
    </div>
  );
};

export default Hero;
