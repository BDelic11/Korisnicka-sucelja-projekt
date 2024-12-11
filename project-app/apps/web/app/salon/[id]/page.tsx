import { Button } from "@/components/ui/button";
import LayoutContainer from "@/components/ui/container";
import { verifySession } from "@/lib/verifySession";
import Image from "next/image";
import Link from "next/link";

// images
import profileIllustration from "@/public/images/profile.svg";

// images
import image1 from "@/public/images/hair/hair1.jpg";
import image2 from "@/public/images/hair/hair2.webp";
import { SalonPostsGrid } from "./_components/salon-images-grid";
import { Tags } from "@repo/db/types/post";

const salon = {
  id: 1,
  followers: 100,
  name: "Salon Name",
  description:
    "Ovaj salon je najbolji salon u gradu, dodite i uvjerite se sami",
  location: "Ulica 123, 12345 Grad",
  phoneNumber: "+385 821 123 123",
  images: [image1, image2],
  posts: [
    {
      id: "1",
      image: image1,
      title: "classic Long Hair",
      tags: [Tags.LongHair, Tags.Straight, Tags.Brunette],
    },
    {
      id: "2",
      image: image2,
      title: "Short and Wavy",
      tags: [Tags.ShortHair, Tags.Wavy, Tags.Blonde],
    },
    {
      id: "3",
      image: image1,
      title: "Curly Updo",
      tags: [Tags.Curly, Tags.Updo, Tags.Brunette],
    },
    {
      id: "4",
      image: image1,
      title: "Classic Bob Cut",
      tags: [Tags.ShortHair, Tags.BobCut, Tags.Straight],
    },
  ],
};

export default async function SalonPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const salonId = (await params).id;
  const { userId } = await verifySession();
  //   const { salondata } = await getSalonById(params.id);

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

  //   if (!salonData) {
  //     return notFound();
  //   }

  return (
    <LayoutContainer className="min-h-screen pt-10  flex flex-col w-full  ">
      <div className=" flex flex-col justify-center align-middle w-full md:gap-2    ">
        <div className=" flex flex-row justify-between align-middle w-full md:px-52">
          <Image
            src={profileIllustration}
            alt="Profile illustration"
            className="w-20 h-20 rounded-full border-2 border-black max-w-[600px]  "
          />
          <div className="flex flex-row gap-2 font-semibold text-lg">
            <p>Followers:</p>
            <p>{salon.followers}</p>
          </div>
        </div>
        <div className="flex flex-col justify-between align-middle gap-1 md:px-52">
          <h1 className="mb-4 font-semibold text-lg">{salon.name}</h1>
          <Link
            target="_blank"
            rel="noopener noreferrer"
            href="https://www.google.com/maps/place/Studio+Puntarska/@43.5113082,16.424442,16z/data=!4m9!3m8!1s0x13355df75a7552ff:0x98b7adb685bb91c2!5m2!4m1!1i2!8m2!3d43.5113912!4d16.4284574!16s%2Fg%2F11b73ntfxz?entry=ttu&g_ep=EgoyMDI0MTIwOS4wIKXMDSoASAFQAw%3D%3D"
          >
            <p className="text-stylist-blue text-sm">{salon.location}</p>
          </Link>
          <p className="text-sm">{salon.phoneNumber}</p>
          <p className="text-gray-500 text-sm">{salon.description}</p>
        </div>
      </div>

      <section className="pt-8  ">
        {salon.posts.length ? (
          <SalonPostsGrid posts={salon.posts} />
        ) : (
          <div className="pt-4 md:pt-20 md:px-52">
            <p>No Posts by this salon</p>
          </div>
        )}
      </section>
    </LayoutContainer>
  );
}
