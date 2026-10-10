import { Product, Category, PriceSummary, BazarPrice } from "@/types";

const PRIMARY_API_BASE = "https://openapi.programming-hero.com/api/bazardor";
const FALLBACK_API_BASE = "https://api.abcz.workers.dev/api/bazardor";

const API_TIMEOUT_MS = 6000;

export async function fetchBazarDor<T>(
  endpoint: string,
  options?: RequestInit
): Promise<T> {
  const normalizedEndpoint = endpoint.startsWith("/")
    ? endpoint
    : `/${endpoint}`;

  const tryFetch = async (baseUrl: string): Promise<T> => {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), API_TIMEOUT_MS);

    try {
      const url = `${baseUrl}${normalizedEndpoint}`;
      const response = await fetch(url, {
        ...options,
        signal: controller.signal,
        headers: {
          Accept: "application/json",
          ...options?.headers,
        },
        next: {
          revalidate: 60,
          ...(options as { next?: { revalidate?: number } })?.next,
        },
      });

      if (!response.ok) {
        throw new Error(
          `HTTP ${response.status} ${response.statusText} from ${baseUrl}`
        );
      }

      const contentType = response.headers.get("content-type") || "";
      if (!contentType.includes("application/json")) {
        throw new Error(
          `Expected JSON response but received ${contentType} from ${baseUrl}`
        );
      }

      const data = await response.json();
      return data as T;
    } finally {
      clearTimeout(timeoutId);
    }
  };

  try {
    return await tryFetch(PRIMARY_API_BASE);
  } catch (primaryError) {
    console.warn(
      `Primary API failed (${PRIMARY_API_BASE}${normalizedEndpoint}):`,
      primaryError instanceof Error ? primaryError.message : primaryError,
      "- falling back to secondary endpoint..."
    );

    try {
      return await tryFetch(FALLBACK_API_BASE);
    } catch (fallbackError) {
      console.error(
        `Fallback API also failed (${FALLBACK_API_BASE}${normalizedEndpoint}):`,
        fallbackError
      );
      throw new Error(
        `Failed to fetch from both primary and fallback APIs for ${normalizedEndpoint}`
      );
    }
  }
}

export async function getProducts(params?: {
  category?: string;
  slug?: string;
}): Promise<Product[]> {
  const queryParams = new URLSearchParams();
  if (params?.category) queryParams.set("category", params.category);
  if (params?.slug) queryParams.set("slug", params.slug);

  const query = queryParams.toString();
  const endpoint = query ? `/products?${query}` : "/products";

  return fetchBazarDor<Product[]>(endpoint);
}

export async function getCategories(): Promise<Category[]> {
  return fetchBazarDor<Category[]>("/categories");
}

export async function getProductById(
  id: number | string
): Promise<Product | null> {
  try {
    return await fetchBazarDor<Product>(`/products/${id}`);
  } catch {
    return null;
  }
}

export async function getProductBySlug(slug: string): Promise<Product | null> {
  try {
    const products = await getProducts({ slug });
    if (Array.isArray(products) && products.length > 0 && products[0]) {
      return products[0];
    }

    const all = await getProducts();
    return all.find((p) => p.slug === slug) ?? null;
  } catch {
    return null;
  }
}

export async function getCategoryBySlug(
  slug: string
): Promise<Category | null> {
  try {
    const categories = await getCategories();
    return categories.find((c) => c.slug === slug || c.id === slug) ?? null;
  } catch {
    return null;
  }
}

export async function getTopRisers(limit = 6): Promise<Product[]> {
  try {
    const all = await getProducts();
    return all
      .filter((p) => p.change.dir === "up" && p.change.pct > 0)
      .sort((a, b) => b.change.pct - a.change.pct)
      .slice(0, limit);
  } catch {
    return [];
  }
}

export async function getTopFallers(limit = 6): Promise<Product[]> {
  try {
    const all = await getProducts();
    return all
      .filter((p) => p.change.dir === "down" || p.change.pct < 0)
      .sort((a, b) => a.change.pct - b.change.pct)
      .slice(0, limit);
  } catch {
    return [];
  }
}

export function calculatePriceSummary(markets: BazarPrice[]): PriceSummary {
  if (!markets || markets.length === 0) {
    return { min: 0, max: 0, avg: 0 };
  }

  let min = Number.POSITIVE_INFINITY;
  let max = Number.NEGATIVE_INFINITY;
  let sumAvg = 0;

  for (const m of markets) {
    if (m.min < min) min = m.min;
    if (m.max > max) max = m.max;
    sumAvg += (m.min + m.max) / 2;
  }

  return {
    min: min === Number.POSITIVE_INFINITY ? 0 : min,
    max: max === Number.NEGATIVE_INFINITY ? 0 : max,
    avg: Math.round(sumAvg / markets.length),
  };
}
