import { SpotifyPlaylistTracks } from "@/types/spotify.type";
import axios from "axios";

export const getPlaylists = async (): Promise<SpotifyPlaylistTracks[]> => {
  try {
    const response = await axios.get(`/api/spotify/playlists`);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error("Playlist 요청 에러:", {
        status: error.response?.status,
        statusText: error.response?.statusText,
        data: error.response?.data,
        config: {
          url: error.config?.url,
          method: error.config?.method,
          headers: error.config?.headers
        }
      });
    } else {
      console.error("알 수 없는 에러:", error);
    }
    throw error;
  }
};
