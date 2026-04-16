"use client";

import { useQuery } from "@tanstack/react-query";

import { getFeaturedProducts } from "@/lib/api/products";
import { productKeys } from "@/lib/query-keys";

export function useFeaturedProducts() {
  return useQuery({
    queryKey: productKeys.featured(),
    queryFn: getFeaturedProducts,
  });
}
