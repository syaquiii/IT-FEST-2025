import React from "react";
import Ornament2 from "../../../assets/img/about/Ornament2.webp";
import Ornament3 from "../../../assets/img/about/Ornament3.webp";
import Ornament4 from "../../../assets/img/about/Ornament4.webp";
import Image from "next/image";

const Hero = () => {
  return (
    <section className="relative h-[100lvh] w-full font-changa ">
      <main className="text-white flex lg:flex-row lg:gap-4 gap-8 justify-around flex-col items-center lg:pt-50 pt-60">
        <div className="xl:w-xl lg:w-lg w-96 flex flex-col gap-4">
          <h1 className="font-neighbor lg:text-6xl text-4xl">
            WHAT IS IT FEST?
          </h1>
          <p className="xl:text-2xl md:text-lg text-sm text-justify">
            IT Fest adalah event teknologi yang diselenggarakan oleh KBMDSI UB,
            dengan tujuan untuk blablabla. Event ini terdiri dari 2 lomba, yaitu
            UIUX dan Business Plan, sebagai kompetisi antar mahasiswa PT di
            seluruh Indonesia.
          </p>
          <div className="w-full flex lg:justify-end justify-center animate-pulse">
            <Image src={Ornament4} alt="ornament" className="w-50"></Image>
          </div>
        </div>

        <div className="xl:w-96 lg:w-80 w-72 relative">
          <Image src={Ornament2} alt="ornament"></Image>
          <Image
            src={Ornament3}
            alt="ornament"
            className="absolute bottom-0 mx-auto left-0 right-0 xl:w-64 lg:w-52 w-48"
          ></Image>
        </div>
      </main>
    </section>
  );
};

export default Hero;
