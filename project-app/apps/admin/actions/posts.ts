'use server';

import * as z from 'zod';

import { db, eq, inArray, posts, postsToTags, salons, users } from '@repo/db';

import { editPostSchema, postSchema } from '@repo/db/schemas/post-data';
// import { checkUserByUsername, getUserByEmail } from "./user";
import { getUserById } from './utils/users';
import { createSession } from '@/lib/session';
import { verifySession } from '@/lib/verifySession';
import { redirect } from 'next/navigation';
import { revalidatePath } from 'next/cache';
import { getSalonByAdminId } from './utils/salons';
import { uploadImageToCloudinary } from './cloudinary';
import { getPostById } from './utils/posts';
import { getPostTagsByPostId } from './utils/tags';

export async function createPostData(data: FormData) {
  const title = data.get('title')?.toString();
  const tagIds = JSON.parse(data.get('tagIds')?.toString() || '[]');
  const image = data.get('image') as File | null;

  const validation = postSchema.safeParse({ title, tagIds, image });
  if (!validation.success) {
    throw new Error('Invalid data');
  }

  const {
    title: validatedTitle,
    tagIds: validatedTagIds,
    image: validatedImage,
  } = validation.data;

  const { isAuth, userId } = await verifySession();

  if (!isAuth || !userId) {
    redirect('/login');
  }

  var salon = await getSalonByAdminId();

  if (!salon) {
    redirect('/login');
  }

  // const validatedFields = postSchema.safeParse(values);

  // if (!validatedFields.success) {
  //   return { error: validatedFields.error.message };
  // }

  console.log('ajj 1');

  const fileBuffer = await image.arrayBuffer();
  const mimeType = image.type;
  const encoding = 'base64';
  const base64Data = Buffer.from(fileBuffer).toString('base64');

  const fileUri = 'data:' + mimeType + ';' + encoding + ',' + base64Data;

  console.log('ajj 2');

  console.log(fileUri);

  var imageUrl = await uploadImageToCloudinary('ime', fileUri);

  var [post] = await db
    .insert(posts)
    .values({
      salonId: salon.id,
      title: validatedTitle,
      imageUrl: imageUrl,
    })
    .returning();

  if (!post) return;

  var postToTagsToAdd = validatedTagIds.map((tagId) => ({
    postId: post!.id,
    tagId: tagId,
  }));

  await db.insert(postsToTags).values(postToTagsToAdd);

  revalidatePath('/gallery');

  return { success: 'Uspješno ste se promijenili podatke!' };
}

export async function deletePost(postId: number) {
  const { isAuth, userId } = await verifySession();

  if (!isAuth || !userId) {
    redirect('/login');
  }

  const [postToDelete] = await db
    .select({ id: posts.id })
    .from(posts)
    .where(eq(posts.id, postId))
    .innerJoin(salons, eq(salons.adminId, +userId));

  console.log('test', postToDelete);

  // await db.delete(postsToTags).where(eq(posts.id, postId));
  // await db.delete(posts).where(eq(posts.id, postId));
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
