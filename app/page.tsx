import Link from "next/link";

import { getCurrentSession } from "@/lib/auth/session";

type NavItem = {
  label: string;
  tone?: "blue" | "orange";
};

type SaleProduct = {
  badge: string;
  eyebrow: string;
  name: string;
  originalPrice: number;
  price: number;
  soldRate: number;
  remainText: string;
  visual: ProductVisual;
};

type PickProduct = {
  label?: string;
  headline: string;
  hashtags: string;
  name: string;
  originalPrice: number;
  price: number;
  visual: ProductVisual;
};

type ProductVisual = {
  kind: "jar" | "carton" | "pouch" | "meal";
  tone: string;
  label: string;
  labelTone?: string;
};

const navItems: NavItem[] = [
  { label: "베스트" },
  { label: "신제품" },
  { label: "다이어트" },
  { label: "단백질/보충제" },
  { label: "다이어트 식단" },
  { label: "건강/뷰티" },
  { label: "피트니스", tone: "blue" },
  { label: "타임 세일", tone: "orange" },
  { label: "이벤트" },
];

const saleProducts: SaleProduct[] = [
  {
    badge: "타임특가",
    eyebrow: "든든한 한 끼 식사",
    name: "다밀 뉴트리션 단호박 고구마맛",
    originalPrice: 29900,
    price: 17900,
    soldRate: 76,
    remainText: "4일 남음",
    visual: {
      kind: "jar",
      tone: "#f5d9e3",
      label: "다밀",
      labelTone: "#9f5574",
    },
  },
  {
    badge: "타임특가",
    eyebrow: "건강한 하루를 위한 한 줌의 맛",
    name: "[타임특가] 닥터 데이 곡물맛",
    originalPrice: 60000,
    price: 32900,
    soldRate: 76,
    remainText: "4일 남음",
    visual: {
      kind: "carton",
      tone: "#ead1b7",
      label: "닥터 데이",
      labelTone: "#8d5f33",
    },
  },
  {
    badge: "타임특가",
    eyebrow: "유당 걱정 없는 단백질 3종 혼합",
    name: "[타임특가] 퍼펙트 파워쉐이크 아이솔레이트 블렌드 곡물맛 1.89kg",
    originalPrice: 69900,
    price: 44900,
    soldRate: 82,
    remainText: "4일 남음",
    visual: {
      kind: "jar",
      tone: "#c5b28b",
      label: "파워쉐이크",
      labelTone: "#2b261c",
    },
  },
  {
    badge: "타임특가",
    eyebrow: "감칠맛 중독적인 한 끼를 더하다",
    name: "칼로바이 육지옥 주꾸미 볶음밥 250 g",
    originalPrice: 30000,
    price: 10500,
    soldRate: 54,
    remainText: "4일 남음",
    visual: {
      kind: "meal",
      tone: "#df6f1e",
      label: "볶음밥",
      labelTone: "#5a2411",
    },
  },
];

const pickProducts: PickProduct[] = [
  {
    label: "NEW",
    headline: "간편하게 마시는\n고단백 음료\n퍼펙트 파워쉐이크 20G",
    hashtags: "#단백질 20g #달콤쌉싸름",
    name: "[타임특가] 퍼펙트 파워쉐이크 20g 24개입",
    originalPrice: 60000,
    price: 41900,
    visual: {
      kind: "carton",
      tone: "#5b2826",
      label: "20g",
      labelTone: "#ffffff",
    },
  },
  {
    label: "BEST",
    headline: "락토프리 프로틴 파우더\n퍼펙트 파워쉐이크\n아이솔레이트",
    hashtags: "#초코맛 #고단백질27.5g",
    name: "[타임특가] 퍼펙트 파워쉐이크 아이솔레이트 1.89kg",
    originalPrice: 149900,
    price: 112900,
    visual: {
      kind: "jar",
      tone: "#c3a36b",
      label: "WPI",
      labelTone: "#2c2519",
    },
  },
  {
    headline: "4가지 단백질을 한번에!\n퍼펙트 파워쉐이크\n믹스 딸기맛",
    hashtags: "# WPC + WPI + MPC + MPI\n# 단백질 23g # 대용량 딸기맛",
    name: "[타임특가] 칼로바이 퍼펙트 파워쉐이크 믹스 2kg",
    originalPrice: 99000,
    price: 69900,
    visual: {
      kind: "jar",
      tone: "#e25470",
      label: "딸기",
      labelTone: "#34171e",
    },
  },
];

