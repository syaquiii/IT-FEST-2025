"use client";
import { useState } from "react";
import { Navlink } from "../data/navlink";
import Navlist from "./Navlist";
import Hamburger from "hamburger-react";
import { Button } from "./ui/Button";
import useScrollNavbar from "../hooks/useScrollBar";

const MobileNav = () => {
  return (
    <div className="h-screen w-screen inset-0 fixed top-0 left-0 bg-ourgray z-10 flex flex-col items-center justify-center">
      abc
    </div>
  );
};

const Navbar = () => {
  const { isVisible } = useScrollNavbar(100, 700); // {dia akan scroll dari y berapa} ke {dia akan scroll sampai y berapa}
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Desktop Navbar */}
      <nav
        className={`  fixed right-0 left-0 top-0 py-4 z-20 transition-transform duration-300 ${
          isVisible ? "translate-y-0 lg:bg-blue-500" : "-translate-y-full"
        }`}
      >
        <div className=" mycontainer items-center lg:flex hidden justify-between">
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
        </div>
      </nav>

      {/* Mobile Navbar */}
      <nav
        className={`mycontainer bg-transparent flex z-40 py-4 fixed justify-between items-center lg:hidden transition-transform duration-300 ${
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

      {/* Render MobileNav based on isOpen */}
      {isOpen && <MobileNav />}
    </>
  );
};

export default Navbar;
