import { CardComponent } from './cardComponent';
import Image from 'next/image';
import { Users, GalleryHorizontal } from 'lucide-react';
import Heart from '@/public/icons/heart.svg';

interface StatCardProps {
  title: string;
  value: number | undefined;
  icon: 'user' | 'post' | 'like';
}

export function StatCard({ title, value, icon }: StatCardProps) {
  const getIcon = () => {
    switch (icon) {
      case 'user':
        return <Users className='h-4 w-4 text-muted-foreground' />;
      case 'like':
        return (
          <Image
            src={Heart}
            height={16}
            width={16}
            className='text-muted-foreground'
            alt='Hearth icon'
          />
        );
      case 'post':
        return <GalleryHorizontal className='h-4 w-4 text-muted-foreground' />;
      default:
        return <Users className='h-4 w-4 text-muted-foreground' />;
    }
  };

  return (
    <CardComponent title={title} icon={getIcon()}>
      <div className='text-2xl font-bold'>{value || 0}</div>
    </CardComponent>
  );
}
