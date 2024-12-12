'use server';

import { cookies } from 'next/headers';

export async function deleteSession() {
  (await cookies()).delete('sessionAdmin');
}
