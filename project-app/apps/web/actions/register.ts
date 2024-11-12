"use server";

import * as z from "zod";
import bcrypt from "bcryptjs";
import { v4 as uuidv4 } from "uuid";

import { db, users } from "@repo/db";

//schema
import { registerSchema } from "@repo/db/schemas/register";

//actions
import { createSession } from "@/lib/session";
import { checkUserByEmail } from "./utils/users";

export async function register(values: z.infer<typeof registerSchema>) {
  const validatedFields = registerSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: "Neispravan unos!" };
  }

  const { name, surname, email, password } = validatedFields.data;

  //hash password
  const hashedPassword = await bcrypt.hash(password, 10);

  //check used mail
  const existingUser = await checkUserByEmail(email);

  if (existingUser === true) {
    return { error: "Email se vec koristi" };
  }

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
}
