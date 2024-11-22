import { SpotifyArtist } from '@/types/spotify.type';
import { getArtistIds } from './getArtistIds';
import axios from 'axios';
import { spotifyFetcher } from '../api/spotifyFetcher';

export const getSpotifyArtists = async (): Promise<SpotifyArtist[]> => {
  if (typeof window === 'undefined') {
    return getSpotifyArtistsServer();
  }
  const { data } = await axios.get(`/api/spotify/artist`);

  return data;
};

const getSpotifyArtistsServer = async () => {
  const startTime = performance.now();
  const artistIds = await getArtistIds();

  if (!artistIds.length) {
    throw new Error('No artist IDs found');
  }

  try {
    const artistData = await Promise.all(
      artistIds.map(async (artistId) => {
        try {
          const data = await spotifyFetcher(`/artists/${artistId}`, {
            params: { market: 'KR' },
            next: { revalidate: 3600 },
          });
          return data;
        } catch (error) {
          console.error(`Error server fetching artist ${artistId}:`, error);
          return null;
        }
      }),
    );
    const filteredArtists = artistData.filter((data): data is SpotifyArtist => data !== null);

    const endTime = performance.now();
    console.log(`getSpotifyArtists Execution time: ${endTime - startTime}ms`);

    return filteredArtists;
  } catch (error) {
    const endTime = performance.now();
    console.log(`Error execution time: ${endTime - startTime}ms`);

    console.error('Error fetching artist data:', error);
    return [];
  }
};
