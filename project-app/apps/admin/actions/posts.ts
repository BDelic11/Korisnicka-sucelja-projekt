'use server';

import * as z from 'zod';

import { db, eq, inArray, posts, postsToTags, salons } from '@repo/db';

import { editPostSchema, postSchema } from '@repo/db/schemas/post-data';
import { verifySession } from '@/lib/verifySession';
import { redirect } from 'next/navigation';
import { revalidatePath } from 'next/cache';
import { getSalonByAdminId } from './utils/salons';
import { handleImageUpload } from './cloudinary';
import { getPostById } from './utils/posts';
import { getPostTagsByPostId } from './utils/tags';
import { Post } from '@repo/db/types';
import { deletePostSchema } from '@repo/db/schemas/delete-post-data';

export async function createPostData(data: FormData) {
  const { isAuth, userId } = await verifySession();
  if (!isAuth || !userId) redirect('/login');

  var salon = await getSalonByAdminId();
  if (!salon) redirect('/login');

  const title = data.get('title')?.toString();
  const tagIds = JSON.parse(data.get('tagIds')?.toString() || '[]');
  const image = data.get('image') as File | null;

  const validation = postSchema.safeParse({ title, tagIds, image });
  if (!validation.success) {
    return { error: 'Neispravan unos!' };
  }
  const {
    title: validatedTitle,
    tagIds: validatedTagIds,
    image: validatedImage,
  } = validation.data;

  const imageUri = await handleImageUpload(validatedImage, salon);

  if (!imageUri) {
    return { error: 'Problem sa spremanjem slike' };
  }

  let post: Post | undefined;

  try {
    [post] = await db
      .insert(posts)
      .values({
        salonId: salon.id,
        title: validatedTitle,
        imageUrl: imageUri,
      })
      .returning();
  } catch (error) {
    return { error: 'Problem sa spremanjem posta u bazu.' };
  }

  if (!post) {
    return { error: 'Problem sa spremanjem posta u bazu.' };
  }

  const postToTagsToAdd = validatedTagIds.map((tagId) => ({
    postId: post!.id,
    tagId: tagId,
  }));

  try {
    await db.insert(postsToTags).values(postToTagsToAdd);
  } catch (error) {
    console.error('Error inserting tags into database:', error);
    return { error: 'Problem sa spremanjem tagova.' };
  }

  revalidatePath('/gallery');

  return { success: 'Uspješno ste se promijenili podatke!' };
}

export async function deletePost(values: z.infer<typeof deletePostSchema>) {
  const { isAuth, userId } = await verifySession();

  if (!isAuth || !userId) {
    redirect('/login');
  }

  const validatedFields = deletePostSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: validatedFields.error.message };
  }

  const [postToDelete] = await db
    .select({ id: posts.id })
    .from(posts)
    .where(eq(posts.id, validatedFields.data.id))
    .innerJoin(salons, eq(salons.adminId, +userId));

  if (!postToDelete) return { error: 'Post not found!' };

  try {
    await db.delete(posts).where(eq(posts.id, postToDelete.id));
  } catch (error) {
    return { error: 'Problem with post delete!' };
  }

  revalidatePath('/gallery');

  return { success: 'Uspješno ste se promijenili podatke!' };
}

export async function editPostData(values: z.infer<typeof editPostSchema>) {
  const { isAuth, userId } = await verifySession();

  if (!isAuth || !userId) {
    redirect('/login');
  }

  var salon = await getSalonByAdminId();

  if (!salon) {
    redirect('/login');
  }

  const validatedFields = editPostSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: validatedFields.error.message };
  }

  const postToEditForm = validatedFields.data;

  const postToEdit = await getPostById(postToEditForm.id);

  if (!postToEdit) return { error: 'Post not found!' };

  console.log(1);

  await db
    .update(posts)
    .set({
      title: postToEditForm.title,
    })
    .where(eq(posts.id, postToEditForm.id));

  const oldPostToTags = await getPostTagsByPostId(postToEdit.id);
  var newPostToTags = postToEditForm.tagIds.map((tagId) => ({
    postId: postToEditForm.id,
    tagId: tagId,
  }));

  console.log(newPostToTags);

  if (oldPostToTags.length > 0) {
    console.log(oldPostToTags);

    const tagIdsToDelete = oldPostToTags
      .filter(
        (oldTag) =>
          !newPostToTags.some((newTag) => newTag.tagId === oldTag.tagId)
      )
      .map((tag) => tag.postId);

    await db
      .delete(postsToTags)
      .where(inArray(postsToTags.postId, tagIdsToDelete));

    console.log('12');
  }

  if (postToEditForm.tagIds.length > 0) {
    console.log('13');

    const tagsToAdd = newPostToTags.filter(
      (newTag) => !oldPostToTags.some((oldTag) => oldTag.tagId === newTag.tagId)
    );
    console.log('14');

    for (const tag of tagsToAdd) {
      await db.insert(postsToTags).values({
        tagId: tag.tagId,
        postId: tag.postId,
      });
    }
  }

  revalidatePath('/gallery');

  return { success: 'Uspješno ste se promijenili podatke!' };
}
