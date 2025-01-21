import { getSession } from '@/lib/session';
import {
  db,
  eq,
  salons,
  and,
  posts,
  desc,
  postsToTags,
  sql,
  count,
  sum,
  tags,
} from '@repo/db';
import { PostForEditDto } from '@repo/db/types';
import { cache } from 'react';
import 'server-only';

export const getSalonInfo = cache(async () => {
  try {
    const adminId = await getSession();

    if (!adminId) throw new Error('Salon not found.');

    const [salon] = await db
      .select({
        id: salons.id,
        name: salons.name,
        description: salons.description,
        locationUrl: salons.locationUrl,
        phoneNumber: salons.phoneNumber,
      })
      .from(salons)
      .where(and(eq(salons.adminId, adminId)));

    return salon;
  } catch (error) {
    throw new Error('Failed to fetch salon data.');
  }
});

export const getSalonGallery = cache(async () => {
  try {
    const adminId = await getSession();

    if (!adminId) throw new Error('Salon not found.');

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
          likesNumber: posts.likesNumber || 0,
          salonId: posts.salonId,
          tagIds: posts_to_tags ? [posts_to_tags.tagId] : [],
          createdAt: posts.createdAt,
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
  const adminId = await getSession();

  if (!adminId) return;

  const [salon] = await db
    .select()
    .from(salons)
    .where(eq(salons.adminId, adminId));

  return salon;
};

export const getStatistic = async () => {
  try {
    const salon = await getSalonByAdminId();

    if (!salon) throw new Error('Not found');

    const { id: salonId } = salon;

    console.log('aj');

    const [totalPosts] = await db
      .select({ count: count() })
      .from(posts)
      .where(eq(posts.salonId, salonId));

    console.log('aj1 ');

    const [totalLikes] = await db
      .select({ numberOfLikes: sum(posts.likesNumber) })
      .from(posts)
      .where(eq(posts.salonId, salonId));

    const [totalFollowers] = await db
      .select({ followersNumber: salons.followersNumber })
      .from(salons)
      .where(eq(salons.id, salonId));

    console.log('a3');

    const topTags = await db
      .select({ name: tags.name, count: count() })
      .from(postsToTags)
      .innerJoin(posts, eq(posts.id, postsToTags.postId))
      .innerJoin(tags, eq(tags.id, postsToTags.tagId))
      .where(eq(posts.salonId, salonId))
      .groupBy(tags.id)
      .orderBy(sql`count(*) DESC`)
      .limit(5);
    console.log('a4');

    const recentPosts = await db
      .select({
        id: posts.id,
        title: posts.title,
        likesNumber: posts.likesNumber,
        createdAt: posts.createdAt,
      })
      .from(posts)
      .where(eq(posts.salonId, salonId))
      .orderBy(posts.createdAt)
      .limit(5);

    const topPosts = await db
      .select({
        id: posts.id,
        title: posts.title,
        likesNumber: posts.likesNumber,
        createdAt: posts.createdAt,
      })
      .from(posts)
      .where(eq(posts.salonId, salonId))
      .orderBy(desc(posts.likesNumber))
      .limit(5);

    console.log('a5');

    return {
      totalPosts: totalPosts?.count ?? 0,
      totalLikes: Number(totalLikes?.numberOfLikes) ?? 0,
      totalFollowers: totalFollowers?.followersNumber ?? 0,
      topTags: topTags,
      recentPosts: recentPosts,
      topPosts: topPosts,
    };
  } catch (error) {
    return { error: 'Error with fetching data' };
  }
};
