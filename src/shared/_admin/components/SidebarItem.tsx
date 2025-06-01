"use client";
import { cn } from "@/shared/utils/cn";
import Link from "next/link";
import { NavItem } from "../type/nav-item";

interface SidebarItemProps {
  item: NavItem;
  pathname: string;
  onItemClick: () => void;
}

export default function SidebarItem({
  item,
  pathname,
  onItemClick,
}: SidebarItemProps) {
  return (
    <li>
      <Link
        href={item.path}
        onClick={onItemClick}
        className={cn(
          "flex items-center justify-center bg-purple-400 py-4 text-glow font-changa rounded-lg transition-colors",
          pathname === item.path
            ? "bg-purple-300 text-white"
            : "hover:bg-purple-300"
        )}
      >
        <span>{item.title}</span>
      </Link>
    </li>
  );
}
