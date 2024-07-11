"use client";
import { SpotifyFeaturedPlaylist } from "@/types/spotify.type";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import React, { use, useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";

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
    <div className="w-full max-h-[300px] flex flex-col gap-3 px-[30px] pb-[30px] min-w-[350px]">
      {isSuccess && (
        <>
          <h2>Featured Playlists</h2>
          {selectedPlaylist?.imageUrl ? (
            <Image
              src={selectedPlaylist.imageUrl || ""}
              alt={selectedPlaylist.name}
              height={200}
              width={200}
              className="max-w-[180px] max-h-[180px] object-cover rounded-md self-center"
            />
          ) : null}

          <div className="flex flex-col items-center gap-2">
            <p className="h-[15px]">{selectedPlaylist.name}</p>
            <Link href={selectedPlaylist.trackLink} target="_blank" rel="noopener noreferrer">
              <p className="h-[15px] hover:underline">바로가기</p>
            </Link>
          </div>
        </>
      )}
    </div>
  );
};

export default Trending;
