"use client";

import { useRouter } from "next/navigation";
import { useRef } from "react";
import SearchSpotify from "./_components/SearchSpotify";
import SearchUser from "./_components/SearchUser";

function SearchPage() {
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);

  const onClickHandler = () => {
    if (inputRef.current) {
      const encodeURL = encodeURIComponent(inputRef.current.value);
      // console.log("INPUT REF___", encodeURL);
      router.push(`?params=${encodeURL}`, { scroll: false });
    }
  };

  return (
    <div>
      <input ref={inputRef} type="text" />
      <button onClick={onClickHandler}>찾기</button>
      <SearchUser />
      <SearchSpotify />
    </div>
  );
}

export default SearchPage;

/**
 * http GET 'https://api.spotify.com/v1/search?q=%EB%9F%AC%EB%B8%94%EB%A6%AC%EC%A6%88&type=album' \
  Authorization:'Bearer 1POdFZRZbvb...qqillRxMr2z'
 * 
 */
