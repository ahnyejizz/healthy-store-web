export type AuthProvider = "email" | "kakao";

export type SessionUser = {
  id: string;
  name: string;
  email?: string;
  avatarUrl?: string;
  provider: AuthProvider;
};

export type AuthSession = {
  user: SessionUser;
  expiresAt: number;
};

export type AuthFormState = {
  message?: string;
  fieldErrors?: Partial<Record<"name" | "email" | "password" | "terms", string>>;
};
