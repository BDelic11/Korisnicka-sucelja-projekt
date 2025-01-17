'use server';
import { redirect } from 'next/navigation';

import { cookies } from 'next/headers';

export async function deleteSession() {
  (await cookies()).delete('sessionAdmin');
  redirect('/login');
}
