import React from "react";
import Separator from "@/assets/img/specialprize/separator.svg";
import SeparatorMid from "@/assets/img/specialprize/separatormid.svg";
import Image from "next/image";

const FooterSeparator = () => {
  return (
    <div className="w-full absolute bottom-0   flex items-center justify-between py-6">
      <Image className="w-2/5 z-20 md:w-1/5" src={Separator} alt="kota" />
      <Image
        className="w-full z-0 absolute right-0 left-0 "
        src={SeparatorMid}
        alt="kota"
      />
      <Image
        className="w-2/5 md:w-1/5 scale-x-[-1]"
        src={Separator}
        alt="kota"
      />
    </div>
  );
};

export default FooterSeparator;
