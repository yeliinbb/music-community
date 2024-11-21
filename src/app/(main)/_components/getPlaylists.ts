import { SpotifyPlaylistTracks } from "@/types/spotify.type";

export const getPlaylists = async (): Promise<SpotifyPlaylistTracks[]> => {
  const response = await fetch(`/api/spotify/playlists`, {
    next: { revalidate: 3600 }
  });

  if (!response.ok) {
    throw new Error("서버 응답이 올바르지 않습니다.");
  }
  const data = await response.json();
  return data;
};
