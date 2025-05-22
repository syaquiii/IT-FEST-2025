import React from "react";
import Image from "next/image";
import button1 from "@/assets/img/category/button1.webp";
import button2 from "@/assets/img/category/button2.webp";
import laptop from "@/assets/img/category/laptop.webp";
import handphone from "@/assets/img/category/handphone.webp";

const Button = () => {
  return (
    <div className="flex ">
      <div className="w-full h-full flex lg:flex-row flex-col font-robotech md:mt-0 mt-10">
        <button className="group relative hover:scale-105 transition-all duration-300 cursor-pointer flex items-center justify-center">
          <Image src={button1} alt="button1" className="lg:w-3/5 w-80"></Image>
          <div className="absolute xl:top-1/8 lg:top-1/5 xl:translate-y-5 lg:translate-y-2 lg:left-1/4 left-1/8 translate-x-6 flex items-center 2xl:gap-10 gap-8 2xl:w-36 xl:w-32 w-26">
            <p className="2xl:text-5xl lg:text-4xl text-4xl text-left group-hover:scale-105 duration-500">
              UI/UX DESIGN
            </p>
            <Image
              src={handphone}
              alt="handphone"
              className="transition-all duration-500 group-hover:rotate-12 group-hover:scale-130"
            />
          </div>
        </button>
        <button className="group relative hover:scale-105 transition-all duration-300 cursor-pointer flex items-center justify-center">
          <Image src={button2} alt="button1" className="lg:w-3/5 w-80"></Image>
          <div className="absolute lg:top-1/5 xl:translate-y-5 lg:translate-y-2 lg:left-1/4 left-1/10 translate-x-4 flex items-center gap-1 2xl:w-42 lg:w-40 w-32">
            <p className="2xl:text-5xl lg:text-4xl text-4xl text-left group-hover:scale-105 duration-500">
              BUSINESS PLAN
            </p>
            <Image
              src={laptop}
              alt="handphone"
              className="transition-all duration-500 group-hover:rotate-12 group-hover:scale-130"
            />
          </div>
        </button>
      </div>
    </div>
  );
};

export default Button;
