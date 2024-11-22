import spotifyApiAxios from '@/lib/api/spotifyApiAxios';
import { spotifyFetcher } from '@/lib/api/spotifyFetcher';
import { getArtistIds } from '@/lib/utils/getArtistIds';
import { NextResponse } from 'next/server';

export const GET = async () => {
  try {
    const artistIds = await getArtistIds();

    if (!artistIds.length) {
      return NextResponse.json({ error: 'No artist IDs found' }, { status: 404 });
    }

    const artistData = await Promise.all(
      artistIds.map(async (artistId) => {
        try {
          const data = await spotifyFetcher(`/artists/${artistId}`, {
            params: { market: 'KR' },
            next: { revalidate: 3600 },
          });
          return data;
        } catch (error) {
          console.error(`Error client fetching artist ${artistId}:`, error);
          return null;
        }
      }),
    );

    return NextResponse.json(artistData.filter((data) => data !== null)); // null 값 제거 후 반환
  } catch (error) {
    console.error('Error fetching artist data:', error);
    return NextResponse.json({ error: 'Failed to fetch artist data' }, { status: 500 });
  }
};
