import Search from "@/components/ui/search";
import React, { Suspense } from "react";
import { PostsGrid } from "./_components/posts-grid";
import LayoutContainer from "@/components/ui/container";
import FilterButtons from "./_components/filter-buttons";
import { InspirationSkeleton } from "@/components/skeletons/inspiration-skeleton";
import { getAllTags } from "@/actions/utils/tags";

export default async function InspirationPage(props: {
  searchParams?: Promise<{
    query?: string;
    search?: string;
  }>;
}) {
  const tagsData = await getAllTags();

  const searchParams = await props.searchParams;
  const query = searchParams?.query || "";
  const search = searchParams?.search || "";

  // make me db call to drizzle for fetching these posts from search params and query
  // now write the db logic here in server component

  // const posts = await getAllPosts();
  // use posts that are hardcoded for now to show the UI from the above code

  return (
    <LayoutContainer>
      <section className="flex w-full items-center justify-between">
        <h1 className={` text-2xl`}>Inspiration Posts</h1>
      </section>
      <Search placeholder="Search salons..." />
      <FilterButtons tagsData={tagsData} />
      <Suspense fallback={<InspirationSkeleton />}>
        <PostsGrid query={query} search={search} />
      </Suspense>
    </LayoutContainer>
  );
}
