import { getAccessToken } from "@/lib/spotify";
import { SpotifyPlaylist, SpotifyTrack, SpotifyPlaylistTracks } from "@/types/spotify.type";
import axios from "axios";
import { NextResponse } from "next/server";

// 예시 id 가져와야함.
const PLAYLIST_IDS = ["56AF0dTLXpcrAYfJhMSAdt", "1Owx9OwxqogNfpSu8yIWKx"];

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
            axios.get<SpotifyPlaylist>(`https://api.spotify.com/v1/playlists/${playlistId}`, {
              headers: { Authorization: `Bearer ${accessToken}` }
            }),
            axios.get<{ items: { track: SpotifyTrack }[] }>(
              `https://api.spotify.com/v1/playlists/${playlistId}/tracks`,
              {
                headers: { Authorization: `Bearer ${accessToken}` },
                params: {
                  fields: "items(track(id,name,preview_url,external_urls,artists(id,name),album(id,name,images)))",
                  limit: 8
                }
              }
            )
          ]);

          const processedPlaylist: SpotifyPlaylistTracks = {
            id: playlistResponse.data.id,
            name: playlistResponse.data.name,
            external_urls: {
              spotify: playlistResponse.data.external_urls.spotify
            },
            tracks: tracksResponse.data.items.map((item) => ({
              ...item.track,
              preview_url: item.track.preview_url ?? "none",
              external_urls: {
                spotify: item.track.external_urls.spotify
              }
            }))
          };

          return processedPlaylist;
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
