import { getUserAllDataById } from '@/actions/utils/users';
import { Button } from '@/components/ui/button';
import LayoutContainer from '@/components/ui/container';
import { Input } from '@/components/ui/input';
import { verifySession } from '@/lib/verifySession';
import Image from 'next/image';
import Link from 'next/link';

//images
import profileIllustration from '@/public/images/profile.svg';
import { ProfileForm } from '@/components/forms/change-salon-data';
import { getSalonInfo } from '@/actions/utils/salons';

const ProfilePageComponent = async () => {
  const salon = await getSalonInfo();

  return (
    <LayoutContainer className='min-h-screen pt-10 flex flex-col md:flex-row w-full justify-around align-middle'>
      <section>
        <h1 className='text-4xl font-extrabold tracking-tight lg:text-5xl pb-20'>
          Profile
        </h1>
        <h1 className='text-2xl font-normal tracking-tight lg:text-2xl'>
          Welcome{' '}
          <span className='text-stylist-blue text-bold'>{salon?.name} </span>
          you can change your profile info here
        </h1>
        <div className='flex flex-col gap-4 my-10'>
          <ProfileForm salon={salon} />
        </div>
        <div className='flex flex-row gap-2'>
          <Button variant='destructive'>Delete Account</Button>
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
