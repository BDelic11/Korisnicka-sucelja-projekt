import { z } from "zod";

export const loginSchema = z.object({
  email: z
    .string()
    .email("Invalid email address") // Email must be valid
    .min(1, "Email is required"), // Must not be empty
  password: z
    .string()
    .min(8, "Password must be at least 8 characters long") // Minimum password length
    .max(100, "Password must be no more than 100 characters long") // Maximum password length
    .regex(/[A-Z]/, "Password must have at least one uppercase letter") // Uppercase
    .regex(/[a-z]/, "Password must have at least one lowercase letter") // Lowercase
    .regex(/[0-9]/, "Password must contain at least one number") // Number
    .regex(/[^A-Za-z0-9]/, "Password must have at least one special character"), // Special character
});
