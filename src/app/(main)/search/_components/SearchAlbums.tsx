"use client";

import useSearch from "@/hooks/useSearch";
import Image from "next/image";
import { useEffect, useRef } from "react";
import SearchAlbumsSkeleton from "./SearchAlbumsSkeleton";

export default function SearchAlbums() {
  const obsRef = useRef<HTMLDivElement>(null);
  const { albums, albumsIsFetching, albumsHasNextPage, albumsFetchNextPage } = useSearch();
  // 최대 40개 일단은..
  const length = albums?.length ?? 41;
  // console.log("SPOTIFY DATA___", albums);

  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries, observer) => {
        if (entries[0].isIntersecting && albumsHasNextPage) {
          albumsFetchNextPage();
          observer.unobserve(entries[0].target);
        }
      },
      { threshold: 0.9 }
    );

    const currentObs = obsRef.current;

    if (currentObs) {
      obs.observe(currentObs);
    }

    return () => {
      if (currentObs) {
        obs.unobserve(currentObs);
      }
    };
  }, [albums, albumsFetchNextPage, albumsHasNextPage]);

  return (
    <div className="flex flex-col gap-y-10">
      <div className="flex flex-col gap-y-4 min-h-[200px]">
        <h2 className="font-bold text-2xl">앨범</h2>
        <div className="size-full flex-1">
          {!albums?.length && <h2 className="font-bold test-2xl select-none">앨범 검색 결과가 없습니다.</h2>}
          <ul
            className="flex gap-2 overflow-x-scroll p-2 
          scrollbar
          scrollbar-corner-sky-500  
          scrollbar-thumb-slate-700
           scrollbar-track-slate-300"
          >
            {albums?.map((item) => (
              <li className="flex flex-col gap-y-2" key={item.id}>
                <div className="relative size-24 aspect-square p-2">
                  <Image
                    src={item.images[1].url}
                    className="object-cover border-gray-300 border"
                    fill
                    alt={item.name}
                    sizes={item.images.length ? `${item.images[0].width}px` : "100px"}
                  />
                </div>
                <div>
                  <p className="text-[9px] text-gray-400">{item.release_date.split("-")[0]}</p>
                  <p className="line-clamp-1 text-xs font-bold">{item.name}</p>
                  <p className="line-clamp-1 text-[10px]">{item.artists[0].name}</p>
                </div>
              </li>
            ))}
            {albumsIsFetching &&
              Array.from({ length: 8 }).map((_, idx) => (
                <li key={idx} className="animate-pulse transition select-none">
                  <SearchAlbumsSkeleton />
                </li>
              ))}
            {!albumsIsFetching && length! < 40 && albumsHasNextPage && (
              <div ref={obsRef} className="w-10 flex-shrink-0" />
            )}
          </ul>
        </div>
      </div>
    </div>
  );
}
