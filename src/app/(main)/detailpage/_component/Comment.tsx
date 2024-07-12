"use client";
import { addComment, deleteComment, editComment, fetchComments } from "@/lib/utils/commentUtils";
import { getDateTime } from "@/lib/utils/getDateTime";
import { CommentType } from "@/types/comment.type";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useRef, useState } from "react";
import { RiDeleteBinLine } from "react-icons/ri";
import { RiEditFill } from "react-icons/ri";
import { useLoginStore } from "@/store/auth";

const Comment = ({ id }: { id: string }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editingCommentId, setEditingCommentId] = useState<string | null>(null);
  const [editingContent, setEditingContent] = useState<string>("");
  const commentRef = useRef<HTMLInputElement | null>(null);
  const queryClient = useQueryClient();
  const userId = useLoginStore((state) => state.userId);

  const {
    data: commentList = [],
    error,
    isPending,
    isSuccess
  } = useQuery<CommentType[], Error, CommentType[], [string, string]>({
    queryKey: ["comments", id],
    queryFn: () => fetchComments(id)
  });

  // 댓글 남기기
  const addMutation = useMutation({
    mutationFn: addComment,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["comments", id] });
    }
  });

  const editMutation = useMutation({
    mutationFn: editComment,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["comments", id] });
      setIsEditing(false);
      setEditingCommentId(null);
      setEditingContent("");
    }
  });

  const deleteMutation = useMutation({
    mutationFn: deleteComment,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["comments", id] });
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
      const newComment: Omit<CommentType, "createdAt" | "id" | "users"> = {
        content: comment,
        postId: id,
        userId: userId
      }; // userId 바꾸기
      addMutation.mutate(newComment);
      commentRef.current.value = "";
    }
  };

  const handleEditComment = async (commentId: CommentType["id"]) => {
    const selectedComment = commentList?.find((comment: CommentType) => (comment.id === commentId ? comment : {}));

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
        const editedComment: CommentType = {
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
    const selectedComment = commentList?.find((comment: CommentType) => (comment.id === commentId ? comment : {}));

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

  if (isPending) {
    return <div>댓글 불러오는 중...</div>;
  }
  if (error) {
    return <div>댓글 불러오기 실패</div>;
  }

  return (
    <div className="w-full border-2 border-gray-300 h-[370px] rounded-lg p-5">
      <h3 className="text-xl mb-2">Comment</h3>
      <div className="flex flex-col justify-center items-center">
        <form className="relative w-[88%]" onSubmit={(e) => handleSubmitComment(e)}>
          <input
            ref={commentRef}
            type="text"
            className="w-full outline-none indent-2.5 h-14 rounded-lg border-2 border-gray-300 bg-inherit mb-5 "
          />
          <button className=" absolute top-[16px] right-[25px]">추가</button>
        </form>

        <div className="w-[90%] h-[200px] overflow-auto">
          {isSuccess &&
            commentList?.map((comment) => {
              return (
                <div className="shadow p-4 rounded-lg mb-2" key={comment.id}>
                  <div>
                    <li className="flex justify-between p-2">
                      <span>{comment.users.nickname}</span>
                      <span>{getDateTime(comment.createdAt ?? "")}</span>
                      <button>
                        <RiEditFill onClick={() => handleEditComment(comment.id)} />
                      </button>
                      <button>
                        <RiDeleteBinLine onClick={() => handleDeleteComment(comment.id)} />
                      </button>
                    </li>
                  </div>
                  {isEditing && editingCommentId === comment.id ? (
                    <textarea
                      value={editingContent}
                      onChange={(e) => setEditingContent(e.target.value)}
                      className="resize-none outline-none border border-gray-500 mt-5 w-full h-[80px] rounded-md p-1"
                    ></textarea>
                  ) : (
                    <p>{comment.content}</p>
                  )}
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
};

export default Comment;
