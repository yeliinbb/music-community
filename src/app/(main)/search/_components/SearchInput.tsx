"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { FormEvent, useRef } from "react";

export default function SearchInput() {
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);

  const onClickHandler = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (inputRef.current) {
      // console.log("INPUT___", inputRef.current.value);
      const encodeURL = encodeURIComponent(inputRef.current.value);
      router.push(`/search?params=${encodeURL}`, { scroll: false });
      inputRef.current.value = "";
    }
  };

  return (
    <form className="flex gap-x-2 w-full" onSubmit={onClickHandler}>
      <input className="px-4 py-2 w-full rounded-md" ref={inputRef} type="text" placeholder="Search..." />
      <button
        className=" select-none border border-black rounded-md p-2 bg-white font-bold
      hover:shadow-lg active:shadow-[inset_0_1px_6px_gray]"
        type="submit"
        // onClick={onClickHandler}
      >
        <div className="relative aspect-square size-[20px]">
          <Image src="/heart.svg" alt="검색 아이콘" className="object-cover" fill sizes="50px" />
        </div>
      </button>
    </form>
  );
}
