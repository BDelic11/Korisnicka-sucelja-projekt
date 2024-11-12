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
      className="w-full h-auto md:h-[400px] border-2 border-gray-300 flex flex-col items-center justify-center"
    >
      <Dialog>
        <DialogTrigger>
          {" "}
          <Image
            src={post.image}
            alt={post.title}
            className="w-full h-[400px] md:h-[200px] object-cover items-center m-auto"
          />
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
