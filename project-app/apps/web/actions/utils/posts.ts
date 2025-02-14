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
  followers,
  sql,
  tags,
  SQL,
  like,
  or,
} from "@repo/db";
import { cache } from "react";
import { verifySession } from "@/lib/verifySession";
import { redirect } from "next/navigation";

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
      return [];
    }

    return searchedSalons;
  } catch (error) {
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

export const getFilteredPosts = async (
  tagIdArray: number[],
  searchTerm: string
) => {
  const filteredPosts = await db
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
    .where(
      or(
        tagIdArray.length > 0
          ? and(
              inArray(postsToTags.tagId, tagIdArray),
              like(salons.name, `%${searchTerm}%`)
            )
          : like(salons.name, `%${searchTerm}%`)
      )
    )
    .groupBy(posts.id, salons.name)
    .having(
      tagIdArray.length > 0
        ? sql`COUNT(DISTINCT ${postsToTags.tagId}) = ${tagIdArray.length}`
        : sql`true`
    )
    .orderBy(posts.id);

  return filteredPosts;
};

//Likes
export async function isPostLiked(postId: number) {
  const { isAuth, userId } = await verifySession();

  if (!isAuth || !userId) {
    redirect("/login");
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

//follows
export async function isSalonFollowed(salonId: number) {
  const { isAuth, userId } = await verifySession();

  if (!isAuth || !userId) {
    redirect("/login");
  }

  try {
    const isFollowed = await db
      .select()
      .from(followers)
      .where(and(eq(followers.userId, userId), eq(followers.salonId, salonId)));
    if (!isFollowed.length) {
      console.log("Salon is not followed");
      return false;
    }

    return true;
  } catch (error) {
    console.error("Failed to check if salon is followed:", error);
    return false;
  }
}
