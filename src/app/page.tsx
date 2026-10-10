import React from "react";
import Hero from "@/components/Hero";
import ProductCard from "@/components/ProductCard";
import { getProducts } from "@/lib/api";
import { toBengaliNumber } from "@/lib/bengali";

export const revalidate = 60;

export default async function Home() {
  const products = await getProducts().catch(() => []);

  const risers = [...products]
    .filter((p) => p.change?.dir === "up" && (p.change?.pct ?? 0) > 0)
    .sort((a, b) => (b.change?.pct ?? 0) - (a.change?.pct ?? 0))
    .slice(0, 6);

  const fallers = [...products]
    .filter((p) => p.change?.dir === "down" || (p.change?.pct ?? 0) < 0)
    .sort((a, b) => (a.change?.pct ?? 0) - (b.change?.pct ?? 0))
    .slice(0, 6);

  return (
    <div className="w-full flex flex-col gap-12 sm:gap-16">
      <Hero />

      {risers.length > 0 && (
        <section aria-labelledby="risers-heading" className="w-full flex flex-col gap-4">
          <div className="flex items-center gap-2">
            <span className="text-red-600 text-sm font-bold">▲</span>
            <h2 id="risers-heading" className="text-lg sm:text-xl font-bold text-gray-900 tracking-tight">
              আজ দাম বেড়েছে
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-5">
            {risers.map((product) => (
              <ProductCard key={`riser-${product.id}`} product={product} />
            ))}
          </div>
        </section>
      )}

      {fallers.length > 0 && (
        <section aria-labelledby="fallers-heading" className="w-full flex flex-col gap-4">
          <div className="flex items-center gap-2">
            <span className="text-emerald-600 text-sm font-bold">▼</span>
            <h2 id="fallers-heading" className="text-lg sm:text-xl font-bold text-gray-900 tracking-tight">
              আজ দাম কমেছে
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-5">
            {fallers.map((product) => (
              <ProductCard key={`faller-${product.id}`} product={product} />
            ))}
          </div>
        </section>
      )}

      <section id="সব-পণ্য" aria-labelledby="all-products-heading" className="w-full flex flex-col gap-4 scroll-mt-28">
        <div className="flex flex-col gap-1">
          <h2 id="all-products-heading" className="text-lg sm:text-xl font-bold text-gray-900 tracking-tight">
            সব পণ্য
          </h2>
          <p className="text-xs sm:text-sm text-gray-500">
            মোট {toBengaliNumber(products.length)}টি নিত্য প্রয়োজনীয় পণ্য
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-5">
          {products.map((product) => (
            <ProductCard key={`product-${product.id}`} product={product} />
          ))}
        </div>
      </section>
    </div>
  );
}
