"use client";

import Link from "next/link";
import { useActionState } from "react";

import { loginAction, signupAction } from "@/app/auth/actions";
import type { AuthFormState } from "@/types/auth";

type AuthMode = "login" | "signup";

const initialState: AuthFormState = {};

const kakaoErrorMessages: Record<string, string> = {
  kakao_config:
    "카카오 REST API 키가 설정되지 않았습니다. .env.local을 확인해주세요.",
  kakao_denied: "카카오 로그인이 취소되었습니다.",
  kakao_state: "카카오 인증 상태가 만료되었습니다. 다시 시도해주세요.",
  kakao_token: "카카오 토큰 발급에 실패했습니다.",
  kakao_profile: "카카오 프로필 정보를 불러오지 못했습니다.",
  kakao_unknown: "카카오 로그인 중 알 수 없는 문제가 발생했습니다.",
};

function FieldError({ message }: { message?: string }) {
  if (!message) {
    return null;
  }

  return <p className="mt-2 text-sm font-medium text-[#ff4f93]">{message}</p>;
}

export function AuthForm({
  mode,
  oauthError,
}: {
  mode: AuthMode;
  oauthError?: string;
}) {
  const isSignup = mode === "signup";
  const action = isSignup ? signupAction : loginAction;
  const [state, formAction, isPending] = useActionState(action, initialState);
  const oauthMessage = oauthError ? kakaoErrorMessages[oauthError] : undefined;

  return (
    <main className="min-h-screen bg-[#fff7f8] px-5 py-10 text-[#303030]">
      <div className="mx-auto grid min-h-[calc(100vh-80px)] max-w-[1120px] overflow-hidden rounded-[36px] bg-white shadow-[0_30px_100px_rgba(255,79,147,0.16)] lg:grid-cols-[0.92fr_1.08fr]">
        <section className="relative hidden overflow-hidden bg-[#ffedf0] p-10 lg:block">
          <div className="absolute -left-20 top-20 h-72 w-72 rounded-full bg-[#ff9fbe]/45 blur-3xl" />
          <div className="absolute -right-24 bottom-10 h-96 w-96 rounded-full bg-[#ffc94d]/30 blur-3xl" />

          <div className="relative z-10 flex h-full flex-col justify-between">
            <Link href="/" className="text-xl font-black tracking-[0.18em]">
              HEALTHY STORE
            </Link>

            <div>
              <p className="text-sm font-black uppercase tracking-[0.28em] text-[#ff4f93]">
                Member Benefit
              </p>
              <h1 className="mt-5 text-5xl font-black leading-tight tracking-[-0.08em] text-[#253047]">
                카카오로 빠르게
                <br />
                건강 루틴을 시작하세요
              </h1>
              <p className="mt-6 max-w-sm text-base leading-7 text-[#655b5d]">
                타임세일 알림, 추천 상품 저장, 주문 혜택을 회원 전용 흐름으로
                이어갈 수 있게 인증 기반을 구성했습니다.
              </p>
            </div>

            <div className="grid grid-cols-3 gap-3">
              {["TIME SALE", "MD PICK", "KAKAO"].map((item) => (
                <div
                  key={item}
                  className="rounded-2xl border border-white/80 bg-white/70 px-4 py-5 text-center text-xs font-black text-[#ff4f93]"
                >
                  {item}
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="flex items-center justify-center px-6 py-12 sm:px-10">
          <div className="w-full max-w-md">
            <Link
              href="/"
              className="inline-flex text-sm font-bold text-[#ff4f93] lg:hidden"
            >
              HEALTHY STORE
            </Link>

            <p className="text-sm font-black uppercase tracking-[0.28em] text-[#ff4f93]">
              {isSignup ? "Create Account" : "Welcome Back"}
            </p>
            <h2 className="mt-4 text-4xl font-black tracking-[-0.07em] text-[#1f2533]">
              {isSignup ? "회원가입" : "로그인"}
            </h2>
            <p className="mt-3 text-sm leading-6 text-[#777]">
              {isSignup
                ? "이메일로 가입하거나 카카오 계정으로 바로 시작할 수 있어요."
                : "가입한 이메일 또는 카카오 계정으로 로그인하세요."}
            </p>

            {oauthMessage || state.message ? (
              <div className="mt-6 rounded-2xl border border-[#ffd3df] bg-[#fff7f9] px-4 py-3 text-sm font-semibold text-[#d93670]">
                {oauthMessage ?? state.message}
              </div>
            ) : null}

            <a
              href={`/api/auth/kakao/start?mode=${mode}`}
              className="mt-7 flex h-14 w-full items-center justify-center rounded-2xl bg-[#fee500] text-base font-black text-[#191600] transition hover:brightness-95"
            >
              {isSignup ? "카카오톡으로 3초 회원가입" : "카카오톡으로 로그인"}
            </a>

            <div className="my-7 flex items-center gap-4 text-xs font-bold uppercase tracking-[0.18em] text-[#b5b5b5]">
              <span className="h-px flex-1 bg-[#ececec]" />
              or email
              <span className="h-px flex-1 bg-[#ececec]" />
            </div>

            <form action={formAction} className="space-y-5">
              {isSignup ? (
                <label className="block">
                  <span className="text-sm font-bold text-[#4f4f4f]">이름</span>
                  <input
                    name="name"
                    type="text"
                    autoComplete="name"
                    placeholder="홍길동"
                    className="mt-2 h-14 w-full rounded-2xl border border-[#e8e8e8] bg-white px-4 text-base outline-none transition focus:border-[#ff4f93] focus:ring-4 focus:ring-[#ff4f93]/10"
                  />
                  <FieldError message={state.fieldErrors?.name} />
                </label>
              ) : null}

              <label className="block">
                <span className="text-sm font-bold text-[#4f4f4f]">이메일</span>
                <input
                  name="email"
                  type="email"
                  autoComplete="email"
                  placeholder="you@example.com"
                  className="mt-2 h-14 w-full rounded-2xl border border-[#e8e8e8] bg-white px-4 text-base outline-none transition focus:border-[#ff4f93] focus:ring-4 focus:ring-[#ff4f93]/10"
                />
                <FieldError message={state.fieldErrors?.email} />
              </label>

              <label className="block">
                <span className="text-sm font-bold text-[#4f4f4f]">비밀번호</span>
                <input
                  name="password"
                  type="password"
                  autoComplete={isSignup ? "new-password" : "current-password"}
                  placeholder="8자 이상 입력"
                  className="mt-2 h-14 w-full rounded-2xl border border-[#e8e8e8] bg-white px-4 text-base outline-none transition focus:border-[#ff4f93] focus:ring-4 focus:ring-[#ff4f93]/10"
                />
                <FieldError message={state.fieldErrors?.password} />
              </label>

              {isSignup ? (
                <label className="flex items-start gap-3 rounded-2xl bg-[#f8f8f8] px-4 py-4 text-sm font-medium leading-6 text-[#666]">
                  <input
                    name="terms"
                    type="checkbox"
                    className="mt-1 h-4 w-4 accent-[#ff4f93]"
                  />
                  <span>
                    서비스 이용약관과 개인정보 처리방침에 동의합니다.
                    <FieldError message={state.fieldErrors?.terms} />
                  </span>
                </label>
              ) : null}

              <button
                type="submit"
                disabled={isPending}
                className="h-14 w-full rounded-2xl bg-[#1f2533] text-base font-black text-white transition hover:bg-[#ff4f93] disabled:cursor-not-allowed disabled:bg-[#b8b8b8]"
              >
                {isPending
                  ? "처리 중..."
                  : isSignup
                    ? "이메일로 회원가입"
                    : "이메일로 로그인"}
              </button>
            </form>

            <p className="mt-7 text-center text-sm font-medium text-[#777]">
              {isSignup ? "이미 계정이 있나요?" : "아직 계정이 없나요?"}{" "}
              <Link
                href={isSignup ? "/login" : "/signup"}
                className="font-black text-[#ff4f93]"
              >
                {isSignup ? "로그인" : "회원가입"}
              </Link>
            </p>
          </div>
        </section>
      </div>
    </main>
  );
}
