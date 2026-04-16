import { randomUUID } from "crypto";

import { NextResponse, type NextRequest } from "next/server";

import {
  getKakaoAuthMode,
  getKakaoAuthPath,
  getKakaoConfig,
  kakaoStateCookieName,
} from "@/lib/auth/kakao";

export const runtime = "nodejs";

export async function GET(request: NextRequest) {
  const mode = getKakaoAuthMode(request.nextUrl.searchParams.get("mode"));
  const { clientId, redirectUri, scopes } = getKakaoConfig(request);

  if (!clientId) {
    return NextResponse.redirect(
      new URL(`${getKakaoAuthPath(mode)}?error=kakao_config`, request.url),
    );
  }

  const state = `${mode}:${randomUUID()}`;
  const authorizationUrl = new URL("https://kauth.kakao.com/oauth/authorize");

  authorizationUrl.searchParams.set("client_id", clientId);
  authorizationUrl.searchParams.set("redirect_uri", redirectUri);
  authorizationUrl.searchParams.set("response_type", "code");
  authorizationUrl.searchParams.set("state", state);

  if (scopes) {
    authorizationUrl.searchParams.set("scope", scopes);
  }

  const response = NextResponse.redirect(authorizationUrl);

  response.cookies.set({
    name: kakaoStateCookieName,
    value: state,
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 10,
  });

  return response;
}
