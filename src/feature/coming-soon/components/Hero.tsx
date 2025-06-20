"use client";
import { Instagram, Youtube } from "lucide-react";
import Link from "next/link";
import React from "react";
import { motion } from "framer-motion";

const Hero = () => {
  return (
    <section className="text-white w-full h-full flex flex-col items-center justify-center">
      <motion.div
        className="text-glow font-robotech"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <h1 className="text-4xl md:text-6xl text-center">IT FEST 2025</h1>
        <h2 className="text-6xl md:text-8xl mt-8 text-center">COMING SOON</h2>
      </motion.div>

      <motion.span
        className="font-changa text-lg mt-2 md:text-2xl"
        initial={{ y: 10, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        Something special is in progress....
      </motion.span>

      <motion.span
        className="md:mt-16 mt-8 mb-2 font-changa text-xl"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
      >
        Social Media
      </motion.span>

      <motion.div
        className="grid grid-cols-2 gap-4 text-blue-200"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 1.1 }}
      >
        <Link href={"#"}>
          <Instagram />
        </Link>
        <Link href={"#"}>
          <Youtube />
        </Link>
      </motion.div>
    </section>
  );
};

export default Hero;
