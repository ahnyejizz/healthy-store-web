export type Product = {
  id: string;
  name: string;
  category: string;
  badge: string;
  summary: string;
  benefit: string;
  monthlySupply: string;
  price: number;
  compareAtPrice?: number;
};

export type ProductsResponse = {
  items: Product[];
  total: number;
};
