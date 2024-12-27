import "server-only";
// "use server";

import { db, inArray, posts, tags, eq, postsToTags } from "@repo/db";
import { cache } from "react";

export const getAllPosts = cache(async () => {
  try {
    const tagsData = await db.select().from(posts);

    return tagsData;
  } catch (error) {
    throw new Error("Failed to fetch tags data.");
  }
});

export const getFilteredPosts = async (tagIdArray: number[]) => {
  try {
    // If no tag IDs are provided, return all posts
    if (tagIdArray.length === 0) {
      const postsData = await db.select().from(posts);
      console.log("postsData (no tags provided):", postsData);
      return postsData;
    }

    // Fetch posts that are linked to the given tag IDs
    const postsData = await db
      .select({
        id: posts.id,
        title: posts.title,
        imageUrl: posts.imageUrl,
        likesNumber: posts.likesNumber,
        createdAt: posts.createdAt,
        salonId: posts.salonId,
      })
      .from(posts)
      .innerJoin(postsToTags, eq(posts.id, postsToTags.postId))
      .where(inArray(postsToTags.tagId, tagIdArray));

    console.log("postsData (filtered by tag IDs):", postsData);

    return postsData;
  } catch (error) {
    console.error("Error fetching filtered posts:", error);
    throw new Error("Failed to fetch posts data.");
  }
};
