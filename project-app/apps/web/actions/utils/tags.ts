// import "server-only";
"use server";

import { db, eq, postsToTags, tags } from "@repo/db";
import { cache } from "react";

export const getAllTags = cache(async () => {
  try {
    const tagsData = await db.select().from(tags);

    return tagsData;
  } catch (error) {
    throw new Error("Failed to fetch tags data.");
  }
});

export const getPostTags = async (postId: number | undefined) => {
  try {
    if (!postId) {
      return null;
    }
    const postTags = await db
      .select({
        id: tags.id,
        name: tags.name,
      })
      .from(tags)
      .innerJoin(postsToTags, eq(tags.id, postsToTags.tagId))
      .where(eq(postsToTags.postId, postId));

    return postTags;
  } catch (error) {
    throw new Error("Failed to fetch tags data.");
  }
};
