"use client";

import { useCartStore } from "@/store/cart-store";
import { formatKrw } from "@/lib/format";
import type { Product } from "@/types/product";

const categoryTones: Record<string, { soft: string; strong: string }> = {
  "장 건강": { soft: "#e6f5ea", strong: "#246b42" },
  "면역 케어": { soft: "#fff1dc", strong: "#8a4c16" },
  단백질: { soft: "#e7eefb", strong: "#2d4f8f" },
  비타민: { soft: "#fae8eb", strong: "#8b3047" },
  "수면 케어": { soft: "#eceafc", strong: "#4c3b8f" },
  다이어트: { soft: "#e2f4ef", strong: "#166552" },
};

export function ProductCard({ product }: { product: Product }) {
  const addItem = useCartStore((state) => state.addItem);
  const quantity = useCartStore(
    (state) =>
      state.items.find((item) => item.id === product.id)?.quantity ?? 0,
  );

  const tone = categoryTones[product.category] ?? {
    soft: "#eef3f1",
    strong: "#264335",
  };
  const discountRate = product.compareAtPrice
    ? Math.round((1 - product.price / product.compareAtPrice) * 100)
    : 0;

  return (
    <article className="rounded-[28px] border border-[color:var(--border)] bg-white p-5 shadow-[0_18px_60px_rgba(18,38,29,0.08)]">
      <div className="flex items-start justify-between gap-3">
        <span
          className="inline-flex rounded-full px-3 py-1 text-xs font-semibold tracking-[0.24em]"
          style={{ backgroundColor: tone.soft, color: tone.strong }}
        >
          {product.badge}
        </span>
        {discountRate > 0 ? (
          <span className="rounded-full bg-[color:var(--brand-soft)] px-3 py-1 text-xs font-semibold text-[color:var(--brand)]">
            {discountRate}% OFF
          </span>
        ) : null}
      </div>

      <div className="mt-5 flex items-center justify-between gap-4">
        <div>
          <p className="text-sm font-medium text-[color:var(--muted)]">
            {product.category}
          </p>
          <h3 className="mt-2 text-xl font-semibold tracking-tight text-[color:var(--foreground)]">
            {product.name}
          </h3>
        </div>
        <div
          className="flex h-16 w-16 shrink-0 items-center justify-center rounded-3xl text-xs font-bold tracking-[0.24em]"
          style={{ backgroundColor: tone.soft, color: tone.strong }}
        >
          {product.category.replaceAll(" ", "").slice(0, 4).toUpperCase()}
        </div>
      </div>

      <p className="mt-4 text-sm leading-6 text-[color:var(--muted)]">
        {product.summary}
      </p>

      <div className="mt-5 rounded-3xl bg-[color:var(--surface-muted)] px-4 py-3">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[color:var(--muted)]">
          추천 포인트
        </p>
        <p className="mt-2 text-sm font-medium text-[color:var(--foreground)]">
          {product.benefit}
        </p>
        <p className="mt-2 text-sm text-[color:var(--muted)]">
          구성: {product.monthlySupply}
        </p>
      </div>

      <div className="mt-6 flex items-end justify-between gap-4">
        <div>
          <p className="text-2xl font-semibold tracking-tight text-[color:var(--foreground)]">
            {formatKrw(product.price)}
          </p>
          {product.compareAtPrice ? (
            <p className="mt-1 text-sm text-[color:var(--muted)] line-through">
              {formatKrw(product.compareAtPrice)}
            </p>
          ) : null}
        </div>

        <button
          type="button"
          onClick={() => addItem(product)}
          className="rounded-full bg-[color:var(--foreground)] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[color:var(--brand)]"
        >
          장바구니 담기
        </button>
      </div>

      <p className="mt-3 text-sm text-[color:var(--muted)]">
        {quantity > 0
          ? `현재 장바구니에 ${quantity}개 담겨 있습니다.`
          : "첫 구매 고객용 루틴 추천에 포함된 상품입니다."}
      </p>
    </article>
  );
}
