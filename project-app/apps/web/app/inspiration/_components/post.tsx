import Image, { StaticImageData } from "next/image";
import React from "react";
// import { Post as PostType } from "@repo/db/types/post";

//components
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { getPostTags } from "@/actions/utils/tags";
// import { Post } from "@repo/db/types/post";

interface PostProps {
  post: any;
}

const Post = async ({ post }: PostProps) => {
  const tags = await getPostTags(post.id);

  return (
    <div
      key={post.id}
      className=" relative border-2 w-full h-36 md:h-96 border-transparent overflow-hidden"
    >
      <Dialog>
        <DialogTrigger>
          {" "}
          <Image
            src={post.imageUrl}
            alt={post.title}
            fill
            className="object-cover w-full h-26 transition-transform duration-300 ease-in-out transform hover:scale-105 hover:brightness-75"
          />
          <div className="hidden md:flex flex-row gap-1 text-gray-400 text-xs absolute bottom-0 left-0 pb-1 pl-1">
            {tags ? (
              tags.map((tag: any) => <p key={tag.id}>#{tag.name}</p>)
            ) : (
              <p>no tags</p>
            )}
          </div>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{post.title}</DialogTitle>
            <Image
              className="object-cover h-full "
              src={post.imageUrl}
              alt={post.title}
              width={200}
              height={200}
            />
            <div className="tags">
              {tags ? (
                tags.map((tag: any) => <span key={tag.id}>{tag.name}</span>)
              ) : (
                <p>no tags</p>
              )}
            </div>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Post;
