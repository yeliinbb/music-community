import Post from "../_component/Post";
import Comment from "../_component/Comment";
import { createClient } from "@/utils/supabase/server";
import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query";
import { fetchPosts } from "@/lib/utils/fetchPosts";
import { fetchComments } from "@/lib/utils/fetchComments";

const DetailPage = async ({ params }: { params: { id: string } }) => {
  const queryClient = new QueryClient();
  const supabase = createClient();
  const user = await supabase.auth.getUser();

  // 사용자가 없으면 prefetch하지 않음
  if (!user) return;

  await Promise.all([
    queryClient.prefetchQuery({
      queryKey: ["comments", params.id],
      queryFn: () => fetchComments(params.id)
    }),
    queryClient.prefetchQuery({
      queryKey: ["posts", params.id],
      queryFn: () => fetchPosts(params.id)
    })
  ]);

  return (
    <div className="rounded-xl flex flex-col h-full w-full gap-4">
      <HydrationBoundary state={dehydrate(queryClient)}>
        <Post params={params} />
        <Comment params={params} />
      </HydrationBoundary>
    </div>
  );
};

export default DetailPage;
