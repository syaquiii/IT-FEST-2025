"use client";
import Image from "next/image";
import React from "react";
import { motion } from "framer-motion";
import Ornament1 from "@/assets/img/comingsoon/ornament1.png";
import Ornament2 from "@/assets/img/comingsoon/ornament2.png";

const Ornament = () => {
  return (
    <div className="w-full min-h-[10rem] absolute bottom-14 mycontainer z-40">
      <div className="w-full h-full flex justify-between items-center">
        <motion.div
          initial={{ x: -100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 1, delay: 0.3 }}
        >
          <Image
            className="xl:w-64 lg:w-52 w-32"
            alt="ornament"
            src={Ornament1}
          />
        </motion.div>
        <motion.div
          initial={{ x: 100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 1, delay: 0.3 }}
        >
          <Image
            className="xl:w-64 lg:w-52 w-32"
            alt="ornament"
            src={Ornament2}
          />
        </motion.div>
      </div>
    </div>
  );
};

export default Ornament;
