import spotifyApiAxios from '@/lib/api/spotifyApiAxios';
import { spotifyFetcher } from '@/lib/api/spotifyFetcher';
import { NextRequest, NextResponse } from 'next/server';

export const GET = async (request: NextRequest, { params }: { params: { id: string } }) => {
  try {
    const response = await spotifyFetcher(`artists/${params.id}/albums`, {
      params: { market: 'KR', limit: 4, include_groups: 'album,single' },
      next: { revalidate: 3600 },
    });

    if (!response) {
      return NextResponse.json({ error: 'No data received' }, { status: 404 });
    }

    return NextResponse.json(response.items, {
      headers: {
        'Cache-Control': 'public, max-age=3600',
      },
    });
  } catch (error: any) {
    console.error('Error fetching track:', {
      message: error.message,
      status: error.response?.status,
      data: error.response?.data,
    });
    return NextResponse.json(
      { error: 'Failed to fetch artist album data', details: error.message },
      { status: error.response?.status || 500 },
    );
  }
};
