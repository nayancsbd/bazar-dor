"use client";

import React, { useState } from "react";
import Link from "next/link";

export interface NavCategory {
  id: string;
  name: string;
  icon: string;
  href: string;
}

export const CATEGORIES: NavCategory[] = [
  { id: "rice", name: "চাল", icon: "🍚", href: "#rice" },
  { id: "pulses", name: "ডাল", icon: "🫘", href: "#pulses" },
  { id: "oil", name: "তেল", icon: "🛢️", href: "#oil" },
  { id: "vegetables", name: "সবজি", icon: "🥬", href: "#vegetables" },
  { id: "fish", name: "মাছ", icon: "🐟", href: "#fish" },
  { id: "meat", name: "মাংস", icon: "🍗", href: "#meat" },
  { id: "dairy", name: "ডিম-দুধ", icon: "🥛", href: "#dairy" },
  { id: "spices", name: "মসলা", icon: "🌶️", href: "#spices" },
];

interface NavlinksProps {
  activeCategory?: string;
  onSelectCategory?: (id: string) => void;
}

const Navlinks: React.FC<NavlinksProps> = ({
  activeCategory,
  onSelectCategory,
}) => {
  const [selected, setSelected] = useState<string>(activeCategory || "rice");

  const handleClick = (catId: string) => {
    setSelected(catId);
    if (onSelectCategory) {
      onSelectCategory(catId);
    }
  };

  return (
    <nav
      aria-label="Categories Navigation"
      className="w-full bg-[#fcfdfd] border-b border-gray-100/90 shadow-[0_2px_4px_rgba(0,0,0,0.015)]"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-start md:justify-center overflow-x-auto scrollbar-none py-2.5 gap-2 sm:gap-4 md:gap-8">
          {CATEGORIES.map((cat) => {
            const isActive = selected === cat.id;

            return (
              <button
                key={cat.id}
                type="button"
                onClick={() => handleClick(cat.id)}
                className={`group flex items-center gap-1.5 sm:gap-2 px-3 py-1.5 rounded-full text-xs sm:text-sm font-medium transition-all duration-200 cursor-pointer shrink-0 select-none ${
                  isActive
                    ? "text-emerald-800 bg-emerald-50/90 shadow-xs font-semibold ring-1 ring-emerald-200/60"
                    : "text-gray-600 hover:text-emerald-700 hover:bg-gray-100/70"
                }`}
              >
                <span
                  className="text-base sm:text-lg transition-transform duration-200 group-hover:scale-110"
                  role="img"
                  aria-label={cat.name}
                >
                  {cat.icon}
                </span>
                <span className="tracking-wide">{cat.name}</span>
              </button>
            );
          })}
        </div>
      </div>
    </nav>
  );
};

export default Navlinks;
