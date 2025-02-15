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
import { PostGridDto as PostType } from "@repo/db/types/post";
import { LikesComponent } from "@/components/ui/likes-component";
import { isPostLiked } from "@/actions/utils/posts";
import Link from "next/link";

interface PostProps {
  post: PostType;
  salonName?: string;
}

const Post = async ({ salonName, ...post }: PostProps) => {
  const { id, imageUrl, title, salonId, likesNumber } = post.post;
  const tags = await getPostTags(id);
  const initialLikedBool = await isPostLiked(id);

  return (
    <div
      key={id}
      className=" relative border-2 w-full h-36 md:h-96 border-transparent overflow-hidden"
    >
      <Dialog>
        <DialogTrigger className="w-full h-full group">
          {" "}
          <Image
            src={imageUrl}
            alt={title}
            fill
            className="object-cover w-full h-26 transition-transform duration-300 ease-in-out transform group-hover:scale-105 group-hover:brightness-75"
          />
          <div className="hidden  w-full h-full md:flex flex-col gap-1 text-left text-xs absolute top-4 left-2 pb-1 pl-2">
            {salonName && (
              <h2 className=" group-hover:opacity-100  opacity-0 font-semibold text-white">
                {salonName}
              </h2>
            )}
            <div className="group-hover:opacity-100  opacity-0  md:flex flex-row gap-1 text-gray-300 text-xs pb-1 pl-1">
              {tags ? (
                tags.map((tag: any) => <p key={tag.id}>#{tag.name}</p>)
              ) : (
                <p>No tags</p>
              )}
            </div>
          </div>
        </DialogTrigger>
        <DialogContent className="w-full min-h-fit max-h-4/5 ">
          <DialogHeader>
            <DialogTitle>{title}</DialogTitle>
            <div className="flex flex-col justify-between min-h-fit ">
              <Image
                className="w-full object-cover my-4 
             max-h-[400px] md:max-h-[400px] lg:max-h-[400px]"
                src={imageUrl}
                alt={title}
                width={800}
                height={600}
              />
              <div className="flex flex-row justify-between align-middle h-min w-full my-4 m">
                <div className="flex flex-col justify-between h-min">
                  {salonName && (
                    <Link href={`/salon/${salonId}`}>
                      <h2 className="text-gray-700 font-semibold text-start">
                        {salonName}
                      </h2>
                    </Link>
                  )}
                  <div className=" font-light text-gray-500 text-sm">
                    {tags ? (
                      tags.map((tag: any) => (
                        <span key={tag.id}>#{tag.name}</span>
                      ))
                    ) : (
                      <p>No tags</p>
                    )}
                  </div>
                </div>
                <div className="">
                  <LikesComponent
                    postId={id}
                    initialLikedBool={initialLikedBool}
                    title={title}
                    likesNumber={likesNumber}
                  />
                </div>
              </div>
            </div>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Post;
