import type { Metadata } from "next";
import { redirect } from "next/navigation";

import { AuthForm } from "@/components/auth/auth-form";
import { getCurrentSession } from "@/lib/auth/session";

export const metadata: Metadata = {
  title: "로그인 | Healthy Store",
  description: "이메일 또는 카카오톡으로 Healthy Store에 로그인하세요.",
};

export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>;
}) {
  const session = await getCurrentSession();

  if (session) {
    redirect("/");
  }

  const { error } = await searchParams;

  return <AuthForm mode="login" oauthError={error} />;
}
