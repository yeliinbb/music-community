import api from "@/api/api";
import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query";
import { Metadata } from "next";
import { Suspense } from "react";
import SearchInput from "./_components/SearchInput";
import SearchSpotify from "./_components/SearchSpotify";
import SearchUser from "./_components/SearchUser";

export const metadata: Metadata = {
  title: {
    default: "뮤직 커뮤니티",
    template: "뮤직 커뮤니티 | %s"
  },
  description: "뮤직 커뮤니티에서 음악과 다른 유저를 검색해보세요."
};

export default async function SearchPage({ searchParams }: { searchParams: { [key: string]: string } }) {
  if (!searchParams.params) {
    return (
      <div>
        <h1 className="text-center text-2xl font-bold">Search Page</h1>
        <div className="max-w-[800px] mx-auto p-10">
          <SearchInput />
          <div>검색어를 입력해주세요.</div>
        </div>
      </div>
    );
  }

  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({
    queryKey: ["searchUsers", { params: searchParams.params }],
    queryFn: () => api.search.searchUsers(searchParams.params),
    retry: 0
  });
  await queryClient.prefetchQuery({
    queryKey: ["searchSpotify", { params: searchParams.params }],
    queryFn: () => api.search.searchSpotify(searchParams.params),
    retry: 0
  });

  return (
    <div>
      <h1 className="text-center text-2xl font-bold">Search Page</h1>
      <div className="max-w-[800px] mx-auto p-10">
        <SearchInput />
        <HydrationBoundary state={dehydrate(queryClient)}>
          <Suspense fallback={<div>유저 검색 중...</div>}>
            <SearchUser searchParams={searchParams.params} />
          </Suspense>
          <Suspense fallback={<div>Spotify 정보를 가져오는 중...</div>}>
            <SearchSpotify searchParams={searchParams.params} />
          </Suspense>
        </HydrationBoundary>
      </div>
      {/* <SearchSpotify /> */}
    </div>
  );
}
