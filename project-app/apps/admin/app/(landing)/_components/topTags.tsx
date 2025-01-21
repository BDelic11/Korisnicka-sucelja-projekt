import { Tag } from 'lucide-react';
import { CardComponent } from './cardComponent';

interface TopTagsProps {
  tags: { name: string; count: number }[] | undefined;
}

export function TopTags({ tags }: TopTagsProps) {
  return (
    <CardComponent title='Top Tags' icon={<div></div>}>
      <div className='space-y-2'>
        {tags?.map((tag) => (
          <div key={tag.name} className='flex items-center'>
            <Tag className='h-4 w-4 mr-2 text-muted-foreground' />
            <span className='flex-1'>{tag.name}</span>
            <span className='text-muted-foreground'>{tag.count}</span>
          </div>
        ))}
      </div>
    </CardComponent>
  );
}
