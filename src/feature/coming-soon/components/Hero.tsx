import { Instagram, Youtube } from "lucide-react";
import Link from "next/link";
import React from "react";

const Hero = () => {
  return (
    <section className="text-white w-full h-full flex flex-col items-center justify-center">
      <div className=" text-glow font-robotech ">
        <h1 className="text-4xl md:text-6xl text-center ">IT FEST 2025</h1>
        <h2 className="text-6xl md:text-8xl mt-8 text-center ">COMING SOON</h2>
      </div>
      <span className="font-changa text-lg mt-2 md:text-2xl">
        Something special is in progress....
      </span>
      <span className="md:mt-16 mt-8 mb-2 font-changa text-xl">
        Social Media
      </span>
      <div className="grid grid-cols-2 gap-4   text-blue-200">
        <Link href={"#"}>
          <Instagram />
        </Link>
        <Link href={"#"}>
          <Youtube />
        </Link>
      </div>
    </section>
  );
};

export default Hero;
