'use client';
import { Badge } from '@/components/ui/badge';
// import { Tags } from "@repo/db/types/post";
import { useSearchParams, usePathname, useRouter } from 'next/navigation';
import { Tag } from '@repo/db/types/tag';

interface FilterButtonProps {
  tag?: Tag;
  reset?: string;
  // eslint-disable-next-line
  setActiveTags: (tags: number[]) => void;
  activeTags: number[];
}

const FilterButton = ({
  tag,
  reset,
  setActiveTags,
  activeTags,
}: FilterButtonProps) => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const handleClick = (tagId?: number) => {
    if (!tagId) {
      // Clear all tags
      setActiveTags([]);
      replace(pathname);

      return;
    }
    if (tag) {
      const updatedTags = activeTags.includes(tagId)
        ? activeTags.filter((id) => id !== tagId)
        : [...activeTags, tagId];

      setActiveTags(updatedTags);
      const params = new URLSearchParams(searchParams);
      if (updatedTags.length) {
        params.set('query', updatedTags.join(','));
      } else {
        params.delete('query');
      }
      replace(`${pathname}?${params.toString().toLowerCase()}`);
    }

    // Remove 'query' parameter if tags are empty
    if (!tags.length) {
      params.delete('query');
    }

    // Replace the URL with the updated query string
    replace(`${pathname}?${params.toString().toLowerCase()}`);
  };

  if (reset) {
    return (
      <Badge
        variant='default'
        onClick={() => {
          handleClick();
        }}
        className='cursor-pointer text-nowrap bg-transparent border-red-700 border-2 text-red-800 hover:bg-red-800 hover:text-white'
      >
        {reset}
      </Badge>
    );
  }
  if (tag) {
    return (
      <Badge
        variant={activeTags?.includes(tag.id) ? 'default' : 'outline'}
        onClick={() => handleClick(tag.id)}
        key={tag.id}
        className={`cursor-pointer text-nowrap ${!activeTags?.includes(tag.id) && 'hover:bg-gray-100'} `}
      >
        {tag.name}
      </Badge>
    );
  }
};

export default FilterButton;
