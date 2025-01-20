"use client";
import Image, { StaticImageData } from "next/image";
import Link from "next/link";
import React from "react";

interface IconLinkProps {
  menuToggle?: boolean;
  hover?: boolean;
  underline?: boolean;
  linkTo: string;
  icon?: StaticImageData;
  label?: string;
  classname?: string;
}

const IconLink = ({
  menuToggle,
  underline,
  hover,
  linkTo,
  icon,
  classname,
  label,
}: IconLinkProps) => {
  const handleMenuToggle = () => {
    if (menuToggle) {
      console.log("Menu toggle");
    }
  };

  return (
    <Link
      href={linkTo}
      className={`${
        hover ? "md:hover:bg-hoverSoftGreen rounded-full duration-300" : ""
      } 
      ${
        underline
          ? " hover:underline  underline-offset-[16px]  decoration-navbarTextColor decoration-2 transition-all duration-300 delay-300"
          : ""
      }
       ${classname} md:p-1  `}
    >
      {icon ? (
        <li className="relative list-none">
          {menuToggle ? (
            <Image
              onClick={() => handleMenuToggle()}
              src={icon}
              alt="Link icon"
              className="w-6 h-6 text-red-100 md:w-7 md:h-7 relative"
              // width={24}
              // height={24}
            />
          ) : (
            <Image
              src={icon}
              alt="Link icon"
              className="w-6 h-6 text-red-100 md:w-7 md:h-7 relative"
              // width={24}
              // height={24}
            />
          )}
        </li>
      ) : (
        <li className="text-navbarTextColor font-light">{label}</li>
      )}
    </Link>
  );
};

export default IconLink;
