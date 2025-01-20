import { z } from 'zod';

const phoneRegex = new RegExp(
  /^([+]?[\s0-9]+)?(\d{3}|[(]?[0-9]+[)])?([-]?[\s]?[0-9])+$/
);

export const updateSalonSchema = z.object({
  name: z
    .string()
    .min(3, 'Salon name must be at least 2 characters long')
    .max(20, 'Salon name must be no more than 20 characters long'),
  description: z
    .string()
    .min(3, 'Salon description must be at least 2 characters long')
    .max(255, 'Salon description must be no more than 255 characters long'),
  phoneNumber: z.string().regex(phoneRegex, 'Invalid Number!'),
  locationUrl: z.string().url('Salon location must be url'),
});
