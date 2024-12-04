import PostList from './_components/PostList';
import Playlists from './(playlists)/_components/Playlists';
import MainArtist from './(artist)/MainArtist';
import { createClient } from '@/utils/supabase/server';
import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query';
import { getAllPost } from '../../lib/utils/getAllPost';
import { getPlaylists } from '../../lib/utils/getPlaylists';
import { getSpotifyArtists } from '../../lib/utils/getSpotifyArtists';
import { Suspense } from 'react';
import LoadingPage from '../loading';

const MainPage = async () => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: 1,
        staleTime: 1000 * 60,
      },
    },
  });
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return;
  }

  try {
    await Promise.all([
      queryClient.prefetchQuery({
        queryKey: ['allPosts'],
        queryFn: getAllPost,
      }),
      queryClient.prefetchQuery({
        queryKey: ['playlists'],
        queryFn: getPlaylists,
      }),
      queryClient.prefetchQuery({
        queryKey: ['artistData'],
        queryFn: getSpotifyArtists,
      }),
    ]);
  } catch (error) {
    console.error('MainPage Prefetch error:', error);
  }

  return (
    <div className="p-4">
      <Suspense fallback={<LoadingPage />}>
        <HydrationBoundary state={dehydrate(queryClient)}>
          <Playlists />
          <PostList />
          <MainArtist />
        </HydrationBoundary>
      </Suspense>
    </div>
  );
};

export default MainPage;
