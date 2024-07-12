export const dynamic = "force-dynamic";
import api from "@/api/api";
import { createClient } from "@/utils/supabase/server";
import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query";
import { Metadata } from "next";
import MyArtists from "./_components/MyArtists";
import MyPosts from "./_components/MyPosts";

export const metadata: Metadata = {
  title: {
    default: "뮤직 커뮤니티",
    template: "뮤직 커뮤니티 | %s"
  },
  description: "뮤직 커뮤니티에서 음악을 공유하고, 좋아하는 음악을 발견해보세요."
};

//TODO 검색 데이터 없을때 스크롤바 나오는거 없애야함.

export default async function MyPage() {
  const queryClient = new QueryClient();
  const supabase = createClient();
  const user = await supabase.auth.getUser();

  await queryClient.prefetchQuery({
    queryKey: ["myPosts", { userId: user.data.user?.id! }],
    queryFn: () => api.me.getMyPosts(user.data.user?.id!)
  });
  await queryClient.prefetchQuery({
    queryKey: ["myLikes", { userId: user.data.user?.id! }],
    queryFn: () => api.me.getMyLikes(user.data.user?.id!)
  });

  return (
    <main className="w-[800px] mx-auto p-8 pt-0">
      <div className="flex flex-col gap-y-4">
        <HydrationBoundary state={dehydrate(queryClient)}>
          <h2 className="font-bold text-2xl">좋아요 한 아티스트</h2>
          <MyArtists />
          <h2 className="font-bold text-2xl">내 게시글</h2>
          <MyPosts />
        </HydrationBoundary>
      </div>
    </main>
  );
}
