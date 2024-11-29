import Image, { StaticImageData } from "next/image";
import React from "react";
import { Post as PostType } from "@repo/db/types/post";

//components
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

const Post = ({ post }: { post: PostType }) => {
  return (
    <div
      key={post.id}
      className=" relative border-2 w-full h-36 md:h-96 border-transparent overflow-hidden"
    >
      <Dialog>
        <DialogTrigger>
          {" "}
          <Image
            src={post.image}
            alt={post.title}
            fill
            className="object-cover w-full h-26 transition-transform duration-300 ease-in-out transform hover:scale-105 hover:brightness-75"
          />
          <div className="hidden md:flex flex-row gap-1 text-gray-400 text-xs absolute bottom-0 left-0 pb-1 pl-1">
            {post.tags.map((tag, index) => (
              <p key={index}>#{tag}</p>
            ))}
          </div>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{post.title}</DialogTitle>
            <DialogDescription>
              <Image src={post.image} alt={post.title} className="w" />
              <div className="tags">
                {post.tags.map((tag, index) => (
                  <span key={index}>{tag}</span>
                ))}
              </div>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Post;
