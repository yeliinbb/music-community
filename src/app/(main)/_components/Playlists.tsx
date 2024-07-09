"use client";
import { SpotifyPlaylistTracks } from "@/types/spotify.type";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useParams, useSearchParams } from "next/navigation";
import React, { use } from "react";

const Playlists = () => {
  const { data, isPending, isError, isSuccess } = useQuery({
    queryKey: ["playlists"],
    queryFn: async () => {
      const response = await axios(`/api/spotify/playlists`);
      console.log("response => ", response);
      return response.data;
    }
  });
  return <div>Playlists</div>;
};

export default Playlists;
