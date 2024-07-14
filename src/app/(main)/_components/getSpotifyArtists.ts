import { SpotifyArtist } from "@/types/spotify.type";

export const getSpotifyArtists = async (): Promise<SpotifyArtist[]> => {
  const response = await fetch(`/api/spotify/artist`);
  if (!response.ok) {
    throw new Error("서버 응답이 올바르지 않습니다.");
  }
  const data = await response.json();
  return data;
};
