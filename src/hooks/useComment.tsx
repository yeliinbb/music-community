'use client';

import { useLoginStore } from '@/store/auth';
import { CommentType } from '@/types/comment.type';
import { createClient } from '@/utils/supabase/client';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useRef, useState } from 'react';
import { toast } from 'react-toastify';
import { usePostCommentData } from '@/hooks/usePostCommentData';
import { queryKey } from '@/lib/constants/queryKeys';
import { TableName } from '@/lib/constants/tableNames';

export type NewCommentType = {
  content: string;
  postId: string;
  userId: string;
};

type CommentEditState = {
  isEditing: boolean;
  commentId: string | null;
  content: string;
};

type UseCommentParams = {
  queryKey: queryKey;
  postId: string;
  tableName: TableName;
};

const useComment = ({ queryKey, postId, tableName }: UseCommentParams) => {
  const [editState, setEditState] = useState<CommentEditState>({
    isEditing: false,
    commentId: null,
    content: '',
  });
  const userId = useLoginStore((state) => state.userId);
  const queryClient = useQueryClient();
  const supabase = createClient();
  const commentRef = useRef<HTMLInputElement | null>(null);

  const { commentList, isCommentSuccess, isCommentPending, isCommentError } = usePostCommentData({
    postId,
    queryKey,
    tableName,
  });

  const handleError = (error: Error, action: string) => {
    console.error(`댓글 ${action} 실패`, error);
    toast.warn(`댓글 ${action} 중 오류가 발생했습니다.`);
    return null;
  };

  // DB 작업 함수들
  const commentService = {
    add: async (newComment: NewCommentType) => {
      try {
        const { data, error } = await supabase.from(tableName).insert(newComment);
        if (error) throw new Error(error.message);
        return data;
      } catch (error) {
        return handleError(error as Error, '추가');
      }
    },

    edit: async ({ content, id }: CommentType) => {
      try {
        const { error } = await supabase.from(tableName).update({ content }).eq('id', id);
        if (error) throw new Error(error.message);
        return true;
      } catch (error) {
        return handleError(error as Error, '수정');
      }
    },

    delete: async (id: string) => {
      try {
        const { error } = await supabase.from(tableName).delete().eq('id', id);
        if (error) throw new Error(error.message);
        return true;
      } catch (error) {
        return handleError(error as Error, '삭제');
      }
    },
  };

  // mutation 관련 로직
  const mutations = {
    add: useMutation({
      mutationFn: commentService.add,
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: [queryKey] });
      },
      onError: (error: Error) => handleError(error, '추가'),
    }),

    edit: useMutation({
      mutationFn: commentService.edit,
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: [queryKey] });
        setEditState({
          isEditing: false,
          commentId: null,
          content: '',
        });
      },
      onError: (error: Error) => handleError(error, '수정'),
    }),

    delete: useMutation({
      mutationFn: commentService.delete,
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: [queryKey] });
      },
      onError: (error: Error) => handleError(error, '삭제'),
    }),
  };

  const validateUserPermission = (selectedComment: CommentType | undefined, action: string) => {
    if (!selectedComment) {
      return false;
    }

    if (userId !== selectedComment?.userId) {
      toast.warn(`작성자만 댓글을 ${action}할 수 있습니다.`);
      return false;
    }

    return true;
  };

  const handleSubmitComment = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (commentRef.current) {
      const comment = commentRef.current?.value;
      if (!comment.trim()) {
        toast.warn('내용을 입력하세요!');
        return;
      }
      const newComment: NewCommentType = { content: comment, postId, userId: userId };
      mutations.add.mutate(newComment);
      commentRef.current.value = '';
    }
  };

  const handleEditComment = async (commentId: string) => {
    const selectedComment = commentList?.find((comment) => comment.id === commentId);

    if (!validateUserPermission(selectedComment, '수정')) {
      return;
    }

    if (editState.isEditing && editState.commentId === commentId) {
      const { content } = editState;
      if (content.trim()) {
        mutations.edit.mutate({
          ...selectedComment!,
          content,
        });
      }
    } else {
      setEditState({
        isEditing: true,
        commentId: commentId,
        content: selectedComment?.content || '',
      });
    }
  };

  const handleDeleteComment = async (commentId: string) => {
    const selectedComment = commentList?.find((comment) => comment.id === commentId);

    if (!validateUserPermission(selectedComment, '삭제')) {
      return;
    }

    if (confirm('정말로 댓글을 삭제하시겠습니까?')) {
      try {
        await mutations.delete.mutateAsync(commentId);
        toast.success('댓글 삭제가 완료되었습니다.');
      } catch (error) {
        handleError(error as Error, '삭제');
      }
    } else {
      toast.success('댓글 삭제가 취소되었습니다.');
    }
  };

  return {
    commentList,
    isCommentSuccess,
    isCommentPending,
    isCommentError,
    commentRef,
    editState,
    setEditState,
    handleSubmitComment,
    handleEditComment,
    handleDeleteComment,
  };
};

export default useComment;
