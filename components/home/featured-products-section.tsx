"use client";

import { ProductCard } from "@/components/home/product-card";
import { useFeaturedProducts } from "@/hooks/use-featured-products";

function ProductCardSkeleton() {
  return (
    <div className="animate-pulse rounded-[28px] border border-[color:var(--border)] bg-white p-5">
      <div className="h-6 w-20 rounded-full bg-[color:var(--surface-muted)]" />
      <div className="mt-5 h-4 w-24 rounded-full bg-[color:var(--surface-muted)]" />
      <div className="mt-3 h-8 w-48 rounded-full bg-[color:var(--surface-muted)]" />
      <div className="mt-5 space-y-3">
        <div className="h-4 rounded-full bg-[color:var(--surface-muted)]" />
        <div className="h-4 rounded-full bg-[color:var(--surface-muted)]" />
        <div className="h-4 w-4/5 rounded-full bg-[color:var(--surface-muted)]" />
      </div>
      <div className="mt-6 h-24 rounded-[24px] bg-[color:var(--surface-muted)]" />
      <div className="mt-6 flex items-end justify-between">
        <div className="space-y-2">
          <div className="h-8 w-28 rounded-full bg-[color:var(--surface-muted)]" />
          <div className="h-4 w-20 rounded-full bg-[color:var(--surface-muted)]" />
        </div>
        <div className="h-12 w-32 rounded-full bg-[color:var(--surface-muted)]" />
      </div>
    </div>
  );
}

export function FeaturedProductsSection() {
  const { data, isPending, isError, refetch } = useFeaturedProducts();

  return (
    <section className="space-y-5">
      <div className="flex flex-col gap-4 rounded-[32px] border border-[color:var(--border)] bg-white/80 p-6 shadow-[0_18px_60px_rgba(18,38,29,0.06)] sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.28em] text-[color:var(--brand)]">
            Featured Catalog
          </p>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight text-[color:var(--foreground)]">
            건강 루틴별 추천 상품
          </h2>
          <p className="mt-3 max-w-2xl text-sm leading-6 text-[color:var(--muted)]">
            TanStack Query로 가져온 서버 상태를 기준으로, 상품 그리드와
            장바구니를 분리해 확장할 수 있게 구성했습니다.
          </p>
        </div>

        <button
          type="button"
          onClick={() => refetch()}
          className="rounded-full border border-[color:var(--border)] px-4 py-2 text-sm font-semibold text-[color:var(--foreground)] transition hover:border-[color:var(--brand)] hover:text-[color:var(--brand)]"
        >
          상품 새로고침
        </button>
      </div>

      {isPending ? (
        <div className="grid gap-4 md:grid-cols-2">
          {Array.from({ length: 4 }).map((_, index) => (
            <ProductCardSkeleton key={index} />
          ))}
        </div>
      ) : null}

      {isError ? (
        <div className="rounded-[28px] border border-dashed border-[color:var(--border)] bg-white p-8 text-center">
          <p className="text-lg font-semibold text-[color:var(--foreground)]">
            상품 데이터를 불러오는 중 문제가 발생했습니다.
          </p>
          <p className="mt-2 text-sm text-[color:var(--muted)]">
            API 연결이 준비되면 같은 Query 레이어를 그대로 재사용할 수 있습니다.
          </p>
          <button
            type="button"
            onClick={() => refetch()}
            className="mt-5 rounded-full bg-[color:var(--foreground)] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[color:var(--brand)]"
          >
            다시 시도
          </button>
        </div>
      ) : null}

      {data ? (
        <div className="grid gap-4 md:grid-cols-2">
          {data.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : null}
    </section>
  );
}
