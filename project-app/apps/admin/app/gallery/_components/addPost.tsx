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
import PostAddDialog from './postAddDialog';
const AddPost = async () => {
  const allTags = await getAllTags();

  return (
    <div className=' relative w-full h-36 md:h-96 bg-gray-300 flex justify-center items-center border-2 border-transparent overflow-hidden'>
      <PostAddDialog allTags={allTags} />
    </div>
  );
};

export default AddPost;
