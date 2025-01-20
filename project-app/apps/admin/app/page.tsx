import LayoutContainer from '@/components/ui/container';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import profileIllustration from '@/public/images/profile.svg';
import { ProfileForm } from '@/components/forms/change-salon-data';
import { getSalonInfo } from '@/actions/utils/salons';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Profile info',
  description: 'Change your salon profile',
};

const ProfilePageComponent = async () => {
  const salon = await getSalonInfo();

  if (!salon) {
    return notFound();
  }

  return (
    <LayoutContainer className='min-h-screen pt-10 flex flex-col md:flex-row w-full justify-around align-middle'>
      <section>
        <h1 className='text-4xl font-extrabold tracking-tight lg:text-5xl pb-20'>
          Profile info
        </h1>
        <h1 className='text-2xl font-normal tracking-tight lg:text-2xl'>
          Welcome{' '}
          <span className='text-stylist-blue text-bold'>{salon?.name} </span>
          you can change your salon info here
        </h1>
        <div className='flex flex-col gap-4 my-10'>
          <ProfileForm salon={salon} />
        </div>
      </section>
      <section className='m-auto'>
        <Image
          src={profileIllustration}
          alt='Profile illustration'
          className='w-full h-auto max-w-[600px] m-auto '
        />
      </section>
    </LayoutContainer>
  );
};

export default ProfilePageComponent;
