import { getUserAllDataById } from "@/actions/utils/users";
import { Button } from "@/components/ui/button";
import LayoutContainer from "@/components/ui/container";
// import { Input } from "@/components/ui/input";
import { verifySession } from "@/lib/verifySession";
import Image from "next/image";
import Link from "next/link";

//images
import profileIllustration from "@/public/images/profile.svg";
import { ProfileForm } from "@/components/forms/change-user-data";

// const inputsInfo = [
//   {
//     label: "Name",
//     placeholder: "Your Name",
//     type: "text",
//   },
//   {
//     label: "Email",
//     placeholder: "Your Email",
//     type: "email",
//   },
//   // {
//   //   label: "Password",
//   //   placeholder: "Your Password",
//   //   type: "password",
//   // },
// ];

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
  const user = await getUserAllDataById(userId);

  return (
    <LayoutContainer className="min-h-screen pt-10 flex flex-col md:flex-row w-full justify-around align-middle">
      <section>
        <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl pb-20">
          Profile
        </h1>
        <h1 className="text-2xl font-normal tracking-tight lg:text-2xl">
          Welcome{" "}
          <span className="text-stylist-blue text-bold">{user?.name} </span>
          you can change your profile info here
        </h1>
        <div className="flex flex-col gap-4 my-10">
          <ProfileForm user={user} />
        </div>
        <div className="flex flex-row gap-2">
          <Button variant="destructive">Delete Account</Button>
        </div>
      </section>
      <section className="m-auto">
        <Image
          src={profileIllustration}
          alt="Profile illustration"
          className="w-full h-auto max-w-[600px] m-auto "
        />
      </section>
    </LayoutContainer>
  );
};

export default ProfilePageComponent;
