import { getAccessToken } from "@/lib/spotify";
import { SpotifyPlaylistTracks } from "@/types/spotify.type";
import axios from "axios";
import { NextResponse } from "next/server";

const PLAYLIST_IDS = [
  "3cEYpjA9oz9GiPac4AsH4n" // 예시 id 가져와야함.
];

export const GET = async () => {
  const accessToken = await getAccessToken();
  if (!accessToken) {
    console.error("Access token is missing");
    return NextResponse.json({ error: "Access token is missing" }, { status: 500 });
  }
  try {
    const playlistsWithTracks = await Promise.all(
      PLAYLIST_IDS.map(async (playlistId) => {
        try {
          const [playlistResponse, tracksResponse] = await Promise.all([
            axios.get(`https://api.spotify.com/v1/playlists/${playlistId}`, {
              headers: { Authorization: `Bearer ${accessToken}` }
            }),
            axios.get(`https://api.spotify.com/v1/playlists/${playlistId}/tracks`, {
              headers: { Authorization: `Bearer ${accessToken}` },
              params: {
                fields: "items(track(id,name,artists(id,name),album(id,name,images)))"
              }
            })
          ]);

          return {
            id: playlistResponse.data.id,
            name: playlistResponse.data.name,
            tracks: tracksResponse.data.items.map((item: any) => ({
              id: item.track.id,
              name: item.track.name,
              artists: item.track.artists.map((artist: any) => ({
                id: artist.id,
                name: artist.name
              })),
              album: {
                id: item.track.album.id,
                name: item.track.album.name,
                image: item.track.album.images[0]?.url
              }
            }))
          };
        } catch (error) {
          console.error(`Error fetching playlist ${playlistId}:`, error);
          return null; // 개별 플레이리스트 오류 시 null 반환
        }
      })
    );
    // null 값 (오류 발생한 플레이리스트) 제거
    const validPlaylists = playlistsWithTracks.filter((playlist) => playlist !== null);

    return NextResponse.json(validPlaylists);
  } catch (error) {
    console.error("Error fetching track:", error);
    return NextResponse.json({ error: "Failed to fetch playlists data" }, { status: 500 });
  }
};
