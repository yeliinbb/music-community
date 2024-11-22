import { getAccessToken } from '@/lib/api/getAccessToken';
import spotifyApiAxios from '@/lib/api/spotifyApiAxios';
import { createClient } from '@/utils/supabase/server';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  const url = new URL(req.url);
  const params = new URLSearchParams(url.search);
  const userId = params.get('userId');

  if (!userId) return NextResponse.json({ message: 'API GET LIKES No User Id' });

  const supabase = createClient();

  const likesData = await supabase.from('likes').select('*').eq('userId', userId);

  let query = '';
  if (likesData.data) {
    query = likesData?.data?.map((like) => like.artistId).join(',');
  }

  const response = await spotifyApiAxios.get(`/artists?ids=${query}`);
  const data = await response.data;

  return NextResponse.json(data);
}
