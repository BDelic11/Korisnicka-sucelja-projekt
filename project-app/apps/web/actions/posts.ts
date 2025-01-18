"use server";

import { verifySession } from "@/lib/verifySession";
import { and, db, eq, sql } from "@repo/db";
import { likes, posts } from "@repo/db/schema";
import { revalidatePath } from "next/cache";
import { isPostLiked } from "./utils/posts";

export async function likePost(postId: number) {
  const { userId: currentUserId } = await verifySession();
  if (!currentUserId) {
    return { error: "You need to be logged in to like the post" };
  }
  try {
    await db.insert(likes).values({
      postId: postId,
      userId: currentUserId,
    });

    await db
      .update(posts)
      .set({
        likesNumber: sql`${posts.likesNumber} + 1`,
      })
      .where(eq(posts.id, postId));

    revalidatePath("/inspiration");

    return { success: "Post liked" };
  } catch (error) {
    console.error("Failed to like the post:", error);
    return { error: "Failed to like the post" };
  }
}

export async function unlikePost(postId: number) {
  const { userId: currentUserId } = await verifySession();
  const isLiked = await isPostLiked(postId);

  if (!isLiked) {
    return { error: "Post is not liked" };
  }

  if (!currentUserId) {
    return { error: "You need to be logged in to unlike the post" };
  }
  try {
    await db
      .delete(likes)
      .where(and(eq(likes.postId, postId), eq(likes.userId, currentUserId)));

    await db
      .update(posts)
      .set({
        likesNumber: sql`${posts.likesNumber} - 1`,
      })
      .where(eq(posts.id, postId));

    revalidatePath("/inspiration");

    return { success: "Post unliked" };
  } catch (error) {
    console.error("Failed to unlike the post:", error);
    return { error: "Failed to unlike the post" };
  }
}
