"use client";
import React, { useState, useOptimistic, startTransition } from "react";

import { followSalon, unfollowSalon } from "@/actions/follow";
import { Button } from "./button";

interface FollowComponentProps {
  followersNumber: number | null;
  salonId: number;
  initialFollowedBool: boolean;
}

export const FollowComponent = ({
  followersNumber,
  initialFollowedBool,
  salonId,
}: FollowComponentProps) => {
  const [isLiked, setIsLiked] = useState<boolean>(initialFollowedBool);
  const [optimisticFollows, addOptimisticFollows] = useOptimistic(
    followersNumber || 0,
    (state, number: number) => state + number
  );
  const [optimisticFollowed, toggleOptimisticFollowed] = useOptimistic(
    initialFollowedBool,
    (state) => !state
  );

  const handleFollow = async (number: number) => {
    startTransition(async () => {
      addOptimisticFollows(number);
      toggleOptimisticFollowed(null);
      if (isLiked) {
        await unfollowSalon(salonId);
      } else {
        await followSalon(salonId);
      }
      setIsLiked(!isLiked);
    });
  };

  return (
    <>
      <div className="flex flex-row gap-2 font-semibold text-lg">
        <p>Followers:</p>
        <p>{optimisticFollows}</p>
      </div>
      <div className="flex flex-row justify-center align-middle gap-1">
        {optimisticFollowed ? (
          <Button
            className="w-full"
            variant="secondary"
            onClick={() => handleFollow(-1)}
          >
            Unfollow
          </Button>
        ) : (
          <Button
            className="w-full"
            variant="default"
            onClick={() => handleFollow(1)}
          >
            Follow
          </Button>
        )}
      </div>
    </>
  );
};
