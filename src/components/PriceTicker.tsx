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
    today: 148,
    unit: "কেজি",
    change: { dir: "up", pct: 2.1 },
  },
  {
    id: 2,
    slug: "miniket-chal",
    nameBn: "মিনিকেট চাল",
    image: "🍚",
    today: 99,
    unit: "কেজি",
    change: { dir: "down", pct: -2.9 },
  },
  {
    id: 3,
    slug: "nazir-chal",
    nameBn: "নাজির চাল",
    image: "🍚",
    today: 74,
    unit: "কেজি",
    change: { dir: "flat", pct: 0 },
  },
  {
    id: 4,
    slug: "batam-size-chal",
    nameBn: "বাটাম সাইজ চাল",
    image: "🍚",
    today: 66,
    unit: "কেজি",
    change: { dir: "up", pct: 3.1 },
  },
  {
    id: 5,
    slug: "masur-dal",
    nameBn: "মসুর ডাল",
    image: "🫘",
    today: 142,
    unit: "কেজি",
    change: { dir: "up", pct: 1.4 },
  },
  {
    id: 7,
    slug: "chhola",
    nameBn: "ছোলা",
    image: "🫘",
    today: 120,
    unit: "কেজি",
    change: { dir: "down", pct: -2.4 },
  },
  {
    id: 8,
    slug: "soyabean-oil",
    nameBn: "আমদানিকৃত তেল",
    image: "🛢️",
    today: 156,
    unit: "লিটার",
    change: { dir: "up", pct: 3.3 },
  },
  {
    id: 15,
    slug: "rui-fish",
    nameBn: "রুই মাছ",
    image: "🐟",
    today: 340,
    unit: "কেজি",
    change: { dir: "up", pct: 4.5 },
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
    let isMounted = true;

    const fetchLivePrices = async () => {
      try {
        const data = await getProducts();
        if (isMounted && Array.isArray(data) && data.length > 0) {
          setItems(data);
        }
      } catch {}
    };

    fetchLivePrices();

    const intervalId = setInterval(fetchLivePrices, 30000);

    const handleVisibilityChange = () => {
      if (document.visibilityState === "visible") {
        fetchLivePrices();
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      isMounted = false;
      clearInterval(intervalId);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, []);

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
              href={`/product/${item.id}`}
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
