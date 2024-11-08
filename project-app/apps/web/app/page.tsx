import { notFound } from "next/navigation";
import { verifySession } from "@/lib/verifySession";

//types
import { User } from "@repo/db/types/user";

//actions
import { getAllUsers, getNameBySession } from "../actions/users";

//components
import { Button } from "@/components/ui/button";
import LayoutContainer from "@/components/ui/container";
import Link from "next/link";

export default async function Home() {
  const usersData: User[] = await getAllUsers();
  const session = await verifySession();
  const currentUser = await getNameBySession(session.userId);

  if (!usersData) {
    notFound();
  }

  // const onSubmit = async (formData: FormData) => {
  //   "use server";

  //   const nameUser = formData.get("name");
  //   const surname = formData.get("surname");
  //   const email = formData.get("email");
  //   const password = formData.get("password");

  //   // Insert into the database
  //   await db.insert(users).values({
  //     id:
  //     name: nameUser as User["name"],
  //     surname: surname as User["surname"],
  //     email: email as User["email"],
  //     password: password as User["password"],
  //   });
  //   revalidatePath("/");
  // };

  return (
    <LayoutContainer>
      <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
        Welcome to Stylist Inspiration
        {currentUser ? (
          <p className="text-lg text-red-500 font-normal">
            You are logged in as: {currentUser.name}
          </p>
        ) : (
          <p>NO USER</p>
        )}
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

      {/* <form action={onSubmit} className=" bg-gray-600 p-20 flex flex-col gap-2">
        <input type="text" name="name" className="bg-white text-black " />
        <input type="text" name="surname" className="bg-white text-black " />
        <input type="text" name="email" className="bg-white text-black " />
        <input type="text" name="password" className="bg-white text-black " />
        <Button type="submit">Dodaj</Button>
      </form> */}
      {/*  */}
    </LayoutContainer>
  );
}
