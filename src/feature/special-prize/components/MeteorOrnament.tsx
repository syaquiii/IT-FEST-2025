import Image from "next/image";
import React from "react";
import Meteor from "@/assets/img/specialprize/Meteor.png";
const MeteorOrnament = () => {
  return (
    <div className="h-screen w-full  absolute ">
      <Image
        src={Meteor}
        alt="Meteor"
        className="absolute right-0 scale-x-[-1] w-80"
      />
      <Image src={Meteor} alt="Meteor" className="absolute left-20 w-40" />
    </div>
  );
};

export default MeteorOrnament;
