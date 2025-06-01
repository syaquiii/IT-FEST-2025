"use client";
import { cn } from "@/shared/utils/cn";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { navItems } from "../data/nav-items";
import { AdminProfile } from "./AdminProfile";
import { useState } from "react";

export default function Sidebar() {
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
          imageUrl="#"
          email="dummy@mail.com"
          username="admin mangujo"
        />
        <nav>
          <ul className="space-y-6 mt-10 px-6">
            {navItems.map((item, idx) => (
              <li key={idx}>
                <Link
                  href={item.path}
                  onClick={() => setIsSidebarOpen(false)}
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
            ))}
          </ul>
        </nav>
        <Link
          href="/"
          onClick={() => setIsSidebarOpen(false)}
          className="mt-auto flex items-center justify-center font-bold px-4 py-2 text-red-600 transition-colors"
        >
          <span>Logout</span>
        </Link>
      </aside>
    </>
  );
}
