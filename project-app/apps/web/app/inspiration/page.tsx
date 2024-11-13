// import LayoutContainer from "@/components/ui/container";
// import { CommandDemo } from "./_components/command-menu";
// import { Suspense } from "react";
// import { PostsGrid } from "./_components/posts-grid";

// export default async function InspirationPage() {
//   return (
//     <LayoutContainer>
//       <p>Welcome to inspiration</p>
//       <CommandDemo />
//       {/* search */}
//       {/* filters */}
//       <Suspense fallback="loading">
//         <PostsGrid />
//       </Suspense>
//     </LayoutContainer>
//   );
// }

import Loading from "@/app/loading";
import Search from "@/components/ui/search";
import React, { Suspense } from "react";
import { PostsGrid } from "./_components/posts-grid";
import LayoutContainer from "@/components/ui/container";
import FilterButtons from "./_components/filter-buttons";

export default async function InspirationPage(props: {
  searchParams?: Promise<{
    query?: string;
    search?: string;
  }>;
}) {
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
      <Search placeholder="Search inspiration..." />
      {/* <section className="mt-4 flex items-center justify-between gap-2 md:mt-8">
      </section> */}
      <FilterButtons />
      <Suspense key={query} fallback={<Loading />}>
        <PostsGrid query={query} search={search} />
      </Suspense>
    </LayoutContainer>
  );
}
