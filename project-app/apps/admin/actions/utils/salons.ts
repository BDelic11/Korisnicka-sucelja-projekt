import { getSession } from '@/lib/session';
import { db, eq, salons, users, and } from '@repo/db';
import { UserRole } from '@repo/db/types';
import { cache } from 'react';
import 'server-only';

export const getSalonInfo = cache(async () => {
  try {
    const userId: number = await getSession();

    const [salon] = await db
      .select({
        name: salons.name,
        description: salons.description,
        locationUrl: salons.locationUrl,
        phoneNumber: salons.phoneNumber,
      })
      .from(salons)
      .where(and(eq(salons.adminId, userId)));

    return salon;
  } catch (error) {
    throw new Error('Failed to fetch salon data.');
  }
});
