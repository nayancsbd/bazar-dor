"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { Product } from "@/types";
import { toBengaliNumber } from "@/lib/bengali";
import { getProducts } from "@/lib/api";

export interface TickerItemData {
  id: number | string;
  slug: string;
  nameBn: string;
  image: string;
  today: number;
  unit: string;
  change: {
    dir: "up" | "down" | "flat";
    pct: number;
  };
}

const DEFAULT_FALLBACK_ITEMS: TickerItemData[] = [
  {
    id: 1,
    slug: "sorno-machi-chal",
    nameBn: "স্বর্ণমাছি চাল",
    image: "🍚",
    today: 648,
    unit: "কেজি",
    change: { dir: "up", pct: 2.6 },
  },
  {
    id: 2,
    slug: "miniket-chal",
    nameBn: "মিনিকেট চাল",
    image: "🍚",
    today: 99,
    unit: "কেজি",
    change: { dir: "down", pct: 2.9 },
  },
  {
    id: 3,
    slug: "batam-chal",
    nameBn: "বাটাম সাইজ চাল",
    image: "🍚",
    today: 66,
    unit: "কেজি",
    change: { dir: "up", pct: 3.7 },
  },
  {
    id: 4,
    slug: "moshur-dal",
    nameBn: "মসুর ডাল",
    image: "🫘",
    today: 642,
    unit: "কেজি",
    change: { dir: "up", pct: 2.9 },
  },
  {
    id: 5,
    slug: "chhola",
    nameBn: "ছোলা",
    image: "🫘",
    today: 120,
    unit: "কেজি",
    change: { dir: "down", pct: 2.4 },
  },
  {
    id: 6,
    slug: "amon-dal",
    nameBn: "আমন ডাল",
    image: "🫘",
    today: 135,
    unit: "কেজি",
    change: { dir: "up", pct: 1.8 },
  },
  {
    id: 7,
    slug: "tel",
    nameBn: "সয়াবিন তেল",
    image: "🛢️",
    today: 190,
    unit: "লিটার",
    change: { dir: "down", pct: 1.5 },
  },
  {
    id: 8,
    slug: "mach",
    nameBn: "রুই মাছ",
    image: "🐟",
    today: 340,
    unit: "কেজি",
    change: { dir: "up", pct: 3.2 },
  },
];

interface PriceTickerProps {
  initialProducts?: Product[];
}

const formatUnitText = (unit: string): string => {
  const norm = unit.toLowerCase().trim();
  if (norm === "kg" || norm === "কেজি") return "কেজি";
  if (norm === "liter" || norm === "লিটার") return "লিটার";
  if (norm === "dozen" || norm === "ডজন") return "ডজন";
  if (norm === "piece" || norm === "পিস") return "পিস";
  if (norm === "gm" || norm === "গ্রাম") return "গ্রাম";
  return unit;
};

const PriceTicker: React.FC<PriceTickerProps> = ({ initialProducts }) => {
  const [items, setItems] = useState<TickerItemData[]>(
    initialProducts && initialProducts.length > 0
      ? initialProducts
      : DEFAULT_FALLBACK_ITEMS
  );

  useEffect(() => {
    if (!initialProducts || initialProducts.length === 0) {
      getProducts()
        .then((data) => {
          if (Array.isArray(data) && data.length > 0) {
            setItems(data);
          }
        })
        .catch(() => {});
    }
  }, [initialProducts]);

  const displayItems = [...items, ...items];

  return (
    <aside
      aria-label="Price ticker strip"
      className="w-full bg-[#fafbfb] border-y border-gray-100 overflow-hidden select-none py-1.5"
    >
      <div className="flex animate-ticker items-center">
        {displayItems.map((item, index) => {
          const isUp = item.change?.dir === "up" || item.change?.pct > 0;
          const isDown = item.change?.dir === "down" || item.change?.pct < 0;
          const absPct = Math.abs(item.change?.pct || 0);
          const formattedPct = toBengaliNumber(
            absPct % 1 === 0 ? absPct : absPct.toFixed(1)
          );
          const priceBn = toBengaliNumber(item.today);
          const unitBn = formatUnitText(item.unit);

          return (
            <Link
              key={`${item.id}-${item.slug}-${index}`}
              href={`/product/${item.slug}`}
              className="inline-flex items-center gap-1.5 px-4 sm:px-6 py-1 border-r border-gray-200/80 text-xs sm:text-[13px] text-gray-800 font-medium whitespace-nowrap hover:bg-emerald-50/70 hover:text-emerald-800 transition-colors shrink-0"
            >
              <span className="text-sm sm:text-base" role="img" aria-hidden="true">
                {item.image || "🛒"}
              </span>

              <span className="font-medium text-gray-900 tracking-tight">
                {item.nameBn}
              </span>

              <span className="text-gray-600 font-normal">
                {priceBn} টাকা/{unitBn}
              </span>

              <span
                className={`inline-flex items-center gap-0.5 font-semibold text-[11px] sm:text-xs ${
                  isUp
                    ? "text-[#dc2626]"
                    : isDown
                    ? "text-[#16a34a]"
                    : "text-gray-400"
                }`}
              >
                {isUp ? "▲" : isDown ? "▼" : "—"} {formattedPct}%
              </span>
            </Link>
          );
        })}
      </div>
    </aside>
  );
};

export default PriceTicker;
