"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { PropsWithChildren } from "react";

interface ButtonProps extends PropsWithChildren {
  href: string;
}
const Button = ({ children, href }: ButtonProps) => {
  const pathname = usePathname();
  const fixedPathName = "/" + pathname.split("/")[1];
  let isPath = "";
  if (pathname === href) {
    isPath = href;
  }
  if (fixedPathName === href) {
    isPath = "/" + pathname.split("/")[1];
  }

  return (
    <Link href={href}>
      <button
        className={`w-[150px] ${isPath ? "bg-[#ff8b8b]" : "bg-white"} text-black hover:bg-[#ff8b8b] active:bg-[#ff8b8b] py-[13px] px-[5px] rounded-xl shadow-2xl`}
      >
        {children}
      </button>
    </Link>
  );
};

export default Button;
