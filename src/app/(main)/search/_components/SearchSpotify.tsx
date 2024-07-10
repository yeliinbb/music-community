"use client";

import useSearch from "@/hooks/useSearch";
import Image from "next/image";

export default function SearchSpotify() {
  const { spotifyDatas } = useSearch();
  // console.log("SPOTIFY DATA___", isFetching, isLoading, spotifyDatas);

  return (
    <div className="flex flex-col gap-y-10">
      <div className="flex flex-col gap-y-4 min-h-[200px]">
        <h2 className="font-bold text-2xl">앨범</h2>
        <div className="size-full flex-1">
          {!spotifyDatas?.albums.items.length && (
            <h2 className="font-bold test-2xl select-none">앨범 검색 결과가 없습니다.</h2>
          )}
          <ul className="grid grid-cols-7 gap-4 ">
            {spotifyDatas?.albums.items.slice(0, 7).map((item) => (
              <li className="flex flex-col gap-y-2" key={item.id}>
                <div className="relative aspect-square p-2">
                  <Image
                    src={item.images[1].url}
                    className="object-cover border-gray-300 border"
                    fill
                    alt={item.name}
                    sizes={item.images.length ? `${item.images[0].width}px` : "100px"}
                  />
                </div>
                <div>
                  <p className="line-clamp-1 text-sm font-bold">{item.name}</p>
                  <div className="flex gap-2 text-xs">
                    <p>
                      {item.release_date.split("-")[0]} • {item.artists[0].name}
                    </p>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="flex flex-col gap-y-4 min-h-[200px]">
        <h2 className="font-bold text-2xl">아티스트</h2>
        <div className="size-full flex-1">
          {!spotifyDatas?.artists.items.length && (
            <h2 className="font-bold test-2xl select-none">아티스트 검색 결과가 없습니다.</h2>
          )}
          <ul className="grid grid-cols-7 gap-4 ">
            {spotifyDatas?.artists.items.slice(0, 7).map((item) => (
              <li className="flex flex-col gap-y-2" key={item.id}>
                <div className="relative aspect-square p-2 rounded-full">
                  <Image
                    src={item.images.length ? item.images[0].url : "http://via.placeholder.com/640x480"}
                    className="object-cover border-gray-300 border rounded-full"
                    fill
                    alt={item.name}
                    sizes={item.images.length ? `${item.images[0].width}px` : "100px"}
                  />
                </div>
                <div>
                  <p className="line-clamp-1 text-sm font-bold">{item.name}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
      {/* {!query.length && !isLoading && <div>검색 결과가 없읍니다</div>} */}
    </div>
  );
}
