import React from "react";
import Link from "next/link";
import { Product } from "@/types";
import { toBengaliNumber, formatUnitBn } from "@/lib/bengali";

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const isUp = product.change?.dir === "up" || product.change?.pct > 0;
  const isDown = product.change?.dir === "down" || product.change?.pct < 0;
  const absPct = Math.abs(product.change?.pct || 0);
  const formattedPct = toBengaliNumber(
    absPct % 1 === 0 ? absPct : absPct.toFixed(1)
  );

  return (
    <Link
      href={`/product/${product.id}`}
      className="group bg-white rounded-2xl p-4 sm:p-5 border border-gray-100 shadow-2xs hover:shadow-md hover:border-emerald-200 transition-all duration-200 flex flex-col justify-between gap-4 cursor-pointer"
    >
      <div className="flex items-start gap-3.5">
        <div className="w-12 h-12 rounded-xl bg-[#f8faf9] flex items-center justify-center text-2xl shrink-0 group-hover:scale-105 transition-transform duration-200">
          <span role="img" aria-label={product.nameBn}>
            {product.image || product.categoryIcon || "🛒"}
          </span>
        </div>

        <div className="flex flex-col min-w-0">
          <h3 className="font-bold text-gray-900 text-sm sm:text-base tracking-tight truncate group-hover:text-emerald-700 transition-colors">
            {product.nameBn}
          </h3>
          <span className="text-xs text-gray-400 font-normal">
            {formatUnitBn(product.unit)}
          </span>
        </div>
      </div>

      <div className="flex items-end justify-between pt-1 border-t border-gray-50">
        <div className="flex flex-col">
          <span className="text-[11px] text-gray-400 font-normal">
            আজকের দাম
          </span>
          <span className="font-bold text-gray-900 text-sm sm:text-base tracking-tight">
            {toBengaliNumber(product.today)} টাকা
          </span>
        </div>

        <span
          className={`inline-flex items-center gap-0.5 px-2 py-0.5 rounded-md text-[11px] sm:text-xs font-semibold ${
            isUp
              ? "text-red-700 bg-red-50"
              : isDown
              ? "text-emerald-700 bg-emerald-50"
              : "text-gray-500 bg-gray-100"
          }`}
        >
          {isUp ? "▲" : isDown ? "▼" : "—"} {formattedPct}%
        </span>
      </div>
    </Link>
  );
};

export default ProductCard;
