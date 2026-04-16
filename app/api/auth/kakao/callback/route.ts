import { NextResponse, type NextRequest } from "next/server";

import {
  getKakaoAuthMode,
  getKakaoAuthPath,
  getKakaoConfig,
  kakaoStateCookieName,
  type KakaoAuthMode,
} from "@/lib/auth/kakao";
import { setSessionCookie } from "@/lib/auth/session";
import type { SessionUser } from "@/types/auth";

export const runtime = "nodejs";

type KakaoTokenResponse = {
  access_token?: string;
  token_type?: string;
  expires_in?: number;
  error?: string;
  error_description?: string;
};

type KakaoProfileResponse = {
  id: number;
  properties?: {
    nickname?: string;
    profile_image?: string;
  };
  kakao_account?: {
    email?: string;
    profile?: {
      nickname?: string;
      profile_image_url?: string;
      thumbnail_image_url?: string;
    };
  };
};

function redirectWithError(request: NextRequest, mode: KakaoAuthMode, error: string) {
  const response = NextResponse.redirect(
    new URL(`${getKakaoAuthPath(mode)}?error=${error}`, request.url),
  );

  response.cookies.delete(kakaoStateCookieName);

  return response;
}

export async function GET(request: NextRequest) {
  const code = request.nextUrl.searchParams.get("code");
  const incomingState = request.nextUrl.searchParams.get("state");
  const oauthError = request.nextUrl.searchParams.get("error");
  const savedState = request.cookies.get(kakaoStateCookieName)?.value;
  const mode = getKakaoAuthMode(savedState?.split(":")[0] ?? null);

  if (oauthError) {
    return redirectWithError(request, mode, "kakao_denied");
  }

  if (!code || !incomingState || !savedState || incomingState !== savedState) {
    return redirectWithError(request, mode, "kakao_state");
  }

  const { clientId, clientSecret, redirectUri } = getKakaoConfig(request);

  if (!clientId) {
    return redirectWithError(request, mode, "kakao_config");
  }

  const tokenBody = new URLSearchParams({
    grant_type: "authorization_code",
    client_id: clientId,
    redirect_uri: redirectUri,
    code,
  });

  if (clientSecret) {
    tokenBody.set("client_secret", clientSecret);
  }

  const tokenResponse = await fetch("https://kauth.kakao.com/oauth/token", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded;charset=utf-8",
    },
    body: tokenBody,
    cache: "no-store",
  });

  const token = (await tokenResponse.json()) as KakaoTokenResponse;

  if (!tokenResponse.ok || !token.access_token) {
    return redirectWithError(request, mode, "kakao_token");
  }

  const profileResponse = await fetch("https://kapi.kakao.com/v2/user/me", {
    headers: {
      Authorization: `Bearer ${token.access_token}`,
      "Content-Type": "application/x-www-form-urlencoded;charset=utf-8",
    },
    cache: "no-store",
  });

  if (!profileResponse.ok) {
    return redirectWithError(request, mode, "kakao_profile");
  }

  const profile = (await profileResponse.json()) as KakaoProfileResponse;
  const kakaoProfile = profile.kakao_account?.profile;
  const user: SessionUser = {
    id: `kakao:${profile.id}`,
    name:
      kakaoProfile?.nickname ??
      profile.properties?.nickname ??
      `카카오회원 ${profile.id}`,
    email: profile.kakao_account?.email,
    avatarUrl:
      kakaoProfile?.profile_image_url ??
      kakaoProfile?.thumbnail_image_url ??
      profile.properties?.profile_image,
    provider: "kakao",
  };

  const response = NextResponse.redirect(new URL("/", request.url));

  setSessionCookie(response, user);
  response.cookies.delete(kakaoStateCookieName);

  return response;
}
