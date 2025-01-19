import React from 'react';

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { AddPostForm } from '@/components/forms/post-form';
import { getAllTags } from '@/actions/utils/tags';
const AddPost = async () => {
  const allTags = await getAllTags();

  return (
    <div className=' relative w-full h-36 md:h-96 bg-gray-300 flex justify-center items-center border-2 border-transparent overflow-hidden'>
      <Dialog>
        <DialogTrigger className='w-full h-full flex justify-center items-center'>
          <div className='flex justify-center items-center w-16 h-16 bg-black text-white rounded-full shadow-lg hover:scale-105 transition-transform ease-in-out'>
            <div className='relative w-8 h-8'>
              <div className='absolute top-0 left-1/2 transform -translate-x-1/2 w-2.5 h-8 bg-white'></div>
              <div className='absolute left-0 top-1/2 transform -translate-y-1/2 w-8 h-2.5 bg-white'></div>
            </div>
          </div>
        </DialogTrigger>
        <DialogContent className='w-full h-full max-h-[80vh] overflow-y-auto '>
          <DialogHeader>
            <DialogTitle>Add new post</DialogTitle>
            <div className='flex flex-col justify-between '>
              <div className='flex flex-row justify-between align-middle gap-2'>
                <AddPostForm allTags={allTags} />
              </div>
            </div>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AddPost;
