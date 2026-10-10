"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { getBengaliDate } from "@/lib/bengali";

interface HeroProps {
  dateText?: string;
}

const Hero: React.FC<HeroProps> = ({ dateText }) => {
  const [currentDate, setCurrentDate] = useState<string>(
    dateText || "মঙ্গলবার, ৬ অক্টোবর, ২০২৬"
  );
  const [imageError, setImageError] = useState(false);

  useEffect(() => {
    if (!dateText) {
      setCurrentDate(getBengaliDate());
    }
  }, [dateText]);

  return (
    <section className="w-full my-6 sm:my-8">
      <div className="bg-white border border-gray-100 rounded-3xl p-6 sm:p-10 lg:p-12 shadow-xs flex flex-col md:flex-row items-center justify-between gap-8">
        <div className="flex-1 flex flex-col items-start text-left">
          <div className="inline-flex items-center bg-[#eaf8ee] text-[#16894a] px-3.5 py-1 rounded-full text-xs font-semibold mb-4 border border-[#cbeed4]">
            {currentDate}
          </div>

          <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-gray-900 tracking-tight leading-tight mb-3">
            আজকের বাজারের দাম এক নজরে
          </h1>

          <p className="text-xs sm:text-sm text-gray-600 leading-relaxed max-w-xl mb-6">
            চাল, ডাল, তেল, সবজি, মাছ, মাংস, ডিম ও মসলার দাম — বাজারভিত্তিক বিস্তারিত, গড়, সর্বনিম্ন-সর্বোচ্চ এবং দামের পরিবর্তন এক জায়গায়।
          </p>

          <a
            href="#সব-পণ্য"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl border-2 border-emerald-600 text-emerald-700 hover:bg-emerald-600 hover:text-white font-semibold text-sm transition-all duration-200 shadow-2xs hover:shadow-xs active:scale-95 cursor-pointer"
          >
            <span>সব পণ্য দেখুন</span>
            <span>↓</span>
          </a>
        </div>

        <div className="w-full md:w-auto flex justify-center items-center shrink-0">
          {!imageError ? (
            <div className="relative w-64 h-52 sm:w-80 sm:h-64 transition-transform duration-300 hover:scale-105">
              <Image
                src="/bazar-hero.png"
                alt="বাজার দর"
                fill
                className="object-contain"
                priority
                sizes="(max-width: 640px) 256px, 320px"
                onError={() => setImageError(true)}
              />
            </div>
          ) : (
            <div className="w-64 h-52 sm:w-80 sm:h-64 flex items-center justify-center bg-emerald-50/50 rounded-2xl p-4">
              <svg
                viewBox="0 0 200 160"
                className="w-full h-full text-emerald-600"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <ellipse cx="100" cy="140" rx="70" ry="15" fill="#e5e7eb" />
                <path
                  d="M40 70 L160 70 L145 130 L55 130 Z"
                  fill="#8B5A2B"
                  stroke="#6B4423"
                  strokeWidth="3"
                />
                <path
                  d="M50 70 L60 130 M75 70 L80 130 M100 70 L100 130 M125 70 L120 130 M150 70 L140 130"
                  stroke="#5C3A1E"
                  strokeWidth="2"
                />
                <circle cx="80" cy="55" r="22" fill="#EF4444" />
                <circle cx="120" cy="55" r="20" fill="#10B981" />
                <circle cx="100" cy="45" r="18" fill="#F59E0B" />
                <circle cx="140" cy="62" r="16" fill="#8B5CF6" />
                <circle cx="60" cy="62" r="15" fill="#3B82F6" />
              </svg>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default Hero;
