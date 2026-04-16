import type { ProductsResponse } from "@/types/product";

export async function getFeaturedProducts() {
  const response = await fetch("/api/products");

  if (!response.ok) {
    throw new Error("상품 목록을 불러오지 못했습니다.");
  }

  const data = (await response.json()) as ProductsResponse;

  return data.items;
}
