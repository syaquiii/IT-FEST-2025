"use client";
import Image from "next/image";
import React from "react";
import Meteor from "@/assets/img/specialprize/Meteor.png";
import { useMeteorAnimation } from "../hooks/useMeteorAnimation";

const MeteorOrnament = () => {
  const { styles } = useMeteorAnimation();

  return (
    <>
      {styles}
      <div className="h-screen w-full absolute">
        <Image
          src={Meteor}
          alt="Meteor"
          className="absolute right-8  lg:right-0 w-40 lg:w-80 scale-x-[1] meteor-move-right"
        />
        <Image
          src={Meteor}
          alt="Meteor"
          className="absolute left-8 top-8 lg:left-20 lg:w-40 w-32 meteor-move-left"
        />
      </div>
    </>
  );
};

export default MeteorOrnament;
