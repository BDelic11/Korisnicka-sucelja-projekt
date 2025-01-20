'use client';
import React, { useState } from 'react';

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { AddPostForm } from '@/components/forms/post-form';
import { Tag } from '@repo/db/types';
const PostAddDialog = ({ allTags }: { allTags: Tag[] }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <Dialog
      open={isModalOpen}
      onOpenChange={(e) => {
        setIsModalOpen(e);
      }}
    >
      <DialogTrigger className='w-full h-full flex justify-center items-center'>
        <div className='flex justify-center items-center w-16 h-16 bg-black text-white rounded-full shadow-lg hover:scale-105 transition-transform ease-in-out'>
          <div className='relative w-8 h-8'>
            <div className='absolute top-0 left-1/2 transform -translate-x-1/2 w-2.5 h-8 bg-white'></div>
            <div className='absolute left-0 top-1/2 transform -translate-y-1/2 w-8 h-2.5 bg-white'></div>
          </div>
        </div>
      </DialogTrigger>
      <DialogContent
        className='w-full h-fit max-h-[80vh] overflow-y-auto
          border-2 border-gray-300 rounded-lg 
          [&::-webkit-scrollbar]:w-2
          [&::-webkit-scrollbar]:py-20
          [&::-webkit-scrollbar-track]:bg-gray-100
          [&::-webkit-scrollbar-thumb]:bg-gray-300
          dark:[&::-webkit-scrollbar-track]:bg-neutral-700
          dark:[&::-webkit-scrollbar-thumb]:bg-neutral-500 '
      >
        <DialogHeader>
          <DialogTitle>Add new post</DialogTitle>
          <div className='flex flex-col justify-between '>
            <div className='flex flex-row justify-between align-middle gap-2'>
              <AddPostForm allTags={allTags} setIsModalOpen={setIsModalOpen} />
            </div>
          </div>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default PostAddDialog;
