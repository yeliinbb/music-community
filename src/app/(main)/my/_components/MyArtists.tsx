"use client";

import useMe from "@/hooks/useMe";
import Link from "next/link";
import MyArtistsCard from "./MyArtistsCard";

export default function MyArtists() {
  const { likes } = useMe();

  return (
    <div>
      {!likes?.artists && <div className="h-[150px]">좋아효 한 아티스트가 없습니다.</div>}
      {likes?.artists && (
        <ul className="grid grid-cols-4 gap-2 p-2">
          {likes?.artists.map((artist) => (
            <li
              className="shadow-md hover:shadow-lg transition-shadow duration-150 
            active:shadow-[inset_0_2px_8px_gray] select-none cursor-pointer
            border border-black rounded "
              key={artist.id}
            >
              <Link className="p-2 flex flex-col gap-y-4" href={`/artist/${artist.id}`}>
                <MyArtistsCard artist={artist} />
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
