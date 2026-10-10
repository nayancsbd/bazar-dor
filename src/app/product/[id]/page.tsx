import React from "react";
import { notFound } from "next/navigation";
import { getProductById, getProducts } from "@/lib/api";
import ProductDetailView from "@/components/ProductDetailView";

interface ProductPageProps {
  params: Promise<{ id: string }>;
}

export const revalidate = 60;

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

  return <ProductDetailView product={product} />;
}
