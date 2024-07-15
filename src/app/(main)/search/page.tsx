import api from "@/api/api";
import { SpotifyAlbums } from "@/types/spotify.type";
import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query";
import { Metadata } from "next";
import SearchAlbums from "./_components/SearchAlbums";
import SearchArtists from "./_components/SearchArtists";
import SearchUser from "./_components/SearchUser";

// const TestUser = React.lazy(() => import("./_components/SearchUser"));

export const metadata: Metadata = {
  title: {
    default: "뮤직 커뮤니티",
    template: "뮤직 커뮤니티 | %s"
  },
  description: "뮤직 커뮤니티에서 음악과 다른 유저를 검색해보세요."
};

export default async function SearchPage({ searchParams }: { searchParams: { [key: string]: string } }) {
  // console.log("!searchParams.param", searchParams, searchParams.params);
  if (!searchParams.params) {
    return (
      <div className="w-full p-10 pt-[90px] h-full">
        <div className="mx-auto max-w-[1024px] rounded-lg box-border p-10 gap-y-6 flex flex-col h-full  bg-white">
          <div>검색어를 입력해주세요.</div>
        </div>
      </div>
    );
  }

  const queryClient = new QueryClient();
  // await queryClient.prefetchQuery({
  //   queryKey: ["searchUsers", { params: searchParams.params }],
  //   queryFn: () => api.search.searchUsers(searchParams.params),
  //   retry: 0
  // });

  // await queryClient.prefetchQuery({
  //   queryKey: ["searchSpotify", { params: searchParams.params }],
  //   queryFn: () => api.search.searchSpotify(searchParams.params),
  //   retry: 0
  // });

  await queryClient.prefetchInfiniteQuery({
    queryKey: ["artists", { keywrod: searchParams.params }],
    queryFn: ({ pageParam }) => api.search.searchSpotifyArtists(searchParams.params, pageParam),
    getNextPageParam: (lastPage: SpotifyAlbums[]) => lastPage.length + 1,
    initialPageParam: 0,
    gcTime: 0
  });

  await queryClient.prefetchInfiniteQuery({
    queryKey: ["albums", { keywrod: searchParams.params }],
    queryFn: ({ pageParam }) => api.search.searchSpotifyAlbums(searchParams.params, pageParam),
    getNextPageParam: (lastPage: SpotifyAlbums[]) => lastPage.length + 1,
    initialPageParam: 0,
    gcTime: 0
  });

  return (
    <div className="size-full">
      <div className="mx-auto max-w-[1024px] rounded-lg box-border gap-y-10 flex flex-col  h-full bg-white">
        <HydrationBoundary state={dehydrate(queryClient)}>
          <SearchUser />
          <SearchAlbums />
          <SearchArtists />
        </HydrationBoundary>
      </div>
      {/* <SearchSpotify /> */}
    </div>
  );
}
