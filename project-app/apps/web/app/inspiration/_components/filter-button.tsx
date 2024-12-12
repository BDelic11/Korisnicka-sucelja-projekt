'use client';
import { Badge } from '@/components/ui/badge';
import { Tags } from '@repo/db/types/post';
import { useState } from 'react';
import { useSearchParams, usePathname, useRouter } from 'next/navigation';

interface FilterButtonsProps {
  tag: Tags;
  index: number;
}

const FilterButtons = ({ tag, index }: FilterButtonsProps) => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();
  const [isActive, setIsActive] = useState<boolean>(false);

  const handleClick = (tag: string) => {
    setIsActive(!isActive);

    const params = new URLSearchParams(searchParams);
    const tags = params.get('query') ? params.get('query')!.split(',') : [];

    if (tags.includes(tag)) {
      // Remove the tag if it already exists
      const updatedTags = tags.filter((existingTag) => existingTag !== tag);
      params.set('query', updatedTags.join(','));
    } else {
      // Append the new tag if it doesn't exist
      tags.push(tag);
      params.set('query', tags.join(','));
    }

    // Remove 'query' parameter if tags are empty
    if (!tags.length) {
      params.delete('query');
    }

    // Replace the URL with the updated query string
    replace(`${pathname}?${params.toString().toLowerCase()}`);
  };
  return (
    <Badge
      variant={isActive ? 'default' : 'outline'}
      onClick={() => handleClick(tag)}
      key={index + tag}
      className='cursor-pointer text-nowrap'
    >
      {tag}
    </Badge>
  );
};

export default FilterButtons;
