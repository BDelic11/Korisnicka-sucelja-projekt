import Link from 'next/link';
import Image from 'next/image';

//icons
// import LOGO from "@/public/logos/Stylist logo_grey_xl.png";
import hamburger from '@/public/icons/hamburgerIcon.svg';
import heart from '@/public/icons/heart.svg';
import userLogo from '@/public/icons/user.svg';
import IconLink from './icon-link';

//actions
import { verifySession } from '@/lib/verifySession';
import { getNameBySession } from '@/actions/utils/users';

//components
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { LoginButton } from './loginButton';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from './button';
import { deleteSession } from '@/actions/session';

const rightIcons = [
  // {
  //   id: 1,
  //   icon: heart,
  //   linkTo: "/",
  //   classname: "",
  // },

  {
    id: 2,
    icon: hamburger,
    linkTo: '/',
    classname: 'md:hidden',
  },
];
const desktopIcons = [
  {
    id: 1,
    label: 'Profile info',
    linkTo: '/',
    classname: '',
  },
  {
    id: 2,
    label: 'Gallery',
    linkTo: '/gallery',
    classname: '',
  },

  // {
  //   id: 3,
  //   label: "Admin",
  //   linkTo: "/admin",
  //   classname: "",
  // },
];

export async function Navbar() {
  const { isAuth, userId } = await verifySession();
  const user = await getNameBySession(userId);

  return (
    <nav className=' font-roboto_slab lg:text-lg sticky top-0 flex flex-row justify-between items-center w-full h-16 p-4 bg-transoarent rounded-none md:h-20 duration-100 delay-75 z-10 md:px-20 '>
      {/* Logo on left side */}
      <Link href={'/'} className=''>
        <Image
          src={userLogo}
          alt='Logo icon'
          className='w-6 h-6 md:w-10   md:h-auto '
          // width={24}
          // height={24}
        />
      </Link>

      <ul className='hidden md:flex flex-row gap-3 md:gap-6 lg:gap-12 my-auto '>
        {desktopIcons.map((icon) => (
          <IconLink
            underline
            key={icon.id}
            classname={icon.classname}
            linkTo={icon.linkTo}
            label={icon.label}
          />
        ))}
      </ul>

      <ul className='flex flex-row gap-4 md:gap-4 lg:gap-5 my-auto'>
        {rightIcons.map((icon) => (
          <IconLink
            hover
            key={icon.id}
            classname={icon.classname}
            linkTo={icon.linkTo}
            icon={icon.icon}
          />
        ))}
        <div className='hidden md:block'>
          {isAuth ? (
            <DropdownMenu>
              <DropdownMenuTrigger>
                <Avatar>
                  <AvatarFallback>
                    {user?.name.slice(0, 2).toLocaleUpperCase()}
                  </AvatarFallback>
                </Avatar>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <Link href={'/profile'}>
                  <DropdownMenuItem>Profile</DropdownMenuItem>
                </Link>
                <form action={deleteSession} className='w-full cursor-pointer'>
                  <button className='w-full'>
                    <DropdownMenuItem className='text-red-500'>
                      Logout
                    </DropdownMenuItem>
                  </button>
                </form>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            // <Button asChild>
            //   <Link className="mt-20" href="/login">
            //     Login
            //   </Link>
            // </Button>
            <p>Not logged in</p>
          )}
        </div>
      </ul>
    </nav>
  );
}
