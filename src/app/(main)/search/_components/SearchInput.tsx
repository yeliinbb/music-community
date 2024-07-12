"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useRef } from "react";

export default function SearchInput() {
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);

  const onClickHandler = () => {
    if (inputRef.current) {
      const encodeURL = encodeURIComponent(inputRef.current.value);
      router.push(`/search?params=${encodeURL}`, { scroll: false });
    }
  };

  return (
    <div className="flex gap-x-2 w-full">
      <input className="px-4 py-2 w-full rounded-md" ref={inputRef} type="text" placeholder="Search..." />
      <button
        className=" select-none border border-black rounded-md p-2 bg-white font-bold
      hover:shadow-lg active:shadow-[inset_0_1px_6px_gray]"
        onClick={onClickHandler}
      >
        <div className="relative aspect-square size-[20px]">
          <Image src="/heart.svg" alt="검색 아이콘" className="object-cover" fill sizes="50px" />
        </div>
      </button>
    </div>
  );
}
