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
import { PostForEditDto, PostGridDto as PostType } from '@repo/db/types/post';
// import { getPostTags } from '@/actions/utils/tags';
// import { LikesComponent } from '@/components/ui/likes-component';
// import { isPostLiked } from '@/actions/utils/posts';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { HeartIcon } from '@/components/ui/heartIcon';
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

  // const tags = await getPostTags(id);
  // const initialLikedBool = await isPostLiked(id);
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
            <div className='group-hover:opacity-100  opacity-0  md:flex flex-row gap-1 text-gray-300 text-xs pb-1 pl-1'>
              {/* {tags ? (
                tags.map((tag: any) => <p key={tag.id}>#{tag.name}</p>)
              ) : (
                <p>No tags</p>
              )} */}
            </div>
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
                // fill
                width={400}
                height={400}
                // className="object-cover m-auto w-full h-full py-10  "
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
                {/* <LikesComponent
                  postId={id}
                  initialLikedBool={initialLikedBool}
                  title={title}
                  likesNumber={likesNumber}
                /> */}
              </div>
            </div>
            <div className='font-light text-gray-500 text-sm'>
              {/* {tags ? (
                tags.map((tag: any) => <span key={tag.id}>{tag.name}</span>)
              ) : (
                <p>No tags</p>
              )} */}
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
