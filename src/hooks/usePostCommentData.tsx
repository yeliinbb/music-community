import { useQueries } from '@tanstack/react-query';
import { fetchPosts } from '@/lib/utils/fetchPosts';
import { CommonPostType } from '@/types/posts.type';
import { CommonCommentType } from '@/types/comment.type';
import { fetchComments } from '@/lib/utils/fetchComments';
import { QUERY_KEYS, queryKey } from '@/lib/constants/queryKeys';
import { TableName } from '@/lib/constants/tableNames';

interface usePostCommentDataProps {
  postId: string;
  queryKey: queryKey;
  tableName: TableName;
}

export function usePostCommentData({ postId, queryKey, tableName }: usePostCommentDataProps) {
  const results = useQueries({
    queries: [
      {
        queryKey: [QUERY_KEYS.posts, postId],
        queryFn: () => fetchPosts(postId),
      },
      {
        queryKey: [queryKey, postId],
        queryFn: () => fetchComments({ postId, tableName }),
      },
    ],
  });

  const [postQuery, commentQuery] = results;
  const error = results.some((query) => query.isError);

  return {
    post: postQuery.data as CommonPostType | undefined,
    commentList: commentQuery.data as CommonCommentType[] | undefined,
    isCommentSuccess: commentQuery.isSuccess,
    isCommentPending: commentQuery.isPending,
    isCommentError: commentQuery.isError,
    isSuccess: postQuery.isSuccess && commentQuery.isSuccess,
    isPending: postQuery.isPending || commentQuery.isPending,
    hasError: postQuery.isError || commentQuery.isError,
    error,
    postError: postQuery.error,
    commentError: commentQuery.error,
  };
}
