import Image from 'next/image';
import React from 'react';

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { PostForEditDto, PostGridDto as PostType } from '@repo/db/types/post';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import emptyHeart from '@/public/icons/heart.svg';
import { EditPostForm } from '@/components/forms/edit-post-form';
import { getAllTags } from '@/actions/utils/tags';

interface PostProps {
  post: PostForEditDto;
  salonName?: string;
}

const Post = async ({ salonName, ...post }: PostProps) => {
  const { id, imageUrl, title, salonId, likesNumber } = post.post;
  const allTags = await getAllTags();

  return (
    <div
      key={id}
      className=' relative border-2 w-full h-36 md:h-96 border-transparent overflow-hidden'
    >
      <div className='absolute top-2 right-2 bg-slate-100 bg-opacity-85 text-gray-800 p-2 rounded-lg flex items-center gap-5 z-10'>
        <Image src={emptyHeart} alt='like icon' />
        <span className='text-xs'>{likesNumber}</span>
      </div>
      <Dialog>
        <DialogTrigger className='w-full h-full group'>
          <Image
            src={imageUrl}
            alt={title}
            fill
            className='pt-0 object-cover w-full h-26 transition-transform duration-300 ease-in-out transform group-hover:scale-105 group-hover:brightness-75'
          />
          <div className='hidden  w-full h-full md:flex flex-col gap-1 text-left text-xs absolute top-4 left-2 pb-1 pl-2'>
            {salonName && (
              <h2 className=' group-hover:opacity-100  opacity-0 font-semibold text-white'>
                {salonName}
              </h2>
            )}
          </div>
        </DialogTrigger>
        <DialogContent className='w-full h-full max-h-[80vh] overflow-y-auto '>
          <DialogHeader>
            <DialogTitle>Edit post</DialogTitle>
            <div className='flex flex-col justify-between '>
              <Image
                className='object-cover w-full max-h-[500px] m-auto py-5'
                src={imageUrl}
                alt={title}
                width={400}
                height={400}
              />
              <EditPostForm post={post.post} allTags={allTags} />

              <div className='flex flex-ro^w justify-between align-middle gap-2'>
                {salonName && (
                  <Link href={`/salon/${salonId}`}>
                    <h2 className='text-gray-700 pt-2 font-semibold'>
                      {salonName}
                    </h2>
                  </Link>
                )}
              </div>
            </div>
            <div className='font-light text-gray-500 text-sm'>
              <div className='flex flex-row gap-2'>
                <Button variant='destructive'>Delete Post</Button>
              </div>
            </div>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Post;
