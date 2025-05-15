import React, { FC } from "react";
import { TNavLink } from "../type/Tnavlink";
import Link from "next/link";

interface NavlistProps {
  item: TNavLink;
}
const Navlist: FC<NavlistProps> = ({ item }) => {
  return <Link href={item.href}>{item.title}</Link>;
};

export default Navlist;
