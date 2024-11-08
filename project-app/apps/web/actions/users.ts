import { db, users } from "@repo/db";

export async function getAllUsers() {
  try {
    const usersData = await db.select().from(users);

    return usersData;
  } catch (error) {
    throw new Error("Failed to fetch users data.");
  }
}
