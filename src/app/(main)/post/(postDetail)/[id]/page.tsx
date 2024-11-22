import Post from "../_component/Post";
import { createClient } from "@/utils/supabase/server";
import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query";
import { fetchPosts } from "@/lib/utils/fetchPosts";
import { fetchComments } from "@/lib/utils/fetchComments";
import CommentList from "@/components/CommentList";
import { QUERY_KEYS } from "@/lib/constants/queryKeys";
import { TABLE_NAMES } from "@/lib/constants/tableNames";
import { Suspense } from "react";
import LoadingPage from "@/app/loading";

const DetailPage = async ({ params }: { params: { id: string } }) => {
  const queryClient = new QueryClient();
  const supabase = createClient();
  const user = await supabase.auth.getUser();

  if (!user) {
    return;
  }

  await Promise.all([
    queryClient.prefetchQuery({
      queryKey: [QUERY_KEYS.posts, params.id],
      queryFn: () => fetchPosts(params.id)
    }),
    queryClient.prefetchQuery({
      queryKey: [QUERY_KEYS.comments, params.id],
      queryFn: () => fetchComments({ postId: params.id, tableName: TABLE_NAMES.comments })
    })
  ]);

  return (
    <div className="rounded-xl flex flex-col h-full w-full gap-4">
      <Suspense fallback={<LoadingPage />}>
        <HydrationBoundary state={dehydrate(queryClient)}>
          <Post params={params} />
          <CommentList params={params} type="regular" />
        </HydrationBoundary>
      </Suspense>
    </div>
  );
};

export default DetailPage;
