import { getAccessToken } from '@/lib/api/getAccessToken';
import spotifyApiAxios from '@/lib/api/spotifyApiAxios';
import { spotifyFetcher } from '@/lib/api/spotifyFetcher';
import { SpotifyFeaturedPlaylists } from '@/types/spotify.type';
import { NextResponse } from 'next/server';

// [number] 배열의 요소 타입을 가져올 때 사용
type PlaylistItem = SpotifyFeaturedPlaylists['playlists']['items'][number];

export const GET = async () => {
  try {
    const response = await spotifyFetcher(`/browse/featured-playlists`, {
      params: {
        country: 'KR',
        limit: 10,
      },
    });

    if (!response.data) {
      console.error('No data in response:', response);
      return NextResponse.json({ error: 'No data received from Spotify' }, { status: 500 });
    }

    console.log('Raw response data:', response.data); // 실제 데이터 구조 확인

    const featuredPlaylists = response.data.playlists.items.map((playlist: PlaylistItem) => ({
      id: playlist.id,
      name: playlist.name,
      description: playlist.description,
      imageUrl: playlist.images[0]?.url,
      tracksCount: playlist.tracks.total,
      trackLink: playlist.external_urls.spotify,
    }));

    return NextResponse.json(featuredPlaylists);
  } catch (error) {
    console.error('Error fetching track:', error);
    return NextResponse.json({ error: 'Failed to fetch playlists data' }, { status: 500 });
  }
};
