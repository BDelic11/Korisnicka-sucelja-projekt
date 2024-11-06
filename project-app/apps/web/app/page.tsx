import { revalidatePath } from "next/cache";
import { db, users } from "@repo/db";
import { notFound } from "next/navigation";

//types
import { User } from "@repo/db/types/user";

//actions
import { getAllUsers } from "../actions/users";

//components
import { Button } from "@/components/ui/button";
import LayoutContainer from "@/components/ui/container";
import Link from "next/link";

export default async function Home() {
  const usersData: User[] = await getAllUsers();

  if (!usersData) {
    notFound();
  }

  const onSubmit = async (formData: FormData) => {
    "use server";
    const name = formData.get("name")?.toString();
    await db.insert(users).values({ name: name || "ivo" });

    revalidatePath("/");
  };

  return (
    <LayoutContainer>
      <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
        Welcome to Stylist Inspiration
      </h1>
      <h2 className="scroll-m-20  py-2 text-2xl font-semibold tracking-tight first:mt-0">
        Place that will get you Inspired
      </h2>
      {usersData?.map((user) => <p key={user.name}>{user.name}</p>)}
      <Button asChild>
        <Link className="mt-20" href="/login">
          Login
        </Link>
      </Button>

      {/* //form */}
      <form action={onSubmit} className=" bg-gray-600 p-20">
        <input type="text" name="name" className="bg-white text-black " />
        <Button type="submit">Dodaj</Button>
      </form>
      {/*  */}
    </LayoutContainer>
  );
}
