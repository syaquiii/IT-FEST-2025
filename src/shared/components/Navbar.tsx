"use client";
import React, { useState, useEffect } from "react";
import { Navlink } from "../data/navlink";
import Navlist from "./Navlist";
import Hamburger from "hamburger-react";
import { Button } from "./ui/Button";

const MobileNav = () => {
  return (
    <div className="h-screen w-screen inset-0 fixed top-0 left-0 bg-ourgray z-10 flex flex-col items-center justify-center">
      abc
    </div>
  );
};

const Navbar = () => {
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > lastScrollY) {
        setIsVisible(false); // Menghilangkan navbar saat scroll turun
      } else {
        setIsVisible(true); // Menampilkan navbar saat scroll naik
      }
      setLastScrollY(window.scrollY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [lastScrollY]);

  return (
    <>
      {/* Desktop Navbar */}
      <nav
        className={`mycontainer fixed right-0 left-0 py-4 items-center lg:flex hidden justify-between transition-transform duration-300 ${
          isVisible ? "translate-y-0" : "-translate-y-full"
        }`}
      >
        <div className="w-1/5 font-robotech text-white text-glow text-6xl font-bold">
          <h1>IT FEST</h1>
        </div>
        <ul className="w-3/5 flex justify-center gap-8">
          {Navlink.map((item) => (
            <Navlist key={item.id} item={item} />
          ))}
        </ul>
        <div className="w-1/5 flex justify-end">
          <Button variant={"primary"} size={"small"}>
            Daftar
          </Button>
        </div>
      </nav>
      {/* Mobile Navbar */}
      <nav
        className={`mycontainer bg-transparent flex z-40  py-4 fixed justify-between items-center lg:hidden transition-transform duration-300 ${
          isVisible ? "translate-y-0" : "-translate-y-full"
        }`}
      >
        <div className="font-bold font-robotech text-white text-glow text-2xl">
          <h1>IT FEST</h1>
        </div>
        <div className="">
          <Hamburger
            size={20}
            color="white"
            toggled={isOpen}
            toggle={setIsOpen}
          />
        </div>
      </nav>
      {/* Render MobileNav berdasarkan isOpen */}
      {isOpen && <MobileNav />}
    </>
  );
};

export default Navbar;
