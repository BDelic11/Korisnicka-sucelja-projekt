// "use server";

// import * as z from "zod";

// import bcrypt from "bcryptjs";

// import { db, users } from "@repo/db";

// import { registerSchema } from "@repo/db/schemas/register";
// // import { checkUserByUsername, getUserByEmail } from "./user";
// import { redirect } from "next/navigation";

// export const register = async (values: z.infer<typeof registerSchema>) => {
//   const validatedFields = registerSchema.safeParse(values);

//   if (!validatedFields.success) {
//     return { error: "Wrong input. Try again!" };
//   }

//   const { username, email, password, name, surname } = validatedFields.data;
//   const hashedPassword = await bcrypt.hash(password, 10);

//   const existingUser = await getUserByEmail(email);

//   if (existingUser) {
//     return { error: "Email se već koristi." };
//   }
//   const { success, error: usernameError } = await checkUserByUsername(username);

//   if (usernameError || !success) {
//     return { error: usernameError };
//   }

//   const initialSaldoCents = 20000;

//   const createdUser = await prismadb.user.create({
//     data: {
//       username,
//       surname,
//       email,
//       password: hashedPassword,
//       name,
//       temporaryUserWallet: {
//         create: {
//           saldo: initialSaldoCents,
//         },
//       },
//       // Added saldo on temporary wallet or faculty purposess
//     },
//     include: {
//       temporaryUserWallet: true,
//     },
//   });

//   if (!createdUser) {
//     return { error: "Greška u registraciji korisnika." };
//   }

//   // verification token TODO

//   return { success: "Uspješno ste se registrirali!" };
// };
