import { SpotifyPlaylistTracks } from "@/types/spotify.type";
import axios from "axios";

export const getPlaylists = async (): Promise<SpotifyPlaylistTracks[]> => {
  const response = await axios.get(`/api/spotify/playlists`);

  return response.data;
};
