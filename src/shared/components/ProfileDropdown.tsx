"use client";
import { useState, useRef, useEffect } from "react";
import { User, LogOut, Settings, Shield } from "lucide-react";
import { User as UserType } from "../type/TAuth";

interface ProfileDropdownProps {
  user: UserType | null;
  logout: () => void;
  isAdmin: boolean;
}

const ProfileDropdown = ({ user, logout, isAdmin }: ProfileDropdownProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleLogout = () => {
    setIsOpen(false);
    logout();
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`
          flex items-center gap-3 px-4 py-2  backdrop-blur-sm
          text-white transition-all duration-200 hover:border-blue-300
          ${isOpen ? "" : ""}
        `}
      >
        <div className="w-8 h-8 bg-blue-300  rounded-full flex items-center justify-center">
          <User size={18} className="text-black font-bold" />
        </div>

        <span className="font-medium text-sm">
          {user?.name || user?.email || "Username"}
        </span>

        <svg
          className={`w-4 h-4 transition-transform duration-200 ${
            isOpen ? "rotate-180" : ""
          }`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </button>

      {isOpen && (
        <div className="absolute -right-4 mt-2 w-[120%] bg-blue-900/95 backdrop-blur-md border-2 border-dashed border-blue-400 rounded-lg shadow-xl z-50">
          <div className="py-2">
            <div className="px-4 py-3 border-b border-blue-400/30">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-blue-300 rounded-full flex items-center justify-center overflow-hidden">
                  <User
                    size={20}
                    className="text-black font-bold rounded-full"
                  />
                </div>
                <div>
                  <p className="text-white font-medium text-sm">
                    {user?.name || "User"}
                  </p>
                  <p className="text-blue-200 text-xs">
                    {user?.email || "user@example.com"}
                  </p>
                </div>
              </div>
            </div>

            {/* Menu Items */}
            <div className="py-1">
              <button className="w-full px-4 py-2 text-left text-white hover:bg-blue-800/50 transition-colors duration-150 flex items-center gap-3">
                <User size={16} />
                <span className="text-sm">My Profile</span>
              </button>

              <button className="w-full px-4 py-2 text-left text-white hover:bg-blue-800/50 transition-colors duration-150 flex items-center gap-3">
                <Settings size={16} />
                <span className="text-sm">Settings</span>
              </button>

              {isAdmin && (
                <button className="w-full px-4 py-2 text-left text-white hover:bg-blue-800/50 transition-colors duration-150 flex items-center gap-3">
                  <Shield size={16} />
                  <span className="text-sm">Admin Panel</span>
                </button>
              )}
            </div>

            {/* Logout */}
            <div className="border-t border-blue-400/30 pt-1">
              <button
                onClick={handleLogout}
                className="w-full px-4 py-2 text-left text-red-300 hover:bg-red-900/30 transition-colors duration-150 flex items-center gap-3"
              >
                <LogOut size={16} />
                <span className="text-sm">Sign Out</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfileDropdown;
