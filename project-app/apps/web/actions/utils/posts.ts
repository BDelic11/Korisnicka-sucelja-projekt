import "server-only";
// "use server";

import {
  db,
  inArray,
  posts,
  salons,
  eq,
  postsToTags,
  likes,
  and,
  ilike,
} from "@repo/db";
import { cache } from "react";
import { verifySession } from "@/lib/verifySession";

export const getAllPosts = cache(async () => {
  try {
    const postsWithSalonData = await db
      .select({
        postId: posts.id,
        postTitle: posts.title,
        postImageUrl: posts.imageUrl,
        postLikes: posts.likesNumber,
        postCreatedAt: posts.createdAt,
        salonName: salons.name,
      })
      .from(posts)
      .innerJoin(salons, eq(posts.salonId, salons.id));

    return postsWithSalonData;
  } catch (error) {
    throw new Error("Failed to fetch posts data.");
  }
});

export const getSearchedSalons = async (searchTerm: string) => {
  try {
    const searchedSalons = await db
      .select({ salonId: salons.id })
      .from(salons)
      .where(ilike(salons.name, `%${searchTerm}%`));

    if (!searchedSalons.length) {
      console.log("No salons found matching search term");
      return [];
    }

    return searchedSalons;
  } catch (error) {
    console.error("Error fetching filtered posts:", error);
    throw new Error("Failed to fetch posts data.");
  }
};
export const getPostBySearchedSalons = async (
  searchedSalons: { salonId: number }[]
) => {
  try {
    const postsData = await db
      .select({
        id: posts.id,
        title: posts.title,
        imageUrl: posts.imageUrl,
        likesNumber: posts.likesNumber,
        createdAt: posts.createdAt,
        salonId: posts.salonId,
        salonName: salons.name,
      })
      .from(posts)
      .innerJoin(salons, eq(posts.salonId, salons.id))
      .where(
        inArray(
          posts.salonId,
          searchedSalons.map((salon) => salon.salonId)
        )
      );

    console.log("postsData (filtered by search term):", postsData);
    return postsData;
  } catch (error) {
    console.error("Error fetching filtered posts:", error);
    throw new Error("Failed to fetch posts data.");
  }
};
export const getPostBySearchedTaggedSalons = async (
  searchedSalons: { salonId: number }[],
  tagIdArray: number[]
) => {
  try {
    const postsData = await db
      .select({
        id: posts.id,
        title: posts.title,
        imageUrl: posts.imageUrl,
        likesNumber: posts.likesNumber,
        createdAt: posts.createdAt,
        salonId: posts.salonId,
        salonName: salons.name,
      })
      .from(posts)
      .innerJoin(salons, eq(posts.salonId, salons.id))
      .innerJoin(postsToTags, eq(posts.id, postsToTags.postId))
      .where(
        and(
          inArray(postsToTags.tagId, tagIdArray),
          inArray(
            posts.salonId,
            searchedSalons.map((salon) => salon.salonId)
          )
        )
      );

    console.log("postsData (filtered by search and tag term):", postsData);
    return postsData;
  } catch (error) {
    console.error("Error fetching filtered posts:", error);
    throw new Error("Failed to fetch posts data.");
  }
};

export const getFilteredPosts = async (
  tagIdArray: number[],
  searchTerm: string
) => {
  const searchedSalons = await getSearchedSalons(searchTerm);

  if (searchedSalons.length) {
    if (tagIdArray.length !== 0) {
      const postsData = await getPostBySearchedTaggedSalons(
        searchedSalons,
        tagIdArray
      );
      if (postsData.length) {
        return postsData;
      }
    } else {
      const postsData = await getPostBySearchedSalons(searchedSalons);
      if (postsData.length) {
        return postsData;
      }
    }
  }
  //   if (postsData.length === 0) {
  //     return postsData;
  //   }
  //   if (tagIdArray.length !== 0) {
  //     const postsData = await getPostBySearchedTaggedSalons(
  //       searchedSalons,
  //       tagIdArray
  //     );
  //     if (postsData.length === 0) {
  //       return postsData;
  //     }
  //   }
  // } else {
  // }
  try {
    // If no tag IDs are provided, return all posts
    if (tagIdArray.length === 0) {
      const postsData = await db
        .select({
          id: posts.id,
          title: posts.title,
          imageUrl: posts.imageUrl,
          likesNumber: posts.likesNumber,
          createdAt: posts.createdAt,
          salonId: posts.salonId,
          salonName: salons.name,
        })
        .from(posts)
        .innerJoin(salons, eq(posts.salonId, salons.id));

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
        salonName: salons.name,
      })
      .from(posts)
      .innerJoin(postsToTags, eq(posts.id, postsToTags.postId))
      .innerJoin(salons, eq(posts.salonId, salons.id))
      .where(inArray(postsToTags.tagId, tagIdArray));

    console.log("postsData (filtered by tag IDs):", postsData);

    return postsData;
  } catch (error) {
    console.error("Error fetching filtered posts:", error);
    throw new Error("Failed to fetch posts data.");
  }
};

//Likes
export async function isPostLiked(postId: number) {
  const { isAuth, userId } = await verifySession();

  if (!isAuth || !userId) {
    console.error("User is not authenticated");
    return false;
  }

  try {
    const isLiked = await db
      .select()
      .from(likes)
      .where(and(eq(likes.userId, userId), eq(likes.postId, postId)));
    if (!isLiked.length) {
      console.log("Post is not liked");
      return false;
    }

    return true;
  } catch (error) {
    console.error("Failed to check if post is liked:", error);
    return false;
  }
}
