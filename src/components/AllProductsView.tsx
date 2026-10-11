"use client";

import React, { useState, useMemo } from "react";
import { Product, SortOption } from "@/types";
import { parseBengaliNumber, toBengaliNumber } from "@/lib/bengali";
import ProductCard from "./ProductCard";

interface AllProductsViewProps {
  products: Product[];
}

export default function AllProductsView({ products }: AllProductsViewProps) {
  const [sortBy, setSortBy] = useState<SortOption>("default");

  const sortedProducts = useMemo(() => {
    if (sortBy === "price_asc") {
      return [...products].sort((a, b) => {
        const priceA = parseBengaliNumber(a.today);
        const priceB = parseBengaliNumber(b.today);
        return priceA - priceB;
      });
    }

    if (sortBy === "price_desc") {
      return [...products].sort((a, b) => {
        const priceA = parseBengaliNumber(a.today);
        const priceB = parseBengaliNumber(b.today);
        return priceB - priceA;
      });
    }

    return products;
  }, [products, sortBy]);

  return (
    <section id="সব-পণ্য" aria-labelledby="all-products-heading" className="w-full flex flex-col gap-4 scroll-mt-28">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 bg-white rounded-2xl p-4 sm:p-5 border border-gray-100 shadow-2xs">
        <div className="flex flex-col gap-1">
          <h2 id="all-products-heading" className="text-lg sm:text-xl font-bold text-gray-900 tracking-tight">
            সব পণ্য
          </h2>
          <p className="text-xs sm:text-sm text-gray-500">
            মোট {toBengaliNumber(sortedProducts.length)}টি নিত্য প্রয়োজনীয় পণ্য
          </p>
        </div>

        <div className="flex items-center gap-2.5 self-end sm:self-auto">
          <label
            htmlFor="home-sort-select"
            className="text-xs sm:text-sm font-medium text-gray-600 whitespace-nowrap"
          >
            সাজান
          </label>
          <select
            id="home-sort-select"
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as SortOption)}
            className="select select-bordered select-sm rounded-xl bg-white border-gray-200 text-xs sm:text-sm text-gray-800 font-medium focus:outline-hidden focus:border-emerald-600 focus:ring-1 focus:ring-emerald-600"
          >
            <option value="default">ডিফল্ট</option>
            <option value="price_asc">দাম: কম থেকে বেশি</option>
            <option value="price_desc">দাম: বেশি থেকে কম</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-5">
        {sortedProducts.map((product) => (
          <ProductCard key={`product-${product.id}`} product={product} />
        ))}
      </div>
    </section>
  );
}
