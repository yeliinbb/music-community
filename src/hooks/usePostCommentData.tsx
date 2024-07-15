import { useQueries } from "@tanstack/react-query";
import { fetchPosts } from "@/lib/utils/fetchPosts";
import { CommonPostType } from "@/types/posts.type";
import { CommonCommentType } from "@/types/comment.type";
import { fetchComments } from "@/lib/utils/fetchComments";

interface usePostCommentDataProps {
  postId: string;
  queryKey: "comments" | "artistComments";
  tableName: "comments" | "artistComments";
}

export function usePostCommentData({ postId, queryKey, tableName }: usePostCommentDataProps) {
  const results = useQueries({
    queries: [
      {
        queryKey: ["posts", postId],
        queryFn: () => fetchPosts(postId)
      },
      {
        queryKey: [queryKey, postId],
        queryFn: () => fetchComments({ postId, tableName })
      }
    ]
  });

  const [postQuery, commentQuery] = results;
  const isSuccess = results.every((query) => query.isSuccess);
  const isPending = results.some((query) => query.isPending);
  const error = results.some((query) => query.isError);

  return {
    post: postQuery.data as CommonPostType | undefined,
    commentList: commentQuery.data as CommonCommentType[] | undefined,
    isSuccess,
    isPending,
    error,
    postError: postQuery.error,
    commentError: commentQuery.error
  };
}
