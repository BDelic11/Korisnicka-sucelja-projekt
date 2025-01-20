import { Button } from "@/components/ui/button";
import LayoutContainer from "@/components/ui/container";
import { verifySession } from "@/lib/verifySession";
import Image from "next/image";
import Link from "next/link";

// images
import profileIllustration from "@/public/images/profile.svg";
import { notFound } from "next/navigation";
import { getSalonById } from "@/actions/utils/salons";

import { SalonPostsGrid } from "./_components/salon-images-grid";
import { FollowComponent } from "@/components/ui/follow-component";
import { isSalonFollowed } from "@/actions/utils/posts";

export default async function SalonPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const salonId = (await params).id;
  const { userId } = await verifySession();
  const { salon, posts } = await getSalonById(+salonId);

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

  if (!salon) {
    return notFound();
  }
  const initialFollowedBool = await isSalonFollowed(salon.id);

  return (
    <LayoutContainer className="min-h-screen pt-10  flex flex-col w-full  ">
      <div className=" flex flex-col justify-center align-middle w-full md:gap-2    ">
        <div className=" flex flex-row justify-between align-middle w-full md:px-52">
          <Image
            src={profileIllustration}
            alt="Profile illustration"
            className="w-20 h-20 rounded-full border-2 border-black max-w-[600px]  "
          />
          <div className=" flex flex-col justify-center align-middle md:gap-2    ">
            <FollowComponent
              salonId={salon.id}
              initialFollowedBool={initialFollowedBool}
              followersNumber={salon.followersNumber}
            />
          </div>
        </div>
        <div className="flex flex-col justify-between align-middle gap-1 md:px-52">
          <h1 className="mb-4 font-semibold text-lg">{salon.name}</h1>
          <Link
            target="_blank"
            rel="noopener noreferrer"
            href="https://www.google.com/maps/place/Studio+Puntarska/@43.5113082,16.424442,16z/data=!4m9!3m8!1s0x13355df75a7552ff:0x98b7adb685bb91c2!5m2!4m1!1i2!8m2!3d43.5113912!4d16.4284574!16s%2Fg%2F11b73ntfxz?entry=ttu&g_ep=EgoyMDI0MTIwOS4wIKXMDSoASAFQAw%3D%3D"
          >
            <p className="text-stylist-blue text-sm">{salon.locationUrl}</p>
          </Link>
          <p className="text-sm">{salon.phoneNumber}</p>
          <p className="text-gray-500 text-sm">{salon.description}</p>
        </div>
      </div>

      <section className="pt-8  ">
        {posts ? (
          <SalonPostsGrid posts={posts} />
        ) : (
          <div className="pt-4 md:pt-20 md:px-52">
            <p>No Posts by this salon</p>
          </div>
        )}
      </section>
    </LayoutContainer>
  );
}
