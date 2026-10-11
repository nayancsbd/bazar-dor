import React from "react";
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="w-full min-h-[60vh] flex flex-col items-center justify-center text-center px-4 py-16">
      <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-emerald-50 text-[#0f8b44] flex items-center justify-center text-4xl sm:text-5xl mb-6 shadow-2xs">
        🔍
      </div>

      <span className="text-xs sm:text-sm font-bold text-emerald-700 tracking-wider uppercase mb-2">
        ত্রুটি ৪০৪
      </span>

      <h1 className="text-2xl sm:text-4xl font-extrabold text-gray-900 tracking-tight mb-3">
        পৃষ্ঠাটি খুঁজে পাওয়া যায়নি
      </h1>

      <p className="text-xs sm:text-sm text-gray-500 max-w-md leading-relaxed mb-8">
        আপনি যে পৃষ্ঠাটি খুঁজছেন তা হয়তো স্থানান্তরিত হয়েছে, মুছে ফেলা হয়েছে অথবা লিংকটি সঠিক নয়।
      </p>

      <Link
        href="/"
        className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#0f8b44] hover:bg-[#0c7a3b] text-white font-semibold text-sm transition-all duration-200 shadow-2xs active:scale-95"
      >
        <span>←</span>
        <span>হোম পেজে ফিরে যান</span>
      </Link>
    </div>
  );
}
