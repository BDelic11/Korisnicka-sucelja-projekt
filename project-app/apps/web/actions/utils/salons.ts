import "server-only";

import { db, eq, posts, salons } from "@repo/db";
import { cache } from "react";

export const getAllSalons = cache(async () => {
  try {
    const salonsData = await db.select().from(salons);

    return salonsData;
  } catch (error) {
    throw new Error("Failed to fetch salons data.");
  }
});

export const getSalonById = cache(async (salonId: number) => {
  try {
    const salon = await db
      .select()
      .from(salons)
      .where(eq(salons.id, salonId))
      .limit(1);

    if (!salon.length) {
      throw new Error("Salon not found.");
    }

    const postsData = await db
      .select()
      .from(posts)
      .where(eq(posts.salonId, salonId));

    return { salon: salon[0], posts: postsData };
  } catch (error) {
    throw new Error("Failed to fetch salon data.");
  }
});
