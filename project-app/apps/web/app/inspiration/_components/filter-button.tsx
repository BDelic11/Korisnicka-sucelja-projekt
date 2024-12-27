"use client";
import { Badge } from "@/components/ui/badge";
// import { Tags } from "@repo/db/types/post";
import { useState } from "react";
import { useSearchParams, usePathname, useRouter } from "next/navigation";
import { Tag } from "@repo/db/types/tag";

const FilterButtons = ({ tag }: { tag: Tag }) => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();
  const [isActive, setIsActive] = useState<boolean>(false);

  const handleClick = (tag: number) => {
    setIsActive(!isActive);

    const params = new URLSearchParams(searchParams);
    const tags = params.get("query") ? params.get("query")!.split(",") : [];
    const stringTag = tag.toString();

    if (tags.includes(stringTag)) {
      // Remove the tag if it already exists
      const updatedTags = tags.filter(
        (existingTag) => existingTag !== stringTag
      );
      params.set("query", updatedTags.join(","));
    } else {
      // Append the new tag if it doesn't exist
      tags.push(stringTag);
      params.set("query", tags.join(","));
    }

    // Remove 'query' parameter if tags are empty
    if (!tags.length) {
      params.delete("query");
    }

    // Replace the URL with the updated query string
    replace(`${pathname}?${params.toString().toLowerCase()}`);
  };
  return (
    <Badge
      variant={isActive ? "default" : "outline"}
      onClick={() => handleClick(tag.id)}
      key={tag.id}
      className="cursor-pointer text-nowrap"
    >
      {tag.name}
    </Badge>
  );
};

export default FilterButtons;
