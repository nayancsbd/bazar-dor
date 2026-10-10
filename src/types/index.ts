export type PriceDirection = "up" | "down" | "flat";

export interface PriceChange {
  dir: PriceDirection;
  pct: number;
}

export interface BazarPrice {
  market: string;
  division: string;
  min: number;
  max: number;
}

export interface Category {
  id: string;
  slug: string;
  nameBn: string;
  icon: string;
}

export interface Product {
  id: number;
  slug: string;
  nameBn: string;
  category: string;
  categoryNameBn: string;
  categoryIcon: string;
  unit: string;
  image: string;
  today: number;
  yesterday: number;
  lastWeek: number;
  lastMonth: number;
  change: PriceChange;
  markets: BazarPrice[];
}

export interface PriceSummary {
  min: number;
  max: number;
  avg: number;
}

export type SortOption = "default" | "price_asc" | "price_desc";

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  image?: string;
}
