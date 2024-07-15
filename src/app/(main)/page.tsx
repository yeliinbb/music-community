import PostList from "./_components/PostList";
import Playlists from "./(playlists)/_components/Playlists";
import Artist from "./(artist)/Artist";
import { createClient } from "@/utils/supabase/server";
import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query";
import { getAllPost } from "./_components/getAllPost";
import { getPlaylists } from "./_components/getPlaylists";
import { getSpotifyArtists } from "./_components/getSpotifyArtists";

const MainPage = async () => {
  const queryClient = new QueryClient();
  const supabase = createClient();
  const user = await supabase.auth.getUser();

  // 사용자가 없으면 prefetch하지 않음
  if (!user) return;

  await Promise.all([
    queryClient.prefetchQuery({
      queryKey: ["allPosts"],
      queryFn: getAllPost
    }),
    queryClient.prefetchQuery({
      queryKey: ["playlists"],
      queryFn: getPlaylists
    }),
    queryClient.prefetchQuery({
      queryKey: ["artistData"],
      queryFn: getSpotifyArtists
    })
  ]);

  return (
    <div className="p-4">
      <HydrationBoundary state={dehydrate(queryClient)}>
        <Playlists />
        <PostList />
        <Artist />
      </HydrationBoundary>
    </div>
  );
};

export default MainPage;
