import Image from 'next/image';
import React from 'react';

//components
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { PostGridDto as PostType } from '@repo/db/types/post';
// import { getPostTags } from '@/actions/utils/tags';
// import { LikesComponent } from '@/components/ui/likes-component';
// import { isPostLiked } from '@/actions/utils/posts';
import Link from 'next/link';
import { AddPostForm } from '@/components/forms/post-form';
import { getAllTags } from '@/actions/utils/tags';
const AddPost = async () => {
  const allTags = await getAllTags();

  return (
    <div className=' relative w-full h-36 md:h-96 bg-gray-300 flex justify-center items-center border-2 border-transparent overflow-hidden'>
      <Dialog>
        <DialogTrigger className='w-full h-full flex justify-center items-center'>
          <div className='flex justify-center items-center w-16 h-16 bg-black text-white rounded-full shadow-lg hover:scale-105 transition-transform ease-in-out'>
            {/* Plus icon made with Tailwind CSS */}
            <div className='relative w-8 h-8'>
              <div className='absolute top-0 left-1/2 transform -translate-x-1/2 w-2.5 h-8 bg-white'></div>
              <div className='absolute left-0 top-1/2 transform -translate-y-1/2 w-8 h-2.5 bg-white'></div>
            </div>
          </div>
        </DialogTrigger>
        <DialogContent className='w-full h-4/5 '>
          <DialogHeader>
            <DialogTitle>Add new post</DialogTitle>
            <div className='flex flex-col justify-between '>
              {/* <Image
                className='object-cover w-full max-h-[500px] m-auto py-20'
                src={imageUrl}
                alt={title}
                // fill
                width={400}
                height={400}
                // className="object-cover m-auto w-full h-full py-10  "
              /> */}
              <div className='flex flex-row justify-between align-middle gap-2'>
                <AddPostForm allTags={allTags} />
              </div>
            </div>
            <div className='font-light text-gray-500 text-sm'>
              {/* {tags ? (
                tags.map((tag: any) => <span key={tag.id}>{tag.name}</span>)
              ) : (
                <p>No tags</p>
              )} */}
            </div>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AddPost;
