import { mkdir, readFile, writeFile } from "fs/promises";
import path from "path";
import { pbkdf2Sync, randomBytes, timingSafeEqual } from "crypto";

import type { SessionUser } from "@/types/auth";

type StoredEmailUser = {
  id: string;
  name: string;
  email: string;
  passwordHash: string;
  passwordSalt: string;
  createdAt: string;
};

type UserStoreData = {
  users: StoredEmailUser[];
};

const usersDirectory = path.join(process.cwd(), ".data");
const usersFile = path.join(usersDirectory, "users.json");
const hashIterations = 120_000;
const hashLength = 32;
const hashDigest = "sha256";

function normalizeEmail(email: string) {
  return email.trim().toLowerCase();
}

function hashPassword(password: string, salt = randomBytes(16).toString("base64url")) {
  const hash = pbkdf2Sync(
    password,
    salt,
    hashIterations,
    hashLength,
    hashDigest,
  ).toString("base64url");

  return { hash, salt };
}

function isSameHash(left: string, right: string) {
  const leftBuffer = Buffer.from(left);
  const rightBuffer = Buffer.from(right);

  return (
    leftBuffer.length === rightBuffer.length &&
    timingSafeEqual(leftBuffer, rightBuffer)
  );
}

async function readStore(): Promise<UserStoreData> {
  try {
    const content = await readFile(usersFile, "utf8");
    const parsed = JSON.parse(content) as UserStoreData;

    return {
      users: Array.isArray(parsed.users) ? parsed.users : [],
    };
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code === "ENOENT") {
      return { users: [] };
    }

    throw error;
  }
}

async function writeStore(data: UserStoreData) {
  await mkdir(usersDirectory, { recursive: true });
  await writeFile(usersFile, JSON.stringify(data, null, 2), "utf8");
}

function toSessionUser(user: StoredEmailUser): SessionUser {
  return {
    id: user.id,
    name: user.name,
    email: user.email,
    provider: "email",
  };
}

export async function createEmailUser({
  name,
  email,
  password,
}: {
  name: string;
  email: string;
  password: string;
}) {
  const store = await readStore();
  const normalizedEmail = normalizeEmail(email);
  const existingUser = store.users.find((user) => user.email === normalizedEmail);

  if (existingUser) {
    return { ok: false as const, reason: "이미 가입된 이메일입니다." };
  }

  const { hash, salt } = hashPassword(password);
  const user: StoredEmailUser = {
    id: `email:${randomBytes(12).toString("base64url")}`,
    name: name.trim(),
    email: normalizedEmail,
    passwordHash: hash,
    passwordSalt: salt,
    createdAt: new Date().toISOString(),
  };

  store.users.push(user);
  await writeStore(store);

  return { ok: true as const, user: toSessionUser(user) };
}

export async function verifyEmailUser(email: string, password: string) {
  const store = await readStore();
  const normalizedEmail = normalizeEmail(email);
  const user = store.users.find((item) => item.email === normalizedEmail);

  if (!user) {
    return null;
  }

  const { hash } = hashPassword(password, user.passwordSalt);

  if (!isSameHash(hash, user.passwordHash)) {
    return null;
  }

  return toSessionUser(user);
}
