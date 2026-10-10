"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import { Product, Category, SortOption } from "@/types";
import { parseBengaliNumber, toBengaliNumber } from "@/lib/bengali";
import ProductCard from "./ProductCard";

interface CategoryViewProps {
  categorySlug: string;
  category: Category | null;
  initialProducts: Product[];
}

const CategoryView: React.FC<CategoryViewProps> = ({
  categorySlug,
  category,
  initialProducts,
}) => {
  const [sortBy, setSortBy] = useState<SortOption>("default");

  const sortedProducts = useMemo(() => {
    if (sortBy === "price_asc") {
      return [...initialProducts].sort((a, b) => {
        const priceA = parseBengaliNumber(a.today);
        const priceB = parseBengaliNumber(b.today);
        return priceA - priceB;
      });
    }

    if (sortBy === "price_desc") {
      return [...initialProducts].sort((a, b) => {
        const priceA = parseBengaliNumber(a.today);
        const priceB = parseBengaliNumber(b.today);
        return priceB - priceA;
      });
    }

    return initialProducts;
  }, [initialProducts, sortBy]);

  if (!initialProducts || initialProducts.length === 0) {
    return (
      <div className="w-full py-16 flex flex-col items-center justify-center text-center">
        <div className="w-20 h-20 rounded-full bg-emerald-50 flex items-center justify-center text-4xl mb-6 shadow-2xs">
          🔍
        </div>

        <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900 tracking-tight mb-2">
          কোন পণ্য পাওয়া যায়নি
        </h1>

        <p className="text-sm text-gray-500 max-w-md mb-8">
          এই ক্যাটাগরিতে বর্তমানে কোনো পণ্য তালিকাভুক্ত নেই অথবা ক্যাটাগরিটি সঠিক নয়।
        </p>

        <Link
          href="/"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#0f8b44] hover:bg-[#0c7a3b] text-white font-semibold text-sm transition-all duration-200 shadow-sm active:scale-95"
        >
          <span>←</span>
          <span>হোম পেজে ফিরে যান</span>
        </Link>
      </div>
    );
  }

  const categoryTitle = category?.nameBn || initialProducts[0]?.categoryNameBn || categorySlug;
  const categoryIcon = category?.icon || initialProducts[0]?.categoryIcon || "🛒";

  return (
    <div className="w-full flex flex-col gap-8">
      <div className="flex items-center justify-between">
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-medium text-emerald-700 hover:text-emerald-800 transition-colors"
        >
          <span>←</span>
          <span>হোম পেজে ফিরে যান</span>
        </Link>
      </div>

      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-gray-100 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-6">
        <div className="flex items-center gap-4 sm:gap-5">
          <div className="w-16 h-16 rounded-2xl bg-emerald-50/70 flex items-center justify-center text-3xl sm:text-4xl shadow-2xs shrink-0">
            <span role="img" aria-label={categoryTitle}>
              {categoryIcon}
            </span>
          </div>

          <div className="flex flex-col gap-1">
            <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900 tracking-tight">
              {categoryTitle}
            </h1>
            <p className="text-xs sm:text-sm text-gray-500">
              মোট {toBengaliNumber(sortedProducts.length)}টি পণ্য তালিকাভুক্ত
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <label htmlFor="sort-select" className="text-xs sm:text-sm font-medium text-gray-500 whitespace-nowrap">
            সাজান:
          </label>
          <select
            id="sort-select"
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as SortOption)}
            className="select select-bordered select-sm sm:select-md rounded-xl bg-white border-gray-200 text-xs sm:text-sm text-gray-800 font-medium focus:outline-hidden focus:ring-2 focus:ring-emerald-500/30"
          >
            <option value="default">ডিফল্ট</option>
            <option value="price_asc">দাম: কম থেকে বেশি</option>
            <option value="price_desc">দাম: বেশি থেকে কম</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-5">
        {sortedProducts.map((product) => (
          <ProductCard key={`cat-${product.id}`} product={product} />
        ))}
      </div>
    </div>
  );
};

export default CategoryView;
