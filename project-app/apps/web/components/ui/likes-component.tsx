"use client";
import React, { useState, useOptimistic, startTransition } from "react";
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
  const [optimisticLikes, addOptimisticLikes] = useOptimistic(
    likesNumber || 0,
    (state, number: number) => state + number
  );
  const [optimisticLiked, toggleOptimisticLiked] = useOptimistic(
    initialLikedBool,
    (state) => !state
  );

  const handleLike = async (number: number) => {
    startTransition(async () => {
      addOptimisticLikes(number);
      toggleOptimisticLiked(null);
      if (isLiked) {
        await unlikePost(postId);
      } else {
        await likePost(postId);
      }
      setIsLiked(!isLiked);
    });
  };

  return (
    <div className="flex flex-row justify-center align-middle gap-1">
      {optimisticLiked ? (
        <Image
          onClick={() => handleLike(-1)}
          className="object-cover h-6 w-6 cursor-pointer"
          src={fullHeart}
          alt={title}
        />
      ) : (
        <Image
          onClick={() => handleLike(1)}
          className="object-cover h-6 w-6 cursor-pointer"
          src={emptyHeart}
          alt={title}
        />
      )}
      <p>{+optimisticLikes}</p>
      {/* {initialLikedBool ? <p>liked</p> : <p>not</p>} */}
    </div>
  );
};