const newProducts: SaleProduct[] = [
  {
    badge: "타임특가",
    eyebrow: "대용량 단백질",
    name: "퍼펙트 파워쉐이크 곡물맛 2kg",
    originalPrice: 99000,
    price: 69900,
    soldRate: 68,
    remainText: "오늘 마감",
    visual: {
      kind: "jar",
      tone: "#be9a62",
      label: "곡물",
      labelTone: "#2c2418",
    },
  },
  {
    badge: "타임특가",
    eyebrow: "든든한 한 끼",
    name: "다밀 뉴트리션 플러스 밀크티맛",
    originalPrice: 36000,
    price: 21900,
    soldRate: 51,
    remainText: "오늘 마감",
    visual: {
      kind: "jar",
      tone: "#eadde0",
      label: "다밀",
      labelTone: "#8d4f65",
    },
  },
  {
    badge: "타임특가",
    eyebrow: "운동 전후 루틴",
    name: "퍼펙트 파워쉐이크 초코맛",
    originalPrice: 89900,
    price: 59900,
    soldRate: 73,
    remainText: "2일 남음",
    visual: {
      kind: "jar",
      tone: "#2c251e",
      label: "초코",
      labelTone: "#efd6a0",
    },
  },
  {
    badge: "타임특가",
    eyebrow: "가벼운 식단 관리",
    name: "퍼펙트 파워쉐이크 딸기맛",
    originalPrice: 89900,
    price: 62900,
    soldRate: 62,
    remainText: "3일 남음",
    visual: {
      kind: "jar",
      tone: "#d84b62",
      label: "딸기",
      labelTone: "#ffffff",
    },
  },
];

const formatPrice = (price: number) => price.toLocaleString("ko-KR");

function SaleBadge({ label }: { label: string }) {
  return (
    <span className="absolute left-4 top-4 z-20 rounded-full bg-[#ff4f93] px-3 py-2 text-[13px] font-black tracking-[-0.08em] text-yellow-200 shadow-[0_10px_24px_rgba(255,79,147,0.28)]">
      {label}
    </span>
  );
}

function ProductVisualBlock({
  visual,
  badge,
  compact = false,
}: {
  visual: ProductVisual;
  badge?: string;
  compact?: boolean;
}) {
  const heightClass = compact ? "h-36" : "h-56";

  return (
    <div className={`relative overflow-hidden bg-white ${heightClass}`}>
      {badge ? <SaleBadge label={badge} /> : null}

      {visual.kind === "jar" ? (
        <div className="absolute bottom-1 left-1/2 h-[72%] w-32 -translate-x-1/2 sm:w-36">
          <div className="mx-auto h-5 w-20 rounded-t-xl bg-[#222]" />
          <div className="relative h-[calc(100%-20px)] rounded-t-[30px] rounded-b-[42px] bg-[#171717] shadow-[0_18px_30px_rgba(0,0,0,0.18)]">
            <div
              className="absolute left-3 right-3 top-[37%] rounded-lg px-2 py-3 text-center text-sm font-black leading-tight"
              style={{
                backgroundColor: visual.tone,
                color: visual.labelTone ?? "#171717",
              }}
            >
              {visual.label}
            </div>
            <div className="absolute inset-x-6 top-8 h-3 rounded-full bg-white/20" />
          </div>
        </div>
      ) : null}

      {visual.kind === "carton" ? (
        <div className="absolute bottom-2 left-1/2 h-[72%] w-36 -translate-x-1/2 rotate-[-2deg] rounded-[18px] bg-[#f4eee7] shadow-[0_18px_30px_rgba(90,60,35,0.18)]">
          <div
            className="absolute inset-x-0 top-0 h-10 rounded-t-[18px]"
            style={{ backgroundColor: visual.tone }}
          />
          <div
            className="absolute left-5 right-5 top-14 rounded-xl px-3 py-4 text-center text-lg font-black leading-tight"
            style={{
              backgroundColor: "#fff",
              color: visual.labelTone ?? visual.tone,
            }}
          >
            {visual.label}
          </div>
          <div className="absolute bottom-5 left-5 right-5 h-5 rounded-full bg-black/10" />
        </div>
      ) : null}

      {visual.kind === "pouch" ? (
        <div
          className="absolute bottom-3 left-1/2 h-[70%] w-40 -translate-x-1/2 rounded-t-[38px] rounded-b-[20px] shadow-[0_18px_30px_rgba(0,0,0,0.16)]"
          style={{ backgroundColor: visual.tone }}
        >
          <div className="absolute inset-x-6 top-6 h-5 rounded-full bg-white/35" />
          <div
            className="absolute left-5 right-5 top-[42%] rounded-xl bg-white px-3 py-3 text-center text-base font-black"
            style={{ color: visual.labelTone ?? visual.tone }}
          >
            {visual.label}
          </div>
        </div>
      ) : null}

      {visual.kind === "meal" ? (
        <div className="absolute inset-x-0 bottom-4 mx-auto h-[72%] w-52">
          <div className="absolute left-0 top-1 grid grid-cols-3 gap-1">
            {Array.from({ length: 6 }).map((_, index) => (
              <div
                key={index}
                className="h-12 w-14 rounded-md shadow-[0_8px_18px_rgba(0,0,0,0.12)]"
                style={{ backgroundColor: index % 2 ? "#3b2625" : visual.tone }}
              />
            ))}
          </div>
          <div
            className="absolute bottom-0 right-0 h-24 w-32 rounded-[50%] border-[10px] border-white bg-[#ed8d2c] shadow-[0_18px_28px_rgba(0,0,0,0.18)]"
          />
        </div>
      ) : null}
    </div>
  );
}

