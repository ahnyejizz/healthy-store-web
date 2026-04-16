"use client";

import { formatKrw } from "@/lib/format";
import { useCartStore } from "@/store/cart-store";

const freeShippingThreshold = 70000;

export function CartSummary() {
  const items = useCartStore((state) => state.items);
  const increaseItem = useCartStore((state) => state.increaseItem);
  const decreaseItem = useCartStore((state) => state.decreaseItem);
  const removeItem = useCartStore((state) => state.removeItem);
  const clearCart = useCartStore((state) => state.clearCart);

  const totalCount = items.reduce((sum, item) => sum + item.quantity, 0);
  const subtotal = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );
  const remainingForFreeShipping = Math.max(0, freeShippingThreshold - subtotal);

  return (
    <aside className="h-fit rounded-[32px] border border-[color:var(--border)] bg-[color:var(--foreground)] p-6 text-white shadow-[0_26px_80px_rgba(18,38,29,0.18)] lg:sticky lg:top-8">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.28em] text-white/60">
            Cart Store
          </p>
          <h2 className="mt-3 text-2xl font-semibold tracking-tight">
            Zustand 장바구니
          </h2>
        </div>
        <span className="rounded-full bg-white/10 px-3 py-1 text-sm font-medium text-white/80">
          {totalCount} items
        </span>
      </div>

      <div className="mt-6 rounded-[28px] bg-white/8 p-5">
        <p className="text-sm font-medium text-white/80">
          {remainingForFreeShipping > 0
            ? `${formatKrw(remainingForFreeShipping)} 더 담으면 무료 배송입니다.`
            : "무료 배송 조건을 달성했습니다."}
        </p>
        <div className="mt-4 h-2 overflow-hidden rounded-full bg-white/10">
          <div
            className="h-full rounded-full bg-[color:var(--accent)] transition-[width]"
            style={{
              width: `${Math.min(100, (subtotal / freeShippingThreshold) * 100)}%`,
            }}
          />
        </div>
      </div>

      <div className="mt-6 space-y-3">
        {items.length > 0 ? (
          items.map((item) => (
            <div
              key={item.id}
              className="rounded-[28px] border border-white/10 bg-white/6 p-4"
            >
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.24em] text-white/45">
                    {item.badge}
                  </p>
                  <p className="mt-2 text-lg font-semibold">{item.name}</p>
                  <p className="mt-1 text-sm text-white/65">{item.category}</p>
                </div>
                <button
                  type="button"
                  onClick={() => removeItem(item.id)}
                  className="text-sm font-medium text-white/60 transition hover:text-white"
                >
                  삭제
                </button>
              </div>

              <div className="mt-4 flex items-center justify-between gap-4">
                <div className="inline-flex items-center rounded-full border border-white/10 bg-black/10">
                  <button
                    type="button"
                    onClick={() => decreaseItem(item.id)}
                    className="px-4 py-2 text-sm text-white/75 transition hover:text-white"
                  >
                    -
                  </button>
                  <span className="px-2 text-sm font-semibold">{item.quantity}</span>
                  <button
                    type="button"
                    onClick={() => increaseItem(item.id)}
                    className="px-4 py-2 text-sm text-white/75 transition hover:text-white"
                  >
                    +
                  </button>
                </div>
                <p className="text-sm font-semibold">
                  {formatKrw(item.price * item.quantity)}
                </p>
              </div>
            </div>
          ))
        ) : (
          <div className="rounded-[28px] border border-dashed border-white/15 bg-white/4 p-6 text-center">
            <p className="text-lg font-semibold">장바구니가 비어 있습니다.</p>
            <p className="mt-2 text-sm leading-6 text-white/65">
              상품을 담아 보면 새로고침 후에도 로컬 상태가 유지됩니다.
            </p>
          </div>
        )}
      </div>

      <div className="mt-6 rounded-[28px] bg-white p-5 text-[color:var(--foreground)]">
        <div className="flex items-center justify-between text-sm text-[color:var(--muted)]">
          <span>상품 수</span>
          <span>{totalCount}개</span>
        </div>
        <div className="mt-3 flex items-center justify-between text-sm text-[color:var(--muted)]">
          <span>예상 배송</span>
          <span>{subtotal >= freeShippingThreshold ? "무료" : "3,000원"}</span>
        </div>
        <div className="mt-4 flex items-center justify-between text-xl font-semibold">
          <span>합계</span>
          <span>{formatKrw(subtotal)}</span>
        </div>

        <button
          type="button"
          className="mt-5 w-full rounded-full bg-[color:var(--foreground)] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[color:var(--brand)]"
        >
          결제 흐름 연결 준비
        </button>

        <button
          type="button"
          onClick={() => clearCart()}
          className="mt-3 w-full rounded-full border border-[color:var(--border)] px-5 py-3 text-sm font-semibold text-[color:var(--foreground)] transition hover:border-[color:var(--brand)] hover:text-[color:var(--brand)]"
        >
          장바구니 비우기
        </button>
      </div>
    </aside>
  );
}
