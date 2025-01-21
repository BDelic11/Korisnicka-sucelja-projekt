import { CardComponent } from './cardComponent';
import Image from 'next/image';
import Heart from '@/public/icons/heart.svg';

interface RecentPostsProps {
  posts:
    | {
        id: number;
        title: string;
        likesNumber: number | null;
        createdAt: Date | null;
      }[]
    | undefined;
  title: string;
}

export function Posts({ posts, title }: RecentPostsProps) {
  return (
    <CardComponent title={title} icon={<div></div>}>
      <div className='space-y-4'>
        {posts?.map((post) => (
          <div key={post.id} className='flex items-center justify-between'>
            <div className='flex-1'>
              <h3 className='text-sm font-medium'>{post.title}</h3>
              <p className='text-xs text-muted-foreground'>
                {post?.createdAt?.toLocaleDateString('en-US')}
              </p>
            </div>
            <div className='flex items-center gap-2'>
              <Image
                src={Heart}
                height={16}
                width={16}
                className='text-muted-foreground'
                alt='Hearth icon'
              />
              <span className='text-sm'>{post.likesNumber}</span>
            </div>
          </div>
        ))}
      </div>
    </CardComponent>
  );
}
