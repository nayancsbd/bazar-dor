"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { getBengaliDate } from "@/lib/bengali";
import { useSession, signOut } from "@/lib/auth-client";
import toast from "react-hot-toast";
import Navlinks from "./Navlinks";
import PriceTicker from "./PriceTicker";

interface NavbarProps {
  dateText?: string;
}

const Navbar: React.FC<NavbarProps> = ({ dateText }) => {
  const router = useRouter();
  const { data: session, isPending } = useSession();
  const [currentDate, setCurrentDate] = useState<string>(
    dateText || "মঙ্গলবার, ৬ অক্টোবর, ২০২৬"
  );

  useEffect(() => {
    if (!dateText) {
      setCurrentDate(getBengaliDate());
    }
  }, [dateText]);

  const handleSignOut = async () => {
    try {
      await signOut();
      toast.success("সফলভাবে লগআউট হয়েছে");
      router.push("/");
      router.refresh();
    } catch {
      toast.error("লগআউট করতে সমস্যা হয়েছে");
    }
  };

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
            {isPending ? (
              <div className="w-20 h-8 rounded-lg bg-gray-100 animate-pulse" />
            ) : session?.user ? (
              <div className="dropdown dropdown-end">
                <div
                  tabIndex={0}
                  role="button"
                  className="flex items-center gap-2 py-1.5 px-2.5 sm:px-3 rounded-full hover:bg-gray-100 transition-colors cursor-pointer select-none border border-transparent hover:border-gray-200"
                >
                  {session.user.image ? (
                    <img
                      src={session.user.image}
                      alt={session.user.name || "User"}
                      className="w-8 h-8 rounded-full object-cover border border-emerald-200"
                    />
                  ) : (
                    <div className="w-8 h-8 rounded-full bg-[#0f8b44] text-white flex items-center justify-center font-bold text-xs shadow-2xs">
                      {session.user.name
                        ? session.user.name.charAt(0).toUpperCase()
                        : "👤"}
                    </div>
                  )}
                  <span className="text-xs sm:text-sm font-semibold text-gray-800 max-w-[120px] truncate">
                    {session.user.name || "ব্যবহারকারী"}
                  </span>
                  <span className="text-xs text-gray-400">▾</span>
                </div>

                <ul
                  tabIndex={0}
                  className="dropdown-content z-50 menu p-2 shadow-lg bg-white rounded-2xl w-52 border border-gray-100 mt-2"
                >
                  <li className="px-3 py-2 border-b border-gray-100 mb-1">
                    <span className="text-xs font-bold text-gray-900 truncate block p-0">
                      {session.user.name}
                    </span>
                    <span className="text-[11px] text-gray-400 truncate block p-0">
                      {session.user.email}
                    </span>
                  </li>
                  <li>
                    <Link
                      href="/profile"
                      className="text-xs sm:text-sm font-medium text-gray-700 hover:text-emerald-700 hover:bg-emerald-50 rounded-xl py-2"
                    >
                      👤 প্রোফাইল
                    </Link>
                  </li>
                  <li>
                    <button
                      type="button"
                      onClick={handleSignOut}
                      className="text-xs sm:text-sm font-medium text-red-600 hover:bg-red-50 rounded-xl py-2"
                    >
                      🚪 লগআউট
                    </button>
                  </li>
                </ul>
              </div>
            ) : (
              <>
                <Link
                  href="/signin"
                  className="text-xs sm:text-sm font-medium text-gray-700 hover:text-emerald-700 px-1 transition-colors"
                >
                  সাইন ইন
                </Link>
                <Link
                  href="/signup"
                  className="px-3.5 sm:px-4 py-1.5 rounded-xl border border-emerald-600 text-emerald-700 hover:bg-emerald-600 hover:text-white font-medium text-xs sm:text-sm transition-all shadow-2xs"
                >
                  সাইন আপ
                </Link>
              </>
            )}
          </div>
        </div>
      </div>

      <Navlinks />
      <PriceTicker />
    </header>
  );
};

export default Navbar;
