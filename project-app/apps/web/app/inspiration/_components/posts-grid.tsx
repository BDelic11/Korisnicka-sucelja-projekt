// import Loading from "@/app/loading";
// import Search from "@/components/ui/search";
// import Image, { StaticImageData } from "next/image";
import React from "react";
import { Tags } from "@repo/db/types/post";

import image1 from "@/public/images/illustration-1.svg";
import image2 from "@/public/images/illustration-2.svg";
import image3 from "@/public/images/image3.jpg";
import { Post as PostType } from "@repo/db/types/post";
import Post from "./post";

const posts: PostType[] = [
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
    image: image3,
    title: "Curly Updo",
    tags: [Tags.Curly, Tags.Updo, Tags.Brunette],
  },
  {
    id: "4",
    image: image3,
    title: "Classic Bob Cut",
    tags: [Tags.ShortHair, Tags.BobCut, Tags.Straight],
  },
  // {
  //   id: "5",
  //   image: "image5.jpg",
  //   title: "Braided Ponytail",
  //   tags: [Tags.Ponytail, Tags.Braids, Tags.LongHair],
  // },
  // {
  //   id: "6",
  //   image: "image6.jpg",
  //   title: "Blonde Wavy Style",
  //   tags: [Tags.LongHair, Tags.Wavy, Tags.Blonde],
  // },
  // {
  //   id: "7",
  //   image: "image7.jpg",
  //   title: "Elegant Updo",
  //   tags: [Tags.Updo, Tags.Straight, Tags.Brunette],
  // },
  // {
  //   id: "8",
  //   image: "image8.jpg",
  //   title: "Casual Curly",
  //   tags: [Tags.ShortHair, Tags.Curly, Tags.Brunette],
  // },
  // {
  //   id: "9",
  //   image: "image9.jpg",
  //   title: "Chic Bob Cut",
  //   tags: [Tags.BobCut, Tags.ShortHair, Tags.Blonde],
  // },
  // {
  //   id: "10",
  //   image: "image10.jpg",
  //   title: "Long Braided Style",
  //   tags: [Tags.LongHair, Tags.Braids, Tags.Wavy],
  // },
];

export async function PostsGrid({ query }: { query: string }) {
  //   const posts = await getAllPosts();
  //now show the posts based on the query only

  const filteredPosts = posts.filter((post) =>
    post.title.toLowerCase().includes(query)
  );

  return (
    <section className="w-full md:min-h-[100vh]">
      <p className="text-red-500">{query}</p>

      <article className="flex flex-row gap-1 w-full md:mt-20">
        {filteredPosts.map((post) => (
          <Post key={post.id} post={post} />
        ))}
      </article>
    </section>
  );
}
