"use client";
import React, { useState } from "react";
import { Navlink } from "../data/navlink";
import Navlist from "./Navlist";
import Hamburger from "hamburger-react";

const MobileNav = () => {
  return (
    <div className="h-screen w-screen absolute top-0 left-0 bg-ourgray z-20 flex flex-col items-center justify-center"></div>
  );
};

const Navbar = () => {
  // State to control mobile navigation visibility
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <nav className="mycontainer  py-4 items-center lg:flex hidden justify-between">
        <div className="w-1/5 font-robotech  font-bold text-2xl">
          <h1>IT FEST</h1>
        </div>
        <ul className="w-3/5 flex font-changa justify-center gap-8">
          {Navlink.map((item) => {
            return <Navlist key={item.id} item={item} />;
          })}
        </ul>
        <div className="w-1/5 flex justify-end">
          <button className="px-6 py-2 bg-blue-500 text-white rounded-md">
            Login
          </button>
        </div>
      </nav>

      {/* Mobile navbar */}
      <nav className="mycontainer py-4 flex justify-between items-center lg:hidden">
        <div className="font-bold text-2xl">
          <h1>IT FEST</h1>
        </div>
        <div className="z-50 absolute m-4 right-0 ">
          <Hamburger toggled={isOpen} toggle={setIsOpen} />
        </div>
      </nav>

      {/* Render MobileNav conditionally based on isOpen state */}
      {isOpen && <MobileNav />}
    </>
  );
};

export default Navbar;
