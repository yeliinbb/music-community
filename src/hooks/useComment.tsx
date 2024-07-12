import { useLoginStore } from "@/store/auth";
import { CommonCommentType } from "@/types/comment.type";
import { createClient } from "@/utils/supabase/client";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useRef, useState } from "react";

interface UseCommentProps {
  queryKey: "comments" | "artistComments" | "likes" | "main_artist" | "main_playlist" | "posts" | "users";
  id: string;
}

type NewCommentType = {
  content: string;
  postId: string;
  userId: string;
};

export const useComment = ({ queryKey, id }: UseCommentProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editingCommentId, setEditingCommentId] = useState<string | null>(null);
  const [editingContent, setEditingContent] = useState<string>("");
  const userId = useLoginStore((state) => state.userId);
  const queryClient = useQueryClient();
  const supabase = createClient();
  const commentRef = useRef<HTMLInputElement | null>(null);
  //   console.log(userId);

  const { data, error, isPending, isSuccess } = useQuery({
    queryKey: [queryKey, id],
    queryFn: async () => {
      try {
        const { data, error } = await supabase
          .from(queryKey)
          .select("*,users(nickname, email)")
          //   .select("*")
          .eq("postId", id)
          .order("createdAt", { ascending: false });

        if (error) {
          console.error("댓글 불러오기 실패", error);
          throw new Error(error.message);
        }
        console.log("data", data);
        return data;
      } catch (error) {
        console.log(error);
      }
    }
  });

  // 댓글 남기기
  const addMutation = useMutation({
    mutationFn: async (newComment: CommonCommentType) => {
      const response = await supabase.from(queryKey).insert(newComment);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [queryKey] });
    }
  });

  const editMutation = useMutation({
    mutationFn: async ({ content, id }: { content: string; id: string }) => {
      const { error } = await supabase.from(queryKey).update({ content }).eq("id", id);
      if (error) {
        console.error("댓글 수정 실패", error);
        throw new Error(error.message);
      }
      return;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [queryKey] });
      setIsEditing(false);
      setEditingCommentId(null);
      setEditingContent("");
    }
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: CommonCommentType["id"]) => {
      const { error } = await supabase.from(queryKey).delete().eq("id", id);
      if (error) {
        console.error("댓글 삭제 실패", error);
        throw new Error("Failed to delete post");
      }
      return;
    },
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
        alert("내용을 입력하세요!");
        return;
      }
      const newComment: NewCommentType = { content: comment, postId: id, userId: userId }; // userId 바꾸기
      addMutation.mutate(newComment);
      commentRef.current.value = "";
    }
  };

  const handleEditComment = async (commentId: T["id"]) => {
    const selectedComment = data?.find((comment: CommonCommentType) => comment.id === commentId);

    // 선택된 댓글이 없는 경우 반환
    if (!selectedComment) {
      return;
    }

    if (userId !== selectedComment?.userId) {
      alert("작성자만 댓글을 수정할 수 있습니다");
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
    const selectedComment = data?.find((comment) => comment.id === commentId) as T | undefined;

    if (!selectedComment) {
      return;
    }

    if (userId !== selectedComment?.userId) {
      alert("작성자만 댓글을 삭제할 수 있습니다.");
      return;
    }

    if (confirm("정말로 댓글을 삭제하시겠습니까?")) {
      try {
        deleteMutation.mutate(commentId);
        console.log("댓글 삭제가 완료되었습니다.");
      } catch (error) {
        console.error("댓글 삭제 중 오류 발생", error);
        alert("댓글 삭제 중 오류가 발생했습니다.");
      }
    } else {
      alert("댓글 삭제가 취소되었습니다.");
    }
  };
  return {
    data,
    error,
    isPending,
    isSuccess,
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
