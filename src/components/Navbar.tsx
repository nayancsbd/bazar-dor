"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { getBengaliDate } from "@/lib/bengali";
import { useSession, signOut } from "@/lib/auth-client";
import toast from "react-hot-toast";
import Navlinks from "./Navlinks";
import PriceTicker from "./PriceTicker";
import UserAvatar from "./UserAvatar";

interface NavbarProps {
  dateText?: string;
}

const Navbar: React.FC<NavbarProps> = ({ dateText }) => {
  const router = useRouter();
  const { data: session, isPending } = useSession();
  const [currentDate, setCurrentDate] = useState<string>(
    dateText || "মঙ্গলবার, ৬ অক্টোবর, ২০২৬"
  );
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

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
            <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-[#0f8b44] flex items-center justify-center text-white shadow-xs transition-transform group-hover:scale-105">
              <svg
                className="w-5 h-5 sm:w-5.5 sm:h-5.5 text-white"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <circle cx="9" cy="21" r="1.5" fill="currentColor" />
                <circle cx="20" cy="21" r="1.5" fill="currentColor" />
                <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
              </svg>
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
              <div className="relative" ref={menuRef}>
                <button
                  type="button"
                  onClick={() => setMenuOpen((prev) => !prev)}
                  className="flex items-center gap-2 sm:gap-2.5 py-1 px-1.5 sm:px-2 rounded-full hover:bg-gray-100 transition-colors cursor-pointer select-none"
                  aria-expanded={menuOpen}
                >
                  <UserAvatar
                    image={session.user.image}
                    name={session.user.name}
                    className="w-9 h-9 sm:w-10 sm:h-10 rounded-full"
                    shape="rounded-full"
                  />
                  <span className="text-xs sm:text-sm font-semibold text-gray-800 max-w-[120px] sm:max-w-[160px] truncate">
                    {session.user.name || "ব্যবহারকারী"}
                  </span>
                  <span className="text-xs text-gray-400">▾</span>
                </button>

                {menuOpen && (
                  <div className="absolute right-0 top-full mt-2 w-56 rounded-2xl bg-white border border-gray-100 shadow-xl py-2 z-50 animate-in fade-in zoom-in-95 duration-100">
                    <div className="px-4 py-2.5 border-b border-gray-100 mb-1">
                      <p className="text-xs font-bold text-gray-900 truncate">
                        {session.user.name}
                      </p>
                      <p className="text-[11px] text-gray-500 truncate mt-0.5">
                        {session.user.email}
                      </p>
                    </div>

                    <Link
                      href="/profile"
                      onClick={() => setMenuOpen(false)}
                      className="flex items-center gap-2.5 px-4 py-2 text-xs sm:text-sm font-medium text-gray-700 hover:bg-emerald-50 hover:text-emerald-700 transition-colors"
                    >
                      <span className="text-base">👤</span>
                      <span>আমার প্রোফাইল</span>
                    </Link>

                    <button
                      type="button"
                      onClick={() => {
                        setMenuOpen(false);
                        handleSignOut();
                      }}
                      className="w-full flex items-center gap-2.5 px-4 py-2 text-xs sm:text-sm font-medium text-red-600 hover:bg-red-50 transition-colors text-left cursor-pointer"
                    >
                      <span className="text-base">🚪</span>
                      <span>লগআউট</span>
                    </button>
                  </div>
                )}
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
