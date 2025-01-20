"use server";

import * as z from "zod";
import bcrypt from "bcryptjs";

import { db, salons, users } from "@repo/db";

import { registerSchema } from "@repo/db/schemas/register";

import { createSession } from "@/lib/session";
import { checkUserByEmail } from "./utils/users";

export async function register(values: z.infer<typeof registerSchema>) {
  const validatedFields = registerSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: "Neispravan unos!" };
  }

  const { name, surname, email, password } = validatedFields.data;

  const hashedPassword = await bcrypt.hash(password, 10);

  const existingUser = await checkUserByEmail(email);

  if (existingUser === true) {
    return { error: "Email se vec koristi" };
  }

  const [createdUser] = await db
    .insert(users)
    .values({
      name,
      surname,
      email,
      password: hashedPassword,
      role: "admin",
    })
    .returning();

  if (!createdUser) {
    return { error: "Nije kreiran admin!" };
  }

  const { salonName, salonDescription, salonLocationUrl, salonPhoneNumber } =
    validatedFields.data;

  await db.insert(salons).values({
    name: salonName,
    description: salonDescription,
    locationUrl: salonLocationUrl,
    phoneNumber: salonPhoneNumber,
    adminId: createdUser.id,
  });

  await createSession(createdUser.id);

  return { success: "Uspješno ste se registrirali!" };
}
