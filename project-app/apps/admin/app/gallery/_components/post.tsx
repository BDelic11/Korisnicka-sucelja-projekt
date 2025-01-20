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
import { DeletePostForm } from '@/components/forms/delete-post.form';
import PostEditDialog from './postEditDialog';

interface PostProps {
  post: PostForEditDto;
  salonName?: string;
}

const Post = async ({ salonName, ...post }: PostProps) => {
  const { id, likesNumber } = post.post;
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
      <PostEditDialog allTags={allTags} post={post.post} />
    </div>
  );
};

export default Post;
