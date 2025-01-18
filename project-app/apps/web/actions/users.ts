"use server";

import * as z from "zod";

import { db, eq, users } from "@repo/db";

import { updateUserSchema } from "@repo/db/schemas/change-user-data";
// import { checkUserByUsername, getUserByEmail } from "./user";
import { getUserByEmail } from "./utils/users";
import { createSession } from "@/lib/session";
import { verifySession } from "@/lib/verifySession";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";

export async function changeUserProfileData(
  values: z.infer<typeof updateUserSchema>
) {
  const { isAuth, userId } = await verifySession();

  if (!isAuth || !userId) {
    redirect("/login");
  }
  const validatedFields = updateUserSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: "Wrong input. Try again!" };
  }

  const { email: newEmail, name: newName } = validatedFields.data;

  const user = await getUserByEmail(newEmail);

  if (user) {
    return { error: "Email already in use! Try something else" };
  }

    await db
    .update(users)
    .set({
      name: newName,
      email: newEmail,
    })
    .where(eq(users.id, userId));

  await createSession(userId);
  revalidatePath("/profile");

  return { success: "Uspješno ste se promijenili podatke!" };
}
