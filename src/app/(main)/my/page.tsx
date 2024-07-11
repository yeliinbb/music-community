import api from "@/api/api";
import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query";
import { Metadata } from "next";
import MyLikes from "./_components/MyLikes";
import MyPosts from "./_components/MyPosts";

export const metadata: Metadata = {
  title: {
    default: "뮤직 커뮤니티",
    template: "뮤직 커뮤니티 | %s"
  },
  description: "뮤직 커뮤니티에서 음악을 공유하고, 좋아하는 음악을 발견해보세요."
};

//TODO search route 경로 한번 정리해야함.
//TODO 검색 데이터 없을때 스크롤바 나오는거 없애야함.

export default async function MyPage() {
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({ queryKey: ["myPosts"], queryFn: () => api.me.getMyPosts() });
  await queryClient.prefetchQuery({ queryKey: ["myLikes"], queryFn: () => api.me.getMyLikes() });

  return (
    <main className="max-w-[800px] mx-auto">
      <div>
        <HydrationBoundary state={dehydrate(queryClient)}>
          <h2 className="font-bold text-2xl">좋아요 한 아티스트</h2>
          <MyLikes />
          <h2 className="font-bold text-2xl">내 게시글</h2>
          <MyPosts />
        </HydrationBoundary>
      </div>
    </main>
  );
}
