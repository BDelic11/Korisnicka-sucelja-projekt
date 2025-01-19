import { getSession } from '@/lib/session';
import { db, eq, salons, and, posts, desc, postsToTags } from '@repo/db';
import { PostForEditDto } from '@repo/db/types';
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
      .where(eq(posts.salonId, salon.id))
      .leftJoin(postsToTags, eq(posts.id, postsToTags.postId))
      .orderBy(desc(posts.createdAt));

    const groupedPosts = salonPosts.reduce((acc, { posts, posts_to_tags }) => {
      const existingPost = acc.find((post) => post.id === posts.id);

      if (existingPost) {
        if (posts_to_tags) {
          existingPost.tagIds.push(posts_to_tags.tagId);
        }
      } else {
        acc.push({
          id: posts.id,
          imageUrl: posts.imageUrl,
          title: posts.title,
          likesNumber: posts.likesNumber,
          salonId: posts.salonId,
          tagIds: posts_to_tags ? [posts_to_tags.tagId] : [], // If posts_to_tags is null, initialize tagIds as empty array
        });
      }

      return acc;
    }, [] as Array<PostForEditDto>);

    return { salon, posts: groupedPosts };
  } catch (error) {
    throw new Error('Failed to fetch salon data.');
  }
});

export const getSalonByAdminId = async () => {
  const adminId: number = await getSession();

  const [salon] = await db
    .select()
    .from(salons)
    .where(eq(salons.adminId, adminId));

  return salon;
};
