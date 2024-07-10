"use client";
import { SpotifyPlaylistTracks } from "@/types/spotify.type";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import React from "react";

const Playlists = () => {
  const { data, isPending, isError, isSuccess } = useQuery({
    queryKey: ["playlists"],
    queryFn: async () => {
      const response = await axios<SpotifyPlaylistTracks>(`/api/spotify/playlists`);
      console.log("response => ", response);
      return response.data;
    }
  });
  return <div>Playlists</div>;
};

export default Playlists;
