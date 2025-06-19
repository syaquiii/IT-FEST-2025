"use client";
import React from "react";
import { Instagram } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import logoitfest from "../../assets/img/footer/logoitfest.webp";
import whatsapp from "../../assets/img/footer/whatsapp.webp";

const Footer = () => {
  return (
    <footer className="min-h-[35rem] md:min-h-fit bg-linear-180 from-blue-500 to-blue-400 text-white font-changa border-t-5 border-blue-250">
      <div className="mycontainer mb-10 md:mb-20">
        <div className="pt-12 md:pt-24 flex lg:flex-row flex-col justify-center lg:justify-between gap-8 lg:gap-0">
          <section className="flex gap-y-4 flex-col justify-center md:gap-6 items-center lg:items-start">
            <div className="flex items-center gap-6 md:gap-10">
              <Image
                src={logoitfest}
                alt="Logo"
                className="w-20 h-20 md:w-30 md:h-30"
              />
              <p className="font-semibold font-robotech text-4xl md:text-7xl text-glow">
                IT FEST
              </p>
            </div>
            <p className="text-base md:text-xl text-center lg:text-left">
              © 2025 IT FEST 2025. All rights reserved. Universitas Brawijaya
            </p>
          </section>

          <section className="flex flex-col lg:flex-row items-center lg:items-start gap-8 lg:gap-16">
            <div className="flex flex-col gap-4 items-center lg:items-start">
              <h1 className="font-bold text-2xl md:text-3xl">Contact Us</h1>
              <div className="flex items-center gap-3.5">
                <Image
                  src={whatsapp}
                  alt="whatsapp"
                  className="w-8 h-8 md:w-11 md:h-11"
                />
                <p className="text-base md:text-lg">Wildan</p>
              </div>
            </div>
            <div className="flex flex-col gap-4 items-center lg:items-start">
              <h1 className="font-semibold text-2xl md:text-3xl">
                Social Media
              </h1>
              <div className="flex gap-5 items-center text-blue-200">
                <Link
                  href="https://www.instagram.com/itfest.filkom/
"
                >
                  <Instagram className="w-8 h-8 md:w-10 md:h-10" />
                </Link>
              </div>
            </div>
          </section>
        </div>
      </div>
      <div className="border-t-5 border-purple-border text-center py-4 md:py-6">
        Made with ❤️ by PIT KBMDSI
      </div>
    </footer>
  );
};

export default Footer;
