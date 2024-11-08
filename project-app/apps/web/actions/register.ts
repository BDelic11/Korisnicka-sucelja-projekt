"use server";

import * as z from "zod";
import bcrypt from "bcryptjs";
import { v4 as uuidv4 } from "uuid";

import { db, users } from "@repo/db";

import { registerSchema } from "@repo/db/schemas/register";
// import { checkUserByUsername, getUserByEmail } from "./user";
// import { User } from "@repo/db/types/user";
// import Error from "next/error";
import { createSession } from "@/lib/session";

export const register = async (values: z.infer<typeof registerSchema>) => {
  const validatedFields = registerSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: "Neispravan unos!" };
  }

  const { name, surname, email, password } = validatedFields.data;
  const hashedPassword = await bcrypt.hash(password, 10);

  //   const existingUser = await getUserByEmail(email);

  //   if (existingUser) {
  //     return { error: "Email se već koristi." };
  //   }
  //   const { success, error: usernameError } = await checkUserByUsername(username);

  //   if (usernameError || !success) {
  //     return { error: usernameError };
  //   }

  //   if (!createdUser) {
  //     return { error: "Greška u registraciji korisnika." };
  //   }

  // verification token TODO
  const userId = uuidv4();

  const [createdUser] = await db
    .insert(users)
    .values({
      id: userId,
      name,
      surname,
      email,
      password: hashedPassword,
    })
    .returning({ id: users.id });

  if (!createdUser) {
    return { error: "Nije kreiran user!" };
  }

  await createSession(userId);

  return { success: "Uspješno ste se registrirali!" };
};
