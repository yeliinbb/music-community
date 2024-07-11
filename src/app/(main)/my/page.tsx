import api from "@/api/api";
import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query";
import { Metadata } from "next";
import Profile from "../_components/Profile";
import MyLikes from "./_components/MyLikes";
import MyPosts from "./_components/MyPosts";

export const metadata: Metadata = {
  title: {
    default: "뮤직 커뮤니티",
    template: "뮤직 커뮤니티 | %s"
  },
  description: "뮤직 커뮤니티에서 음악을 공유하고, 좋아하는 음악을 발견해보세요."
};

export default async function MyPage() {
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({ queryKey: ["myPosts"], queryFn: () => api.me.getMyPosts() });
  await queryClient.prefetchQuery({ queryKey: ["myLikes"], queryFn: () => api.me.getMyLikes() });

  return (
    <section className="w-full h-full grid grid-cols-main-layout gap-8 pt-[100px] pb-[60px] px-[60px]">
      <Profile />
      <div>
        <h1 className="text-center text-2xl font-bold">My Page</h1>
        <HydrationBoundary state={dehydrate(queryClient)}>
          <h2 className="font-bold text-2xl">내 게시글</h2>
          <MyPosts />
          <h2 className="font-bold text-2xl">좋아요 한 아티스트</h2>
          <MyLikes />
        </HydrationBoundary>
      </div>
    </section>
  );
}
