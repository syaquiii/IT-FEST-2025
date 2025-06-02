import Image from "next/image";
import React from "react";
import Nagari from "@/assets/img/event/nagari.svg";
import Praise from "@/assets/img/event/praise.svg";
import Dq from "@/assets/img/event/dqlab.svg";
import Dl from "@/assets/img/event/dl.svg";

const Sponsor = () => {
  return (
    <div className="w-full bg-[#37176E] mt-10 flex justify-center items-center py-6">
      <div className="max-w-screen-lg flex flex-wrap justify-center gap-6">
        <Image className="w-1/6 md:w-1/6" alt="Nagari" src={Nagari} />
        <Image className="w-1/6 md:w-1/6" alt="Praise" src={Praise} />
        <Image className="w-1/6 md:w-1/6" alt="Dq" src={Dq} />
        <Image className="w-1/6 md:w-1/6" alt="Dl" src={Dl} />
      </div>
    </div>
  );
};

export default Sponsor;
