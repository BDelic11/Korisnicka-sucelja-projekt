"use server";

import { verifySession } from "@/lib/verifySession";
import { and, db, eq, sql } from "@repo/db";
import { followers, salons } from "@repo/db/schema";
import { revalidatePath } from "next/cache";
import { isSalonFollowed } from "./utils/posts";

export async function followSalon(salonId: number) {
  const { userId: currentUserId } = await verifySession();
  if (!currentUserId) {
    return { error: "You need to be logged in to follow salon" };
  }
  try {
    await db.insert(followers).values({
      salonId: salonId,
      userId: currentUserId,
    });

    await db
      .update(salons)
      .set({
        followersNumber: sql`${salons.followersNumber} + 1`,
      })
      .where(eq(salons.id, salonId));

    revalidatePath(`/salon/${salonId}`);

    return { success: "Salon followed" };
  } catch (error) {
    console.error("Failed to follow the salon:", error);
    return { error: "Failed to follow the salon" };
  }
}

export async function unfollowSalon(salonId: number) {
  const { userId: currentUserId } = await verifySession();
  const isLiked = await isSalonFollowed(salonId);

  if (!isLiked) {
    return { error: "Post is not liked" };
  }

  if (!currentUserId) {
    return { error: "You need to be logged in to unlike the post" };
  }
  try {
    await db
      .delete(followers)
      .where(
        and(eq(followers.salonId, salonId), eq(followers.userId, currentUserId))
      );

    await db
      .update(salons)
      .set({
        followersNumber: sql`${salons.followersNumber} - 1`,
      })
      .where(eq(salons.id, salonId));

    revalidatePath(`/salon/${salonId}`);

    return { success: "Salon unfollowed" };
  } catch (error) {
    console.error("Failed to unfollow the salon:", error);
    return { error: "Failed to unfollow the salon" };
  }
}
