import { SpotifyPlaylist, SpotifyPlaylistTracks, SpotifyTrack } from '@/types/spotify.type';
import getPlaylistIdList from './getPlaylistIdList';
import spotifyApiAxios from '../api/spotifyApiAxios';
import axios from 'axios';
import { spotifyFetcher } from '../api/spotifyFetcher';

export const getPlaylists = async (): Promise<SpotifyPlaylistTracks[]> => {
  if (typeof window === 'undefined') {
    return getPlaylistsServer();
  }
  const { data } = await axios.get(`/api/spotify/playlists`);
  return data;
};

export const getPlaylistsServer = async () => {
  const startTime = performance.now();
  const playlistsIds = await getPlaylistIdList();

  try {
    const playlistsWithTracks = await Promise.all(
      playlistsIds.map(async (playlistId) => {
        try {
          const [playlistResponse, tracksResponse] = await Promise.all([
            spotifyFetcher(`/playlists/${playlistId}`, {
              method: 'GET',
              next: { revalidate: 3600 },
            }),
            spotifyFetcher(`/playlists/${playlistId}/tracks`, {
              method: 'GET',
              params: {
                fields:
                  'items(track(id,name,preview_url,external_urls,duration_ms,artists(id,name),album(id,name,images)))',
                limit: 8,
              },
              next: { revalidate: 3600 },
            }),
          ]);

          const processedPlaylist: SpotifyPlaylistTracks = {
            id: playlistResponse.id,
            name: playlistResponse.name,
            external_urls: {
              spotify: playlistResponse.external_urls.spotify,
            },
            tracks: (tracksResponse.items as { track: SpotifyTrack }[]).map((item) => ({
              ...item.track,
              preview_url: item.track.preview_url ?? null,
              external_urls: {
                spotify: item.track.external_urls.spotify,
              },
            })),
          };

          return processedPlaylist;
        } catch (error) {
          console.error(`Error fetching playlist ${playlistId}:`, error);
          return null;
        }
      }),
    );

    const validPlaylists = playlistsWithTracks.filter(
      (playlist): playlist is SpotifyPlaylistTracks => playlist !== null,
    );

    const endTime = performance.now();
    console.log(`getPlaylists Execution time: ${endTime - startTime}ms`);
    return validPlaylists;
  } catch (error) {
    const endTime = performance.now();
    console.log(`Error execution time: ${endTime - startTime}ms`);

    console.error('Error fetching track:', error);
    return [];
  }
};
