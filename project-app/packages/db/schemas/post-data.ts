import { z } from 'zod';
import { zfd } from 'zod-form-data';

const validateImageFile = (file: any) => {
  if (!file) {
    throw new Error('File is required');
  }

  const validTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];
  if (!validTypes.includes(file.mimetype)) {
    throw new Error(
      'Invalid file type. Only JPEG, PNG, GIF, and WEBP are allowed.'
    );
  }

  if (file.size > 5 * 1024 * 1024) {
    throw new Error('File is too large. Max size is 5MB.');
  }

  return file;
};

export const postSchema = zfd.formData({
  title: z
    .string()
    .min(3, 'Title must be at least 3 characters long')
    .max(100, 'Title must be no more than 100 characters long'),
  image: zfd
    .file()
    .refine((file) => file.size < 5000000, {
      message: "File can't be bigger than 5MB.",
    })
    .refine(
      (file) => ['image/jpeg', 'image/png', 'image/jpg'].includes(file.type),
      {
        message: 'File format must be either jpg, jpeg lub png.',
      }
    ),
  tagIds: z
    .array(z.number().int().positive('Tag ID must be a positive integer'))
    .min(1, 'Tag IDs cannot be empty'),
});

export const editPostSchema = z.object({
  id: z.number(),
  title: z
    .string()
    .min(3, 'Title must be at least 3 characters long')
    .max(100, 'Title must be no more than 100 characters long'),
  tagIds: z
    .array(z.number().int().positive('Tag ID must be a positive integer'))
    .min(1, 'Tag IDs cannot be empty'),
});
