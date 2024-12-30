"use client";
import React, { useState } from "react";
import Image from "next/image";
import emptyHeart from "../../public/icons/heart.svg";
import fullHeart from "../../public/icons/fullHeart.svg";
import { likePost, unlikePost } from "@/actions/posts";

interface LikesComponentProps {
  likesNumber: number | null;
  postId: number;
  title: string;
  initialLikedBool: boolean;
}

export const LikesComponent = ({
  likesNumber,
  initialLikedBool,
  postId,
  title,
}: LikesComponentProps) => {
  const [isLiked, setIsLiked] = useState<boolean>(initialLikedBool);

  const handleLike = async () => {
    if (isLiked) {
      await unlikePost(postId);
    } else {
      await likePost(postId);
    }
    setIsLiked(!isLiked);
  };

  return (
    <div className="flex flex-row justify-center align-middle gap-1">
      {isLiked ? (
        <Image
          onClick={() => handleLike()}
          className="object-cover h-6 w-6 cursor-pointer"
          src={fullHeart}
          alt={title}
        />
      ) : (
        <Image
          onClick={() => handleLike()}
          className="object-cover h-6 w-6 cursor-pointer"
          src={emptyHeart}
          alt={title}
        />
      )}
      <p>{likesNumber}</p>
      {/* {initialLikedBool ? <p>liked</p> : <p>not</p>} */}
    </div>
  );
};
