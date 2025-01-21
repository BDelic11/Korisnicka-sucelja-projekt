import { StatCard } from './_components/statCard';
import { TopTags } from './_components/topTags';
import { Posts } from './_components/recentPosts';
import { getStatistic } from '@/actions/utils/salons';
import LayoutContainer from '@/components/ui/container';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Salon admin landing',
  description: 'Welcome to salon admin',
};

export default async function LandingPage() {
  const stats = await getStatistic();

  if (!stats) return <p>Problem with loading...</p>;

  return (
    <LayoutContainer className='flex-grow mb-4 pt-10 flex flex-col md:flex-row w-full justify-around align-middle'>
      <div className='container mx-auto '>
        <h1 className='text-4xl font-extrabold tracking-tight lg:text-5xl pb-20'>
          Welcome To Salon Admin
        </h1>
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
          <StatCard title='Total Posts' value={stats.totalPosts} icon='post' />
          <StatCard title='Total Likes' value={stats.totalLikes} icon='like' />
          <StatCard
            title='Total Followers'
            value={stats.totalFollowers}
            icon='user'
          />
          <TopTags tags={stats.topTags} />
          <Posts title='Recent Posts' posts={stats.recentPosts} />
          <Posts title='Top Posts' posts={stats.topPosts} />
        </div>
      </div>
    </LayoutContainer>
  );
}
