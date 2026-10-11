import React from "react";
import { getProducts, getCategoryBySlug, getCategories } from "@/lib/api";
import CategoryView from "@/components/CategoryView";

interface CategoryPageProps {
  params: Promise<{ slug: string }>;
}

export const dynamicParams = true;
export const revalidate = 60;

export async function generateStaticParams() {
  const categories = await getCategories().catch(() => []);
  if (!categories || categories.length === 0) {
    return [
      { slug: "chal" },
      { slug: "dal" },
      { slug: "tel" },
      { slug: "sobji" },
      { slug: "mach" },
      { slug: "mangsho" },
      { slug: "dim-dui" },
      { slug: "mosla" },
    ];
  }
  return categories.map((cat) => ({
    slug: cat.slug || String(cat.id),
  }));
}

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
