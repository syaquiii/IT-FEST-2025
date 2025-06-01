import Image from "next/image";
import React from "react";
import Ornament1 from "@/assets/img/hero/ornament1.webp";
import Ornament2 from "@/assets/img/hero/ornament2.webp";

const Ornament = () => {
  return (
    <div className="w-full h-full absolute top-0  ">
      <Image
        src={Ornament1}
        alt="ornament 1"
        className="absolute top-16 left-0 xl:w-80 lg:w-70 w-48 "
      />
      <Image
        src={Ornament2}
        alt="ornament 2"
        className="absolute bottom-16 right-0 xl:w-70 lg:w-64 w-48"
      />
    </div>
  );
};

export default Ornament;
