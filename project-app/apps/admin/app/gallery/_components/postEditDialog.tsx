'use client';
import Image from 'next/image';
import React, { useState } from 'react';

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { PostForEditDto, PostGridDto as PostType } from '@repo/db/types/post';
import { EditPostForm } from '@/components/forms/edit-post-form';
import { DeletePostForm } from '@/components/forms/delete-post.form';
import { Tag } from '@repo/db/types';

interface PostEditDialogProps {
  post: PostForEditDto;
  salonName?: string;
  allTags: Tag[];
}

const PostEditDialog = ({
  salonName,
  allTags,
  ...post
}: PostEditDialogProps) => {
  const { imageUrl, title } = post.post;
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <Dialog
      open={isModalOpen}
      onOpenChange={(e) => {
        setIsModalOpen(e);
      }}
    >
      <DialogTrigger className='w-full h-full group'>
        <Image
          src={imageUrl}
          alt={title}
          fill
          className='pt-0 object-cover w-full h-26 transition-transform duration-300 ease-in-out transform group-hover:scale-105 group-hover:brightness-75'
        />
      </DialogTrigger>
      <DialogContent
        className='w-full h-fit max-h-[80vh] overflow-y-auto
          border-2 border-gray-300 rounded-lg 
          [&::-webkit-scrollbar]:w-2
          [&::-webkit-scrollbar]:py-20
          [&::-webkit-scrollbar-track]:bg-gray-100
          [&::-webkit-scrollbar-thumb]:bg-gray-300
          dark:[&::-webkit-scrollbar-track]:bg-neutral-700
          dark:[&::-webkit-scrollbar-thumb]:bg-neutral-500
  '
      >
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
            <EditPostForm
              post={post.post}
              allTags={allTags}
              setIsModalOpen={setIsModalOpen}
            />
          </div>
          {post.post.id && (
            <DeletePostForm id={post.post.id} setIsModalOpen={setIsModalOpen} />
          )}
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default PostEditDialog;
