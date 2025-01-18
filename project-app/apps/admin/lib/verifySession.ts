import 'server-only';

import { cookies } from 'next/headers';
import { decrypt } from '@/lib/session';
import { cache } from 'react';

export const verifySession = cache(async () => {
  const cookie = (await cookies()).get('sessionAdmin')?.value;
  const session = await decrypt(cookie);

  if (!session?.userId || !session) {
    return { isAuth: false, userId: null };
  }

  const userId = session.userId.toString();

  return { isAuth: true, userId: userId };
});