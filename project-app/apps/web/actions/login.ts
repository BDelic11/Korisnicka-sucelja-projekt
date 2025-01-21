"use server";

import * as z from "zod";

import bcrypt from "bcryptjs";

import { loginSchema } from "@repo/db/schemas/login";
// import { checkUserByUsername, getUserByEmail } from "./user";
import { getUserByEmail } from "./utils/users";
import { createSession } from "@/lib/session";

export async function login(values: z.infer<typeof loginSchema>) {
  const validatedFields = loginSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: "Wrong input. Try again!" };
  }

  const { email, password } = validatedFields.data;

  const user = await getUserByEmail(email);

  if (!user || !user.password) {
    return { error: "There is no user with that email!" };
  }

  console.log(password, user.password);
  const isCorrectPassword = await bcrypt.compare(password, user.password);

  if (!isCorrectPassword) {
    return { error: "Wrong password!" };
  }

  await createSession(user.id);

  //   redirect("/");

  return { success: "Successfully logged in!" };
}
