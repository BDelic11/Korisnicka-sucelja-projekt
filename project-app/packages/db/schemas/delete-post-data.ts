import { z } from 'zod';

export const deletePostSchema = z.object({
  id: z
    .number({
      required_error: 'Salon ID is required',
      invalid_type_error: 'Salon ID must be a number',
    })
    .positive('Salon ID must be a positive number'),
});
