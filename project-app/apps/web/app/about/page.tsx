import { notFound, redirect } from "next/navigation";

//types
import { User } from "@repo/db/types/user";

//actions
import { verifySession } from "@/lib/verifySession";
import { getAllUsers, getNameBySession } from "../../actions/utils/users";

//components
import { Button } from "@/components/ui/button";
import LayoutContainer from "@/components/ui/container";
import Link from "next/link";
import { deleteSession } from "@/actions/session";

export default async function About() {
  const usersData: any[] = await getAllUsers();
  const { userId } = await verifySession();
  const currentUser = await getNameBySession(userId);

  if (!usersData) {
    notFound();
  }

  return (
    <LayoutContainer>
      <section>
        <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
          Welcome to Stylist Inspiration
          {currentUser && userId ? (
            <p className="text-lg text-red-500 font-normal">
              You are logged in as: {currentUser.name}
            </p>
          ) : (
            <p className="text-lg text-red-500 font-normal">
              No User that is logged in
            </p>
          )}
        </h1>
        <h2 className="scroll-m-20  py-2 text-2xl font-semibold tracking-tight first:mt-0">
          Place that will get you Inspired
        </h2>

        {usersData &&
          usersData?.map((user) => <p key={user.name}>{user.name}</p>)}

        {/* buttons */}
        <div className="flex flex-row align-middle justify-center">
          <Button asChild>
            <Link className="mt-20" href="/login">
              Login
            </Link>
          </Button>
          <form action={deleteSession}>
            <Button variant="destructive">Logout</Button>
          </form>
        </div>
      </section>
    </LayoutContainer>
  );
}
