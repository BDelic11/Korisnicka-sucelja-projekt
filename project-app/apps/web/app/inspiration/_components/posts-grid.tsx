import React from "react";

import { PostComponentDto } from "@repo/db/types/post";
import Post from "./post";
import { getFilteredPosts } from "@/actions/utils/posts";

export async function PostsGrid({
  query,
  search,
}: {
  query: string;
  search: string;
}) {
  const tags = query
    .toLowerCase()
    .split(",")
    .map((tag) => +tag.trim())
    .filter(Boolean);
  const searchTerm = search.toLowerCase().trim();
  console.log("tags", tags);
  console.log("search term", searchTerm);

  const posts = await getFilteredPosts(tags, searchTerm);

  if (!posts.length) {
    return (
      <div className=" min-h-[100vh]">
        <p className="pt-10 text-gray-800 text-lg ">No posts </p>
      </div>
    );
  }

  return (
    <section className="w-full md:min-h-[100vh]">
      <article className="grid grid-cols-3 md:grid-cols-4  md:gap-0 w-full h-full  md:mt-10">
        {posts.map((post: PostComponentDto) => (
          <Post key={post.id + post.title} post={post} />
        ))}
      </article>
    </section>
  );
}
