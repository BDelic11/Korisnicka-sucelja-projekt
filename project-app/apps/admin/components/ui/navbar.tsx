import Link from "next/link";
import Image from "next/image";

import hamburger from "@/public/icons/hamburgerIcon.svg";
import logoIcon from "@/public/favicons/Stylist_favicon.png";
import IconLink from "./icon-link";

import { verifySession } from "@/lib/verifySession";
import { getNameBySession } from "@/actions/utils/users";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { deleteSession } from "@/actions/session";

const mobileToggleLinks = [
  {
    id: 1,
    label: "Home",
    href: "/",
  },
  {
    id: 2,
    label: "Profile",
    href: "/profile",
  },
  {
    id: 3,
    label: "Gallery",
    href: "/gallery",
  },
];

const desktopIcons = [
  {
    id: 1,
    label: "Home",
    linkTo: "/",
    className: "",
  },
  {
    id: 2,
    label: "Gallery",
    linkTo: "/gallery",
    className: "",
  },
];

export async function Navbar() {
  const { isAuth, userId } = await verifySession();
  const user = await getNameBySession(userId);

  return (
    <nav className="bg-white shadow-sm font-roboto_slab lg:text-lg fixed top-0 flex flex-row justify-between items-center w-full h-16  pr-4 bg-transoarent rounded-none md:h-20 duration-100 delay-75 z-10 md:px-20 md:mb-40">
      <Link href={"/"} className="">
        <Image
          src={logoIcon}
          alt="Logo icon"
          className="w-14 h-14  md:w-20  md:h-auto "
          // width={24}
          // height={24}
        />
      </Link>

      {user && (
        <ul className="hidden md:flex flex-row gap-3 md:gap-6 lg:gap-12 my-auto ">
          {desktopIcons.map((icon) => (
            <IconLink
              underline
              key={icon.id}
              className={icon.className}
              linkTo={icon.linkTo}
              label={icon.label}
            />
          ))}
        </ul>
      )}

      <ul className="flex flex-row gap-4 md:gap-4 lg:gap-5 my-auto">
        <DropdownMenu>
          <DropdownMenuTrigger>
            <IconLink hover className="md:hidden" icon={hamburger} linkTo="/" />
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            {mobileToggleLinks.map((link) => (
              <Link key={link.id} href={link.href}>
                <DropdownMenuItem>{link.label}</DropdownMenuItem>
              </Link>
            ))}
            {isAuth && user && (
              <form action={deleteSession} className="w-full cursor-pointer">
                <button className="w-full">
                  <DropdownMenuItem className="text-red-500">
                    Logout
                  </DropdownMenuItem>
                </button>
              </form>
            )}
          </DropdownMenuContent>
        </DropdownMenu>

        <div className="hidden md:block">
          {isAuth && user ? (
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
                <Link href={"/profile"}>
                  <DropdownMenuItem>Profile</DropdownMenuItem>
                </Link>
                <form action={deleteSession} className="w-full cursor-pointer">
                  <button className="w-full">
                    <DropdownMenuItem className="text-red-500">
                      Logout
                    </DropdownMenuItem>
                  </button>
                </form>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <p>Not logged in</p>
          )}
        </div>
      </ul>
    </nav>
  );
}
