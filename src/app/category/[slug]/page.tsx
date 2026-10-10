import React from "react";
import { getProducts, getCategoryBySlug } from "@/lib/api";
import CategoryView from "@/components/CategoryView";

interface CategoryPageProps {
  params: Promise<{ slug: string }>;
}

export const revalidate = 60;

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { slug } = await params;
  const category = await getCategoryBySlug(slug);
  let products = await getProducts({ category: slug }).catch(() => []);

  if (!products || products.length === 0) {
    const all = await getProducts().catch(() => []);
    products = all.filter((p) => p.category === slug);
  }

  return (
    <CategoryView
      categorySlug={slug}
      category={category}
      initialProducts={products}
    />
  );
}
