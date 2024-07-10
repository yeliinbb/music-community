"use client";

import { useRouter } from "next/navigation";
import { useRef } from "react";

export default function SearchInput() {
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);

  const onClickHandler = () => {
    if (inputRef.current) {
      const encodeURL = encodeURIComponent(inputRef.current.value);
      router.push(`?params=${encodeURL}`, { scroll: false });
    }
  };

  return (
    <div className="flex gap-x-2">
      <input className="px-4 py-2 rounded-md" ref={inputRef} type="text" />
      <button
        className=" select-none border border-black rounded-md p-2 bg-white font-bold
      hover:shadow-lg active:shadow-[inset_0_1px_6px_gray]"
        onClick={onClickHandler}
      >
        찾기
      </button>
    </div>
  );
}
