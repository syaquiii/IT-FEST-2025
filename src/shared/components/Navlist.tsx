import React, { FC } from "react";
import { TNavLink } from "../type/Tnavlink";
import Link from "next/link";

interface NavlistProps {
  item: TNavLink;
}

const Navlist: FC<NavlistProps> = ({ item }) => {
  return (
    <Link
      className="text-white text-xl font-bold font-changa"
      href={item.href}
    >
      {item.title}
    </Link>
  );
};

export default Navlist;
