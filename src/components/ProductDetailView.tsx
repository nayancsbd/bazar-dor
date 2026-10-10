"use client";

import React, { useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Product } from "@/types";
import { calculatePriceSummary } from "@/lib/api";
import { toBengaliNumber, formatUnitBn } from "@/lib/bengali";
import { useSession } from "@/lib/auth-client";
import toast from "react-hot-toast";

interface ProductDetailViewProps {
  product: Product;
}

export default function ProductDetailView({ product }: ProductDetailViewProps) {
  const router = useRouter();
  const { data: session, isPending } = useSession();

  useEffect(() => {
    if (!isPending && !session?.user) {
      toast.error("পণ্য বিবরণ দেখতে অনুগ্রহ করে সাইন ইন করুন");
      router.replace(
        `/signin?callbackUrl=${encodeURIComponent(`/product/${product.id}`)}&unauthorized=true`
      );
    }
  }, [isPending, session, product.id, router]);

  if (isPending || !session?.user) {
    return (
      <div className="w-full max-w-5xl mx-auto py-8 sm:py-12 flex flex-col gap-8 animate-pulse">
        <div className="w-36 h-5 bg-gray-200 rounded-md" />

        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-gray-100 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <div className="flex items-center gap-5">
            <div className="w-20 h-20 bg-gray-200 rounded-2xl shrink-0" />
            <div className="flex flex-col gap-2.5">
              <div className="w-24 h-5 bg-gray-200 rounded-full" />
              <div className="w-48 h-8 bg-gray-200 rounded-lg" />
              <div className="w-64 h-4 bg-gray-200 rounded-md" />
            </div>
          </div>
          <div className="w-36 h-12 bg-gray-200 rounded-xl" />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="h-24 bg-white rounded-2xl border border-gray-100 p-5" />
          <div className="h-24 bg-white rounded-2xl border border-gray-100 p-5" />
          <div className="h-24 bg-white rounded-2xl border border-gray-100 p-5" />
        </div>

        <div className="h-64 bg-white rounded-3xl border border-gray-100 p-6" />
      </div>
    );
  }

  const isUp = product.change?.dir === "up" || (product.change?.pct ?? 0) > 0;
  const isDown = product.change?.dir === "down" || (product.change?.pct ?? 0) < 0;
  const absPct = Math.abs(product.change?.pct || 0);
  const formattedPct = toBengaliNumber(
    absPct % 1 === 0 ? absPct : absPct.toFixed(1)
  );

  const summary = calculatePriceSummary(product.markets || []);

  const summaryDescription = `আজকের বাজারে ${product.nameBn}-এর বর্তমান দর ${toBengaliNumber(product.today)} টাকা/${formatUnitBn(product.unit)}। পূর্ববর্তী দিনের তুলনায় দর ${formattedPct}% ${isUp ? "বৃদ্ধি পেয়েছে" : isDown ? "কমেছে" : "অপরিবর্তিত রয়েছে"}। দেশের বিভিন্ন পাইকারি ও খুচরা বাজারে গড় দর ${toBengaliNumber(summary.avg)} টাকা।`;

  return (
    <div className="w-full max-w-5xl mx-auto py-6 sm:py-8 flex flex-col gap-8">
      <div className="flex items-center justify-between">
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-emerald-700 hover:text-emerald-800 transition-colors"
        >
          <span>←</span>
          <span>হোম পেজে ফিরে যান</span>
        </Link>

        {product.category && (
          <Link
            href={`/category/${product.category}`}
            className="text-xs sm:text-sm text-gray-500 hover:text-emerald-700 transition-colors"
          >
            {product.categoryNameBn || product.category} ক্যাটাগরি দেখুন →
          </Link>
        )}
      </div>

      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-gray-100 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="flex items-start sm:items-center gap-4 sm:gap-6">
          <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-[#eaf8ee] text-3xl sm:text-4xl flex items-center justify-center shrink-0 shadow-2xs">
            <span role="img" aria-label={product.nameBn}>
              {product.image || product.categoryIcon || "🛒"}
            </span>
          </div>

          <div className="flex flex-col gap-1.5">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="inline-flex items-center gap-1 text-xs font-semibold px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200/60">
                <span>{product.categoryIcon || "📁"}</span>
                <span>{product.categoryNameBn || product.category}</span>
              </span>
              <span className="text-xs font-medium text-gray-500 bg-gray-100 px-2 py-0.5 rounded-md">
                {formatUnitBn(product.unit)}
              </span>
            </div>

            <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900 tracking-tight">
              {product.nameBn}
            </h1>

            <p className="text-xs sm:text-sm text-gray-500 leading-relaxed max-w-xl">
              {summaryDescription}
            </p>
          </div>
        </div>

        <div className="flex flex-col items-start md:items-end gap-1.5 shrink-0 pt-4 md:pt-0 border-t md:border-t-0 border-gray-100">
          <span className="text-xs text-gray-400 font-medium">আজকের বাজার দর</span>
          <div className="flex items-center gap-2.5">
            <span className="text-2xl sm:text-3xl font-black text-gray-900 tracking-tight">
              {toBengaliNumber(product.today)} টাকা
            </span>
            <span
              className={`inline-flex items-center gap-0.5 px-2.5 py-1 rounded-lg text-xs font-bold ${isUp
                  ? "text-red-700 bg-red-50 border border-red-100"
                  : isDown
                    ? "text-emerald-700 bg-emerald-50 border border-emerald-100"
                    : "text-gray-600 bg-gray-100"
                }`}
            >
              {isUp ? "▲" : isDown ? "▼" : "—"} {formattedPct}%
            </span>
          </div>

          <div className="flex items-center gap-3 text-[11px] text-gray-400 mt-1">
            <span>গতকাল: {toBengaliNumber(product.yesterday)} টাকা</span>
            <span>•</span>
            <span>গত সপ্তাহ: {toBengaliNumber(product.lastWeek)} টাকা</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-2xs flex flex-col gap-1.5 transition-all hover:border-emerald-200">
          <span className="text-xs text-gray-400 font-medium">সর্বনিম্ন দাম</span>
          <div className="flex items-baseline gap-1">
            <span className="text-2xl font-black text-gray-900 tracking-tight">
              {toBengaliNumber(summary.min)}
            </span>
            <span className="text-xs text-gray-500 font-medium">টাকা/{formatUnitBn(product.unit)}</span>
          </div>
          <span className="text-[11px] text-emerald-600 font-medium">সবচেয়ে কম মূল্যের বাজার</span>
        </div>

        <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-2xs flex flex-col gap-1.5 transition-all hover:border-emerald-200">
          <span className="text-xs text-gray-400 font-medium">সর্বোচ্চ দাম</span>
          <div className="flex items-baseline gap-1">
            <span className="text-2xl font-black text-gray-900 tracking-tight">
              {toBengaliNumber(summary.max)}
            </span>
            <span className="text-xs text-gray-500 font-medium">টাকা/{formatUnitBn(product.unit)}</span>
          </div>
          <span className="text-[11px] text-amber-600 font-medium">সবচেয়ে বেশি মূল্যের বাজার</span>
        </div>

        <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-2xs flex flex-col gap-1.5 transition-all hover:border-emerald-200">
          <span className="text-xs text-gray-400 font-medium">গড় দাম</span>
          <div className="flex items-baseline gap-1">
            <span className="text-2xl font-black text-[#0f8b44] tracking-tight">
              {toBengaliNumber(summary.avg)}
            </span>
            <span className="text-xs text-gray-500 font-medium">টাকা/{formatUnitBn(product.unit)}</span>
          </div>
          <span className="text-[11px] text-gray-400 font-medium">সারাদেশের বাজারের গড় দর</span>
        </div>
      </div>

      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-gray-100 shadow-xs flex flex-col gap-5">
        <div className="flex flex-col gap-1">
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900 tracking-tight">
            বাজারভিত্তিক আজকের দাম
          </h2>
          <p className="text-xs sm:text-sm text-gray-500">
            দেশের প্রধান প্রধান বাজারে {product.nameBn}-এর আজকের সর্বনিম্ন ও সর্বোচ্চ মূল্যের তালিকা
          </p>
        </div>

        {product.markets && product.markets.length > 0 ? (
          <div className="overflow-x-auto rounded-2xl border border-gray-100">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-[#f9fbf9] border-b border-gray-100 text-xs text-gray-500">
                  <th className="py-3.5 px-4 sm:px-6 font-semibold">বাজারের নাম</th>
                  <th className="py-3.5 px-4 font-semibold">বিভাগ</th>
                  <th className="py-3.5 px-4 font-semibold text-right">সর্বনিম্ন দর</th>
                  <th className="py-3.5 px-4 font-semibold text-right">সর্বোচ্চ দর</th>
                  <th className="py-3.5 px-4 sm:px-6 font-semibold text-right">দর সীমা</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 text-xs sm:text-sm text-gray-800">
                {product.markets.map((m, idx) => (
                  <tr
                    key={`${m.market}-${idx}`}
                    className="hover:bg-emerald-50/30 transition-colors"
                  >
                    <td className="py-3.5 px-4 sm:px-6 font-semibold text-gray-900">
                      {m.market}
                    </td>
                    <td className="py-3.5 px-4">
                      <span className="inline-block px-2 py-0.5 rounded-md bg-gray-100 text-gray-600 text-xs font-medium">
                        {m.division}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 text-right font-medium text-emerald-700">
                      {toBengaliNumber(m.min)} টাকা
                    </td>
                    <td className="py-3.5 px-4 text-right font-medium text-amber-700">
                      {toBengaliNumber(m.max)} টাকা
                    </td>
                    <td className="py-3.5 px-4 sm:px-6 text-right font-semibold text-gray-900">
                      {toBengaliNumber(m.min)} - {toBengaliNumber(m.max)} টাকা
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="py-8 text-center text-gray-400 text-sm">
            এই পণ্যের জন্য বর্তমানে কোনো আঞ্চলিক বাজার তথ্য পাওয়া যায়নি।
          </div>
        )}
      </div>
    </div>
  );
}
