import Image from "next/image";
import React from "react";
import Ornament1 from "@/assets/img/hero/ornament1.webp";
import Ornament2 from "@/assets/img/hero/ornament2.webp";
import Ornament3 from "@/assets/img/hero/ornament3.webp";
import Ornament4 from "@/assets/img/hero/ornament4.webp";

const Ornament = () => {
  return (
    <div className="w-full h-full absolute top-0  ">
      <Image
        src={Ornament1}
        alt="ornament 1"
        className="absolute top-20 left-0 xl:w-80 lg:w-70 w-48"
      />
      <Image
        src={Ornament2}
        alt="ornament 2"
        className="absolute bottom-16 right-0 xl:w-70 lg:w-64 w-48"
      />
      <Image
        src={Ornament3}
        alt="ornament 3"
        className="herocontainer absolute bottom-0 opacity-30"
      />
      <Image
        src={Ornament4}
        alt="ornament 4"
        className=" absolute bottom-0 left-0 right-0 mx-auto translate-y-35 opacity-35 xl:w-6xl lg:w-5xl w-4xl animate-pulse"
      />
    </div>
  );
};

export default Ornament;
