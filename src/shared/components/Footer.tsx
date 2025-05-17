"use client";
import React from "react";
import { Instagram } from "lucide-react";
import { Youtube } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import logoitfest from "../../assets/img/footer/logoitfest.webp";
import whatsapp from "../../assets/img/footer/whatsapp.webp";

const Footer = () => {
  return (
    <footer className="min-h-[35rem] md:min-h-fit bg-linear-180 from-blue-500 to-blue-400 text-white font-changa">
      <div className="mycontainer mb-20">
        <div className="pt-24 flex md:flex-row flex-col justify-center md:justify-between">
          <section className="flex gap-y-4 flex-col justify-center md:gap-6 ">
            <div className="flex items-center gap-10 ">
              <Image src={logoitfest} alt="Logo" className="w-30 h-30" />
              <p className="font-semibold font-robotech text-7xl text-glow">
                IT FEST
              </p>
            </div>
            <p className="text-xl">
              © 2025 IT FEST 2025. All rights reserved. Universitas Brawijaya
            </p>
          </section>

          <section className="flex mt-8 flex-col md:flex-row items-center md:items-start gap-y-6 md:gap-25 justify-center">
            <div className="flex flex-col gap-5">
              <h1 className="font-bold text-3xl">Contact Us</h1>
              <div className="flex items-center gap-3.5">
                <Image src={whatsapp} alt="whatsapp" className="w-11 h-11" />
                <p className="w-5">Wildan</p>
              </div>
            </div>

            <div className="space-y-4 ">
              <h1 className="font-semibold text-3xl">Social Media</h1>
              <div className="flex gap-5 items-center text-blue-200">
                <Link href={"#"}>
                  <Instagram className="w-10 h-10" />
                </Link>
                <Link href={"#"}>
                  <Youtube className="w-12 h-12" />
                </Link>
              </div>
            </div>
          </section>
        </div>
      </div>
      <div className="border-t-2   text-center">Made with ❤️ by PIT KBMDSI</div>
    </footer>
  );
};

export default Footer;
