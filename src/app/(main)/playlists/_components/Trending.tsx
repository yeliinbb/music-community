"use client";
import { SpotifyFeaturedPlaylist } from "@/types/spotify.type";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

const Trending = () => {
  const [selectedPlaylist, setSelectedPlaylist] = useState<SpotifyFeaturedPlaylist>({
    id: "",
    name: "",
    description: "",
    imageUrl: "",
    trackLink: "",
    tracksCount: 0
  });
  const {
    data: featuredPlaylists,
    isPending,
    isError,
    isSuccess
  } = useQuery({
    queryKey: ["trending"],
    queryFn: async () => {
      const response = await axios<SpotifyFeaturedPlaylist[]>("/api/spotify/featuredPlaylists");
      console.log("trending response => ", response);
      return response.data;
    }
  });

  useEffect(() => {
    const randomIndex = Math.floor(Math.random() * 10);
    // const selectedPlaylist = isSuccess ? featuredPlaylists[randomIndex] : [];
    if (isSuccess) {
      setSelectedPlaylist(featuredPlaylists[randomIndex]);
    } else return;
    console.log(selectedPlaylist);
  }, [featuredPlaylists]);

  return (
    <div className="w-full flex flex-col p-2 gap-y-2">
      {isSuccess && (
        <>
          <span className="text-sm text-gray-400">플레이 리스트</span>
          {selectedPlaylist?.imageUrl ? (
            <Image
              src={selectedPlaylist.imageUrl || ""}
              alt={selectedPlaylist.name}
              height={200}
              width={200}
              className="max-w-[180px] max-h-[180px] object-cover rounded-md self-center"
            />
          ) : null}

          <div className="flex flex-col text-sm gap-2">
            <p className="h-[15px]">{selectedPlaylist.name}</p>
            <Link href={selectedPlaylist.trackLink} target="_blank" rel="noopener noreferrer">
              <p className="h-[15px] hover:underline mt-5">바로가기</p>
            </Link>
          </div>
        </>
      )}
    </div>
  );
};

export default Trending;
