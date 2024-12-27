import "server-only";

import { db, eq, users } from "@repo/db";
import { cache } from "react";

export const getAllUsers = cache(async () => {
  try {
    const usersData = await db.select().from(users);

    return usersData;
  } catch (error) {
    throw new Error("Failed to fetch users data.");
  }
});

export const getNameBySession = cache(async (userId: number | null) => {
  if (!userId) {
    return null;
  }
  const [user] = await db
    .select({ name: users.name })
    .from(users)
    .where(eq(users.id, userId));

  return user;
});

export const getUserById = cache(async (userId: number) => {
  try {
    const user = await db
      .select({ name: users.name })
      .from(users)
      .where(eq(users.id, userId))
      .limit(1);
    return user[0] || null;
  } catch (error) {
    throw new Error("Failed to fetch user data.");
  }
});
export const getUserAllDataById = cache(async (userId: number) => {
  try {
    const user = await db
      .select({ name: users.name, email: users.email, id: users.id })
      .from(users)
      .where(eq(users.id, userId))
      .limit(1);
    return user[0] || null;
  } catch (error) {
    throw new Error("Failed to fetch user data.");
  }
});

export const getUserByEmail = cache(async (email: string) => {
  try {
    const user = await db
      .select()
      .from(users)
      .where(eq(users.email, email))
      .limit(1);
    return user[0] || null;
  } catch (error) {
    throw new Error("Failed to fetch user data.");
  }
});

export const checkUserByEmail = cache(async (email: string) => {
  try {
    await db.select().from(users).where(eq(users.email, email)).limit(1);
  } catch (error) {
    return true;
  }
  return false;
});
