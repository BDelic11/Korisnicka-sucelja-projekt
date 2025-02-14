import { z } from "zod";

const phoneRegex = new RegExp(
  /^([+]?[\s0-9]+)?(\d{3}|[(]?[0-9]+[)])?([-]?[\s]?[0-9])+$/
);

export const registerSchema = z
  .object({
    name: z
      .string()
      .min(3, "Name must be at least 2 characters long")
      .max(20, "Name must be no more than 20 characters long"),
    surname: z
      .string()
      .min(3, "Surname must be at least 3 characters long")
      .max(20, "Surname must be no more than 20 characters long"),
    email: z
      .string()
      .email("Please enter a valid email")
      .min(1, "Email is required"),
    password: z
      .string()
      .min(8, "Password must be at least 8 characters long")
      .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
      .regex(/[a-z]/, "Password must contain at least one lowercase letter")
      .regex(/[0-9]/, "Password must contain at least one number")
      .regex(
        /[^A-Za-z0-9]/,
        "Password must contain at least one special character"
      ),
    confirmPassword: z
      .string()
      .min(8, "Confirmed password must be at least 8 characters long"),
    salonName: z
      .string()
      .min(3, "Salon name must be at least 2 characters long")
      .max(20, "Salon name must be no more than 20 characters long"),
    salonDescription: z
      .string()
      .min(3, "Salon description must be at least 2 characters long")
      .max(255, "Salon description must be no more than 255 characters long"),
    salonPhoneNumber: z.string().regex(phoneRegex, "Invalid Number!"),
    salonLocationUrl: z.string().url("Salon location must be url"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "Passwords do not match",
  });

export const registerSchemaUser = z
  .object({
    name: z
      .string()
      .min(3, "Name must be at least 2 characters long")
      .max(20, "Name must be no more than 20 characters long"),
    surname: z
      .string()
      .min(3, "Surname must be at least 3 characters long")
      .max(20, "Surname must be no more than 20 characters long"),
    email: z
      .string()
      .email("Please enter a valid email")
      .min(1, "Email is required"),
    password: z
      .string()
      .min(8, "Password must be at least 8 characters long")
      .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
      .regex(/[a-z]/, "Password must contain at least one lowercase letter")
      .regex(/[0-9]/, "Password must contain at least one number")
      .regex(
        /[^A-Za-z0-9]/,
        "Password must contain at least one special character"
      ),
    confirmPassword: z
      .string()
      .min(8, "Confirmed password must be at least 8 characters long"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "Passwords do not match",
  });
