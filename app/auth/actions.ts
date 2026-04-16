"use server";

import { redirect } from "next/navigation";

import { setSessionCookieFromAction, clearSessionCookieFromAction } from "@/lib/auth/session";
import { createEmailUser, verifyEmailUser } from "@/lib/auth/user-store";
import type { AuthFormState } from "@/types/auth";

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const minPasswordLength = 8;

function getFormValue(formData: FormData, key: string) {
  const value = formData.get(key);

  return typeof value === "string" ? value.trim() : "";
}

export async function signupAction(
  _prevState: AuthFormState,
  formData: FormData,
): Promise<AuthFormState> {
  const name = getFormValue(formData, "name");
  const email = getFormValue(formData, "email");
  const password = getFormValue(formData, "password");
  const termsAccepted = formData.get("terms") === "on";
  const fieldErrors: AuthFormState["fieldErrors"] = {};

  if (name.length < 2) {
    fieldErrors.name = "이름을 2자 이상 입력해주세요.";
  }

  if (!emailPattern.test(email)) {
    fieldErrors.email = "올바른 이메일 주소를 입력해주세요.";
  }

  if (password.length < minPasswordLength) {
    fieldErrors.password = "비밀번호는 8자 이상이어야 합니다.";
  }

  if (!termsAccepted) {
    fieldErrors.terms = "서비스 이용약관에 동의해주세요.";
  }

  if (Object.keys(fieldErrors).length > 0) {
    return {
      message: "입력한 정보를 다시 확인해주세요.",
      fieldErrors,
    };
  }

  const result = await createEmailUser({ name, email, password });

  if (!result.ok) {
    return {
      message: result.reason,
      fieldErrors: { email: result.reason },
    };
  }

  await setSessionCookieFromAction(result.user);
  redirect("/");
}

export async function loginAction(
  _prevState: AuthFormState,
  formData: FormData,
): Promise<AuthFormState> {
  const email = getFormValue(formData, "email");
  const password = getFormValue(formData, "password");
  const fieldErrors: AuthFormState["fieldErrors"] = {};

  if (!emailPattern.test(email)) {
    fieldErrors.email = "가입한 이메일 주소를 입력해주세요.";
  }

  if (!password) {
    fieldErrors.password = "비밀번호를 입력해주세요.";
  }

  if (Object.keys(fieldErrors).length > 0) {
    return {
      message: "로그인 정보를 확인해주세요.",
      fieldErrors,
    };
  }

  const user = await verifyEmailUser(email, password);

  if (!user) {
    return {
      message: "이메일 또는 비밀번호가 올바르지 않습니다.",
      fieldErrors: {
        email: "가입 여부를 확인해주세요.",
        password: "비밀번호를 다시 입력해주세요.",
      },
    };
  }

  await setSessionCookieFromAction(user);
  redirect("/");
}

export async function logoutAction() {
  await clearSessionCookieFromAction();
  redirect("/login");
}
