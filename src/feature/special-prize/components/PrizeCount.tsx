"use client";
import React from "react";
import { useScrollTrigger } from "../hooks/useScrollTrigger";
import { useCountAnimation } from "../hooks/useCountAnimation";

const PrizeCount = () => {
  const { ref, isVisible } = useScrollTrigger(0.1);
  const count = useCountAnimation(isVisible, 8000000, 2000);

  const formattedCount = Math.floor(count)
    .toString()
    .replace(/\B(?=(\d{3})+(?!\d))/g, ".");

  return (
    <p
      ref={ref}
      className="text-center font-robotech relative xl:text-9xl lg:text-4xl  text-6xl  textprizeglow text-blue-100"
    >
      RP.{formattedCount}
    </p>
  );
};

export default PrizeCount;
