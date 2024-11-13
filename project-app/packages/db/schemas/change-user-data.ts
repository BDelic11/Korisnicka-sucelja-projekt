import { z } from "zod";

export const updateUserSchema = z.object({
  email: z
    .string()
    .email("Invalid email address") // Email must be valid
    .min(1, "Email is required"), // Must not be empty
  name: z.string().min(1, "Name is required").max(50, "Maximum 50 charachters"), // Must not be empty
});
