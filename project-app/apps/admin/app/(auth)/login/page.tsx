import { LoginForm } from '@/components/forms/login-form';
import Image from 'next/image';

import illustration from '@/public/images/stylist illustration blue.svg';

export default async function LoginPage() {
  return (
    <main className='min-h-full'>
      <section
        className='flex flex-col justify-center md:justify-around align-middle md:flex-row md:mx-20 md:pb-10 md:px-20 md:border md:bg-white md:rounded-md 
     '
      >
        <div className='my-auto  md:w-1/3 '>
          <Image
            src={illustration}
            alt='illustration image'
            className=' h-72 w-auto '
          />
        </div>

        <LoginForm />
      </section>
    </main>
  );
}
