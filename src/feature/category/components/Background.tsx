import React from "react";
import Image from "next/image";
import BackgroundImg from "@/assets/img/category/background.webp";

const Background = () => {
  return (
    <div className="absolute inset-0 pointer-events-none -translate-y-20 overflow-x-hidden">
      <Image
        src={BackgroundImg}
        alt="background"
        className="w-full h-full object-fill"
        priority
      />
    </div>
  );
};

export default Background;
