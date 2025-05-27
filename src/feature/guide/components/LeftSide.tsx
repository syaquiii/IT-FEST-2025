import { Button } from "@/shared/components/ui/Button";
import React from "react";

const LeftSide = () => {
  return (
    <div className="w-full">
      <h4 className="font-neighbor text-3xl text-center lg:text-left lg:text-5xl xl:text-6xl text-blue-100">
        Get the Competition Guide
      </h4>
      <p className="font-changa w-full text-lg text-center lg:text-left lg:text-xl xl:text-2xl mt-4 text-white xl:w-2/3 ">
        Everything you need to know about the competition, in one place.
      </p>
      <Button
        className="mt-10 w-full lg:w-1/2"
        size={"normal"}
        variant={"primary"}
      >
        Download Guidebook
      </Button>
    </div>
  );
};

export default LeftSide;
