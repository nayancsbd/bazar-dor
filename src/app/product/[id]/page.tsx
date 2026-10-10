import React from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getProductById, getProducts, calculatePriceSummary } from "@/lib/api";
import { toBengaliNumber, formatUnitBn } from "@/lib/bengali";

interface ProductPageProps {
  params: Promise<{ id: string }>;
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { id } = await params;
  let product = await getProductById(id);

  if (!product) {
    const all = await getProducts().catch(() => []);
    product = all.find((p) => String(p.id) === id || p.slug === id) ?? null;
  }

  if (!product) {
    notFound();
  }

  const isUp = product.change?.dir === "up" || (product.change?.pct ?? 0) > 0;
  const isDown = product.change?.dir === "down" || (product.change?.pct ?? 0) < 0;
  const absPct = Math.abs(product.change?.pct || 0);
  const formattedPct = toBengaliNumber(
    absPct % 1 === 0 ? absPct : absPct.toFixed(1)
  );

  const summary = calculatePriceSummary(product.markets || []);

  return (
    <div className="w-full max-w-4xl mx-auto py-6 flex flex-col gap-8">
      <Link
        href="/"
        className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-medium text-emerald-700 hover:text-emerald-800 transition-colors w-fit"
      >
        <span>←</span>
        <span>হোম পেজে ফিরে যান</span>
      </Link>

      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-gray-100 shadow-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
        <div className="flex items-center gap-4 sm:gap-6">
          <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-emerald-50/60 flex items-center justify-center text-3xl sm:text-4xl shrink-0">
            <span role="img" aria-label={product.nameBn}>
              {product.image || product.categoryIcon || "🛒"}
            </span>
          </div>

          <div className="flex flex-col gap-1">
            <div className="inline-flex items-center gap-2">
              <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-gray-100 text-gray-700">
                {product.categoryNameBn || product.category}
              </span>
              <span className="text-xs text-gray-400">
                {formatUnitBn(product.unit)}
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900 tracking-tight">
              {product.nameBn}
            </h1>
          </div>
        </div>

        <div className="flex flex-col items-start sm:items-end gap-1">
          <span className="text-xs text-gray-400">আজকের দর</span>
          <div className="flex items-center gap-2">
            <span className="text-2xl sm:text-3xl font-black text-gray-900">
              {toBengaliNumber(product.today)} টাকা
            </span>
            <span
              className={`inline-flex items-center gap-0.5 px-2 py-0.5 rounded-md text-xs font-bold ${
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
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white rounded-2xl p-4 sm:p-5 border border-gray-100 shadow-2xs flex flex-col gap-1">
          <span className="text-xs text-gray-400">সর্বনিম্ন দাম</span>
          <span className="text-lg sm:text-xl font-bold text-gray-900">
            {toBengaliNumber(summary.min)} টাকা
          </span>
        </div>

        <div className="bg-white rounded-2xl p-4 sm:p-5 border border-gray-100 shadow-2xs flex flex-col gap-1">
          <span className="text-xs text-gray-400">সর্বোচ্চ দাম</span>
          <span className="text-lg sm:text-xl font-bold text-gray-900">
            {toBengaliNumber(summary.max)} টাকা
          </span>
        </div>

        <div className="bg-white rounded-2xl p-4 sm:p-5 border border-gray-100 shadow-2xs flex flex-col gap-1">
          <span className="text-xs text-gray-400">গড় দাম</span>
          <span className="text-lg sm:text-xl font-bold text-gray-900">
            {toBengaliNumber(summary.avg)} টাকা
          </span>
        </div>
      </div>

      {product.markets && product.markets.length > 0 && (
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-gray-100 shadow-xs flex flex-col gap-4">
          <h2 className="text-lg sm:text-xl font-bold text-gray-900 tracking-tight">
            বাজারভিত্তিক আজকের দাম
          </h2>

          <div className="overflow-x-auto">
            <table className="table w-full">
              <thead>
                <tr className="text-xs text-gray-400 border-b border-gray-100">
                  <th className="font-medium">বাজারের নাম</th>
                  <th className="font-medium">বিভাগ</th>
                  <th className="font-medium text-right">সর্বনিম্ন</th>
                  <th className="font-medium text-right">সর্বোচ্চ</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50 text-xs sm:text-sm text-gray-800">
                {product.markets.map((m, idx) => (
                  <tr key={`${m.market}-${idx}`} className="hover:bg-gray-50/50">
                    <td className="font-semibold text-gray-900">{m.market}</td>
                    <td className="text-gray-500">{m.division}</td>
                    <td className="text-right">{toBengaliNumber(m.min)} টাকা</td>
                    <td className="text-right font-medium">{toBengaliNumber(m.max)} টাকা</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
