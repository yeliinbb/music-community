"use client";

import useSearch from "@/hooks/useSearch";
import Image from "next/image";
import { useEffect, useRef } from "react";
import SearchArtistsSkeleton from "./SearchArtistsSkeleton";

export default function SearchArtists() {
  const obsRef = useRef<HTMLDivElement>(null);
  const { artists, artistsIsFetching, artistsHasNextPage, artistsFetchNextPage } = useSearch();
  const length = artists?.length ?? 41;
  // console.log("SPOTIFY ARTISTS DATA___", artists);

  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries, observer) => {
        if (entries[0].isIntersecting && artistsHasNextPage) {
          artistsFetchNextPage();
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
  }, [artists, artistsFetchNextPage, artistsHasNextPage]);

  return (
    <div className="flex flex-col gap-y-10">
      <div className="flex flex-col gap-y-4 min-h-[200px]">
        <h2 className="font-bold text-2xl">아티스트</h2>
        <div className="size-full flex-1">
          {!artists?.length && <h2 className="font-bold test-2xl select-none">앨범 검색 결과가 없습니다.</h2>}
          <ul
            className="flex gap-2 overflow-x-scroll p-2 
          scrollbar
          scrollbar-corner-sky-500  
          scrollbar-thumb-slate-700
           scrollbar-track-slate-300"
          >
            {artists?.map((artist) => (
              <li className="flex flex-col gap-y-2" key={artist.id}>
                <div className="relative size-24 aspect-square p-2">
                  <Image
                    src={artist.images.length ? artist.images[0].url : "http://via.placeholder.com/640x480"}
                    className="object-cover border-gray-300 border"
                    fill
                    alt={artist.name}
                    sizes={artist.images.length ? `${artist.images[0].width}px` : "100px"}
                  />
                </div>
                <div>
                  <p className="line-clamp-1 text-xs font-bold">{artist.name}</p>
                </div>
              </li>
            ))}
            {artistsIsFetching &&
              Array.from({ length: 8 }).map((_, idx) => (
                <li key={idx} className="animate-pulse transition select-none">
                  <SearchArtistsSkeleton />
                </li>
              ))}
            {!artistsIsFetching && length! < 40 && artistsHasNextPage && (
              <div ref={obsRef} className="w-10 flex-shrink-0" />
            )}
          </ul>
        </div>
      </div>
    </div>
  );
}
