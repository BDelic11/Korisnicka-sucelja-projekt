import React from 'react';

import { PostForEditDto, PostGridDto as PostType } from '@repo/db/types/post';
import Post from './post';
import AddPost from './addPost';

export function SalonPostsGrid({ posts }: { posts: PostForEditDto[] }) {
  return (
    <section className='w-full md:min-h-[100vh]'>
      <article className='grid grid-cols-3 md:grid-cols-4  md:gap-0 w-full h-full  md:mt-10'>
        <AddPost />
        {posts.map((post: PostForEditDto) => (
          <Post key={post.id} post={post} />
        ))}
      </article>
    </section>
  );
}
