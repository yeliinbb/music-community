"use client";

import useSearch from "@/hooks/useSearch";
import Image from "next/image";

export default function SearchSpotify() {
  const {
    spotifyDatas: { albums, artists }
  } = useSearch();
  // console.log("SPOTIFY DATA___", isFetching, isLoading, spotifyDatas);
  console.log("albums", albums);
  console.log("artists", artists);
  return (
    <div>
      <div>
        <h2 className="font-bold text-xl">앨범</h2>
        <div className="min-h-[100px]">
          {!albums?.items.length && (
            <div className="flex items-center justify-center flex-1">앨범 검색 결과가 없습니다.</div>
          )}
          <ul className="grid grid-cols-6 gap-4 ">
            {albums?.items.map((item) => (
              <li key={item.id}>
                <div className="relative aspect-square p-2">
                  <Image
                    src={item.images[1].url}
                    className="object-cover"
                    fill
                    alt={item.name}
                    sizes={item.images.length ? `${item.images[0].width}px` : "100px"}
                  />
                </div>
                {item.name}
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div>
        <h2 className="font-bold text-xl">아티스트</h2>
        <div className="min-h-[100px]">
          {!artists?.items.length && (
            <div className="flex items-center justify-center flex-1">아티스트 검색 결과가 없습니다.</div>
          )}
          <ul className="grid grid-cols-6 gap-4 ">
            {artists?.items.map((item) => (
              <li key={item.id}>
                <div className="relative aspect-square p-2">
                  <Image
                    src={item.images.length ? item.images[0].url : "http://via.placeholder.com/640x480"}
                    className="object-cover"
                    fill
                    alt={item.name}
                    sizes={item.images.length ? `${item.images[0].width}px` : "100px"}
                  />
                </div>
                {item.name}
              </li>
            ))}
          </ul>
        </div>
      </div>
      {/* {!query.length && !isLoading && <div>검색 결과가 없읍니다</div>} */}
    </div>
  );
}
