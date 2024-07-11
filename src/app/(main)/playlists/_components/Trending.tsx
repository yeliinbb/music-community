"use client";
import { SpotifyFeaturedPlaylists } from "@/types/spotify.type";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import React, { use } from "react";

const Trending = () => {
  // const { data, isPending, isError, isSuccess } = useQuery({
  //   queryKey: ["trending"],
  //   queryFn: async () => {
  //     const response = await axios<SpotifyFeaturedPlaylists>("/api/spotify/featuredPlaylists");
  //     // console.log("response => ", response);
  //     return response.data;
  //   }
  // });
  return (
    <div>
      <h1>Spotify Featured Playlists</h1>
      {/* <div>
        <ul>
          {isSuccess &&
            data?.map((playlist) => (
              <li key={playlist.id}>
                {playlist.name} (Tracks : {playlist.tracksCount})
              </li>
            ))}
        </ul>
      </div> */}
    </div>
  );
};

export default Trending;
