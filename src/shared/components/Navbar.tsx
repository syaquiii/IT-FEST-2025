"use client";
import { useState } from "react";
import { Navlink } from "../data/navlink";
import Navlist from "./Navlist";
import Hamburger from "hamburger-react";
import { Button } from "./ui/Button";
import useScrollNavbar from "../hooks/useScrollBar";
import { AuthProvider } from "../context/AuthContext";
import { useAuth } from "../hooks/useAuth";
import ProfileDropdown from "./ProfileDropdown";
import Link from "next/link";

const MobileNav = () => {
  const { isAuthenticated, logout } = useAuth();

  return (
    <div className="h-screen w-screen inset-0 fixed top-0 left-0 bg-ourgray z-10 flex flex-col items-center justify-center">
      <ul className="flex flex-col items-center gap-6 mb-8">
        {Navlink.map((item) => (
          <li key={item.id} className="text-white text-lg">
            <Navlist item={item} />
          </li>
        ))}
      </ul>
      <div className="flex flex-col gap-4">
        {isAuthenticated ? (
          <>
            <Button variant={"primary"} size={"small"}>
              Profile
            </Button>
            <Button variant={"secondary"} size={"small"} onClick={logout}>
              Logout
            </Button>
          </>
        ) : (
          <Button variant={"primary"} size={"small"}>
            Daftar
          </Button>
        )}
      </div>
    </div>
  );
};

const NavbarContent = () => {
  const { isVisible } = useScrollNavbar(100, 700);
  const [isOpen, setIsOpen] = useState(false);
  const { isAuthenticated, user, logout, IsAdmin } = useAuth();

  return (
    <>
      <nav
        className={`fixed right-0 left-0 top-0 py-4 z-100 transition-transform duration-300 ${
          isVisible ? "translate-y-0 lg:bg-blue-500" : "-translate-y-full"
        }`}
      >
        <div className="mycontainer items-center lg:flex hidden justify-between">
          <div className="w-1/5 font-robotech text-white text-glow text-5xl mb-2 font-bold">
            <h1>IT FEST</h1>
          </div>
          <ul className="w-3/5 flex justify-center gap-10">
            {Navlink.map((item) => (
              <Navlist key={item.id} item={item} />
            ))}
          </ul>
          <div className="w-1/5 flex justify-end">
            {isAuthenticated ? (
              <ProfileDropdown
                user={user}
                logout={logout}
                isAdmin={IsAdmin ?? false}
              />
            ) : (
              <Link href={"/login"}>
                <Button variant={"primary"} size={"small"}>
                  Masuk
                </Button>
              </Link>
            )}
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

      {isOpen && <MobileNav />}
    </>
  );
};

const Navbar = () => {
  return (
    <AuthProvider>
      <NavbarContent />
    </AuthProvider>
  );
};

export default Navbar;
