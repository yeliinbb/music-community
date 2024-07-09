"use client";

import api from "@/api/api";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";

export default function SearchSpotify({ searchParams }: { searchParams: string }) {
  const { data: spotifyDatas } = useQuery({
    queryKey: ["searchSpotify", { params: searchParams }],
    queryFn: () => api.search.searchSpotify(searchParams),
    retry: 0
  });

  // console.log("SPOTIFY DATA___", spotifyDatas);

  return (
    <div>
      <div>
        <h2 className="font-bold text-xl">앨범</h2>
        <ul className="grid grid-cols-6 gap-4">
          {spotifyDatas?.albums.items.map((item) => (
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
      <div>
        <h2 className="font-bold text-xl">아티스트</h2>
        <ul className="grid grid-cols-6 gap-4">
          {spotifyDatas?.artists.items.map((item) => (
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
      {/* {!query.length && !isLoading && <div>검색 결과가 없읍니다</div>} */}
    </div>
  );
}
