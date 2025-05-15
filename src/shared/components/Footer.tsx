"use client";
import React from "react";
import { footlink } from "../data/footlink";
import FootList from "./FootList";
import { Instagram } from "lucide-react";
import Link from "next/link";

const Footer = () => {
  return (
    <footer className="h-screen md:h-fit">
      <div className="mycontainer mb-20 ">
        <div className="flex md:flex-row  flex-col justify-center md:justify-between lg:mx-40">
          <section className="flex gap-y-4 flex-col md:flex-row justify-center items-center md:gap-10">
            <div className="w-30 h-30 bg-ourgray"></div>
            <p className="text-2xl font-semibold">IT FEST</p>
          </section>

          <section className="flex mt-8 flex-col md:flex-row items-center md:items-start gap-y-6 md:gap-25 justify-center">
            <div className="flex flex-col gap-5">
              <h1 className="font-semibold">Explore</h1>
              {footlink.map((item) => {
                return <FootList key={item.id} item={item} />;
              })}
            </div>

            <div className="space-y-4 ">
              <h1 className="font-semibold">Social Media</h1>
              <div className="flex gap-5">
                <Link href={"#"}>
                  <Instagram />
                </Link>
              </div>
            </div>
          </section>
        </div>
      </div>
      <div className="border-t-2  text-center">
        @ IT FEST All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
