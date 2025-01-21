import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface CardComponentProps {
  title: string;
  icon: JSX.Element;
  children: React.ReactNode;
}

export function CardComponent({ title, icon, children }: CardComponentProps) {
  return (
    <Card>
      <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
        <CardTitle className='text-sm font-medium'>{title}</CardTitle>
        {icon}
      </CardHeader>
      <CardContent>{children}</CardContent>
    </Card>
  );
}
