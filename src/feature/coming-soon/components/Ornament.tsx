import Image from "next/image";
import React from "react";
import Ornament1 from "@/assets/img/comingsoon/ornament1.png";
import Ornament2 from "@/assets/img/comingsoon/ornament2.png";
const Ornament = () => {
  return (
    <div className="w-full min-h-[10rem] absolute bottom-14 mycontainer z-40 ">
      <div className="w-full  h-full flex   justify-between items-center ">
        <Image
          className="xl:w-64 lg:w-52 w-32"
          alt="ornament"
          src={Ornament1}
        />
        <Image
          className="xl:w-64 lg:w-52 w-32"
          alt="ornament"
          src={Ornament2}
        />
      </div>
    </div>
  );
};

export default Ornament;
