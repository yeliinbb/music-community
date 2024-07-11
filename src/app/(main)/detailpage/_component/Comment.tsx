"use client";
import { enableMutation } from "@/lib/getUserId";
import { addComment, deleteComment, editComment } from "@/lib/utils/commentUtils";
import { getDateTime } from "@/lib/utils/getDateTime";
import { CommentWithUserType } from "@/types/comment.type";

import { createClient } from "@/utils/supabase/client";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import React, { useEffect, useRef, useState } from "react";
import { RiDeleteBinLine } from "react-icons/ri";
import { RiEditFill } from "react-icons/ri";

const Comment = ({ id }: { id: string }) => {
  const [isEditing, setIsEditing] = useState(false);
  const commentRef = useRef<HTMLInputElement | null>(null);
  const [loginId, setLoginId] = useState();
  const [editingCommentId, setEditingCommentId] = useState<string | null>(null);
  const [editingContent, setEditingContent] = useState<string>("");
  const queryClient = useQueryClient();

  useEffect(() => {
    const user = async () => {
      const supabase = createClient();
      const {
        data: { session }
      } = await supabase.auth.getSession();

      if (!session) {
        return;
      }
      const userId = session.user.id;
      setLoginId(userId);
    };
    user();
  });
  const {
    data: commentList,
    error,
    isPending,
    isSuccess
  } = useQuery<CommentWithUserType[], Error>({
    queryKey: ["comments", id],
    queryFn: async () => {
      try {
        const supabase = createClient();
        const { data } = await supabase.from("comments").select("*,users(nickname, email)");
        console.log("commentList", data);
        return data;
      } catch (error) {
        console.log(error);
      }
    }
  });

  // 댓글 남기기
  const addMutation = useMutation({
    mutationFn: addComment,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["comments"] });
    }
  });

  const editMutation = useMutation({
    mutationFn: editComment,
    onSuccess: (updatedComment: CommentWithUserType) => {
      // queryClient.setQueryData<CommentWithUserType[]>(["comments", id], (oldData) => {
      //   if (!oldData) return [];

      //   const updatedComments = oldData.map((comment) => (comment.id === updatedComment.id ? updatedComment : comment));

      //   // 여기에 정렬 로직을 추가합니다
      //   return updatedComments.sort((a, b) => {
      //     // 예: 날짜순으로 정렬 (최신순)
      //     return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      //   });
      // });
      queryClient.invalidateQueries(["comments", id]);
      setIsEditing(false);
      setEditingCommentId(null);
      setEditingContent("");
    }
  });

  const deleteMutation = useMutation({
    mutationFn: deleteComment,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["comments"] });
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
      const newComment = { content: comment, postId: id, userId: loginId }; // userId 바꾸기
      addMutation.mutate(newComment);
      commentRef.current.value = "";
    }
  };

  const handleEditComment = async (commentId: CommentWithUserType["id"]) => {
    const selectedComment: CommentWithUserType = commentList.find((comment) => comment.id === commentId);

    // 선택된 댓글이 없는 경우 반환
    if (!selectedComment) {
      return;
    }

    if (loginId !== selectedComment?.userId) {
      alert("작성자만 댓글을 수정할 수 있습니다");
      return;
    }

    // 이미 편집 중인 경우, 저장 로직 실행
    if (isEditing && editingCommentId === commentId) {
      const content = editingContent;
      if (content !== undefined) {
        const editedComment: CommentWithUserType = {
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
    const selectedComment: CommentWithUserType = commentList.find((comment) => comment.id === commentId);

    if (!selectedComment) {
      return;
    }

    if (loginId !== selectedComment?.userId) {
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
                      <span>{comment.users?.nickname}</span>
                      <span>{getDateTime(comment.createdAt)}</span>
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
