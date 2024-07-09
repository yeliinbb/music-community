"use client";

import api from "@/api/api";
import { ArtistsItems } from "@/types/spotify.type";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";

type LikeType = {
  artists: ArtistsItems[];
};

export default function MyLikes() {
  const { data: likes } = useQuery<LikeType>({
    queryKey: ["myLikes"],
    queryFn: () => api.me.getMyLikes()
  });

  return (
    <div>
      <ul className="grid grid-cols-3 gap-2 p-2">
        {likes?.artists.map((artist) => (
          <li className="divide-y-2 border border-black rounded p-2" key={artist.id}>
            <div className="relative aspect-square p-2">
              <Image
                src={artist.images.length ? artist.images[0].url : "http://via.placeholder.com/640x480"}
                className="object-cover"
                fill
                alt={artist.name}
                sizes={artist.images.length ? `${artist.images[0].width}px` : "100px"}
              />
            </div>
            <h2 className="font-bold text-lg">{artist.name}</h2>
          </li>
        ))}
      </ul>
    </div>
  );
}
