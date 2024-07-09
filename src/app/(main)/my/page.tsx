import api from "@/api/api";
import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query";
import { Suspense } from "react";
import MyLikes from "./_components/MyLikes";
import MyPosts from "./_components/MyPosts";

export default async function MyPage() {
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({ queryKey: ["myPosts"], queryFn: () => api.me.getMyPosts() });
  await queryClient.prefetchQuery({ queryKey: ["myLikes"], queryFn: () => api.me.getMyLikes() });

  return (
    <div>
      <h1 className="text-center text-2xl font-bold">My Page</h1>
      <HydrationBoundary state={dehydrate(queryClient)}>
        <Suspense fallback={<div>내 포스트 로우딩...</div>}>
          <MyPosts />
        </Suspense>
        <Suspense fallback={<div>좋아요 아티스트 로우딩...</div>}>
          <MyLikes />
        </Suspense>
      </HydrationBoundary>
    </div>
  );
}
