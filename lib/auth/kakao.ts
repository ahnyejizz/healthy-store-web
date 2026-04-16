import type { NextRequest } from "next/server";

export const kakaoStateCookieName = "healthy_store_kakao_state";

export type KakaoAuthMode = "login" | "signup";

export function getKakaoAuthMode(value: string | null): KakaoAuthMode {
  return value === "signup" ? "signup" : "login";
}

export function getKakaoAuthPath(mode: KakaoAuthMode) {
  return mode === "signup" ? "/signup" : "/login";
}

export function getKakaoConfig(request: NextRequest) {
  return {
    clientId:
      process.env.KAKAO_REST_API_KEY ??
      process.env.NEXT_PUBLIC_KAKAO_REST_API_KEY,
    clientSecret: process.env.KAKAO_CLIENT_SECRET,
    redirectUri:
      process.env.KAKAO_REDIRECT_URI ??
      `${request.nextUrl.origin}/api/auth/kakao/callback`,
    scopes: process.env.KAKAO_SCOPES ?? "",
  };
}
