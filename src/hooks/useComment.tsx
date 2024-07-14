"use client";

import { useLoginStore } from "@/store/auth";
import { CommentType, CommonCommentType } from "@/types/comment.type";
import { createClient } from "@/utils/supabase/client";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useRef, useState } from "react";
import { toast } from "react-toastify";
import { usePostCommentData } from "@/hooks/usePostCommentData";

interface UseCommentProps {
  queryKey: "comments" | "artistComments";
  postId: string;
  tableName: "comments" | "artistComments";
}

export type NewCommentType = {
  content: string;
  postId: string;
  userId: string;
};

const useComment = ({ queryKey, postId, tableName }: UseCommentProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editingCommentId, setEditingCommentId] = useState<string | null>(null);
  const [editingContent, setEditingContent] = useState<string>("");
  const userId = useLoginStore((state) => state.userId);
  const queryClient = useQueryClient();
  const supabase = createClient();
  const commentRef = useRef<HTMLInputElement | null>(null);

  const { commentList, isSuccess, isPending, error } = usePostCommentData({ postId });

  const addComment = async (newComment: NewCommentType) => {
    const response = await supabase.from(tableName).insert(newComment);
    return response.data;
  };

  const editComment = async ({ content, id }: CommentType) => {
    const { error } = await supabase.from(tableName).update({ content }).eq("id", id);
    if (error) {
      console.error("댓글 수정 실패", error);
      throw new Error(error.message);
    }
    return;
  };

  const deleteComment = async (id: string) => {
    const { error } = await supabase.from(tableName).delete().eq("id", id);
    if (error) {
      console.error("댓글 삭제 실패", error);
      throw new Error("Failed to delete post");
    }
    return;
  };

  // 댓글 남기기
  const addMutation = useMutation({
    mutationFn: addComment,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [queryKey] });
    }
  });

  const editMutation = useMutation({
    mutationFn: editComment,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [queryKey] });
      setIsEditing(false);
      setEditingCommentId(null);
      setEditingContent("");
    }
  });

  const deleteMutation = useMutation({
    mutationFn: deleteComment,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [queryKey] });
    }
  });

  // 댓글 제출
  const handleSubmitComment = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (commentRef.current) {
      const comment = commentRef.current?.value;
      if (!comment.trim()) {
        toast.warn("내용을 입력하세요!");
        return;
      }
      const newComment: NewCommentType = { content: comment, postId, userId: userId }; // userId 바꾸기
      addMutation.mutate(newComment);
      commentRef.current.value = "";
    }
  };

  const handleEditComment = async (commentId: string) => {
    const selectedComment = commentList?.find((comment) => comment.id === commentId);
    console.log("selectedComment", selectedComment);
    // 선택된 댓글이 없는 경우 반환
    if (!selectedComment) {
      return;
    }

    if (userId !== selectedComment?.userId) {
      toast.warn("작성자만 댓글을 수정할 수 있습니다");
      return;
    }

    // 이미 편집 중인 경우, 저장 로직 실행
    if (isEditing && editingCommentId === commentId) {
      const content = editingContent;
      if (content !== undefined) {
        const editedComment = {
          ...selectedComment,
          content: content
        };
        editMutation.mutate(editedComment);
      }
    } else {
      setIsEditing(true);
      setEditingCommentId(commentId);
      setEditingContent(selectedComment.content || "");
    }
  };

  const handleDeleteComment = async (commentId: string) => {
    const selectedComment = commentList?.find((comment) => comment.id === commentId);

    if (!selectedComment) {
      return;
    }

    if (userId !== selectedComment?.userId) {
      toast.warn("작성자만 댓글을 삭제할 수 있습니다.");
      return;
    }

    if (confirm("정말로 댓글을 삭제하시겠습니까?")) {
      try {
        deleteMutation.mutate(commentId);
        console.log("댓글 삭제가 완료되었습니다.");
      } catch (error) {
        console.error("댓글 삭제 중 오류 발생", error);
        toast.warn("댓글 삭제 중 오류가 발생했습니다.");
      }
    } else {
      toast.success("댓글 삭제가 취소되었습니다.");
    }
  };

  return {
    commentList,
    isSuccess,
    isPending,
    error,
    commentRef,
    isEditing,
    editingCommentId,
    editingContent,
    setEditingContent,
    handleSubmitComment,
    handleEditComment,
    handleDeleteComment
  };
};

export default useComment;
