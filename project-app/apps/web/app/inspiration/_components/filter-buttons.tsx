'use client';
import { useState } from 'react';
import FilterButton from './filter-button';
import { Tag } from '@repo/db/types/tag';

const FilterButtons = ({ tagsData }: { tagsData: Tag[] }) => {
  const [activeTags, setActiveTags] = useState<number[]>([]);

  if (!tagsData || tagsData.length === 0) {
    return <div>No tags available.</div>;
  }

  return (
    <div className='flex flex-row gap-2 cursor-pointer my-4 md:my-8 overflow-x-auto hide-scrollbar'>
      <FilterButton
        activeTags={activeTags}
        setActiveTags={setActiveTags}
        reset='Clear all'
      />
      {tagsData.map((tag: Tag) => (
        <FilterButton
          key={tag.id}
          tag={tag}
          activeTags={activeTags}
          setActiveTags={setActiveTags}
        />
      ))}
    </div>
  );
};

export default FilterButtons;
