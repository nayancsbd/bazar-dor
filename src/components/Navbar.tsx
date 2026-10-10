"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { getBengaliDate } from "@/lib/bengali";
import Navlinks from "./Navlinks";
import PriceTicker from "./PriceTicker";

interface NavbarProps {
  dateText?: string;
}

const Navbar: React.FC<NavbarProps> = ({ dateText }) => {
  const [currentDate, setCurrentDate] = useState<string>(
    dateText || "মঙ্গলবার, ৬ অক্টোবর, ২০২৬"
  );

  useEffect(() => {
    if (!dateText) {
      setCurrentDate(getBengaliDate());
    }
  }, [dateText]);

  return (
    <header className="w-full bg-white border-b border-gray-100 shadow-[0_1px_3px_rgba(0,0,0,0.03)] sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16 sm:h-20 gap-4">
          <Link href="/" className="flex items-center gap-2.5 sm:gap-3 group shrink-0">
            <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-[#0f8b44] flex items-center justify-center text-white text-lg sm:text-xl shadow-xs transition-transform group-hover:scale-105">
              🛒
            </div>
            <div className="flex flex-col">
              <span className="text-lg sm:text-xl font-bold tracking-tight text-gray-900 group-hover:text-emerald-700 transition-colors">
                বাজার দর
              </span>
              <span className="text-xs text-gray-500 font-medium">
                {currentDate}
              </span>
            </div>
          </Link>

          <div className="flex items-center gap-2 sm:gap-3 shrink-0">
            <Link
              href="/signin"
              className="btn btn-ghost btn-xs sm:btn-sm text-gray-700 hover:text-emerald-700 font-medium"
            >
              সাইন ইন
            </Link>
            <Link
              href="/signup"
              className="btn btn-xs sm:btn-sm bg-[#0f8b44] hover:bg-[#0c7a3b] text-white border-none font-medium shadow-2xs"
            >
              সাইন আপ
            </Link>
          </div>
        </div>
      </div>

      <Navlinks />
      <PriceTicker />
    </header>
  );
};

export default Navbar;
