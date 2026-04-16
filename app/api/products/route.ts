import { NextResponse } from "next/server";

import { featuredProducts } from "@/lib/mocks/products";
import type { ProductsResponse } from "@/types/product";

export async function GET() {
  const response: ProductsResponse = {
    items: featuredProducts,
    total: featuredProducts.length,
  };

  return NextResponse.json(response);
}
