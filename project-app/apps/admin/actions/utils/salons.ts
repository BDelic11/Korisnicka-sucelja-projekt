import { getSession } from '@/lib/session';
import { db, eq, salons, and, posts } from '@repo/db';
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

export const getSalonGallery = cache(async () => {
  try {
    const adminId: number = await getSession();

    const [salon] = await db
      .select()
      .from(salons)
      .where(eq(salons.adminId, adminId));

    if (!salon) throw new Error('Salon not found.');

    const salonPosts = await db
      .select()
      .from(posts)
      .where(eq(posts.salonId, salon.id));

    return { salon, posts: salonPosts };
  } catch (error) {
    throw new Error('Failed to fetch salon data.');
  }
});
