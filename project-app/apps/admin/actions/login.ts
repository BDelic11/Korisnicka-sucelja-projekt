'use server';
import * as z from 'zod';
import bcrypt from 'bcryptjs';
import { loginSchema } from '@repo/db/schemas/login';
import { getAdminByEmail } from './utils/users';
import { createSession } from '@/lib/session';

export async function login(values: z.infer<typeof loginSchema>) {
  const validatedFields = loginSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: 'Wrong input. Try again!' };
  }

  const { email, password } = validatedFields.data;

  const user = await getAdminByEmail(email);

  if (!user || !user.password) {
    return {
      error: 'There is no user with that email or you are not salon owner!',
    };
  }

  const isCorrectPassword = await bcrypt.compare(password, user.password);

  if (!isCorrectPassword) {
    return { error: 'Wrong password!' };
  }

  await createSession(user.id);

  return { success: 'Successfully logged in!' };
}
