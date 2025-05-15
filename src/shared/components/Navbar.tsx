import React from "react";
import { Navlink } from "../data/navlink";
import Navlist from "./Navlist";

const Navbar = () => {
  return (
    <nav className="mycontainer py-4  items-center lg:flex hidden justify-between  ">
      <div className="w-1/5 font-bold text-2xl">
        <h1>IT FEST</h1>
      </div>
      <ul className="w-3/5 flex justify-center gap-8">
        {Navlink.map((item) => {
          return <Navlist key={item.id} item={item} />;
        })}
      </ul>
      <div className="w-1/5 flex justify-end">
        <button>Login</button>
      </div>
    </nav>
  );
};

export default Navbar;
