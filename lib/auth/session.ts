import { createHmac, timingSafeEqual } from "crypto";

import { cookies } from "next/headers";
import type { NextResponse } from "next/server";

import type { AuthSession, SessionUser } from "@/types/auth";

export const sessionCookieName = "healthy_store_session";

const sessionMaxAgeSeconds = 60 * 60 * 24 * 14;

const cookieOptions = {
  httpOnly: true,
  sameSite: "lax" as const,
  secure: process.env.NODE_ENV === "production",
  path: "/",
  maxAge: sessionMaxAgeSeconds,
};

function getAuthSecret() {
  return process.env.AUTH_SECRET ?? "healthy-store-local-development-secret";
}

function encodeBase64Url(value: string) {
  return Buffer.from(value, "utf8").toString("base64url");
}

function decodeBase64Url(value: string) {
  return Buffer.from(value, "base64url").toString("utf8");
}

function sign(payload: string) {
  return createHmac("sha256", getAuthSecret()).update(payload).digest("base64url");
}

function safeCompare(left: string, right: string) {
  const leftBuffer = Buffer.from(left);
  const rightBuffer = Buffer.from(right);

  return (
    leftBuffer.length === rightBuffer.length &&
    timingSafeEqual(leftBuffer, rightBuffer)
  );
}

export function createSessionCookieValue(user: SessionUser) {
  const session: AuthSession = {
    user,
    expiresAt: Date.now() + sessionMaxAgeSeconds * 1000,
  };
  const payload = encodeBase64Url(JSON.stringify(session));

  return `${payload}.${sign(payload)}`;
}

export function parseSessionCookieValue(value?: string) {
  if (!value) {
    return null;
  }

  const [payload, signature] = value.split(".");

  if (!payload || !signature || !safeCompare(sign(payload), signature)) {
    return null;
  }

  try {
    const session = JSON.parse(decodeBase64Url(payload)) as AuthSession;

    if (!session.user?.id || session.expiresAt < Date.now()) {
      return null;
    }

    return session;
  } catch {
    return null;
  }
}

export async function getCurrentSession() {
  const cookieStore = await cookies();
  const cookie = cookieStore.get(sessionCookieName);

  return parseSessionCookieValue(cookie?.value);
}

export function setSessionCookie(response: NextResponse, user: SessionUser) {
  response.cookies.set({
    ...cookieOptions,
    name: sessionCookieName,
    value: createSessionCookieValue(user),
  });
}

export async function setSessionCookieFromAction(user: SessionUser) {
  const cookieStore = await cookies();

  cookieStore.set({
    ...cookieOptions,
    name: sessionCookieName,
    value: createSessionCookieValue(user),
  });
}

export function clearSessionCookie(response: NextResponse) {
  response.cookies.set({
    name: sessionCookieName,
    value: "",
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 0,
  });
}

export async function clearSessionCookieFromAction() {
  const cookieStore = await cookies();

  cookieStore.set({
    name: sessionCookieName,
    value: "",
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 0,
  });
}
