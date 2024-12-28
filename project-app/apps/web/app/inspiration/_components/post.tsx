import Image from "next/image";
import React from "react";

//components
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { getPostTags } from "@/actions/utils/tags";
import { PostComponentDto as PostType } from "@repo/db/types/post";
import { LikesComponent } from "@/components/ui/likes-component";
import { isPostLiked } from "@/actions/utils/posts";

interface PostProps {
  post: PostType;
}

const Post = async ({ post }: PostProps) => {
  const tags = await getPostTags(post.id);
  const initialLikedBool = await isPostLiked(post.id);

  return (
    <div
      key={post.id}
      className=" relative border-2 w-full h-36 md:h-96 border-transparent overflow-hidden"
    >
      <Dialog>
        <DialogTrigger className="w-full h-full group">
          {" "}
          <Image
            src={post.imageUrl}
            alt={post.title}
            fill
            className="object-cover w-full h-26 transition-transform duration-300 ease-in-out transform group-hover:scale-105 group-hover:brightness-75"
          />
          <div className="hidden  w-full h-full md:flex flex-col gap-1 text-left text-xs absolute top-4 left-2 pb-1 pl-2">
            <h2 className=" group-hover:opacity-100  opacity-0 font-semibold text-white">
              {post.salonName}
            </h2>
            <div className="group-hover:opacity-100  opacity-0  md:flex flex-row gap-1 text-gray-300 text-xs pb-1 pl-1">
              {tags ? (
                tags.map((tag: any) => <p key={tag.id}>#{tag.name}</p>)
              ) : (
                <p>No tags</p>
              )}
            </div>
          </div>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{post.title}</DialogTitle>
            <Image
              className="object-cover h-full m-auto py-10"
              src={post.imageUrl}
              alt={post.title}
              width={200}
              height={200}
            />
            <div className="flex flex-row justify-between align-middle gap-2">
              <h2 className="text-gray-700 pt-2 font-semibold">
                {post.salonName}
              </h2>
              <LikesComponent
                postId={post.id}
                initialLikedBool={initialLikedBool}
                title={post.title}
                likesNumber={post.likesNumber}
              />
            </div>
            <div className="font-light text-gray-500 text-sm">
              {tags ? (
                tags.map((tag: any) => <span key={tag.id}>{tag.name}</span>)
              ) : (
                <p>No tags</p>
              )}
            </div>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Post;
