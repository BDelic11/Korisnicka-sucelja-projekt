"use client";
// import Loading from "@/app/loading";
// import Search from "@/components/ui/search";
// import Image, { StaticImageData } from "next/image";
import React, { useEffect, useState } from "react";
import { Tags } from "@repo/db/types/post";

import image1 from "@/public/images/hair/hair1.jpg";
import image2 from "@/public/images/hair/hair2.webp";
// import image1 from "@/public/images/illustration-1.svg";
// import image2 from "@/public/images/illustration-2.svg";
// import image3 from "@/public/images/image3.jpg";
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
  {
    id: "5",
    image: image2,
    title: "Braided Ponytail",
    tags: [Tags.Ponytail, Tags.Braids, Tags.LongHair],
  },
  {
    id: "6",
    image: image1,
    title: "Blonde Wavy Style",
    tags: [Tags.LongHair, Tags.Wavy, Tags.Blonde],
  },
  {
    id: "7",
    image: image2,
    title: "Elegant Updo",
    tags: [Tags.Updo, Tags.Straight, Tags.Brunette],
  },
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

export function PostsGrid({
  query,
  search,
}: {
  query: string;
  search: string;
}) {
  const [filteredPosts, setFilteredPosts] = useState<PostType[]>([]);

  useEffect(() => {
    // Process tags from query and filter out empty values
    const tags = query
      .toLowerCase()
      .split(",")
      .map((tag) => tag.trim())
      .filter(Boolean);
    const searchTerm = search.toLowerCase().trim();
    console.log("tags", tags);
    console.log("search term", searchTerm);

    let postsToDisplay = posts;

    // If tags are specified, filter posts by tags
    if (tags.length > 0) {
      postsToDisplay = posts.filter((post) =>
        tags.every((tag) => post.tags.map((t) => t.toLowerCase()).includes(tag))
      );
    }

    // If search term is specified, further filter the already-tag-filtered posts by title
    if (searchTerm) {
      postsToDisplay = postsToDisplay.filter((post) =>
        post.title.toLowerCase().includes(searchTerm)
      );
    }

    setFilteredPosts(postsToDisplay);
  }, [query, search]);
  return (
    <section className="w-full md:min-h-[100vh]">
      {/* <p className="text-red-500">query:{query}</p>
      <p className="text-red-500">search:{search}</p> */}

      <article className="grid grid-cols-3 md:grid-cols-4 gap-1 md:gap-0 w-full h-[200px] md:mt-10">
        {filteredPosts.map((post: any) => (
          <Post key={post.id} post={post} />
        ))}
      </article>
    </section>
  );
}
