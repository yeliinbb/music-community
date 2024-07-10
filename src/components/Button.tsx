'use client';

import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { PropsWithChildren } from "react";

interface ButtonProps extends PropsWithChildren {
  href: string;
}

const Button = ({ children, href }: ButtonProps) => {
  const pathname = usePathname();
  const isPath = pathname === href;

  return (
    <Link href={href}>
      <button className={`w-[150px] ${isPath ? 'bg-[#989898]' : 'bg-white' } text-black hover:bg-[#989898] active:bg-[#989898] py-[13px] px-[5px] rounded-xl border-solid border-black border-[1.5px]`}>
        {children}
      </button>
    </Link>
  );
};

export default Button;
