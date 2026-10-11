"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ShoppingCart,
  ChevronDown,
  User as UserIcon,
  Bookmark,
  Settings,
  LogOut,
  LogIn,
  UserPlus,
} from "lucide-react";
import Navlinks from "./Navlinks";
import PriceTicker from "./PriceTicker";
import { getBengaliDate } from "@/lib/bengali";

export interface HeaderProps {
  isLoggedIn?: boolean;
  userName?: string;
  userAvatar?: string;
  dateText?: string;
  onCategorySelect?: (categoryId: string) => void;
  onSignOut?: () => void;
}

const Header: React.FC<HeaderProps> = ({
  isLoggedIn = true,
  userName = "Rezwan",
  userAvatar = "",
  dateText,
  onCategorySelect,
  onSignOut,
}) => {
  const [avatarError, setAvatarError] = useState(false);
  const [currentDate, setCurrentDate] = useState<string>(
    dateText || "মঙ্গলবার, ৬ অক্টোবর, ২০২৬"
  );
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!dateText) {
      setCurrentDate(getBengaliDate());
    }
  }, [dateText]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <header className="w-full bg-white border-b border-gray-100 shadow-[0_1px_3px_rgba(0,0,0,0.03)] sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <Link
            href="/"
            className="flex items-center gap-3.5 group focus:outline-hidden"
          >
            <div className="w-12 h-12 rounded-2xl bg-[#0f8b44] flex items-center justify-center shadow-xs transition-transform duration-200 group-hover:scale-105 group-hover:bg-[#0c7a3b]">
              <ShoppingCart className="w-6 h-6 text-white stroke-[2.2]" />
            </div>

            <div className="flex flex-col">
              <span className="text-xl sm:text-2xl font-bold tracking-tight text-gray-900 group-hover:text-emerald-700 transition-colors">
                বাজার দর
              </span>
              <span className="text-xs text-gray-500 font-medium">
                {currentDate}
              </span>
            </div>
          </Link>

          {isLoggedIn ? (
            <div className="relative" ref={dropdownRef}>
              <button
                type="button"
                onClick={() => setIsDropdownOpen((prev) => !prev)}
                aria-expanded={isDropdownOpen}
                aria-haspopup="true"
                className="flex items-center gap-2.5 p-1.5 pr-2.5 rounded-full hover:bg-gray-100/80 transition-colors duration-150 cursor-pointer focus:outline-hidden focus:ring-2 focus:ring-emerald-500/30"
              >
                <div className="relative w-9 h-9 sm:w-10 sm:h-10 rounded-full overflow-hidden border border-gray-200/90 shadow-2xs bg-emerald-50 flex items-center justify-center">
                  {!avatarError && userAvatar ? (
                    <Image
                      src={userAvatar}
                      alt={userName}
                      fill
                      className="object-cover"
                      sizes="(max-width: 640px) 36px, 40px"
                      priority
                      onError={() => setAvatarError(true)}
                    />
                  ) : (
                    <UserIcon className="w-5 h-5 text-emerald-700" />
                  )}
                </div>

                <span className="text-sm font-semibold text-gray-800">
                  {userName}
                </span>

                <ChevronDown
                  className={`w-4 h-4 text-gray-500 transition-transform duration-200 ${
                    isDropdownOpen ? "rotate-180" : ""
                  }`}
                  aria-hidden="true"
                />
              </button>

              {isDropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-lg border border-gray-100 py-1.5 z-50 animate-in fade-in zoom-in-95 duration-100">
                  <div className="px-4 py-2 border-b border-gray-100">
                    <p className="text-xs text-gray-400">স্বাগতম</p>
                    <p className="text-sm font-semibold text-gray-800 truncate">
                      {userName}
                    </p>
                  </div>

                  <Link
                    href="/profile"
                    onClick={() => setIsDropdownOpen(false)}
                    className="flex items-center gap-2.5 px-4 py-2 text-xs sm:text-sm text-gray-700 hover:bg-emerald-50/80 hover:text-emerald-700 transition-colors"
                  >
                    <UserIcon className="w-4 h-4 text-gray-500" />
                    প্রোফাইল
                  </Link>

                  <Link
                    href="#saved"
                    onClick={() => setIsDropdownOpen(false)}
                    className="flex items-center gap-2.5 px-4 py-2 text-xs sm:text-sm text-gray-700 hover:bg-emerald-50/80 hover:text-emerald-700 transition-colors"
                  >
                    <Bookmark className="w-4 h-4 text-gray-500" />
                    সংরক্ষিত তালিকা
                  </Link>

                  <Link
                    href="#settings"
                    onClick={() => setIsDropdownOpen(false)}
                    className="flex items-center gap-2.5 px-4 py-2 text-xs sm:text-sm text-gray-700 hover:bg-emerald-50/80 hover:text-emerald-700 transition-colors"
                  >
                    <Settings className="w-4 h-4 text-gray-500" />
                    সেটিংস
                  </Link>

                  <div className="border-t border-gray-100 my-1" />

                  <button
                    type="button"
                    onClick={() => {
                      setIsDropdownOpen(false);
                      if (onSignOut) {
                        onSignOut();
                      }
                    }}
                    className="w-full flex items-center gap-2.5 px-4 py-2 text-xs sm:text-sm text-red-600 hover:bg-red-50 transition-colors text-left cursor-pointer"
                  >
                    <LogOut className="w-4 h-4 text-red-500" />
                    সাইন আউট
                  </button>
                </div>
              )}
            </div>
          ) : (
            <div className="flex items-center gap-2 sm:gap-3">
              <Link
                href="/signin"
                className="btn btn-ghost btn-sm text-gray-700 hover:text-emerald-700 flex items-center gap-1.5 font-medium"
              >
                <LogIn className="w-4 h-4" />
                সাইন ইন
              </Link>
              <Link
                href="/signup"
                className="btn btn-sm bg-[#0f8b44] hover:bg-[#0c7a3b] text-white border-none flex items-center gap-1.5 font-medium shadow-2xs"
              >
                <UserPlus className="w-4 h-4" />
                সাইন আপ
              </Link>
            </div>
          )}
        </div>
      </div>

      <Navlinks onSelectCategory={onCategorySelect} />

      <PriceTicker />
    </header>
  );
};

export default Header;