import spotifyApiAxios from "@/lib/axios/spotifyApiAxios";
import getPlaylistIdList from "@/lib/utils/getPlaylistIdList";
import { SpotifyPlaylist, SpotifyTrack, SpotifyPlaylistTracks } from "@/types/spotify.type";
import { NextResponse } from "next/server";

export const GET = async () => {
  const playlistsIds = await getPlaylistIdList();

  try {
    const playlistsWithTracks = await Promise.all(
      playlistsIds.map(async (playlistId) => {
        try {
          const [playlistResponse, tracksResponse] = await Promise.all([
            spotifyApiAxios.get<SpotifyPlaylist>(`/playlists/${playlistId}`, {
              params: { locale: "ko_KR" }
            }),
            spotifyApiAxios.get<{ items: { track: SpotifyTrack }[] }>(`/playlists/${playlistId}/tracks`, {
              params: {
                fields:
                  "items(track(id,name,preview_url,external_urls,duration_ms,artists(id,name),album(id,name,images)))",
                limit: 8,
                locale: "ko_KR"
              }
            })
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
          return null;
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
