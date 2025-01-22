'use client';
import { Badge } from '@/components/ui/badge';
import { useSearchParams, usePathname, useRouter } from 'next/navigation';
import { Tag } from '@repo/db/types/tag';
import { useEffect } from 'react';

interface FilterButtonProps {
  tag?: Tag;
  reset?: string;
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

  useEffect(() => {
    const queryParam = searchParams.get('query');
    if (queryParam) {
      const tagIds = queryParam.split(',').map((id) => parseInt(id, 10));
      setActiveTags(tagIds);
    }
  }, [searchParams, setActiveTags]);

  const handleClick = (tagId?: number) => {
    const updatedTags = tagId
      ? activeTags.includes(tagId)
        ? activeTags.filter((id) => id !== tagId)
        : [...activeTags, tagId]
      : [];

    setActiveTags(updatedTags);

    const params = new URLSearchParams(searchParams.toString());
    if (updatedTags.length) {
      params.set('query', updatedTags.join(','));
    } else {
      params.delete('query');
    }

    replace(`${pathname}?${params.toString()}`);
  };

  if (reset) {
    return (
      <Badge
        variant='default'
        onClick={() => handleClick()}
        className='cursor-pointer text-nowrap bg-transparent border-red-700 border-2 text-red-800 hover:bg-red-800 hover:text-white'
      >
        {reset}
      </Badge>
    );
  }

  if (tag) {
    return (
      <Badge
        variant={activeTags.includes(tag.id) ? 'default' : 'outline'}
        onClick={() => handleClick(tag.id)}
        key={tag.id}
        className={`cursor-pointer text-nowrap ${
          !activeTags.includes(tag.id) && 'hover:bg-gray-100'
        }`}
      >
        {tag.name}
      </Badge>
    );
  }

  return null;
};

export default FilterButton;
