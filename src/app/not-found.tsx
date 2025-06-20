"use client";
import React, { useEffect } from "react";
import { motion } from "framer-motion";
import Stars from "@/feature/hero/components/Stars";
import Planets from "@/assets/img/planets.svg";
import Image from "next/image";
import Mobil from "@/assets/img/mobil.png";

export default function NotFound() {
  useEffect(() => {}, []);

  return (
    <main className="bg-gradient-to-b from-slate-900 to-indigo-900 relative overflow-hidden min-h-screen">
      {/* Animated background gradient overlay */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-blue-600/10 via-purple-600/10 to-pink-600/10"
        animate={{
          background: [
            "linear-gradient(45deg, rgba(59,130,246,0.1), rgba(147,51,234,0.1), rgba(236,72,153,0.1))",
            "linear-gradient(45deg, rgba(236,72,153,0.1), rgba(59,130,246,0.1), rgba(147,51,234,0.1))",
            "linear-gradient(45deg, rgba(147,51,234,0.1), rgba(236,72,153,0.1), rgba(59,130,246,0.1))",
          ],
        }}
        transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
      />

      {/* Planet + 404 + subtitle */}
      <motion.div
        className="absolute inset-0 flex items-center justify-center z-0"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 2 }}
      >
        <motion.div
          className="relative w-[380px] h-[280px] md:w-[480px] md:h-[360px]"
          animate={{
            y: [0, -5, 0],
            rotate: [0, 0.5, -0.5, 0],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          {/* 404 hologram */}
          <motion.div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-[160%] z-50 will-change-transform"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.2 }}
          >
            <h1
              className="text-[60px] md:text-[100px] font-extrabold text-white font-mono select-none pointer-events-none"
              style={{
                textShadow: `
                  0 0 4px #00ffff,
                  0 0 8px #00e6e6,
                  0 0 16px #00cccc,
                  0 0 32px #009999,
                  0 0 64px #006666`,
              }}
            >
              404
            </h1>
          </motion.div>

          <Image
            src={Planets}
            alt="Floating Planets"
            className="pointer-events-none select-none"
            priority
          />

          {/* Subtitle */}
          <motion.div
            className="absolute top-full left-1/2 -translate-x-1/2 mt-4 z-40"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.5 }}
          >
            <span
              className="text-sm md:text-base font-mono text-cyan-300 tracking-widest"
              style={{
                textShadow: `
                  0 0 2px #00ffff,
                  0 0 4px #00cccc,
                  0 0 6px #009999`,
              }}
            >
              planet not found
            </span>
          </motion.div>
        </motion.div>
        {/* Mobil muncul dari kanan */}
        <motion.div
          initial={{ x: "100vw", opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{
            delay: 2,
            duration: 1.5,
            type: "spring",
            stiffness: 60, // dikurangi biar lebih lembut
            damping: 12,
          }}
          className="absolute bottom-6 sm:bottom-10 right-6 sm:right-1/4 translate-x-0 z-50 flex flex-col items-center cursor-pointer"
          onClick={() => (window.location.href = "/home")}
        >
          {/* Mobil animasi loop */}
          <motion.div
            animate={{
              y: [0, -4, 0],
              scale: [1, 1.04, 1],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            <Image
              src={Mobil}
              alt="Go Home"
              className="w-16 sm:w-20 md:w-28 drop-shadow-[0_0_6px_#00ffff]"
              priority
            />
          </motion.div>

          {/* Hologram teks: animasi sekali saat masuk */}
          <motion.div
            initial={{ opacity: 0, y: 8, filter: "blur(4px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ delay: 3.3, duration: 0.6, ease: "easeOut" }}
            className="relative mt-2 sm:mt-3 text-center bg-black/10 px-4 py-2 sm:p-4 rounded backdrop-blur-sm max-w-[90vw] sm:max-w-xs"
          >
            <p className="text-cyan-200 text-xs sm:text-sm font-mono tracking-wide select-none pointer-events-none">
              you are lost
            </p>
            <p className="text-cyan-300 font-semibold text-xs sm:text-sm font-mono tracking-wide select-none pointer-events-none">
              let&apos;s go home →
            </p>
          </motion.div>
        </motion.div>
      </motion.div>

      <Stars />
    </main>
  );
}