function ArrowButton({
  direction,
  className = "",
}: {
  direction: "left" | "right";
  className?: string;
}) {
  return (
    <button
      type="button"
      aria-label={direction === "left" ? "이전 상품" : "다음 상품"}
      className={`hidden h-12 w-12 items-center justify-center text-5xl font-thin text-[#8c8c8c] transition hover:text-[#ff4f93] lg:flex ${className}`}
    >
      {direction === "left" ? "‹" : "›"}
    </button>
  );
}

function SaleProductCard({ product }: { product: SaleProduct }) {
  return (
    <article className="min-w-0 bg-white">
      <div className="relative">
        <ProductVisualBlock visual={product.visual} badge={product.badge} />
        <div className="absolute inset-x-0 bottom-0 bg-[#8c8c8c] py-2 text-center text-xl font-bold text-white">
          {product.remainText}
        </div>
      </div>

      <div className="pt-4">
        <p className="text-[13px] font-bold text-[#444]">{product.eyebrow}</p>
        <h3 className="mt-1 min-h-12 text-[15px] leading-6 text-[#555]">
          {product.name}
        </h3>
        <div className="mt-2 flex items-baseline gap-2">
          <span className="text-[15px] text-[#888] line-through">
            {formatPrice(product.originalPrice)}
          </span>
          <strong className="text-xl font-black tracking-tight text-[#3b3b3b]">
            {formatPrice(product.price)}
          </strong>
        </div>
        <div className="mt-5 h-2 overflow-hidden rounded-full bg-[#f0f0f0]">
          <div
            className="h-full rounded-full bg-[#ff4f9a]"
            style={{ width: `${product.soldRate}%` }}
          />
        </div>
        <p className="mt-3 text-xs font-bold text-[#555]">
          <span className="text-[#ff4f9a]">{product.soldRate}%</span> 판매됨
        </p>
      </div>
    </article>
  );
}

function PickProductCard({ product }: { product: PickProduct }) {
  return (
    <article>
      <div className="relative flex h-48 overflow-hidden bg-white px-7 py-8">
        <div className="relative z-10 max-w-[58%]">
          {product.label ? (
            <span
              className={`inline-flex px-3 py-1 text-xs font-bold text-white ${
                product.label === "BEST" ? "bg-[#18b760]" : "bg-[#ffc226]"
              }`}
            >
              {product.label}
            </span>
          ) : null}
          <h3 className="mt-3 whitespace-pre-line text-xl font-light leading-7 tracking-[-0.05em] text-[#6c6c6c]">
            {product.headline}
          </h3>
          <p className="mt-3 whitespace-pre-line text-sm leading-5 text-[#8b8b8b]">
            {product.hashtags}
          </p>
        </div>
        <div className="absolute bottom-0 right-2 w-[42%]">
          <ProductVisualBlock visual={product.visual} compact />
        </div>
      </div>

      <div className="pt-6">
        <p className="text-[15px] text-[#555]">{product.name}</p>
        <div className="mt-2 flex items-baseline gap-2">
          <span className="text-[15px] text-[#888] line-through">
            {formatPrice(product.originalPrice)}
          </span>
          <strong className="text-xl font-black tracking-tight text-[#3b3b3b]">
            {formatPrice(product.price)}
          </strong>
        </div>
      </div>
    </article>
  );
}

