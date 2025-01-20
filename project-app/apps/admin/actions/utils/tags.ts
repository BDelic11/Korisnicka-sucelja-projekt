import { db, postsToTags, tags, eq } from '@repo/db';

export const getAllTags = async () => {
  return await db.select().from(tags);
};

export const getPostTagsByPostId = async (postId: number) => {
  return await db
    .select()
    .from(postsToTags)
    .where(eq(postsToTags.postId, postId));
};
