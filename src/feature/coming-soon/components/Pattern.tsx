import Image from "next/image";
import React from "react";
import pattern from "@/assets/img/comingsoon/heropattern.svg";
const Pattern = () => {
  return (
    <div className=" w-[70rem]  lg:w-[80rem] xl:w-full transition-all absolute bottom-0  border-white comingsoonpattern">
      <Image
        alt="pattern"
        className="w-full animate-pulse mix-blend-screen"
        width={100}
        height={100}
        src={pattern}
      />
    </div>
  );
};

export default Pattern;
