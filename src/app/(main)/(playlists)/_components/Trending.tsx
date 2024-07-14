"use client";
import { SpotifyFeaturedPlaylist } from "@/types/spotify.type";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Link from "next/link";
import { useEffect, useState } from "react";
import TrendingSkeleton from "./TrendingSkeleton";
import { Tooltip } from "react-tooltip";
import "react-tooltip/dist/react-tooltip.css";

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

      return response.data;
    }
  });

  useEffect(() => {
    const randomIndex = Math.floor(Math.random() * 10);

    if (isSuccess) {
      setSelectedPlaylist(featuredPlaylists[randomIndex]);
    } else return;
  }, [featuredPlaylists]);

  if (isPending) return <TrendingSkeleton />;

  return (
    <div className="w-full flex flex-col p-2 gap-y-2">
      {isSuccess && (
        <>
          <span className="text-base">추천 플레이리스트 🎵</span>
          <Link href={selectedPlaylist.trackLink} target="_blank" rel="noopener noreferrer">
            <div className="flex flex-col text-sm gap-2 place-self-center">
              {selectedPlaylist?.imageUrl ? (
                <img
                  src={selectedPlaylist.imageUrl || ""}
                  alt={selectedPlaylist.name}
                  height={200}
                  width={200}
                  className="w-[200px] h-[200px] max-w-[180px] max-h-[180px] object-cover rounded-md self-center"
                />
              ) : null}
              <div className="flex flex-col text-sm gap-2 text-center">
                <p
                  className="h-[15px] text-base hover:underline"
                  data-tooltip-id="플레이리스트 바로가기"
                  data-tooltip-content="바로가기"
                >
                  {selectedPlaylist.name}
                </p>
                {/* <Tooltip
                  id="플레이리스트 바로가기"
                  place="bottom"
                  style={{ backgroundColor: "#ffffff", color: "black" }}
                /> */}

                {/* <Link href={selectedPlaylist.trackLink} target="_blank" rel="noopener noreferrer">
              <p className="h-[15px] text-center hover:underline">(바로가기)</p>
            </Link> */}
              </div>
            </div>
          </Link>
        </>
      )}
    </div>
  );
};

export default Trending;
