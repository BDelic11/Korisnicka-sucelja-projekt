// "use server";

// import { revalidatePath } from "next/cache";
// import * as z from "zod";

// import prismadb from "@/lib/prismadb";
// import { registerSchema } from "@repo/db/schemas/register";
// import { getProductByName } from "./get-product";

// export const createProduct = async (values: z.infer<typeof registerSchema>) => {
// //   const validatedFields = registaerSchema.safeParse(values);

//   if (!validatedFields.success) {
//     return { error: "Neispravan unos!" };
//   }

//   const { name, surname, email, password } = validatedFields.data;

//   const existingProduct = await getProductByName(name);

//   if (existingProduct) {
//     return { error: "Produkt vec postoji." };
//   }

//   await prismadb.product.create({
//     data: {
//       name,
//       description,
//       category,
//       price,
//       image,
//       stock,
//     },
//   });
//   revalidatePath("/admin/products");
//   revalidatePath("/products");

//   // verification token TODO

//   return { success: "Napravili ste produkt!" };
// };
