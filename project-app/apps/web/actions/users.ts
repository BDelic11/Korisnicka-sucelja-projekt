import { verifySession } from "@/lib/verifySession";
import { db, eq, users } from "@repo/db";
import { cache } from "react";

export async function getAllUsers() {
  try {
    const usersData = await db.select().from(users);

    return usersData;
  } catch (error) {
    throw new Error("Failed to fetch users data.");
  }
}

export const getNameBySession = cache(async (userId: string) => {
  const user = await db
    .select({ name: users.name })
    .from(users)
    .where(eq(users.id, userId))
    .limit(1);
  return user[0] || null;
});

export const getUserById = cache(async (userId: string) => {
  const user = await db
    .select()
    .from(users)
    .where(eq(users.id, userId))
    .limit(1);
  return user[0] || null;
});

// export const getUser = cache(async () => {
//   const session = await verifySession();
//   if (!session) return null;

//   try {
//     const user = await db
//       .select()
//       .from(users)
//       .where(eq(users.id, session.userId))
//       .limit(1);

//     // `user` will be an array with a single object, or empty if no user found
//     return user[0] || null;
//   } catch (error) {
//     console.log("Failed to fetch user");
//     return null;
//   }
// });
