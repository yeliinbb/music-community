import Image from "next/image";
import Link from "next/link";
import React from "react";

const Footer = () => {
  return (
    <div className="flex gap-2 items-center justify-center m-3 text-white">
      <span>@2024 all rights reserved 식스센스조</span>
      <Link href="https://github.com/yeliinbb/music-community" target="_blank" rel="noopener noreferrer">
        <Image width={20} height={20} src="https://cdn-icons-png.flaticon.com/256/25/25231.png" alt="github" />
      </Link>
    </div>
  );
};

export default Footer;
