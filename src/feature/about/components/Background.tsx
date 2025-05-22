import React from "react";
import Image from "next/image";
import BackgroundImg from "@/assets/img/about/background.webp";

const Background = () => {
  return (
    <div className="absolute h-[100vh] inset-0 z-0 pointer-events-none -translate-y-30 overflow-x-hidden">
      <Image
        src={BackgroundImg}
        alt="abstract background"
        className="w-full h-full lg:object-fill object-cover"
      />
    </div>
  );
};

export default Background;
