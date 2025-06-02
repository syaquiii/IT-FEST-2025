"use client";
import { cn } from "@/shared/utils/cn";
import { usePathname } from "next/navigation";
import { navItems } from "../data/nav-items";
import { AdminProfile } from "./AdminProfile";
import { useState } from "react";
import SidebarItem from "./SidebarItem";

interface SidebarProps {
  profileData: {
    imageUrl: string;
    username: string;
    email: string;
  };
  onLogout: () => void;
}

export default function Sidebar({ profileData, onLogout }: SidebarProps) {
  const pathname = usePathname();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <>
      {/* Mobile Menu Button */}
      <button
        className="fixed top-4 left-4 z-50 p-2 rounded-lg bg-blue-500 text-white md:hidden"
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
      >
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          {isSidebarOpen ? (
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          ) : (
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 12h16M4 18h16"
            />
          )}
        </svg>
      </button>

      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black/40 blur-3xl z-40 md:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      <aside
        className={cn(
          "fixed md:static w-64 h-screen bg-blue-400 text-white p-4 flex flex-col z-50 transition-transform duration-300 ease-in-out",
          "md:transform-none",
          isSidebarOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
        )}
      >
        <AdminProfile
          imageUrl={profileData.imageUrl}
          email={profileData.email}
          username={profileData.username}
        />
        <nav>
          <ul className="space-y-6 mt-10 px-6">
            {navItems.map((item, idx) => (
              <SidebarItem
                key={idx}
                item={item}
                pathname={pathname}
                onItemClick={() => setIsSidebarOpen(false)}
              />
            ))}
          </ul>
        </nav>
        <button
          onClick={() => {
            setIsSidebarOpen(false);
            onLogout();
          }}
          className="mt-auto flex items-center justify-center font-bold px-4 py-2 text-red-600 transition-colors hover:bg-red-100"
        >
          <span>Logout</span>
        </button>
      </aside>
    </>
  );
}
