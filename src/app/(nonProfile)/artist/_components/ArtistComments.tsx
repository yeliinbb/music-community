"use client";
import useComment, { NewCommentType } from "@/hooks/useComment";
import { RiDeleteBinLine } from "react-icons/ri";
import { RiEditFill } from "react-icons/ri";
import { BsPencilSquare } from "react-icons/bs";
import { convertDateFormat } from "@/lib/utils/convertDateFormat";
import ArtistCommentSkeleton from "./ArtistCommentSkeleton";
import { useRef, useState } from "react";
import { toast } from "react-toastify";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { CommentType, CommonCommentType } from "@/types/comment.type";
import { useLoginStore } from "@/store/auth";
import { createClient } from "@/utils/supabase/client";
import { fetchArtistComments } from "@/lib/utils/fetchArtistComments";

interface ArtistCommentsProps {
  params: { id: string };
}

const ArtistComments = ({ params }: ArtistCommentsProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editingCommentId, setEditingCommentId] = useState<string | null>(null);
  const [editingContent, setEditingContent] = useState<string>("");
  const userId = useLoginStore((state) => state.userId);
  const queryClient = useQueryClient();
  const supabase = createClient();
  const commentRef = useRef<HTMLInputElement | null>(null);

  const artistId = params.id;
  const queryKey = "artistComments";
  const tableName = "artistComments";

  const {
    data: commentList,
    error,
    isPending,
    isSuccess
  } = useQuery<CommonCommentType[], Error, CommonCommentType[], [string, string]>({
    queryKey: [queryKey, artistId],
    queryFn: () => fetchArtistComments(artistId)
  });

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
      const newComment: NewCommentType = { content: comment, postId: artistId, userId: userId }; // userId 바꾸기
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

  if (isPending) {
    return <ArtistCommentSkeleton />;
  }
  if (error) {
    return <div>댓글 불러오기 실패</div>;
  }
  return (
    <>
      <div className="m-4 font-medium">Comment</div>
      <div className="w-full border h-full rounded-lg p-5 max-h-[300px]">
        <div className="flex flex-col px-10 pb-4 justify-center items-center h-full w-full">
          <form
            className="w-full min-h-300px rounded-lg border bg-inherit flex mb-3 p-4"
            onSubmit={(e) => handleSubmitComment(e)}
          >
            <input
              ref={commentRef}
              type="text"
              className="w-full outline-none indent-2.5 h-14"
              placeholder="댓글을 남겨주세요!"
            />
            <button className="flex items-center">
              <BsPencilSquare />
            </button>
          </form>
          <ul className="w-full max-h-[250px] h-full overflow-y-scroll scrollbar-hide px-2">
            {isSuccess &&
              commentList?.map((comment) => {
                return (
                  <li className="shadow rounded-lg mb-2 p-1" key={comment.id}>
                    <div className="flex flex-col p-2 gap-3">
                      <div className="flex items-center justify-between gap-1.5">
                        <div className="flex items-center gap-1.5">
                          <span className="font-semibold w-[100px] truncate">{comment.users?.nickname}</span>
                          <span className="text-xs text-slate-400">{convertDateFormat(comment.createdAt ?? "")}</span>
                        </div>
                        <div>
                          <button className="mr-1">
                            <RiEditFill onClick={() => handleEditComment(comment.id)} />
                          </button>
                          <button>
                            <RiDeleteBinLine onClick={() => handleDeleteComment(comment.id)} />
                          </button>
                        </div>
                      </div>
                      {isEditing && editingCommentId === comment.id ? (
                        <textarea
                          value={editingContent}
                          onChange={(e) => setEditingContent(e.target.value)}
                          className="resize-none outline-none border border-gray-500 mt-5 w-full h-[80px] rounded-md p-1"
                        ></textarea>
                      ) : (
                        <p>{comment.content ?? undefined}</p>
                      )}
                    </div>
                  </li>
                );
              })}
          </ul>
        </div>
      </div>
    </>
  );
};

export default ArtistComments;
