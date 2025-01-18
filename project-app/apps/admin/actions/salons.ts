'use server';

import * as z from 'zod';

import { db, eq, salons, users } from '@repo/db';

import { updateSalonSchema } from '@repo/db/schemas/change-salon-data';
// import { checkUserByUsername, getUserByEmail } from "./user";
import { getUserById } from './utils/users';
import { createSession } from '@/lib/session';
import { verifySession } from '@/lib/verifySession';
import { redirect } from 'next/navigation';
import { revalidatePath } from 'next/cache';

export async function changeSalonProfileData(
  values: z.infer<typeof updateSalonSchema>
) {
  const { isAuth, userId } = await verifySession();

  if (!isAuth || !userId) {
    redirect('/login');
  }
  const validatedFields = updateSalonSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: validatedFields.error.message };
  }

  await db
    .update(salons)
    .set({
      ...validatedFields.data,
    })
    .where(eq(salons.adminId, +userId));

  revalidatePath('/profile');

  return { success: 'Uspješno ste se promijenili podatke!' };
}
