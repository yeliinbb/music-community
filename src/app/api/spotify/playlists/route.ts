import { getAccessToken } from "@/lib/spotify";
import getPlaylistIdList from "@/lib/utils/getPlaylistIdList";
import { SpotifyPlaylist, SpotifyTrack, SpotifyPlaylistTracks } from "@/types/spotify.type";
import axios from "axios";
import { NextResponse } from "next/server";

export const GET = async () => {
  const accessToken = await getAccessToken();
  const playlistsIds = await getPlaylistIdList();

  if (!accessToken) {
    console.error("Access token is missing");
    return NextResponse.json({ error: "Access token is missing" }, { status: 500 });
  }
  try {
    const playlistsWithTracks = await Promise.all(
      playlistsIds.map(async (playlistId) => {
        try {
          const [playlistResponse, tracksResponse] = await Promise.all([
            axios.get<SpotifyPlaylist>(`https://api.spotify.com/v1/playlists/${playlistId}`, {
              headers: { Authorization: `Bearer ${accessToken}` },
              params: {
                locale: "ko_KR"
              }
            }),
            axios.get<{ items: { track: SpotifyTrack }[] }>(
              `https://api.spotify.com/v1/playlists/${playlistId}/tracks`,
              {
                headers: { Authorization: `Bearer ${accessToken}` },
                params: {
                  fields:
                    "items(track(id,name,preview_url,external_urls,duration_ms,artists(id,name),album(id,name,images)))",
                  limit: 8,
                  locale: "ko_KR"
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
              preview_url: item.track.preview_url ?? "none", // ?? :    왼쪽 값이 null 이나 undefined 인 경우에만 오른쪽 값을 반환하는 연산자
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

    const validPlaylists = playlistsWithTracks.filter((playlist) => playlist !== null);

    return NextResponse.json(validPlaylists);
  } catch (error) {
    console.error("Error fetching track:", error);
    return NextResponse.json({ error: "Failed to fetch playlists data" }, { status: 500 });
  }
};
