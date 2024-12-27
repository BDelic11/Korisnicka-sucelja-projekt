// "use client";
// import Loading from "@/app/loading";
// import Search from "@/components/ui/search";
// import Image, { StaticImageData } from "next/image";
import React, { useEffect, useState } from "react";

import image1 from "@/public/images/hair/hair1.jpg";
import image2 from "@/public/images/hair/hair2.webp";
// import image1 from "@/public/images/illustration-1.svg";
// import image2 from "@/public/images/illustration-2.svg";
// import image3 from "@/public/images/image3.jpg";
import { Post as PostType } from "@repo/db/types/post";
import Post from "@/app/inspiration/_components/post";

// const posts: PostType[] = [
//   {
//     id: "1",
//     image: image1,
//     title: "classic Long Hair",
//     tags: [Tags.LongHair, Tags.Straight, Tags.Brunette],
//   },
//   {
//     id: "2",
//     image: image2,
//     title: "Short and Wavy",
//     tags: [Tags.ShortHair, Tags.Wavy, Tags.Blonde],
//   },
//   {
//     id: "3",
//     image: image1,
//     title: "Curly Updo",
//     tags: [Tags.Curly, Tags.Updo, Tags.Brunette],
//   },
//   {
//     id: "4",
//     image: image1,
//     title: "Classic Bob Cut",
//     tags: [Tags.ShortHair, Tags.BobCut, Tags.Straight],
//   },
//   {
//     id: "5",
//     image: image2,
//     title: "Braided Ponytail",
//     tags: [Tags.Ponytail, Tags.Braids, Tags.LongHair],
//   },
//   {
//     id: "6",
//     image: image1,
//     title: "Blonde Wavy Style",
//     tags: [Tags.LongHair, Tags.Wavy, Tags.Blonde],
//   },
//   {
//     id: "7",
//     image: image2,
//     title: "Elegant Updo",
//     tags: [Tags.Updo, Tags.Straight, Tags.Brunette],
//   },
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
// ];

// export function SalonPostsGrid({ posts }: { posts: any[] }) {
//   return (
//     <section className="w-full md:min-h-[100vh]">
//       <article className="grid grid-cols-3 md:grid-cols-4  md:gap-0 w-full h-full  md:mt-10">
//         {posts.map((post: any) => (
//           <Post key={post.id} post={post} />
//         ))}
//       </article>
//     </section>
//   );
// }
