import { getUserById } from "@/actions/utils/users";
import { Button } from "@/components/ui/button";
import { verifySession } from "@/lib/verifySession";
import Link from "next/link";

const ProfilePageComponent = async () => {
  const { userId } = await verifySession();
  if (!userId) {
    return (
      <main className=" min-h-screen flex flex-col justify-center align-middle md:flex-row md:w-full md:h-full md:my-auto md:px-24">
        <center>
          <p>You are not logged in. Please log in to see your profile</p>
          <Button asChild>
            <Link href="/login">Go to Login page</Link>
          </Button>
        </center>
      </main>
    );
  }
  const user = await getUserById(userId);

  return (
    <main className="flex flex-col justify-center align-middle md:flex-row md:w-full md:h-full md:my-auto md:px-24">
      <center>
        <p>Hello {user?.name}</p>
      </center>
    </main>
  );
};

export default ProfilePageComponent;
