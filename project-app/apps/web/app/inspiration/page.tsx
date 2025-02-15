import Search from "@/components/ui/search";
import React, { Suspense } from "react";
import { PostsGrid } from "./_components/posts-grid";
import LayoutContainer from "@/components/ui/container";
import FilterButtons from "./_components/filter-buttons";
import { getAllTags } from "@/actions/utils/tags";
import { LoadingSpinner } from "@/components/skeletons/about-skeleton";

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

  return (
    <LayoutContainer className="mt-24 md:mt-32">
      <section className="flex w-full items-center justify-between">
        <h1 className={` text-3xl md:2xl `}>Inspiration Posts</h1>
      </section>
      <Search placeholder="Search salons..." />
      <FilterButtons tagsData={tagsData} />
      <Suspense fallback={<LoadingSpinner />}>
        <PostsGrid query={query} search={search} />
      </Suspense>
    </LayoutContainer>
  );
}
