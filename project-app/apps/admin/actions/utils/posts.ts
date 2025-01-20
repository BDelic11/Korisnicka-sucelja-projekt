import { db, posts, eq } from '@repo/db';

export const getPostById = async (id: number) => {
  const [post] = await db.select().from(posts).where(eq(posts.id, id));

  return post;
};
