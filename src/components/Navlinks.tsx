"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Category } from "@/types";
import { getCategories } from "@/lib/api";

const DEFAULT_CATEGORIES: Category[] = [
  { id: "chal", slug: "chal", nameBn: "চাল", icon: "🍚" },
  { id: "dal", slug: "dal", nameBn: "ডাল", icon: "🫘" },
  { id: "tel", slug: "tel", nameBn: "তেল", icon: "🛢️" },
  { id: "sobji", slug: "sobji", nameBn: "সবজি", icon: "🥬" },
  { id: "mach", slug: "mach", nameBn: "মাছ", icon: "🐟" },
  { id: "mangsho", slug: "mangsho", nameBn: "মাংস", icon: "🍗" },
  { id: "dim-dui", slug: "dim-dui", nameBn: "ডিম-দুধ", icon: "🥛" },
  { id: "mosla", slug: "mosla", nameBn: "মসলা", icon: "🌶️" },
];

interface NavlinksProps {
  activeCategory?: string;
  onSelectCategory?: (id: string) => void;
}

const Navlinks: React.FC<NavlinksProps> = ({
  activeCategory,
  onSelectCategory,
}) => {
  const pathname = usePathname();
  const [categories, setCategories] = useState<Category[]>(DEFAULT_CATEGORIES);
  const [selected, setSelected] = useState<string>(activeCategory || "");

  useEffect(() => {
    getCategories()
      .then((data) => {
        if (Array.isArray(data) && data.length > 0) {
          setCategories(data);
        }
      })
      .catch(() => {});
  }, []);

  useEffect(() => {
    if (pathname.startsWith("/category/")) {
      const slug = pathname.replace("/category/", "").split("/")[0];
      if (slug) {
        setSelected(slug);
      }
    } else if (activeCategory) {
      setSelected(activeCategory);
    } else {
      setSelected("");
    }
  }, [pathname, activeCategory]);

  const handleClick = (slug: string) => {
    setSelected(slug);
    if (onSelectCategory) {
      onSelectCategory(slug);
    }
  };

  return (
    <nav
      aria-label="Categories Navigation"
      className="w-full bg-[#fcfdfd] border-b border-gray-100/90 shadow-[0_2px_4px_rgba(0,0,0,0.015)]"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-start md:justify-center overflow-x-auto scrollbar-none py-2.5 gap-2 sm:gap-4 md:gap-7">
          {categories.map((cat) => {
            const isActive = selected === cat.slug || selected === cat.id;

            return (
              <Link
                key={cat.id || cat.slug}
                href={`/category/${cat.slug}`}
                onClick={() => handleClick(cat.slug)}
                className={`group flex items-center gap-1.5 sm:gap-2 px-3 py-1.5 rounded-full text-xs sm:text-sm font-medium transition-all duration-200 cursor-pointer shrink-0 select-none ${
                  isActive
                    ? "text-emerald-800 bg-emerald-50 shadow-xs font-semibold ring-1 ring-emerald-300"
                    : "text-gray-600 hover:text-emerald-700 hover:bg-gray-100/70"
                }`}
              >
                <span
                  className="text-base sm:text-lg transition-transform duration-200 group-hover:scale-110"
                  role="img"
                  aria-label={cat.nameBn}
                >
                  {cat.icon}
                </span>
                <span className="tracking-wide">{cat.nameBn}</span>
              </Link>
            );
          })}
        </div>
      </div>
    </nav>
  );
};

export default Navlinks;
