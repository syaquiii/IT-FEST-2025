"use client";
import React from "react";
import { footlink } from "../data/footlink";
import FootList from "./FootList";
import { Instagram } from "lucide-react";

const Footer = () => {
  return (
    <div>
      <footer className="mycontainer mb-20">
        <div className="flex md:flex-row flex-col justify-center md:justify-between lg:mx-40">
          <section className="flex flex-col md:flex-row justify-center items-center md:gap-10">
            <div className="w-30 h-30 bg-ourgray"></div>
            <p className="text-2xl font-semibold">IT FEST</p>
          </section>

          <section className="flex gap-25">
            <div className="flex flex-col gap-5">
              <h1 className="font-semibold">Explore</h1>
              {footlink.map((item) => {
                return <FootList key={item.id} item={item} />;
              })}
            </div>

            <div className="space-y-8">
              <h1 className="font-semibold">Social Media</h1>
              <div className="flex gap-5">
                <Instagram />
              </div>
            </div>
          </section>
        </div>
      </footer>
      <div className="border-t-2 text-center">
        @ IT FEST All rights reserved.
      </div>
    </div>
  );
};

export default Footer;