export default async function Home() {
  const session = await getCurrentSession();

  return (
    <main className="min-h-screen bg-white text-[#3d3d3d]">
      <header className="sticky top-0 z-50 border-b-2 border-[#ff6f9e] bg-white/95 backdrop-blur">
        <div className="mx-auto flex h-14 max-w-[1180px] items-center gap-4 px-5 lg:gap-8">
          <button
            type="button"
            aria-label="전체 메뉴"
            className="group flex h-8 w-8 shrink-0 flex-col justify-center gap-1.5"
          >
            <span className="h-px w-8 bg-[#ff6f9e] transition group-hover:w-6" />
            <span className="h-px w-8 bg-[#ff6f9e]" />
            <span className="h-px w-8 bg-[#ff6f9e] transition group-hover:w-5" />
          </button>

          <nav
            aria-label="주요 카테고리"
            className="flex flex-1 items-center justify-between gap-8 overflow-x-auto text-[15px] font-bold text-[#777] [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          >
            {navItems.map((item) => (
              <a
                key={item.label}
                href="#"
                className={`shrink-0 transition hover:text-[#ff4f93] ${
                  item.tone === "blue"
                    ? "text-[#586daf]"
                    : item.tone === "orange"
                      ? "text-[#ff6a36]"
                      : ""
                }`}
              >
                {item.label}
              </a>
            ))}
          </nav>

          <div className="flex shrink-0 items-center gap-2 border-l border-[#ececec] pl-4 text-sm font-black">
            {session ? (
              <>
                <span className="hidden max-w-32 truncate text-[#555] sm:inline">
                  {session.user.name}님
                </span>
                <a
                  href="/api/auth/logout"
                  className="rounded-full bg-[#1f2533] px-4 py-2 text-white transition hover:bg-[#ff4f93]"
                >
                  로그아웃
                </a>
              </>
            ) : (
              <>
                <Link
                  href="/login"
                  className="hidden text-[#777] transition hover:text-[#ff4f93] sm:inline"
                >
                  로그인
                </Link>
                <Link
                  href="/signup"
                  className="rounded-full bg-[#ff4f93] px-4 py-2 text-white transition hover:bg-[#1f2533]"
                >
                  회원가입
                </Link>
              </>
            )}
          </div>
        </div>
      </header>

      <section className="relative mt-24 pb-20">
        <div className="absolute left-5 right-5 top-0 h-[280px] bg-[#ffe6e8] sm:left-8 sm:right-8" />
        <div className="relative mx-auto max-w-[1180px] px-5 pt-11">
          <div className="text-center">
            <p className="text-lg font-medium tracking-[-0.04em] text-[#4f5360]">
              오늘 주문 내일 도착!{" "}
              <span className="font-black text-[#ff4f93]">특급 배송 중</span>
            </p>
            <h1 className="mt-2 text-5xl font-black italic tracking-[0.08em] text-[#253047] sm:text-6xl">
              TIME<span className="mx-3 text-[#ff4f93]">○</span>SALE
            </h1>
            <p className="mt-1 text-3xl font-medium tracking-[0.08em] text-[#253047]">
              퍼펙트 파워업
            </p>
          </div>

          <div className="relative mt-16">
            <ArrowButton
              direction="left"
              className="absolute -left-16 top-36 z-20"
            />
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {saleProducts.map((product) => (
                <SaleProductCard key={product.name} product={product} />
              ))}
            </div>
            <ArrowButton
              direction="right"
              className="absolute -right-16 top-36 z-20"
            />
          </div>
        </div>
      </section>

      <section className="bg-[#f7f7f7] py-12">
        <div className="mx-auto max-w-[1180px] px-5">
          <h2 className="text-center text-2xl font-black tracking-tight text-[#111]">
            MD&apos;s PICK
          </h2>

          <div className="relative mt-7">
            <ArrowButton
              direction="left"
              className="absolute -left-16 top-24 z-20"
            />
            <div className="grid gap-5 lg:grid-cols-3">
              {pickProducts.map((product) => (
                <PickProductCard key={product.name} product={product} />
              ))}
            </div>
            <ArrowButton
              direction="right"
              className="absolute -right-16 top-24 z-20"
            />
          </div>
        </div>
      </section>

      <section className="bg-white py-14">
        <div className="mx-auto max-w-[1180px] px-5">
          <h2 className="text-center text-2xl font-black tracking-tight text-[#111]">
            NEW
          </h2>

          <div className="mt-9 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {newProducts.map((product) => (
              <SaleProductCard key={product.name} product={product} />
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
