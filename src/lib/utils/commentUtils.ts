import { CommentType } from "@/types/posts.type";
import { createClient } from "@/utils/supabase/client";

const supabase = createClient();

export const enableCommentMutation = async () => {
  const {
    data: { session }
  } = await supabase.auth.getSession();
  const userId = session?.user.id;
  return userId;
};

export const addComment = async (newComment: CommentType) => {
  const response = await supabase.from("comments").insert(newComment);
  return response;
};

export const editComment = async ({ content, id }: CommentType) => {
  const { error } = await supabase.from("comments").update({ content }).eq("id", id);
  if (error) {
    console.error("댓글 수정 실패", error);
    throw new Error(error.message);
  }
  return;
};

export const deleteComment = async (id: CommentType["id"]) => {
  const { error } = await supabase.from("comments").delete().eq("id", id);
  if (error) {
    console.error("댓글 삭제 실패", error);
    throw new Error("Failed to delete post");
  }
  return;
};
